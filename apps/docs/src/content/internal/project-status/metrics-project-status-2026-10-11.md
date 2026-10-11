# Metrics Project Status Brief — October 11, 2026

**Purpose:** Voice-ready handoff describing where Metrics stands today, what is actually implemented, what remains unresolved, and a proposed sequence of ten next steps.

**Status language used in this brief:** IMPLEMENTED, PLANNED, COMPATIBILITY, DEPRECATED, UNRESOLVED.

## The Brief

Metrics is no longer merely a dashboard concept. Linear defines it as the Hotel Strategy Execution Platform, and the current architecture is a broader Commercial OS with Core Workspaces for Metrics, Commercial Plan, Growth Plan, Broadcast, Metrics Library, Playbook, Threads, and Help Desk, plus a separate protected Mission Control layer.

The project is in an important transition point. The foundational shell, documentation baseline, component/distribution architecture, and a surprisingly mature Data Library governance path are already in place. The next wave of product work is not blocked by a lack of screens. It is blocked by three core contracts that need to become real and durable:

1. authenticated organization/workspace/property/engagement context;
2. governed metric definitions and semantic contracts;
3. an approved production analytical serving/query contract.

Once those three are resolved, the first production Metrics Dashboard slice, Commercial Plan, and Growth Plan can move from scaffolded/planned work into connected product workflows.

There is also a project-tracking mismatch that should be corrected. Linear currently shows all Metrics parent projects as Planned, even though many foundation, Data Library, and data-documentation issues are complete and their implementation exists in the repository. The issue-level truth and repository are materially ahead of the project-level status labels.

## Sources Reviewed

This brief was prepared from the current project source hierarchy rather than prior assistant summaries alone:

- Linear Metrics initiative and the relevant projects/issues, including REV-8, REV-9, REV-10, REV-74 through REV-79, REV-93 through REV-99.
- Current REVREBEL/Metrics-Core repository state, including main/dev branch context, active PRs, packages/db, packages/data, Data Library feature code, workspace context, Docs Library, Storybook/registry architecture, and CI.
- Current Dataform implementation. Metrics-Core does not currently expose packages/dataform in the checked repository state, so the synchronized REVREBEL/Metrics-Dataform repository was used as the implementation source according to the project memory rule.
- Current maintained architecture documentation under apps/docs/src/content.
- The Metrics internal project memory and repository operating instructions.

## Where the Project Is Today

### 1. Product structure is defined

Linear defines the active Metrics initiative around twelve projects:

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
11 — Data Architecture Documentation

The intended application shell is also settled conceptually: Context → Workspace Navigation → Explorer | Canvas | Inspector.

The architectural direction is strong enough that the next work should focus on connecting real scope, semantics, and data rather than rethinking the overall product map.

### 2. The repository foundation is substantially implemented

Linear defines dev as the base/integration branch for current Metrics implementation work. GitHub’s repository default branch is still main, and both main and dev exist. This is not a contradiction so long as implementation continues to branch from and merge into dev before promotion.

Completed foundation work includes the root App Router layout and providers, redirect and system boundaries, temporary workspace context contracts, workspace shell/context controls, Mission Control/auth/system route boundaries, application architecture documentation, developer scripts, UI/Storybook/registry CI foundations, and route-boundary smoke validation.

One foundation item is still open: REV-93, which corrects the UI validation workflow. GitHub PR #172 is open, targets dev, and is currently mergeable. It removes package-wide UI lint as a merge blocker and corrects the focused barrel/icon validation commands while retaining the Storybook build.

This matters because REV-93 explicitly blocks REV-94, the authenticated workspace-context issue.

### 3. The Data Library is one of the most mature product areas

The Data Library / governance workflow has moved well beyond mockups.

Implemented issue chain:

- REV-74: generic lookup and mapping table management framework.
- REV-75: live Data Library row reads and generic grid.
- REV-76: application-database-backed draft editing.
- REV-77: change-request submission and review workflow.
- REV-78: controlled publication, audit logging, and conflict checks.
- REV-95 / REV-79A: expanded verified registry coverage.

The repository now contains a real Data Library feature boundary, a server-side read path, application persistence, change-request workflow, controlled publication service, audit logging, and per-table capability metadata.

