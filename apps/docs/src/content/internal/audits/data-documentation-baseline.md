---
title: Data Documentation Baseline Audit
description: Source-grounded inventory and gap baseline for Metrics data architecture documentation.
draft: true
---

# Data Documentation Baseline Audit

## Purpose

This audit establishes the documentation baseline for Metrics data architecture before individual pages are revised or new Dataform objects are proposed.

It answers four questions:

1. What is already documented?
2. Which statements are confirmed by current product intent, repository code, or Dataform?
3. Where do the current sources conflict?
4. Which documentation pages must be revised, created, consolidated, or deprecated?

This document is an inventory and work plan. It is not a replacement for the canonical subject-area documentation.

## Review date

2026-07-04

## Sources reviewed

### Required first context

- `apps/docs/src/content/internal/chatgpt/metrics-project-memory.md`

### Linear product context

- Metrics initiative and project structure
- Metrics Core Framework
- Metrics Product Map
- Metrics Engineering Context
- Application Overview and Technical Spec references returned with the Metrics documentation set
- Project `11 — Data Architecture Documentation`
- REV-61 through REV-73 scope and dependencies

### Repository implementation

Repository reviewed:

```text
REVREBEL/Metrics-Core
```

Default branch at review time:

```text
main
```

Relevant application and package areas identified during the review include:

```text
apps/app
apps/docs/src/content
packages/dataform
packages/metrics
packages/ui/src/lib/bigquery
packages/ui/src/lib/lookups
packages/ui/src/lib/mapping-tables
packages/ui/src/hooks/use-hotel-analytics.ts
```

### Dataform

The repository-owned source is `packages/dataform`. The synchronized standalone mirror `REVREBEL/Metrics-Dataform` was used to confirm indexed DDL paths when the monorepo code index did not return the embedded package files.

Relevant confirmed Dataform files include:

```text
definitions/00_create_core_tables.sqlx
definitions/01_create_source_application_tables.sqlx
definitions/05_create_segment_tables.sqlx
definitions/05_migrate_segment_mapping_schema.sqlx
definitions/06_create_source_channel_rate_tables.sqlx
definitions/06_migrate_source_rate_mapping_schema.sqlx
definitions/06_migrate_subsource_parent_source.sqlx
```

### Current reports supplied for reconciliation

- `Full-Stack Architectural Trace — The Metrics Engine`
- `BI Platform — Database Schema Reconstruction and Technical Specifications`
- `Database Design, Decisions, and Naming Conventions Report`
- `Database Documentation Gap Analysis`

The database reconstruction and design-decision reports are treated as current architecture context where the user has confirmed them as current. Claims about physical implementation still require current DDL or code confirmation.

## Classification model

| Classification | Meaning |
|---|---|
| **CURRENT AND CONFIRMED** | The document is current and its material claims are supported by the appropriate source of truth. |
| **CURRENT BUT INCOMPLETE** | The document is directionally current but omits required scope, status distinctions, ownership, or dependencies. |
| **STALE** | The document primarily describes a superseded route, package, runtime, repository, or architecture state. |
| **DUPLICATED** | The material is repeated across multiple pages without a clearly designated canonical owner. |
| **CONFLICTING** | The document contains claims that disagree with Linear, Dataform, current code, or another maintained page. |
| **MISSING** | The required topic has no canonical maintained documentation page. |

A document may have one primary classification and additional conflict notes.

# Executive findings

## Confirmed decisions already present in the documentation set

The following decisions are sufficiently established to be documented canonically, subject to exact schema verification in the relevant follow-up issue:

- The warehouse uses grain-specific fact families instead of one generic fact table with a `grain_type` discriminator.
- Pace and actual tables are modeled separately from pickup tables.
- Pickup storage is long/narrow.
- Commercial segments and finance segments are separate taxonomies.
- Additive/source metrics belong in facts; reusable derived KPIs belong in governed marts, semantic views, or the Metrics Library.
- Lookup, mapping, dimension, fact, reporting, and mart layers have distinct responsibilities.
- BigQuery/Dataform owns canonical warehouse structures.
- DuckDB is an analytical serving layer and must not own canonical metric or warehouse definitions.
- Application workflow state and draft state are separate concerns from canonical analytical facts.
- Database objects use lower-case `snake_case` and approved object prefixes.

## Most serious documentation conflicts

