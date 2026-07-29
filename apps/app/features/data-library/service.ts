import "server-only";

import type {
  DataLibraryErrorResponse,
  DataLibraryFilterOptionsResponse,
  DataLibraryQueryOptions,
  DataLibraryResponse,
} from "@repo/data/data-library";
import {
  executeDataLibraryFilterOptionsRead,
  executeDataLibraryRowRead,
} from "@repo/data/server/data-library";
import { canonicalizeRowKey } from "./canonicalizer";
import { listFeatureDraftEdits } from "./draft-service";
import { getDataLibraryTableDefinition, toReadDefinition } from "./registry";

export interface FeatureAuthContext {
  userId?: string;
  isAuthenticated: boolean;
  permissions?: string[];
}

export type DataLibraryOverlayRow = Record<string, unknown> & {
  _overlay?: {
    rowKey: string;
    sourceValues: Record<string, unknown>;
    draftValues: Record<string, unknown> | null;
    effectiveValues: Record<string, unknown>;
    draftId?: string;
    draftUpdatedAt?: string;
    dirtyColumns: string[];
  };
};

export async function fetchFeatureDataLibraryRows(
  options: DataLibraryQueryOptions,
  authContext?: FeatureAuthContext,
): Promise<DataLibraryResponse> {
  // 1. Authenticated workspace check
  if (authContext && !authContext.isAuthenticated) {
    return {
      success: false,
      error: {
        code: "UNAUTHENTICATED",
        message:
          "You must be signed into an active workspace session to view the Data Library.",
        retryable: false,
      },
    };
  }

  // 2. Resolve table definition
  const tableDef = getDataLibraryTableDefinition(options.tableKey);
  if (!tableDef) {
    return {
      success: false,
      error: {
        code: "TABLE_NOT_REGISTERED",
        message: `Table '${options.tableKey}' is not registered in the Data Library allowlist.`,
        retryable: false,
      },
    };
  }

  // 3. Permission check against read permissions (fail closed)
  if (authContext) {
    const permissions = authContext.permissions ?? [];
    const hasPermission = tableDef.permissions.read.some((requiredPerm) =>
      permissions.includes(requiredPerm),
    );
    if (!hasPermission) {
      return {
        success: false,
        error: {
          code: "FORBIDDEN",
          message: "You do not have permission to view rows for this table.",
          retryable: false,
        },
      };
    }
  }

  // 4. Execute row reading via @repo/data
  const readDef = toReadDefinition(tableDef);
  const result = await executeDataLibraryRowRead(readDef, options);

  if (!result.success) {
    return result;
  }

  // 5. Query active drafts for the table & user if userId is available
  const draftMap = new Map<
    string,
    { id: string; updatedAt: string; draftPayload: Record<string, unknown> }
  >();

  if (authContext?.userId) {
    try {
      const drafts = await listFeatureDraftEdits(options.tableKey, {
        userId: authContext.userId,
        isAuthenticated: true,
        permissions: authContext.permissions,
      });

      for (const d of drafts) {
        draftMap.set(d.rowKey, {
          id: d.id,
          updatedAt: d.updatedAt.toISOString(),
          draftPayload: d.draftPayload,
        });
      }
    } catch {
      // Database unconfigured or unavailable; proceed with clean source rows
    }
  }

  // 6. Map rows into 3-Layer Overlay model
  const overlayRows: DataLibraryOverlayRow[] = result.data.rows.map(
    (sourceRow) => {
      const rowKey = canonicalizeRowKey(tableDef.primaryKey, sourceRow);
      const activeDraft = draftMap.get(rowKey);

      const dirtyColumns: string[] = [];
      const effectiveValues: Record<string, unknown> = { ...sourceRow };
      const draftValues = activeDraft ? activeDraft.draftPayload : null;

      if (draftValues) {
        for (const [key, draftVal] of Object.entries(draftValues)) {
          if (sourceRow[key] !== draftVal) {
            dirtyColumns.push(key);
            effectiveValues[key] = draftVal;
          }
        }
      }

      return {
        ...effectiveValues,
        _overlay: {
          rowKey,
          sourceValues: sourceRow,
          draftValues,
          effectiveValues,
          draftId: activeDraft?.id,
          draftUpdatedAt: activeDraft?.updatedAt,
          dirtyColumns,
        },
      };
    },
  );

  return {
    ...result,
    data: {
      ...result.data,
      rows: overlayRows,
    },
  };
}

export async function fetchFeatureDataLibraryFilterOptions(
  tableKey: string,
  columnKey: string,
  authContext?: FeatureAuthContext,
): Promise<DataLibraryFilterOptionsResponse | DataLibraryErrorResponse> {
  if (authContext && !authContext.isAuthenticated) {
    return {
      success: false,
      error: {
        code: "UNAUTHENTICATED",
        message: "You must be signed into an active workspace session.",
      },
    };
  }

  const tableDef = getDataLibraryTableDefinition(tableKey);
  if (!tableDef) {
    return {
      success: false,
      error: {
        code: "TABLE_NOT_REGISTERED",
        message: `Table '${tableKey}' is not registered in the Data Library allowlist.`,
        retryable: false,
      },
    };
  }

  const readDef = toReadDefinition(tableDef);
  return executeDataLibraryFilterOptionsRead(readDef, columnKey);
}
