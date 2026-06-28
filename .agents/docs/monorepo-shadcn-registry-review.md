# Monorepo + shadcn Registry Review

## Purpose

This document compares:

1. what this workspace is doing today,
2. what the local `next-monorepo` example and current shadcn guidance suggest,
3. which direction is better for this repo given these four application surfaces:
   - Metrics application
   - Admin application
   - Docs application
   - Registry application

## Sources Reviewed

### Local repo references

- `.agents/examples/next-monorepo`
- `.agents/skills/shadcn/SKILL.md`
- `.agents/skills/shadcn-ui/SKILL.md`
- current workspace config in:
  - `package.json`
  - `tsconfig.json`
  - `components.json`
  - `packages/ui/package.json`
  - `apps/app`
  - `apps/admin`
  - `apps/docs`
  - `apps/registry`

### Official shadcn references

- `https://ui.shadcn.com/docs/monorepo`
- `https://ui.shadcn.com/docs/components-json`
- `https://ui.shadcn.com/docs/registry`
- `https://ui.shadcn.com/docs/registry/registry-json`

## Executive Summary

The current repo has drifted away from the shadcn monorepo model in three important ways:

1. **the workspace alias system is global and highly custom**, instead of using a small set of stable package import surfaces,
2. **`components.json` is not acting as a clean per-workspace CLI contract**, and
3. **the registry website is using generated runtime manifests as its real source of truth while `registry.json` is treated more like a publish artifact**.

The **official monorepo model is better as the baseline**.

For this repo, the best setup is **not** a pure copy of the example, but a **hybrid close to the official model**:

- one shared UI package as the install target and export surface,
- app-local `components.json` files only where the CLI is expected to write local code,
- explicit package exports for shared code,
- app-local aliases only for app-local code,
- one explicit registry manifest source of truth,
- one registry website that consumes the shared package and the published manifest cleanly.

## What the Official Resources Suggest

## 1. `components.json` is workspace-specific CLI configuration

The official docs define `components.json` as project configuration used by the CLI to understand how the project is set up and where files should go.

That means:

- it is **optional at runtime**,
- it is **required for CLI-driven installs**,
- it should be **valid JSON**,
- it should exist **per workspace** where the CLI needs installation context.

In monorepos, the official guidance expects:

- an app workspace `components.json`,
- a shared UI workspace `components.json`,
- matching `style`, `iconLibrary`, and `baseColor`,
- aliases that tell the CLI where local app files go and where shared UI files live.

## 2. Shared UI should be exposed through stable package imports

The official monorepo example uses a shared package like:

- `@workspace/ui/components/*`
- `@workspace/ui/lib/*`
- `@workspace/ui/hooks/*`

The point is not the exact name. The point is the **shape**:

- shared code comes from the shared package,
- app-local code stays local,
- cross-workspace consumption goes through explicit package exports.

## 3. The registry should have an explicit `registry.json`

The official registry docs treat `registry.json` as the schema for the custom registry itself.

That manifest is meant to define:

- registry metadata,
- items,
- files,
- dependencies,
- registry dependencies,
- optional composition through `include`.

That is a stronger contract than “generated TS the site happens to use”.

## What We Have Today

## 1. Global alias sprawl

The root `tsconfig.json` is carrying a large cross-workspace alias matrix:

- primitives
- metrics components
- lib
- hooks
- icons
- registry UI
- staging areas

This has made the workspace convenient for ad hoc imports, but it creates side effects:

- apps inherit internal package structure instead of consuming stable exports,
- registry builds depend on local alias recreation,
- changes in `packages/ui` internals leak across all apps,
- “barrel-only” rules become easy to violate accidentally.

## 2. `components.json` is not a reliable contract today

The root `components.json` is currently not in the official expected shape:

- it contains two JSON objects concatenated into one file,
- it is at repo root instead of clearly representing one workspace,
- its aliases point at internal repo concepts like `@staging_new-files`, `@layouts`, and `@metrics-components`.

That is not a clean shadcn CLI contract.

Practically, it means the file is not a trustworthy source of installation behavior.

## 3. The registry app is not centered on one explicit manifest source

Today the registry app runtime is primarily reading generated internal files such as:

- `packages/ui/src/lib/registry.ts`
- `packages/ui/src/lib/registry.tokens.json`
- `packages/ui/src/lib/registry-folders.json`

Meanwhile:

- the site still presents `/r/registry.json` as the registry contract,
- sync scripts are written around `registry.json`,
- but the current workspace does not expose a straightforward live `apps/registry/registry.json` source file.

That split is the main architectural drift.

## 4. App surfaces are inconsistent

Current state by app:

- **Metrics app**: mostly standalone app, not clearly modeled as a shadcn install workspace.
- **Admin app**: consumes `@repo/ui`, but is not aligned with the monorepo CLI pattern and currently ignores TypeScript build errors.
- **Docs app**: separate content site, likely a consumer rather than a primary shadcn install target.
- **Registry app**: both a consumer of `@repo/ui` and the home of registry build scripts, which mixes publishing concerns with runtime site concerns.

## Direct Comparison