1. `architecture/table-architecture.mdx` presents a large set of dimensions, facts, pickup tables, marts, and `map_source_metric` as canonical physical objects without consistently distinguishing implemented from planned architecture.
2. `architecture/mapping-tables.mdx` correctly distinguishes implemented mappings from registry-only objects, but older and broader architecture pages still present some unimplemented objects as live.
3. Older engineering and migration material describes `REVREBEL/Metrics`, legacy routes, iframe/registry adapters, and browser DuckDB assumptions that are not automatically current for `REVREBEL/Metrics-Core`.
4. Application mapping registry metadata uses or previously used generic source/standard fields that do not match the current table-specific Dataform schemas.
5. Room-type documentation and application scaffolding imply a lookup-backed taxonomy while current Dataform keeps room type, class, bed, feature, and pool values embedded in `map_roomtype`.
6. The repository contains BigQuery and mapping logic under `packages/ui`, which conflicts with the intended package ownership described in the current project memory and architecture direction.
7. Current documentation does not provide one complete implementation-status ledger across dimensions, facts, pickup tables, views, reports, marts, and metrics.

## Highest-priority missing pages

- Canonical data-platform architecture and ownership boundaries
- Canonical naming and modeling conventions
- Dimension catalog and grain definitions
- Fact-table catalog with explicit one-row-per grain statements
- Pickup model and pickup-table catalog
- Reporting views and marts catalog
- Metrics Library semantic and governance model
- Source systems, lineage, freshness, and assertion model
- Application data ownership and write-back boundaries
- Unresolved data architecture decision register

# Documentation inventory

## Architecture and warehouse documentation

| Topic | Existing document/path | Linear status | Dataform status | Application status | Documentation status | Required action | Blocking decision, if any |
|---|---|---|---|---|---|---|---|
| Warehouse/table architecture | `apps/docs/src/content/architecture/table-architecture.mdx` | Grain-specific facts, long pickup, separate planning/intelligence layers align with current direction | Mapping tables are only partly represented accurately; many dimensions, facts, pickup tables, and marts require object-by-object DDL confirmation | Application expects analytical data contracts but current package boundaries are mixed | **CONFLICTING** | Retain as a conceptual source, then rewrite or split. Add implementation-status labels for every object. Remove “canonical physical schema” implications where DDL is absent. | Exact implemented dimension/fact/pickup/mart inventory |
| Database column naming | `apps/docs/src/content/architecture/column-naming-standards.mdx` | Naming standard is an approved current concern | Must be compared with actual DDL exceptions and migrations | Application models and registries may use compatibility names | **CURRENT BUT INCOMPLETE** | Revise into the canonical naming/modeling convention or merge into a broader conventions page. Document exceptions and compatibility names. | Whether existing exceptions are temporary or permanent |
| Source-file ingestion | `apps/docs/src/content/architecture/source-file-ingestion-model.mdx` | Source ingestion belongs to the platform foundation/data integration model | Requires comparison with current Dataform source declarations and ingestion tables | Mission Control exposes data-source concepts; exact runtime must be verified | **CURRENT BUT INCOMPLETE** | Add ownership, lineage, refresh, validation, and current implementation status. Link to source-system and lineage docs. | Final ingestion orchestration ownership |
| Table dependencies | `apps/docs/src/content/architecture/table-dependencies.mdx` | Dependency visibility is required | Current lookup and mapping dependencies are partly documented; full fact/view/mart dependencies require verification | Registry dependencies differ from physical dependencies | **CURRENT BUT INCOMPLETE** | Expand from lookup/mapping dependencies into a verified end-to-end dependency catalog or split by layer. | Final implemented fact/view/mart inventory |
| Data-platform ownership | No canonical subject page found | Linear separates platform, intelligence, planning, knowledge, and Mission Control responsibilities | Dataform owns warehouse DDL; exact DuckDB/app-DB boundaries are not represented in Dataform | Current code includes BigQuery and analytics logic in UI-owned locations | **MISSING** | Create canonical architecture and ownership page under the approved docs information architecture. | Browser/server DuckDB target and migration plan |
| BigQuery and Dataform responsibilities | Scattered across table, mapping, lookup, and ingestion pages | BigQuery/Dataform are the warehouse authority | Implemented | App contains direct BigQuery utilities in `packages/ui` | **DUPLICATED** | Consolidate canonical responsibility, deployment, migration, and ownership rules. Subject pages should link back rather than redefine them. | Package migration sequencing |
| DuckDB serving layer | `internal/chatgpt/metrics-project-memory.md`, legacy migration audit, and analytics hook/code references | DuckDB is a serving layer, not canonical ownership | Not a warehouse DDL concern | `use-hotel-analytics.ts` and legacy browser-WASM assumptions require current verification | **CONFLICTING** | Create a current-state/target-state DuckDB page. Mark legacy browser assumptions as historical unless confirmed. | Browser WASM versus server/local serving responsibility |
| Application database ownership | Metrics Engineering Context and project memory only | Workflow state belongs outside canonical analytical facts | Not defined by Dataform | Current persistence status must be verified | **MISSING** | Create canonical ownership matrix for workflow, draft, approval, audit, and published analytical data. | Budget/forecast and mapping publication workflow |

