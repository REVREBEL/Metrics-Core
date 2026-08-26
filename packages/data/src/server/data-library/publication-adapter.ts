import { BigQuery, Table } from "@google-cloud/bigquery";
import { getDb } from "@repo/db";
import { appAuditLog, lookupTableChangeRequestItems, lookupTableChangeRequests } from "@repo/db/schema";
import { eq, inArray } from "drizzle-orm";
import { getDataLibraryTableDefinition } from "@features/data-library/registry";
import { canonicalizeRowKey, decanonicalizeRowKey } from "@features/data-library/canonicalizer";

function getBigQueryWriteClient() {
    const { BQ_PROJECT_ID, GOOGLE_APPLICATION_CREDENTIALS_JSON } = process.env;
    if (!BQ_PROJECT_ID || !GOOGLE_APPLICATION_CREDENTIALS_JSON) {
        throw new Error(
            "BigQuery environment variables (BQ_PROJECT_ID, GOOGLE_APPLICATION_CREDENTIALS_JSON) must be set for publication."
        );
    }
    return new BigQuery({
        projectId: BQ_PROJECT_ID,
        credentials: JSON.parse(GOOGLE_APPLICATION_CREDENTIALS_JSON),
    });
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
      with: { items: true },
    });

    if (!request) throw new Error(`Change request ${changeRequestId} not found.`);
    if (request.status !== "approved") {
      return { success: false, message: `Change request is not in 'approved' state.`, conflicts: [], publishedRows: 0 };
    }

    const definition = getDataLibraryTableDefinition(request.tableKey);
    if (!definition) throw new Error(`Data Library table definition not found for key: ${request.tableKey}`);
    if (definition.publication !== "supported") {
        return { success: false, message: `Publication is not supported for table ${request.tableKey}.`, conflicts: [], publishedRows: 0 };
    }

    const bq = getBigQueryWriteClient();
    const tableRef = bq.dataset(definition.dataset).table(definition.table);

    const conflicts: PublicationConflict[] = [];
    const rowsToUpsert: any[] = [];

    const rowKeys = request.items.map(item => decanonicalizeRowKey(item.rowKey, definition.primaryKey));
    const currentBqRows = await fetchCurrentRows(tableRef, rowKeys, definition.primaryKey);
    const currentBqRowsMap = new Map(currentBqRows.map(row => [canonicalizeRowKey(row, definition.primaryKey), row]));

    for (const item of request.items) {
      const currentBqRow = currentBqRowsMap.get(item.rowKey);
      const { originalPayload, submittedPayload } = item;

      if (currentBqRow && originalPayload) {
        const conflictingFields = getConflictingFields(originalPayload, currentBqRow, definition.columns);
        if (Object.keys(conflictingFields).length > 0) {
          conflicts.push({ rowKey: item.rowKey, message: "Stale data detected.", conflictingFields });
          continue;
        }
      }
      if (!currentBqRow && originalPayload) {
        // This means the row was deleted from BQ after the draft was created.
        conflicts.push({ rowKey: item.rowKey, message: "Row does not exist in the warehouse but was expected to.", conflictingFields: {} });
        continue;
      }
      if (currentBqRow && !originalPayload) {
          // This can happen if a new row is drafted and another process creates a row with the same key before publication.
          conflicts.push({ rowKey: item.rowKey, message: "Row already exists in the warehouse but was expected to be new.", conflictingFields: {} });
          continue;
      }

      rowsToUpsert.push({ ...submittedPayload, ...decanonicalizeRowKey(item.rowKey, definition.primaryKey) });
    }

    if (conflicts.length > 0) {
        await updateChangeRequestStatus(changeRequestId, "conflict");
        await createAuditLog(actorId, "publication_conflict", "lookup_table_change_request", changeRequestId, { conflicts });
        return { success: false, message: "Publication failed due to data conflicts.", conflicts, publishedRows: 0 };
    }

    if (rowsToUpsert.length === 0) {
        await updateChangeRequestStatus(changeRequestId, "published");
        return { success: true, message: "No new changes to publish.", conflicts: [], publishedRows: 0 };
    }

    const numAffectedRows = await executeMerge(tableRef, rowsToUpsert, definition);

    await updateChangeRequestStatus(changeRequestId, "published");
    const draftIds = request.items.map(i => i.draftEditId);
    await db.delete(lookupTableChangeRequestItems).where(inArray(lookupTableChangeRequestItems.draftEditId, draftIds));

    await createAuditLog(actorId, "publication_succeeded", "lookup_table_change_request", changeRequestId, { publishedRows: numAffectedRows });

    return { success: true, message: `Publication successful. ${numAffectedRows} rows affected.`, conflicts: [], publishedRows: numAffectedRows };

  } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "An unknown error occurred.";
      await createAuditLog(actorId, "publication_failed", "lookup_table_change_request", changeRequestId, { error: errorMessage });
      return { success: false, message: errorMessage, conflicts: [], publishedRows: 0 };
  }
}

