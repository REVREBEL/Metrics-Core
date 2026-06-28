import {
  getBlocks,
  getComponents,
  getRegistryItem,
  getRegistryItems,
  getUIPrimitives,
  type Component,
} from "./registry";
import {
  getRegistryFolderRoots,
  REGISTRY_FOLDER_MANIFEST,
  type RegistryFolderNode,
} from "./registry-folders";

type RootSummary = {
  id: string;
  eyebrow: string;
  description: string;
  status: "live" | "staged";
};

const ROOT_SUMMARY: Record<string, RootSummary> = {
  primitives: {
    id: "primitives",
    eyebrow: "Core UI",
    description: "Buttons, inputs, cards, tables, and low-level building blocks that should feel complete before product modules arrive.",
    status: "live",
  },
  styles: {
    id: "styles",
    eyebrow: "Tokens",
    description: "Theme variables, reference styles, and the token sources that define the registry visual system.",
    status: "live",
  },
  fonts: {
    id: "fonts",
    eyebrow: "Typography",
    description: "The font system and brand type stack used across the registry foundation.",
    status: "live",
  },
  "ui-registry": {
    id: "ui-registry",
    eyebrow: "Registry UX",
    description: "Installer helpers, playground support, and registry-facing UI glue.",
    status: "live",
  },
  lib: {
    id: "lib",
    eyebrow: "Support Code",
    description: "Shared helpers, adapters, and metadata used to keep registry pages predictable.",
    status: "live",
  },
  components: {
    id: "components",
    eyebrow: "Metrics Modules",
    description: "Metrics-specific compositions are staged behind the foundational registry work and should not drive the homepage yet.",
    status: "staged",
  },
};

const FOUNDATION_ORDER = [
  "primitives",
  "styles",
  "fonts",
  "ui-registry",
  "lib",
  "hooks",
  "utils",
  "context",
  "types",
  "icons",
] as const;

export function getRootSummary(rootId: string) {
  return (
    ROOT_SUMMARY[rootId] ?? {
      id: rootId,
      eyebrow: "Library",
      description: "Registry source folder.",
      status: "live" as const,
    }
  );
}

export function getFoundationRoots() {
  const roots = new Map(
    getRegistryFolderRoots().map((root) => [root.id, root] as const),
  );

  return FOUNDATION_ORDER.map((rootId) => roots.get(rootId)).filter(
    (root): root is RegistryFolderNode => Boolean(root),
  );
}

export function getStagedRoots() {
  return getRegistryFolderRoots().filter(
    (root) => getRootSummary(root.id).status === "staged",
  );
}

export function getRegistryCounts() {
  return {
    totalItems: getRegistryItems().length,
    primitives: getUIPrimitives().length,
    blocks: getBlocks().length,
    components: getComponents().length,
    rootFolders: REGISTRY_FOLDER_MANIFEST.roots.length,
    folderNodes: Object.keys(REGISTRY_FOLDER_MANIFEST.nodes).length,
  };
}

export function getRootEntryCount(root: RegistryFolderNode) {
  return root.directFileCount + root.childCount;
}

export function toFolderHref(folderId: string) {
  return `/catalog/folder/${folderId
    .split("/")
    .map((segment) => encodeURIComponent(segment))
    .join("/")}`;
}

export function getRegistryItemsForFiles(filePaths: string[]) {
  const seen = new Set<string>();
  const items: Component[] = [];

  for (const filePath of filePaths) {
    const normalizedPath = filePath.replace(/\\/g, "/");
    const match = getRegistryItems().find((item) =>
      item.files?.some((file) => file.path === normalizedPath),
    );

    if (!match || seen.has(match.name)) continue;
    seen.add(match.name);
    items.push(match);
  }

  return items;
}

export function getRegistryItemsForFolder(folderId: string, filePaths: string[]) {
  const directMatches = getRegistryItemsForFiles(filePaths);

  if (directMatches.length > 0) {
    return directMatches;
  }

  if (!folderId.startsWith("primitives/")) {
    return [];
  }

  const fallbackItems = filePaths
    .map((filePath) => filePath.split("/").pop()?.replace(/\.tsx?$/, "") ?? "")
    .filter(Boolean)
    .map((name) => getRegistryItem(name))
    .filter((item): item is Component => Boolean(item));

  return Array.from(new Map(fallbackItems.map((item) => [item.name, item])).values());
}
