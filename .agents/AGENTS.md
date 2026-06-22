# Agent Instructions



Before changing Next.js code:
1. Use the next-devtools MCP server when available.
2. Check the running dev server for current errors and route context.
3. Use version-matched Next.js documentation/context rather than relying on memory.
4. Prefer project conventions already present in this repo.
5. Explain which MCP context was used before making broad architectural changes.
6. Review ./docs


Repo Rule: Path Aliases and Next.js Configuration

This repo uses Next.js with TypeScript. Path aliases must be managed consistently so agents do not create conflicting alias definitions across multiple config files.

Source of Truth

tsconfig.json is the source of truth for TypeScript and application import path aliases.

Use:

{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}

Add or modify aliases in tsconfig.json first.

Do not duplicate the same alias mappings in next.config.mjs unless there is a specific documented runtime/build reason.

Next.js Behavior

Next.js natively supports baseUrl and paths from tsconfig.json / jsconfig.json.

For normal imports like:

import { Button } from "@/components/Button";
import { cn } from "@/lib/utils";

do not add matching webpack aliases in next.config.mjs.

Correct:

// tsconfig.json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"],
      "@/components/*": ["./src/components/*"],
      "@/lib/*": ["./src/lib/*"]
    }
  }
}

Correct:

// next.config.mjs
/** @type {import('next').NextConfig} */
const nextConfig = {};

export default nextConfig;

Incorrect unless explicitly justified:

// next.config.mjs
config.resolve.alias["@"] = path.resolve("./src");
config.resolve.alias["@/components"] = path.resolve("./src/components");
config.resolve.alias["@/lib"] = path.resolve("./src/lib");
Workspace Packages

If this repo imports local workspace packages, prefer package-level imports and transpilePackages.

Example:

// next.config.mjs
/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@repo/ui"]
};

export default nextConfig;

Do not solve workspace package issues by creating broad webpack aliases unless transpilePackages is insufficient and the reason is documented.

When Another Tool Needs Alias Support

If another tool does not understand tsconfig.json paths, configure that tool to read from tsconfig.json instead of duplicating aliases manually.

Use the appropriate adapter:

ESLint:
eslint-import-resolver-typescript

Jest:
pathsToModuleNameMapper from ts-jest

Vitest / Vite:
vite-tsconfig-paths

Webpack-only tools:
tsconfig-paths-webpack-plugin

Node / ts-node scripts:
tsconfig-paths
Required Agent Behavior

Before changing path aliases, an agent must:

Inspect tsconfig.json.
Inspect next.config.mjs.
Determine whether the alias is needed for TypeScript/app imports or for a non-TypeScript tool.
Update tsconfig.json first for app imports.
Avoid duplicating aliases in next.config.mjs.
If duplication is unavoidable, add a comment explaining why.
Do Not Do This

Do not create fake nested compiler option blocks.

Incorrect:

{
  "compilerOptions/*": {
    "paths/*": {
      "@/*/*": ["./src/*"]
    }
  }
}

Do not comment out or mutate real JSON keys like:

"compilerOptions/*"
"paths/*"

Do not add wildcard aliases that do not match TypeScript/Next.js expectations.

Incorrect:

"@/*/*": ["./src/*"]

Use:

"@/*": ["./src/*"]
Preferred Alias Pattern

Use a small, boring alias map.

Recommended:

{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"],
      "@/components/*": ["./src/components/*"],
      "@/lib/*": ["./src/lib/*"],
      "@/hooks/*": ["./src/hooks/*"],
      "@/types/*": ["./src/types/*"]
    }
  }
}

Avoid creating too many aliases unless there is a clear architectural reason.

If next.config.mjs Needs Aliases

Only add webpack aliases in next.config.mjs if there is a documented reason that tsconfig.json paths do not cover.

If required, centralize aliases in one helper file instead of manually duplicating values.

Example:

// aliases.mjs
import path from "node:path";

export const aliases = {
  "@": path.resolve(process.cwd(), "src")
};
// next.config.mjs
import { aliases } from "./aliases.mjs";

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack(config) {
    config.resolve.alias = {
      ...config.resolve.alias,
      ...aliases
    };

    return config;
  }
};

export default nextConfig;

Add a comment explaining why this exists.

Validation Commands

After changing path aliases, run:

npm run lint
npm run typecheck
npm run build

