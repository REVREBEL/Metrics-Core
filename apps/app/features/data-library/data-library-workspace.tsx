"use client";

import { DataGrid, DataGridContainer } from "@data-grid/data-grid";
import { DataGridTable } from "@data-grid/data-grid-table";
import {
  type ColumnDef,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  AlertTriangle,
  ArrowDown,
  ArrowUp,
  ArrowUpDown,
  CheckCircle2,
  Database,
  GitPullRequest,
  LockKeyhole,
  RefreshCw,
  Search,
  X,
} from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { fetchFilterOptionsClient, fetchRowsClient } from "./client";
import type { DataLibraryTableDefinition } from "./registry";

type DataLibraryWorkspaceProps = {
  definitions: DataLibraryTableDefinition[];
};

export function DataLibraryWorkspace({
  definitions,
}: DataLibraryWorkspaceProps) {
  const [selectedKey, setSelectedKey] = useState(definitions[0]?.key ?? "");
  const [tableSearchQuery, setTableSearchQuery] = useState("");

  const selectedTable = useMemo(
    () => definitions.find((d) => d.key === selectedKey) ?? definitions[0],
    [definitions, selectedKey],
  );

  // Grid Query State
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(25);
  const [search, setSearch] = useState("");
  const [sortColumn, setSortColumn] = useState<string>(
    selectedTable?.defaultSort.column ?? "",
  );
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">(
    selectedTable?.defaultSort.direction ?? "asc",
  );
  const [filters, setFilters] = useState<Record<string, string>>({});

  // Active filter options
  const [filterOptionsMap, setFilterOptionsMap] = useState<
    Record<string, Array<{ label: string; value: string }>>
  >({});

  // Data state
  const [rows, setRows] = useState<Record<string, unknown>[]>([]);
  const [totalRows, setTotalRows] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Row inspection
  const [selectedRow, setSelectedRow] = useState<Record<
    string,
    unknown
  > | null>(null);

  // Reset page and filters when switching selected table
  useEffect(() => {
    setPage(1);
    setSearch("");
    setFilters({});
    setSelectedRow(null);
    if (selectedTable) {
      setSortColumn(selectedTable.defaultSort.column);
      setSortDirection(selectedTable.defaultSort.direction);
    }
  }, [selectedTable]);

  // Fetch Rows function
  const loadRows = useCallback(async () => {
    if (!selectedTable) return;
    setIsLoading(true);
    setError(null);

    const controller = new AbortController();

    try {
      const res = await fetchRowsClient(
        {
          tableKey: selectedTable.key,
          page,
          pageSize,
          search: search.trim() || undefined,
          sort: sortColumn
            ? { column: sortColumn, direction: sortDirection }
            : undefined,
          filters,
        },
        controller.signal,
      );

      if (res.success) {
        setRows(res.data.rows);
        setTotalRows(res.data.total);
        setTotalPages(res.data.totalPages);
      } else {
        setError(res.error.message);
        setRows([]);
        setTotalRows(0);
        setTotalPages(0);
      }
    } catch (err: unknown) {
      if (err instanceof Error && err.name !== "AbortError") {
        setError(err.message || "Failed to load warehouse data.");
      }
    } finally {
      setIsLoading(false);
    }

    return () => controller.abort();
  }, [selectedTable, page, pageSize, search, sortColumn, sortDirection, filters]);

  useEffect(() => {
    loadRows();
  }, [loadRows]);

  // Load Filter Options for filterable columns
  useEffect(() => {
    if (!selectedTable) return;

    const filterableCols = selectedTable.columns.filter(
      (c) => c.filterable && c.type === "string",
    );

    for (const col of filterableCols) {
      fetchFilterOptionsClient(selectedTable.key, col.key).then((res) => {
        if (res.success) {
          setFilterOptionsMap((prev) => ({
            ...prev,
            [col.key]: res.data.options,
          }));
        }
      });
    }
  }, [selectedTable]);

  // Filter handlers
  const handleFilterChange = (key: string, value: string) => {
    setPage(1);
    setFilters((prev) => {
      const updated = { ...prev };
      if (!value) {
        delete updated[key];
      } else {
        updated[key] = value;
      }
      return updated;
    });
  };

  const handleClearFilters = () => {
    setPage(1);
    setSearch("");
    setFilters({});
  };

  const activeFilterCount =
    (search.trim() ? 1 : 0) + Object.keys(filters).length;

  // Visible tables filter
  const visibleDefinitions = useMemo(() => {
    const q = tableSearchQuery.trim().toLowerCase();
    if (!q) return definitions;
    return definitions.filter((def) =>
      [def.title, def.description, def.table, def.group].some((v) =>
        v.toLowerCase().includes(q),
      ),
    );
  }, [definitions, tableSearchQuery]);

  // Toggle sorting
  const handleSortToggle = useCallback(
    (colKey: string) => {
      setPage(1);
      if (sortColumn === colKey) {
        if (sortDirection === "asc") {
          setSortDirection("desc");
        } else {
          setSortColumn(selectedTable.defaultSort.column);
          setSortDirection(selectedTable.defaultSort.direction);
        }
      } else {
        setSortColumn(colKey);
        setSortDirection("asc");
      }
    },
    [selectedTable, sortColumn, sortDirection],
  );

  // Generate TanStack Column Definitions
  const columns = useMemo<ColumnDef<Record<string, unknown>>[]>(() => {
    if (!selectedTable) return [];

    return selectedTable.columns
      .filter((col) => col.visible !== false)
      .map((col) => ({
        id: col.key,
        accessorKey: col.key,
        header: () => {
          const isSorted = sortColumn === col.key;
          return (
            <button
              type="button"
              onClick={() =>
                col.sortable !== false && handleSortToggle(col.key)
              }
              className={`flex items-center gap-1 font-semibold text-xs transition-colors ${
                col.sortable !== false
                  ? "hover:text-foreground cursor-pointer"
                  : "cursor-default"
              }`}
            >
              <span>{col.label}</span>
              {col.sortable !== false && (
                <span className="text-muted-foreground">
                  {isSorted ? (
                    sortDirection === "asc" ? (
                      <ArrowUp className="size-3 text-primary" />
                    ) : (
                      <ArrowDown className="size-3 text-primary" />
                    )
                  ) : (
                    <ArrowUpDown className="size-3 opacity-40 hover:opacity-100" />
                  )}
                </span>
              )}
            </button>
          );
        },
        cell: ({ row }) => {
          const val = row.original[col.key];

          if (col.type === "boolean") {
            const boolVal = Boolean(val);
            return (
              <span
                className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-medium ${
                  boolVal
                    ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                {boolVal ? "Active" : "Inactive"}
              </span>
            );
          }

          if (val === null || val === undefined || val === "") {
            return <span className="text-muted-foreground italic">—</span>;
          }

          return (
            <div className="flex items-center gap-1.5 truncate">
              <span className="font-mono text-xs">{String(val)}</span>
              {col.lookupDependency && (
                <span
                  title={`Lookup: ${col.lookupDependency}`}
                  className="rounded bg-primary/10 px-1 py-0.5 text-[9px] font-medium text-primary"
                >
                  ref
                </span>
              )}
            </div>
          );
        },
      }));
  }, [selectedTable, sortColumn, sortDirection, handleSortToggle]);

  // TanStack Table Instance
  const table = useReactTable({
    data: rows,
    columns,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    manualSorting: true,
    pageCount: totalPages,
  });

  if (!selectedTable) {
    return (
      <div className="rounded-lg border border-dashed border-border p-8 text-center text-sm text-muted-foreground">
        No governed tables are registered in the Data Library.
      </div>
    );
  }

  // Row Primary Key string for Inspector
  const getRowPrimaryKeyValue = (row: Record<string, unknown>) => {
    return selectedTable.primaryKey
      .map((pk) => String(row[pk] ?? ""))
      .join(" | ");
  };

  return (
    <div className="space-y-5">
      <header className="flex flex-wrap items-start justify-between gap-4 border-b border-border/40 pb-4">
        <div>
          <div className="mb-1 flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-primary">
            <Database className="size-3.5" />
            Data Governance
          </div>
          <h2 className="text-2xl font-bold tracking-tight">Metrics Library</h2>
          <p className="mt-1 max-w-2xl text-sm text-muted-foreground">
            Server-governed live BigQuery lookup and mapping table management.
          </p>
        </div>
        <div className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
          Live Warehouse Data
        </div>
      </header>

      <div className="grid gap-4 lg:grid-cols-[220px_minmax(0,1fr)_260px]">
        {/* Left Sidebar: Table Selector */}
        <aside className="rounded-xl border border-border/40 bg-muted/10 p-3">
          <div className="relative mb-3">
            <Search className="absolute left-2.5 top-2.5 size-3.5 text-muted-foreground" />
            <input
              value={tableSearchQuery}
              onChange={(e) => setTableSearchQuery(e.target.value)}
              placeholder="Find a table"
              className="h-9 w-full rounded-md border border-border/40 bg-background pl-8 pr-3 text-xs outline-none focus-visible:ring-1 focus-visible:ring-primary"
            />
          </div>
          <div className="space-y-1">
            {visibleDefinitions.map((definition) => (
              <button
                key={definition.key}
                type="button"
                onClick={() => setSelectedKey(definition.key)}
                className={`w-full rounded-md border px-3 py-2 text-left transition-colors ${
                  selectedTable.key === definition.key
                    ? "border-primary/30 bg-primary/10 text-primary font-medium"
                    : "border-transparent text-muted-foreground hover:bg-muted/40 hover:text-foreground"
                }`}
              >
                <span className="block text-xs font-semibold">
                  {definition.title}
                </span>
                <span className="mt-0.5 block text-[10px] uppercase tracking-wider opacity-80">
                  {definition.category} · {definition.group}
                </span>
              </button>
            ))}
          </div>
        </aside>

        {/* Main Canvas: Live DataGrid & Filter Controls */}
        <main className="min-w-0 rounded-xl border border-border/40 bg-background">
          <div className="border-b border-border/30 p-4">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <h3 className="font-semibold">{selectedTable.title}</h3>
                <p className="mt-1 text-xs text-muted-foreground">
                  {selectedTable.description}
                </p>
              </div>
              <code className="rounded bg-muted px-2 py-1 font-mono text-[10px] text-muted-foreground">
                {selectedTable.dataset}.{selectedTable.table}
              </code>
            </div>

            {/* Filter Controls Bar */}
            <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-border/20 pt-3">
              <div className="relative flex-1 min-w-[180px]">
                <Search className="absolute left-2.5 top-2.5 size-3.5 text-muted-foreground" />
                <input
                  value={search}
                  onChange={(e) => {
                    setPage(1);
                    setSearch(e.target.value);
                  }}
                  placeholder={`Search ${selectedTable.title}...`}
                  className="h-8 w-full rounded-md border border-border/40 bg-background pl-8 pr-3 text-xs outline-none focus-visible:ring-1 focus-visible:ring-primary"
                />
              </div>

              {/* Status Filter */}
              <select
                value={filters.is_active ?? ""}
                onChange={(e) =>
                  handleFilterChange("is_active", e.target.value)
                }
                className="h-8 rounded-md border border-border/40 bg-background px-2.5 text-xs text-muted-foreground focus-visible:ring-1 focus-visible:ring-primary"
              >
                <option value="">Status: All</option>
                <option value="true">Active</option>
                <option value="false">Inactive</option>
              </select>

              {/* Dynamic Property / Source App / Segment Group Dropdowns */}
              {selectedTable.columns
                .filter(
                  (c) =>
                    c.filterable && c.type === "string" && c.key !== "code",
                )
                .map((col) => {
                  const options = filterOptionsMap[col.key] ?? [];
                  return (
                    <select
                      key={col.key}
                      value={filters[col.key] ?? ""}
                      onChange={(e) =>
                        handleFilterChange(col.key, e.target.value)
                      }
                      className="h-8 max-w-[160px] rounded-md border border-border/40 bg-background px-2.5 text-xs text-muted-foreground focus-visible:ring-1 focus-visible:ring-primary truncate"
                    >
                      <option value="">{col.label}: All</option>
                      {options.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                  );
                })}

              {/* Clear Filters button */}
              {activeFilterCount > 0 && (
                <button
                  type="button"
                  onClick={handleClearFilters}
                  className="flex h-8 items-center gap-1 rounded-md border border-border/40 px-2.5 text-xs font-medium text-muted-foreground hover:bg-muted/40 hover:text-foreground"
                >
                  <X className="size-3" /> Clear ({activeFilterCount})
                </button>
              )}
            </div>
          </div>

          {/* Grid View Body */}
          <div className="p-4">
            {error ? (
              <div className="rounded-lg border border-red-500/20 bg-red-500/5 p-4">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="size-4 text-red-500 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-semibold text-red-600 dark:text-red-400">
                      Query Error
                    </p>
                    <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                      {error}
                    </p>
                    <button
                      type="button"
                      onClick={loadRows}
                      className="mt-3 flex items-center gap-1.5 rounded-md border border-red-500/30 bg-background px-3 py-1.5 text-xs font-medium text-foreground hover:bg-muted"
                    >
                      <RefreshCw className="size-3" /> Retry query
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <DataGridContainer>
                <DataGrid
                  table={table}
                  recordCount={totalRows}
                  isLoading={isLoading}
                  emptyMessage="No governed rows found."
                  onRowClick={(row) => setSelectedRow(row)}
                >
                  <DataGridTable />
                </DataGrid>

                {/* Pagination Footer */}
                <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border/30 px-4 py-3 text-xs text-muted-foreground">
                  <div>
                    Showing{" "}
                    <span className="font-semibold text-foreground">
                      {rows.length > 0 ? (page - 1) * pageSize + 1 : 0}
                    </span>{" "}
                    to{" "}
                    <span className="font-semibold text-foreground">
                      {Math.min(page * pageSize, totalRows)}
                    </span>{" "}
                    of{" "}
                    <span className="font-semibold text-foreground">
                      {totalRows}
                    </span>{" "}
                    rows
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1.5">
                      <span>Per page:</span>
                      <select
                        value={pageSize}
                        onChange={(e) => {
                          setPage(1);
                          setPageSize(Number(e.target.value));
                        }}
                        className="h-7 rounded border border-border/40 bg-background px-2 text-xs text-foreground focus-visible:ring-1 focus-visible:ring-primary"
                      >
                        <option value="10">10</option>
                        <option value="25">25</option>
                        <option value="50">50</option>
                        <option value="100">100</option>
                      </select>
                    </div>

                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        disabled={page <= 1 || isLoading}
                        onClick={() => setPage((p) => Math.max(1, p - 1))}
                        className="rounded border border-border/40 px-2.5 py-1 text-xs font-medium text-foreground disabled:opacity-40 hover:bg-muted/40"
                      >
                        Previous
                      </button>
                      <span className="px-2 font-mono text-xs">
                        {page} / {Math.max(1, totalPages)}
                      </span>
                      <button
                        type="button"
                        disabled={page >= totalPages || isLoading}
                        onClick={() => setPage((p) => p + 1)}
                        className="rounded border border-border/40 px-2.5 py-1 text-xs font-medium text-foreground disabled:opacity-40 hover:bg-muted/40"
                      >
                        Next
                      </button>
                    </div>
                  </div>
                </div>
              </DataGridContainer>
            )}
          </div>
        </main>

        {/* Right Sidebar: Table / Row Inspector */}
        <aside className="space-y-4 rounded-xl border border-border/40 bg-muted/10 p-4">
          {selectedRow ? (
            /* ROW MODE */
            <div className="space-y-3">
              <div className="flex items-center justify-between border-b border-border/30 pb-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-primary">
                  Row Inspector
                </span>
                <button
                  type="button"
                  onClick={() => setSelectedRow(null)}
                  className="rounded p-1 text-muted-foreground hover:bg-muted hover:text-foreground"
                >
                  <X className="size-3.5" />
                </button>
              </div>

              <div>
                <span className="text-[10px] uppercase tracking-wider text-muted-foreground">
                  Logical Primary Key
                </span>
                <p className="mt-0.5 rounded bg-muted/50 px-2 py-1 font-mono text-xs font-bold text-foreground">
                  {getRowPrimaryKeyValue(selectedRow)}
                </p>
              </div>

              <div className="space-y-2 border-t border-border/30 pt-3 text-xs">
                <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                  Attribute Values
                </span>
                <div className="space-y-1.5 max-h-[360px] overflow-y-auto pr-1">
                  {selectedTable.columns.map((col) => {
                    const val = selectedRow[col.key];
                    return (
                      <div
                        key={col.key}
                        className="rounded border border-border/20 bg-background/60 p-2"
                      >
                        <div className="flex items-center justify-between text-[10px] text-muted-foreground">
                          <span className="font-semibold">{col.label}</span>
                          <span className="font-mono text-[9px] opacity-70">
                            {col.key}
                          </span>
                        </div>
                        <div className="mt-1 font-mono text-xs">
                          {col.type === "boolean" ? (
                            <span
                              className={`font-semibold ${
                                val
                                  ? "text-emerald-600"
                                  : "text-muted-foreground"
                              }`}
                            >
                              {val ? "TRUE" : "FALSE"}
                            </span>
                          ) : val === null ||
                            val === undefined ||
                            val === "" ? (
                            <span className="text-muted-foreground italic">
                              NULL
                            </span>
                          ) : (
                            String(val)
                          )}
                        </div>
                        {col.lookupDependency && (
                          <div className="mt-1 text-[9px] text-muted-foreground">
                            Dependency:{" "}
                            <span className="font-mono text-primary">
                              {col.lookupDependency}
                            </span>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          ) : (
            /* TABLE MODE */
            <div className="space-y-3">
              <div>
                <div className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                  Table Inspector
                </div>
                <h4 className="mt-1 font-semibold text-sm">
                  {selectedTable.title}
                </h4>
                <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                  {selectedTable.grain}
                </p>
              </div>

              <dl className="space-y-3 border-t border-border/30 pt-3 text-xs">
                <div>
                  <dt className="text-[10px] uppercase tracking-wider text-muted-foreground">
                    Logical Key
                  </dt>
                  <dd className="mt-1 font-mono text-[10px] font-semibold text-foreground">
                    {selectedTable.primaryKey.join(" + ")}
                  </dd>
                </div>
                <div>
                  <dt className="flex items-center gap-1 text-[10px] uppercase tracking-wider text-muted-foreground">
                    <LockKeyhole className="size-3" /> Concurrency
                  </dt>
                  <dd className="mt-1 text-amber-600 dark:text-amber-400 font-medium">
                    {selectedTable.concurrency.status}
                  </dd>
                  <p className="mt-0.5 text-[10px] text-muted-foreground leading-tight">
                    {selectedTable.concurrency.reason}
                  </p>
                </div>
                <div>
                  <dt className="flex items-center gap-1 text-[10px] uppercase tracking-wider text-muted-foreground">
                    <GitPullRequest className="size-3" /> Publication
                  </dt>
                  <dd className="mt-1 capitalize text-muted-foreground">
                    {selectedTable.publication}
                  </dd>
                </div>
                <div>
                  <dt className="flex items-center gap-1 text-[10px] uppercase tracking-wider text-muted-foreground">
                    <CheckCircle2 className="size-3" /> Current Value Owner
                  </dt>
                  <dd className="mt-1 font-mono text-[10px]">
                    {selectedTable.currentValueOwner}
                  </dd>
                </div>
              </dl>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}
