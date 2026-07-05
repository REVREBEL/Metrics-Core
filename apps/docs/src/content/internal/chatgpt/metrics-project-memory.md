---
title: ChatGPT Metrics Project Memory
description: Internal working context for ChatGPT when reviewing Metrics documentation, Dataform, table architecture, and implementation planning.
draft: true
---

# ChatGPT Metrics Project Memory

> Internal working document. This file is not a product specification and must not override current repository code, Dataform definitions, or approved Linear decisions.

## Purpose

Use this document as the first context check before making recommendations about:

- Metrics documentation;
- Dataform;
- warehouse and table architecture;
- lookup and mapping tables;
- Metrics Library and data governance;
- BigQuery and DuckDB integration;
- implementation work orders or Linear issue breakdowns.

This document exists because prior recommendations were sometimes made from a narrow subset of repository documents without first re-reading the full Metrics initiative context.

## Required review order

Before reaching a conclusion, review sources in this order:

1. **Current Linear Metrics initiative**
   - Review the initiative structure and relevant project documents.
   - Start with `Metrics Core Framework`.
   - Also check `Metrics Product Map`, `Application Overview`, `Technical Spec`, and feature-specific documents when relevant.
2. **Current repository implementation**
   - Repository: `REVREBEL/Metrics-Core`.
   - Confirm the active branch and current files rather than relying on historical issue text.
3. **Current Dataform definitions**
   - Treat `packages/dataform` as the canonical repository-owned Dataform source when present.
   - Use `REVREBEL/Metrics-Dataform` as the synchronized standalone mirror, not as a competing source of truth.
4. **Documentation under `apps/docs/src/content`**
   - Documentation explains the architecture but may lag implementation.
   - Verify schema claims against Dataform before repeating them.
5. **App registries and fixtures**
   - Treat registries and fixtures as application scaffolding unless confirmed against deployed schema.

## Source-of-truth rules

### Product organization

Linear is the source of truth for product organization, workspaces, initiative/project boundaries, and approved feature relationships.

Current Metrics initiative projects include:

```text
00 — Metrics App Foundation
01 — Commercial Plan UI
02 — Growth Plan UI
03 — Broadcast UI
04 — Metrics Dashboard
05 — Metrics Library & Data Governance
06 — BigQuery & DuckDB Data Integration
07 — Playbook UI
08 — Threads & Collaboration
09 — Help Desk
10 — Mission Control, Auth & Permissions
```

### Repository

Current repository:

```text
REVREBEL/Metrics-Core
```

Do not rely on historical references to `REVREBEL/Metrics`, npm-only workflows, or older single-app structures without verifying that they are still current.

### Dataform and warehouse schema

Use current Dataform DDL to determine:

- whether a table exists;
- its current columns and types;
- its lookup dependencies;
- its execution dependencies;
- whether an object is implemented, planned, migrated, compatibility-only, or deprecated.

Do not infer live schema solely from:

- UI registries;
- fixtures;
- architecture diagrams;
- old Linear documents;
- old audit documents.

### Documentation

All maintained Metrics documentation belongs under:

```text
apps/docs/src/content
```

Documentation should distinguish clearly between:

```text
IMPLEMENTED
PLANNED
COMPATIBILITY
DEPRECATED
UNRESOLVED
```

## Product architecture

Metrics is a hotel Commercial OS, not only a dashboard.

The core capability model is:

```text
01 Platform Foundation
02 Commercial Planning
03 Strategy
04 Execution
05 Intelligence
06 Knowledge
```

The user-facing Core Workspaces are:

```text
Metrics
Commercial Plan
Growth Plan
Broadcast
Metrics Library
Playbook
Threads
Help Desk
```

Mission Control is a separate protected administrative layer.

The workspace shell follows:

```text
Context
→ Workspace Navigation
→ Explorer | Canvas | Inspector
```

## Data architecture ownership

### BigQuery

Source of truth for:

- raw and staging data;
- dimensions;
- lookup tables;
- mapping tables;
- fact tables;
- reporting views and marts;
- source lineage and analytical history.

### App database

Expected source of truth for application workflow state, subject to current implementation decisions:

- users and roles;
- workspace configuration;
- engagements;
- planning drafts;
- initiatives and tasks;
- campaigns;
- notes and approvals;
- draft mapping changes;
- application preferences.

### DuckDB

