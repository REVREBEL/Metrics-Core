import { type NextRequest, NextResponse } from "next/server";
import { fetchFeatureDataLibraryRows } from "../../../../features/data-library/service";

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
          message: "Authentication required to access Data Library rows.",
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

  if (!tableKey) {
    return NextResponse.json(
      {
        success: false,
        error: {
          code: "INVALID_REQUEST",
          message: "Missing required 'tableKey' parameter.",
          retryable: false,
        },
      },
      {
        status: 400,
        headers: { "Cache-Control": "no-store, max-age=0" },
      },
    );
  }

  const rawPage = searchParams.get("page");
  const rawPageSize = searchParams.get("pageSize");

  const page = rawPage ? Number.parseInt(rawPage, 10) : 1;
  const pageSize = rawPageSize ? Number.parseInt(rawPageSize, 10) : 25;

  if (Number.isNaN(page) || page < 1) {
    return NextResponse.json(
      {
        success: false,
        error: {
          code: "INVALID_REQUEST",
          message:
            "Parameter 'page' must be an integer greater than or equal to 1.",
          retryable: false,
        },
      },
      { status: 400, headers: { "Cache-Control": "no-store, max-age=0" } },
    );
  }

  if (Number.isNaN(pageSize) || pageSize < 1 || pageSize > 100) {
    return NextResponse.json(
      {
        success: false,
        error: {
          code: "INVALID_REQUEST",
          message: "Parameter 'pageSize' must be an integer between 1 and 100.",
          retryable: false,
        },
      },
      { status: 400, headers: { "Cache-Control": "no-store, max-age=0" } },
    );
  }

  const search = searchParams.get("search") || undefined;
  const sortColumn = searchParams.get("sortColumn");
  const sortDirection = searchParams.get("sortDirection");

  const sort = sortColumn
    ? {
        column: sortColumn,
        direction: (sortDirection?.toLowerCase() === "desc" ? "desc" : "asc") as
          | "asc"
          | "desc",
      }
    : undefined;

  // Parse filter.* query params
  const filters: Record<string, string | boolean | number> = {};
  for (const [key, value] of searchParams.entries()) {
    if (key.startsWith("filter.")) {
      const fieldName = key.slice(7);
      if (fieldName) {
        filters[fieldName] = value;
      }
    }
  }

  const result = await fetchFeatureDataLibraryRows(
    {
      tableKey,
      page,
      pageSize,
      search,
      sort,
      filters,
    },
    authContext,
  );

  const status = result.success
    ? 200
    : result.error.code === "TABLE_NOT_REGISTERED" ||
        result.error.code === "INVALID_REQUEST"
      ? 400
      : result.error.code === "UNAUTHENTICATED"
        ? 401
        : result.error.code === "FORBIDDEN"
          ? 403
          : 500;

  return NextResponse.json(result, {
    status,
    headers: {
      "Cache-Control": "no-store, max-age=0",
    },
  });
}
