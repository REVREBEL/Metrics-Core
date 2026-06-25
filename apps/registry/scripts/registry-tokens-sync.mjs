import { promises as fs } from "node:fs"
import path from "node:path"

import {
  REGISTRY_JSON,
  REGISTRY_TOKENS_JSON,
  UI_SOURCE_ROOT,
} from "./lib/paths.mjs"

const TOKEN_SOURCES = [
  "styles/theme-reference.css",
  "styles/tailwind-reference.css",
]

const TOKEN_GROUPS = [
  {
    id: "theme",
    title: "Core Theme",
    description: "Standard shadcn and app-level surface, content, state, chart, and sidebar tokens.",
    patterns: [
      /^(background|foreground|card|card-foreground|popover|popover-foreground|primary|primary-foreground|secondary|secondary-foreground|muted|muted-foreground|accent|accent-foreground|destructive|destructive-foreground|border|input|ring|chart-\d+|sidebar.*|radius)$/,
      /^color-(background|foreground|card|card-foreground|popover|popover-foreground|primary|primary-foreground|secondary|secondary-foreground|muted|muted-foreground|accent|accent-foreground|destructive|destructive-foreground|border|input|ring|chart-\d+|sidebar.*)$/,
    ],
  },
  {
    id: "metrics",
    title: "Metric Indicators",
    description: "Positive, negative, total, and public metric indicator aliases.",
    patterns: [/^color-indicator-/, /^color-(positive|negative)/],
  },
  {
    id: "segments",
    title: "Hotel Segments",
    description: "Room production segment colors for total, transient, group, crew, complimentary, and other.",
    patterns: [/^color-segment-/],
  },
  {
    id: "channels",
    title: "Booking Channels",
    description: "OTA and source channel tokens for channel mix and ranking visualizations.",
    patterns: [/^color-channel-/],
  },
  {
    id: "social",
    title: "Social Sources",
    description: "Social, content, and audience source color tokens.",
    patterns: [/^color-social-/],
  },
  {
    id: "reviews",
    title: "Review Sources",
    description: "Review and reputation source tokens.",
    patterns: [/^color-review-/],
  },
  {
    id: "brand-colors",
    title: "Brand Palette",
    description: "Metrics brand palette and inverse color scales exposed to Tailwind.",
    patterns: [/^color-(dark-blue|dark-green|green|light-green|light-blue|yellow|orange|red|purple|smoke|grey|blue|emerald|teal|lime|cyan)-?/],
  },
  {
    id: "fonts",
    title: "Typography",
    description: "Font family design tokens.",
    patterns: [/^font-/],
  },
  {
    id: "effects",
    title: "Effects",
    description: "Shadow, tracking, and spacing tokens.",
    patterns: [/^(shadow|shadow-|tracking-|spacing)/],
  },
]

function parseVars(css, source) {
  const vars = {}
  const re = /--([a-zA-Z0-9-_]+)\s*:\s*([^;]+);/g
  let match
  while ((match = re.exec(css)) !== null) {
    vars[match[1]] = { name: match[1], value: match[2].trim(), source }
  }
  return vars
}

function getTokenType(name) {
  if (name.startsWith("font-")) return "font"
  if (
    name.startsWith("color-") ||
    [
      "background",
      "foreground",
      "card",
      "card-foreground",
      "popover",
      "popover-foreground",
      "primary",
      "primary-foreground",
      "secondary",
      "secondary-foreground",
      "muted",
      "muted-foreground",
      "accent",
      "accent-foreground",
      "destructive",
      "destructive-foreground",
      "border",
      "input",
      "ring",
    ].includes(name) ||
    /^chart-\d+$/.test(name) ||
    name.startsWith("sidebar")
  ) {
    return "color"
  }
  if (name.startsWith("shadow") || name.startsWith("tracking-") || name === "spacing") {
    return "effect"
  }
  return "value"
}

function groupTokens(tokens) {
  const remaining = new Set(tokens.map((token) => token.name))
  const groups = TOKEN_GROUPS.map((group) => {
    const items = tokens.filter((token) => {
      if (!group.patterns.some((pattern) => pattern.test(token.name))) return false
      remaining.delete(token.name)
      return true
    })
    return { ...group, tokens: items }
  }).filter((group) => group.tokens.length > 0)

  const otherTokens = tokens.filter((token) => remaining.has(token.name))
  if (otherTokens.length > 0) {
    groups.push({
      id: "other",
      title: "Other Tokens",
      description: "Additional CSS variables exposed by the design system.",
      tokens: otherTokens,
    })
  }

  return groups
}

async function main() {
  const registryRaw = await fs.readFile(REGISTRY_JSON, "utf8")
  const registry = JSON.parse(registryRaw)

  const allVars = {}
  for (const source of TOKEN_SOURCES) {
    const cssRaw = await fs.readFile(path.join(UI_SOURCE_ROOT, source), "utf8")
    Object.assign(allVars, parseVars(cssRaw, `src/${source}`))
  }

  const themeItem = (registry.items || []).find((item) => item?.type === "registry:theme")
  if (!themeItem) {
    throw new Error("No registry:theme item found in apps/registry/registry.json")
  }

  themeItem.cssVars = themeItem.cssVars || {}
  themeItem.cssVars.light = themeItem.cssVars.light || {}
  themeItem.cssVars.dark = themeItem.cssVars.dark || {}

  let addedLight = 0
  let addedDark = 0
  for (const [key, value] of Object.entries(allVars)) {
    if (!(key in themeItem.cssVars.light)) {
      themeItem.cssVars.light[key] = value.value
      addedLight += 1
    }
    if (!(key in themeItem.cssVars.dark)) {
      themeItem.cssVars.dark[key] = value.value
      addedDark += 1
    }
  }

  const tokens = Object.values(allVars)
    .map((token) => ({ ...token, type: getTokenType(token.name) }))
    .sort((left, right) => left.name.localeCompare(right.name))

  const metadata = {
    generatedAt: new Date().toISOString(),
    sources: TOKEN_SOURCES.map((source) => `src/${source}`),
    total: tokens.length,
    groups: groupTokens(tokens),
  }

  await fs.writeFile(REGISTRY_JSON, `${JSON.stringify(registry, null, 2)}\n`)
  await fs.writeFile(REGISTRY_TOKENS_JSON, `${JSON.stringify(metadata, null, 2)}\n`)
  console.log(`[registry:tokens:sync] merged ${Object.keys(allVars).length} vars; added light=${addedLight}, dark=${addedDark}`)
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
