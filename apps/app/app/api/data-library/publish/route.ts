import { NextResponse } from "next/server";
import { publishChangeRequest } from "@repo/data/publication-adapter";
import { getCurrentUser } from "@/lib/session"; // Assuming a session utility exists

export async function POST(req: Request) {
  try {
    const user = await getCurrentUser();

    // 1. Authorization
    // TODO: Replace with actual permission check from a permission service
    const hasPermission = user?.permissions?.includes(
      "data_library.mapping_tables.publish"
    );

    if (!hasPermission) {
      return new NextResponse(null, {
        status: 403,
        statusText: "Forbidden: You do not have permission to publish changes.",
      });
    }

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

    // 2. Call the publication adapter
    const result = await publishChangeRequest(changeRequestId, user.id);

    // 3. Return the result
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