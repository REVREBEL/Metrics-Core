import type { DraftRepository } from "@repo/db";
import { PostgresDraftRepository } from "@repo/db";
import { canonicalizeRowKey } from "./canonicalizer";
import type { LookupValueFetcher } from "./lookup-resolver";
import { validateLookupDependencies } from "./lookup-resolver";
import { getDataLibraryTableDefinition } from "./registry";
import { validateRowDraft } from "./validation";

export interface SaveDraftChangesPayload {
  tableKey: string;
  changes: Array<{
    originalPayload?: Record<string, unknown> | null;
    draftPayload: Record<string, unknown>;
  }>;
}

export interface SaveDraftResult {
  success: boolean;
  message?: string;
  savedCount?: number;
  errors?: Record<string, string>;
  details?: Record<string, Record<string, string>>;
}

export interface DraftAuthContext {
  userId: string;
  isAuthenticated: boolean;
  permissions?: string[];
}

export function getDefaultDraftRepository(): DraftRepository {
  return new PostgresDraftRepository();
}

export async function listFeatureDraftEdits(
  tableKey: string,
  authContext: DraftAuthContext,
  draftRepo: DraftRepository = getDefaultDraftRepository(),
) {
  if (!authContext.isAuthenticated) {
    throw new Error("UNAUTHENTICATED");
  }

  const tableDef = getDataLibraryTableDefinition(tableKey);
  if (!tableDef) {
    throw new Error(`Table '${tableKey}' is not registered.`);
  }

  if (authContext.permissions) {
    const hasRead = tableDef.permissions.read.some((p) =>
      authContext.permissions?.includes(p),
    );
    if (!hasRead) {
      throw new Error("FORBIDDEN");
    }
  }

  return draftRepo.listDrafts(tableKey, authContext.userId);
}

export async function saveFeatureDraftEdits(
  payload: SaveDraftChangesPayload,
  authContext: DraftAuthContext,
  options?: {
    draftRepo?: DraftRepository;
    lookupFetcher?: LookupValueFetcher;
  },
): Promise<SaveDraftResult> {
  const draftRepo = options?.draftRepo ?? getDefaultDraftRepository();

  // 1. Auth check
  if (!authContext.isAuthenticated) {
    return {
      success: false,
      message: "You must be signed into an active workspace session.",
    };
  }

  // 2. Resolve table definition
  const tableDef = getDataLibraryTableDefinition(payload.tableKey);
  if (!tableDef) {
    return {
      success: false,
      message: `Table '${payload.tableKey}' is not registered in the Data Library allowlist.`,
    };
  }

  // 3. Permission check against category edit permission
  if (authContext.permissions) {
    const hasEdit = tableDef.permissions.edit.some((p) =>
      authContext.permissions?.includes(p),
    );
    if (!hasEdit) {
      return {
        success: false,
        message: "You do not have permission to edit rows in this table.",
      };
    }
  }

  if (!payload.changes || payload.changes.length === 0) {
    return {
      success: false,
      message: "No row changes were supplied.",
    };
  }

  // 4. Validate and canonicalize each change
  const validatedRecords: Array<{
    rowKey: string;
    originalPayload: Record<string, unknown> | null;
    draftPayload: Record<string, unknown>;
  }> = [];

  const fieldErrors: Record<string, string> = {};

  for (let idx = 0; idx < payload.changes.length; idx++) {
    const change = payload.changes[idx];
    const orig = change.originalPayload ?? null;
    const draft = change.draftPayload;

    // Validate metadata rules (type, required, read-only, primary key)
    const valRes = validateRowDraft(tableDef, draft, orig);
    if (!valRes.valid) {
      Object.assign(fieldErrors, valRes.errors);
      continue;
    }

    // Validate lookup dependencies
    const lookupRes = await validateLookupDependencies(
      valRes.normalizedChanges,
      orig,
      tableDef.columns,
      options?.lookupFetcher,
    );
    if (!lookupRes.valid) {
      Object.assign(fieldErrors, lookupRes.errors);
      continue;
    }

    // Canonicalize row key using primary key fields in registry order
    const canonicalKey = canonicalizeRowKey(
      tableDef.primaryKey,
      orig
        ? { ...orig, ...valRes.normalizedChanges }
        : valRes.normalizedChanges,
    );

    validatedRecords.push({
      rowKey: canonicalKey,
      originalPayload: orig,
      draftPayload: valRes.normalizedChanges,
    });
  }

  if (Object.keys(fieldErrors).length > 0) {
    return {
      success: false,
      message: "Fix validation errors before saving draft.",
      errors: fieldErrors,
    };
  }

  // 5. Persist via repository
  let savedCount = 0;
  for (const record of validatedRecords) {
    const saved = await draftRepo.saveDraft({
      tableKey: payload.tableKey,
      userId: authContext.userId,
      rowKey: record.rowKey,
      originalPayload: record.originalPayload,
      draftPayload: record.draftPayload,
    });

    await draftRepo.recordAuditLog({
      actorId: authContext.userId,
      entityType: "lookup_table_draft_edits",
      entityId: saved.id,
      action: "DRAFT_UPDATED",
      metadata: {
        tableKey: payload.tableKey,
        rowKey: record.rowKey,
      },
      beforeState: record.originalPayload ?? null,
      afterState: record.draftPayload,
    });

    savedCount++;
  }

  return {
    success: true,
    savedCount,
    message: `${savedCount} draft row edit${savedCount === 1 ? "" : "s"} saved successfully.`,
  };
}

