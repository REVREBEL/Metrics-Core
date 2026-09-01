import { BigQuery } from "@google-cloud/bigquery";

export type PublicationColumnType = "boolean" | "date" | "integer" | "string";

export interface PublicationColumnDefinition {
  key: string;
  type: PublicationColumnType;
  editable: boolean;
}

export interface PublicationTableDefinition {
  key: string;
  dataset: string;
  table: string;
  primaryKey: string[];
  columns: PublicationColumnDefinition[];
  publication: "deferred" | "supported";
}

export interface PublicationItem {
  rowKey: string;
  originalPayload: Record<string, unknown> | null;
  submittedPayload: Record<string, unknown>;
}

export interface PublicationConflict {
  rowKey: string;
  message: string;
  conflictingFields: Record<string, { expected: unknown; actual: unknown }>;
}

export interface WarehousePublicationResult {
  success: boolean;
  conflicts: PublicationConflict[];
  publishedRows: number;
  warehouseRowsWritten: number;
  jobId: string | null;
}

let writeClient: BigQuery | null = null;

function getBigQueryWriteClient(): BigQuery {
  if (writeClient) return writeClient;

  const projectId = process.env.BQ_PROJECT_ID ?? "devrebel-big-query-database";
  const location = process.env.BQ_DATA_LOCATION ?? "us-central1";
  const credentialsJson = process.env.GOOGLE_APPLICATION_CREDENTIALS_JSON;

  if (credentialsJson) {
    try {
      writeClient = new BigQuery({
        projectId,
        location,
        credentials: JSON.parse(credentialsJson),
      });
      return writeClient;
    } catch {
      throw new Error(
        "GOOGLE_APPLICATION_CREDENTIALS_JSON is set but is not valid JSON.",
      );
    }
  }

  writeClient = new BigQuery({ projectId, location });
  return writeClient;
}

function quoteIdentifier(identifier: string): string {
  if (!/^[A-Za-z_][A-Za-z0-9_]*$/.test(identifier)) {
    throw new Error(`Unsafe warehouse identifier: ${identifier}`);
  }
  return `\`${identifier}\``;
}

function validateProjectId(projectId: string): string {
  if (!/^[A-Za-z0-9][A-Za-z0-9-]*$/.test(projectId)) {
    throw new Error(`Unsafe BigQuery project id: ${projectId}`);
  }
  return projectId;
}

function fullTableName(
  projectId: string,
  definition: PublicationTableDefinition,
): string {
  const project = validateProjectId(projectId);
  const dataset = quoteIdentifier(definition.dataset).slice(1, -1);
  const table = quoteIdentifier(definition.table).slice(1, -1);
  return `\`${project}.${dataset}.${table}\``;
}

function parseRowKey(
  rowKey: string,
  primaryKey: string[],
): Record<string, string> {
  let parsed: unknown;
  try {
    parsed = JSON.parse(rowKey);
  } catch {
    throw new Error(`Invalid canonical row key: ${rowKey}`);
  }

  if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
    throw new Error(`Invalid canonical row key: ${rowKey}`);
  }

  const record = parsed as Record<string, unknown>;
  const result: Record<string, string> = {};
  for (const key of primaryKey) {
    const value = record[key];
    if (value === null || value === undefined || String(value).length === 0) {
      throw new Error(`Canonical row key is missing ${key}.`);
    }
    result[key] = String(value);
  }
  return result;
}

function normalizeValue(value: unknown, type: PublicationColumnType): unknown {
  if (value === null || value === undefined) return null;
  if (type === "date") {
    if (typeof value === "object" && value !== null && "value" in value) {
      return String((value as { value: unknown }).value);
    }
    if (value instanceof Date) return value.toISOString().slice(0, 10);
    return String(value);
  }
  if (type === "boolean") return Boolean(value);
  if (type === "integer") return Number(value);
  return String(value);
}

function valuesEqual(a: unknown, b: unknown): boolean {
  return (
    a === b ||
    (a === null && b === undefined) ||
    (a === undefined && b === null)
  );
}

function getColumn(
  definition: PublicationTableDefinition,
  key: string,
): PublicationColumnDefinition {
  const column = definition.columns.find((candidate) => candidate.key === key);
  if (!column) {
    throw new Error(`Column ${key} is not registered for ${definition.key}.`);
  }
  return column;
}

