import { BigQuery } from "@google-cloud/bigquery";
import {
  getMappingTableRegistryEntry,
  type MappingTableRegistryEntry,
} from "@ui-registry";
import { getDb } from "@repo/db";
import {
  appAuditLog,
  lookupTableChangeRequests,
} from "@repo/db/schema";
import { eq } from "drizzle-orm";

function getBigQueryWriteClient() {
  return new BigQuery();
}

export interface PublicationConflict {
  rowKey: string;
  message: string;
  conflictingFields: Record<string, { expected: any; actual: any }>;
}

export interface PublicationResult {
  success: boolean;
  message: string;
  conflicts: PublicationConflict[];
  publishedRows: number;
}

async function createAuditLog(
  actorId: string,
  action: string,
  entityType: string,
  entityId: string,
  metadata: object = {}
) {
  const db = await getDb();
  await db.insert(appAuditLog).values({
    actorId,
    action,
    entityType,
    entityId,
    metadata,
  });
}

export async function publishChangeRequest(
  changeRequestId: string,
  actorId: string
): Promise<PublicationResult> {
  const db = await getDb();

  await createAuditLog(
    actorId,
    "publication_started",
    "lookup_table_change_request",
    changeRequestId
  );

  try {
    const request = await db.query.lookupTableChangeRequests.findFirst({
      where: eq(lookupTableChangeRequests.id, changeRequestId),
      with: {
        items: true,
      },
    });

    if (!request) {
      throw new Error(`Change request ${changeRequestId} not found.`);
    }

    if (request.status !== "approved") {
      return {
        success: false,
        message: `Change request is not in 'approved' state. Current state: ${request.status}.`,
        conflicts: [],
        publishedRows: 0,
      };
    }

    const registryEntry = getMappingTableRegistryEntry(request.tableKey);
    if (!registryEntry) {
      throw new Error(
        `Table "${request.tableKey}" is not a registered mapping table.`
      );
    }

    const bq = getBigQueryWriteClient();
    const { bigQueryDataset, bigQueryTable, sourceCodeField } = registryEntry;
    const bqTableRef = `\`${bq.projectId}.${bigQueryDataset}.${bigQueryTable}\``;

    const conflicts: PublicationConflict[] = [];
    const rowsToUpsert: any[] = [];
    const rowKeysToProcess = request.items.map((i) => i.rowKey);

    const bqQuery = `SELECT * FROM ${bqTableRef} WHERE ${sourceCodeField} IN UNNEST(@rowKeys)`;
    const [currentBqRows] = await bq.query({
      query: bqQuery,
      params: { rowKeys: rowKeysToProcess },
    });

    const currentBqRowsMap = new Map(
      currentBqRows.map((row) => [row[sourceCodeField], row])
    );

    for (const item of request.items) {
      const { rowKey, originalPayload, submittedPayload } = item;
      const currentBqRow = currentBqRowsMap.get(rowKey);

      if (currentBqRow && originalPayload) {
        const conflictingFields: PublicationConflict["conflictingFields"] = {};
        for (const key in originalPayload) {
          let bqValue = currentBqRow[key];
          if (bqValue && typeof bqValue === "object" && "value" in bqValue) {
            bqValue = bqValue.value;
          }

          if (originalPayload[key] != bqValue) {
            if (key !== "updatedAt" && key !== "updatedBy" && key !== "confidence") {
              conflictingFields[key] = {
                expected: originalPayload[key],
                actual: bqValue,
              };
            }
          }
        }

        if (Object.keys(conflictingFields).length > 0) {
          conflicts.push({
            rowKey,
            message:
              "Stale data: The row in the warehouse has changed since the edit was drafted.",
            conflictingFields,
          });
          continue;
        }
      }

      const rowForUpsert = { ...submittedPayload };
      if (!rowForUpsert[sourceCodeField]) {
        rowForUpsert[sourceCodeField] = rowKey;
      }
      rowsToUpsert.push(rowForUpsert);
    }

    if (conflicts.length > 0) {
      await db
        .update(lookupTableChangeRequests)
        .set({
          status: "conflict",
          updatedAt: new Date(),
        })
        .where(eq(lookupTableChangeRequests.id, changeRequestId));

      await createAuditLog(
        actorId,
        "publication_conflict",
        "lookup_table_change_request",
        changeRequestId,
        { conflicts }
      );

      return {
        success: false,
        message: "Publication failed due to one or more data conflicts.",
        conflicts,
        publishedRows: 0,
      };
    }

    if (rowsToUpsert.length === 0) {
      await db
        .update(lookupTableChangeRequests)
        .set({
          status: "published",
          updatedAt: new Date(),
        })
        .where(eq(lookupTableChangeRequests.id, changeRequestId));

      await createAuditLog(
        actorId,
        "publication_succeeded",
        "lookup_table_change_request",
        changeRequestId,
        { message: "No new changes to publish." }
      );
      return {
        success: true,
        message: "No new changes to publish.",
        conflicts: [],
        publishedRows: 0,
      };
    }

    const allColumns = Object.keys(rowsToUpsert[0]);
    const columnsToUpdate = allColumns.filter((c) => c !== sourceCodeField);

    const sourceSelects = rowsToUpsert
      .map((row) => {
        const selectCols = allColumns
          .map((colName) => {
            const value = row[colName];
            let bqValue;
            if (value === null || value === undefined) {
              bqValue = "NULL";
            } else if (typeof value === "string") {
              bqValue = `r"""${value.replace(/"""/g, `\\"""`)}"""`;
            } else {
              bqValue = value;
            }
            return `${bqValue} AS ${colName}`;
          })
          .join(", ");
        return `SELECT ${selectCols}`;
      })
      .join("\\nUNION ALL\\n");

    const updateSetClause = columnsToUpdate
      .map((col) => `T.${col} = S.${col}`)
      .join(",\\n");
    const insertCols = allColumns.join(", ");
    const insertValues = allColumns.map((c) => `S.${c}`).join(", ");

    const mergeQuery = `
MERGE ${bqTableRef} T
USING (
    ${sourceSelects}
) S ON T.${sourceCodeField} = S.${sourceCodeField}
WHEN MATCHED THEN
    UPDATE SET ${updateSetClause}
WHEN NOT MATCHED THEN
    INSERT (${insertCols}) VALUES (${insertValues})
`;

    const [job] = await bq.createQueryJob({ query: mergeQuery });
    const [metadata] = await job.getMetadata();
    const numAffectedRows = metadata.statistics.query.numDmlAffectedRows;

    await db
      .update(lookupTableChangeRequests)
      .set({
        status: "published",
        updatedAt: new Date(),
      })
      .where(eq(lookupTableChangeRequests.id, changeRequestId));

    await createAuditLog(
      actorId,
      "publication_succeeded",
      "lookup_table_change_request",
      changeRequestId,
      { publishedRows: numAffectedRows }
    );

    return {
      success: true,
      message: `Publication successful. ${numAffectedRows} rows affected.`,
      conflicts: [],
      publishedRows: Number(numAffectedRows),
    };
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred.";
    await createAuditLog(
      actorId,
      "publication_failed",
      "lookup_table_change_request",
      changeRequestId,
      { error: errorMessage }
    );
    return {
      success: false,
      message: errorMessage,
      conflicts: [],
      publishedRows: 0,
    };
  }
}