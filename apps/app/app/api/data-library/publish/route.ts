import { NextResponse } from "next/server";
import { publishChangeRequest } from "@repo/data/server/data-library";
import { getCurrentWorkspaceSession } from "@features/data-library/session";

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

  // Check for specific publish permission
  const canPublish = authContext.permissions.some((p) =>
    p.startsWith("data_library.mapping_tables.publish")
  );

  if (!canPublish) {
    return new NextResponse(null, {
      status: 403,
      statusText: "Forbidden: You do not have permission to publish changes.",
    });
  }

  try {
    const { changeRequestId } = await req.json();

    if (!changeRequestId) {
      return new NextResponse(
        JSON.stringify({ message: "changeRequestId is required." }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const result = await publishChangeRequest(
      changeRequestId,
      authContext.user.id
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