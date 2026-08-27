"use client";

import type {
  ColumnFiltersState,
  RowData,
  SortingState,
  Table,
} from "@tanstack/react-table";
import { createContext, type ReactNode, useContext, useMemo } from "react";

import { cn } from "@/lib/utils";

declare module "@tanstack/react-table" {
  interface ColumnMeta<TData extends RowData, TValue> {
    headerTitle?: string;
    headerClassName?: string;
    cellClassName?: string;
    skeleton?: ReactNode;
    expandedContent?: (row: TData) => ReactNode;
  }
}

export type DataGridApiFetchParams = {
  pageIndex: number;
  pageSize: number;
  sorting?: SortingState;
  filters?: ColumnFiltersState;
  searchQuery?: string;
};

export type DataGridApiResponse<T> = {
  data: T[];
  empty: boolean;
  pagination: {
    total: number;
    page: number;
  };
};

export interface DataGridContextProps<TData extends object> {
  props: DataGridProps<TData>;
  table: Table<TData>;
  recordCount: number;
  isLoading: boolean;
}

export type DataGridRequestParams = {
  pageIndex: number;
  pageSize: number;
  sorting?: SortingState;
  columnFilters?: ColumnFiltersState;
};

export interface DataGridProps<TData extends object> {
  className?: string;
  table?: Table<TData>;
  recordCount: number;
  children?: ReactNode;
  onRowClick?: (row: TData) => void;
  isLoading?: boolean;
  loadingMode?: "skeleton" | "spinner";
  loadingMessage?: ReactNode | string;
  emptyMessage?: ReactNode | string;
  tableLayout?: {
    dense?: boolean;
    cellBorder?: boolean;
    rowBorder?: boolean;
    rowRounded?: boolean;
    stripped?: boolean;
    headerBackground?: boolean;
    headerBorder?: boolean;
    headerSticky?: boolean;
    width?: "auto" | "fixed";
    columnsVisibility?: boolean;
    columnsResizable?: boolean;
    columnsPinnable?: boolean;
    columnsMovable?: boolean;
    columnsDraggable?: boolean;
    rowsDraggable?: boolean;
  };
  tableClassNames?: {
    base?: string;
    header?: string;
    headerRow?: string;
    headerSticky?: string;
    body?: string;
    bodyRow?: string;
    footer?: string;
    edgeCell?: string;
  };
}

const DataGridContext = createContext<DataGridContextProps<object> | undefined>(
  undefined,
);

function useDataGrid() {
  const context = useContext(DataGridContext);
  if (!context) {
    throw new Error("useDataGrid must be used within a DataGridProvider");
  }
  return context;
}

function DataGridProvider<TData extends object>({
  children,
  table,
  ...props
}: DataGridProps<TData> & { table: Table<TData> }) {
  const { recordCount, isLoading } = props;

  const value = useMemo(
    () => ({
      props,
      table,
      recordCount,
      isLoading: isLoading || false,
    }),
    // biome-ignore lint/correctness/useExhaustiveDependencies: props is used for the context but we also include its individual properties to stabilize the object
    [props, table, recordCount, isLoading],
  );

  return (
    <DataGridContext.Provider value={value}>
      {children}
    </DataGridContext.Provider>
  );
}

const DEFAULT_DATAGRID_PROPS: Partial<DataGridProps<object>> = {
  loadingMode: "skeleton",
  tableLayout: {
    dense: false,
    cellBorder: false,
    rowBorder: true,
    rowRounded: false,
    stripped: false,
    headerSticky: false,
    headerBackground: true,
    headerBorder: true,
    width: "fixed",
    columnsVisibility: false,
    columnsResizable: false,
    columnsPinnable: false,
    columnsMovable: false,
    columnsDraggable: false,
    rowsDraggable: false,
  },
  tableClassNames: {
    base: "",
    header: "",
    headerRow: "",
    headerSticky: "sticky top-0 z-10 bg-background/90 backdrop-blur-xs",
    body: "",
    bodyRow: "",
    footer: "",
    edgeCell: "",
  },
};

function DataGrid<TData extends object>({
  children,
  table,
  ...props
}: DataGridProps<TData>) {
  const {
    className,
    recordCount,
    onRowClick,
    isLoading,
    loadingMode,
    loadingMessage,
    emptyMessage,
    tableLayout,
    tableClassNames,
  } = props;

  const mergedProps = useMemo<DataGridProps<TData>>(
    () => ({
      ...DEFAULT_DATAGRID_PROPS,
      className,
      recordCount,
      onRowClick,
      isLoading,
      loadingMode,
      loadingMessage,
      emptyMessage,
      tableLayout: {
        ...DEFAULT_DATAGRID_PROPS.tableLayout,
        ...(tableLayout || {}),
      },
      tableClassNames: {
        ...DEFAULT_DATAGRID_PROPS.tableClassNames,
        ...(tableClassNames || {}),
      },
    }),
    [
      className,
      recordCount,
      onRowClick,
      isLoading,
      loadingMode,
      loadingMessage,
      emptyMessage,
      tableLayout,
      tableClassNames,
    ],
  );

  // Ensure table is provided
  if (!table) {
    throw new Error('DataGrid requires a "table" prop');
  }

  return (
    <DataGridProvider table={table} {...mergedProps}>
      {children}
    </DataGridProvider>
  );
}

function DataGridContainer({
  children,
  className,
  border = true,
}: {
  children: ReactNode;
  className?: string;
  border?: boolean;
}) {
  return (
    <div
      data-slot="data-grid"
      className={cn(
        "w-full overflow-hidden",
        border && "border-border rounded-lg border",
        className,
      )}
    >
      {children}
    </div>
  );
}

export { DataGrid, DataGridContainer, DataGridProvider, useDataGrid };
