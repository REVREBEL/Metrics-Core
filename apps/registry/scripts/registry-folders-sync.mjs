import { promises as fs } from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"

const SCRIPT_DIR = path.dirname(fileURLToPath(import.meta.url))
const APP_ROOT = path.resolve(SCRIPT_DIR, "..")
const WORKSPACE_ROOT = path.resolve(APP_ROOT, "../..")
const SOURCE_ROOTS = [
  { key: "primitives", source: "packages/ui/src/primitives", kind: "group" },
  { key: "components", source: "packages/ui/src/components", kind: "group" },
  { key: "fonts", source: "packages/ui/src/fonts", kind: "font" },
  { key: "hooks", source: "packages/ui/src/hooks", kind: "list" },
  { key: "styles", source: "packages/ui/src/styles", kind: "token" },
  { key: "types", source: "packages/ui/src/types", kind: "list" },
  { key: "ui-registry", source: "packages/ui/src/ui-registry", kind: "registry" },
  { key: "utils", source: "packages/ui/src/utils", kind: "list" },
  { key: "context", source: "packages/ui/src/context", kind: "list" },
  { key: "icons", source: "packages/ui/src/icons", kind: "list" },
  { key: "lib", source: "packages/ui/src/lib", kind: "list" },
]

const EXCLUDED_DIRS = new Set([
  "node_modules",
  ".next",
  "dist",
  "build",
  "coverage",
  ".turbo",
])

const EXCLUDED_FILES = new Set([
  "index.ts",
  "index.tsx",
  "registry-folders.json",
  "registry-folders.ts",
  "registry.metadata.json",
  "registry.tokens.json",
])

const EXCLUDED_PATTERNS = [/\.stories\./, /\.test\./, /\.spec\./, /\.d\.ts$/]

function isExcludedFile(name) {
  if (EXCLUDED_FILES.has(name)) return true
  if (name === ".DS_Store") return true
  return EXCLUDED_PATTERNS.some((pattern) => pattern.test(name))
}

function toTitle(value) {
  return value
    .split(/[-_\s/]+/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ")
}

function toRelativeRepoPath(absPath) {
  return path.relative(WORKSPACE_ROOT, absPath).replace(/\\/g, "/")
}

function classifyPageKind(rootKind, isRoot) {
  if (isRoot) return "landing"
  return rootKind
}

async function readDirectory(dir) {
  try {
    return await fs.readdir(dir, { withFileTypes: true })
  } catch {
    return []
  }
}

async function buildTree() {
  const nodes = new Map()

  async function walk(dirPath, rootKey, rootKind, rootSource, parentId = null) {
    const entries = (await readDirectory(dirPath)).sort((a, b) =>
      a.name.localeCompare(b.name)
    )
    const relativeToRoot = path.relative(path.join(WORKSPACE_ROOT, rootSource), dirPath)
    const folderId = relativeToRoot === "" ? rootKey : `${rootKey}/${relativeToRoot.replace(/\\/g, "/")}`
    const sourcePath = toRelativeRepoPath(dirPath)

    const directFiles = []
    const childIds = []

    for (const entry of entries) {
      if (entry.name.startsWith(".")) continue

      const fullPath = path.join(dirPath, entry.name)
      if (entry.isDirectory()) {
        if (EXCLUDED_DIRS.has(entry.name)) continue
        const child = await walk(fullPath, rootKey, rootKind, rootSource, folderId)
        if (child) childIds.push(child.id)
        continue
      }

      if (!entry.isFile()) continue
      if (isExcludedFile(entry.name)) continue

      directFiles.push(toRelativeRepoPath(fullPath))
    }

    if (directFiles.length === 0 && childIds.length === 0) {
      return null
    }
    const node = {
      id: folderId,
      title: toTitle(path.basename(dirPath) || rootKey),
      sourcePath,
      parentId,
      kind: classifyPageKind(rootKind, folderId === rootKey),
      depth: folderId === rootKey ? 0 : folderId.split("/").length - 1,
      directFiles,
      children: childIds,
      directFileCount: directFiles.length,
      childCount: childIds.length,
    }

    nodes.set(folderId, node)

    node.children = childIds.sort((a, b) => a.localeCompare(b))
    node.childCount = node.children.length
    return node
  }

  const rootNodes = []
  for (const root of SOURCE_ROOTS) {
    const absRoot = path.join(WORKSPACE_ROOT, root.source)
    const node = await walk(absRoot, root.key, root.kind, root.source, null)
    if (node) rootNodes.push(node.id)
  }

  return {
    generatedAt: new Date().toISOString(),
    roots: rootNodes,
    nodes: Object.fromEntries(nodes.entries()),
  }
}

async function main() {
  const manifest = await buildTree()
  const outFile = path.join(WORKSPACE_ROOT, "packages/ui/src/lib/registry-folders.json")
  await fs.writeFile(outFile, `${JSON.stringify(manifest, null, 2)}\n`)
  console.log(
    `[registry:folders:sync] wrote ${manifest.roots.length} roots and ${Object.keys(manifest.nodes).length} folder nodes to ${path.relative(WORKSPACE_ROOT, outFile)}`
  )
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
