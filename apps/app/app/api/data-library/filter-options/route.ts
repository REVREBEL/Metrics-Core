import { type NextRequest, NextResponse } from "next/server";
import { fetchFeatureDataLibraryFilterOptions } from "../../../../features/data-library/service";

export const dynamic = "force-dynamic";

function getWorkspaceAuthContext(_request: NextRequest) {
  return {
    isAuthenticated: true,
    permissions: [
      "data_library.lookup_tables.view",
      "data_library.mapping_tables.view",
    ],
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
