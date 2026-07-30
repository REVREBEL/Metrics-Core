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
  Edit3,
  GitPullRequest,
  LockKeyhole,
  RefreshCw,
  Save,
  Search,
  Trash2,
  X,
} from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  discardAllDraftEditsAction,
  discardDraftEditsAction,
  saveDraftEditsAction,
} from "./actions";
import { canonicalizeRowKey } from "./canonicalizer";
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
  const [actionFeedback, setActionFeedback] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  // Unsaved local edits state (key: rowKey -> record of changed fields)
  const [localEdits, setLocalEdits] = useState<
    Record<string, Record<string, unknown>>
  >({});

  // Row inspection
  const [selectedRow, setSelectedRow] = useState<Record<
    string,
    unknown
  > | null>(null);

  // Computed unsaved edit count
  const unsavedEditCount = Object.keys(localEdits).length;

  // Unsaved local edits navigation warning
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (unsavedEditCount > 0) {
        e.preventDefault();
        e.returnValue = "";
      }
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [unsavedEditCount]);

  // Reset page and filters when switching selected table
  useEffect(() => {
    setPage(1);
    setSearch("");
    setFilters({});
    setSelectedRow(null);
    setLocalEdits({});
    setActionFeedback(null);
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
  }, [
    selectedTable,
    page,
    pageSize,
    search,
    sortColumn,
    sortDirection,
    filters,
  ]);

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

  // Local edit handler
  const handleCellEdit = useCallback(
    (rowKey: string, colKey: string, newValue: unknown) => {
      setLocalEdits((prev) => {
        const rowEdits = { ...(prev[rowKey] ?? {}), [colKey]: newValue };
        return { ...prev, [rowKey]: rowEdits };
      });
    },
    [],
  );

  // Save Drafts Action
  const handleSaveDrafts = async () => {
    if (!selectedTable || unsavedEditCount === 0) return;
    setIsSaving(true);
    setActionFeedback(null);

    const changes = Object.entries(localEdits).map(([rowKey, draftPayload]) => {
      const targetRow = rows.find((r) => {
        const overlay = (r as Record<string, unknown>)._overlay as
          | Record<string, unknown>
          | undefined;
        return (
          overlay?.rowKey === rowKey ||
          canonicalizeRowKey(selectedTable.primaryKey, r) === rowKey
        );
      });
      const overlay = targetRow?._overlay as
        | Record<string, unknown>
        | undefined;
      const originalPayload = (overlay?.sourceValues ??
        targetRow ??
        null) as Record<string, unknown> | null;

      return {
        originalPayload,
        draftPayload,
      };
    });

    const res = await saveDraftEditsAction({
      tableKey: selectedTable.key,
      changes,
    });

    setIsSaving(false);
    if (res.success) {
      setLocalEdits({});
      setActionFeedback({
        type: "success",
        message: res.message || "Draft changes persisted successfully.",
      });
      loadRows();
    } else {
      setActionFeedback({
        type: "error",
        message: res.message || "Failed to save draft changes.",
      });
    }
  };

  // Discard Single Row Action
  const handleDiscardRow = async (rowKey: string) => {
    if (!selectedTable) return;
    setActionFeedback(null);

    // If there are unsaved local edits for this row, remove them
    if (localEdits[rowKey]) {
      setLocalEdits((prev) => {
        const copy = { ...prev };
        delete copy[rowKey];
        return copy;
      });
    }

    const res = await discardDraftEditsAction(selectedTable.key, [rowKey]);
    if (res.success) {
      setActionFeedback({
        type: "success",
        message: res.message || "Row draft discarded.",
      });
      loadRows();
    } else {
      setActionFeedback({
        type: "error",
        message: res.message || "Failed to discard row draft.",
      });
    }
  };

  // Discard All Table Drafts Action
  const handleDiscardAll = async () => {
    if (!selectedTable) return;
    setActionFeedback(null);
    setLocalEdits({});

    const res = await discardAllDraftEditsAction(selectedTable.key);
    if (res.success) {
      setActionFeedback({
        type: "success",
        message: res.message || "All table drafts discarded.",
      });
      loadRows();
    } else {
      setActionFeedback({
        type: "error",
        message: res.message || "Failed to discard table drafts.",
      });
    }
  };

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

  // Generate TanStack Column Definitions with Editable Inputs
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
              {col.editable && (
                <Edit3 className="size-2.5 text-primary/70 ml-0.5" />
              )}
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
          const rowData = row.original;
          const overlay = rowData._overlay as
            | Record<string, unknown>
            | undefined;
          const rowKey =
            (overlay?.rowKey as string) ??
            canonicalizeRowKey(selectedTable.primaryKey, rowData);

          const hasSavedDraft =
            overlay?.draftValues !== null && overlay?.draftValues !== undefined;
          const localRowEdits = localEdits[rowKey];
          const hasLocalEdit = localRowEdits && col.key in localRowEdits;

          const currentValue = hasLocalEdit
            ? localRowEdits[col.key]
            : rowData[col.key];

          if (!col.editable) {
            if (col.type === "boolean") {
              const boolVal = Boolean(currentValue);
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

            if (
              currentValue === null ||
              currentValue === undefined ||
              currentValue === ""
            ) {
              return <span className="text-muted-foreground italic">—</span>;
            }

            return (
              <span className="font-mono text-xs text-muted-foreground">
                {String(currentValue)}
              </span>
            );
          }

          // Editable Field Controls
          if (col.type === "boolean") {
            const boolVal = Boolean(currentValue);
            return (
              <div className="flex items-center gap-2">
                <select
                  value={boolVal ? "true" : "false"}
                  onChange={(e) =>
                    handleCellEdit(rowKey, col.key, e.target.value === "true")
                  }
                  className={`h-7 rounded border px-2 text-xs outline-none ${
                    hasLocalEdit
                      ? "border-amber-500 bg-amber-500/10 font-bold"
                      : hasSavedDraft
                        ? "border-blue-500/50 bg-blue-500/5"
                        : "border-border/40 bg-background"
                  }`}
                >
                  <option value="true">Active</option>
                  <option value="false">Inactive</option>
                </select>
                {hasLocalEdit && (
                  <span className="rounded bg-amber-500/20 px-1 py-0.5 text-[9px] font-bold text-amber-600">
                    Unsaved
                  </span>
                )}
                {!hasLocalEdit && hasSavedDraft && (
                  <span className="rounded bg-blue-500/20 px-1 py-0.5 text-[9px] font-bold text-blue-600">
                    Draft
                  </span>
                )}
              </div>
            );
          }

          // Lookup Reference Dropdown or Text Input
          const filterOpts = filterOptionsMap[col.key] ?? [];
          if (col.lookupDependency && filterOpts.length > 0) {
            return (
              <div className="flex items-center gap-1.5 min-w-[140px]">
                <select
                  value={String(currentValue ?? "")}
                  onChange={(e) =>
                    handleCellEdit(rowKey, col.key, e.target.value)
                  }
                  className={`h-7 w-full rounded border px-2 text-xs truncate outline-none ${
                    hasLocalEdit
                      ? "border-amber-500 bg-amber-500/10 font-bold"
                      : hasSavedDraft
                        ? "border-blue-500/50 bg-blue-500/5"
                        : "border-border/40 bg-background"
                  }`}
                >
                  <option value="">-- Select --</option>
                  {filterOpts.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label} ({opt.value})
                    </option>
                  ))}
                </select>
                {hasLocalEdit && (
                  <span className="rounded bg-amber-500/20 px-1 py-0.5 text-[9px] font-bold text-amber-600 shrink-0">
                    Unsaved
                  </span>
                )}
              </div>
            );
          }

          return (
            <div className="flex items-center gap-1.5">
              <input
                type={col.type === "integer" ? "number" : "text"}
                value={String(currentValue ?? "")}
                onChange={(e) =>
                  handleCellEdit(rowKey, col.key, e.target.value)
                }
                className={`h-7 w-full min-w-[120px] rounded border px-2 font-mono text-xs outline-none focus-visible:ring-1 focus-visible:ring-primary ${
                  hasLocalEdit
                    ? "border-amber-500 bg-amber-500/10 font-bold"
                    : hasSavedDraft
                      ? "border-blue-500/50 bg-blue-500/5"
                      : "border-border/40 bg-background"
                }`}
              />
              {hasLocalEdit && (
                <span className="rounded bg-amber-500/20 px-1 py-0.5 text-[9px] font-bold text-amber-600 shrink-0">
                  Unsaved
                </span>
              )}
            </div>
          );
        },
      }));
  }, [
    selectedTable,
    sortColumn,
    sortDirection,
    localEdits,
    filterOptionsMap,
    handleSortToggle,
    handleCellEdit,
  ]);

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
    const overlay = row._overlay as Record<string, unknown> | undefined;
    if (overlay?.rowKey) return String(overlay.rowKey);

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
            Server-governed live BigQuery row reads with Postgres application
            draft editing.
          </p>
        </div>
        <div className="flex items-center gap-2">
          {unsavedEditCount > 0 && (
            <button
              type="button"
              onClick={handleSaveDrafts}
              disabled={isSaving}
              className="flex items-center gap-1.5 rounded-md bg-amber-600 px-3 py-1.5 text-xs font-semibold text-white shadow hover:bg-amber-700 disabled:opacity-50"
            >
              <Save className="size-3.5" /> Save {unsavedEditCount} Draft
              {unsavedEditCount === 1 ? "" : "s"}
            </button>
          )}

          <button
            type="button"
            onClick={handleDiscardAll}
            className="flex items-center gap-1 rounded-md border border-border/40 px-3 py-1.5 text-xs font-medium text-muted-foreground hover:bg-red-500/10 hover:text-red-600"
          >
            <Trash2 className="size-3.5" /> Discard All Drafts
          </button>

          <div className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
            Live Warehouse + Draft Overlay
          </div>
        </div>
      </header>

      {actionFeedback && (
        <div
          className={`flex items-center justify-between rounded-md border p-3 text-xs font-medium ${
            actionFeedback.type === "success"
              ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
              : "border-red-500/30 bg-red-500/10 text-red-600 dark:text-red-400"
          }`}
        >
          <span>{actionFeedback.message}</span>
          <button
            type="button"
            onClick={() => setActionFeedback(null)}
            className="text-muted-foreground hover:text-foreground"
          >
            <X className="size-3.5" />
          </button>
        </div>
      )}

      <div className="grid gap-4 lg:grid-cols-[220px_minmax(0,1fr)_280px]">
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

              {/* Dynamic Dropdowns */}
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
                  Three-Panel Row Inspector
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
                  Canonical Row Identity
                </span>
                <p className="mt-0.5 truncate rounded bg-muted/50 px-2 py-1 font-mono text-[10px] font-bold text-foreground">
                  {getRowPrimaryKeyValue(selectedRow)}
                </p>
              </div>

              <div className="space-y-2 border-t border-border/30 pt-3 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                    Source vs Proposed Draft
                  </span>
                  {selectedRow._overlay && (
                    <button
                      type="button"
                      onClick={() => {
                        const overlay = selectedRow._overlay as Record<
                          string,
                          unknown
                        >;
                        handleDiscardRow(String(overlay.rowKey));
                      }}
                      className="text-[10px] font-semibold text-red-600 hover:underline"
                    >
                      Discard Row
                    </button>
                  )}
                </div>

                <div className="space-y-1.5 max-h-[380px] overflow-y-auto pr-1">
                  {selectedTable.columns.map((col) => {
                    const overlay = selectedRow._overlay as
                      | Record<string, unknown>
                      | undefined;
                    const sourceVal = overlay?.sourceValues
                      ? (overlay.sourceValues as Record<string, unknown>)[
                          col.key
                        ]
                      : selectedRow[col.key];

                    const rowKey =
                      (overlay?.rowKey as string) ??
                      canonicalizeRowKey(selectedTable.primaryKey, selectedRow);
                    const localRowEdits = localEdits[rowKey];
                    const hasLocalEdit =
                      localRowEdits && col.key in localRowEdits;

                    const draftVal = hasLocalEdit
                      ? localRowEdits[col.key]
                      : overlay?.draftValues
                        ? (overlay.draftValues as Record<string, unknown>)[
                            col.key
                          ]
                        : undefined;

                    const isChanged =
                      draftVal !== undefined && draftVal !== sourceVal;

                    return (
                      <div
                        key={col.key}
                        className={`rounded border p-2 ${
                          isChanged
                            ? "border-amber-500/40 bg-amber-500/10"
                            : "border-border/20 bg-background/60"
                        }`}
                      >
                        <div className="flex items-center justify-between text-[10px] text-muted-foreground">
                          <span className="font-semibold">{col.label}</span>
                          <span className="font-mono text-[9px] opacity-70">
                            {col.key}{" "}
                            {col.editable ? "(Editable)" : "(Read-only)"}
                          </span>
                        </div>

                        <div className="mt-1 grid grid-cols-2 gap-2 text-xs font-mono">
                          <div>
                            <span className="block text-[9px] uppercase tracking-wider text-muted-foreground">
                              Source
                            </span>
                            <span className="text-muted-foreground">
                              {sourceVal === null || sourceVal === undefined
                                ? "NULL"
                                : String(sourceVal)}
                            </span>
                          </div>
                          <div>
                            <span className="block text-[9px] uppercase tracking-wider text-amber-600 font-bold">
                              Proposed
                            </span>
                            <span
                              className={
                                isChanged ? "font-bold text-amber-600" : ""
                              }
                            >
                              {draftVal === undefined
                                ? String(sourceVal ?? "NULL")
                                : String(draftVal ?? "NULL")}
                            </span>
                          </div>
                        </div>
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
                    Logical Primary Key
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
