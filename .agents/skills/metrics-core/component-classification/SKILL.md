---
name: metrics-component-classification
description: >-
  Classify a proposed Metrics-Core UI component before implementation. Use when
  deciding whether work belongs in shadcn-native primitives, Metrics components,
  Metrics layouts, app features, or registry metadata.
---

# Metrics Component Classification

Read root `AGENTS.md` and the nearest scoped guidance.

## Decision

1. Product-agnostic low-level shadcn/Radix control: `packages/ui/src/primitives/<domain>`.
2. Reusable Metrics visual pattern without data access: `packages/ui/src/components/metrics-core`.
3. Reusable structural composition without feature orchestration: `packages/ui/src/components/metrics-layouts`.
4. Fetching, mutations, workflow state, permissions, or feature rules: `apps/app/features/<feature>`.
5. Distribution metadata or generation: `packages/ui/src/ui-registry` or `apps/registry`.

## Output

Record:

```text
Classification:
Source root:
Why:
Story required: yes/no with reason
Registry eligibility: yes/no/deferred with reason
Expected exports:
Expected validation:
```

## Stop conditions

Stop before coding when the component mixes reusable presentation with feature data logic, requires a new top-level UI folder, or has ambiguous registry ownership. Resolve the boundary first.
