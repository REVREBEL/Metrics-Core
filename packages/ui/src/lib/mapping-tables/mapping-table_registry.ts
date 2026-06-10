export type MappingTableScope = "portfolio" | "property";

export type MappingTableRegistryEntry = {
  key: string;
  displayName: string;
  description: string;
  category: string;
  bigQueryDataset: string;
  bigQueryTable: string;
  primaryKey: string;
  sourceSystemField: string;
  sourceCodeField: string;
  sourceNameField: string;
  standardValueField: string;
  lookupTableDependencies: string[];
  scope: MappingTableScope;
  supportsDrafts: boolean;
  supportsPublish: boolean;
  supportsUnmappedQueue: boolean;
  requiredPermissions: {
    view: string;
    edit: string;
    publish: string;
  };
};

export const mappingTableRegistry: MappingTableRegistryEntry[] = [
  {
    key: "metrics_core.map_hotel",
    displayName: "Hotel Mapping",
    description:
      "Connects property identifiers from PMS, RMS, and reporting sources to standard hotel records.",
    category: "Hotel",
    bigQueryDataset: "metrics_core",
    bigQueryTable: "map_hotel",
    primaryKey: "id",
    sourceSystemField: "source_system",
    sourceCodeField: "source_code",
    sourceNameField: "source_value",
    standardValueField: "standard_code",
    lookupTableDependencies: ["metrics_core.dim_property"],
    scope: "portfolio",
    supportsDrafts: true,
    supportsPublish: true,
    supportsUnmappedQueue: true,
    requiredPermissions: {
      view: "data_library.mapping_tables.view",
      edit: "data_library.mapping_tables.edit",
      publish: "data_library.mapping_tables.publish",
    },
  },
  {
    key: "metrics_core.map_segment",
    displayName: "Segment Mapping",
    description:
      "Maps source segment codes to standardized commercial and finance segment values.",
    category: "Segment",
    bigQueryDataset: "metrics_core",
    bigQueryTable: "map_segment",
    primaryKey: "id",
    sourceSystemField: "source_system",
    sourceCodeField: "source_code",
    sourceNameField: "source_value",
    standardValueField: "standard_code",
    lookupTableDependencies: ["metrics_core.lkp_segment"],
    scope: "portfolio",
    supportsDrafts: true,
    supportsPublish: true,
    supportsUnmappedQueue: true,
    requiredPermissions: {
      view: "data_library.mapping_tables.view",
      edit: "data_library.mapping_tables.edit",
      publish: "data_library.mapping_tables.publish",
    },
  },
  {
    key: "metrics_core.map_channel",
    displayName: "Channel Mapping",
    description:
      "Connects booking-channel values from source systems to the standard channel taxonomy.",
    category: "Channel",
    bigQueryDataset: "metrics_core",
    bigQueryTable: "map_channel",
    primaryKey: "id",
    sourceSystemField: "source_system",
    sourceCodeField: "source_code",
    sourceNameField: "source_value",
    standardValueField: "standard_code",
    lookupTableDependencies: ["metrics_core.lkp_channel"],
    scope: "portfolio",
    supportsDrafts: true,
    supportsPublish: true,
    supportsUnmappedQueue: true,
    requiredPermissions: {
      view: "data_library.mapping_tables.view",
      edit: "data_library.mapping_tables.edit",
      publish: "data_library.mapping_tables.publish",
    },
  },
  {
    key: "metrics_core.map_roomtype",
    displayName: "Room Type Mapping",
    description:
      "Maps source room type values to standard room type, room class, bed type, and room pool values.",
    category: "Room Type",
    bigQueryDataset: "metrics_core",
    bigQueryTable: "map_roomtype",
    primaryKey: "id",
    sourceSystemField: "source_system",
    sourceCodeField: "source_code",
    sourceNameField: "source_value",
    standardValueField: "standard_code",
    lookupTableDependencies: ["metrics_core.lkp_roomtype"],
    scope: "portfolio",
    supportsDrafts: true,
    supportsPublish: true,
    supportsUnmappedQueue: true,
    requiredPermissions: {
      view: "data_library.mapping_tables.view",
      edit: "data_library.mapping_tables.edit",
      publish: "data_library.mapping_tables.publish",
    },
  },
  {
    key: "metrics_core.map_source",
    displayName: "Source Mapping",
    description:
      "Maps source and subsource values to standardized source, subsource, channel, and campaign groupings.",
    category: "Source",
    bigQueryDataset: "metrics_core",
    bigQueryTable: "map_source",
    primaryKey: "id",
    sourceSystemField: "source_system",
    sourceCodeField: "source_code",
    sourceNameField: "source_value",
    standardValueField: "standard_code",
    lookupTableDependencies: ["metrics_core.lkp_channel"],
    scope: "portfolio",
    supportsDrafts: true,
    supportsPublish: true,
    supportsUnmappedQueue: true,
    requiredPermissions: {
      view: "data_library.mapping_tables.view",
      edit: "data_library.mapping_tables.edit",
      publish: "data_library.mapping_tables.publish",
    },
  },
  {
    key: "metrics_core.map_market",
    displayName: "Market Mapping",
    description:
      "Normalizes source market codes into the standard market and commercial grouping taxonomy.",
    category: "Market",
    bigQueryDataset: "metrics_core",
    bigQueryTable: "map_market",
    primaryKey: "id",
    sourceSystemField: "source_system",
    sourceCodeField: "source_code",
    sourceNameField: "source_value",
    standardValueField: "standard_code",
    lookupTableDependencies: ["metrics_core.lkp_segment"],
    scope: "portfolio",
    supportsDrafts: true,
    supportsPublish: true,
    supportsUnmappedQueue: true,
    requiredPermissions: {
      view: "data_library.mapping_tables.view",
      edit: "data_library.mapping_tables.edit",
      publish: "data_library.mapping_tables.publish",
    },
  },
  {
    key: "metrics_core.map_rate",
    displayName: "Rate Mapping",
    description:
      "Maps rate codes to standard rate, rate type, company, segment, channel, source, and subsource values.",
    category: "Rate",
    bigQueryDataset: "metrics_core",
    bigQueryTable: "map_rate",
    primaryKey: "id",
    sourceSystemField: "source_system",
    sourceCodeField: "source_code",
    sourceNameField: "source_value",
    standardValueField: "standard_code",
    lookupTableDependencies: [
      "metrics_core.lkp_segment",
      "metrics_core.lkp_channel",
    ],
    scope: "portfolio",
    supportsDrafts: true,
    supportsPublish: true,
    supportsUnmappedQueue: true,
    requiredPermissions: {
      view: "data_library.mapping_tables.view",
      edit: "data_library.mapping_tables.edit",
      publish: "data_library.mapping_tables.publish",
    },
  },
  {
    key: "metrics_core.map_agency",
    displayName: "Agency Mapping",
    description:
      "Placeholder: Maps agency and account codes to standard agency records. Not yet in fixtures.",
    category: "Agency",
    bigQueryDataset: "metrics_core",
    bigQueryTable: "map_agency",
    primaryKey: "id",
    sourceSystemField: "source_system",
    sourceCodeField: "source_code",
    sourceNameField: "source_value",
    standardValueField: "standard_code",
    lookupTableDependencies: [],
    scope: "portfolio",
    supportsDrafts: false,
    supportsPublish: false,
    supportsUnmappedQueue: false,
    requiredPermissions: {
      view: "data_library.mapping_tables.view",
      edit: "data_library.mapping_tables.edit",
      publish: "data_library.mapping_tables.publish",
    },
  },
];

export function getMappingTableRegistryEntry(
  key: string,
): MappingTableRegistryEntry | undefined {
  return mappingTableRegistry.find((entry) => entry.key === key);
}
