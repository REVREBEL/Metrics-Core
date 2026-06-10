import { inArray } from "drizzle-orm";
import type * as DbModuleTypes from "@/db/index";
import type * as SchemaModuleTypes from "@/db/schema";
import { mappingTableMetadata, mappingTableRowsByKey } from "./fixtures";
import {
  getMappingTableRegistryEntry,
  mappingTableRegistry,
} from "./mapping-table-registry";
import type { MappingTableMetadata, MappingTableRow } from "./types";

type DbModule = typeof DbModuleTypes;
type SchemaModule = typeof SchemaModuleTypes;

async function getDbModules(): Promise<{
  db: DbModule["db"];
  schema: SchemaModule;
} | null> {
  try {
    const [{ db }, schema] = await Promise.all([
      import("@/db/index"),
      import("@/db/schema"),
    ]);
    return { db, schema };
  } catch {
    return null;
  }
}

async function tryGetBigQueryCounts(tableKey: string): Promise<{
  mappedRowCount: number;
  partialRowCount: number;
  unmappedRowCount: number;
  approximateRowCount: number;
} | null> {
  try {
    const { getMappingTableCounts } = await import(
      "@/lib/bigquery/mapping-table-queries"
    );
    return await getMappingTableCounts(tableKey);
  } catch (err) {
    console.warn(
      `[mapping-tables] BigQuery count query failed for "${tableKey}", falling back to fixture counts.`,
      "To enable live counts, configure BigQuery credentials (see docs/bigquery-setup.md).",
      err instanceof Error ? err.message : err,
    );
    return null;
  }
}

function registryEntryToMetadata(
  registryKey: string,
  overrides: Partial<MappingTableMetadata> = {},
  counts?: {
    approximateRowCount: number;
    mappedRowCount: number;
    partialRowCount: number;
    unmappedRowCount: number;
  },
): MappingTableMetadata {
  const entry = getMappingTableRegistryEntry(registryKey);
  const fixtureRows =
    mappingTableRowsByKey[registryKey as keyof typeof mappingTableRowsByKey] ??
    [];

  const now = new Date().toISOString();
  const approximateRowCount = counts?.approximateRowCount ?? fixtureRows.length;
  const mappedRowCount =
    counts?.mappedRowCount ??
    fixtureRows.filter((r) => r.status === "mapped").length;
  const partialRowCount =
    counts?.partialRowCount ??
    fixtureRows.filter((r) => r.status === "partial").length;
  const unmappedRowCount =
    counts?.unmappedRowCount ??
    fixtureRows.filter((r) => r.status === "unmapped").length;

  const fixtureMetadata = mappingTableMetadata.find(
    (m) => m.key === registryKey,
  );

  return {
    key: registryKey,
    displayName:
      overrides.displayName ??
      fixtureMetadata?.displayName ??
      entry?.displayName ??
      registryKey,
    description:
      overrides.description ??
      fixtureMetadata?.description ??
      entry?.description ??
      "",
    sourceTableName:
      overrides.sourceTableName ?? fixtureMetadata?.sourceTableName ?? "",
    standardTableName:
      overrides.standardTableName ??
      fixtureMetadata?.standardTableName ??
      (entry?.bigQueryTable
        ? `${entry.bigQueryDataset}.${entry.bigQueryTable}`
        : ""),
    category:
      overrides.category ?? fixtureMetadata?.category ?? entry?.category ?? "",
    approximateRowCount,
    mappedRowCount,
    partialRowCount,
    unmappedRowCount,
    lastUpdated: overrides.lastUpdated ?? fixtureMetadata?.lastUpdated ?? now,
    lastRefreshed:
      overrides.lastRefreshed ?? fixtureMetadata?.lastRefreshed ?? now,
    status: overrides.status ?? fixtureMetadata?.status ?? "needs_review",
    requiredPermission:
      overrides.requiredPermission ??
      fixtureMetadata?.requiredPermission ??
      entry?.requiredPermissions.view ??
      "data_library.mapping_tables.view",
  };
}

const activeRegistryKeys = mappingTableRegistry
  .filter(
    (entry) =>
      entry.supportsDrafts ||
      entry.supportsPublish ||
      entry.supportsUnmappedQueue,
  )
  .map((entry) => entry.key);

export async function listMappingTables(): Promise<MappingTableMetadata[]> {
  const modules = await getDbModules();

  if (!modules) {
    return mappingTableMetadata;
  }

  const { db, schema } = modules;

  try {
    const rows = await db
      .select()
      .from(schema.dataLibraryTables)
      .where(inArray(schema.dataLibraryTables.tableName, activeRegistryKeys));

    const bqCountsResults = await Promise.all(
      activeRegistryKeys.map(async (key) => {
        const counts = await tryGetBigQueryCounts(key);
        return { tableName: key, counts };
      }),
    );

    const bqCountsByKey = new Map(
      bqCountsResults.map(({ tableName, counts }) => [tableName, counts]),
    );

    const dbRowsByKey = new Map(rows.map((row) => [row.tableName, row]));

    const result = activeRegistryKeys.map((registryKey) => {
      const dbRow = dbRowsByKey.get(registryKey);
      const uiMetadata = (dbRow?.uiMetadata ?? {}) as Record<string, unknown>;
      const bqCounts = bqCountsByKey.get(registryKey) ?? null;

      const overrides: Partial<MappingTableMetadata> = {};
      if (dbRow?.displayName) overrides.displayName = dbRow.displayName;
      if (dbRow?.description) overrides.description = dbRow.description;
      if (uiMetadata.sourceTableName)
        overrides.sourceTableName = String(uiMetadata.sourceTableName);
      if (uiMetadata.standardTableName)
        overrides.standardTableName = String(uiMetadata.standardTableName);
      if (uiMetadata.category) overrides.category = String(uiMetadata.category);
      if (uiMetadata.lastUpdated)
        overrides.lastUpdated = String(uiMetadata.lastUpdated);
      if (uiMetadata.lastRefreshed)
        overrides.lastRefreshed = String(uiMetadata.lastRefreshed);
      if (uiMetadata.status)
        overrides.status = uiMetadata.status as MappingTableMetadata["status"];
      if (uiMetadata.requiredPermission)
        overrides.requiredPermission = String(uiMetadata.requiredPermission);

      return registryEntryToMetadata(
        registryKey,
        overrides,
        bqCounts ?? undefined,
      );
    });

    return result.sort((a, b) => a.displayName.localeCompare(b.displayName));
  } catch {
    return mappingTableMetadata;
  }
}

export async function getMappingTableRows(
  tableKey: string,
): Promise<MappingTableRow[]> {
  const registryEntry = getMappingTableRegistryEntry(tableKey);
  if (!registryEntry) {
    throw new Error(`Mapping table "${tableKey}" is not in the registry`);
  }

  try {
    const { queryMappingTable } = await import(
      "@/lib/bigquery/mapping-table-queries"
    );
    return await queryMappingTable(tableKey);
  } catch (err) {
    console.warn(
      `[mapping-tables] BigQuery row query failed for "${tableKey}", falling back to fixtures.`,
      "To enable live data, configure BigQuery credentials (see docs/bigquery-setup.md).",
      err instanceof Error ? err.message : err,
    );
  }

  const rows =
    mappingTableRowsByKey[tableKey as keyof typeof mappingTableRowsByKey];

  if (!rows) {
    throw new Error(`Mapping table "${tableKey}" was not found in fixtures`);
  }

  return rows;
}
