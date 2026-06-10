import { promises as fs } from "node:fs"
import path from "node:path"
import { spawnSync } from "node:child_process"

const SOURCE_EXTENSIONS = new Set([".svg", ".SVG"])
const ICONS_ROOT = path.join(process.cwd(), "src/icons")
const DEFAULT_SOURCE_ROOTS = [
  path.join(process.cwd(), "src/icons"),
  path.join(process.cwd(), "src/assets"),
]
const ALIAS_MANIFEST_PATH = path.join(ICONS_ROOT, "icon-aliases.json")

function parseArgs(argv) {
  const options = {
    sourceRoots: [],
    outRoot: ICONS_ROOT,
    check: false,
    normalizeSource: true,
  }

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index]

    if (arg === "--check") {
      options.check = true
      continue
    }

    if (arg === "--no-normalize-source") {
      options.normalizeSource = false
      continue
    }

    if (arg === "--source") {
      const value = argv[index + 1]
      if (!value) throw new Error("--source requires a path")
      options.sourceRoots.push(path.resolve(process.cwd(), value))
      index += 1
      continue
    }

    if (arg === "--out") {
      const value = argv[index + 1]
      if (!value) throw new Error("--out requires a path")
      options.outRoot = path.resolve(process.cwd(), value)
      index += 1
      continue
    }

    throw new Error(`Unknown argument: ${arg}`)
  }

  if (options.sourceRoots.length === 0) {
    options.sourceRoots = DEFAULT_SOURCE_ROOTS
  }

  return options
}

async function exists(filePath) {
  try {
    await fs.access(filePath)
    return true
  } catch {
    return false
  }
}

async function readJsonIfExists(filePath, fallback) {
  try {
    return JSON.parse(await fs.readFile(filePath, "utf8"))
  } catch (error) {
    if (error?.code === "ENOENT") return fallback
    throw error
  }
}

function toPascalCase(value) {
  const words = value
    .replace(/\.[^.]+$/, "")
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .replace(/[-_]+/g, " ")
    .replace(/[^\w\s]/g, " ")
    .trim()
    .split(/\s+/)
    .filter(Boolean)

  const result = words
    .map((word) => `${word.charAt(0).toUpperCase()}${word.slice(1)}`)
    .join("")

  return result || "Icon"
}

function toExportName(value) {
  const pascal = toPascalCase(value)
  return /^\d/.test(pascal) ? `Icon${pascal}` : pascal
}

function isValidExportName(value) {
  return /^[A-Za-z_$][A-Za-z0-9_$]*$/.test(value)
}

function toReactSegment(segment) {
  if (segment.endsWith("SVG")) return `${segment.slice(0, -3)}React`
  if (segment.endsWith("Svg")) return `${segment.slice(0, -3)}React`
  return segment
}

function toCamelCaseAttribute(value) {
  return value.replace(/-([a-z])/g, (_, char) => char.toUpperCase())
}

function styleAttributeToJsx(style) {
  const entries = style
    .split(";")
    .map((part) => part.trim())
    .filter(Boolean)
    .map((part) => {
      const separator = part.indexOf(":")
      if (separator === -1) return null

      const property = toCamelCaseAttribute(part.slice(0, separator).trim())
      const value = part.slice(separator + 1).trim()
      if (!property || !value) return null

      return `${property}: ${JSON.stringify(value)}`
    })
    .filter(Boolean)

  if (entries.length === 0) return " style={{}}"
  return ` style={{ ${entries.join(", ")} }}`
}

function toTargetRelativePath(sourceRoot, sourceFile) {
  const relativePath = path.relative(sourceRoot, sourceFile)
  const segments = relativePath.split(path.sep)
  const file = segments.pop()
  const targetSegments = segments.map(toReactSegment)
  targetSegments.push(`${toExportName(file)}.tsx`)
  return targetSegments.join(path.sep)
}

