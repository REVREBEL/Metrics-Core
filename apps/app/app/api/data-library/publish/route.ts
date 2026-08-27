import { NextResponse } from "next/server";
import {
  getPublicationCapability,
  publishFeatureChangeRequest,
} from "../../../../features/data-library/publication-service";
import { getCurrentWorkspaceSession } from "../../../../features/data-library/session";

function statusForOutcome(outcome: string): number {
  if (outcome === "conflict") return 409;
  if (outcome === "unauthorized") return 403;
  if (outcome === "not_found") return 404;
  if (outcome === "invalid_state" || outcome === "unsupported") return 400;
  if (outcome === "failed") return 500;
  return 200;
}

export async function GET(req: Request) {
  const authContext = await getCurrentWorkspaceSession();
  if (!authContext.isAuthenticated) {
    return NextResponse.json(
      { configured: false, supported: false, canPublish: false },
      { status: 401 },
    );
  }

  const tableKey = new URL(req.url).searchParams.get("tableKey");
  if (!tableKey) {
    return NextResponse.json(
      { message: "tableKey is required." },
      { status: 400 },
    );
  }

  return NextResponse.json(getPublicationCapability(tableKey, authContext));
}

export async function POST(req: Request) {
  const authContext = await getCurrentWorkspaceSession();
  if (!authContext.isAuthenticated) {
    return NextResponse.json(
      { message: "Authentication required.", outcome: "unauthorized" },
      { status: 401 },
    );
  }

  let changeRequestId: string | undefined;
  try {
    const body = (await req.json()) as { changeRequestId?: string };
    changeRequestId = body.changeRequestId;
  } catch {
    return NextResponse.json({ message: "Invalid JSON body." }, { status: 400 });
  }

  if (!changeRequestId) {
    return NextResponse.json(
      { message: "changeRequestId is required." },
      { status: 400 },
    );
  }

  const result = await publishFeatureChangeRequest(changeRequestId, authContext);
  return NextResponse.json(result, { status: statusForOutcome(result.outcome) });
}
