import { promises as fs } from "node:fs";
import path from "node:path";

import {
  deriveTargetPath,
  getManifestSearchRoots,
  toManifestPath,
} from "./lib/manifest-utils.mjs";
import { REGISTRY_JSON } from "./lib/paths.mjs";

const DROPPABLE_STALE_FILES = new Set([
  "apps/registry/registry/common/postcss.config.mjs",
  "apps/registry/registry/common/tsconfig.json",
  "apps/registry/registry/common/package.json",
]);

const TYPOGRAPHY_FILE_OVERRIDES = {
  "typography-blockquote":
    "packages/ui/src/primitives/typography/TypographyBlockquoteProps.tsx",
  "typography-h1": "packages/ui/src/primitives/typography/TypographyH1.tsx",
  "typography-h2": "packages/ui/src/primitives/typography/TypographyH2.tsx",
  "typography-h3": "packages/ui/src/primitives/typography/TypographyH3.tsx",
  "typography-h4": "packages/ui/src/primitives/typography/TypographyH4.tsx",
  "typography-inline-code":
    "packages/ui/src/primitives/typography/TyypographyLineCode.tsx",
  "typography-large":
    "packages/ui/src/primitives/typography/TypographyLarge.tsx",
  "typography-lead": "packages/ui/src/primitives/typography/TypographyLead.tsx",
  "typography-list": "packages/ui/src/primitives/typography/TypographyList.tsx",
  "typography-muted":
    "packages/ui/src/primitives/typography/TypographyMuted.tsx",
  "typography-p": "packages/ui/src/primitives/typography/TypographyP.tsx",
  "typography-small":
    "packages/ui/src/primitives/typography/TypographySmall.tsx",
  "typography-table":
    "packages/ui/src/primitives/typography/TypographyTable.tsx",
};

async function walk(dir) {
  const out = [];
  let entries = [];
  try {
    entries = await fs.readdir(dir, { withFileTypes: true });
  } catch {
    return out;
  }

  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      out.push(...(await walk(full)));
    } else if (entry.isFile()) {
      out.push(full);
    }
  }

  return out;
}

function stem(file) {
  return path.basename(file).replace(/\.[^.]+$/, "");
}

function normalizedStem(file) {
  return stem(file)
    .replace(/[^a-zA-Z0-9]/g, "")
    .toLowerCase();
}

function normalizeRegistryDependency(value, localItemNames) {
  if (typeof value !== "string") return value;
  if (value.startsWith("@") || value.includes("/")) {
    const match = value.match(/\/([^/]+)\.json$/);
    if (!match) return value;
    const itemName = match[1] === "theme" ? "metrics" : match[1];
    return `@metrics/${itemName}`;
  }

  if (localItemNames.has(value)) {
    return `@metrics/${value}`;
  }

  return value;
}

function normalizeRegistryDependencies(values, localItemNames) {
  if (!Array.isArray(values)) return values;

  return values.map((value) =>
    normalizeRegistryDependency(value, localItemNames),
  );
}

function dedupeDependencies(values) {
  if (!Array.isArray(values)) return values;
  return [...new Set(values)];
}

function pickBestCandidate(candidates, itemName) {
  if (!candidates || candidates.length === 0) return null;

  const name = String(itemName || "").toLowerCase();
  const scored = candidates.map((candidate) => {
    const lowered = candidate.toLowerCase();
    let score = 0;
    if (lowered.includes("packages/ui/src/primitives")) score += 5;
    if (lowered.includes("packages/ui/src/components")) score += 4;
    if (lowered.includes("apps/registry/app/demo")) score += 3;
    if (name && lowered.includes(name)) score += 6;
    if (name && lowered.endsWith(`/${name}.tsx`)) score += 8;
    return { candidate, score };
  });

  scored.sort(
    (left, right) =>
      right.score - left.score ||
      left.candidate.length - right.candidate.length,
  );
  return scored[0]?.candidate ?? null;
}

async function main() {
  const registryRaw = await fs.readFile(REGISTRY_JSON, "utf8");
  const registry = JSON.parse(registryRaw);
  const localItemNames = new Set(
    (registry.items || []).map((item) => item?.name).filter(Boolean),
  );

  const allFilesAbs = (
    await Promise.all(getManifestSearchRoots().map((root) => walk(root)))
  ).flat();
  const allFilesRel = allFilesAbs.map((absPath) => toManifestPath(absPath));
  const fileSet = new Set(allFilesRel);
  const byStem = new Map();

  for (const relPath of allFilesRel) {
    for (const key of [stem(relPath), normalizedStem(relPath)]) {
      const current = byStem.get(key) || [];
      current.push(relPath);
      byStem.set(key, current);
    }
  }

  let updatedPaths = 0;
  let addedTargets = 0;
  const unresolved = [];

  for (const [itemIndex, item] of (registry.items || []).entries()) {
    if (Array.isArray(item.registryDependencies)) {
      item.registryDependencies = dedupeDependencies(
        normalizeRegistryDependencies(
          item.registryDependencies,
          localItemNames,
        ),
      );
    }

    const nextFiles = [];

    for (const [fileIndex, file] of (item.files || []).entries()) {
      if (!file.path || typeof file.path !== "string") continue;

      const current = String(file.path).replace(/\\/g, "/");
      const overridePath = TYPOGRAPHY_FILE_OVERRIDES[item.name];
      const resolvedPath =
        (overridePath && fileSet.has(overridePath) ? overridePath : null) ||
        (fileSet.has(current)
          ? current
          : pickBestCandidate(
              [
                ...(byStem.get(stem(current)) || []),
                ...(byStem.get(normalizedStem(current)) || []),
              ],
              item.name,
            ));

      if (!resolvedPath) {
        if (DROPPABLE_STALE_FILES.has(current)) {
          updatedPaths += 1;
          continue;
        }
        unresolved.push({
          item: item.name,
          itemIndex,
          fileIndex,
          path: current,
        });
        continue;
      }

      if (resolvedPath !== current) {
        file.path = resolvedPath;
        updatedPaths += 1;
      }

      if (!file.target) {
        const target = deriveTargetPath(String(file.path));
        if (target) {
          file.target = target;
          addedTargets += 1;
        }
      }

      nextFiles.push(file);
    }

    item.files = nextFiles.filter(
      (file) => !DROPPABLE_STALE_FILES.has(String(file.path || "")),
    );
  }

  await fs.writeFile(REGISTRY_JSON, `${JSON.stringify(registry, null, 2)}\n`);
  console.log(
    `[registry:manifest:sync] updated ${updatedPaths} file paths and added ${addedTargets} targets`,
  );

  if (unresolved.length > 0) {
    console.error(
      `[registry:manifest:sync] unresolved paths: ${unresolved.length}`,
    );
    console.error(JSON.stringify(unresolved.slice(0, 50), null, 2));
    process.exit(1);
  }

  console.log("[registry:manifest:sync] all paths resolved");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
