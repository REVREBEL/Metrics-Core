import { promises as fs } from "node:fs"
import path from "node:path"

const ROOT = process.cwd()
const REGISTRY_JSON = path.join(ROOT, "registry.json")
const PRIMITIVES_ROOT = path.join(ROOT, "src/primitives")

const SKIP_FILE_PATTERNS = [
  /\.stories\./,
  /\.test\./,
  /\.spec\./,
  /index\.tsx?$/,
]

function toTitle(name) {
  return name
    .replace(/[-_]+/g, " ")
    .replace(/\b\w/g, (m) => m.toUpperCase())
}

async function walk(dir) {
  const out = []
  const entries = await fs.readdir(dir, { withFileTypes: true })
  for (const e of entries) {
    const full = path.join(dir, e.name)
    if (e.isDirectory()) {
      out.push(...(await walk(full)))
    } else if (e.isFile()) {
      out.push(full)
    }
  }
  return out
}

const raw = await fs.readFile(REGISTRY_JSON, "utf8")
const registry = JSON.parse(raw)

const items = registry.items || []
const names = new Set(items.map((i) => i.name))
const filePaths = new Set(
  items.flatMap((i) => (i.files || []).map((f) => String(f.path || "").replace(/\\/g, "/")))
)

const primitiveFiles = (await walk(PRIMITIVES_ROOT))
  .map((abs) => path.relative(ROOT, abs).replace(/\\/g, "/"))
  .filter((rel) => rel.endsWith(".ts") || rel.endsWith(".tsx"))
  .filter((rel) => !SKIP_FILE_PATTERNS.some((p) => p.test(rel)))

let added = 0
let collisions = 0

for (const rel of primitiveFiles) {
  if (filePaths.has(rel)) continue

  const stem = path.basename(rel).replace(/\.[^.]+$/, "")
  const name = stem

  if (names.has(name)) {
    collisions += 1
    continue
  }

  items.push({
    name,
    type: "registry:ui",
    title: toTitle(name),
    description: `Auto-generated registry entry for ${name}.`,
    files: [
      {
        path: rel,
        type: "registry:ui",
      },
    ],
  })

  names.add(name)
  filePaths.add(rel)
  added += 1
}

registry.items = items
await fs.writeFile(REGISTRY_JSON, `${JSON.stringify(registry, null, 2)}\n`)
console.log(`[registry:items:sync] added ${added} items (${collisions} name collisions skipped)`)
