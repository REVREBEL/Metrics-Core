# Task: Inventory Tabler Icons Usage Across Repo

## Objective

Search the repo for all Tabler icon usage and create a centralized inventory of the icons currently used across components. The goal is to keep icon usage consistent across the UI and avoid agents introducing duplicate, mismatched, or stylistically inconsistent icons.

## Scope

Search for all imports and usages from Tabler icon packages, including but not limited to:

```text
@tabler/icons-react
@tabler/icons
tabler-icons
```

Also search for direct icon component usage patterns such as:

```text
Icon*
<Icon*
```

## Required Search Targets

Inspect these file types:

```text
.ts
.tsx
.js
.jsx
.mdx
.md
```

Prioritize:

```text
apps/**
packages/**
components/**
src/**
registry/**
```

Ignore generated/build folders:

```text
node_modules
.next
dist
build
coverage
playwright-report
.turbo
.vercel
```

## Deliverable

Create a markdown inventory file:

```text
docs/icon-inventory.md
```

The file should include:

## 1. Summary

Include:

```text
Total unique Tabler icons used:
Total files using Tabler icons:
Most common icons:
Potential duplicates / near-equivalents:
```

## 2. Icon Inventory Table

Create a table with the following columns:

```text
Icon Name
Import Source
Files Used In
Component / Feature Area
Usage Context
Recommended Status
Notes
```

Example:

```markdown
| Icon Name | Import Source | Files Used In | Component / Feature Area | Usage Context | Recommended Status | Notes |
|---|---|---|---|---|---|---|
| IconSearch | @tabler/icons-react | components/search-input.tsx | Search | Search input prefix icon | Keep | Standard search affordance |
| IconPlus | @tabler/icons-react | components/add-button.tsx | Actions | Add/create action | Keep | Use consistently for create actions |
```

## 3. Icon Consistency Rules

After inventorying current usage, add a consistency guide:

```text
Search:
Use IconSearch

Add/Create:
Use IconPlus

Edit:
Use IconEdit or chosen existing edit icon

Delete/Remove:
Use IconTrash or chosen existing destructive icon

Settings:
Use IconSettings

User/Profile:
Use selected existing user icon

External Link:
Use selected existing external-link icon

Chevron/Disclosure:
Use selected existing chevron icon

Calendar/Date:
Use selected existing calendar icon

Alert/Error:
Use selected existing alert icon
```

Only define rules based on icons that are actually found in the repo unless a missing category clearly needs a recommendation.

## 4. Duplicate / Inconsistent Icon Findings

Flag cases where multiple icons appear to be used for the same meaning.

Examples:

```text
IconPlus vs IconCirclePlus for create actions
IconTrash vs IconTrashX for delete actions
IconSettings vs IconAdjustments for settings/config
IconExternalLink vs IconArrowUpRight for outbound links
IconChevronDown vs IconCaretDown for disclosure
```

For each duplicate, recommend one standard icon and explain why.

## 5. Required Agent Rule

Add the following rule to the main agent guidance:

```text
Before adding a new Tabler icon, check docs/icon-inventory.md first.

If an existing icon already represents the intended action or concept, reuse it.

Only introduce a new icon when:
1. no existing icon matches the intended meaning,
2. the new icon improves clarity,
3. and docs/icon-inventory.md is updated in the same change.
```

## Implementation Guidance

Use command-line search first.

Recommended commands:

```bash
rg "@tabler/icons" .
rg "Icon[A-Z][A-Za-z0-9]*" apps packages components src registry --glob "*.{ts,tsx,js,jsx,mdx,md}"
```

For imports specifically:

```bash
rg "import .*Icon.* from ['\"]@tabler/icons-react['\"]" .
rg "from ['\"]@tabler/icons-react['\"]" .
```

For JSX usage:

```bash
rg "<Icon[A-Z][A-Za-z0-9]*" apps packages components src registry --glob "*.{tsx,jsx,mdx}"
```

## Acceptance Criteria

This task is complete when:

```text
- All Tabler icon imports are identified.
- All direct Tabler icon component usages are identified.
- docs/icon-inventory.md exists.
- Icon usage is grouped by purpose and feature area.
- Duplicate or inconsistent icon choices are flagged.
- Recommended standard icons are documented.
- Main agent instructions include the rule to check the inventory before adding new icons.
```

## Do Not

Do not replace icons during this task unless explicitly requested.

Do not introduce new icons.

Do not refactor components.

Do not change visual design.

This task is an inventory and consistency audit only.
