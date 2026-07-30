import { createHmac, timingSafeEqual } from "node:crypto";
import { appUsers, eq, getDb, userRoles } from "@repo/db";
import { cookies } from "next/headers";

export interface VerifiedWorkspaceSession {
  userId: string;
  isAuthenticated: boolean;
  permissions: string[];
}

export function getSessionSecret(): string {
  const secret = process.env.SESSION_SECRET ?? process.env.NEXTAUTH_SECRET;

  if (!secret) {
    throw new Error("Session secret is not configured.");
  }

  return secret;
}

/**
 * Verify a signed session token.
 * Token format: <userId>.<timestamp>.<hmacSignature>
 */
export function verifySessionToken(
  token: string,
  secret?: string,
): { userId: string } | null {
  if (!token || typeof token !== "string") return null;

  let activeSecret: string;
  try {
    activeSecret = secret ?? getSessionSecret();
  } catch {
    return null;
  }

  const parts = token.split(".");
  if (parts.length !== 3) return null;

  const [userId, timestampStr, signature] = parts;
  const timestamp = Number.parseInt(timestampStr, 10);

  if (!userId || Number.isNaN(timestamp)) return null;

  // Enforce session TTL (7 days) and reject future timestamps
  const SESSION_TTL_MS = 7 * 24 * 60 * 60 * 1000;
  const age = Date.now() - timestamp;
  if (age < 0 || age > SESSION_TTL_MS) {
    return null;
  }

  // Compute expected HMAC signature
  const expectedSig = createHmac("sha256", activeSecret)
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
  secret?: string,
): string {
  const activeSecret = secret ?? getSessionSecret();
  const timestampStr = Date.now().toString();
  const signature = createHmac("sha256", activeSecret)
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
    let secret: string;
    try {
      secret = getSessionSecret();
    } catch {
      return unauthenticated;
    }

    const cookieStore = await cookies();
    const token =
      cookieStore.get("metrics_session")?.value ||
      cookieStore.get("session_token")?.value;

    if (!token) {
      return unauthenticated;
    }

    // Verify cryptographic signature and TTL
    const verified = verifySessionToken(token, secret);
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
