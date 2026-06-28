# UI Registry Metadata Sync

The Metrics UI package includes a registry metadata sync workflow that keeps the component catalog aligned with the source tree.

This doc focuses on metadata. For the full composed registry build pipeline, see:

```txt
docs/ui/registry-build-pipeline.md
```

## Purpose

The sync workflow gives the UI catalog a reliable metadata source for component descriptions, prop notes, and AI-readable component guidance.

This is useful because not every registry item has complete inline metadata in `registry.json`. The catalog can now fall back to generated component metadata when inline registry metadata is missing.

## Key files

```txt
packages/ui/src/lib/component-metadata.ts
packages/ui/scripts/registry-sync.mjs
packages/ui/src/lib/registry.metadata.json
```

### `component-metadata.ts`

Defines the metadata contract used by the catalog and sync script.

Typical metadata includes:

- Component display name
- Description
- Prop names
- Prop types
- Required/optional state
- Default value
- Prop descriptions

### `registry-sync.mjs`

Scans component files and updates the generated metadata JSON.

The script scans:

```txt
packages/ui/src/components/**/*.tsx
```

It ignores stories, data, and internal-only directories.

### `registry.metadata.json`

Generated metadata file used by the catalog.

This file is auto-updated by the sync script. Existing entries are preserved where present, so richer descriptions and prop documentation are not wiped out on future runs.

## NPM script

Run from the monorepo root:

```bash
pnpm --filter @repo/ui run registry:sync
```

## What `registry:sync` does

The sync script:

1. Scans `packages/ui/src/components/**/*.tsx`.
2. Skips stories, data, and internal folders.
3. Creates metadata stubs for discovered components.
4. Preserves existing metadata entries where present.
5. Merges sibling `metadata.ts` files when they exist.
6. Writes the result to `src/lib/registry.metadata.json`.

The initial run generated:

```txt
146 metadata stubs
```

## Catalog integration

`catalog/page.tsx` now reads metadata from:

```txt
packages/ui/src/lib/registry.metadata.json
```

The catalog uses that generated metadata whenever inline registry metadata is missing.

Catalog population uses:

```txt
component render entries -> REGISTRY_ITEMSISTRY
props/description metadata -> registry.metadata.json
co-located metadata.ts -> merged by registry:sync
```

Catalog URL:

```txt
https://metrics-ui.revrebel.io/catalog
```

## Recommended metadata pattern

For components that need richer documentation, add a sibling `metadata.ts` file next to the component.

Example:

```ts
import type { ComponentMetadata } from "@/lib/component-metadata"

export const metadata: ComponentMetadata = {
  displayName: "MyComponent",
  description: "What this component does",
  props: [
    {
      name: "className",
      type: "string",
      required: false,
      defaultValue: undefined,
      description: "Optional class override",
    },
  ],
}
```

Then run:

```bash
pnpm --filter @repo/ui run registry:sync
```

The sync script merges the local `metadata.ts` into the generated metadata JSON.

## Parser limitation

`registry:sync` currently uses a safe text parser instead of executing TypeScript.

Keep `metadata.ts` files as simple object literals. Avoid:

- Computed values
- Function calls
- Runtime logic
- Imported constants for prop arrays
- Dynamic metadata generation

## Recommended workflow

1. Add or update a component under `packages/ui/src/components`.
2. Add a sibling `metadata.ts` when the component needs richer documentation.
3. Run:

   ```bash
   pnpm --filter @repo/ui run registry:sync
   ```

4. Review `src/lib/registry.metadata.json`.
5. Fill descriptions and props for priority components first.
6. Open the catalog and confirm the component card displays correctly.

## Build pipeline relationship

For normal team usage, prefer the full registry build command:

```bash
pnpm --filter @repo/ui run registry:build
```

That command runs metadata sync, manifest sync/repair, and the shadcn registry build in sequence.
