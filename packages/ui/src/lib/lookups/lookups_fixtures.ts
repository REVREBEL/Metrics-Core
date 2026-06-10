import type { LookupTableMetadata, LookupTableRow } from "./types";

export type LookupTableKey =
  | "metrics_core.dim_property"
  | "metrics_core.lkp_segment"
  | "metrics_core.map_segment"
  | "metrics_core.map_roomtype"
  | "metrics_core.lkp_channel"
  | "metrics_core.map_source"
  | "metrics_core.map_rate"
  | "metrics_core.lkp_event_category"
  | "metrics_core.lkp_event_impact";

type LookupTableMetadataEntry = Omit<LookupTableMetadata, "key"> & {
  key: LookupTableKey;
};

const now = "2026-05-18T08:15:00.000Z";

export const lookupTableRowsByKey: Record<string, LookupTableRow[]> = {
  "metrics_core.dim_property": [
    {
      id: "property-001",
      sourceSystem: "Dataform / metrics_core.dim_property",
      rawCode: "DEMO_001",
      rawName: "Demo Hotel",
      mappedValue: "Demo Hotel",
      mappedGroup: "Austin",
      isActive: true,
      notes:
        "App-facing fixture for the property dimension. BigQuery/Dataform remains the analytical source of truth.",
      updatedAt: now,
      updatedBy: "Dataform Inventory",
    },
    {
      id: "property-002",
      sourceSystem: "Dataform / metrics_core.dim_property",
      rawCode: "RR_DEN",
      rawName: "Denver Central",
      mappedValue: "Denver Central",
      mappedGroup: "Denver",
      isActive: true,
      notes: "Example property row for UI scaffolding.",
      updatedAt: now,
      updatedBy: "Dataform Inventory",
    },
  ],

  "metrics_core.lkp_segment": [
    {
      id: "segment-001",
      sourceSystem: "Dataform / metrics_core.lkp_segment",
      rawCode: "TRANSIENT",
      rawName: "Transient",
      mappedValue: "Transient",
      mappedGroup: "Transient",
      isActive: true,
      notes: "Standard commercial segment lookup value.",
      updatedAt: now,
      updatedBy: "Dataform Inventory",
    },
    {
      id: "segment-002",
      sourceSystem: "Dataform / metrics_core.lkp_segment",
      rawCode: "GROUP",
      rawName: "Group",
      mappedValue: "Group",
      mappedGroup: "Group",
      isActive: true,
      notes: "Standard commercial segment lookup value.",
      updatedAt: now,
      updatedBy: "Dataform Inventory",
    },
    {
      id: "segment-003",
      sourceSystem: "Dataform / metrics_core.lkp_segment",
      rawCode: "CONTRACT",
      rawName: "Contract",
      mappedValue: "Contract",
      mappedGroup: "Contract",
      isActive: true,
      notes: "Standard commercial segment lookup value.",
      updatedAt: now,
      updatedBy: "Dataform Inventory",
    },
  ],

  "metrics_core.map_segment": [
    {
      id: "map-segment-001",
      sourceSystem: "PMS / metrics_core.map_segment",
      rawCode: "BAR",
      rawName: "Best Available Rate",
      mappedValue: "TRANSIENT",
      mappedGroup: "Transient",
      isActive: true,
      notes:
        "Maps source-system segment values to standard commercial segment values.",
      updatedAt: now,
      updatedBy: "Dataform Inventory",
    },
    {
      id: "map-segment-002",
      sourceSystem: "CRS / metrics_core.map_segment",
      rawCode: "LNR",
      rawName: "Local Negotiated Rate",
      mappedValue: "NEGOTIATED",
      mappedGroup: "Transient",
      isActive: true,
      notes: "Example mapped source segment row for UI scaffolding.",
      updatedAt: now,
      updatedBy: "Dataform Inventory",
    },
    {
      id: "map-segment-003",
      sourceSystem: "PMS / metrics_core.map_segment",
      rawCode: "UNK",
      rawName: "Unknown Segment",
      mappedValue: "",
      mappedGroup: "",
      isActive: false,
      notes:
        "Inactive fixture row to test validation and unmapped-state handling.",
      updatedAt: now,
      updatedBy: "Dataform Inventory",
    },
  ],

  "metrics_core.map_roomtype": [
    {
      id: "map-roomtype-001",
      sourceSystem: "PMS / metrics_core.map_roomtype",
      rawCode: "KNG",
      rawName: "King Room",
      mappedValue: "KING",
      mappedGroup: "Standard",
      isActive: true,
      notes: "Maps source room type to standard room type and room class.",
      updatedAt: now,
      updatedBy: "Dataform Inventory",
    },
    {
      id: "map-roomtype-002",
      sourceSystem: "PMS / metrics_core.map_roomtype",
      rawCode: "STE",
      rawName: "Suite",
      mappedValue: "SUITE",
      mappedGroup: "Premium",
      isActive: true,
      notes: "Example room type mapping fixture.",
      updatedAt: now,
      updatedBy: "Dataform Inventory",
    },
  ],

  "metrics_core.lkp_channel": [
    {
      id: "channel-001",
      sourceSystem: "Dataform / metrics_core.lkp_channel",
      rawCode: "DIRECT",
      rawName: "Direct",
      mappedValue: "Direct",
      mappedGroup: "Owned",
      isActive: true,
      notes: "Standard channel lookup value.",
      updatedAt: now,
      updatedBy: "Dataform Inventory",
    },
    {
      id: "channel-002",
      sourceSystem: "Dataform / metrics_core.lkp_channel",
      rawCode: "OTA",
      rawName: "Online Travel Agency",
      mappedValue: "OTA",
      mappedGroup: "Third Party",
      isActive: true,
      notes: "Standard channel lookup value.",
      updatedAt: now,
      updatedBy: "Dataform Inventory",
    },
  ],

  "metrics_core.map_source": [
    {
      id: "map-source-001",
      sourceSystem: "CRS / metrics_core.map_source",
      rawCode: "BKNG",
      rawName: "Booking.com",
      mappedValue: "OTA",
      mappedGroup: "Third Party",
      isActive: true,
      notes:
        "Maps source-system source/subsource values to standard source, subsource, and channel values.",
      updatedAt: now,
      updatedBy: "Dataform Inventory",
    },
    {
      id: "map-source-002",
      sourceSystem: "PMS / metrics_core.map_source",
      rawCode: "WEB",
      rawName: "Brand Website",
      mappedValue: "DIRECT",
      mappedGroup: "Owned",
      isActive: true,
      notes: "Example source mapping fixture.",
      updatedAt: now,
      updatedBy: "Dataform Inventory",
    },
  ],

  "metrics_core.map_rate": [
    {
      id: "map-rate-001",
      sourceSystem: "CRS / metrics_core.map_rate",
      rawCode: "BAR",
      rawName: "Best Available Rate",
      mappedValue: "RETAIL",
      mappedGroup: "Public",
      isActive: true,
      notes:
        "Maps source-system rate codes to standard rate, rate type, company, segment, channel, source, subsource, and consortia values.",
      updatedAt: now,
      updatedBy: "Dataform Inventory",
    },
    {
      id: "map-rate-002",
      sourceSystem: "CRS / metrics_core.map_rate",
      rawCode: "ADV14",
      rawName: "Advance Purchase 14",
      mappedValue: "ADVANCE_PURCHASE",
      mappedGroup: "Public",
      isActive: true,
      notes: "Example rate mapping fixture.",
      updatedAt: now,
      updatedBy: "Dataform Inventory",
    },
  ],

  "metrics_core.lkp_event_category": [
    {
      id: "event-category-001",
      sourceSystem: "Dataform / metrics_core.lkp_event_category",
      rawCode: "Convention",
      rawName: "Convention",
      mappedValue: "Convention",
      mappedGroup: "Demand Driver",
      isActive: true,
      notes:
        "Controlled event category used by event calendars, demand context, pricing notes, forecast overlays, and BI filters.",
      updatedAt: now,
      updatedBy: "Dataform Inventory",
    },
    {
      id: "event-category-002",
      sourceSystem: "Dataform / metrics_core.lkp_event_category",
      rawCode: "Renovation",
      rawName: "Renovation",
      mappedValue: "Renovation",
      mappedGroup: "Property Context",
      isActive: true,
      notes: "Controlled event category fixture.",
      updatedAt: now,
      updatedBy: "Dataform Inventory",
    },
  ],

  "metrics_core.lkp_event_impact": [
    {
      id: "event-impact-001",
      sourceSystem: "Dataform / metrics_core.lkp_event_impact",
      rawCode: "High Impact",
      rawName: "High Impact",
      mappedValue: "High Impact",
      mappedGroup: "Demand Impact",
      isActive: true,
      notes:
        "Controlled event impact classification used to indicate demand, pricing, compression, or location-based impact.",
      updatedAt: now,
      updatedBy: "Dataform Inventory",
    },
    {
      id: "event-impact-002",
      sourceSystem: "Dataform / metrics_core.lkp_event_impact",
      rawCode: "No Impact",
      rawName: "No Impact",
      mappedValue: "No Impact",
      mappedGroup: "Demand Impact",
      isActive: true,
      notes: "Controlled event impact fixture.",
      updatedAt: now,
      updatedBy: "Dataform Inventory",
    },
  ],
};

