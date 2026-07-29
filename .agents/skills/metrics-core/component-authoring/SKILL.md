---
name: metrics-component-authoring
description: >-
  Build or modify a reusable Metrics-Core UI component with correct placement,
  exports, Storybook coverage, registry decision, tests, docs, and validation.
---

# Metrics Component Authoring

Read root `AGENTS.md`, `packages/ui/AGENTS.md`, and the component-classification skill.

## Workflow

1. Classify the component and inspect nearby components.
2. Verify aliases, package exports, styles, and current Storybook conventions.
3. Implement the smallest reusable public API using existing primitives.
4. Keep fetching, mutations, permissions, and feature workflow outside `packages/ui`.
5. Add a colocated real Storybook story by default.
6. Add tests for meaningful behavior, accessibility, formatting, or interactions.
7. Update the approved export surface when required.
8. Decide registry eligibility and add an item only when distributable.
9. Update documentation when public usage or organization changes.
10. Run supported validation and report skipped checks truthfully.

## Expected report

```text
Classification:
Source path:
Story path:
Registry item:
Exports updated:
Tests:
Docs:
Validation:
Known limitations:
```

## Stop conditions

Stop when classification is unresolved, the requested path conflicts with repository organization, Storybook would require fake previews, or a registry target cannot be verified.
