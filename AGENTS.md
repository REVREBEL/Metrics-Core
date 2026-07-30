# Metrics-Core Agent Guide

This repository is `REVREBEL/Metrics-Core`. Do not implement Metrics-Core work in the older `REVREBEL/Metrics` repository.

## Required context

Before making changes:

1. Read `apps/docs/src/content/internal/chatgpt/metrics-project-memory.md`.
2. Read the nearest scoped `AGENTS.md` for every subtree you will modify.
3. Read the relevant repository skill under `.agents/skills/metrics-core/`.
4. Verify the current branch, package scripts, aliases, and implementation before assuming a path or command still exists.
5. For data architecture work, verify Dataform definitions before describing a warehouse object as implemented.

## Source ownership

- Linear defines product intent, approved terminology, and work sequencing.
- Repository code defines current application implementation.
- Dataform defines warehouse schema, mapping, lookup, and dependency truth.
- Documentation explains the system but does not override implementation or Dataform.

State differences explicitly: `Linear defines…`, `Dataform currently implements…`, `The application currently assumes…`, `The documentation currently describes…`, or `A decision is still required…`.

## Monorepo map

Use the existing ownership boundaries. Do not create a default single-app shadcn structure inside an app.

| Area | Owns |
| --- | --- |
| `apps/app` | Next.js routes, layouts, feature composition, server actions, permissions, and application workflow |
| `apps/app/features/<feature>` | Feature-specific UI, fetching, mutations, validation, and orchestration |
| `apps/docs/src/content` | Maintained Metrics documentation |
| `apps/storybook` | Visual documentation and isolated validation of canonical components |
| `apps/registry` | shadcn registry metadata, generated distribution output, and install behavior |
| `packages/ui/src/primitives/<domain>` | Product-agnostic shadcn/Radix-style primitives |
| `packages/ui/src/components/<domain>` | Reusable Metrics presentation components |
| `packages/ui/src/icons` | Repository-owned icon components and icon assets |
| `packages/ui/src/styles` | Shared styles and design tokens |
| `packages/data` | Data clients, adapters, validation, query contracts, and analytical runtimes |
| `packages/db` | Application database schema, repositories, migrations, and persistence contracts |

Do not add `components/ui`, `app/components/ui`, or another shadcn-default component tree. Canonical shared UI belongs in `packages/ui`.

## UI component classification

Classify a component before creating files.

| Classification | Source root | Use for |
| --- | --- | --- |
| shadcn-native primitive | `packages/ui/src/primitives/<domain>` | Product-agnostic low-level controls following shadcn/Radix conventions |
| Metrics component | `packages/ui/src/components/metrics-core` or the existing Metrics component domain | Reusable Metrics visual patterns |
| Metrics layout | `packages/ui/src/components/metrics-layouts` | Reusable structural composition without feature data logic |
| App feature component | `apps/app/features/<feature>` | Fetching, mutations, workflow state, and feature business rules |
| Registry metadata/helper | `packages/ui/src/ui-registry` or `apps/registry` | Distribution metadata, install targets, and registry generation |

Do not put Metrics workflow or data-access logic in `packages/ui`. Do not move source components into registry folders.

## Mandatory import-resolution protocol

The root `tsconfig.json` is the source of truth for aliases. Never guess an alias from a component name and never fall back to the default shadcn path.

Before adding or changing an import:

1. Locate the canonical file in the repository.
2. Confirm the physical source root.
3. Read the matching alias in the root `tsconfig.json`.
4. Import through that exact alias.
5. If no alias exists, use the nearest valid existing package export or document why a new alias is required.
6. Do not create a duplicate wrapper or duplicate component just to satisfy an incorrect import.

### Required primitive aliases

Use the domain alias that matches the physical folder.

| Need | Canonical source | Correct import pattern |
| --- | --- | --- |
| Button | `packages/ui/src/primitives/buttons` | `@buttons/button` |
| Input | `packages/ui/src/primitives/inputs` | `@inputs/input` |
| Form | `packages/ui/src/primitives/forms` | `@forms/...` |
| Chart primitive | `packages/ui/src/primitives/charts` | `@charts/...` |
| Data grid | `packages/ui/src/primitives/data-grid` | `@data-grid/...` |
| Dropdown | `packages/ui/src/primitives/dropdowns` | `@dropdowns/...` |
| Layout primitive | `packages/ui/src/primitives/layouts` | `@layouts/...` |
| Menu | `packages/ui/src/primitives/menus` | `@menus/...` |
| Popover or overlay | `packages/ui/src/primitives/popovers` | `@popovers/...` |
| Table primitive | `packages/ui/src/primitives/tables` | `@tables/...` |
| Tabs | `packages/ui/src/primitives/tabs` | `@tabs/...` |
| Typography | `packages/ui/src/primitives/typography` | `@typography` or `@typography/...` |
| Metrics component | `packages/ui/src/components/metrics-core` | `@metrics-core/...` |
| Metrics layout | `packages/ui/src/components/metrics-layouts` | `@metrics-layouts/...` |
| Repository icon | `packages/ui/src/icons` | `@icons/...` |
| Shared styles | `packages/ui/src/styles` | `@styles/...` |
| Data package | `packages/data/src` | `@repo/data` or `@repo/data/...` |
| Database package | `packages/db/src` | `@repo/db` or `@repo/db/...` |