export const lookupTableMetadata: LookupTableMetadataEntry[] = [
  {
    key: "metrics_core.dim_property",
    displayName: "Property Dimension",
    description:
      "Standard property/hotel reference table from Dataform metrics_core.",
    approximateRowCount:
      lookupTableRowsByKey["metrics_core.dim_property"].length,
    lastUpdated: now,
    lastRefreshed: now,
    status: "ready",
  },
  {
    key: "metrics_core.lkp_segment",
    displayName: "Segment Lookup",
    description: "Controlled lookup table for standard commercial segments.",
    approximateRowCount:
      lookupTableRowsByKey["metrics_core.lkp_segment"].length,
    lastUpdated: now,
    lastRefreshed: now,
    status: "ready",
  },
  {
    key: "metrics_core.map_segment",
    displayName: "Segment Mapping",
    description:
      "Maps source-system segment values to standardized commercial and finance segment values.",
    approximateRowCount:
      lookupTableRowsByKey["metrics_core.map_segment"].length,
    lastUpdated: now,
    lastRefreshed: now,
    status: "needs_review",
  },
  {
    key: "metrics_core.map_roomtype",
    displayName: "Room Type Mapping",
    description:
      "Maps source room type values to standardized room type, room class, bed type, and optional room pool values.",
    approximateRowCount:
      lookupTableRowsByKey["metrics_core.map_roomtype"].length,
    lastUpdated: now,
    lastRefreshed: now,
    status: "draft",
  },
  {
    key: "metrics_core.lkp_channel",
    displayName: "Channel Lookup",
    description: "Controlled lookup table for standard channels.",
    approximateRowCount:
      lookupTableRowsByKey["metrics_core.lkp_channel"].length,
    lastUpdated: now,
    lastRefreshed: now,
    status: "ready",
  },
  {
    key: "metrics_core.map_source",
    displayName: "Source Mapping",
    description:
      "Maps source-system source and subsource values to standardized source, subsource, and channel values.",
    approximateRowCount: lookupTableRowsByKey["metrics_core.map_source"].length,
    lastUpdated: now,
    lastRefreshed: now,
    status: "needs_review",
  },
  {
    key: "metrics_core.map_rate",
    displayName: "Rate Mapping",
    description:
      "Maps source-system rate codes to standardized rate, rate type, company, segment, channel, source, subsource, and consortia values.",
    approximateRowCount: lookupTableRowsByKey["metrics_core.map_rate"].length,
    lastUpdated: now,
    lastRefreshed: now,
    status: "needs_review",
  },
  {
    key: "metrics_core.lkp_event_category",
    displayName: "Event Category Lookup",
    description:
      "Controlled event categories for demand context, event calendars, pricing notes, forecast overlays, and BI filters.",
    approximateRowCount:
      lookupTableRowsByKey["metrics_core.lkp_event_category"].length,
    lastUpdated: now,
    lastRefreshed: now,
    status: "ready",
  },
  {
    key: "metrics_core.lkp_event_impact",
    displayName: "Event Impact Lookup",
    description:
      "Controlled event impact classifications for demand, pricing, compression, and location-based event context.",
    approximateRowCount:
      lookupTableRowsByKey["metrics_core.lkp_event_impact"].length,
    lastUpdated: now,
    lastRefreshed: now,
    status: "ready",
  },
];
