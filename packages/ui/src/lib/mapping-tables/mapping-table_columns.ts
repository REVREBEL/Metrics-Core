export type ColumnInputType =
  | "readonly"
  | "text"
  | "textarea"
  | "dropdown"
  | "multi_select"
  | "boolean"
  | "date"
  | "number"
  | "system";

export type ValidationRule = {
  type: "required" | "max_length" | "pattern" | "no_duplicate_active";
  value?: string | number;
  message: string;
};

export type MappingColumnDefinition = {
  field: string;
  label: string;
  description: string;
  inputType: ColumnInputType;
  required: boolean;
  editable: boolean;
  lookupSource?: string;
  validationRules: ValidationRule[];
  displayOrder: number;
  visibleInTable: boolean;
  visibleInDetail: boolean;
  isSourceSystemField?: boolean;
};

const COMMON_SOURCE_FIELDS: MappingColumnDefinition[] = [
  {
    field: "id",
    label: "Row ID",
    description: "System-generated unique identifier for this mapping row.",
    inputType: "system",
    required: false,
    editable: false,
    validationRules: [],
    displayOrder: 0,
    visibleInTable: false,
    visibleInDetail: true,
    isSourceSystemField: true,
  },
  {
    field: "sourceSystem",
    label: "Source System",
    description:
      "The source system this code originates from (e.g., PMS, CRS, RMS). Cannot be modified.",
    inputType: "readonly",
    required: true,
    editable: false,
    validationRules: [],
    displayOrder: 1,
    visibleInTable: true,
    visibleInDetail: true,
    isSourceSystemField: true,
  },
  {
    field: "sourceCode",
    label: "Source Code",
    description:
      "The raw source-system code. Cannot be modified — this is the key that identifies the row.",
    inputType: "readonly",
    required: true,
    editable: false,
    validationRules: [],
    displayOrder: 2,
    visibleInTable: true,
    visibleInDetail: true,
    isSourceSystemField: true,
  },
  {
    field: "sourceValue",
    label: "Source Value",
    description: "Human-readable label from the source system.",
    inputType: "readonly",
    required: false,
    editable: false,
    validationRules: [],
    displayOrder: 3,
    visibleInTable: true,
    visibleInDetail: true,
    isSourceSystemField: true,
  },
];

const COMMON_META_FIELDS: MappingColumnDefinition[] = [
  {
    field: "confidence",
    label: "Confidence",
    description:
      "Auto-computed confidence score for this mapping. Set by the system.",
    inputType: "system",
    required: false,
    editable: false,
    validationRules: [],
    displayOrder: 90,
    visibleInTable: true,
    visibleInDetail: true,
  },
  {
    field: "status",
    label: "Status",
    description: "Current mapping status for this row.",
    inputType: "dropdown",
    required: true,
    editable: true,
    lookupSource: "_mapping_status",
    validationRules: [{ type: "required", message: "Status is required." }],
    displayOrder: 91,
    visibleInTable: true,
    visibleInDetail: true,
  },
  {
    field: "reviewReason",
    label: "Review Note",
    description: "Explanation for why this row needs review or is unmapped.",
    inputType: "textarea",
    required: false,
    editable: true,
    validationRules: [
      {
        type: "max_length",
        value: 500,
        message: "Review note must be 500 characters or fewer.",
      },
    ],
    displayOrder: 92,
    visibleInTable: true,
    visibleInDetail: true,
  },
  {
    field: "updatedBy",
    label: "Updated By",
    description: "User or system process that last updated this row.",
    inputType: "system",
    required: false,
    editable: false,
    validationRules: [],
    displayOrder: 98,
    visibleInTable: false,
    visibleInDetail: true,
  },
  {
    field: "updatedAt",
    label: "Updated At",
    description: "Timestamp of the last update.",
    inputType: "system",
    required: false,
    editable: false,
    validationRules: [],
    displayOrder: 99,
    visibleInTable: false,
    visibleInDetail: true,
  },
];

export const mappingTableColumnsByKey: Record<
  string,
  MappingColumnDefinition[]
