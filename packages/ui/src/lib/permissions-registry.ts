export type PermissionScope =
  | "global"
  | "portfolio"
  | "property"
  | "table"
  | "field"
  | "action";

export type PermissionRiskLevel = "low" | "medium" | "high" | "critical";

export type EnforcementMode =
  | "disabled"
  | "audit_only"
  | "warn_only"
  | "enforced";

export type PermissionDefinition = {
  key: string;
  label: string;
  description: string;
  group: string;
  scope: PermissionScope;
  riskLevel: PermissionRiskLevel;
  defaultEnabledForDev: boolean;
  enforcementMode: EnforcementMode;
};

export const permissionsRegistry: PermissionDefinition[] = [
  {
    key: "data_library.mapping_tables.view",
    label: "View Mapping Tables",
    description: "Read-only access to all mapping tables in the Data Library.",
    group: "Data Library — Mapping Tables",
    scope: "table",
    riskLevel: "low",
    defaultEnabledForDev: true,
    enforcementMode: "audit_only",
  },
  {
    key: "data_library.mapping_tables.edit",
    label: "Edit Mapping Table Rows",
    description: "Save draft edits to mapping table rows.",
    group: "Data Library — Mapping Tables",
    scope: "table",
    riskLevel: "medium",
    defaultEnabledForDev: true,
    enforcementMode: "audit_only",
  },
  {
    key: "data_library.mapping_tables.publish",
    label: "Publish Mapping Changes",
    description: "Publish approved draft changes to the active mapping layer.",
    group: "Data Library — Mapping Tables",
    scope: "action",
    riskLevel: "high",
    defaultEnabledForDev: true,
    enforcementMode: "audit_only",
  },
  {
    key: "data_library.mapping_tables.delete",
    label: "Delete Mapping Rows",
    description: "Mark mapping rows as deprecated or remove them.",
    group: "Data Library — Mapping Tables",
    scope: "action",
    riskLevel: "high",
    defaultEnabledForDev: false,
    enforcementMode: "audit_only",
  },
  {
    key: "data_library.mapping_tables.bulk_import",
    label: "Bulk Import Mappings",
    description: "Import mapping rows via CSV or API batch operations.",
    group: "Data Library — Mapping Tables",
    scope: "action",
    riskLevel: "critical",
    defaultEnabledForDev: false,
    enforcementMode: "audit_only",
  },
  {
    key: "data_library.lookup_tables.view",
    label: "View Lookup Tables",
    description: "Read-only access to all lookup tables in the Data Library.",
    group: "Data Library — Lookup Tables",
    scope: "table",
    riskLevel: "low",
    defaultEnabledForDev: true,
    enforcementMode: "audit_only",
  },
  {
    key: "data_library.lookup_tables.edit",
    label: "Edit Lookup Table Rows",
    description: "Save draft edits to lookup table rows.",
    group: "Data Library — Lookup Tables",
    scope: "table",
    riskLevel: "medium",
    defaultEnabledForDev: true,
    enforcementMode: "audit_only",
  },
  {
    key: "data_library.lookup_tables.publish",
    label: "Publish Lookup Table Changes",
    description: "Publish approved draft changes to lookup tables.",
    group: "Data Library — Lookup Tables",
    scope: "action",
    riskLevel: "high",
    defaultEnabledForDev: true,
    enforcementMode: "audit_only",
  },
  {
    key: "data_library.unmapped_codes.view",
    label: "View Unmapped Codes",
    description: "Read-only access to the unmapped codes queue.",
    group: "Data Library — Unmapped Codes",
    scope: "table",
    riskLevel: "low",
    defaultEnabledForDev: true,
    enforcementMode: "audit_only",
  },
  {
    key: "data_library.unmapped_codes.resolve",
    label: "Resolve Unmapped Codes",
    description:
      "Mark unmapped source codes as resolved or assign a standard mapping.",
    group: "Data Library — Unmapped Codes",
    scope: "action",
    riskLevel: "medium",
    defaultEnabledForDev: true,
    enforcementMode: "audit_only",
  },
  {
    key: "data_library.unmapped_codes.dismiss",
    label: "Dismiss Unmapped Codes",
    description:
      "Dismiss unmapped source codes from the queue without mapping.",
    group: "Data Library — Unmapped Codes",
    scope: "action",
    riskLevel: "medium",
    defaultEnabledForDev: false,
    enforcementMode: "audit_only",
  },
  {
    key: "users.permissions.view",
    label: "View User Permissions",
    description: "View user roles and their assigned permission keys.",
    group: "Users & Permissions",
    scope: "global",
    riskLevel: "low",
    defaultEnabledForDev: true,
    enforcementMode: "audit_only",
  },
  {
    key: "users.permissions.edit",
    label: "Edit User Permissions",
    description: "Assign or revoke permission keys for users.",
    group: "Users & Permissions",
    scope: "global",
    riskLevel: "high",
    defaultEnabledForDev: true,
    enforcementMode: "audit_only",
  },
  {
    key: "users.permissions.manage_enforcement",
    label: "Manage Permission Enforcement",
    description:
      "Change enforcement mode for permission keys (disabled, audit_only, warn_only, enforced).",
    group: "Users & Permissions",
    scope: "global",
    riskLevel: "critical",
    defaultEnabledForDev: false,
    enforcementMode: "audit_only",
  },
];

export function getPermission(key: string): PermissionDefinition | undefined {
  return permissionsRegistry.find((p) => p.key === key);
}

export function getPermissionsByGroup(): Map<string, PermissionDefinition[]> {
  const groups = new Map<string, PermissionDefinition[]>();
  for (const perm of permissionsRegistry) {
    const existing = groups.get(perm.group) ?? [];
    existing.push(perm);
    groups.set(perm.group, existing);
  }
  return groups;
}
