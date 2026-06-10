import { promises as fs } from "node:fs"
import path from "node:path"

const SOURCE_EXTENSIONS = new Set([".ts", ".tsx"])
const EXCLUDED_FILES = new Set(["index.ts", "index.tsx", "*.d.ts"])
const EXCLUDED_DIRS = new Set([
  "node_modules",
  ".next",
  "dist",
  "build",
  "coverage",
  ".turbo",
])

const SPECIALIZED_BARREL_DIRS = new Set(["icons"])

function isTypeDeclaration(file) {
  return file.endsWith(".d.ts")
}

async function listDirsRecursive(root) {
  const out = []

  async function walk(dir) {
    const entries = await fs.readdir(dir, { withFileTypes: true })
    out.push(dir)

    await Promise.all(
      entries
        .filter((entry) => {
          if (!entry.isDirectory()) return false
          if (EXCLUDED_DIRS.has(entry.name)) return false

          const relativePath = path.relative(root, path.join(dir, entry.name))
          return !SPECIALIZED_BARREL_DIRS.has(relativePath)
        })
        .map((entry) => walk(path.join(dir, entry.name)))
    )
  }

  await walk(root)
  return out
}

async function buildIndexContent(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true })

  const exportsFromFiles = entries
    .filter((entry) => entry.isFile())
    .map((entry) => entry.name)
    .filter((name) => {
      if (EXCLUDED_FILES.has(name)) return false
      if (isTypeDeclaration(name)) return false
      const ext = path.extname(name)
      return SOURCE_EXTENSIONS.has(ext)
    })
    .map((name) => {
      const withoutExt = name.replace(/\.(ts|tsx)$/, "")
      return `export * from "./${withoutExt}"`
    })

  const exportsFromSubdirs = entries
    .filter((entry) => entry.isDirectory() && !EXCLUDED_DIRS.has(entry.name))
    .map((entry) => `export * from "./${entry.name}"`)

  const lines = [...exportsFromFiles, ...exportsFromSubdirs]
  if (lines.length === 0) return null

  const uniqueSorted = [...new Set(lines)].sort((a, b) => a.localeCompare(b))
  return `${uniqueSorted.join("\n")}\n`
}

async function readIfExists(filePath) {
  try {
    return await fs.readFile(filePath, "utf8")
  } catch {
    return null
  }
}

async function generateBarrels(options) {
  const dirs = await listDirsRecursive(options.root)
  let changed = 0
  let created = 0

  for (const dir of dirs) {
    const indexPath = path.join(dir, "index.ts")
    const nextContent = await buildIndexContent(dir)
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

async function maybeWriteExports(root, check) {
  const packageJsonPath = path.join(root, "package.json")
  const packageRaw = await fs.readFile(packageJsonPath, "utf8")
  const pkg = JSON.parse(packageRaw)

  const expected = {
    "./shared-ui/controls": "./src/components/_shared-ui/controls/index.ts",
    "./metrics-layouts": "./src/components/metrics-layouts/index.ts",
    "./metrics-core": "./src/components/metrics-core/index.ts",
    "./metrics-sections": "./src/components/metrics-sections/index.ts",
    "./metrics-charts": "./src/components/metrics-charts/index.ts",
    "./metrics-tables": "./src/components/metrics-tables/index.ts",
  }

  const merged = { ...(pkg.exports ?? {}) }
  let changed = 0

  for (const [key, value] of Object.entries(expected)) {
    if (merged[key] !== value) {
      merged[key] = value
      changed += 1
    }
  }

  if (changed === 0) return { changed: 0 }

  if (!check) {
    pkg.exports = merged
    await fs.writeFile(packageJsonPath, `${JSON.stringify(pkg, null, 2)}\n`, "utf8")
  }

  return { changed }
}

async function main() {
  const cwd = process.cwd()
  const args = process.argv.slice(2)
  const options = {
    root: cwd,
    check: args.includes("--check"),
    writePackageExports: args.includes("--exports"),
  }

  const sourceRoot = path.join(cwd, "src")
  const barrelResult = await generateBarrels({ ...options, root: sourceRoot })

  let exportResult = { changed: 0 }
  if (options.writePackageExports) {
    exportResult = await maybeWriteExports(cwd, options.check)
  }

  if (options.check) {
    if (barrelResult.changed > 0 || exportResult.changed > 0) {
      console.error(
        `[barrels] Out of date. barrel changes=${barrelResult.changed}, export changes=${exportResult.changed}`
      )
      process.exit(1)
    }

    console.log("[barrels] OK")
    return
  }

  console.log(`[barrels] Updated ${barrelResult.changed} index files (${barrelResult.created} created)`)

  if (options.writePackageExports) {
    console.log(`[barrels] Updated ${exportResult.changed} package export entries`)
  }
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
