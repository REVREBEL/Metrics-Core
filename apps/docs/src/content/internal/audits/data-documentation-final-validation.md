---
title: Data Documentation Final Validation
description: Final REV-73 source-verification, consistency, navigation, and implementation-gap record for the Metrics data architecture documentation baseline.
draft: true
---

# Data Documentation Final Validation

## Purpose

This record closes the REV-73 validation pass for the canonical Metrics data architecture documentation.

It verifies the maintained documentation against:

1. Linear product intent and approved terminology;
2. the current `REVREBEL/Metrics-Core` implementation;
3. the current `REVREBEL/Metrics-Dataform` definitions;
4. the canonical pages under `apps/docs/src/content/architecture/data`.

The original baseline inventory remains at `data-documentation-baseline.md`. This document records the final disposition after REV-62 through REV-72 and the corrections completed during REV-73.

## Review baseline

```text
Integration branch: dev
Working branch: gary/rev-73-validate-and-close-the-data-documentation-baseline
Canonical docs root: apps/docs/src/content/architecture/data
Warehouse implementation source: REVREBEL/Metrics-Dataform
```

The `dev` branch was synchronized from `main` before this validation so the audit did not run against the previously stale branch state.

## Final canonical topic coverage

Every expected data-architecture topic has one maintained canonical page:

| Topic | Canonical page | Final status |
|---|---|---|
| Platform ownership | `platform-architecture-and-ownership.mdx` | Canonical |
| Naming and modeling | `naming-and-modeling-conventions.mdx` | Canonical |
| Source systems and ingestion | `source-systems-and-ingestion.mdx` | Canonical |
| Lookups | `lookup-tables.mdx` | Canonical |
| Mappings | `mapping-tables.mdx` | Canonical |
| Dimensions | `dimensions.mdx` | Canonical |
| Facts | `fact-tables.mdx` | Canonical |
| Pickup | `pickup-tables.mdx` | Canonical |
| Views, reports, and marts | `reporting-views-and-marts.mdx` | Canonical |
| Metric definitions | `metric-definitions.mdx` | Canonical |
| Dependencies | `table-dependencies.mdx` | Canonical |
| Lineage and freshness | `lineage-and-freshness.mdx` | Canonical |
| Validation and assertions | `validation-and-assertions.mdx` | Canonical |
| BigQuery and Dataform | `bigquery-and-dataform.mdx` | Canonical |
| DuckDB serving | `duckdb-serving-layer.mdx` | Canonical |
| Application data ownership | `application-data-ownership.mdx` | Canonical |
| Open architecture decisions | `decision-register.mdx` | Canonical |

## Dataform reconciliation

### Confirmed core objects

Current Dataform implements these core dimensions:

```text
metrics_core.dim_property
metrics_core.dim_date
metrics_core.dim_segment
metrics_core.dim_roomtype
metrics_core.dim_metric
metrics_core.dim_source_report
```

Current Dataform also implements the source-application reference layer:

```text
metrics_core.lkp_source_system_type
metrics_core.lkp_source_application
metrics_core.vw_source_application
```

The canonical dimension, lookup, mapping, dependency, and reporting pages own the detailed object inventories. Historical and domain pages are not independent proof that an object exists.

### Confirmed pace implementation

Current Dataform implements four staging tables:

```text
stg.stg_pace_property
stg.stg_pace_segment
stg.stg_pace_roomclass
stg.stg_pace_roomtype
```

It implements four compatibility snapshot tables:

```text
metrics_pace.snap_pace_property
metrics_pace.snap_pace_segment
metrics_pace.snap_pace_roomclass
metrics_pace.snap_pace_roomtype
```

It implements four reporting views:

```text
metrics_pace.vw_pace_property
metrics_pace.vw_pace_segment
metrics_pace.vw_pace_roomclass
metrics_pace.vw_pace_roomtype
```

The views calculate ADR for all four grains. Property, room-class, and room-type views also calculate occupancy and RevPAR. The segment view does not calculate occupancy or RevPAR.

The snapshot creation operations copy an empty staging schema and do not declare target partitioning, clustering, or movement logic. The documentation now avoids claiming those behaviors are implemented.