packages/db currently implements the application-owned persistence needed for this workflow, including Data Library table metadata, draft edits, users/roles, audit logging, lookup change requests, and request items.

packages/data now exists and exposes Data Library and server/Data Library boundaries. This is important because older documentation that said packages/data was absent is no longer current implementation truth.

The current registry on dev includes verified governed table definitions such as segment group, segment, finance segment, segment mapping, source, subsource, and channel-group families, with table-specific keys, editable fields, dependencies, permissions, publication support, and concurrency status.

Not every registered table is writable. That is deliberate. For example, map_segment has supported controlled publication with conflict protection, while several lookup tables are still marked publication-deferred because updated_date is nullable and is not yet a reliable concurrency/version token.

That is a healthy pattern: capability claims are being made table by table rather than pretending the generic framework makes every warehouse object safely editable.

### 4. The Data Library still has one conspicuous unfinished promise

Linear marks REV-79, “Expand Data Library table coverage and add unmapped-values workflow,” as Done.

However, its child REV-96, “Implement real unmapped-values detection and governed resolution workflow,” was canceled.

So the accurate status is:

- Expanded registry coverage: IMPLEMENTED.
- Generic governed Data Library workflow: IMPLEMENTED for supported tables.
- Real unmapped-values detection/resolution queue: NOT IMPLEMENTED.

The parent issue status therefore overstates the delivered scope. A successor issue should be created or REV-79 should be reconciled so future planning does not assume the unmapped-values capability already exists.

### 5. Authenticated workspace scope is still fixture-based

REV-94 is the biggest product-level dependency right now.

The current WorkspaceProvider still defaults to fixture workspace scope. Linear explicitly calls out hard-coded organization, workspace, hotel, and engagement records as current reality.

REV-94 is intended to replace that with server-resolved, authenticated organization/workspace/property/engagement context, permitted selector lists, safe no-access states, and property references tied to the governed warehouse property identity.

This is not merely an authentication enhancement. It is the scope contract that Commercial Plan, Growth Plan, Broadcast, Playbook, Metrics Dashboard, and governance workflows all need.

REV-94 is currently blocked by REV-93.

### 6. The semantic metric layer is documented but not yet implemented

REV-8 remains Backlog.

The documentation has already established the need for governed metric definitions, including stable keys, formulas/calculation contracts, source fields, grain, aggregation behavior, allowed dimensions, formatting, null/divide-by-zero behavior, compatibility/deprecation, and version/publication metadata where applicable.

But a durable repository-owned semantic contract has not yet been selected and implemented.

Linear intentionally leaves the canonical owner open until current sources are reconciled. Possible ownership could be code/configuration, application database records, Dataform/warehouse metadata, a dedicated package, or a hybrid. The project specifically says not to create packages/metrics or a metric_definitions table merely because older documents referenced them.

REV-8 blocks the first Dashboard slice, the first Commercial Plan slice, the first Growth Plan slice, and the Metrics Library metric catalog/detail UI.

This makes REV-8 the second major gate after authenticated scope.

### 7. The production analytical serving architecture is still unresolved

REV-10 remains Backlog.

Linear explicitly replaced the older assumption that a daily BigQuery → DuckDB file sync was already approved. Current repository implementation proves a server-side BigQuery/data boundary exists, but it does not prove a completed DuckDB runtime, refresh pipeline, or production file lifecycle.

The project still needs an explicit production serving decision among options such as:

- server-side BigQuery queries with application caching;
- server-side DuckDB materialization/serving;
- scheduled extracted files/snapshots consumed by DuckDB;
- another repository-supported serving pattern.

Whatever is selected, BigQuery/Dataform remains canonical analytical truth. The serving layer can optimize access but must not own formulas, mappings, metric identity, or warehouse semantics.

This decision is directly related to REV-97, the first production Metrics Dashboard slice.

### 8. The first production Metrics Dashboard slice has not started

REV-97 is Backlog.

Its scope is intentionally narrow and well chosen: Overview + Segments, using real authenticated property context, governed metric definitions, current segment mappings/dimensions, and the selected server-side analytical contract.

It is blocked by REV-94 and REV-8, and related to REV-10 and REV-9.

