import type {
  DataLibraryQueryOptions,
  DataLibraryReadDefinition,
} from "./query-contract";

export interface BuiltQuery {
  sql: string;
  countSql: string;
  params: Record<string, unknown>;
  limit: number;
  offset: number;
}

export function buildDataLibraryQuery(
  definition: DataLibraryReadDefinition,
  options: DataLibraryQueryOptions,
): BuiltQuery {
  // Validate pagination parameters
  if (options.page < 1 || !Number.isInteger(options.page)) {
    throw new Error("Page index must be an integer >= 1");
  }
  if (
    options.pageSize < 1 ||
    options.pageSize > 100 ||
    !Number.isInteger(options.pageSize)
  ) {
    throw new Error("Page size must be an integer between 1 and 100");
  }

  // Quoted table reference
  const tableRef = `\`${definition.dataset}\`.\`${definition.table}\``;

  // Selected columns (visible columns only)
  const visibleColumns = definition.columns.filter((col) => col.visible !== false);
  if (visibleColumns.length === 0) {
    throw new Error(`Table '${definition.key}' has no visible columns defined.`);
  }
  const selectClause = visibleColumns.map((col) => `\`${col.key}\``).join(", ");

  const conditions: string[] = [];
  const params: Record<string, unknown> = {};

  // 1. Parameterized Search
  if (options.search && options.search.trim()) {
    const rawSearch = options.search.trim().slice(0, 100);
    const searchableCols = visibleColumns.filter(
      (col) => col.searchable && col.type === "string",
    );

    if (searchableCols.length > 0) {
      const searchConditions = searchableCols.map(
        (col) => `LOWER(\`${col.key}\`) LIKE @searchParam`,
      );
      conditions.push(`(${searchConditions.join(" OR ")})`);
      params.searchParam = `%${rawSearch.toLowerCase()}%`;
    }
  }

  // 2. Parameterized Filters
  if (options.filters) {
    for (const [filterKey, filterValue] of Object.entries(options.filters)) {
      if (filterValue === undefined || filterValue === null || filterValue === "") {
        continue;
      }

      const colDef = visibleColumns.find((col) => col.key === filterKey);
      if (!colDef || !colDef.filterable) {
        // Ignore unfilterable or unregistered filter columns
        continue;
      }

      const paramName = `filter_${colDef.key}`;

      if (colDef.type === "boolean") {
        const boolVal =
          filterValue === true ||
          filterValue === "true" ||
          filterValue === "1" ||
          filterValue === 1;
        conditions.push(`\`${colDef.key}\` = @${paramName}`);
        params[paramName] = boolVal;
      } else if (colDef.type === "integer") {
        const intVal = Number.parseInt(String(filterValue), 10);
        if (!Number.isNaN(intVal)) {
          conditions.push(`\`${colDef.key}\` = @${paramName}`);
          params[paramName] = intVal;
        }
      } else {
        conditions.push(`\`${colDef.key}\` = @${paramName}`);
        params[paramName] = String(filterValue);
      }
    }
  }

  const whereClause =
    conditions.length > 0 ? `WHERE ${conditions.join(" AND ")}` : "";

  // 3. Sorting & Deduplication
  const requestedSortCol = options.sort?.column;
  const requestedSortDir =
    options.sort?.direction?.toLowerCase() === "desc" ? "DESC" : "ASC";

  const primarySortColDef = requestedSortCol
    ? visibleColumns.find((col) => col.key === requestedSortCol && col.sortable !== false)
    : undefined;

  const activeSortCol = primarySortColDef
    ? primarySortColDef.key
    : definition.defaultSort.column;
  const activeSortDir = primarySortColDef
    ? requestedSortDir
    : definition.defaultSort.direction.toUpperCase();

  const sortParts: string[] = [`\`${activeSortCol}\` ${activeSortDir} NULLS LAST`];

  // Secondary sort: append primaryKey columns not already matching activeSortCol
  for (const pkCol of definition.primaryKey) {
    if (pkCol !== activeSortCol && visibleColumns.some((col) => col.key === pkCol)) {
      sortParts.push(`\`${pkCol}\` ASC NULLS LAST`);
    }
  }

  const orderByClause = `ORDER BY ${sortParts.join(", ")}`;

  // 4. Pagination
  const limit = options.pageSize;
  const offset = (options.page - 1) * options.pageSize;

  params.limitParam = limit;
  params.offsetParam = offset;

  const sql = `
    SELECT ${selectClause}
    FROM ${tableRef}
    ${whereClause}
    ${orderByClause}
    LIMIT @limitParam OFFSET @offsetParam
  `.trim();

  const countSql = `
    SELECT COUNT(*) AS total_count
    FROM ${tableRef}
    ${whereClause}
  `.trim();

  return {
    sql,
    countSql,
    params,
    limit,
    offset,
  };
}

export function buildDataLibraryFilterOptionsQuery(
  definition: DataLibraryReadDefinition,
  columnKey: string,
): { sql: string; columnKey: string } {
  const colDef = definition.columns.find((col) => col.key === columnKey);
  if (!colDef || !colDef.filterable) {
    throw new Error(
      `Column '${columnKey}' is not a filterable column for table '${definition.key}'.`,
    );
  }

  const tableRef = `\`${definition.dataset}\`.\`${definition.table}\``;
  const sql = `
    SELECT DISTINCT \`${colDef.key}\` AS value
    FROM ${tableRef}
    WHERE \`${colDef.key}\` IS NOT NULL
    ORDER BY value ASC
    LIMIT 100
  `.trim();

  return {
    sql,
    columnKey: colDef.key,
  };
}
