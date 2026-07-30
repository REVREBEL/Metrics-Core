"use server";

import type { SaveDraftChangesPayload } from "./draft-service";
import {
  discardAllFeatureDraftEdits,
  discardFeatureDraftEdits,
  saveFeatureDraftEdits,
} from "./draft-service";
import { getCurrentWorkspaceSession } from "./session";

export async function resolveServerAuthContext() {
  return getCurrentWorkspaceSession();
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
