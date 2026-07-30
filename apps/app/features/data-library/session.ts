import { createHmac, timingSafeEqual } from "node:crypto";
import { appUsers, eq, getDb, userRoles } from "@repo/db";
import { cookies } from "next/headers";

const DEFAULT_SESSION_SECRET =
  process.env.SESSION_SECRET ||
  process.env.NEXTAUTH_SECRET ||
  "metrics-core-secure-session-secret-key-v1";

export interface VerifiedWorkspaceSession {
  userId: string;
  isAuthenticated: boolean;
  permissions: string[];
}

/**
 * Verify a signed session token.
 * Token format: <userId>.<timestamp>.<hmacSignature>
 */
export function verifySessionToken(
  token: string,
  secret = DEFAULT_SESSION_SECRET,
): { userId: string } | null {
  if (!token || typeof token !== "string") return null;

  const parts = token.split(".");
  if (parts.length !== 3) return null;

  const [userId, timestampStr, signature] = parts;
  const timestamp = Number.parseInt(timestampStr, 10);

  if (!userId || Number.isNaN(timestamp)) return null;

  // Enforce session TTL (7 days = 604,800,000 ms)
  const SESSION_TTL_MS = 7 * 24 * 60 * 60 * 1000;
  if (Date.now() - timestamp > SESSION_TTL_MS) {
    return null;
  }

  // Compute expected HMAC signature
  const expectedSig = createHmac("sha256", secret)
    .update(`${userId}.${timestampStr}`)
    .digest("hex");

  const sigBuffer = Buffer.from(signature);
  const expectedBuffer = Buffer.from(expectedSig);

  if (
    sigBuffer.length !== expectedBuffer.length ||
    !timingSafeEqual(sigBuffer, expectedBuffer)
  ) {
    return null;
  }

  return { userId };
}

export function createSignedSessionToken(
  userId: string,
  secret = DEFAULT_SESSION_SECRET,
): string {
  const timestampStr = Date.now().toString();
  const signature = createHmac("sha256", secret)
    .update(`${userId}.${timestampStr}`)
    .digest("hex");
  return `${userId}.${timestampStr}.${signature}`;
}

export async function getCurrentWorkspaceSession(): Promise<VerifiedWorkspaceSession> {
  const unauthenticated: VerifiedWorkspaceSession = {
    userId: "",
    isAuthenticated: false,
    permissions: [],
  };

  try {
    const cookieStore = await cookies();
    const token =
      cookieStore.get("metrics_session")?.value ||
      cookieStore.get("session_token")?.value;

    if (!token) {
      return unauthenticated;
    }

    // Verify cryptographic signature and TTL
    const verified = verifySessionToken(token);
    if (!verified?.userId) {
      return unauthenticated;
    }

    // Lookup active user and roles in database if DATABASE_URL is set
    try {
      const db = getDb();
      const [user] = await db
        .select({
          id: appUsers.id,
          isActive: appUsers.isActive,
          permissions: userRoles.permissions,
        })
        .from(appUsers)
        .leftJoin(userRoles, eq(userRoles.userId, appUsers.id))
        .where(eq(appUsers.id, verified.userId))
        .limit(1);

      if (!user?.isActive) {
        return unauthenticated;
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
      // In unit test environment without DATABASE_URL
      return unauthenticated;
    }
  } catch {
    return unauthenticated;
  }
}
