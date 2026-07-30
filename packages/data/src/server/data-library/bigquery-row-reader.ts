import { BigQuery } from "@google-cloud/bigquery";
import {
  type BuiltQuery,
  buildDataLibraryFilterOptionsQuery,
  buildDataLibraryQuery,
} from "../../data-library/query-builder";
import type {
  DataLibraryFilterOptionsResponse,
  DataLibraryQueryOptions,
  DataLibraryReadDefinition,
  DataLibraryRowsResponse,
  DataLibraryResponse,
} from "../../data-library/query-contract";

let _bqClient: BigQuery | null = null;

function getBigQueryClient(): BigQuery {
  if (_bqClient) return _bqClient;

  const projectId = process.env.BQ_PROJECT_ID ?? "devrebel-big-query-database";
  const location = process.env.BQ_DATA_LOCATION ?? "us-central1";
  const credentialsJson = process.env.GOOGLE_APPLICATION_CREDENTIALS_JSON;

  if (credentialsJson) {
    try {
      const credentials = JSON.parse(credentialsJson);
      _bqClient = new BigQuery({ projectId, credentials, location });
      return _bqClient;
    } catch {
      throw new Error("GOOGLE_APPLICATION_CREDENTIALS_JSON set but could not be parsed as valid JSON.");
    }
  }

  _bqClient = new BigQuery({ projectId, location });
  return _bqClient;
}

function normalizeBigQueryValue(value: unknown, type: string): unknown {
  if (value === null || value === undefined) {
    return null;
  }

  if (type === "date") {
    if (typeof value === "object" && value !== null && "value" in value) {
      return String((value as { value: string }).value);
    }
    if (value instanceof Date) {
      return value.toISOString().split("T")[0];
    }
    return String(value);
  }

  if (type === "boolean") {
    return Boolean(value);
  }

  if (type === "integer") {
    const num = Number(value);
    return Number.isNaN(num) ? 0 : Math.round(num);
  }

  return String(value);
}

export async function executeDataLibraryRowRead(
  definition: DataLibraryReadDefinition,
  options: DataLibraryQueryOptions,
): Promise<DataLibraryResponse> {
  try {
    const builtQuery: BuiltQuery = buildDataLibraryQuery(definition, options);
    const bq = getBigQueryClient();
    const location = process.env.BQ_DATA_LOCATION ?? "us-central1";

    const [rowsResult, countResult] = await Promise.all([
      bq.query({
        query: builtQuery.sql,
        params: builtQuery.params,
        location,
        jobTimeoutMs: 10000,
      }),
      bq.query({
        query: builtQuery.countSql,
        params: builtQuery.params,
        location,
        jobTimeoutMs: 10000,
      }),
    ]);

    const rawRows = (rowsResult[0] ?? []) as Record<string, unknown>[];
    const countRows = (countResult[0] ?? []) as Record<string, unknown>[];

    const total =
      countRows.length > 0 && countRows[0].total_count !== undefined
        ? Number(
            typeof countRows[0].total_count === "object" && countRows[0].total_count !== null && "value" in countRows[0].total_count
              ? (countRows[0].total_count as { value: unknown }).value
              : countRows[0].total_count,
          )
        : 0;

    const formattedRows = rawRows.map((rawRow) => {
      const row: Record<string, unknown> = {};
      for (const colDef of definition.columns) {
        if (colDef.visible !== false) {
          row[colDef.key] = normalizeBigQueryValue(rawRow[colDef.key], colDef.type);
        }
      }
      return row;
    });

    const pageSize = builtQuery.limit;
    const page = options.page;
    const totalPages = total > 0 ? Math.ceil(total / pageSize) : 0;

    const response: DataLibraryRowsResponse = {
      success: true,
      data: {
        rows: formattedRows,
        total,
        page,
        pageSize,
        totalPages,
      },
    };

    return response;
  } catch (error: any) {
    const errorMessage = error?.message || "BigQuery query execution failed.";
    const isTimeout = errorMessage.toLowerCase().includes("timeout") || error?.code === 504;

    return {
      success: false,
      error: {
        code: isTimeout ? "TIMEOUT" : "QUERY_FAILED",
        message: isTimeout
          ? "The database query timed out after 10 seconds. Please try again."
          : `Warehouse query error: ${errorMessage}`,
        retryable: true,
      },
    };
  }
}

export async function executeDataLibraryFilterOptionsRead(
  definition: DataLibraryReadDefinition,
  columnKey: string,
): Promise<DataLibraryFilterOptionsResponse | { success: false; error: any }> {
  try {
    const { sql, columnKey: key } = buildDataLibraryFilterOptionsQuery(definition, columnKey);
    const bq = getBigQueryClient();
    const location = process.env.BQ_DATA_LOCATION ?? "us-central1";

    const [rows] = await bq.query({
      query: sql,
      location,
      jobTimeoutMs: 10000,
    });

    const options = (rows as Array<Record<string, unknown>>).map((row) => {
      const strVal = String(row.value ?? "");
      return {
        label: strVal,
        value: strVal,
      };
    });

    return {
      success: true,
      data: {
        columnKey: key,
        options,
      },
    };
  } catch (error: any) {
    return {
      success: false,
      error: {
        code: "QUERY_FAILED",
        message: `Failed to fetch filter options: ${error?.message || "Unknown error"}`,
        retryable: true,
      },
    };
  }
}
