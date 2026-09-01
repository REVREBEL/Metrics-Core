import { promises as fs } from "node:fs";
import { REGISTRY_JSON } from "./lib/paths.mjs";

async function main() {
  const raw = await fs.readFile(REGISTRY_JSON, "utf8");
  const manifest = JSON.parse(raw);
  const errors = [];

  if (!manifest || typeof manifest !== "object") {
    errors.push("manifest must be an object");
  }

  if (typeof manifest.name !== "string" || manifest.name.trim().length === 0) {
    errors.push("manifest.name must be a non-empty string");
  }

  try {
    new URL(String(manifest.homepage ?? ""));
  } catch {
    errors.push("manifest.homepage must be a valid URL");
  }

  if (!Array.isArray(manifest.items) || manifest.items.length === 0) {
    errors.push("manifest.items must be a non-empty array");
  }

  const items = Array.isArray(manifest.items) ? manifest.items : [];

  for (const [index, item] of items.entries()) {
    if (typeof item?.name !== "string" || item.name.trim().length === 0) {
      errors.push(`items[${index}].name must be a non-empty string`);
    }
    if (typeof item?.type !== "string" || item.type.trim().length === 0) {
      errors.push(`items[${index}].type must be a non-empty string`);
    }
    if (item.files !== undefined && !Array.isArray(item.files)) {
      errors.push(`items[${index}].files must be an array when present`);
      continue;
    }
    for (const [fileIndex, file] of (item.files ?? []).entries()) {
      if (typeof file?.path !== "string" || file.path.trim().length === 0) {
        errors.push(
          `items[${index}].files[${fileIndex}].path must be a non-empty string`,
        );
      }
      if (typeof file?.type !== "string" || file.type.trim().length === 0) {
        errors.push(
          `items[${index}].files[${fileIndex}].type must be a non-empty string`,
        );
      }
    }
  }

  if (errors.length > 0) {
    console.error("❌ registry.json validation failed:");
    for (const error of errors) {
      console.error(`- ${error}`);
    }
    process.exit(1);
  }

  const missingPaths = [];
  for (const item of items) {
    for (const file of item.files ?? []) {
      if (!file.path) {
        missingPaths.push({ item: item.name, reason: "missing path" });
      }
    }
  }

  if (missingPaths.length > 0) {
    console.error("❌ registry.json contains files without paths:");
    console.error(JSON.stringify(missingPaths.slice(0, 20), null, 2));
    process.exit(1);
  }

  console.log(`✅ registry.json is valid (${items.length} items)`);
}

main().catch((error) => {
  console.error("❌ Error:", error instanceof Error ? error.message : error);
  process.exit(1);
});