> = {
  "metrics_core.map_hotel": [
    ...COMMON_SOURCE_FIELDS,
    {
      field: "standardCode",
      label: "Standard Property Code",
      description: "The standard property code from the hotel dimension.",
      inputType: "dropdown",
      required: true,
      editable: true,
      lookupSource: "metrics_core.dim_property",
      validationRules: [
        {
          type: "required",
          message: "Standard property code is required for active mappings.",
        },
        {
          type: "no_duplicate_active",
          message:
            "A mapping for this source code already exists and is active.",
        },
      ],
      displayOrder: 10,
      visibleInTable: true,
      visibleInDetail: true,
    },
    {
      field: "standardValue",
      label: "Standard Property Name",
      description: "Human-readable standard hotel name.",
      inputType: "text",
      required: false,
      editable: true,
      validationRules: [
        {
          type: "max_length",
          value: 255,
          message: "Standard value must be 255 characters or fewer.",
        },
      ],
      displayOrder: 11,
      visibleInTable: true,
      visibleInDetail: true,
    },
    {
      field: "standardGroup",
      label: "Portfolio Group",
      description: "High-level grouping for portfolio-level roll-ups.",
      inputType: "text",
      required: false,
      editable: true,
      validationRules: [],
      displayOrder: 12,
      visibleInTable: true,
      visibleInDetail: true,
    },
    ...COMMON_META_FIELDS,
  ],

  "metrics_core.map_segment": [
    ...COMMON_SOURCE_FIELDS,
    {
      field: "standardCode",
      label: "Standard Segment Code",
      description:
        "The standard commercial segment code from the segment lookup.",
      inputType: "dropdown",
      required: true,
      editable: true,
      lookupSource: "metrics_core.lkp_segment",
      validationRules: [
        {
          type: "required",
          message: "Standard segment code is required for active mappings.",
        },
        {
          type: "no_duplicate_active",
          message:
            "An active mapping for this source segment code already exists.",
        },
      ],
      displayOrder: 10,
      visibleInTable: true,
      visibleInDetail: true,
    },
    {
      field: "standardValue",
      label: "Standard Segment Name",
      description: "Human-readable standard segment label.",
      inputType: "text",
      required: false,
      editable: true,
      validationRules: [
        {
          type: "max_length",
          value: 255,
          message: "Standard value must be 255 characters or fewer.",
        },
      ],
      displayOrder: 11,
      visibleInTable: true,
      visibleInDetail: true,
    },
    {
      field: "standardGroup",
      label: "Segment Group",
      description: "Finance or commercial grouping for roll-up reporting.",
      inputType: "text",
      required: false,
      editable: true,
      validationRules: [],
      displayOrder: 12,
      visibleInTable: true,
      visibleInDetail: true,
    },
    ...COMMON_META_FIELDS,
  ],

  "metrics_core.map_channel": [
    ...COMMON_SOURCE_FIELDS,
    {
      field: "standardCode",
      label: "Standard Channel Code",
      description: "The standard channel code from the channel lookup.",
      inputType: "dropdown",
      required: true,
      editable: true,
      lookupSource: "metrics_core.lkp_channel",
      validationRules: [
        {
          type: "required",
          message: "Standard channel code is required for active mappings.",
        },
        {
          type: "no_duplicate_active",
          message:
            "An active mapping for this source channel code already exists.",
        },
      ],
      displayOrder: 10,
      visibleInTable: true,
      visibleInDetail: true,
    },
    {
      field: "standardValue",
      label: "Standard Channel Name",
      description: "Human-readable standard channel label.",
      inputType: "text",
      required: false,
      editable: true,
      validationRules: [
        {
          type: "max_length",
          value: 255,
          message: "Standard value must be 255 characters or fewer.",
        },
      ],
      displayOrder: 11,
      visibleInTable: true,
      visibleInDetail: true,
    },
    {
      field: "standardGroup",
      label: "Channel Group",
      description:
        "High-level channel group (e.g., Owned, Third Party, Metasearch).",
      inputType: "text",
      required: false,
      editable: true,
      validationRules: [],
      displayOrder: 12,
      visibleInTable: true,
      visibleInDetail: true,
    },
    ...COMMON_META_FIELDS,
  ],

  "metrics_core.map_roomtype": [
    ...COMMON_SOURCE_FIELDS,
    {
      field: "standardCode",
      label: "Standard Room Type Code",
      description: "The standard room type code.",
      inputType: "text",
      required: true,
      editable: true,
      validationRules: [
        {
          type: "required",
          message: "Standard room type code is required for active mappings.",
        },
        {
          type: "no_duplicate_active",
          message:
            "An active mapping for this source room type code already exists.",
        },
      ],
      displayOrder: 10,
      visibleInTable: true,
      visibleInDetail: true,
    },
    {
      field: "standardValue",
      label: "Standard Room Type Name",
      description: "Human-readable standard room type label.",
      inputType: "text",
      required: false,
      editable: true,
      validationRules: [
        {
          type: "max_length",
          value: 255,
          message: "Standard value must be 255 characters or fewer.",
        },
      ],
      displayOrder: 11,
      visibleInTable: true,
      visibleInDetail: true,
    },
    {
      field: "standardGroup",
      label: "Room Class",
      description: "Room class grouping (e.g., Standard, Premium, Suite).",
      inputType: "text",
      required: false,
      editable: true,
      validationRules: [],
      displayOrder: 12,
      visibleInTable: true,
      visibleInDetail: true,
    },
    ...COMMON_META_FIELDS,
  ],

  "metrics_core.map_source": [
    ...COMMON_SOURCE_FIELDS,
    {
      field: "standardCode",
      label: "Standard Source Code",
      description: "The standard source code.",
      inputType: "text",
      required: true,
      editable: true,
      validationRules: [
        {
          type: "required",
          message: "Standard source code is required for active mappings.",
        },
        {
          type: "no_duplicate_active",
          message: "An active mapping for this source code already exists.",
        },
      ],
      displayOrder: 10,
      visibleInTable: true,
      visibleInDetail: true,
    },
    {
      field: "standardValue",
      label: "Standard Source Name",
      description: "Human-readable standard source label.",
      inputType: "text",
      required: false,
      editable: true,
      validationRules: [
        {
          type: "max_length",
          value: 255,
          message: "Standard value must be 255 characters or fewer.",
        },
      ],
      displayOrder: 11,
      visibleInTable: true,
      visibleInDetail: true,
    },
    {
      field: "standardGroup",
      label: "Source Group",
      description: "Campaign or channel grouping for the source.",
      inputType: "dropdown",
      required: false,
      editable: true,
      lookupSource: "metrics_core.lkp_channel",
      validationRules: [],
      displayOrder: 12,
      visibleInTable: true,
      visibleInDetail: true,
    },
    ...COMMON_META_FIELDS,
  ],

  "metrics_core.map_market": [
    ...COMMON_SOURCE_FIELDS,
    {
      field: "standardCode",
      label: "Standard Market Code",
      description: "The standard market code.",
      inputType: "text",
      required: true,
      editable: true,
      validationRules: [
        {
          type: "required",
          message: "Standard market code is required for active mappings.",
        },
        {
          type: "no_duplicate_active",
          message:
            "An active mapping for this source market code already exists.",
        },
      ],
      displayOrder: 10,
      visibleInTable: true,
      visibleInDetail: true,
    },
    {
      field: "standardValue",
      label: "Standard Market Name",
      description: "Human-readable standard market label.",
      inputType: "text",
      required: false,
      editable: true,
      validationRules: [
        {
          type: "max_length",
          value: 255,
          message: "Standard value must be 255 characters or fewer.",
        },
      ],
      displayOrder: 11,
      visibleInTable: true,
      visibleInDetail: true,
    },
    {
      field: "standardGroup",
      label: "Commercial Group",
      description: "Commercial grouping taxonomy for market roll-ups.",
      inputType: "dropdown",
      required: false,
      editable: true,
      lookupSource: "metrics_core.lkp_segment",
      validationRules: [],
      displayOrder: 12,
      visibleInTable: true,
      visibleInDetail: true,
    },
    ...COMMON_META_FIELDS,
  ],

  "metrics_core.map_rate": [
    ...COMMON_SOURCE_FIELDS,
    {
      field: "standardCode",
      label: "Standard Rate Code",
      description: "The standard rate code.",
      inputType: "text",
      required: true,
      editable: true,
      validationRules: [
        {
          type: "required",
          message: "Standard rate code is required for active mappings.",
        },
        {
          type: "no_duplicate_active",
          message:
            "An active mapping for this source rate code already exists.",
        },
      ],
      displayOrder: 10,
      visibleInTable: true,
      visibleInDetail: true,
    },
    {
      field: "standardValue",
      label: "Standard Rate Name",
      description: "Human-readable standard rate label.",
      inputType: "text",
      required: false,
      editable: true,
      validationRules: [
        {
          type: "max_length",
          value: 255,
          message: "Standard value must be 255 characters or fewer.",
        },
      ],
      displayOrder: 11,
      visibleInTable: true,
      visibleInDetail: true,
    },
    {
      field: "standardGroup",
      label: "Rate Group",
      description: "Rate group (e.g., Public, Negotiated, Package).",
      inputType: "text",
      required: false,
      editable: true,
      validationRules: [],
      displayOrder: 12,
      visibleInTable: true,
      visibleInDetail: true,
    },
    ...COMMON_META_FIELDS,
  ],
};

export function getColumnsForTable(
  tableKey: string,
): MappingColumnDefinition[] {
  const cols = mappingTableColumnsByKey[tableKey];
  if (!cols) return [];
  return [...cols].sort((a, b) => a.displayOrder - b.displayOrder);
}

export function getDetailColumnsForTable(
  tableKey: string,
): MappingColumnDefinition[] {
  return getColumnsForTable(tableKey).filter((col) => col.visibleInDetail);
}
