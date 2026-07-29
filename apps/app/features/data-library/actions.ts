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

  // Read verified session attributes injected by workspace middleware
  const userId =
    reqHeaders.get("x-user-id") || reqHeaders.get("x-workspace-user-id");
  const isAuthenticated = reqHeaders.get("x-authenticated") === "true";

  const permissionsHeader = reqHeaders.get("x-user-permissions");
  const permissions = permissionsHeader
    ? permissionsHeader
        .split(",")
        .map((p) => p.trim())
        .filter(Boolean)
    : [];

  // Fail closed: No verified session or missing user ID returns unauthenticated context
  if (!isAuthenticated || !userId) {
    return {
      userId: "",
      isAuthenticated: false,
      permissions: [],
    };
  }

  return {
    userId,
    isAuthenticated: true,
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