export async function discardFeatureDraftEdits(
  tableKey: string,
  rowKeys: string[],
  authContext: DraftAuthContext,
  draftRepo: DraftRepository = getDefaultDraftRepository(),
) {
  if (!authContext.isAuthenticated) {
    return {
      success: false,
      message: "You must be signed in.",
    };
  }

  if (!rowKeys || rowKeys.length === 0) {
    return {
      success: false,
      message:
        "rowKeys must be a non-empty array for discardFeatureDraftEdits.",
    };
  }

  const tableDef = getDataLibraryTableDefinition(tableKey);
  if (!tableDef) {
    return { success: false, message: `Table '${tableKey}' not found.` };
  }

  if (authContext.permissions) {
    const hasEdit = tableDef.permissions.edit.some((p) =>
      authContext.permissions?.includes(p),
    );
    if (!hasEdit) {
      return { success: false, message: "Forbidden." };
    }
  }

  const count = await draftRepo.discardDrafts(
    tableKey,
    authContext.userId,
    rowKeys,
  );

  await draftRepo.recordAuditLog({
    actorId: authContext.userId,
    entityType: "lookup_table_draft_edits",
    action: "DRAFT_DISCARDED",
    metadata: { tableKey, rowKeys, count },
  });

  return {
    success: true,
    discardedCount: count,
    message: `Discarded ${count} draft edit${count === 1 ? "" : "s"}.`,
  };
}

export async function discardAllFeatureDraftEdits(
  tableKey: string,
  authContext: DraftAuthContext,
  draftRepo: DraftRepository = getDefaultDraftRepository(),
) {
  if (!authContext.isAuthenticated) {
    return { success: false, message: "You must be signed in." };
  }

  const tableDef = getDataLibraryTableDefinition(tableKey);
  if (!tableDef) {
    return { success: false, message: `Table '${tableKey}' not found.` };
  }

  if (authContext.permissions) {
    const hasEdit = tableDef.permissions.edit.some((p) =>
      authContext.permissions?.includes(p),
    );
    if (!hasEdit) {
      return { success: false, message: "Forbidden." };
    }
  }

  const count = await draftRepo.discardAllDrafts(tableKey, authContext.userId);

  await draftRepo.recordAuditLog({
    actorId: authContext.userId,
    entityType: "lookup_table_draft_edits",
    action: "DRAFT_DISCARD_ALL",
    metadata: { tableKey, count },
  });

  return {
    success: true,
    discardedCount: count,
    message: `Discarded all (${count}) draft edits for ${tableDef.title}.`,
  };
}