If this repo does not have one of those scripts, run the closest available equivalent and document what was skipped.

Also run:

cat tsconfig.json
cat next.config.mjs

and confirm aliases are not duplicated unnecessarily.

Change Notice Requirement

If an agent changes alias strategy, it must include a change notice in the final response.

Format:

Change notice

Old:
<previous alias/config behavior>

New:
<new alias/config behavior>

Why:
<specific reason>

Files changed:
<file list>
Default Decision

When in doubt:

tsconfig.json owns path aliases.
next.config.mjs should not duplicate them.



  # Skill Awareness and Routing Instructions
  
  This repo includes specialized agent skills under `/.agents/skills`. The main agent must be aware of these skills and use them intentionally based on the task type.
  
  Do not load every skill by default. Select the smallest relevant skill group for the current task, then read that skill’s `SKILL.md` or primary instruction file before making changes.
  
  ## Skill Directory Groups
  
  ### 1. Evaluation, QA, and Agent Reliability
  
  Use these skills when reviewing work quality, checking agent output, validating implementation decisions, or creating evaluation criteria.
  
  ```text
  /.agents/skills/agentic-eval
  /.agents/skills/ui-layout-analyzer
  ```
  
  Use cases:
  
  ```text
  - Evaluating whether an agent completed a task correctly
  - Reviewing UI layout quality
  - Checking visual consistency, spacing, hierarchy, alignment, or component composition
  - Creating pass/fail criteria for agent-generated work
  - Auditing whether a frontend implementation matches a brief or design intent
  ```
  
  Routing rule:
  
  ```text
  If the task is about judging, reviewing, scoring, validating, or diagnosing quality, use the evaluation/QA skills before making recommendations.
  ```
  
  ---
  
  ### 2. Data, Analytics, and Storage
  
  Use these skills when working with databases, analytics pipelines, SQL, data modeling, reporting, or backend persistence.
  
  ```text
  /.agents/skills/big-query
  /.agents/skills/postgresql
  /.agents/skills/data-storytelling
  ```
  
  Use cases:
  
  ```text
  - BigQuery schemas, queries, views, pipelines, or metric tables
  - PostgreSQL schemas, migrations, indexes, constraints, and SQL scripts
  - Data warehouse design
  - Transforming raw data into commercial insights
  - Creating executive summaries, performance narratives, or dashboard explanations
  ```
  
  Routing rule:
  
  ```text
  If the task involves SQL, tables, metrics, reporting, revenue analytics, warehouse modeling, or data interpretation, use the data/analytics skills.
  ```
  
  Selection guidance:
  
  ```text
  Use big-query for BigQuery-specific work.
  Use postgresql for PostgreSQL-specific work.
  Use data-storytelling when the output needs to explain what the data means to humans.
  ```
  
  ---
  
  ### 3. Next.js, App Architecture, and Monorepo Structure
  
  Use these skills when working on Next.js apps, app-router structure, repo architecture, package boundaries, build configuration, or Turborepo workflows.
  
  ```text
  /.agents/skills/next.js
  /.agents/skills/next-best-practices
  /.agents/skills/next-forge
  /.agents/skills/turborepo
  ```
  
  Use cases:
  
  ```text
  - Next.js app router work
  - Route handlers, server components, client components, metadata, caching, layouts, and loading states
  - Next.js config files such as next.config.mjs
  - TypeScript path aliases in tsconfig.json
  - Monorepo package boundaries
  - Turborepo tasks, caching, build pipelines, and workspace dependency issues
  - Next Forge conventions or structure
  ```
  
  Routing rule:
  
  ```text
  If the task touches Next.js, app architecture, repo structure, workspace packages, build tooling, or routing, use the Next.js/architecture skills first.
  ```
  
  Special alias/config rule:
  
  ```text
  For Next.js path aliases, treat tsconfig.json as the source of truth. Do not duplicate path aliases in next.config.mjs unless there is a specific documented runtime/build reason.
  ```
  
  Selection guidance:
  
  ```text
  Use next.js for general Next.js implementation.
  Use next-best-practices for architectural decisions and framework conventions.
  Use next-forge when this repo follows or references Next Forge patterns.
  Use turborepo for monorepo, package, workspace, task, and build-pipeline issues.
  ```
  
  ---
  
  ### 4. Frontend Design, UI Direction, and Visual Systems
  
  Use these skills when designing interfaces, translating product intent into UI direction, defining visual systems, or improving look and feel.
  
  ```text
  /.agents/skills/front-end-design
  /.agents/skills/frontend-design
  /.agents/skills/ui-layout-analyzer
  /.agents/skills/tailwind-theme-builder
  ```
  
  Use cases:
  
  ```text
  - Creating a modern visual direction
  - Improving layout, hierarchy, spacing, polish, and visual rhythm
  - Designing dashboards, portals, admin screens, landing pages, or product UI
  - Building or refining design systems
  - Translating brand direction into Tailwind theme tokens
  - Reviewing whether UI feels premium, modern, and consistent
  ```
  
  Routing rule:
  
  ```text
  If the task is primarily about look, feel, layout, UI quality, brand expression, or visual system decisions, use the frontend design skills before coding.
  ```
  
  Duplicate skill note:
  
  ```text
  Both front-end-design and frontend-design exist. Check both only if needed, but prefer the more complete or more recently maintained skill. Do not assume they are identical.
  ```
  
  ---
  
  ### 5. Frontend Development and Component Implementation
  
  Use these skills when building or modifying React components, frontend features, component libraries, or implementation-level UI code.
  
  ```text
  /.agents/skills/front-end-developer
  /.agents/skills/building-components
  /.agents/skills/shadcn
  /.agents/skills/shadcn-ui
  /.agents/skills/shadcn-component-discovery
  ```
  
  Use cases:
  
  ```text
  - Building React components
  - Refactoring existing UI components
  - Implementing component props, states, variants, and accessibility
  - Working with shadcn/ui components
  - Discovering which shadcn component should be used
  - Composing reusable UI patterns
  - Converting a design direction into working frontend code
  ```
  
  Routing rule:
  
  ```text
  If the task requires writing or modifying frontend component code, use the frontend development/component skills.
  ```
  
  Selection guidance:
  
  ```text
  Use front-end-developer for general React/TypeScript frontend implementation.
  Use building-components for reusable component structure, props, variants, and composition.
  Use shadcn or shadcn-ui for shadcn implementation patterns.
  Use shadcn-component-discovery when deciding which shadcn component best fits the task.
  ```
  
  ---
  
  ### 6. Tailwind, Styling, Layout, and Theme Systems
  
  Use these skills when styling UI, building responsive layouts, configuring Tailwind, or working with Tailwind v4 and shadcn integration.
  
  ```text
  /.agents/skills/tailwind-theme-builder
  /.agents/skills/tailwind-v4-shadcn
  /.agents/skills/tailwindcss-advanced-layouts
  /.agents/skills/shadcn-ui
  ```
  
  Use cases:
  
  ```text
  - Tailwind theme tokens
  - Tailwind v4 configuration
  - shadcn + Tailwind integration
  - Responsive layouts
  - Grid/flex layouts
  - Complex dashboard layouts
  - CSS variable systems
  - Dark mode or themeable UI
  ```
  
  Routing rule:
  
  ```text
  If the task is primarily about styling, layout mechanics, Tailwind configuration, theme tokens, or shadcn/Tailwind compatibility, use the Tailwind styling skills.
  ```
  
  Selection guidance:
  
  ```text
  Use tailwind-theme-builder for design tokens and theme setup.
  Use tailwind-v4-shadcn for Tailwind v4 + shadcn-specific compatibility.
  Use tailwindcss-advanced-layouts for complex responsive layouts.
  Use shadcn-ui when shadcn component styling is involved.
  ```
  
  ---
  
  ## Combined Task Routing
  
  Many tasks require more than one skill group. Use the following combinations.
  
  ### Building a new polished Next.js UI feature
  
  Use:
  
  ```text
  1. next.js or next-best-practices
  2. front-end-design or frontend-design
  3. building-components
  4. shadcn-ui or shadcn-component-discovery
  5. tailwind-v4-shadcn or tailwindcss-advanced-layouts
  ```
  
  ### Fixing a broken Next.js import, alias, build, or package issue
  
  Use:
  
  ```text
  1. next.js
  2. next-best-practices
  3. turborepo, if workspace/package-related
  ```
  
  Do not solve path alias problems by duplicating aliases in multiple config files. Inspect `tsconfig.json` first.
  
  ### Creating a dashboard or data-heavy UI
  
  Use:
  
  ```text
  1. big-query or postgresql, depending on source
  2. data-storytelling
  3. front-end-design
  4. building-components
  5. tailwindcss-advanced-layouts
  ```
  
  ### Reviewing UI quality from a screenshot or implemented page
  
  Use:
  
  ```text
  1. ui-layout-analyzer
  2. front-end-design or frontend-design
  3. tailwindcss-advanced-layouts, if layout fixes are needed
  ```
  
  ### Creating or revising shadcn components
  
  Use:
  
  ```text
  1. shadcn-component-discovery
  2. shadcn-ui or shadcn
  3. building-components
  4. tailwind-v4-shadcn
  ```
  
  ### Auditing another agent’s output
  
  Use:
  
  ```text
  1. agentic-eval
  2. ui-layout-analyzer, if UI-related
  3. the relevant domain skill for the work being evaluated
  ```
  
  ---
  
  ## Required Main Agent Behavior
  
  Before starting implementation, the main agent must:
  
  ```text
  1. Identify the task category.
  2. Select the smallest relevant skill group.
  3. Read the selected skill files before modifying code.
  4. State which skill group is being applied if the task is complex.
  5. Avoid mixing unrelated skills unless the task clearly requires it.
  6. Preserve existing repo conventions unless a skill explicitly says otherwise.
  7. If skills conflict, prefer the repo’s existing working pattern and document the conflict.
  ```
  
  ## Do Not Overload Context
  
  Do not read every skill for every task.
  
  Incorrect:
  
  ```text
  Task: Fix a Next.js alias bug.
  Reads: all skills.
  ```
  
  Correct:
  
  ```text
  Task: Fix a Next.js alias bug.
  Reads:
  - next.js
  - next-best-practices
  - turborepo, only if workspace package paths are involved
  ```
  
  ## Duplicate or Overlapping Skills
  
  Some skills overlap:
  
  ```text
  front-end-design
  frontend-design
  
  shadcn
  shadcn-ui
  
  next.js
  next-best-practices
  next-forge
  ```
  
  When overlapping skills exist:
  
  ```text
  1. Prefer the skill with the most specific match to the task.
  2. Check both only when the first skill is incomplete or ambiguous.
  3. Do not merge conflicting guidance silently.
  4. If guidance conflicts, explain the difference and follow existing repo conventions.
  ```
  
  ## Default Skill Selection Map
  
  ```text
  Data warehouse / SQL:
  big-query, postgresql
  
  Data explanation:
  data-storytelling
  
  Next.js app work:
  next.js, next-best-practices
  
  Next Forge:
  next-forge
  
  Monorepo / workspace / build pipeline:
  turborepo
  
  Frontend implementation:
  front-end-developer, building-components
  
  Frontend visual design:
  front-end-design, frontend-design
  
  UI review:
  ui-layout-analyzer
  
  shadcn component work:
  shadcn, shadcn-ui, shadcn-component-discovery
  
  Tailwind themes:
  tailwind-theme-builder
  
  Tailwind v4 + shadcn:
  tailwind-v4-shadcn
  
  Advanced layouts:
  tailwindcss-advanced-layouts
  
  Agent output evaluation:
  agentic-eval
  ```
  
  ## Final Response Requirement
  
  When a task used skills, the agent should summarize skill usage briefly:
  
  ```text
  Skill usage:
  - Used next.js for framework conventions.
  - Used turborepo for workspace/package resolution.
  - Used building-components for component structure.
  ```
  
  If no skill was necessary, the agent may omit this section.
  
  ## Core Principle
  
  Use skills as targeted operating instructions, not as bulk context.
  
  The main agent must route work through the correct skill group, preserve repo conventions, and avoid creating duplicate or conflicting patterns across the codebase.

### Icon Usage Rules

Before adding a new Tabler icon, check docs/icon-inventory.md first.

If an existing icon already represents the intended action or concept, reuse it.

Only introduce a new icon when:
1. no existing icon matches the intended meaning,
2. the new icon improves clarity,
3. and docs/icon-inventory.md is updated in the same change.


---
# Themes

  @styles/globals.css
  Main Storybook and application stylesheet entry point
  
  @styles/theme-reference.css
  Tailwind @theme mappings and Metrics design tokens
  Already loaded through globals.css
  
  @styles/tailwind-reference.css
  Lightweight reference stylesheet
  Not required in Storybook preview when globals.css is loaded