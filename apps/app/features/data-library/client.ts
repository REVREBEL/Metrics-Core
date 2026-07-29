import type {
  DataLibraryErrorResponse,
  DataLibraryFilterOptionsResponse,
  DataLibraryQueryOptions,
  DataLibraryResponse,
} from "@repo/data/data-library";

export async function fetchRowsClient(
  options: DataLibraryQueryOptions,
  signal?: AbortSignal,
): Promise<DataLibraryResponse> {
  const query = new URLSearchParams();
  query.set("tableKey", options.tableKey);
  query.set("page", String(options.page));
  query.set("pageSize", String(options.pageSize));

  if (options.search) {
    query.set("search", options.search);
  }
  if (options.sort) {
    query.set("sortColumn", options.sort.column);
    query.set("sortDirection", options.sort.direction);
  }

  if (options.filters) {
    for (const [key, value] of Object.entries(options.filters)) {
      if (value !== undefined && value !== null && value !== "") {
        query.set(`filter.${key}`, String(value));
      }
    }
  }

  const response = await fetch(`/api/data-library/rows?${query.toString()}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
    signal,
  });

  const json: DataLibraryResponse = await response.json();
  return json;
}

export async function fetchFilterOptionsClient(
  tableKey: string,
  columnKey: string,
  signal?: AbortSignal,
): Promise<DataLibraryFilterOptionsResponse | DataLibraryErrorResponse> {
  const query = new URLSearchParams({
    tableKey,
    columnKey,
  });

  const response = await fetch(
    `/api/data-library/filter-options?${query.toString()}`,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
      signal,
    },
  );

  const json = await response.json();
  return json;
}