| Area | Current repo | Official / example direction | Better choice |
| --- | --- | --- | --- |
| Shared UI access | deep aliases into `packages/ui/src/...` | explicit package import surfaces | official direction |
| `components.json` ownership | root-level, malformed, mixed purpose | valid per-workspace files | official direction |
| CLI install routing | custom alias-driven | workspace-aware via `components.json` | official direction |
| Registry manifest | split between scripts and generated TS | explicit `registry.json` contract | official direction |
| Runtime data for registry site | generated local manifests | can consume generated data, but should trace back to explicit registry source | hybrid |
| App isolation | blurred | local app code local, shared code exported | official direction |
| Multi-app practicality | ad hoc | requires intentional workspace roles | hybrid official |

## Which Approach Is Better?

## Best baseline: official monorepo model

The official shadcn monorepo model is better because it gives:

- a clear CLI contract,
- predictable install destinations,
- fewer hidden import rules,
- easier onboarding,
- lower risk of build breaks caused by internal refactors.

## Best fit for this repo: official model with a deliberate registry layer

This repo has needs beyond the simple example:

- a shared UI package,
- product-specific Metrics compositions,
- a docs site,
- a live registry site,
- a registry publishing/distribution story.

So the right answer is **not** “copy the example exactly”.

The better answer is:

### Keep

- one shared UI workspace: `@repo/ui`
- explicit package exports
- app-local code in each app
- per-workspace `components.json` where CLI installs are expected

### Add

- one explicit source-of-truth registry manifest
- one clear separation between:
  - **registry publishing data**
  - **registry site runtime presentation**

### Reduce

- root-level alias sprawl
- app imports that reach into internal package folders
- hidden coupling between registry scripts and registry website runtime

## Recommended Target Architecture

## 1. Shared package ownership

`packages/ui` should remain the shared design-system package.

It should own:

- primitives
- shared tokens/styles
- shared hooks/utilities
- shared registry UI helpers
- any truly shared cross-app compositions

It should export these through stable subpaths, not through app-specific source aliases.

## 2. App responsibilities

### Metrics app

Use as the main product app.

Should:

- import shared primitives and shared compositions from `@repo/ui`,
- keep product-page assembly local unless it is intentionally reused elsewhere,
- have its own `components.json` only if the shadcn CLI is expected to install app-local forms, blocks, or page components there.

### Admin app

Use as a consumer of `@repo/ui`.

Should:

- import from stable `@repo/ui` export paths,
- keep admin-only compositions local,
- have its own `components.json` only if CLI installs are expected inside `apps/admin`.

### Docs app

Use primarily as a content/documentation consumer.

Should:

- consume `@repo/ui` exports,
- avoid being a primary install target unless there is a real need to generate local demo components there,
- only get a `components.json` if local shadcn CLI installs are part of the intended workflow.

### Registry app

Use as the live site for browsing, previewing, and distributing components.

Should:

- consume shared preview/rendering code from `@repo/ui`,
- read from an explicit registry manifest source,
- avoid being the hidden source of truth for package internals,
- keep build/publish scripts clearly separated from website presentation logic.

## 3. `components.json` policy

Recommended policy:

- `packages/ui/components.json`: **yes**
- `apps/app/components.json`: **yes, if local installs are intended**
- `apps/admin/components.json`: **yes, if local installs are intended**
- `apps/docs/components.json`: **optional**
- `apps/registry/components.json`: **yes, if local registry-site UI installs are intended**
- root `components.json`: **no**

The root should not pretend to be a workspace install target.

## 4. Registry manifest policy

Recommended policy:

- choose **one** canonical `registry.json`,
- make scripts update that canonical file,
- generate derivative runtime artifacts from it,
- make the registry site clearly consume either:
  - the canonical JSON directly, or
  - generated artifacts that are explicitly derived from it.

What should not continue:

- manifest scripts assuming `registry.json` is primary,
- runtime pages using generated TS as primary,
- `/r/registry.json` being presented as the contract while another structure is the real source of truth.

## 5. Import policy

Preferred direction:

- cross-app and cross-package imports go through `@repo/ui/...`
- app-local imports stay app-local
- internal `packages/ui/src/...` structure is not used as an app-facing contract

That means:

- fewer root `tsconfig` aliases,
- more package exports,
- more explicit barrels,
- less repair work every time internal folders move.

## Recommendation

The repo should move **toward the official shadcn monorepo model**, not further away from it.

For this workspace specifically, the best architecture is:

1. **`packages/ui` as the shared install/export package**
2. **per-app `components.json` files only where the CLI should write local code**
3. **no root `components.json` as a pseudo-workspace**
4. **stable `@repo/ui` exports instead of deep alias dependency**
5. **one explicit canonical `registry.json`**
6. **registry website as consumer/presenter, not hidden manifest owner**

## Bottom Line

If the question is “which is better?”:

- **better than current:** official shadcn monorepo structure
- **best for this repo:** official structure plus an intentional registry publishing layer

The current setup is flexible, but it is too implicit.

The official model is more constrained, but the constraints are useful here. They would reduce import drift, fix the `components.json` ambiguity, and make the registry app easier to reason about across Metrics, Admin, Docs, and the live Registry site.
