---
name: metrics-ui-validation
description: >-
  Validate Metrics-Core UI changes across lint, typecheck, tests, Storybook,
  registry generation, package exports, and builds, with truthful reporting.
---

# Metrics UI Validation

Read root and scoped `AGENTS.md` files, then inspect the current package scripts before choosing commands.

## Validation matrix

For changed UI work, check the supported equivalents of:

- formatting and lint;
- TypeScript typecheck;
- unit and interaction tests;
- package export resolution;
- Storybook story discovery and build;
- registry schema and generation;
- application or package build;
- changed-file and generated-output cleanliness.

Also verify:

- stories reference real components;
- registry items reference real files;
- registry item names are unique;
- install targets use approved roots;
- no undocumented top-level UI source folder was introduced;
- aliases were not duplicated unnecessarily.

## Reporting

Report each command and result. Mark checks as `passed`, `failed`, or `not run`, with the reason. Never convert an unavailable command into a claimed success.

## Stop conditions

Do not merge or declare completion when a required validation fails, generated output is stale, or a new component lacks its required story without an explicit approved exception.
