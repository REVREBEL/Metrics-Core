import { promises as fs } from "node:fs";
import vm from "node:vm";
import { normalizeGeneratedRegistryPath } from "./lib/manifest-utils.mjs";
import { GENERATED_REGISTRY_TS, REGISTRY_JSON } from "./lib/paths.mjs";

const REGISTRY_HOMEPAGE = "https://metrics-ui.revrebel.io";
const REGISTRY_NAME = "metrics";

function extractItemsSource(raw) {
  const anchor = "const REGISTRY_ITEMS: Component[] = [";
  const start = raw.indexOf(anchor);
  if (start === -1) {
    throw new Error(
      `Could not find REGISTRY_ITEMS in ${GENERATED_REGISTRY_TS}`,
    );
  }

  const arrayStart = raw.indexOf("[", start);
  const exportStart = raw.indexOf(
    "export function getRegistryItems",
    arrayStart,
  );
  const arrayEnd = raw.lastIndexOf("];", exportStart);
  if (arrayStart === -1 || arrayEnd === -1) {
    throw new Error(
      `Could not extract REGISTRY_ITEMS array from ${GENERATED_REGISTRY_TS}`,
    );
  }

  return raw.slice(arrayStart, arrayEnd + 1);
}

function parseItems(itemsSource) {
  const executableSource = itemsSource.replace(/\]\s+as\s+Component\[\]$/, "]");
  return vm.runInNewContext(`(${executableSource})`, {}, { timeout: 5000 });
}

function normalizeItem(item) {
  return {
    ...item,
    files: Array.isArray(item.files)
      ? item.files.map((file) => ({
          ...file,
          path: normalizeGeneratedRegistryPath(String(file.path ?? "")),
        }))
      : item.files,
  };
}

async function main() {
  try {
    await fs.access(REGISTRY_JSON);
    console.log(
      `[registry:bootstrap] manifest already exists at ${REGISTRY_JSON}`,
    );
    return;
  } catch {}

  const raw = await fs.readFile(GENERATED_REGISTRY_TS, "utf8");
  const items = parseItems(extractItemsSource(raw)).map(normalizeItem);

  const manifest = {
    name: REGISTRY_NAME,
    homepage: REGISTRY_HOMEPAGE,
    items,
  };

  await fs.writeFile(
    REGISTRY_JSON,
    `${JSON.stringify(manifest, null, 2)}\n`,
    "utf8",
  );
  console.log(
    `[registry:bootstrap] wrote ${items.length} items to ${REGISTRY_JSON}`,
  );
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