async function fetchCurrentRows(
  bq: BigQuery,
  definition: PublicationTableDefinition,
  items: PublicationItem[],
): Promise<Map<string, Record<string, unknown>>> {
  if (items.length === 0) return new Map();

  const projectId = process.env.BQ_PROJECT_ID ?? "devrebel-big-query-database";
  const params: Record<string, unknown> = {};
  const conditions = items.map((item, itemIndex) => {
    const keyValues = parseRowKey(item.rowKey, definition.primaryKey);
    const pieces = definition.primaryKey.map((key, keyIndex) => {
      const paramName = `k_${itemIndex}_${keyIndex}`;
      params[paramName] = keyValues[key];
      return `${quoteIdentifier(key)} = @${paramName}`;
    });
    return `(${pieces.join(" AND ")})`;
  });

  const selectColumns = definition.columns
    .map((column) => quoteIdentifier(column.key))
    .join(", ");
  const [rows] = await bq.query({
    query: `SELECT ${selectColumns} FROM ${fullTableName(projectId, definition)} WHERE ${conditions.join(" OR ")}`,
    params,
    location: process.env.BQ_DATA_LOCATION ?? "us-central1",
    jobTimeoutMs: 10000,
  });

  const result = new Map<string, Record<string, unknown>>();
  for (const rawRow of rows as Record<string, unknown>[]) {
    const normalized: Record<string, unknown> = {};
    for (const column of definition.columns) {
      normalized[column.key] = normalizeValue(rawRow[column.key], column.type);
    }
    const keyRecord: Record<string, string> = {};
    for (const key of definition.primaryKey) {
      keyRecord[key] = String(normalized[key] ?? "");
    }
    result.set(JSON.stringify(keyRecord), normalized);
  }

  return result;
}

export function detectPublicationConflicts(
  definition: PublicationTableDefinition,
  items: PublicationItem[],
  currentRows: Map<string, Record<string, unknown>>,
): {
  conflicts: PublicationConflict[];
  pendingItems: PublicationItem[];
  alreadyApplied: PublicationItem[];
} {
  const conflicts: PublicationConflict[] = [];
  const pendingItems: PublicationItem[] = [];
  const alreadyApplied: PublicationItem[] = [];
  const editableColumns = definition.columns.filter(
    (column) => column.editable,
  );

  for (const item of items) {
    const current = currentRows.get(item.rowKey);
    if (!item.originalPayload) {
      conflicts.push({
        rowKey: item.rowKey,
        message:
          "Creating new warehouse rows is not supported by the current publication contract.",
        conflictingFields: {},
      });
      continue;
    }

    if (!current) {
      conflicts.push({
        rowKey: item.rowKey,
        message: "The warehouse row no longer exists.",
        conflictingFields: {},
      });
      continue;
    }

    const submittedColumns = editableColumns.filter((column) =>
      Object.hasOwn(item.submittedPayload, column.key),
    );
    if (submittedColumns.length === 0) {
      alreadyApplied.push(item);
      continue;
    }

    const conflictingFields: PublicationConflict["conflictingFields"] = {};
    let allSubmittedValuesAlreadyApplied = true;

    for (const column of submittedColumns) {
      const original = normalizeValue(
        item.originalPayload[column.key],
        column.type,
      );
      const submitted = normalizeValue(
        item.submittedPayload[column.key],
        column.type,
      );
      const actual = normalizeValue(current[column.key], column.type);

      if (valuesEqual(actual, submitted)) {
        continue;
      }

      allSubmittedValuesAlreadyApplied = false;
      if (!valuesEqual(actual, original)) {
        conflictingFields[column.key] = { expected: original, actual };
      }
    }

    if (Object.keys(conflictingFields).length > 0) {
      conflicts.push({
        rowKey: item.rowKey,
        message:
          "A field being published changed after this request was drafted.",
        conflictingFields,
      });
      continue;
    }

    if (allSubmittedValuesAlreadyApplied) {
      alreadyApplied.push(item);
    } else {
      pendingItems.push(item);
    }
  }

  return { conflicts, pendingItems, alreadyApplied };
}

function jsonValueExpression(
  jsonAlias: string,
  field: string,
  type: PublicationColumnType,
): string {
  const value = `JSON_VALUE(${jsonAlias}, '$.${field}')`;
  if (type === "boolean") return `SAFE_CAST(${value} AS BOOL)`;
  if (type === "integer") return `SAFE_CAST(${value} AS INT64)`;
  if (type === "date") return `SAFE_CAST(${value} AS DATE)`;
  return value;
}

