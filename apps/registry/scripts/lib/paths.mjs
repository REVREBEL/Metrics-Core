import path from "node:path"
import { fileURLToPath } from "node:url"

const SCRIPT_DIR = path.dirname(fileURLToPath(import.meta.url))

export const REGISTRY_APP_ROOT = path.resolve(SCRIPT_DIR, "..", "..")
export const WORKSPACE_ROOT = path.resolve(REGISTRY_APP_ROOT, "..", "..")
export const UI_PACKAGE_ROOT = path.join(WORKSPACE_ROOT, "packages/ui")
export const UI_SOURCE_ROOT = path.join(UI_PACKAGE_ROOT, "src")
export const REGISTRY_JSON = path.join(REGISTRY_APP_ROOT, "registry.json")
export const PUBLIC_REGISTRY_OUTPUT = path.join(REGISTRY_APP_ROOT, "public/r")
export const REGISTRY_METADATA_JSON = path.join(
  UI_SOURCE_ROOT,
  "lib/registry.metadata.json",
)
export const REGISTRY_FOLDERS_JSON = path.join(
  UI_SOURCE_ROOT,
  "lib/registry-folders.json",
)
export const REGISTRY_TOKENS_JSON = path.join(
  UI_SOURCE_ROOT,
  "lib/registry.tokens.json",
)
export const GENERATED_REGISTRY_TS = path.join(UI_SOURCE_ROOT, "lib/registry.ts")

export function toPosix(value) {
  return value.replace(/\\/g, "/")
}

export function toWorkspaceRelative(absPath) {
  return toPosix(path.relative(WORKSPACE_ROOT, absPath))
}

export function writeGeneratedBanner({
  command,
  scriptName,
}) {
  return [
    "// AUTO-GENERATED. DO NOT EDIT.",
    `// Source: ${scriptName}`,
    `// To update, run: ${command}`,
    "",
  ].join("\n")
}

