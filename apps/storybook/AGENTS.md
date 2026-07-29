# Storybook Agent Guide

Applies to `apps/storybook/**`. Read root `AGENTS.md` and `packages/ui/AGENTS.md` first.

## Purpose

Storybook is the visual development and documentation surface for real repository components. It does not replace the shadcn registry.

## Rules

- Discover colocated stories from canonical source packages.
- Render the real component, not a generic substitute or registry preview.
- Preserve root TypeScript aliases and resolve them through the root `tsconfig.json` where supported.
- Import shared styling through the approved entry point, currently `@styles/globals.css` when available.
- Do not rewrite component imports to make Storybook compile.
- Do not duplicate theme tokens already provided by shared styles.

## Story contract

A reusable component story should include:

- a typed `Meta` definition and Autodocs tag when supported;
- a useful default or playground story with Controls;
- materially relevant variants and states;
- loading, disabled, empty, error, destructive, and responsive states when applicable;
- interaction tests for meaningful behavior when the current Storybook setup supports them;
- accessibility-conscious labels and examples.

Colocate stories beside source components unless a verified repository convention requires otherwise.

## Stop conditions

Pause and document the issue rather than adding duplicate aliases or fake previews when:

- the root aliases do not resolve;
- shared styles cannot be loaded through the existing setup;
- a component depends on application-only providers with no approved Storybook fixture;
- current Storybook tooling does not support a requested test or addon.

## Validation

Run the supported Storybook dev/build checks and report any stories or addons that could not be validated.
