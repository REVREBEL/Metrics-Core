import { NextResponse } from "next/server";
import { publishChangeRequest } from "@repo/data/server/data-library";
import { getCurrentWorkspaceSession } from "@features/data-library/session";
import { getDb } from "@repo/db";
import { lookupTableChangeRequests } from "@repo/db/schema";
import { eq } from "drizzle-orm";
import { getDataLibraryTableDefinition } from "@features/data-library/registry";

export async function POST(req: Request) {
  const authContext = await getCurrentWorkspaceSession();
  if (!authContext.isAuthenticated) {
    return new NextResponse(
      JSON.stringify({ message: "Authentication required." }),
      {
        status: 401,
        headers: { "Content-Type": "application/json" },
      }
    );
  }

  const { changeRequestId } = await req.json();
  if (!changeRequestId) {
    return new NextResponse(
      JSON.stringify({ message: "changeRequestId is required." }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

  const db = await getDb();
  const request = await db.query.lookupTableChangeRequests.findFirst({
    where: eq(lookupTableChangeRequests.id, changeRequestId),
  });

  if (!request) {
    return new NextResponse(null, { status: 404, statusText: "Not Found" });
  }

  const definition = getDataLibraryTableDefinition(request.tableKey);
  if (!definition || !definition.permissions.publish) {
      return new NextResponse(null, { status: 403, statusText: "Forbidden: Publication not configured for this table." });
  }

  const canPublish = authContext.permissions.includes(definition.permissions.publish);

  if (!canPublish) {
    return new NextResponse(null, {
      status: 403,
      statusText: "Forbidden: You do not have permission to publish changes for this table.",
    });
  }

  try {
    const result = await publishChangeRequest(
      changeRequestId,
      authContext.userId
    );

    return new NextResponse(JSON.stringify(result), {
      status: result.success ? 200 : 500,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Publication API Error:", error);
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred.";
    return new NextResponse(JSON.stringify({ message: errorMessage }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}