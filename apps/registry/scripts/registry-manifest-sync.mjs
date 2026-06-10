import { promises as fs } from "node:fs"
import path from "node:path"

const ROOT = process.cwd()
const REGISTRY_JSON = path.join(ROOT, "registry.json")

const SEARCH_ROOTS = [
  "src/primitives",
  "src/components",
  "registry/app/demo/[name]/components",
  "registry/app/demo/[name]/ui",
  "registry/app/demo/[name]/blocks",
  "registry/common",
  "src/lib",
  "src/hooks",
  "src/styles",
]

async function walk(dir) {
  const out = []
  let entries = []
  try {
    entries = await fs.readdir(dir, { withFileTypes: true })
  } catch {
    return out
  }
  for (const e of entries) {
    const full = path.join(dir, e.name)
    if (e.isDirectory()) out.push(...(await walk(full)))
    else if (e.isFile()) out.push(full)
  }
  return out
}

function norm(p) {
  return p.replace(/\\/g, "/")
}

function stem(file) {
  return path.basename(file).replace(/\.[^.]+$/, "")
}

function pickBestCandidate(candidates, itemName) {
  if (!candidates || candidates.length === 0) return null
  const name = String(itemName || "").toLowerCase()
  const scored = candidates.map((c) => {
    let s = 0
    const lc = c.toLowerCase()
    if (lc.includes("src/primitives")) s += 4
    if (lc.includes("registry/app/demo")) s += 3
    if (name && lc.includes(name)) s += 6
    if (name && lc.endsWith(`/${name}.tsx`)) s += 8
    return { c, s }
  })
  scored.sort((a, b) => b.s - a.s || a.c.length - b.c.length)
  return scored[0].c
}

const registryRaw = await fs.readFile(REGISTRY_JSON, "utf8")
const registry = JSON.parse(registryRaw)

const allFilesAbs = (await Promise.all(SEARCH_ROOTS.map((r) => walk(path.join(ROOT, r))))).flat()
const allFilesRel = allFilesAbs.map((abs) => norm(path.relative(ROOT, abs)))
const fileSet = new Set(allFilesRel)

const byStem = new Map()
for (const rel of allFilesRel) {
  const key = stem(rel)
  const arr = byStem.get(key) || []
  arr.push(rel)
  byStem.set(key, arr)
}

let updated = 0
const unresolved = []

for (const [itemIdx, item] of (registry.items || []).entries()) {
  for (const [fileIdx, file] of (item.files || []).entries()) {
    if (!file.path || typeof file.path !== "string") continue
    const current = norm(file.path)
    if (fileSet.has(current)) continue

    const candidates = byStem.get(stem(current)) || []
    const resolved = pickBestCandidate(candidates, item.name)

    if (resolved) {
      file.path = resolved
      updated += 1
    } else {
      unresolved.push({ item: item.name, itemIdx, fileIdx, path: current })
    }
  }
}

await fs.writeFile(REGISTRY_JSON, `${JSON.stringify(registry, null, 2)}\n`)
console.log(`[registry:manifest:sync] updated ${updated} file paths`)

if (unresolved.length > 0) {
  console.error(`[registry:manifest:sync] unresolved paths: ${unresolved.length}`)
  console.error(JSON.stringify(unresolved.slice(0, 50), null, 2))
  process.exit(1)
}

console.log("[registry:manifest:sync] all paths resolved")