## Lookup and mapping documentation

| Topic | Existing document/path | Linear status | Dataform status | Application status | Documentation status | Required action | Blocking decision, if any |
|---|---|---|---|---|---|---|---|
| Lookup tables | `apps/docs/src/content/architecture/lookup-tables.mdx` | Metrics Library/Data Governance requires managed lookup catalogs | Current Dataform review identified 21 implemented lookups | Lookup fixtures and UI scaffolding do not independently prove schema | **CURRENT BUT INCOMPLETE** | Re-verify all tables, relationships, assertions, ownership, and statuses against current DDL. Add unsupported/planned lookup distinctions. | Room-type lookup normalization |
| Mapping tables | `apps/docs/src/content/architecture/mapping-tables.mdx` | Mapping is a governed Metrics Library function | Confirmed implemented: `map_segment`, `map_roomtype`, `map_source`, `map_rate`; other registry objects are not current DDL | Registry includes or historically included planned objects and generic fields | **CURRENT AND CONFIRMED** for the status model; **CURRENT BUT INCOMPLETE** for full governance | Preserve as the leading implementation-status source. Recheck current DDL and registry, then add editability, ownership, publication, audit, and conflict behavior. | `map_channel`, `map_market`, `map_agency`, `map_source_metric`, room taxonomy |
| Segment model | `apps/docs/src/content/core/segment-model.mdx` | Commercial and finance segment separation is current | `lkp_segment_group`, `lkp_segment`, `lkp_finance_segment`, `map_segment`, `dim_segment`, and `vw_segment` require exact current verification | Application uses segment concepts in planning and reporting | **CURRENT BUT INCOMPLETE** | Reconcile with mapping/lookup docs and make one page canonical for business semantics while schema pages own physical details. | Final dimension key and compatibility fields |
| Source/channel/rate model | `apps/docs/src/content/core/source-channel-rate-model.mdx` | Current commercial taxonomy area | Dataform implements lookup and mapping objects across source, channel, rate, company, agency, and consortia domains | Registry and UI mapping behavior must be checked | **CURRENT BUT INCOMPLETE** | Separate business taxonomy from physical table catalog. Reconcile whether channel is mapped through `map_source` or a separate future object. | Separate `map_channel` decision |
| Room-type model | `apps/docs/src/content/core/roomtype-model.mdx` | Room taxonomy is required | Current Dataform keeps taxonomy fields in compatibility `map_roomtype`; no confirmed `lkp_roomtype` | Registry claims or previously claimed lookup dependency | **CONFLICTING** | Rewrite current-state section to match DDL. Keep normalized lookup model as planned/unresolved, not implemented. | Room taxonomy normalization |
| Mapping UI registry | No canonical docs page; implementation under `packages/ui/src/lib/mapping-tables` | Metrics Library must manage mappings accurately | Physical schemas are table-specific | Registry uses or used generic field concepts and includes planned objects | **MISSING** | Document registry metadata as application configuration, its relationship to DDL, and required status/editability fields. | Registry redesign scope |

## Dimensions, facts, pickup, reports, and marts

