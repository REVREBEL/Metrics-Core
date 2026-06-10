export type MappingTableKey =
  | "metrics_core.map_hotel"
  | "metrics_core.map_segment"
  | "metrics_core.map_channel"
  | "metrics_core.map_roomtype"
  | "metrics_core.map_source"
  | "metrics_core.map_market"
  | "metrics_core.map_rate";

export interface BigQueryTableRef {
  projectId: string;
  datasetId: string;
  tableId: string;
  fullyQualified: string;
}

const DEFAULT_PROJECT_ID = "devrebel-big-query-database";
const DEFAULT_DATASET_ID = "dev_hotel_analytics";
const DEFAULT_DATA_LOCATION = "us-central1";

export function getProjectId(): string {
  return process.env.BQ_PROJECT_ID ?? DEFAULT_PROJECT_ID;
}

export function getDatasetId(): string {
  return process.env.BQ_DATASET_ID ?? DEFAULT_DATASET_ID;
}

export function getDataLocation(): string {
  return process.env.BQ_DATA_LOCATION ?? DEFAULT_DATA_LOCATION;
}

const TABLE_NAME_MAP: Record<MappingTableKey, string> = {
  "metrics_core.map_hotel": "map_hotel",
  "metrics_core.map_segment": "map_segment",
  "metrics_core.map_channel": "map_channel",
  "metrics_core.map_roomtype": "map_roomtype",
  "metrics_core.map_source": "map_source",
  "metrics_core.map_market": "map_market",
  "metrics_core.map_rate": "map_rate",
};

export function getMappingTableRef(
  tableKey: MappingTableKey,
): BigQueryTableRef {
  const tableId = TABLE_NAME_MAP[tableKey];
  const projectId = getProjectId();
  const datasetId = getDatasetId();

  return {
    projectId,
    datasetId,
    tableId,
    fullyQualified: `\`${projectId}.${datasetId}.${tableId}\``,
  };
}

export function isMappingTableKey(key: string): key is MappingTableKey {
  return key in TABLE_NAME_MAP;
}

export const MAPPING_TABLE_KEYS: MappingTableKey[] = Object.keys(
  TABLE_NAME_MAP,
) as MappingTableKey[];
