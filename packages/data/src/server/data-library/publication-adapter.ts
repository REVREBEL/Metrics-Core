import { BigQuery, Table } from "@google-cloud/bigquery";
import { getDb } from "@repo/db";
import { AppAuditLog, LookupTableChangeRequestItem, appAuditLog, lookupTableChangeRequestItems, lookupTableChangeRequests, lookupTableDraftEdits } from "@repo/db/schema";
import { eq, inArray } from "drizzle-orm";
import { DataLibraryTableColumn, DataLibraryTableDefinition, getDataLibraryTableDefinition } from "@features/data-library/registry";
import { canonicalizeRowKey, decanonicalizeRowKey } from "@features/data-library/canonicalizer";

// ... (BQ Client and interfaces remain the same) ...

export async function publishChangeRequest(
  changeRequestId: string,
  actorId: string
): Promise<PublicationResult> {
  const db = await getDb();

  await createAuditLog(actorId, "publication_started", "lookup_table_change_request", changeRequestId);

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

    // ... (rest of the logic up to conflict detection) ...

    const draftIdsToUpdate = request.items.map(i => i.draftEditId);

    if (conflicts.length > 0) {
        await updateChangeRequestStatus(changeRequestId, "conflict");
        await db.update(lookupTableDraftEdits).set({ status: "conflict" }).where(inArray(lookupTableDraftEdits.id, draftIdsToUpdate));
        await createAuditLog(actorId, "publication_conflict", "lookup_table_change_request", changeRequestId, { conflicts });
        return { success: false, message: "Publication failed due to data conflicts.", conflicts, publishedRows: 0 };
    }

    // ... (rest of the logic up to success) ...

    await updateChangeRequestStatus(changeRequestId, "published");
    await db.update(lookupTableDraftEdits).set({ status: "published" }).where(inArray(lookupTableDraftEdits.id, draftIdsToUpdate));

    await createAuditLog(actorId, "publication_succeeded", "lookup_table_change_request", changeRequestId, { publishedRows: numAffectedRows });

    return { success: true, message: `Publication successful. ${numAffectedRows} rows affected.`, conflicts: [], publishedRows: numAffectedRows };

  } catch (error) {
      // ... (error handling) ...
  }
}

// ... (all other helper functions remain the same) ...
