export type DataLibraryColumnType = "boolean" | "date" | "integer" | "string";

export interface DataLibraryReadColumnDefinition {
  key: string;
  label: string;
  type: DataLibraryColumnType;
  editable: boolean;
  required: boolean;
  description: string;
  lookupDependency?: string;
  searchable?: boolean;
  sortable?: boolean;
  filterable?: boolean;
  visible?: boolean;
  defaultWidth?: number;
}

export interface DataLibraryReadDefinition {
  key: string;
  dataset: string;
  table: string;
  primaryKey: string[];
  defaultSort: {
    column: string;
    direction: "asc" | "desc";
  };
  columns: DataLibraryReadColumnDefinition[];
  permissions: {
    read: string[];
    edit: string[];
    review: string[];
    publish: string[];
  };
}

export interface DataLibraryQueryOptions {
  tableKey: string;
  page: number;
  pageSize: number;
  search?: string;
  filters?: Record<string, string | boolean | number>;
  sort?: {
    column: string;
    direction: "asc" | "desc";
  };
}

export interface DataLibraryRowsPayload<T = Record<string, unknown>> {
  rows: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface DataLibraryRowsResponse<T = Record<string, unknown>> {
  success: true;
  data: DataLibraryRowsPayload<T>;
}

export interface FilterOption {
  label: string;
  value: string;
}

export interface DataLibraryFilterOptionsPayload {
  columnKey: string;
  options: FilterOption[];
}

export interface DataLibraryFilterOptionsResponse {
  success: true;
  data: DataLibraryFilterOptionsPayload;
}

export type DataLibraryErrorCode =
  | "INVALID_REQUEST"
  | "UNAUTHENTICATED"
  | "FORBIDDEN"
  | "TABLE_NOT_REGISTERED"
  | "QUERY_FAILED"
  | "TIMEOUT";

export interface DataLibraryErrorPayload {
  code: DataLibraryErrorCode;
  message: string;
  retryable: boolean;
}

export interface DataLibraryErrorResponse {
  success: false;
  error: DataLibraryErrorPayload;
}

export type DataLibraryResponse<T = Record<string, unknown>> =
  | DataLibraryRowsResponse<T>
  | DataLibraryErrorResponse;