function buildAtomicMergeSql(
  projectId: string,
  definition: PublicationTableDefinition,
): string {
  const editableColumns = definition.columns.filter(
    (column) => column.editable,
  );
  if (editableColumns.length === 0) {
    throw new Error(
      `No editable columns are registered for ${definition.key}.`,
    );
  }

  const sourceFields: string[] = [];
  for (const key of definition.primaryKey) {
    const column = getColumn(definition, key);
    sourceFields.push(
      `${jsonValueExpression("item", key, column.type)} AS ${quoteIdentifier(key)}`,
    );
  }
  for (const column of editableColumns) {
    sourceFields.push(
      `${jsonValueExpression("item", column.key, column.type)} AS ${quoteIdentifier(column.key)}`,
    );
    sourceFields.push(
      `${jsonValueExpression("item", `_original__${column.key}`, column.type)} AS ${quoteIdentifier(`_original__${column.key}`)}`,
    );
    sourceFields.push(
      `${jsonValueExpression("item", `_apply__${column.key}`, "boolean")} AS ${quoteIdentifier(`_apply__${column.key}`)}`,
    );
  }

  const source = `(
    SELECT ${sourceFields.join(", ")}
    FROM UNNEST(JSON_QUERY_ARRAY(@rows_json)) AS item
  )`;
  const target = fullTableName(projectId, definition);
  const onClause = definition.primaryKey
    .map((key) => `T.${quoteIdentifier(key)} = S.${quoteIdentifier(key)}`)
    .join(" AND ");
  const rowExists = `T.${quoteIdentifier(definition.primaryKey[0])} IS NOT NULL`;
  const snapshotMatches = editableColumns
    .map(
      (column) =>
        `(NOT S.${quoteIdentifier(`_apply__${column.key}`)} OR T.${quoteIdentifier(column.key)} = S.${quoteIdentifier(`_original__${column.key}`)} OR (T.${quoteIdentifier(column.key)} IS NULL AND S.${quoteIdentifier(`_original__${column.key}`)} IS NULL))`,
    )
    .join(" AND ");
  const updateParts = editableColumns.map(
    (column) =>
      `${quoteIdentifier(column.key)} = IF(S.${quoteIdentifier(`_apply__${column.key}`)}, S.${quoteIdentifier(column.key)}, T.${quoteIdentifier(column.key)})`,
  );
  if (definition.columns.some((column) => column.key === "updated_date")) {
    updateParts.push("`updated_date` = CURRENT_DATE()");
  }

  return `
BEGIN TRANSACTION;
ASSERT (
  SELECT COUNT(*)
  FROM ${source} AS S
  LEFT JOIN ${target} AS T
    ON ${onClause}
  WHERE NOT (${rowExists} AND ${snapshotMatches})
) = 0 AS 'DATA_LIBRARY_PUBLICATION_CONFLICT';

MERGE ${target} AS T
USING ${source} AS S
ON ${onClause}
WHEN MATCHED THEN
  UPDATE SET ${updateParts.join(", ")};
COMMIT TRANSACTION;
`;
}

function buildSourceRows(
  definition: PublicationTableDefinition,
  items: PublicationItem[],
): Record<string, unknown>[] {
  const editableColumns = definition.columns.filter(
    (column) => column.editable,
  );
  return items.map((item) => {
    if (!item.originalPayload) {
      throw new Error("New-row publication is not supported.");
    }
    const row: Record<string, unknown> = {
      ...parseRowKey(item.rowKey, definition.primaryKey),
    };
    for (const column of editableColumns) {
      const applies = Object.hasOwn(item.submittedPayload, column.key);
      row[`_apply__${column.key}`] = applies;
      row[column.key] = applies
        ? normalizeValue(item.submittedPayload[column.key], column.type)
        : normalizeValue(item.originalPayload[column.key], column.type);
      row[`_original__${column.key}`] = normalizeValue(
        item.originalPayload[column.key],
        column.type,
      );
    }
    return row;
  });
}

export async function publishRowsToWarehouse(
  definition: PublicationTableDefinition,
  items: PublicationItem[],
): Promise<WarehousePublicationResult> {
  if (definition.publication !== "supported") {
    throw new Error(`Publication is not supported for ${definition.key}.`);
  }
  if (items.length === 0) {
    return {
      success: true,
      conflicts: [],
      publishedRows: 0,
      warehouseRowsWritten: 0,
      jobId: null,
    };
  }

  const bq = getBigQueryWriteClient();
  const currentRows = await fetchCurrentRows(bq, definition, items);
  const initialCheck = detectPublicationConflicts(
    definition,
    items,
    currentRows,
  );
  if (initialCheck.conflicts.length > 0) {
    return {
      success: false,
      conflicts: initialCheck.conflicts,
      publishedRows: 0,
      warehouseRowsWritten: 0,
      jobId: null,
    };
  }

  if (initialCheck.pendingItems.length === 0) {
    return {
      success: true,
      conflicts: [],
      publishedRows: initialCheck.alreadyApplied.length,
      warehouseRowsWritten: 0,
      jobId: null,
    };
  }

  const projectId = process.env.BQ_PROJECT_ID ?? "devrebel-big-query-database";
  const query = buildAtomicMergeSql(projectId, definition);
  const rowsJson = JSON.stringify(
    buildSourceRows(definition, initialCheck.pendingItems),
  );

  try {
    const [job] = await bq.createQueryJob({
      query,
      params: { rows_json: rowsJson },
      location: process.env.BQ_DATA_LOCATION ?? "us-central1",
    });
    await job.getQueryResults();
    return {
      success: true,
      conflicts: [],
      publishedRows: items.length,
      warehouseRowsWritten: initialCheck.pendingItems.length,
      jobId: job.id ?? null,
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    if (message.includes("DATA_LIBRARY_PUBLICATION_CONFLICT")) {
      const latestRows = await fetchCurrentRows(bq, definition, items);
      const raceCheck = detectPublicationConflicts(
        definition,
        items,
        latestRows,
      );
      return {
        success: false,
        conflicts:
          raceCheck.conflicts.length > 0
            ? raceCheck.conflicts
            : initialCheck.pendingItems.map((item) => ({
                rowKey: item.rowKey,
                message:
                  "A field being published changed during publication. Refresh current values and resubmit.",
                conflictingFields: {},
              })),
        publishedRows: 0,
        warehouseRowsWritten: 0,
        jobId: null,
      };
    }
    throw error;
  }
}
