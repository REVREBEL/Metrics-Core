# UI Package Agent Guide

Applies to `packages/ui/**`. Read the root `AGENTS.md` first.

## Responsibilities

`packages/ui` owns reusable presentation source only: primitives, Metrics components, layouts, styles, fonts, props, variants, exports, and colocated stories.

It must not own application fetching, mutations, governance workflow, warehouse access, or feature-specific orchestration.

## Classification and placement

- `src/primitives/<domain>`: shadcn-native or Radix-style product-agnostic controls.
- `src/components/metrics-core`: reusable Metrics visual patterns.
- `src/components/metrics-layouts`: reusable structural layouts.
- `src/ui-registry`: registry metadata and helpers, never canonical component source.

Do not invent a new top-level folder without an approved architectural reason and a documentation update.

## Component authoring

For each reusable component:

- preserve existing aliases and nearby naming conventions;
- keep public props typed and documented where behavior is not obvious;
- use existing primitives before creating substitutes;
- keep accessibility semantics and keyboard behavior intact;
- colocate `<name>.stories.tsx` beside `<name>.tsx`;
- add tests for interactions, formatting, state transitions, or nontrivial logic;
- update the package export surface when the component is intended for package consumers;
- decide whether it is registry-distributable and record the decision.

## shadcn-native versus Metrics-specific

A primitive must remain product-agnostic. Brand defaults may come from tokens, but the primitive may not embed hotel metrics, workflow terminology, data fetching, or app-specific state.

A Metrics component may compose primitives and encode reusable Metrics presentation. It still may not fetch or mutate feature data.

## Stories

Stories are required by default and must render the real source component. Include the states that materially apply: default, variants, loading, disabled, empty, error, destructive, responsive, and interaction behavior.

Use Controls and Autodocs when supported. Avoid one giant design-reference story as the only coverage.

## Registry

Do not move source into registry folders. A registry item points to canonical source, declares dependencies, and uses an approved install target. Registry eligibility is `yes`, `no`, or `deferred`, with a reason.

## Validation

Use the repository scripts that currently exist. At minimum inspect and report relevant lint, typecheck, tests, Storybook build/load, registry validation, and package build results.
