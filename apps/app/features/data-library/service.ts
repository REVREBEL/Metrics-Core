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
import { getDataLibraryTableDefinition, toReadDefinition } from "./registry";

export interface FeatureAuthContext {
  isAuthenticated: boolean;
  permissions?: string[];
}

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

  // 3. Permission check against read permissions
  if (authContext?.permissions) {
    const hasPermission = tableDef.permissions.read.some((requiredPerm) =>
      authContext.permissions?.includes(requiredPerm),
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
  return executeDataLibraryRowRead(readDef, options);
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
        retryable: false,
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
