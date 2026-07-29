# Registry Agent Guide

Applies to `apps/registry/**`. Read root `AGENTS.md` and `packages/ui/AGENTS.md` first.

## Purpose

The registry is the distribution contract for approved components. It owns registry definitions, installable file lists, dependencies, install targets, generated registry output, and install documentation.

The registry does not own canonical component source and does not replace Storybook.

## Registry item contract

Each item must:

- reference a real canonical source file;
- have a unique stable name;
- declare the correct registry type;
- include required package and registry dependencies;
- use approved install targets;
- include all required supporting files without copying unrelated source;
- generate current valid output;
- document compatibility or required providers when relevant.

Do not place canonical source components under registry folders. Do not create generic visual previews in lieu of Storybook stories.

## Eligibility

A component is distributable only when it is reusable outside its current feature, has a stable dependency surface, does not depend on application secrets or data access, and has an approved install target.

Metrics-specific components may be marked `no` or `deferred`. They are not automatically registry items.

## Install targets

Install targets must follow the component classification and current repository conventions. Never guess a path from an old repository or a shadcn default. Verify the current registry schema and source organization first.

## Validation

Run the supported registry schema, generation, duplicate-name, source-path, dependency, and generated-output checks. Report skipped generation or install testing truthfully.
