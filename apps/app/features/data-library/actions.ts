"use server";

import { appUsers, eq, getDb, userRoles } from "@repo/db";
import { cookies } from "next/headers";
import type { SaveDraftChangesPayload } from "./draft-service";
import {
  discardAllFeatureDraftEdits,
  discardFeatureDraftEdits,
  saveFeatureDraftEdits,
} from "./draft-service";

export async function getCurrentWorkspaceSession() {
  try {
    const cookieStore = await cookies();
    const sessionToken =
      cookieStore.get("metrics_session")?.value ||
      cookieStore.get("session_token")?.value;

    if (!sessionToken) {
      return {
        userId: "",
        isAuthenticated: false,
        permissions: [],
      };
    }

    const db = getDb();
    const [user] = await db
      .select({
        id: appUsers.id,
        isActive: appUsers.isActive,
        permissions: userRoles.permissions,
      })
      .from(appUsers)
      .leftJoin(userRoles, eq(userRoles.userId, appUsers.id))
      .where(eq(appUsers.id, sessionToken))
      .limit(1);

    if (!user?.isActive) {
      return {
        userId: "",
        isAuthenticated: false,
        permissions: [],
      };
    }

    const permissions = Array.isArray(user.permissions)
      ? (user.permissions as string[])
      : [];

    return {
      userId: user.id,
      isAuthenticated: true,
      permissions,
    };
  } catch {
    return {
      userId: "",
      isAuthenticated: false,
      permissions: [],
    };
  }
}

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
