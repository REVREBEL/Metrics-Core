import type { MappingTableMetadata, MappingTableRow } from "./types";

export type MappingTableKey =
  | "metrics_core.map_hotel"
  | "metrics_core.map_segment"
  | "metrics_core.map_channel"
  | "metrics_core.map_roomtype"
  | "metrics_core.map_source"
  | "metrics_core.map_market"
  | "metrics_core.map_rate";

type MappingTableMetadataEntry = Omit<
  MappingTableMetadata,
  | "approximateRowCount"
  | "mappedRowCount"
  | "partialRowCount"
  | "unmappedRowCount"
> & {
  key: MappingTableKey;
};

const now = "2026-05-28T07:45:00.000Z";

export const mappingTableRowsByKey: Record<MappingTableKey, MappingTableRow[]> =
  {
    "metrics_core.map_hotel": [
      {
        id: "hotel-map-001",
        sourceSystem: "PMS",
        sourceCode: "AUS01",
        sourceValue: "Austin Downtown",
        standardCode: "DEMO_001",
        standardValue: "Demo Hotel",
        standardGroup: "Austin",
        confidence: 98,
        status: "mapped",
        updatedAt: now,
        updatedBy: "Dataform Inventory",
      },
      {
        id: "hotel-map-002",
        sourceSystem: "RMS",
        sourceCode: "DEN-CENTRAL",
        sourceValue: "Denver Central",
        standardCode: "RR_DEN",
        standardValue: "Denver Central",
        standardGroup: "Denver",
        confidence: 95,
        status: "mapped",
        updatedAt: now,
        updatedBy: "Dataform Inventory",
      },
    ],
    "metrics_core.map_segment": [
      {
        id: "segment-map-001",
        sourceSystem: "PMS",
        sourceCode: "BAR",
        sourceValue: "Best Available Rate",
        standardCode: "TRANSIENT",
        standardValue: "Transient",
        standardGroup: "Transient",
        confidence: 94,
        status: "mapped",
        updatedAt: now,
        updatedBy: "Dataform Inventory",
      },
      {
        id: "segment-map-002",
        sourceSystem: "CRS",
        sourceCode: "LNR",
        sourceValue: "Local Negotiated Rate",
        standardCode: "NEGOTIATED",
        standardValue: "Negotiated",
        standardGroup: "Transient",
        confidence: 82,
        status: "partial",
        reviewReason: "Segment is mapped, but finance grouping needs review.",
        updatedAt: now,
        updatedBy: "Dataform Inventory",
      },
      {
        id: "segment-map-003",
        sourceSystem: "PMS",
        sourceCode: "UNK",
        sourceValue: "Unknown Segment",
        standardCode: "",
        standardValue: "",
        confidence: 0,
        status: "unmapped",
        reviewReason: "No standard segment found for source code.",
        updatedAt: now,
        updatedBy: "Unmapped Code Queue",
      },
    ],
    "metrics_core.map_channel": [
      {
        id: "channel-map-001",
        sourceSystem: "CRS",
        sourceCode: "WEB",
        sourceValue: "Brand Website",
        standardCode: "DIRECT",
        standardValue: "Direct",
        standardGroup: "Owned",
        confidence: 97,
        status: "mapped",
        updatedAt: now,
        updatedBy: "Dataform Inventory",
      },
      {
        id: "channel-map-002",
        sourceSystem: "CRS",
        sourceCode: "BKNG",
        sourceValue: "Booking.com",
        standardCode: "OTA",
        standardValue: "Online Travel Agency",
        standardGroup: "Third Party",
        confidence: 96,
        status: "mapped",
        updatedAt: now,
        updatedBy: "Dataform Inventory",
      },
    ],
    "metrics_core.map_roomtype": [
      {
        id: "room-map-001",
        sourceSystem: "PMS",
        sourceCode: "KNG",
        sourceValue: "King Room",
        standardCode: "KING",
        standardValue: "King",
        standardGroup: "Standard",
        confidence: 93,
        status: "mapped",
        updatedAt: now,
        updatedBy: "Dataform Inventory",
      },
      {
        id: "room-map-002",
        sourceSystem: "PMS",
        sourceCode: "STE",
        sourceValue: "Suite",
        standardCode: "SUITE",
        standardValue: "Suite",
        standardGroup: "Premium",
        confidence: 90,
        status: "partial",
        reviewReason: "Room pool has not been assigned.",
        updatedAt: now,
        updatedBy: "Dataform Inventory",
      },
    ],
    "metrics_core.map_source": [
      {
        id: "source-map-001",
        sourceSystem: "CRS",
        sourceCode: "GOOG",
        sourceValue: "Google Hotel Ads",
        standardCode: "METASEARCH",
        standardValue: "Metasearch",
        standardGroup: "Paid Media",
        confidence: 88,
        status: "partial",
        reviewReason: "Subsource is mapped, but campaign grouping is pending.",
        updatedAt: now,
        updatedBy: "Dataform Inventory",
      },
      {
        id: "source-map-002",
        sourceSystem: "PMS",
        sourceCode: "FRONT",
        sourceValue: "Front Desk",
        standardCode: "DIRECT",
        standardValue: "Direct",
        standardGroup: "Owned",
        confidence: 99,
        status: "mapped",
        updatedAt: now,
        updatedBy: "Dataform Inventory",
      },
    ],
    "metrics_core.map_market": [
      {
        id: "market-map-001",
        sourceSystem: "PMS",
        sourceCode: "BUS",
        sourceValue: "Business",
        standardCode: "CORPORATE",
        standardValue: "Corporate",
        standardGroup: "Commercial",
        confidence: 80,
        status: "partial",
        reviewReason: "Market is mapped, but segment crosswalk needs review.",
        updatedAt: now,
        updatedBy: "Dataform Inventory",
      },
      {
        id: "market-map-002",
        sourceSystem: "PMS",
        sourceCode: "LEI",
        sourceValue: "Leisure",
        standardCode: "LEISURE",
        standardValue: "Leisure",
        standardGroup: "Retail",
        confidence: 91,
        status: "mapped",
        updatedAt: now,
        updatedBy: "Dataform Inventory",
      },
    ],
    "metrics_core.map_rate": [
      {
        id: "rate-map-001",
        sourceSystem: "CRS",
        sourceCode: "ADV14",
        sourceValue: "Advance Purchase 14",
        standardCode: "ADVANCE_PURCHASE",
        standardValue: "Advance Purchase",
        standardGroup: "Public",
        confidence: 87,
        status: "mapped",
        updatedAt: now,
        updatedBy: "Dataform Inventory",
      },
      {
        id: "rate-map-002",
        sourceSystem: "CRS",
        sourceCode: "PKGSP",
        sourceValue: "Spring Package",
        standardCode: "",
        standardValue: "",
        confidence: 0,
        status: "unmapped",
        reviewReason: "Package rate has no standard rate code.",
        updatedAt: now,
        updatedBy: "Unmapped Code Queue",
      },
    ],
  };