This means the dashboard should not be the very next implementation ticket. Doing it first would force the UI to invent scope, semantic, or serving assumptions that the architecture is specifically designed to prevent.

### 9. Commercial Plan and Growth Plan are planned but dependency-aware

REV-98 is the first durable Commercial Plan Budget/Forecast slice. It is blocked by REV-94 and REV-8.

Its architecture correctly keeps planning workflow state in the application database while BigQuery/Dataform remains the source of truth for actual performance and governed analytical identity.

REV-99 is the first Growth Plan Initiative execution slice. It is blocked by REV-94, REV-98, and REV-8. It then becomes a dependency for the later Broadcast and Playbook contracts.

This creates a sensible product dependency chain:

Authenticated scope + governed metrics  
→ Commercial Plan  
→ Growth Plan  
→ Broadcast / Playbook

### 10. Data architecture documentation is unusually strong, but effective DDL still needs discipline

Project 11 has completed most of the canonical data-documentation work: naming/modeling conventions, mappings/lookups, dimensions/facts, pickup modeling, reporting views/marts, Metrics Library governance, lineage/freshness, app-vs-warehouse ownership, unresolved decision register, and final baseline validation.

That documentation is useful because it explicitly distinguishes implemented, planned, compatibility, deprecated, and unresolved architecture.

However, Dataform still contains compatibility/evolution complexity that should not be hidden.

For example, the current standalone Dataform repository contains both an older core-table map_segment definition and a newer normalized segment-table definition. Both use CREATE TABLE IF NOT EXISTS, but they describe materially different physical shapes. The application registry aligns with the newer normalized shape.

That does not necessarily mean production is broken, but it does mean effective-DDL order, migrations, and schema-contract validation must remain part of every warehouse-facing implementation. The application registry cannot be treated as proof of the deployed schema.

The room-type model also remains a compatibility area: there is no verified implemented lkp_roomtype; room taxonomy is currently carried through map_roomtype and dim_roomtype.

### 11. Component distribution and visual documentation responsibilities are settled

The design-system architecture is clear:

- packages/ui owns the reusable design-system source.
- apps/registry owns shadcn distribution and installation contracts.
- apps/storybook owns real visual development, examples, Controls, Autodocs, and isolated rendering.

Storybook should render real components and should not be replaced by an expanded fake registry preview system. The custom registry preview path should not grow into a parallel Storybook.

This is an area where the architecture should be preserved rather than redesigned.

## What Has Been Done

### Platform / application foundation

IMPLEMENTED:
- Next.js App Router foundation.
- Root providers and shared styles.
- Core workspace route structure.
- Mission Control/auth/error route separation.
- Workspace shell and context controls.
- Route-boundary validation.
- Developer script repairs.
- Repository/agent operating guidance.
- Storybook/registry CI groundwork.

PARTIAL:
- Workspace context exists, but production defaults still rely on fixture scope.
- Focused UI CI correction is still open in PR #172 / REV-93.

### Data Library and governance

IMPLEMENTED:
- Generic lookup/mapping table framework.
- Live server-side Data Library reads.
- Generic grid behavior.
- Application-database-backed draft editing.
- Change-request submission/review.
- Permissions and users/roles supporting the workflow.
- Controlled publication for supported tables.
- Audit logging.
- Conflict checks.
- Expanded verified registry coverage.
- Per-table publication and concurrency capability flags.

PARTIAL / DEFERRED:
- Publication for lookup families without a reliable concurrency token.
- Some table families remain read-only/deferred.
- Unmapped-values queue and resolution workflow are not implemented.

### Data platform and documentation

IMPLEMENTED:
- BigQuery/Dataform remains the canonical warehouse contract.
- Current lookup/mapping/dimension/view families exist in Dataform.
- packages/data now exists as a server/data boundary.
- Canonical data documentation and decision register are established.
- Source-specific documentation continues to expand.

UNRESOLVED:
- Final production analytical serving architecture.
- Some Dataform compatibility/effective-schema issues.
- Some normalized taxonomy decisions such as room type.
- Final metric-definition ownership.

### UI component platform

IMPLEMENTED / ESTABLISHED:
- packages/ui as source.
- shadcn registry as distribution.
- Storybook as visual documentation.
- Alias/theme/CVA conventions.
- Real component stories as the preferred preview mechanism.

