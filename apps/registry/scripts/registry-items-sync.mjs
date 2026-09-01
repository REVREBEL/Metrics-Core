import { promises as fs } from "node:fs";
import path from "node:path";

import {
  getSourceRootsForItems,
  SKIP_FILE_PATTERNS,
  toManifestPath,
  toTitle,
} from "./lib/manifest-utils.mjs";
import { REGISTRY_JSON } from "./lib/paths.mjs";

async function walk(dir) {
  const out = [];
  const entries = await fs.readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      out.push(...(await walk(full)));
      continue;
    }
    if (entry.isFile()) {
      out.push(full);
    }
  }
  return out;
}

async function main() {
  const raw = await fs.readFile(REGISTRY_JSON, "utf8");
  const registry = JSON.parse(raw);

  const items = registry.items || [];
  const names = new Set(items.map((item) => item.name));
  const filePaths = new Set(
    items.flatMap((item) =>
      (item.files || []).map((file) =>
        String(file.path || "").replace(/\\/g, "/"),
      ),
    ),
  );

  let added = 0;
  let collisions = 0;

  for (const sourceRoot of getSourceRootsForItems()) {
    const sourceFiles = (await walk(sourceRoot.absRoot))
      .map((absPath) => toManifestPath(absPath))
      .filter((relPath) => relPath.endsWith(".ts") || relPath.endsWith(".tsx"))
      .filter(
        (relPath) =>
          !SKIP_FILE_PATTERNS.some((pattern) => pattern.test(relPath)),
      );

    for (const relPath of sourceFiles) {
      if (filePaths.has(relPath)) continue;

      const stem = path.basename(relPath).replace(/\.[^.]+$/, "");
      if (names.has(stem)) {
        collisions += 1;
        continue;
      }

      items.push({
        name: stem,
        type: sourceRoot.itemType,
        title: toTitle(stem),
        description: `Auto-generated registry entry for ${stem}.`,
        files: [
          {
            path: relPath,
            type: sourceRoot.itemType,
          },
        ],
      });

      names.add(stem);
      filePaths.add(relPath);
      added += 1;
    }
  }

  registry.items = items;
  await fs.writeFile(REGISTRY_JSON, `${JSON.stringify(registry, null, 2)}\n`);
  console.log(
    `[registry:items:sync] added ${added} items (${collisions} name collisions skipped)`,
  );
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
