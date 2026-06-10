import { promises as fs } from "node:fs"
import path from "node:path"

const SOURCE_EXTENSIONS = new Set([".ts", ".tsx"])
const ICONS_ROOT = path.join(process.cwd(), "src/icons")
const ALIAS_MANIFEST_PATH = path.join(ICONS_ROOT, "icon-aliases.json")
const EXCLUDED_DIRS = new Set([
  "node_modules",
  ".next",
  "dist",
  "build",
  "coverage",
  ".turbo",
])
const RESERVED_WORDS = new Set([
  "break",
  "case",
  "catch",
  "class",
  "const",
  "continue",
  "debugger",
  "default",
  "delete",
  "do",
  "else",
  "export",
  "extends",
  "finally",
  "for",
  "function",
  "if",
  "import",
  "in",
  "instanceof",
  "new",
  "return",
  "super",
  "switch",
  "this",
  "throw",
  "try",
  "typeof",
  "var",
  "void",
  "while",
  "with",
  "yield",
])

function isTypeDeclaration(file) {
  return file.endsWith(".d.ts")
}

function isSourceFile(file) {
  if (file === "index.ts" || file === "index.tsx") return false
  if (isTypeDeclaration(file)) return false
  return SOURCE_EXTENSIONS.has(path.extname(file))
}

function withoutExtension(file) {
  return file.replace(/\.(ts|tsx)$/, "")
}

function hasDefaultExport(source) {
  return /\bexport\s+default\b/.test(source)
}

function hasNamedExport(source) {
  return /\bexport\s+(?:const|let|var|function|class|type|interface|enum)\b/.test(source) || /\bexport\s*\{/.test(source)
}

function toExportName(name, usedNames) {
  const normalized = name
    .replace(/^[^A-Za-z_$]+/, "")
    .replace(/[^A-Za-z0-9_$]/g, "")

  let exportName = normalized || "Icon"
  if (/^\d/.test(exportName)) exportName = `Icon${exportName}`
  if (RESERVED_WORDS.has(exportName)) exportName = `${exportName}Icon`

  const baseName = exportName
  let suffix = 2
  while (usedNames.has(exportName)) {
    exportName = `${baseName}${suffix}`
    suffix += 1
  }

  usedNames.add(exportName)
  return exportName
}

function isValidExportName(value) {
  return /^[A-Za-z_$][A-Za-z0-9_$]*$/.test(value)
}

async function readIfExists(filePath) {
  try {
    return await fs.readFile(filePath, "utf8")
  } catch {
    return null
  }
}

async function readAliasManifest() {
  try {
    const manifest = JSON.parse(await fs.readFile(ALIAS_MANIFEST_PATH, "utf8"))
    return Array.isArray(manifest.aliases) ? manifest.aliases : []
  } catch (error) {
    if (error?.code === "ENOENT") return []
    throw error
  }
}

async function getEntries(dir) {
  try {
    return await fs.readdir(dir, { withFileTypes: true })
  } catch (error) {
    if (error?.code === "ENOENT") return []
    throw error
  }
}

async function hasIndexableContent(dir) {
  const entries = await getEntries(dir)

  if (entries.some((entry) => entry.isFile() && isSourceFile(entry.name))) {
    return true
  }

  for (const entry of entries) {
    if (!entry.isDirectory()) continue
    if (EXCLUDED_DIRS.has(entry.name)) continue
    if (await hasIndexableContent(path.join(dir, entry.name))) return true
  }

  return false
}

async function listDirsWithIndexableContent(root) {
  const out = []

  async function walk(dir) {
    if (!(await hasIndexableContent(dir))) return

    out.push(dir)
    const entries = await getEntries(dir)

    await Promise.all(
      entries
        .filter((entry) => entry.isDirectory() && !EXCLUDED_DIRS.has(entry.name))
        .map((entry) => walk(path.join(dir, entry.name)))
    )
  }

  await walk(root)
  return out
}

async function buildIndexContent(dir, aliases) {
  const entries = await getEntries(dir)
  const usedNames = new Set()
  const lines = []
  const relativeDir = path.relative(ICONS_ROOT, dir) || "."

  const files = entries
    .filter((entry) => entry.isFile() && isSourceFile(entry.name))
    .map((entry) => entry.name)
    .sort((a, b) => a.localeCompare(b))

  for (const file of files) {
    const source = await fs.readFile(path.join(dir, file), "utf8")
    const importPath = `./${withoutExtension(file)}`

    if (hasDefaultExport(source)) {
      lines.push(`export { default as ${toExportName(withoutExtension(file), usedNames)} } from "${importPath}"`)
    }

    if (hasNamedExport(source)) {
      lines.push(`export * from "${importPath}"`)
    }
  }

  const dirs = entries
    .filter((entry) => entry.isDirectory() && !EXCLUDED_DIRS.has(entry.name))
    .map((entry) => entry.name)
    .sort((a, b) => a.localeCompare(b))

  for (const childDir of dirs) {
    if (await hasIndexableContent(path.join(dir, childDir))) {
      lines.push(`export * from "./${childDir}"`)
    }
  }

  for (const alias of aliases) {
    if (alias.directory !== relativeDir) continue
    if (!alias.alias || !alias.target || !isValidExportName(alias.alias)) continue
    if (alias.alias === alias.target) continue
    if (usedNames.has(alias.alias)) continue
    if (!(await readIfExists(path.join(dir, `${alias.target}.tsx`)))) continue

    usedNames.add(alias.alias)
    lines.push(`export { default as ${alias.alias} } from "./${alias.target}"`)
  }

  if (lines.length === 0) return null
  return `${[...new Set(lines)].join("\n")}\n`
}

async function generateIconBarrels(options) {
  const dirs = await listDirsWithIndexableContent(options.root)
  const aliases = await readAliasManifest()
  let changed = 0
  let created = 0

  for (const dir of dirs) {
    const indexPath = path.join(dir, "index.ts")
    const nextContent = await buildIndexContent(dir, aliases)
    if (!nextContent) continue

    const prevContent = await readIfExists(indexPath)
    if (prevContent === nextContent) continue

    changed += 1
    if (prevContent == null) created += 1

    if (!options.check) {
      await fs.writeFile(indexPath, nextContent, "utf8")
    }
  }

  return { changed, created }
}

async function main() {
  const cwd = process.cwd()
  const args = process.argv.slice(2)
  const root = ICONS_ROOT
  const check = args.includes("--check")

  const result = await generateIconBarrels({ root, check })

  if (check) {
    if (result.changed > 0) {
      console.error(`[icons:barrels] Out of date. index changes=${result.changed}`)
      process.exit(1)
    }

    console.log("[icons:barrels] OK")
    return
  }

  console.log(`[icons:barrels] Updated ${result.changed} index files (${result.created} created)`)
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
