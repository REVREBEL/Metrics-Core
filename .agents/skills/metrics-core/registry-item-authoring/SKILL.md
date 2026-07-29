---
name: metrics-registry-item-authoring
description: >-
  Add or modify a Metrics-Core shadcn registry item, including source files,
  dependencies, install targets, generated output, and registry validation.
---

# Metrics Registry Item Authoring

Read root `AGENTS.md`, `packages/ui/AGENTS.md`, and `apps/registry/AGENTS.md`.

## Workflow

1. Confirm the component is intentionally distributable.
2. Verify canonical source and colocated Storybook coverage.
3. Inspect the current registry schema and nearby items.
4. Add a unique stable item name and correct registry type.
5. Reference real source files and approved install targets.
6. Declare package and registry dependencies completely.
7. Generate or refresh registry output using current scripts.
8. Validate schema, duplicate names, paths, targets, dependencies, and generated output.
9. Document providers, styles, aliases, or compatibility requirements.

## Rules

Canonical source remains outside registry folders. The registry distributes source; Storybook documents it. Do not create fake previews or guess install paths from another repository.

## Stop conditions

Stop when source ownership, install target, dependency closure, or distribution eligibility cannot be verified.
