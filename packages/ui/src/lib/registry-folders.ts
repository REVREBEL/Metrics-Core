import manifest from "./registry-folders.json";

export type RegistryFolderPageKind =
  | "landing"
  | "group"
  | "list"
  | "token"
  | "font"
  | "registry";

export type RegistryFolderNode = {
  id: string;
  title: string;
  sourcePath: string;
  parentId: string | null;
  kind: RegistryFolderPageKind;
  depth: number;
  directFiles: string[];
  children: string[];
  directFileCount: number;
  childCount: number;
};

export type RegistryFolderManifest = {
  generatedAt: string;
  roots: string[];
  nodes: Record<string, RegistryFolderNode>;
};

export const REGISTRY_FOLDER_MANIFEST = manifest as RegistryFolderManifest;

export function getRegistryFolderNode(id: string) {
  return REGISTRY_FOLDER_MANIFEST.nodes[id];
}

export function getRegistryFolderRoots() {
  return REGISTRY_FOLDER_MANIFEST.roots
    .map((id) => REGISTRY_FOLDER_MANIFEST.nodes[id])
    .filter(Boolean);
}
