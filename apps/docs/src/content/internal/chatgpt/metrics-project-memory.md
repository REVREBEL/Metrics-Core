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

No canonical production application-database package, schema, or migration directory was confirmed during REV-71. Treat application persistence as planned until repository implementation establishes it.

Approved plans and mappings require a controlled publication service before they become warehouse records. Browser components must not write directly to BigQuery.

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

## Canonical data architecture documentation

Maintained architecture documentation lives under:

```text
apps/docs/src/content/architecture/data
```

The Shared Column Name Catalog at `architecture/data/shared-column-names.mdx` is canonical for shared column names and abbreviations. It supersedes conflicting older column-level examples in `naming-and-modeling-conventions.mdx`, while that page continues to govern object families, grain, status, and migration discipline.

Durable shared-column decisions:

- `no` abbreviates number.
- `amt` abbreviates monetary amount.
- Standard business labels do not use `_name`; use label/code pairs such as `source` and `source_code`.
- `source_system` identifies the specific system or application, such as StayInTouch or Duetto.
- `source_system_type` identifies the system category, such as PMS, RMS, CRS, or booking engine.
- Existing `source_application_code` physical fields remain implementation compatibility until a reviewed migration occurs.
- Governed metric abbreviations include `rev`, `rms`, `adr`, and `occ`.

## StayInTouch PMS pipeline memory

The StayInTouch PMS source documentation is maintained at:

```text
apps/docs/src/content/stay-in-touch-pms/index.mdx
```

Durable pipeline context:

- The former Step 06 has been removed.
- The final Step 05 now includes both final naming/code amendments and the BigQuery upload function using `pandas_gbq.to_gbq`.
- Future documentation and PR reviews must not assume a six-step pipeline or look for a separate Step 06 upload module.
- Before reviewing links, verify the current committed Step 05 notebook and Python-export filenames because historical notebook names included numbered suffixes and spelling variants.
- The final BigQuery destination remains `dovetailco.stg.pms_reservations` unless the current pipeline implementation shows otherwise.
- Treat the source page as maintained source-specific documentation, not as independent proof of current pipeline behavior. Verify claims against the committed pipeline assets and current warehouse implementation.

## Decision discipline

Before stating that something is missing, invalid, planned, or implemented:

1. check current Linear intent;
2. check current repository code;
3. check current Dataform DDL;
4. compare maintained docs;
5. state any differences explicitly.