Analytical serving layer for fast application queries. It must not own canonical definitions that belong in BigQuery/Dataform or the Metric Library.

### Package boundaries

```text
packages/ui
  Visual primitives and reusable presentation components

packages/data
  Data clients, adapters, validation, query contracts, analytical runtimes

packages/metrics
  Metric definitions, formulas, dimensions, aggregation and formatting rules

apps/app/features
  Product workflows and domain-specific application UI

apps/app/app
  Routes, layouts, boundaries, and composition
```

Do not place warehouse queries, DuckDB initialization, or business calculations in `packages/ui`.

## Current mapping and lookup understanding

The current Dataform review documented these implemented mapping tables:

```text
metrics_core.map_segment
metrics_core.map_roomtype
metrics_core.map_source
metrics_core.map_rate
```

Objects referenced by architecture or app registry but requiring verification before being described as live include:

```text
metrics_core.map_hotel
metrics_core.map_channel
metrics_core.map_market
metrics_core.map_agency
metrics_core.map_source_metric
metrics_core.lkp_roomtype
```

Important rule: this list is historical working context, not permanent truth. Re-check current Dataform before using it.

The app mapping registry previously used generic fields such as:

```text
source_system
source_code
source_value
standard_code
```

Current Dataform mapping tables use table-specific schemas and generally standardize source lineage through:

```text
source_application_code
```

Before recommending registry changes, compare the registry directly to current Dataform and determine whether the registry has since been corrected.

## Documentation files created during this work

Relevant architecture documentation includes:

```text
apps/docs/src/content/architecture/mapping-tables.mdx
apps/docs/src/content/architecture/lookup-tables.mdx
apps/docs/src/content/architecture/table-dependencies.mdx
apps/docs/src/content/development/app-architecture/workspace-application-structure.mdx
```

These documents were created from then-current repository and Dataform definitions. They should be updated when the schema changes and should not be treated as independent proof of the schema.

## Decision discipline

Before stating that something is missing, invalid, planned, or implemented:

1. Check the relevant Linear initiative/document for product intent.
2. Check current repository code for implementation state.
3. Check Dataform for actual warehouse state.
4. Check docs for whether the distinction is already documented.
5. State any conflict explicitly instead of choosing one source silently.

Use wording such as:

```text
Linear defines...
Dataform currently implements...
The application registry currently assumes...
The docs currently describe...
A decision is still required on...
```

Do not phrase an earlier assistant-created assumption as an independently validated project decision.

## Known historical traps

- Older Linear engineering context references `REVREBEL/Metrics`; the current main repository is `REVREBEL/Metrics-Core`.
- Older instructions may reference npm; the current monorepo uses pnpm.
- UI registries may include planned tables that Dataform does not yet create.
- Documentation may describe an intended architecture rather than deployed behavior.
- Fixture data must not be presented as production data.
- A completed Linear issue does not by itself prove the repository still matches its acceptance criteria; inspect the current code.
- Do not infer that a branch exists remotely merely because an issue instructed an agent to use it.

## Working protocol for future updates

When completing documentation, Dataform, or table-architecture work:

1. Add or update the canonical implementation first when applicable.
2. Update relevant docs in the same workstream.
3. Add a dated entry to the change log below.
4. Include source files reviewed.
5. Record unresolved decisions separately.
6. Avoid duplicating complete schemas in this notebook; link to canonical docs and retain only high-value context.

## Open questions register

Maintain unresolved questions here until they are decided in Linear or implemented:

- Should channel mapping remain part of `map_source`, or should `map_channel` become a separate table?
- Does agency data need a source mapping layer in addition to `lkp_agency`?
- What is the canonical definition and taxonomy for `market`?
- Should room type, room class, bed type, and room pool be normalized into separate lookups?
- What is the final schema and responsibility of `map_source_metric`?
- Which mappings are globally managed versus property-specific?
- Which mapping edits are stored as app-database drafts before publication to BigQuery?

Re-check these questions before assuming they remain unresolved.

## Change log

### 2026-07-04

- Created this internal project-memory document.
- Reviewed the Metrics initiative project structure.
- Reconfirmed that future conclusions must combine Linear product intent, current repository implementation, current Dataform DDL, and documentation.
- Marked older Metrics Engineering Context repository and package-manager references as historical and potentially stale.

## Maintenance rule

Update this file only with durable context that will prevent repeated mistakes. Do not use it as a transcript, task board, or replacement for Linear.