### `@ui-core` is not a generic UI alias

`@ui-core/*` maps only to files physically located under:

```text
packages/ui/src/primitives/ui-core/*
```

Do not write:

```ts
import { Button } from "@ui-core/button";
import { Input } from "@ui-core/input";
```

unless those exact canonical files exist inside `primitives/ui-core`.

Use:

```ts
import { Button } from "@buttons/button";
import { Input } from "@inputs/input";
```

### Forbidden default shadcn imports

Do not use or generate these patterns:

```ts
import { Button } from "@/components/ui/button";
import { Input } from "./components/ui/input";
import { Dialog } from "../components/ui/dialog";
```

They describe a default single-app shadcn installation, not this monorepo.

The broad `@/*` alias points into `packages/ui/src/*`. It does not make `@/components/ui/*` valid unless that physical path actually exists, and agents must not create that path as a workaround.

## Icon resolution

Before importing or creating an icon:

1. Search `packages/ui/src/icons` for the existing repository icon.
2. Use `@icons/<file>` when a repository-owned icon exists.
3. Check the current component and nearby components for the established third-party icon package when no local icon exists.
4. Reuse the established icon source and naming convention.
5. Do not create a second icon component, copy SVG markup into a feature, or invent `components/ui/icons`.
6. Do not import an icon through `@ui-core/*` unless the icon is physically implemented there.

When adding a new repository-owned icon, place it under `packages/ui/src/icons`, export it through the current icon export surface where required, and use `@icons/*`.

## Alias and tool configuration

Do not duplicate the root alias map in Next.js, Storybook, Vite, or test configuration unless the tool cannot consume `tsconfig.json` and the runtime reason is documented.

Do not rewrite correct component imports merely to make Storybook or a test runner work. Fix the tool’s alias resolution instead.

Any new alias requires:

- a verified need;
- a canonical source folder;
- root `tsconfig.json` configuration;
- affected runtime configuration only where necessary;
- documentation updates;
- validation in the consuming app and Storybook or registry when relevant.

## Component delivery contract

A new reusable component is incomplete until it has:

1. An explicit classification.
2. Correct source placement.
3. Correct aliases based on physical source paths.
4. An approved package export when required.
5. A colocated `*.stories.tsx` story by default.
6. Representative states and Storybook Controls.
7. A documented registry eligibility decision.
8. Tests when behavior, transformation, accessibility, or interaction warrants them.
9. Documentation updates when conventions or public usage change.
10. Repository-supported validation.

A request may explicitly exclude Storybook or registry work. Silence does not exclude Storybook.

## Storybook and registry

- Storybook documents and visually validates real source components.
- The registry distributes approved source components.
- Never create a generic fake preview instead of a real story.
- Not every Metrics component is distributable. Record `registry item: yes`, `no`, or `deferred` with a reason.
- Registry item paths and install targets must reference approved source roots.
- Registry generation must not rewrite canonical imports to `@/components/ui/*` or another nonexistent destination without an explicit install transformation.

## Documentation

All maintained Metrics documentation belongs under `apps/docs/src/content`.

The master UI organization guide is:

```text
apps/docs/src/content/development/ui/component-organization.mdx
```

Use the docs library to explain durable architecture and usage. Do not place maintained product documentation in `.agents`, issue comments, or generated registry output.

Update `metrics-project-memory.md` only for durable rules, unresolved decisions, or context that prevents future mistakes.

## Validation and reporting

Inspect package scripts and run the closest supported checks for the changed area, including lint, typecheck, tests, Storybook, registry generation or validation, and build where available.

For component work, explicitly verify:

- every imported alias exists in root `tsconfig.json`;
- every aliased file resolves to the intended physical source;
- no new `components/ui` tree was created;
- no primitive was imported through `@ui-core/*` unless it lives in `primitives/ui-core`;
- icons resolve from `@icons/*` or the established third-party package;
- package exports, Storybook, app builds, and registry generation resolve the same imports.

Never report a check as passing unless it was actually run. Report skipped or unavailable checks and the reason.

## Pull request report

Every UI component PR should state:

```text
Classification:
Source path:
Aliases used and verified:
Icon source:
Story path:
Registry item:
Exports updated:
Tests added or updated:
Documentation updated:
Validation run:
Known limitations:
```
