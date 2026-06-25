import { promises as fs } from "node:fs"
import path from "node:path"

import { REGISTRY_METADATA_JSON, UI_SOURCE_ROOT } from "./lib/paths.mjs"

const SOURCE_ROOTS = [
  path.join(UI_SOURCE_ROOT, "components"),
  path.join(UI_SOURCE_ROOT, "primitives"),
]

async function walk(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true })
  const out = []
  for (const entry of entries) {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      if (entry.name === "data" || entry.name.startsWith("_")) continue
      out.push(...(await walk(full)))
      continue
    }
    if (!entry.isFile()) continue
    if (!entry.name.endsWith(".tsx")) continue
    if (entry.name === "index.tsx") continue
    if (entry.name.includes(".stories.")) continue
    out.push(full)
  }
  return out
}

function toRelComponentKey(absPath) {
  const rel = path.relative(UI_SOURCE_ROOT, absPath).replace(/\\/g, "/")
  return rel.replace(/\.tsx$/, "")
}

function pushProp(props, prop) {
  if (!prop.name || props.some((existing) => existing.name === prop.name)) return
  props.push(prop)
}

function cleanType(type) {
  return type.replace(/\s+/g, " ").replace(/,$/, "").trim()
}

function parsePropBlock(body) {
  const props = []
  const lines = body
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)

  for (const line of lines) {
    if (line.startsWith("//") || line.startsWith("*") || line.startsWith("/*")) continue
    const match = line.match(/^([A-Za-z_$][\w$-]*)\??\s*:\s*([^;]+);?$/)
    if (!match) continue
    pushProp(props, {
      name: match[1],
      type: cleanType(match[2]),
      required: !line.includes("?:"),
    })
  }

  return props
}

function extractBalancedBlock(raw, startIndex) {
  const openIndex = raw.indexOf("{", startIndex)
  if (openIndex === -1) return null
  let depth = 0
  for (let index = openIndex; index < raw.length; index += 1) {
    const char = raw[index]
    if (char === "{") depth += 1
    if (char === "}") depth -= 1
    if (depth === 0) {
      return raw.slice(openIndex + 1, index)
    }
  }
  return null
}

function parseDeclaredProps(raw) {
  const props = []
  const declarationRegex = /(?:export\s+)?(?:interface|type)\s+([A-Za-z_$][\w$]*Props)\b/g
  let match = declarationRegex.exec(raw)

  while (match) {
    const block = extractBalancedBlock(raw, match.index)
    if (block) {
      for (const prop of parsePropBlock(block)) {
        pushProp(props, prop)
      }
    }
    match = declarationRegex.exec(raw)
  }

  return props
}

function parseInlineObjectProps(raw) {
  const props = []
  const inlineBlocks = raw.match(/&\s*\{([\s\S]*?)\}/g) ?? []
  for (const block of inlineBlocks) {
    const body = block.replace(/^&\s*\{/, "").replace(/\}$/, "")
    for (const prop of parsePropBlock(body)) {
      pushProp(props, prop)
    }
  }
  return props
}

