export type DataLibraryTableCategory = "lookup" | "mapping";

export type DataLibraryColumnType = "boolean" | "date" | "integer" | "string";

export type DataLibraryColumnDefinition = {
  key: string;
  label: string;
  type: DataLibraryColumnType;
  editable: boolean;
  required: boolean;
  description: string;
  lookupDependency?: string;
};

export type DataLibraryTableDefinition = {
  key: string;
  dataset: string;
  table: string;
  category: DataLibraryTableCategory;
  group: string;
  title: string;
  description: string;
  grain: string;
  primaryKey: string[];
  columns: DataLibraryColumnDefinition[];
  permissions: {
    read: string[];
    edit: string[];
    review: string[];
    publish: string[];
  };
  currentValueOwner: "bigquery-dataform" | "application";
  publication: "deferred" | "supported";
  concurrency: {
    status: "implemented" | "unresolved";
    column?: string;
    reason?: string;
  };
};

const lookupPermissions = {
  read: ["data_library.lookup_tables.view"],
  edit: ["data_library.lookup_tables.edit"],
  review: ["data_library.lookup_tables.review"],
  publish: ["data_library.lookup_tables.publish"],
};

const mappingPermissions = {
  read: ["data_library.mapping_tables.view"],
  edit: ["data_library.mapping_tables.edit"],
  review: ["data_library.mapping_tables.review"],
  publish: ["data_library.mapping_tables.publish"],
};

export const dataLibraryTableRegistry = [
  {
    key: "metrics_core.lkp_segment",
    dataset: "metrics_core",
    table: "lkp_segment",
    category: "lookup",
    group: "Segments",
    title: "Segments",
    description:
      "Controlled commercial segment values used by the segment mapping workflow.",
    grain: "One row per standard commercial segment code.",
    primaryKey: ["code"],
    columns: [
      {
        key: "code",
        label: "Code",
        type: "string",
        editable: false,
        required: true,
        description: "Stable standard commercial segment code.",
      },
      {
        key: "name",
        label: "Name",
        type: "string",
        editable: true,
        required: true,
        description: "Segment display name.",
      },
      {
        key: "description",
        label: "Description",
        type: "string",
        editable: true,
        required: false,
        description: "Definition or usage notes for the segment.",
      },
      {
        key: "sort",
        label: "Sort",
        type: "integer",
        editable: true,
        required: false,
        description: "Display order for reporting.",
      },
      {
        key: "segment_group_code",
        label: "Segment group",
        type: "string",
        editable: true,
        required: true,
        lookupDependency: "metrics_core.lkp_segment_group",
        description: "Parent standard segment group code.",
      },
      {
        key: "is_active",
        label: "Active",
        type: "boolean",
        editable: true,
        required: true,
        description: "Whether the segment is active.",
      },
      {
        key: "insert_date",
        label: "Inserted",
        type: "date",
        editable: false,
        required: false,
        description: "Warehouse insert date.",
      },
      {
        key: "updated_date",
        label: "Updated",
        type: "date",
        editable: false,
        required: false,
        description: "Warehouse update date.",
      },
    ],
    permissions: lookupPermissions,
    currentValueOwner: "bigquery-dataform",
    publication: "deferred",
    concurrency: {
      status: "unresolved",
      reason:
        "Dataform defines a nullable DATE updated_date and seeds it as null, so it is not yet a reliable version token.",
    },
  },
  {
    key: "metrics_core.map_segment",
    dataset: "metrics_core",
    table: "map_segment",
    category: "mapping",
    group: "Segments",
    title: "Segment mappings",
    description:
      "Maps property and source-application segment values to governed commercial and finance segments.",
    grain: "One row per property, source application, and source segment code.",
    primaryKey: ["property_code", "source_application_code", "code"],
    columns: [
      {
        key: "property_code",
        label: "Property",
        type: "string",
        editable: false,
        required: true,
        description: "Property code for the source mapping.",
      },
      {
        key: "source_application_code",
        label: "Source application",
        type: "string",
        editable: false,
        required: true,
        lookupDependency: "metrics_core.lkp_source_application",
        description: "Application that supplied the segment value.",
      },
      {
        key: "code",
        label: "Source code",
        type: "string",
        editable: false,
        required: true,
        description: "Source-application segment code.",
      },
      {
        key: "name",
        label: "Source name",
        type: "string",
        editable: false,
        required: false,
        description: "Source-application segment name or label.",
      },
      {
        key: "description",
        label: "Source description",
        type: "string",
        editable: false,
        required: false,
        description: "Source-application description, when supplied.",
      },
      {
        key: "segment_code",
        label: "Segment",
        type: "string",
        editable: true,
        required: true,
        lookupDependency: "metrics_core.lkp_segment",
        description: "Governed commercial segment code.",
      },
      {
        key: "finance_segment_code",
        label: "Finance segment",
        type: "string",
        editable: true,
        required: false,
        lookupDependency: "metrics_core.lkp_finance_segment",
        description: "Governed finance segment code.",
      },
      {
        key: "gl_code",
        label: "GL code",
        type: "string",
        editable: true,
        required: false,
        description: "General or guest ledger code, when available.",
      },
      {
        key: "is_active",
        label: "Active",
        type: "boolean",
        editable: true,
        required: true,
        description: "Whether the mapping is active.",
      },
      {
        key: "insert_date",
        label: "Inserted",
        type: "date",
        editable: false,
        required: false,
        description: "Warehouse insert date.",
      },
      {
        key: "updated_date",
        label: "Updated",
        type: "date",
        editable: false,
        required: false,
        description: "Warehouse update date.",
      },
    ],
    permissions: mappingPermissions,
    currentValueOwner: "bigquery-dataform",
    publication: "deferred",
    concurrency: {
      status: "unresolved",
      reason:
        "The current warehouse DDL has no non-null version or timestamp suitable for optimistic locking.",
    },
  },
] as const satisfies readonly DataLibraryTableDefinition[];

export function listDataLibraryTableDefinitions(
  category?: DataLibraryTableCategory,
): DataLibraryTableDefinition[] {
  return dataLibraryTableRegistry.filter(
    (definition) => !category || definition.category === category,
  );
}

export function getDataLibraryTableDefinition(
  key: string,
): DataLibraryTableDefinition | undefined {
  return dataLibraryTableRegistry.find((definition) => definition.key === key);
}