async function fetchCurrentRows(table: Table, keys: Record<string, any>[], primaryKey: string[]) {
    const whereClauses = keys.map(key => `(${primaryKey.map(k => `\`${k}\` = ?`).join(" AND ")})`);
    const query = `SELECT * FROM \`${table.dataset.id}.${table.id}\` WHERE ${whereClauses.join(" OR ")}`;
    const params = keys.flatMap(key => primaryKey.map(k => key[k]));
    const [rows] = await table.query({ query, params });
    return rows;
}

function getConflictingFields(original: any, current: any, columns: any[]) {
    const conflicts: PublicationConflict["conflictingFields"] = {};
    for (const col of columns) {
        if (col.editable) {
            const originalValue = original[col.key];
            const currentValue = current[col.key];
            if (originalValue !== currentValue) {
                conflicts[col.key] = { expected: originalValue, actual: currentValue };
            }
        }
    }
    return conflicts;
}

async function executeMerge(table: Table, rows: any[], definition: any) {
    const { primaryKey, columns } = definition;
    const editableCols = columns.filter(c => c.editable).map(c => c.key);

    const sourceData = rows.map(row => {
        const orderedRow = {};
        for (const col of columns) {
            orderedRow[col.key] = row[col.key];
        }
        return orderedRow;
    });

    // Create a temporary table for the MERGE source
    const tempTableId = `_temp_publish_${Date.now()}`;
    const [tempTable] = await table.dataset.createTable(tempTableId, {
        schema: { fields: columns.map(c => ({name: c.key, type: c.type.toUpperCase()})) }
    });
    await tempTable.insert(sourceData);

    const onClause = primaryKey.map(k => `T.\`${k}\` = S.\`${k}\``).join(" AND ");
    
    // Build the crucial WHEN MATCHED clause for optimistic locking
    const whenMatchedClauses = editableCols.map(k => `(T.\`${k}\` IS NULL AND S.original_\`${k}\` IS NULL OR T.\`${k}\` = S.original_\`${k}\`)`);

    const updateSet = editableCols.map(k => `T.\`${k}\` = S.\`${k}\``).join(", ");
    const insertCols = columns.map(c => `\`${c.key}\``).join(", ");
    const insertValues = columns.map(c => `S.\`${c.key}\``).join(", ");

    const mergeQuery = `
        MERGE \`${table.dataset.id}.${table.id}\` T
        USING \`${table.dataset.id}.${tempTableId}\` S
        ON ${onClause}
        WHEN MATCHED AND ${whenMatchedClauses.join(" AND ")} THEN
            UPDATE SET ${updateSet}
        WHEN NOT MATCHED THEN
            INSERT (${insertCols}) VALUES (${insertValues})
    `;

    const [job] = await table.query(mergeQuery);
    const [metadata] = await job.getMetadata();
    const numAffectedRows = metadata.statistics.query.numDmlAffectedRows;

    await tempTable.delete();

    return Number(numAffectedRows);
}

async function updateChangeRequestStatus(id: string, status: "published" | "conflict") {
    const db = await getDb();
    await db.update(lookupTableChangeRequests).set({ status, updatedAt: new Date() }).where(eq(lookupTableChangeRequests.id, id));
}
