import path from "node:path"

import {
  REGISTRY_APP_ROOT,
  UI_PACKAGE_ROOT,
  WORKSPACE_ROOT,
  toPosix,
  toWorkspaceRelative,
} from "./paths.mjs"

export const SKIP_FILE_PATTERNS = [
  /\.stories\./,
  /\.test\./,
  /\.spec\./,
  /index\.tsx?$/,
]

export function toTitle(name) {
  return name
    .replace(/[-_]+/g, " ")
    .replace(/\b\w/g, (match) => match.toUpperCase())
}

export function normalizeGeneratedRegistryPath(filePath) {
  const normalized = toPosix(filePath)
  if (normalized.startsWith("src/")) {
    return `packages/ui/${normalized}`
  }
  if (normalized.startsWith("registry/")) {
    return `apps/registry/${normalized}`
  }
  return normalized
}

export function toManifestPath(absPath) {
  return toWorkspaceRelative(absPath)
}

export function deriveTargetPath(filePath) {
  const normalized = toPosix(filePath)

  if (normalized.startsWith("packages/ui/src/primitives/")) {
    const relative = normalized.replace("packages/ui/src/primitives/", "")
    return `src/primitive/${relative}`
  }

  if (normalized.startsWith("packages/ui/src/components/")) {
    const relative = normalized.replace("packages/ui/src/components/", "")
    const segments = relative.split("/")
    if (segments.length > 0) {
      segments[0] = segments[0].replace(/^metrics-/, "")
    }
    return `src/metrics/${segments.join("/")}`
  }

  if (normalized.startsWith("packages/ui/src/lib/")) {
    return `src/lib/${normalized.replace("packages/ui/src/lib/", "")}`
  }

  if (normalized.startsWith("packages/ui/src/hooks/")) {
    return `src/hooks/${normalized.replace("packages/ui/src/hooks/", "")}`
  }

  if (normalized.startsWith("packages/ui/src/styles/")) {
    return `src/styles/${normalized.replace("packages/ui/src/styles/", "")}`
  }

  if (normalized.startsWith("packages/ui/src/fonts/")) {
    return `src/fonts/${normalized.replace("packages/ui/src/fonts/", "")}`
  }

  if (normalized.startsWith("packages/ui/src/context/")) {
    return `src/context/${normalized.replace("packages/ui/src/context/", "")}`
  }

  if (normalized.startsWith("packages/ui/src/types/")) {
    return `src/types/${normalized.replace("packages/ui/src/types/", "")}`
  }

  if (normalized.startsWith("packages/ui/src/icons/")) {
    return `src/icons/${normalized.replace("packages/ui/src/icons/", "")}`
  }

  if (normalized.startsWith("apps/registry/app/demo/[name]/components/")) {
    return `src/components/${normalized.replace("apps/registry/app/demo/[name]/components/", "")}`
  }

  if (normalized.startsWith("apps/registry/app/demo/[name]/ui/")) {
    return `src/components/ui/${normalized.replace("apps/registry/app/demo/[name]/ui/", "")}`
  }

  if (normalized.startsWith("apps/registry/app/demo/[name]/blocks/")) {
    return `src/blocks/${normalized.replace("apps/registry/app/demo/[name]/blocks/", "")}`
  }

  return undefined
}

export function getSourceRootsForItems() {
  return [
    {
      absRoot: path.join(UI_PACKAGE_ROOT, "src/primitives"),
      itemType: "registry:ui",
    },
    {
      absRoot: path.join(UI_PACKAGE_ROOT, "src/components"),
      itemType: "registry:component",
    },
  ]
}

export function getManifestSearchRoots() {
  return [
    path.join(UI_PACKAGE_ROOT, "src/primitives"),
    path.join(UI_PACKAGE_ROOT, "src/components"),
    path.join(REGISTRY_APP_ROOT, "app/demo/[name]/components"),
    path.join(REGISTRY_APP_ROOT, "app/demo/[name]/ui"),
    path.join(REGISTRY_APP_ROOT, "app/demo/[name]/blocks"),
    path.join(UI_PACKAGE_ROOT, "src/lib"),
    path.join(UI_PACKAGE_ROOT, "src/hooks"),
    path.join(UI_PACKAGE_ROOT, "src/styles"),
    path.join(UI_PACKAGE_ROOT, "src/fonts"),
    path.join(UI_PACKAGE_ROOT, "src/context"),
    path.join(UI_PACKAGE_ROOT, "src/types"),
    path.join(UI_PACKAGE_ROOT, "src/icons"),
  ]
}

export function rebaseManifestPathForCwd(filePath, cwdRoot = WORKSPACE_ROOT) {
  const absolutePath = path.join(WORKSPACE_ROOT, filePath)
  return toPosix(path.relative(cwdRoot, absolutePath))
}