| Topic | Existing document/path | Linear status | Dataform status | Application status | Documentation status | Required action | Blocking decision, if any |
|---|---|---|---|---|---|---|---|
| Dimension architecture | `architecture/table-architecture.mdx` plus core model pages | Grain and taxonomy concepts are current | Exact implemented `dim_*` inventory is not consistently confirmed in docs | Application consumes dimension-like filters and labels | **CURRENT BUT INCOMPLETE** | Create a dimension catalog with keys, grain, source, hierarchy, status, and downstream use. | Exact implemented dimension set |
| Pace fact tables | `architecture/table-architecture.mdx`, `rms/ideas-pace.mdx`, supplied reconstruction report | Separate pace fact families are current architecture | Exact implemented table names/columns must be verified from current DDL before being labeled live | Analytics code and dashboards reference pace concepts | **CONFLICTING** | Create a verified pace-fact catalog. Separate current DDL from approved target architecture. | Current implemented pace family and compatibility names |
| Actual fact tables | `architecture/table-architecture.mdx`, reconstruction report | Separate actual tables are current architecture | Exact DDL status requires verification | Application needs actuals for historical reporting | **CURRENT BUT INCOMPLETE** | Create verified actual-fact catalog with grain and reconciliation rules. | Current implemented actual family |
| Pickup fact tables | `architecture/table-architecture.mdx`, reconstruction and decision reports | Long/narrow pickup is confirmed | Exact object and column inventory requires DDL verification | Application pace/pickup experiences depend on serving contracts | **CURRENT BUT INCOMPLETE** | Create dedicated pickup-model page and per-table catalog. | Window-code representation and implemented table family |
| Flexible metric observation | `architecture/table-architecture.mdx` references `fact_metric_observation` | Flexible/evolving metrics are directionally valid | Current physical implementation not confirmed | Metrics Library may supersede or govern this role | **CONFLICTING** | Mark planned/unresolved until DDL and Metrics Library responsibility are confirmed. | Whether this is needed beside governed metric definitions |
| Reporting views | Mapping docs describe `vw_segment`, `vw_source`, `vw_rate`; table architecture references semantic views generally | Views are part of intelligence delivery | Specific mapping views are documented; full `vw_*` inventory missing | UI may query direct tables or utilities | **CURRENT BUT INCOMPLETE** | Create verified view catalog with grain, purpose, consumers, and compatibility status. | Current consumer contracts |
| Reporting tables | GA4 and domain pages reference reporting outputs | Reporting outputs are expected | Exact `rpt_*` inventory requires verification | Website analytics and dashboards consume these concepts | **CURRENT BUT INCOMPLETE** | Add report-table catalog and clearly distinguish from views and marts. | GA4 output coverage |
| BI marts | `architecture/table-architecture.mdx` lists daily marts | Mart layer is approved conceptually | Listed `mart_property_daily`, `mart_segment_daily`, `mart_source_daily`, and `mart_roomtype_daily` require DDL confirmation | Dashboard-ready contracts are needed | **CONFLICTING** | Do not label listed marts implemented until verified. Create canonical mart catalog and KPI ownership rules. | Current mart implementation |

## Domain-specific data documentation

| Topic | Existing document/path | Linear status | Dataform status | Application status | Documentation status | Required action | Blocking decision, if any |
|---|---|---|---|---|---|---|---|
| RMS pace | `apps/docs/src/content/rms/ideas-pace.mdx` | Pace is part of Metrics intelligence | References fact concepts; exact alignment with current DDL must be checked | Related analytics functionality exists or is planned | **CURRENT BUT INCOMPLETE** | Keep domain-specific source behavior here; move canonical fact schema and metric semantics to shared data docs. | Source-specific compatibility columns |
| Demand table models | `apps/docs/src/content/demand/demand-table-models.mdx` | Demand intelligence is current product scope | Exact DDL implementation requires verification | Demand UI/workflows require confirmation | **CURRENT BUT INCOMPLETE** | Retain domain semantics; link to shared dimensions/facts and label implemented/planned tables. | Demand model implementation state |
| Events table model | `apps/docs/src/content/demand/events-table-model.mdx` | Event intelligence is current direction | Lookup support exists for event category/impact; event fact/workflow ownership requires verification | Events may be workflow state, analytical enrichment, or both | **CONFLICTING** | Clarify app-database versus warehouse ownership and publication lifecycle. | Canonical owner of event records |
| GA4 overview | `apps/docs/src/content/google-analytics/overview.mdx` | Website intelligence is part of Metrics | BigQuery/GA4 outputs require current DDL review | App includes website/dashboard concepts | **CURRENT BUT INCOMPLETE** | Add session versus first-user scope, implemented report inventory, grain, freshness, and downstream contracts. | Final GA4 report coverage |
| Pricing/forecast models | Referenced by architecture docs and supplied gap analysis; canonical file inventory not established in this audit | Commercial planning and pricing are current domains | Physical pricing and manual planning facts are not yet confirmed as a complete model | Commercial Plan will create workflow data | **MISSING** as a unified ownership/model page | Create only after data ownership and publication boundaries are approved. | App-DB versus BigQuery write-back model |

