# UI Import Alias Structure

The Metrics UI package uses import aliases to keep component code portable, registry-friendly, and easier for agents to reason about.

## Primary rule

Avoid deep relative imports and avoid `@/components/...` inside migrated component folders when a named alias exists.

Preferred pattern:

```ts
import { Button } from "@buttons/button"
import { cn } from "@lib/utils"
import { useIsMobile } from "@hooks/use-mobile"
import { ExampleBlock } from "@studio-blocks"
```

Avoid:

```ts
import { Button } from "../../../primitives/buttons/button"
import { SomeBlock } from "@/components/shadcn-studio/blocks/some-block"
```

## Alias intent map

```txt
@ui/*
  shadcn/ui primitive wrappers and low-level UI primitives.

@buttons/*
  Button primitives and button-related variants.

@inputs/*
  Input primitives and form input helpers.

@layouts/*
  Primitive layout components. This should point to primitives, not Metrics-specific layout compositions.

@hooks/*
  Shared hooks from packages/ui/src/hooks.

@lib/*
  Shared utilities and package-level library helpers.

@shared-ui/*
  Small reusable shared UI pieces used across multiple component groups.
  Examples: controls, empty states, badges, shells, wrappers, helper UI.

@shared-props/*
  Shared prop contracts and type helpers.

@metrics/*
  General metric components.

@metrics-core/*
  Reusable metric primitives and metric-specific building blocks.

@metrics-layouts/*
  Full Metrics-specific dashboard/layout compositions.

@metrics-sections/*
  Metrics section-level compositions.

@metrics-charts/*
  Metrics chart components and chart compositions.

@metrics-tables/*
  Metrics table components and table compositions.

@studio-blocks
  Unstyled or externally sourced studio blocks exposed from primitives/studio-blocks.
  These live outside Metrics component groups because they are not first-class Metrics-styled components yet.
```

## Studio block rule

Do not map `@/components/shadcn-studio/blocks/*` to `@shared-ui` by default.

Studio blocks should live under:

```txt
packages/ui/src/primitives/studio-blocks/
```

and should be exported through:

```txt
packages/ui/src/primitives/studio-blocks/index.ts
```

Use the barrel import:

```ts
import { ExampleBlock } from "@studio-blocks"
```

instead of:

```ts
import { ExampleBlock } from "@shared-ui/example-block"
```

or:

```ts
import { ExampleBlock } from "@/components/shadcn-studio/blocks/example-block"
```

The reason: `@shared-ui` should stay reserved for small reusable shared UI helpers. Studio blocks are unstyled or externally sourced block-level patterns, so keeping them under `src/primitives/studio-blocks` makes it clear they sit outside the Metrics-styled component system until intentionally refactored.

## When to move a studio block

A studio block can move out of `primitives/studio-blocks` when it has been intentionally refactored into a first-class Metrics component.

Use this decision path:

```txt
Still an unstyled or externally sourced block-level pattern?
  -> keep under @studio-blocks / src/primitives/studio-blocks

Small reusable helper used across many components?
  -> move to @shared-ui

Reusable metric primitive or metric-specific building block?
  -> move to @metrics-core

Full Metrics dashboard/layout composition?
  -> move to @metrics-layouts
```

## Recommended tsconfig alias shape

```json
{
  "@ui/*": ["./src/primitives/ui/*"],
  "@buttons/*": ["./src/primitives/buttons/*"],
  "@inputs/*": ["./src/primitives/inputs/*"],
  "@layouts/*": ["./src/primitives/layouts/*"],
  "@hooks/*": ["./src/hooks/*"],
  "@lib/*": ["./src/lib/*"],
  "@shared-ui/*": ["./src/components/_shared-ui/*"],
  "@shared-props/*": ["./src/components/_shared-props/*"],
  "@metrics/*": ["./src/components/metrics/*"],
  "@metrics-core/*": ["./src/components/metrics-core/*"],
  "@metrics-layouts/*": ["./src/components/metrics-layouts/*"],
  "@metrics-sections/*": ["./src/components/metrics-sections/*"],
  "@metrics-charts/*": ["./src/components/metrics-charts/*"],
  "@metrics-tables/*": ["./src/components/metrics-tables/*"],
  "@studio-blocks": ["./src/primitives/studio-blocks/index.ts"]
}
```

If deep imports are later required for tree-shaking or migration support, add a separate wildcard alias intentionally:

```json
{
  "@studio-blocks/*": ["./src/primitives/studio-blocks/*"]
}
```

Do not add the wildcard alias unless the team decides deep studio-block imports are acceptable. The preferred path is the single barrel import from `@studio-blocks`.

## Migration validation

After import migration work, run:

```bash
pnpm exec tsc --noEmit -p packages/ui/tsconfig.json
pnpm --filter @repo/ui run barrels:check
pnpm --filter @repo/ui run registry:build
```

These checks catch type errors, barrel export drift, manifest path issues, expanded token sync issues, and registry build failures.