PLANNED / CONTINUING:
- Broader story generation and coverage where still missing.
- Continued registry/Storybook validation hardening.

## Current Dependency Chain

The cleanest way to think about the project now is:

REV-93 focused UI validation fix  
→ REV-94 authenticated workspace/property/engagement scope

In parallel after the foundation is stable:

REV-8 governed metric semantic contract  
REV-10 analytical serving/query architecture

Then:

REV-97 production Dashboard Overview + Segments  
REV-9 Metrics Library metric catalog/detail  
REV-98 Commercial Plan Budget/Forecast slice

Then:

REV-99 Growth Plan Initiative slice  
→ Broadcast and Playbook implementation contracts

Separately, the Data Library can continue to harden and recover the canceled unmapped-values scope without waiting for every downstream workspace.

## Important Source Differences

### Linear defines...
All twelve parent Metrics projects are currently shown as Planned.

### The repository currently implements...
A meaningful portion of App Foundation, Data Library governance, application persistence, server-side Data Library access, documentation infrastructure, Storybook/registry architecture, and validation tooling.

### Dataform currently implements...
Core warehouse objects including lookup, mapping, dimension, staging/snapshot/view families. Segment DDL confirms the normalized lkp_segment_group, lkp_segment, lkp_finance_segment, map_segment, dim_segment, and vw_segment path. Compatibility definitions still exist and must be reconciled by effective DDL and migration behavior.

### The documentation currently describes...
A much more mature architecture than the parent project status labels suggest, including explicit ownership boundaries and unresolved-decision tracking.

### Decisions still required...
- canonical metric-definition ownership and contract;
- production analytical serving architecture;
- authenticated application scope persistence/resolution;
- safe version/concurrency contract for broader lookup publication;
- successor scope for real unmapped-values detection;
- selected unresolved warehouse taxonomy/mapping decisions.

## Theoretical Next 10 Steps

These are proposed sequencing recommendations, not new approved Linear decisions.

### 1. Close REV-93 and merge the focused UI validation fix

Finish review/validation of PR #172, merge it into dev if it passes, and mark REV-93 complete.

Why first: REV-93 is an explicit blocker for REV-94 and is small relative to the dependency chain it unlocks.

Definition of done:
- PR merged to dev.
- focused UI checks reflect actual package scripts;
- Storybook build remains a gate;
- Linear status reconciled.

### 2. Implement REV-94 authenticated organization/workspace/property/engagement context

Replace production-default fixture scope with server-resolved authenticated scope.

Why second: this is the shared identity/tenancy/property contract for nearly every meaningful product workspace.

Key outcomes:
- real permitted organization/workspace/property/engagement scope;
- app-DB ownership only for application relationships/state;
- canonical property identity linked to warehouse property_code;
- explicit no-access and empty states;
- fixture scope retained only for tests/stories where useful.

### 3. Implement REV-8 governed metric definition and semantic contracts

Choose and implement the canonical metric-definition ownership model after reconciling current code, Dataform, and documentation.

Why third: this prevents every downstream workspace from inventing its own ADR, Occupancy, RevPAR, ALOS, pickup, formatting, grain, or dimension rules.

Start with a small governed set that current warehouse truth supports.

### 4. Resolve REV-10 and approve the production analytical serving architecture

Make the BigQuery/DuckDB decision explicit instead of carrying the old assumption forward.

Define:
- runtime location;
- normalized query contracts;
- caching/materialization behavior;
- refresh and freshness;
- retries/recovery;
- schema validation;
- observability.

The decision should be driven by the production deployment/runtime and actual dashboard workload, not by prior preference for DuckDB.

### 5. Build REV-97, the first real Metrics Dashboard vertical slice

Implement Overview + Segments only after scope, metric semantics, and the data-serving contract are ready.

Prove the whole chain:

authenticated property scope  
→ governed metric identity  
→ approved server-side query contract  
→ real warehouse data  
→ reusable visual components  
→ truthful loading/empty/stale/error states.

This becomes the template for Channels, Room Types, Demand, Website, and later analytics surfaces.

### 6. Build REV-9 Metrics Library metric catalog and detail experience