function parseCvaVariantProps(raw) {
  const props = []
  const variantsIndex = raw.indexOf("variants:")
  if (variantsIndex === -1) return props
  const variantsBlock = extractBalancedBlock(raw, variantsIndex)
  if (!variantsBlock) return props

  for (const variantName of ["variant", "size"]) {
    const index = variantsBlock.indexOf(`${variantName}:`)
    if (index === -1) continue
    const block = extractBalancedBlock(variantsBlock, index)
    if (!block) continue
    const values = block
      .split("\n")
      .map((line) => line.trim())
      .map((line) => line.match(/^["']?([A-Za-z0-9_-]+)["']?\s*:/)?.[1])
      .filter(Boolean)

    if (values.length > 0) {
      pushProp(props, {
        name: variantName,
        type: values.map((value) => `"${value}"`).join(" | "),
        required: false,
        description: `Generated from cva ${variantName} variants.`,
      })
    }
  }

  return props
}

function inferProps(raw) {
  const props = []

  for (const prop of [
    ...parseDeclaredProps(raw),
    ...parseInlineObjectProps(raw),
    ...parseCvaVariantProps(raw),
  ]) {
    pushProp(props, prop)
  }

  if (/className/.test(raw)) {
    pushProp(props, {
      name: "className",
      type: "string",
      required: false,
      description: "Additional CSS classes merged into the component.",
    })
  }

  if (/children/.test(raw)) {
    pushProp(props, {
      name: "children",
      type: "React.ReactNode",
      required: false,
      description: "Child content rendered inside the component.",
    })
  }

  const htmlPropMatch = raw.match(/React\.ComponentProps<["']([^"']+)["']>/)
  if (htmlPropMatch?.[1]) {
    pushProp(props, {
      name: "HTML attributes",
      type: `React.ComponentProps<"${htmlPropMatch[1]}">`,
      required: false,
      description: `Accepts standard ${htmlPropMatch[1]} element attributes.`,
    })
  }

  return props
}

function parseMetadataTs(raw) {
  const displayName = raw.match(/displayName\s*:\s*["'`](.*?)["'`]/)?.[1]
  const description = raw.match(/description\s*:\s*["'`]([\s\S]*?)["'`]/)?.[1]
  const propsBlockMatch = raw.match(/props\s*:\s*\[([\s\S]*?)\]/)
  const props = []

  if (propsBlockMatch?.[1]) {
    const itemRegex = /\{([\s\S]*?)\}/g
    let match = itemRegex.exec(propsBlockMatch[1])
    while (match) {
      const body = match[1]
      const name = body.match(/name\s*:\s*["'`](.*?)["'`]/)?.[1]
      const type = body.match(/type\s*:\s*["'`](.*?)["'`]/)?.[1]
      const requiredRaw = body.match(/required\s*:\s*(true|false)/)?.[1]
      const defaultValue = body.match(/defaultValue\s*:\s*["'`](.*?)["'`]/)?.[1]
      const propDescription = body.match(/description\s*:\s*["'`]([\s\S]*?)["'`]/)?.[1]
      if (name && type) {
        props.push({
          name,
          type,
          ...(requiredRaw ? { required: requiredRaw === "true" } : {}),
          ...(defaultValue ? { defaultValue } : {}),
          ...(propDescription ? { description: propDescription } : {}),
        })
      }
      match = itemRegex.exec(propsBlockMatch[1])
    }
  }

  if (!displayName && !description && props.length === 0) return null
  return {
    ...(displayName ? { displayName } : {}),
    ...(description ? { description } : {}),
    props,
  }
}

async function loadColocatedMetadata(absComponentFile) {
  const metadataPath = path.join(path.dirname(absComponentFile), "metadata.ts")

  try {
    const raw = await fs.readFile(metadataPath, "utf8")
    return parseMetadataTs(raw)
  } catch {
    return null
  }
}

async function main() {
  const files = []
  for (const sourceRoot of SOURCE_ROOTS) {
    files.push(...(await walk(sourceRoot)))
  }

  const existingRaw = await fs.readFile(REGISTRY_METADATA_JSON, "utf8").catch(() => "{}")
  const existing = JSON.parse(existingRaw)

  const next = {}
  let mergedFromColocated = 0

  for (const absPath of files) {
    const key = toRelComponentKey(absPath)
    const raw = await fs.readFile(absPath, "utf8")
    const inferredProps = inferProps(raw)
    const base = existing[key] ?? {
      displayName: key.split("/").pop(),
      description: "",
      props: inferredProps,
    }

    const colocated = await loadColocatedMetadata(absPath)
    if (colocated) {
      mergedFromColocated += 1
      next[key] = {
        ...base,
        ...colocated,
        props:
          Array.isArray(colocated.props) && colocated.props.length > 0
            ? colocated.props
            : inferredProps.length > 0
              ? inferredProps
              : base.props ?? [],
      }
    } else {
      next[key] = {
        ...base,
        props: inferredProps.length > 0 ? inferredProps : base.props ?? [],
      }
    }
  }

  await fs.writeFile(REGISTRY_METADATA_JSON, `${JSON.stringify(next, null, 2)}\n`, "utf8")
  console.log(`[registry:metadata:sync] wrote ${Object.keys(next).length} entries (merged ${mergedFromColocated} colocated metadata files)`)
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
