import type { DraftRepository } from "@repo/db";
import { PostgresDraftRepository } from "@repo/db";
import { canonicalizeRowKey } from "./canonicalizer";
import type { LookupValueFetcher } from "./lookup-resolver";
import { validateLookupDependencies } from "./lookup-resolver";
import { getDataLibraryTableDefinition, toReadDefinition } from "./registry";
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

export const defaultLiveLookupFetcher: LookupValueFetcher = async (
  tableKey: string,
  search: string,
) => {
  const tableDef = getDataLibraryTableDefinition(tableKey);
  if (!tableDef) {
    throw new Error(`Referenced lookup table '${tableKey}' is not registered.`);
  }

  const readDef = toReadDefinition(tableDef);
  const { executeDataLibraryRowRead } = await import(
    "@repo/data/server/data-library"
  );
  const res = await executeDataLibraryRowRead(readDef, {
    tableKey,
    page: 1,
    pageSize: 100,
    search,
  });

  if (!res.success) {
    throw new Error(`Failed to load referenced lookup table '${tableKey}'.`);
  }

  return res.data.rows.map((r) => ({
    code: String(r.code ?? "").trim(),
    segment_code: String(r.segment_code ?? "").trim(),
    is_active: Boolean(r.is_active ?? true),
  }));
};

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

  // Fail closed permission check
  const permissions = authContext.permissions ?? [];
  const hasRead = tableDef.permissions.read.some((p) =>
    permissions.includes(p),
  );
  if (!hasRead) {
    throw new Error("FORBIDDEN");
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
  const lookupFetcher = options?.lookupFetcher ?? defaultLiveLookupFetcher;

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

  // 3. Permission check against category edit permission (fail closed)
  const permissions = authContext.permissions ?? [];
  const hasEdit = tableDef.permissions.edit.some((p) =>
    permissions.includes(p),
  );
  if (!hasEdit) {
    return {
      success: false,
      message: "You do not have permission to edit rows in this table.",
    };
  }

  if (!payload.changes || payload.changes.length === 0) {
    return {
      success: false,
      message: "No row changes were supplied.",
    };
  }

  // 4. Validate and canonicalize each change
  const validatedRecords: Array<{
    tableKey: string;
    userId: string;
    rowKey: string;
    originalPayload: Record<string, unknown> | null;
    draftPayload: Record<string, unknown>;
  }> = [];

  const fieldErrors: Record<string, string> = {};
  const details: Record<string, Record<string, string>> = {};

  for (let idx = 0; idx < payload.changes.length; idx++) {
    const change = payload.changes[idx];
    const orig = change.originalPayload ?? null;
    const draft = change.draftPayload;

    // Validate metadata rules (type, required, read-only, primary key)
    const valRes = validateRowDraft(tableDef, draft, orig);
    const canonicalKey = canonicalizeRowKey(
      tableDef.primaryKey,
      orig
        ? { ...orig, ...valRes.normalizedChanges }
        : valRes.normalizedChanges,
    );

    if (!valRes.valid) {
      Object.assign(fieldErrors, valRes.errors);
      details[canonicalKey] = valRes.errors;
      continue;
    }

    // Validate lookup dependencies
    const lookupRes = await validateLookupDependencies(
      valRes.normalizedChanges,
      orig,
      tableDef.columns,
      lookupFetcher,
    );
    if (!lookupRes.valid) {
      Object.assign(fieldErrors, lookupRes.errors);
      details[canonicalKey] = lookupRes.errors;
      continue;
    }

    validatedRecords.push({
      tableKey: payload.tableKey,
      userId: authContext.userId,
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
      details,
    };
  }

  // 5. Persist via atomic transactional repository call
  const savedRecords = await draftRepo.saveDraftsWithAudit(
    payload.tableKey,
    authContext.userId,
    validatedRecords,
  );

  return {
    success: true,
    savedCount: savedRecords.length,
    message: `${savedRecords.length} draft row edit${savedRecords.length === 1 ? "" : "s"} saved successfully.`,
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

  // Fail closed permission check
  const permissions = authContext.permissions ?? [];
  const hasEdit = tableDef.permissions.edit.some((p) =>
    permissions.includes(p),
  );
  if (!hasEdit) {
    return { success: false, message: "Forbidden." };
  }

  const count = await draftRepo.discardDraftsWithAudit(
    tableKey,
    authContext.userId,
    rowKeys,
  );

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

  // Fail closed permission check
  const permissions = authContext.permissions ?? [];
  const hasEdit = tableDef.permissions.edit.some((p) =>
    permissions.includes(p),
  );
  if (!hasEdit) {
    return { success: false, message: "Forbidden." };
  }

  const count = await draftRepo.discardAllDraftsWithAudit(
    tableKey,
    authContext.userId,
  );

  return {
    success: true,
    discardedCount: count,
    message: `Discarded all (${count}) draft edits for ${tableDef.title}.`,
  };
}
