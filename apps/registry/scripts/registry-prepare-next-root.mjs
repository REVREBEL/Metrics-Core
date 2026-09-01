import { promises as fs } from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const publicRoot = path.join(ROOT, "public");
const registryLayout = path.join(ROOT, "registry/public/layout.tsx");

async function ensureDir(dir) {
  await fs.mkdir(dir, { recursive: true });
}

async function writeFileIfChanged(filePath, content) {
  let existing = null;
  try {
    existing = await fs.readFile(filePath, "utf8");
  } catch {
    existing = null;
  }
  if (existing !== content) {
    await fs.writeFile(filePath, content, "utf8");
  }
}

async function removeIfSymlink(target) {
  try {
    const stat = await fs.lstat(target);
    if (stat.isSymbolicLink()) {
      await fs.unlink(target);
      return true;
    }
  } catch {
    return false;
  }
  return false;
}

async function normalizeRegistryLayoutImport() {
  try {
    const raw = await fs.readFile(registryLayout, "utf8");
    const next = raw
      .replace(
        'import "@/public/globals.css";',
        'import "../../src/fonts/rebel-fonts.css";\nimport "../../src/styles/tailwind-reference.css";',
      )
      .replace(
        'import "./globals.css";',
        'import "../../src/fonts/rebel-fonts.css";\nimport "../../src/styles/tailwind-reference.css";',
      );
    if (next !== raw) {
      await fs.writeFile(registryLayout, next, "utf8");
      return true;
    }
  } catch {
    return false;
  }
  return false;
}

async function main() {
  const removedSymlink = await removeIfSymlink(publicRoot);

  await ensureDir(path.join(publicRoot, "(registry)"));
  await ensureDir(path.join(publicRoot, "_not-found"));
  await ensureDir(path.join(publicRoot, "(registry)", "catalog"));
  await ensureDir(
    path.join(publicRoot, "(registry)", "catalog", "folder", "[...folder]"),
  );
  await ensureDir(path.join(publicRoot, "(registry)", "registry", "[name]"));
  await ensureDir(path.join(publicRoot, "(registry)", "tokens"));

  await writeFileIfChanged(
    path.join(publicRoot, "layout.tsx"),
    'export { default, metadata } from "../registry/public/layout";\n',
  );

  await writeFileIfChanged(
    path.join(publicRoot, "not-found.tsx"),
    'export { default } from "../registry/public/not-found";\n',
  );

  await writeFileIfChanged(
    path.join(publicRoot, "(registry)/layout.tsx"),
    'export { default } from "../../registry/public/(registry)/layout";\n',
  );

  await writeFileIfChanged(
    path.join(publicRoot, "(registry)/page.tsx"),
    'export { default } from "../../registry/public/(registry)/page";\n',
  );

  await writeFileIfChanged(
    path.join(publicRoot, "(registry)/catalog/page.tsx"),
    'export { default } from "../../../registry/public/(registry)/catalog/page";\n',
  );

  await writeFileIfChanged(
    path.join(publicRoot, "(registry)/catalog/catalog-view.tsx"),
    'export { CatalogView } from "../../../registry/public/(registry)/catalog/catalog-view";\n',
  );

  await writeFileIfChanged(
    path.join(publicRoot, "(registry)/catalog/folder/[...folder]/page.tsx"),
    'export { default } from "../../../../../registry/public/(registry)/catalog/folder/[...folder]/page";\n',
  );

  await writeFileIfChanged(
    path.join(publicRoot, "(registry)/registry/[name]/page.tsx"),
    'export { default, generateStaticParams } from "../../../../registry/public/(registry)/registry/[name]/page";\n',
  );

  await writeFileIfChanged(
    path.join(publicRoot, "(registry)/tokens/page.tsx"),
    'export { default } from "../../../registry/public/(registry)/tokens/page";\n',
  );

  await writeFileIfChanged(
    path.join(publicRoot, "_not-found/page.tsx"),
    `export default function InternalNotFoundPage() {
  return (
    <html lang="en">
      <body>
        <main style={{ padding: 24, fontFamily: "sans-serif" }}>
          <h1>404</h1>
          <p>Page not found.</p>
        </main>
      </body>
    </html>
  )
}
`,
  );

  const normalizedImport = await normalizeRegistryLayoutImport();

  console.log(
    `[registry:prepare] ready (removedLegacySymlink=${removedSymlink}, normalizedLayoutImport=${normalizedImport})`,
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