## Metrics Library and semantic documentation

| Topic | Existing document/path | Linear status | Dataform status | Application status | Documentation status | Required action | Blocking decision, if any |
|---|---|---|---|---|---|---|---|
| Metrics Library product model | Metrics Engineering Context, project memory, and feature/project documentation | Metrics Library is a first-class workspace and governed capability | Warehouse supplies source fields and outputs, but should not duplicate all UI metadata | `packages/metrics` is intended to own metric definitions; current implementation must be inspected | **MISSING** as a canonical maintained page | Create the Metrics Library architecture/governance page. | Final publication and approval workflow |
| Base and calculated metrics | Scattered across table architecture, analytics hooks, and reports | Formula governance is required | Derived metrics may appear in marts/views; source facts retain additive measures | Current hooks calculate hotel KPIs | **DUPLICATED** | Establish one formula authority and document where warehouse and app implementations consume it. | Whether current formulas are centralized in `packages/metrics` |
| Formatting and null behavior | Supplied full-stack trace and current code references | Presentation formatting is distinct from metric math | Not a DDL responsibility except null semantics | Current analytics code uses fallback and formatting utilities | **MISSING** as governed semantic documentation | Add format type, null, divide-by-zero, and display responsibility to the Metrics Library docs. | Approved null semantics by metric |
| Metric-to-source mapping | `map_source_metric` appears in table architecture and reports | Source-field lineage is required | No current confirmed Dataform DDL for `map_source_metric` | Registry/product direction may expect it | **CONFLICTING** | Mark unresolved/planned and define its responsibility before creating a table. | Final schema and owner |

## Lineage, validation, and governance

| Topic | Existing document/path | Linear status | Dataform status | Application status | Documentation status | Required action | Blocking decision, if any |
|---|---|---|---|---|---|---|---|
| Source application lineage | Mapping and lookup docs | Required and current | Implemented through `source_application_code` and source-system-type lookups | Generic `source_system` assumptions persist in legacy material | **CURRENT BUT INCOMPLETE** | Make terminology and lineage rules canonical; document exceptions. | Whether any legacy `system` fields remain supported |
| Dataform assertions | Scattered or absent | Data governance requires validation | Current assertions need direct inventory; gap analysis calls for additional orphan, hierarchy, and collision checks | Application should surface health, not implement warehouse assertions | **MISSING** | Create implemented-versus-recommended assertion catalog. | Ownership of data-health display and incident workflow |
| Freshness and refresh history | Data-source and ingestion concepts are scattered | Data health/refresh history are product requirements | Exact operational metadata tables require verification | Mission Control has data-source and audit-log surfaces | **MISSING** | Document cadence, freshness SLA, status ownership, and user-facing exposure. | Canonical refresh-history store |
| Mapping publication and audit | Mapping docs explain schema, not workflow | Governance requires validation, audit, and conflict detection | BigQuery is canonical published state | Draft edits should not write directly from browser to BigQuery | **MISSING** | Document draft, validation, approval, publication, rollback, and audit lifecycle. | App database and service boundary |
| Status vocabulary | Project memory defines implemented/planned/compatibility/deprecated/unresolved | Approved for this workstream | Applicable to all documented objects | Registry needs equivalent statuses | **CURRENT AND CONFIRMED** | Apply consistently to all canonical pages and metadata. | None |

## Development and migration material

