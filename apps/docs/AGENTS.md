# Documentation Agent Guide

Applies to `apps/docs/**`. Read root `AGENTS.md` first.

## Ownership

Maintained Metrics documentation belongs under `apps/docs/src/content`.

Documentation explains the system but does not override current repository implementation, Dataform schema truth, or approved Linear intent.

## Required behavior

- Verify current paths, exports, aliases, commands, routes, and package names before documenting them.
- Verify warehouse table and column claims against current Dataform definitions.
- Distinguish implemented, planned, compatibility, deprecated, and unresolved behavior.
- Link to canonical documentation instead of copying competing definitions.
- Do not present prior AI-created documentation as independent confirmation.
- Update `internal/chatgpt/metrics-project-memory.md` only for durable context, unresolved decisions, or rules that prevent future errors.

## UI documentation

The canonical component organization guide is:

`src/content/development/ui/component-organization.mdx`

When component conventions change, update that guide together with scoped `AGENTS.md` files and relevant repository skills.

## Validation

Run supported docs lint, link, typecheck, and build checks. Report unavailable or skipped checks and avoid claiming that unverified examples compile.
