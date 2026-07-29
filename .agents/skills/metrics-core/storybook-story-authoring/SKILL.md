---
name: metrics-storybook-story-authoring
description: >-
  Add or repair Storybook stories for Metrics-Core source components. Use for
  colocated stories, Controls, Autodocs, component states, interactions,
  responsive examples, and visual documentation.
---

# Metrics Storybook Story Authoring

Read root `AGENTS.md`, `packages/ui/AGENTS.md`, and `apps/storybook/AGENTS.md`.

## Requirements

- Colocate `<component>.stories.tsx` beside canonical source.
- Import and render the real component.
- Use current Storybook framework types and repository aliases.
- Include a useful default/playground with Controls.
- Add materially relevant variants and states.
- Use Autodocs, interaction tests, responsive examples, and accessibility checks when supported.
- Load shared styles through the approved alias and do not duplicate tokens.

## State checklist

Consider default, variants, loading, disabled, empty, error, destructive, selected, overflow, responsive, and keyboard behavior. Include only states that exist or are deliberately supported.

## Stop conditions

Do not create a generic substitute, rewrite production imports solely for Storybook, duplicate aliases without a documented reason, or claim interaction/accessibility checks were run when tooling was unavailable.