| Topic | Existing document/path | Linear status | Dataform status | Application status | Documentation status | Required action | Blocking decision, if any |
|---|---|---|---|---|---|---|---|
| Legacy application audit | `apps/docs/src/content/development/app-migration/01-legacy-application-audit.md` | Historical migration context only | May describe earlier schema assumptions | Contains legacy routes, registry adapters, and browser-WASM behavior | **STALE** for current architecture; useful historical evidence | Keep under migration history with a clear historical banner. Do not use as canonical runtime or route documentation. | None |
| Workspace application structure | `apps/docs/src/content/development/app-architecture/workspace-application-structure.mdx` | Current workspace shell and route model should follow Linear | Not a DDL source | Some wording and routes require current-code verification | **CURRENT BUT INCOMPLETE** | Reconcile terminology and remove unsupported visual/technical claims. Link data ownership instead of redefining it. | Current route implementation |
| UI package structure | `apps/docs/src/content/design-system/ui-package-structure.mdx` | UI package should remain presentation-focused | Dataform has no role here | Current repo contains analytics/BigQuery utilities under UI-owned paths | **CONFLICTING** | State target ownership and create follow-up implementation work rather than rewriting history as completed. | Package relocation plan |

# Source-of-truth conflict register

## Conflict 1: conceptual table architecture versus implemented DDL

**Documentation currently describes:** a broad canonical set of `dim_*`, `fact_*`, `mart_*`, and `map_source_metric` objects.

**Dataform currently confirms:** implemented lookup and mapping objects identified in the current DDL review, including `map_segment`, `map_roomtype`, `map_source`, and `map_rate`. The full conceptual table list requires object-by-object verification.

**Required resolution:** every table in canonical docs must carry an implementation status. Conceptual architecture must not be phrased as a deployed schema.

## Conflict 2: source lineage terminology

**Older reports and application assumptions describe:** `system`, `source_system`, or generic source-system fields.

**Current mapping DDL and mapping documentation describe:** `source_application_code` as the standard mapping relationship to `lkp_source_application`, which then relates to `lkp_source_system_type`.

**Required resolution:** make `source_application_code` canonical for implemented source-value mappings, and document any true compatibility fields explicitly.

## Conflict 3: room-type taxonomy

**Application registry and architectural direction imply:** a lookup-backed room-type taxonomy.

**Dataform currently implements:** room type, room class, bed type, room feature, and room pool values directly in `map_roomtype` under a compatibility schema; no confirmed `lkp_roomtype` exists.

**Required resolution:** document current embedded taxonomy as implemented and normalized lookup tables as unresolved/planned.

## Conflict 4: mapping table inventory

**Application scaffolding references:** `map_hotel`, `map_channel`, `map_market`, `map_agency`, and other generic mapping concepts.

**Dataform currently confirms:** `map_segment`, `map_roomtype`, `map_source`, and `map_rate` in the reviewed implementation set.

**Required resolution:** registries must expose status and editability; unimplemented entries must not appear as live editable tables.

## Conflict 5: DuckDB runtime

**Historical migration material describes:** browser-side DuckDB WASM loading static Parquet assets.

**Current architecture direction defines:** DuckDB as a serving layer without assigning canonical ownership to the browser or server.

**Required resolution:** document current code behavior and target responsibility separately. Do not treat historical browser constraints as permanent architecture without a decision.

## Conflict 6: package ownership

**Architecture direction states:** data clients, queries, validation, and analytical runtimes belong outside `packages/ui`.

**Repository currently contains:** BigQuery, mapping services, lookup fixtures, and analytical hook code under `packages/ui` paths.

**Required resolution:** docs must state current and target state. Package relocation is implementation work, not a documentation-only change.

## Conflict 7: workflow data versus warehouse data

**Architecture reports include:** planning, events, campaigns, budgets, forecasts, and mappings in or near warehouse discussions.

**Current ownership model distinguishes:** workflow drafts and approvals from canonical published analytical facts.

**Required resolution:** create an ownership matrix before documenting write-back schemas as settled.

# Confirmed gaps versus decisions still required

## Confirmed documentation gaps

These gaps can be filled without first making a new architecture decision:

- A canonical data-platform ownership overview is missing.
- Naming rules are not reconciled with current exceptions and compatibility fields.
- There is no complete dimension catalog.
- There is no verified fact-table catalog with explicit grain statements.
- There is no dedicated pickup-model page.
- There is no complete view/report/mart catalog.
- There is no canonical Metrics Library semantic/governance page.
- There is no implemented-versus-recommended Dataform assertion catalog.
- There is no complete source lineage and freshness page.
- There is no canonical application-versus-warehouse ownership matrix.
- There is no maintained unresolved-decision register.
- Historical migration pages are not consistently marked as historical.

## Architecture decisions still required

These must be documented as unresolved until Linear approves a decision or implementation establishes the current model:

