"use server";

import type { SaveDraftChangesPayload } from "./draft-service";
import {
  discardAllFeatureDraftEdits,
  discardFeatureDraftEdits,
  saveFeatureDraftEdits,
} from "./draft-service";

const getMockAuthContext = () => ({
  userId: "00000000-0000-0000-0000-000000000001",
  isAuthenticated: true,
  permissions: [
    "data_library.lookup_tables.edit",
    "data_library.mapping_tables.edit",
  ],
});

export async function saveDraftEditsAction(payload: SaveDraftChangesPayload) {
  const authContext = getMockAuthContext();
  return saveFeatureDraftEdits(payload, authContext);
}

export async function discardDraftEditsAction(
  tableKey: string,
  rowKeys: string[],
) {
  const authContext = getMockAuthContext();
  return discardFeatureDraftEdits(tableKey, rowKeys, authContext);
}

export async function discardAllDraftEditsAction(tableKey: string) {
  const authContext = getMockAuthContext();
  return discardAllFeatureDraftEdits(tableKey, authContext);
}