Once REV-8 has a canonical definition source, expose it in the Metrics Library.

This should make metric governance visible rather than burying definitions in docs/code.

Users should be able to inspect formula/contract, source fields, grain, aggregation, dimensions, formatting, lineage, and status without the UI duplicating those definitions.

### 7. Restore the missing unmapped-values capability as a new scoped issue

Do not assume REV-79 delivered this because the parent is Done. REV-96 was canceled.

Create a successor based on current authenticated scope and current Dataform contracts.

Start with one domain, likely segments or sources, where real source values and current mappings can be compared deterministically.

Avoid AI-generated mappings initially. The first version should prioritize detection, materiality, draft creation, duplicate prevention, and resolution after publication.

### 8. Harden and expand Data Library publication capability

Resolve safe concurrency/versioning for lookup tables, then expand publish support only where schema and adapters can guarantee it.

Also continue:
- schema-contract validation;
- dependency validation;
- explicit read-only/deferred states;
- remaining verified table-family coverage;
- Dataform compatibility cleanup where necessary.

This is a better next step than simply increasing the table count.

### 9. Implement REV-98 first Commercial Plan Budget/Forecast slice

With authenticated scope and governed metrics available, create the first durable planning records in the application database.

Keep:
- actuals in BigQuery/Dataform;
- planning drafts/versions/workflow in app persistence;
- metric definitions referenced, not copied;
- later publication/write-back explicit rather than implicit.

Prove create → edit → save → reopen → compare-to-actual for a narrow metric set.

### 10. Implement REV-99 first Growth Plan Initiative execution slice

Use the Commercial Plan foundation to create the first durable Initiative + task + goal workflow.

Reference governed metrics for goals and the approved analytical boundary for snapshots.

Do not implement Broadcast campaign state or Playbook templates inside Growth Plan. Instead, establish clean handoff contracts that unlock those workspaces next.

## Recommended Project-Management Cleanup

This is not one of the ten product steps, but it should happen alongside them.

Reconcile Linear parent project statuses and issue relationships so the portfolio view reflects reality. Today, “Planned” at the project level hides large bodies of completed implementation. REV-79 also needs a status/scope note because its unmapped-values child was canceled.

A clearer project-level view would make future prioritization much easier and prevent already-completed work from being rediscovered.

## Key Risks to Watch

1. **Scope before identity:** building Dashboard, Commercial Plan, or Growth Plan before REV-94 would hard-code another temporary property/workspace model.
2. **UI-owned formulas:** building product metrics before REV-8 would recreate business rules in components.
3. **Serving-layer drift:** implementing DuckDB simply because it appears in the project name would turn an old assumption into architecture without a current runtime decision.
4. **Registry-as-schema:** Data Library registry metadata must never substitute for effective Dataform DDL.
5. **Compatibility DDL:** duplicate/evolving CREATE TABLE IF NOT EXISTS definitions can mask which schema actually exists in an environment.
6. **False completion:** parent issue/project statuses can imply capabilities that are not delivered, as seen with unmapped values.
7. **Over-expanding generic governance:** a table should remain deferred/read-only until publication and concurrency are genuinely safe.

## Suggested Voice Prompts

While driving, use the Google Drive copy of this brief and ask:

“Open ‘Metrics Project Status Brief — October 11, 2026’ from my ChatGPT Drive folder and give me the 90-second status.”

“Using the Metrics Project Status Brief, walk me through the ten recommended next steps in order and explain what each one unlocks.”

“Using that brief, tell me the three things blocking the first real Metrics Dashboard.”

“Using that brief, explain what is already implemented in the Metrics Library versus what is still missing.”

“Using that brief, help me decide whether REV-8 or REV-10 should run first, or whether they can run in parallel.”

## Final Thoughts

Metrics has crossed the line from architecture exercise into a partially implemented platform. The most valuable work now is not another broad round of UI construction. It is converting three foundational contracts into durable implementation: authenticated scope, metric semantics, and production analytical serving.

The Data Library proves the architecture can support governed, production-shaped workflows. The next phase should apply the same discipline to identity, metrics, and analytical consumption. Once those pieces are real, the Dashboard, Commercial Plan, and Growth Plan can advance without borrowing truth from fixtures or duplicating logic in the UI.
