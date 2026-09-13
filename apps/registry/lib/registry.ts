import metadataManifest from "@/lib/registry.metadata.json";

import registryManifest from "../registry.json";

export type ComponentMetadata = {
  displayName?: string;
  description?: string;
  props?: Array<{
    defaultValue?: string;
    description?: string;
    name: string;
    required?: boolean;
    type: string;
  }>;
};

type RegistryFile = {
  path: string;
  target?: string;
  type: string;
};

export type Component = {
  description?: string;
  files?: RegistryFile[];
  metadata?: ComponentMetadata;
  name: string;
  title?: string;
  type: string;
  [key: string]: unknown;
};

type RegistryManifest = {
  homepage: string;
  items: Component[];
  name: string;
};

type MetadataManifest = Record<string, ComponentMetadata>;

const manifest = registryManifest as RegistryManifest;
const metadata = metadataManifest as MetadataManifest;

function toMetadataKey(filePath?: string) {
  if (!filePath) return null;
  const normalized = filePath.replace(/\\/g, "/");
  if (!normalized.startsWith("packages/ui/src/")) return null;
  return normalized
    .replace(/^packages\/ui\/src\//, "")
    .replace(/\.(ts|tsx|js|jsx)$/, "");
}

function mergeItem(item: Component): Component {
  const primaryFile = item.files?.[0]?.path;
  const metadataKey = toMetadataKey(primaryFile);
  const entry = metadataKey ? metadata[metadataKey] : undefined;

  return {
    ...item,
    description: item.description || entry?.description || "",
    metadata: entry,
    title: item.title || entry?.displayName || item.name,
  };
}

const REGISTRY_ITEMS = manifest.items.map(mergeItem);

// ⚡ Bolt: Cache Map index and type-filtered lists at module scope for O(1) lookups and zero allocation re-filtering.
const registryMap = new Map<string, Component>(
  REGISTRY_ITEMS.map((item) => [item.name, item]),
);
const blocksList = REGISTRY_ITEMS.filter(
  (item) => item.type === "registry:block",
);
const uiPrimitivesList = REGISTRY_ITEMS.filter(
  (item) => item.type === "registry:ui",
);
const componentsList = REGISTRY_ITEMS.filter(
  (item) => item.type === "registry:component",
);

export function getRegistryItems(): Component[] {
  return REGISTRY_ITEMS;
}

export function getRegistryItem(name: string): Component | undefined {
  return registryMap.get(name);
}

export function getBlocks(): Component[] {
  return blocksList;
}

export function getUIPrimitives(): Component[] {
  return uiPrimitivesList;
}

export function getComponents(): Component[] {
  return componentsList;
}