### Objects not established by current Dataform

The reviewed Dataform definitions do not establish current canonical implementations for:

```text
fact_pace_*
fact_actual_*
fact_pickup_*
fact_metric_observation
rpt_*
mart_*
ctl_file_load
native Dataform assertion actions
application workflow tables
manual budget or forecast publication tables
```

These names may remain in historical, conceptual, or decision material, but canonical pages must not present them as current physical objects.

## Application implementation reconciliation

The application currently includes a browser-based DuckDB WASM analytics hook under `packages/ui/src/hooks/use-hotel-analytics.ts`.

The hook:

- runs in a client component;
- loads a same-origin Parquet file;
- initializes a singleton DuckDB WASM database and connection;
- performs dashboard calculations in browser SQL;
- does not establish canonical warehouse ownership.

The repository still places analytical runtime and data-access compatibility code under `packages/ui`. Canonical documentation correctly treats that placement as current compatibility implementation rather than the intended long-term package boundary.

No canonical production application database schema, migration directory, or durable workflow-persistence contract was confirmed during this pass. Fixture-backed context and simulated local mutations remain application scaffolding, not proof of persistence.

## REV-73 corrections

### Historical table architecture

`apps/docs/src/content/architecture/table-architecture.mdx` previously presented historical and proposed table families as the canonical physical architecture.

It has been replaced with a historical gateway that:

- preserves durable grain-first design principles;
- directs readers to the canonical subject catalogs;
- no longer claims historical `fact_*`, `rpt_*`, or `mart_*` examples are implemented;
- no longer competes with Dataform-backed documentation.

### Canonical index

`architecture/data/index.mdx` now:

- identifies the REV-72 decision register as current canonical documentation;
- includes the decision register in primary navigation;
- classifies the old table architecture route as a historical gateway;
- removes language implying the canonical documentation rebuild is still incomplete.

### Docs Library landing page

The Docs Library landing page now directs readers to the canonical Data Architecture section and labels the table-architecture route as historical reference rather than a current physical schema source.

## Duplicate and stale-route review

The former duplicate pages at these paths remain removed:

```text
architecture/lookup-tables.mdx
architecture/mapping-tables.mdx
architecture/table-dependencies.mdx
```

Canonical routes live under `architecture/data`.

Searches for the removed route URLs did not identify maintained canonical links that still depend on those deleted destinations.

Historical pages may continue to mention conceptual object names. Their claims are subordinate to the canonical catalogs and current Dataform.

## Open decisions

All unresolved architecture questions identified during the documentation project are represented in `architecture/data/decision-register.mdx`.

The remaining gaps are implementation decisions or implementation work, not undocumented confirmed architecture. They include:

- application persistence technology and package ownership;
- mapping and planning publication contracts;
- browser versus server DuckDB target architecture;
- native assertions and publication gates;
- ingestion orchestration and load-control tables;
- actual and pickup fact implementation;
- report and mart implementation;
- freshness service levels;
- future pricing-data scope.

## Validation commands and repository blockers

The Docs application declares these package-level checks:

```text
pnpm --filter @apps/docs lint
pnpm --filter @apps/docs build
```

A local execution environment with repository dependencies was not available to this connector session, so these commands were not represented as passed.

The root `package.json` also contains confirmed command defects that should be corrected in a separate implementation issue:

```text
dev:registry       runs `dev` without `turbo run`
generate-registry  has no executable
dev:db             uses `--filer`
dev:ui             uses `--filer`
```

These root defects do not change the architecture conclusions, but they weaken repository-wide validation and should be resolved before claiming a clean monorepo validation run.

## Final disposition

The documentation baseline now has:

- one canonical page for every expected architecture topic;
- Dataform-backed implementation claims for current warehouse objects;
- repository-backed current-state claims for application and DuckDB behavior;
- explicit separation of implemented, compatibility, planned, deprecated, and unresolved states;
- a canonical decision register for remaining open questions;
- historical pages prevented from overriding current implementation truth.

No undocumented confirmed architecture decision was identified in the final pass.

Remaining gaps should be tracked as implementation or decision work. They should not be silently resolved through documentation language.