function normalizeSvgForJsx(svg) {
  return svg
    .replace(/<\?xml[\s\S]*?\?>/g, "")
    .replace(/<!DOCTYPE[\s\S]*?>/gi, "")
    .replace(/<!--[\s\S]*?-->/g, "")
    .replace(/\sclass=/g, " className=")
    .replace(/<style>([\s\S]*?)<\/style>/g, (_, css) => `<style>{${JSON.stringify(css.trim())}}</style>`)
    .replace(/\sstyle=(["'])(.*?)\1/g, (_, _quote, style) => styleAttributeToJsx(style))
    .replace(/\sclip-rule=/g, " clipRule=")
    .replace(/\sfill-rule=/g, " fillRule=")
    .replace(/\sstroke-width=/g, " strokeWidth=")
    .replace(/\sstroke-linecap=/g, " strokeLinecap=")
    .replace(/\sstroke-linejoin=/g, " strokeLinejoin=")
    .replace(/\sstroke-miterlimit=/g, " strokeMiterlimit=")
    .replace(/\sstroke-dasharray=/g, " strokeDasharray=")
    .replace(/\sstroke-dashoffset=/g, " strokeDashoffset=")
    .replace(/\sstop-color=/g, " stopColor=")
    .replace(/\sstop-opacity=/g, " stopOpacity=")
    .replace(/\sfill-opacity=/g, " fillOpacity=")
    .replace(/\sstroke-opacity=/g, " strokeOpacity=")
    .replace(/\sxmlns:xlink=/g, " xmlnsXlink=")
    .replace(/\sxlink:href=/g, " xlinkHref=")
    .replace(/(["'])#000000\1/g, "$1currentColor$1")
    .replace(/(["'])#000\1/g, "$1currentColor$1")
    .replace(/(["'])black\1/g, "$1currentColor$1")
    .replace(/<svg\b([^>]*)>/, (_, attributes) => {
      const withoutDimensions = attributes.replace(/\s(?:width|height)=("[^"]*"|'[^']*'|\{[^}]*\}|[^\s>]+)/g, "")
      return `<svg${withoutDimensions} width="1em" height="1em" {...props}>`
    })
}

function buildComponentSource(componentName, svg) {
  const jsx = normalizeSvgForJsx(svg).trim()

  return `import * as React from "react";
import type { SVGProps } from "react";

const Svg${componentName} = (props: SVGProps<SVGSVGElement>) => ${jsx};

export default Svg${componentName};
`
}

async function listSvgFiles(root) {
  if (!(await exists(root))) return []

  const out = []

  async function walk(dir) {
    const entries = await fs.readdir(dir, { withFileTypes: true })
    await Promise.all(
      entries.map(async (entry) => {
        const entryPath = path.join(dir, entry.name)
        if (entry.isDirectory()) {
          await walk(entryPath)
          return
        }

        if (entry.isFile() && SOURCE_EXTENSIONS.has(path.extname(entry.name))) {
          out.push(entryPath)
        }
      })
    )
  }

  await walk(root)
  return out.sort((a, b) => a.localeCompare(b))
}

async function renameSourceIfNeeded(sourceFile, normalizedFile, check) {
  if (sourceFile === normalizedFile) return { sourceFile, renamed: false }
  if (await exists(normalizedFile)) return { sourceFile: normalizedFile, renamed: false }

  if (!check) {
    await fs.rename(sourceFile, normalizedFile)
  }

  return { sourceFile: normalizedFile, renamed: true }
}

function normalizeAliasEntry(entry) {
  return {
    directory: entry.directory,
    alias: entry.alias,
    target: entry.target,
  }
}

function getCompatibilityAliases(directory, originalBase, componentName) {
  const aliases = new Set()
  const originalExportName = toExportName(originalBase)

  aliases.add(originalExportName)

  if (componentName.startsWith("Icon") && componentName.length > 4) {
    aliases.add(`${componentName.slice(4)}Icon`)
  }

  if (componentName.endsWith("Icon") && componentName.length > 4) {
    aliases.add(`Icon${componentName.slice(0, -4)}`)
  }

  return [...aliases]
    .filter((alias) => alias && alias !== componentName && isValidExportName(alias))
    .map((alias) => ({
      directory,
      alias,
      target: componentName,
    }))
}

async function writeAliasManifest(nextAliases, check) {
  const current = await readJsonIfExists(ALIAS_MANIFEST_PATH, { aliases: [] })
  const merged = new Map()

  for (const entry of current.aliases ?? []) {
    const normalized = normalizeAliasEntry(entry)
    if (!isValidExportName(normalized.alias)) continue
    merged.set(`${normalized.directory}:${normalized.alias}:${normalized.target}`, normalized)
  }

  for (const entry of nextAliases) {
    const normalized = normalizeAliasEntry(entry)
    if (!isValidExportName(normalized.alias)) continue
    if (normalized.alias === normalized.target) continue
    merged.set(`${normalized.directory}:${normalized.alias}:${normalized.target}`, normalized)
  }

  const manifest = {
    aliases: [...merged.values()].sort((a, b) =>
      `${a.directory}/${a.alias}/${a.target}`.localeCompare(`${b.directory}/${b.alias}/${b.target}`)
    ),
  }
  const nextContent = `${JSON.stringify(manifest, null, 2)}\n`
  const prevContent = await fs.readFile(ALIAS_MANIFEST_PATH, "utf8").catch(() => null)

  if (prevContent === nextContent) return { changed: false }

  if (!check) {
    await fs.mkdir(path.dirname(ALIAS_MANIFEST_PATH), { recursive: true })
    await fs.writeFile(ALIAS_MANIFEST_PATH, nextContent, "utf8")
  }

  return { changed: true }
}

async function syncIcons(options) {
  const aliases = []
  let discovered = 0
  let normalizedSources = 0
  let writtenComponents = 0

  for (const sourceRoot of options.sourceRoots) {
    const svgFiles = await listSvgFiles(sourceRoot)

    for (const originalSourceFile of svgFiles) {
      discovered += 1

      const originalBase = path.basename(originalSourceFile, path.extname(originalSourceFile))
      const normalizedBase = toExportName(originalBase)
      const normalizedSourceFile = path.join(path.dirname(originalSourceFile), `${normalizedBase}.svg`)
      const renameResult = options.normalizeSource
        ? await renameSourceIfNeeded(originalSourceFile, normalizedSourceFile, options.check)
        : { sourceFile: originalSourceFile, renamed: false }

      if (renameResult.renamed) normalizedSources += 1

      const targetRelativePath = toTargetRelativePath(sourceRoot, renameResult.sourceFile)
      const targetPath = path.join(options.outRoot, targetRelativePath)
      const componentName = path.basename(targetPath, ".tsx")
      const svg = await fs.readFile(renameResult.sourceFile, "utf8")
      const nextContent = buildComponentSource(componentName, svg)
      const prevContent = await fs.readFile(targetPath, "utf8").catch(() => null)

      if (prevContent !== nextContent) {
        writtenComponents += 1
        if (!options.check) {
          await fs.mkdir(path.dirname(targetPath), { recursive: true })
          await fs.writeFile(targetPath, nextContent, "utf8")
        }
      }

      const directory = path.relative(ICONS_ROOT, path.dirname(targetPath)) || "."
      aliases.push(...getCompatibilityAliases(directory, originalBase, componentName))
    }
  }

  const aliasResult = await writeAliasManifest(aliases, options.check)

  return {
    discovered,
    normalizedSources,
    writtenComponents,
    aliasManifestChanged: aliasResult.changed,
  }
}

function runIconBarrels() {
  const result = spawnSync(process.execPath, ["./scripts/generate-icon-barrels.mjs"], {
    cwd: process.cwd(),
    stdio: "inherit",
  })

  if (result.status !== 0) {
    process.exit(result.status ?? 1)
  }
}

async function main() {
  const options = parseArgs(process.argv.slice(2))
  const result = await syncIcons(options)

  if (options.check) {
    if (result.normalizedSources > 0 || result.writtenComponents > 0 || result.aliasManifestChanged) {
      console.error(
        `[icons:sync] Out of date. svg=${result.discovered}, source renames=${result.normalizedSources}, component changes=${result.writtenComponents}, alias manifest changed=${result.aliasManifestChanged}`
      )
      process.exit(1)
    }

    console.log(`[icons:sync] OK (${result.discovered} svg files checked)`)
    return
  }

  console.log(
    `[icons:sync] synced ${result.discovered} svg files; source renames=${result.normalizedSources}, component writes=${result.writtenComponents}, alias manifest changed=${result.aliasManifestChanged}`
  )
  runIconBarrels()
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
