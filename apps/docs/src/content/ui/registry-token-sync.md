# UI Registry Token Sync

The Metrics UI registry includes an expanded token sync step so the published registry theme contains the broader Metrics design token system, not only the minimal shadcn theme variables.

## Command

Run from the monorepo root:

```bash
pnpm --filter @repo/ui run registry:tokens:sync
```

## Script

```txt
packages/ui/scripts/registry-tokens-sync.mjs
```

## Purpose

The token sync script reads CSS custom properties from the UI token source files and merges them into the `registry.json` theme `cssVars`.

This gives agents, registry consumers, and generated UI code access to the same token vocabulary used by the Metrics UI package.

## Build pipeline position

`registry:tokens:sync` runs inside the composed registry build pipeline after metadata sync and manifest sync, but before the shadcn registry build.

```txt
registry:sync
registry:manifest:sync
registry:tokens:sync
pnpm dlx shadcn@latest build
```

Team command:

```bash
pnpm --filter @repo/ui run registry:build
```

## What token sync does

The token sync script:

1. Reads the UI CSS token source files.
2. Extracts CSS custom properties.
3. Merges expanded token variables into the registry theme `cssVars.light` and `cssVars.dark` objects.
4. Preserves existing registry theme values where appropriate.
5. Writes the expanded registry theme back to `registry.json`.

## Verification output

First successful run:

```txt
registry:tokens:sync merged 566 vars from CSS, added 533 to light and 533 to dark.
```

## Token families covered

Expanded token sync is intended to include:

- Base brand color families
- Color scale aliases
- Chart colors
- Sidebar and surface tokens
- Semantic Metrics tokens
- Indicator tokens
- Segment tokens
- Channel tokens
- Social tokens
- Review tokens
- Lookup-aware tokens
- Component-facing aliases

## Canonical token naming

Use canonical token names in expanded registry output.

For light green, the canonical token is:

```txt
--color-light-green
```

Do not add the broken misspelled token as a fallback in new generated registry output:

```txt
--color-lght-green
```

That misspelled token does not work reliably and should not be used by agents, registry consumers, or new component code.

## Authoring rule

When adding new tokens:

- Add the canonical token to the source CSS token file.
- Use complete token families when relevant: `normal`, `inverse`, and `var` for semantic source tokens.
- Keep broken or deprecated aliases out of generated registry output unless there is an intentional migration decision.
- Run `registry:tokens:sync` after token source changes.
- Run `registry:build` before publishing or deploying registry changes.

## Relationship to manifest sync

Manifest sync repairs and validates file paths.

Token sync expands the theme `cssVars` payload.

Both run before the shadcn registry build so the final registry output has valid file references and complete token context.
