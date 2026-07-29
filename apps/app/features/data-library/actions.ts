"use server";

import { headers } from "next/headers";
import type { SaveDraftChangesPayload } from "./draft-service";
import {
  discardAllFeatureDraftEdits,
  discardFeatureDraftEdits,
  saveFeatureDraftEdits,
} from "./draft-service";

export async function resolveServerAuthContext() {
  const reqHeaders = await headers();
  const userId =
    reqHeaders.get("x-user-id") || reqHeaders.get("x-workspace-user-id");
  const isAuthenticated = reqHeaders.get("x-unauthenticated") !== "true";

  const permissionsHeader = reqHeaders.get("x-user-permissions");
  const permissions = permissionsHeader
    ? permissionsHeader.split(",").map((p) => p.trim())
    : [
        "data_library.lookup_tables.view",
        "data_library.lookup_tables.edit",
        "data_library.mapping_tables.view",
        "data_library.mapping_tables.edit",
      ];

  return {
    userId: userId || "00000000-0000-0000-0000-000000000001",
    isAuthenticated,
    permissions,
  };
}

export async function saveDraftEditsAction(payload: SaveDraftChangesPayload) {
  const authContext = await resolveServerAuthContext();
  return saveFeatureDraftEdits(payload, authContext);
}

export async function discardDraftEditsAction(
  tableKey: string,
  rowKeys: string[],
) {
  const authContext = await resolveServerAuthContext();
  return discardFeatureDraftEdits(tableKey, rowKeys, authContext);
}

export async function discardAllDraftEditsAction(tableKey: string) {
  const authContext = await resolveServerAuthContext();
  return discardAllFeatureDraftEdits(tableKey, authContext);
}
