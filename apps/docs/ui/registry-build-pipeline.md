# UI Registry Build Pipeline

The Metrics UI package has a composed registry build pipeline that keeps component metadata, registry manifest paths, expanded theme tokens, and shadcn registry output in sync.

## Command

Run from the monorepo root:

```bash
pnpm --filter @repo/ui run registry:build
```

## What `registry:build` does

`registry:build` is now a composed pipeline:

```txt
sync component metadata
sync/repair registry manifest paths
sync expanded registry theme tokens
run shadcn registry build
```

In package script form:

```txt
registry:sync
registry:manifest:sync
registry:tokens:sync
pnpm dlx shadcn@latest build
```

This gives the team one command that prepares the catalog metadata, repairs stale registry file paths, validates the manifest, syncs expanded CSS tokens into the registry theme, and then builds the registry output.

## Package scripts

```txt
registry:sync          -> node ./scripts/registry-sync.mjs
registry:manifest:sync -> node ./scripts/registry-manifest-sync.mjs
registry:tokens:sync   -> node ./scripts/registry-tokens-sync.mjs
registry:build         -> registry:sync + registry:manifest:sync + registry:tokens:sync + shadcn build
```

## Metadata sync

Command:

```bash
pnpm --filter @repo/ui run registry:sync
```

Script:

```txt
packages/ui/scripts/registry-sync.mjs
```

The metadata sync script:

- Scans `src/components/**/*.tsx`.
- Excludes stories, data, and internal-only directories.
- Creates or updates metadata stubs.
- Preserves existing metadata entries.
- Merges co-located sibling `metadata.ts` files when present.
- Writes the generated metadata inventory to `src/lib/registry.metadata.json`.

Key files:

```txt
packages/ui/src/lib/component-metadata.ts
packages/ui/scripts/registry-sync.mjs
packages/ui/src/lib/registry.metadata.json
```

Initial status:

```txt
registry:sync generated 146 metadata stubs.
```

## Manifest sync

Command:

```bash
pnpm --filter @repo/ui run registry:manifest:sync
```

Script:

```txt
packages/ui/scripts/registry-manifest-sync.mjs
```

The manifest sync script:

- Normalizes stale paths in `registry.json` to the current repo structure.
- Repairs known moved component paths before build.
- Validates that every `items[].files[].path` exists.
- Fails with an unresolved path report if any file paths still cannot be found.

This is what prevents registry build failures caused by stale references like:

```txt
src/components/brand-header.tsx
```

when the actual file now lives somewhere like:

```txt
src/primitives/layouts/brand-header.tsx
```

## Token sync

Command:

```bash
pnpm --filter @repo/ui run registry:tokens:sync
```

Script:

```txt
packages/ui/scripts/registry-tokens-sync.mjs
```

The token sync script expands the registry theme by reading CSS custom properties from the UI token source files and merging them into `registry.json` under the theme `cssVars`.

This makes the published registry more useful to agents and downstream consumers because it includes the broader Metrics token system, not just the minimal shadcn theme variables.

Expanded token sync covers token families such as:

- Brand color scales
- Chart colors
- Semantic source tokens
- Channel, social, review, segment, and lookup-aware colors
- Component-facing token aliases

Verification output from the first successful run:

```txt
registry:tokens:sync merged 566 vars from CSS, added 533 to light and 533 to dark.
```

### Token naming rule

Use canonical token names in expanded registry output. Do not add the broken misspelled light-green token as a fallback. The canonical token is:

```txt
--color-light-green
```

Do not use this misspelled token for new registry output:

```txt
--color-lght-green
```

## Catalog population

Visual catalog route:

```txt
/catalog
```

Hosted at:

```txt
https://metrics-ui.revrebel.io/catalog
```

Data sources:

```txt
component render entries -> PLAYGROUND_REGISTRY
props/description metadata -> registry.metadata.json
co-located metadata.ts -> merged by registry:sync
expanded theme variables -> registry:tokens:sync
```

`catalog/page.tsx` reads from `registry.metadata.json` when inline registry metadata is missing.

## Authoring metadata

Metadata files are optional. Add a co-located `metadata.ts` next to a component when the component needs richer catalog documentation or AI-readable guidance.

Shape:

```txt
displayName
description
props[]
  name
  type
  required
  defaultValue
  description
```

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

## Parser compatibility

`registry:sync` parses `metadata.ts` with a safe text parser rather than executing TypeScript.

Keep the metadata format as a simple object literal. Avoid computed values, function calls, dynamic spreads, or imported constants for prop arrays.

## Recommended team workflow

1. Add or update components under `packages/ui/src/components`.
2. Add sibling `metadata.ts` files for high-priority components.
3. Run:

   ```bash
   pnpm --filter @repo/ui run registry:build
   ```

4. Fix any unresolved manifest path report.
5. Review `src/lib/registry.metadata.json` for generated or merged metadata.
6. Review `registry.json` when source token files change.
7. Open `https://metrics-ui.revrebel.io/catalog` and confirm the catalog display.

## Release note

Registry build pipeline updated. `registry:build` now syncs component metadata, syncs and repairs registry manifest paths, syncs expanded CSS token variables into the registry theme, validates registry file references, and then runs the shadcn registry build. Team command: `pnpm --filter @repo/ui run registry:build`.
