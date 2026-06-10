# Agent Instructions

Before changing Next.js code:
1. Use the next-devtools MCP server when available.
2. Check the running dev server for current errors and route context.
3. Use version-matched Next.js documentation/context rather than relying on memory.
4. Prefer project conventions already present in this repo.
5. Explain which MCP context was used before making broad architectural changes.



Repo Rule: Path Aliases and Next.js Configuration

This repo uses Next.js with TypeScript. Path aliases must be managed consistently so agents do not create conflicting alias definitions across multiple config files.

Source of Truth

tsconfig.json is the source of truth for TypeScript and application import path aliases.

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