const mappingMetadataBase: MappingTableMetadataEntry[] = [
  {
    key: "metrics_core.map_hotel",
    displayName: "Hotel Mapping",
    description:
      "Connects property identifiers from PMS, RMS, and reporting sources to standard hotel records.",
    sourceTableName: "source_property_codes",
    standardTableName: "metrics_core.dim_property",
    category: "Hotel",
    lastUpdated: now,
    lastRefreshed: now,
    status: "ready",
    requiredPermission: "data_library.mapping_tables.view",
  },
  {
    key: "metrics_core.map_segment",
    displayName: "Segment Mapping",
    description:
      "Maps source segment codes to standardized commercial and finance segment values.",
    sourceTableName: "source_segment_codes",
    standardTableName: "metrics_core.lkp_segment",
    category: "Segment",
    lastUpdated: now,
    lastRefreshed: now,
    status: "needs_review",
    requiredPermission: "data_library.mapping_tables.view",
  },
  {
    key: "metrics_core.map_channel",
    displayName: "Channel Mapping",
    description:
      "Connects booking-channel values from source systems to the standard channel taxonomy.",
    sourceTableName: "source_channel_codes",
    standardTableName: "metrics_core.lkp_channel",
    category: "Channel",
    lastUpdated: now,
    lastRefreshed: now,
    status: "ready",
    requiredPermission: "data_library.mapping_tables.view",
  },
  {
    key: "metrics_core.map_roomtype",
    displayName: "Room Type Mapping",
    description:
      "Maps source room type values to standard room type, room class, bed type, and room pool values.",
    sourceTableName: "source_room_type_codes",
    standardTableName: "metrics_core.lkp_roomtype",
    category: "Room Type",
    lastUpdated: now,
    lastRefreshed: now,
    status: "partial",
    requiredPermission: "data_library.mapping_tables.view",
  },
  {
    key: "metrics_core.map_source",
    displayName: "Source Mapping",
    description:
      "Maps source and subsource values to standardized source, subsource, channel, and campaign groupings.",
    sourceTableName: "source_source_codes",
    standardTableName: "metrics_core.lkp_source",
    category: "Source",
    lastUpdated: now,
    lastRefreshed: now,
    status: "partial",
    requiredPermission: "data_library.mapping_tables.view",
  },
  {
    key: "metrics_core.map_market",
    displayName: "Market Mapping",
    description:
      "Normalizes source market codes into the standard market and commercial grouping taxonomy.",
    sourceTableName: "source_market_codes",
    standardTableName: "metrics_core.lkp_market",
    category: "Market",
    lastUpdated: now,
    lastRefreshed: now,
    status: "partial",
    requiredPermission: "data_library.mapping_tables.view",
  },
  {
    key: "metrics_core.map_rate",
    displayName: "Rate Mapping",
    description:
      "Maps rate codes to standard rate, rate type, company, segment, channel, source, and subsource values.",
    sourceTableName: "source_rate_codes",
    standardTableName: "metrics_core.lkp_rate",
    category: "Rate",
    lastUpdated: now,
    lastRefreshed: now,
    status: "needs_review",
    requiredPermission: "data_library.mapping_tables.view",
  },
];

export const mappingTableMetadata: MappingTableMetadata[] =
  mappingMetadataBase.map((table) => {
    const rows = mappingTableRowsByKey[table.key];

    return {
      ...table,
      approximateRowCount: rows.length,
      mappedRowCount: rows.filter((row) => row.status === "mapped").length,
      partialRowCount: rows.filter((row) => row.status === "partial").length,
      unmappedRowCount: rows.filter((row) => row.status === "unmapped").length,
    };
  });
