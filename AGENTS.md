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

## UI component classification

Classify a component before creating files.

| Classification | Source root | Use for |
| --- | --- | --- |
| shadcn-native primitive | `packages/ui/src/primitives/<domain>` | Product-agnostic low-level controls following shadcn/Radix conventions |
| Metrics component | `packages/ui/src/components/metrics-core` | Reusable Metrics visual patterns |
| Metrics layout | `packages/ui/src/components/metrics-layouts` | Reusable structural composition without feature data logic |
| App feature component | `apps/app/features/<feature>` | Fetching, mutations, workflow state, and feature business rules |
| Registry metadata/helper | `packages/ui/src/ui-registry` or `apps/registry` | Distribution metadata, install targets, and registry generation |

Do not put Metrics workflow or data-access logic in `packages/ui`. Do not move source components into registry folders.

## Component delivery contract

A new reusable component is incomplete until it has:

1. An explicit classification.
2. Correct source placement.
3. An approved package export when required.
4. A colocated `*.stories.tsx` story by default.
5. Representative states and Storybook Controls.
6. A documented registry eligibility decision.
7. Tests when behavior, transformation, accessibility, or interaction warrants them.
8. Documentation updates when conventions or public usage change.
9. Repository-supported validation.

A request may explicitly exclude Storybook or registry work. Silence does not exclude Storybook.

## Storybook and registry

- Storybook documents and visually validates real source components.
- The registry distributes approved source components.
- Never create a generic fake preview instead of a real story.
- Not every Metrics component is distributable. Record `registry item: yes`, `no`, or `deferred` with a reason.
- Registry item paths and install targets must reference approved source roots.

## Aliases and configuration

The root `tsconfig.json` is the source of truth for TypeScript aliases. Preserve existing aliases such as `@buttons/*`, `@charts/*`, `@inputs/*`, `@layouts/*`, `@metrics-core/*`, `@metrics-layouts/*`, `@styles/*`, and `@/*` when present.

Do not duplicate aliases in Next.js, Storybook, Vite, or test configuration unless the tool cannot consume `tsconfig.json` and the runtime reason is documented. Do not rewrite component imports merely to make Storybook work.

## Documentation

All maintained Metrics documentation belongs under `apps/docs/src/content`. The master UI organization guide is:

`apps/docs/src/content/development/ui/component-organization.mdx`

Update `metrics-project-memory.md` only for durable rules, unresolved decisions, or context that prevents future mistakes.

## Validation and reporting

Inspect package scripts and run the closest supported checks for the changed area, including lint, typecheck, tests, Storybook, registry generation/validation, and build where available.

Never report a check as passing unless it was actually run. Report skipped or unavailable checks and the reason.

## Pull request report

Every UI component PR should state:

```text
Classification:
Source path:
Story path:
Registry item:
Exports updated:
Tests added or updated:
Documentation updated:
Validation run:
Known limitations:
```