- Whether channel mapping remains part of `map_source` or gains a dedicated `map_channel` table.
- Whether agency requires a source-value mapping layer in addition to `lkp_agency`.
- The canonical meaning and taxonomy of `market`.
- Whether room type, room class, bed type, feature, and room pool are normalized into separate lookups.
- The schema and ownership of `map_source_metric`.
- Which mappings are global versus property-specific.
- Where mapping drafts live and how they are published.
- How manual budget and forecast data moves from workflow drafts into analytical reporting.
- Whether DuckDB runs primarily in the browser, server-side, or as a controlled local cache behind a data-service contract.
- The canonical pricing-data model and ownership boundary.
- The role, if any, of `fact_metric_observation` beside the governed Metrics Library.

# Recommended canonical information architecture

The exact folder placement must follow the existing Docs Library collection and navigation conventions established in REV-62. The following is the recommended topic ownership, not an instruction to move files immediately.

```text
Data Architecture
├── Overview and ownership
├── Naming and modeling conventions
├── Source systems and ingestion
├── Lookup tables
├── Mapping tables
├── Dimensions
├── Fact tables
│   ├── Pace
│   ├── Actual
│   └── Other domain facts
├── Pickup model
├── Reporting views, reports, and marts
├── Metrics Library and semantic definitions
├── Lineage, freshness, and validation
├── Application data ownership and write-back
└── Architecture decision register
```

## Existing pages to retain and revise

- `architecture/mapping-tables.mdx`
- `architecture/lookup-tables.mdx`
- `architecture/table-dependencies.mdx`
- `architecture/column-naming-standards.mdx`
- `architecture/source-file-ingestion-model.mdx`
- `core/segment-model.mdx`
- `core/source-channel-rate-model.mdx`
- `core/roomtype-model.mdx`
- domain-specific pages under `rms`, `demand`, and `google-analytics`

## Existing pages to split or substantially rewrite

- `architecture/table-architecture.mdx`

It should become either:

1. a high-level conceptual overview that links to verified catalogs, or
2. a short overview plus separate dimension, fact, pickup, and mart pages.

It should not continue to present unverified target objects as the canonical deployed schema.

## Historical pages to retain with explicit banners

- `development/app-migration/01-legacy-application-audit.md`
- any route, iframe, registry-adapter, or historical DuckDB migration reports

# Workstream mapping

| Follow-up issue | Baseline action |
|---|---|
| REV-62 | Finalize file locations, navigation, and canonical ownership for each topic. |
| REV-63 | Create the platform architecture and ownership page. |
| REV-64 | Reconcile naming and modeling conventions with current DDL and compatibility fields. |
| REV-65 | Re-verify lookup, mapping, and dependency docs and apply status classifications. |
| REV-66 | Create verified dimension and fact catalogs with grain statements. |
| REV-67 | Create the pickup-model and pickup-table documentation. |
| REV-68 | Create verified view, report, mart, and GA4 output catalogs. |
| REV-69 | Create Metrics Library semantic and governance documentation. |
| REV-70 | Create source lineage, freshness, and assertion documentation. |
| REV-71 | Create application-versus-warehouse ownership and write-back documentation. |
| REV-72 | Create and maintain the unresolved-decision register. |
| REV-73 | Re-run this audit and close remaining consistency, navigation, and build gaps. |

# REV-61 acceptance review

| Acceptance criterion | Result |
|---|---|
| Every identified existing data-related document is inventoried | Met for all data-related documents discovered through current repository search and the supplied architecture reports; REV-62 must confirm the final navigation-level inventory before moves occur. |
| Every expected topic is represented, including missing topics | Met in the inventory and recommended information architecture. |
| No schema object is labeled implemented unless current Dataform confirms it | Met. Broad conceptual dimensions, facts, pickup tables, reports, and marts remain marked for DDL verification. |
| Open decisions are separated from confirmed gaps | Met in the dedicated sections above. |
| Required actions identify revise/create/consolidate/deprecate outcomes | Met in the inventory tables and information-architecture recommendations. |
| Audit committed under `apps/docs/src/content` | Met at `apps/docs/src/content/internal/audits/data-documentation-baseline.md`. |

# Maintenance note

REV-73 should update this audit after the subject-area documentation is complete. This file should remain an internal audit artifact rather than becoming the public canonical explanation of the data platform.
