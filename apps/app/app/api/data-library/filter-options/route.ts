import { type NextRequest, NextResponse } from "next/server";
import { fetchFeatureDataLibraryFilterOptions } from "../../../../features/data-library/service";

export const dynamic = "force-dynamic";

function getWorkspaceAuthContext(request: NextRequest) {
  const userId =
    request.headers.get("x-user-id") ||
    request.headers.get("x-workspace-user-id");
  const isAuthenticated = request.headers.get("x-authenticated") === "true";
  const permissionsHeader = request.headers.get("x-user-permissions");
  const permissions = permissionsHeader
    ? permissionsHeader
        .split(",")
        .map((p) => p.trim())
        .filter(Boolean)
    : ["data_library.lookup_tables.view", "data_library.mapping_tables.view"];

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

export async function GET(request: NextRequest) {
  const authContext = getWorkspaceAuthContext(request);
  if (!authContext.isAuthenticated) {
    return NextResponse.json(
      {
        success: false,
        error: {
          code: "UNAUTHENTICATED",
          message: "Authentication required to access filter options.",
          retryable: false,
        },
      },
      {
        status: 401,
        headers: { "Cache-Control": "no-store, max-age=0" },
      },
    );
  }

  const { searchParams } = request.nextUrl;
  const tableKey = searchParams.get("tableKey");
  const columnKey = searchParams.get("columnKey");

  if (!tableKey || !columnKey) {
    return NextResponse.json(
      {
        success: false,
        error: {
          code: "INVALID_REQUEST",
          message: "Parameters 'tableKey' and 'columnKey' are required.",
          retryable: false,
        },
      },
      {
        status: 400,
        headers: { "Cache-Control": "no-store, max-age=0" },
      },
    );
  }

  const result = await fetchFeatureDataLibraryFilterOptions(
    tableKey,
    columnKey,
    authContext,
  );

  const status = result.success ? 200 : 400;

  return NextResponse.json(result, {
    status,
    headers: {
      "Cache-Control": "no-store, max-age=0",
    },
  });
}
