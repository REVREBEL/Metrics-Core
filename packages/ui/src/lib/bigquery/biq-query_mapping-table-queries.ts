import type {
  MappingRowStatus,
  MappingTableRow,
} from "@mapping-tables/mapping-table_types.ts";

import { getBigQueryClient } from "./client";
import {
  getDataLocation,
  getMappingTableRef,
  isMappingTableKey,
  type MappingTableKey,
} from "./config";

export interface MappingTableQueryOptions {
  sourceSystem?: string;
  status?: MappingRowStatus;
  search?: string;
  limit?: number;
  offset?: number;
}

export interface MappingTableCounts {
  mappedRowCount: number;
  partialRowCount: number;
  unmappedRowCount: number;
  approximateRowCount: number;
}

export interface MappingTableSchemaField {
  name: string;
  type: string;
  mode: string;
  description?: string;
}

export async function queryMappingTable(
  tableKey: string,
  options: MappingTableQueryOptions = {},
): Promise<MappingTableRow[]> {
  if (!isMappingTableKey(tableKey)) {
    throw new Error(`Unknown mapping table key: ${tableKey}`);
  }

  const bq = getBigQueryClient();
  const ref = getMappingTableRef(tableKey as MappingTableKey);

  const conditions: string[] = [];
  const params: Record<string, unknown> = {};

  if (options.sourceSystem) {
    conditions.push("source_system = @sourceSystem");
    params.sourceSystem = options.sourceSystem;
  }

  if (options.status) {
    conditions.push("mapping_status = @status");
    params.status = options.status;
  }

  if (options.search) {
    conditions.push(
      "(LOWER(source_code) LIKE @search OR LOWER(source_value) LIKE @search OR LOWER(standard_code) LIKE @search OR LOWER(standard_value) LIKE @search)",
    );
    params.search = `%${options.search.toLowerCase()}%`;
  }

  const whereClause =
    conditions.length > 0 ? `WHERE ${conditions.join(" AND ")}` : "";
  const limitClause = `LIMIT ${options.limit ?? 500}`;
  const offsetClause = options.offset ? `OFFSET ${options.offset}` : "";

  const query = `
    SELECT
      COALESCE(CAST(id AS STRING), GENERATE_UUID()) AS id,
      COALESCE(source_system, '') AS source_system,
      COALESCE(source_code, '') AS source_code,
      COALESCE(source_value, '') AS source_value,
      COALESCE(standard_code, '') AS standard_code,
      COALESCE(standard_value, '') AS standard_value,
      standard_group,
      COALESCE(CAST(confidence AS FLOAT64), 0.0) AS confidence,
      COALESCE(mapping_status, 'unmapped') AS mapping_status,
      review_reason,
      COALESCE(CAST(updated_at AS STRING), CAST(CURRENT_TIMESTAMP() AS STRING)) AS updated_at,
      COALESCE(updated_by, '') AS updated_by
    FROM ${ref.fullyQualified}
    ${whereClause}
    ORDER BY source_system, source_code
    ${limitClause}
    ${offsetClause}
  `;

  const [rows] = await bq.query({
    query,
    params,
    location: getDataLocation(),
  });

  return rows.map((row: Record<string, unknown>) =>
    mapBigQueryRowToMappingTableRow(row),
  );
}

export async function getMappingTableCounts(
  tableKey: string,
): Promise<MappingTableCounts> {
  if (!isMappingTableKey(tableKey)) {
    throw new Error(`Unknown mapping table key: ${tableKey}`);
  }

  const bq = getBigQueryClient();
  const ref = getMappingTableRef(tableKey as MappingTableKey);

  const query = `
    SELECT
      COALESCE(mapping_status, 'unmapped') AS mapping_status,
      COUNT(*) AS row_count
    FROM ${ref.fullyQualified}
    GROUP BY mapping_status
  `;

  const [rows] = await bq.query({ query, location: getDataLocation() });

  let mappedRowCount = 0;
  let partialRowCount = 0;
  let unmappedRowCount = 0;
  let approximateRowCount = 0;

  for (const row of rows as Array<{
    mapping_status: string;
    row_count: number | { value: string };
  }>) {
    const count =
      typeof row.row_count === "object" && "value" in row.row_count
        ? Number(row.row_count.value)
        : Number(row.row_count);

    approximateRowCount += count;

    switch (row.mapping_status) {
      case "mapped":
        mappedRowCount = count;
        break;
      case "partial":
        partialRowCount = count;
        break;
      case "unmapped":
      case "inactive":
        unmappedRowCount += count;
        break;
    }
  }

  return {
    mappedRowCount,
    partialRowCount,
    unmappedRowCount,
    approximateRowCount,
  };
}

export async function getMappingTableSchema(
  tableKey: string,
): Promise<MappingTableSchemaField[]> {
  if (!isMappingTableKey(tableKey)) {
    throw new Error(`Unknown mapping table key: ${tableKey}`);
  }

  const bq = getBigQueryClient();
  const ref = getMappingTableRef(tableKey as MappingTableKey);

  const dataset = bq.dataset(ref.datasetId, { projectId: ref.projectId });
  const table = dataset.table(ref.tableId);
  const [metadata] = await table.getMetadata();

  const fields: Array<{
    name: string;
    type: string;
    mode: string;
    description?: string;
  }> = metadata.schema?.fields ?? [];

  return fields.map((field) => ({
    name: field.name,
    type: field.type,
    mode: field.mode ?? "NULLABLE",
    description: field.description,
  }));
}

function mapBigQueryRowToMappingTableRow(
  row: Record<string, unknown>,
): MappingTableRow {
  return {
    id: String(row.id ?? ""),
    sourceSystem: String(row.source_system ?? ""),
    sourceCode: String(row.source_code ?? ""),
    sourceValue: String(row.source_value ?? ""),
    standardCode: String(row.standard_code ?? ""),
    standardValue: String(row.standard_value ?? ""),
    standardGroup: row.standard_group ? String(row.standard_group) : undefined,
    confidence: Number(row.confidence ?? 0),
    status: normalizeStatus(row.mapping_status),
    reviewReason: row.review_reason ? String(row.review_reason) : undefined,
    updatedAt: String(row.updated_at ?? new Date().toISOString()),
    updatedBy: String(row.updated_by ?? ""),
  };
}

function normalizeStatus(value: unknown): MappingRowStatus {
  const validStatuses: MappingRowStatus[] = [
    "mapped",
    "partial",
    "unmapped",
    "inactive",
  ];
  if (
    typeof value === "string" &&
    validStatuses.includes(value as MappingRowStatus)
  ) {
    return value as MappingRowStatus;
  }
  return "unmapped";
}
