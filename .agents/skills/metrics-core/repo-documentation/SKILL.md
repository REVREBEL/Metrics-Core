---
name: metrics-repo-documentation
description: >-
  Create or update maintained Metrics-Core documentation while reconciling
  Linear intent, repository implementation, Dataform truth, and durable memory.
---

# Metrics Repository Documentation

Read root `AGENTS.md` and `apps/docs/AGENTS.md`.

## Workflow

1. Identify the canonical documentation page for the topic.
2. Verify current implementation paths, exports, routes, commands, and aliases.
3. For warehouse claims, inspect current Dataform definitions and dependencies.
4. Reconcile Linear intent, application implementation, Dataform truth, and existing docs.
5. Label behavior as implemented, planned, compatibility, deprecated, or unresolved.
6. Update documentation under `apps/docs/src/content`.
7. Update project memory only for durable context or unresolved decisions that prevent future errors.
8. Run supported docs validation and report skipped checks.

## Required language for differences

Use explicit phrases such as `Linear defines…`, `Dataform currently implements…`, `The application currently assumes…`, `The documentation currently describes…`, and `A decision is still required…`.

## Stop conditions

Do not treat old docs, fixtures, registry metadata, or prior AI output as independent confirmation of current implementation.
