import { REGISTRY_ITEMSISTRY } from "@/lib/playground/registry";

export type RegistryItem = {
  id: string;
  name: string;
  type: string;
  component: unknown;
  metadata?: unknown;
};

export type RegistryGroup = {
  label: string;
  items: RegistryItem[];
};

const DEFAULT_TYPE_GROUPS: Record<string, string> = {
  widget: "Widgets",
  "ui-primitive": "UI Primitives",
  "custom-component": "Custom Components",
};

function toDefaultGroupLabel(type: string): string {
  return (
    DEFAULT_TYPE_GROUPS[type] ??
    type
      .split(/[-_\s]+/)
      .filter(Boolean)
      .map((part) => part[0].toUpperCase() + part.slice(1))
      .join(" ")
  );
}

export function adaptPlaygroundRegistry(
  registry: Record<string, unknown> = REGISTRY_ITEMSISTRY as Record<
    string,
    unknown
  >,
): RegistryGroup[] {
  const grouped = new Map<string, RegistryItem[]>();

  for (const [id, entry] of Object.entries(registry)) {
    if (!entry || typeof entry !== "object") {
      continue;
    }

    const entryRecord = entry as Record<string, unknown>;
    if (!entryRecord.component) {
      continue;
    }
    const item: RegistryItem = {
      id,
      name: String(entryRecord.name ?? id),
      type: String(entryRecord.type ?? "unknown"),
      component: entryRecord.component,
      metadata: entryRecord.metadata,
    };

    const metadataGroup =
      typeof (item.metadata as { group?: unknown } | undefined)?.group ===
        "string" && (item.metadata as { group: string }).group.trim()
        ? (item.metadata as { group: string }).group.trim()
        : null;
    const groupLabel = metadataGroup ?? toDefaultGroupLabel(item.type);

    if (!grouped.has(groupLabel)) {
      grouped.set(groupLabel, []);
    }
    grouped.get(groupLabel)?.push(item);
  }

  return [...grouped.entries()]
    .map(([label, items]) => ({
      label,
      items: [...items].sort((a, b) => a.name.localeCompare(b.name)),
    }))
    .sort((a, b) => a.label.localeCompare(b.label));
}
