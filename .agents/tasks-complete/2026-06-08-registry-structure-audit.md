# Registry Structure Audit

## Goal
Audit the non-`apps/registry/*` workspace structure and confirm it supports the new registry layout strategy:

- keep the main barrels at the alias roots already defined in `tsconfig.json`
- avoid creating `index.ts` in every folder
- keep registry-facing code isolated from the general UI/component tree
- keep the public registry app modular and page-driven

## Context
The intended structure is:

- `packages/ui/src/primitives/*` grouped by feature area
- `packages/ui/src/components/*` grouped by feature area
- `packages/ui/src/ui-registry/*` for registry-only copies/variants
- `packages/ui/src/types/*` for shared type definitions
- `packages/ui/src/lib/*`, `hooks/*`, `utils/*`, `icons/*`, `styles/*`, `fonts/*`, `context/*`

The current `tsconfig.json` alias set is the source of truth for imports such as:

- `@forms/*`
- `@buttons/*`
- `@charts/*`
- `@data-grid/*`
- `@dropdowns/*`
- `@image-blocks/*`
- `@inputs/*`
- `@links/*`
- `@lists/*`
- `@layouts/*`
- `@menus/*`
- `@popovers/*`
- `@skeleton/*`
- `@tabs/*`
- `@tables/*`
- `@textarea/*`
- `@typography/*`
- `@studio-blocks/*`
- `@ui-core/*`
- `@ui-registry/*`
- `@shared-props/*`
- `@shared-ui/*`
- `@metrics-charts/*`
- `@metrics-errors/*`
- `@metrics-feedback/*`
- `@metrics-layouts/*`
- `@metrics-core/*`
- `@metrics-sections/*`
- `@metrics-tables/*`
- `@metrics-timeline/*`
- `@common/*`
- `@context/*`
- `@db/*`
- `@fonts/*`
- `@hooks/*`
- `@icons/*`
- `@lib/*`
- `@styles/*`
- `@types/*`
- `@utils/*`

## What to verify

1. Confirm the current folder layout under `packages/ui/src` matches the alias plan.
2. Identify any folders that are empty, stale, or only exist to support unnecessary barrel files.
3. Identify any imports that still depend on broad `index.ts` chains outside the approved alias roots.
4. Verify whether `@ui-types/registry` should be added as a new alias or whether `@types/*` should be the single source for the registry component type.
5. Check whether `packages/ui/src/types/types.ts` should be split so registry-specific types are easier to import without alias ambiguity.
6. Recommend the minimal set of structural changes needed before moving components one at a time.

## Constraints

- Do not edit files unless explicitly asked.
- Do not add new barrel files in arbitrary subfolders.
- Do not touch `apps/registry/*` unless a dependency from the shared UI tree forces it.
- Keep the scope focused on architecture and import boundaries, not visual redesign.

## Deliverable
Return a short, concrete checklist that answers:

- whether the current non-registry structure is acceptable
- which alias paths are safe to treat as the main barrels
- whether `@ui-types/registry` should exist
- what the first safe migration step should be
