# UI Structure Sweep

## Goal
Clean up the shared UI package structure so the registry framework can move forward without barrel noise or stale paths.

## Scope

Focus on `packages/ui/src` and the shared package metadata.

## Tasks

1. Remove stray `.DS_Store` files under `packages/ui/src`.
2. Audit `packages/ui/package.json` exports for stale paths.
3. Audit `tsconfig.json` aliases for any orphaned or mismatched targets.
4. Keep only intentional module barrels:
   - `packages/ui/src/index.ts`
   - `packages/ui/src/components/index.ts`
   - `packages/ui/src/primitives/index.ts`
   - `packages/ui/src/types/index.ts`
   - `packages/ui/src/ui-registry/index.ts`
5. Report any additional files that still need to be copied into `packages/ui/src/ui-registry` for the registry framework.

## Constraints

- Do not touch `apps/registry/*`.
- Do not create new nested `index.ts` files unless they are one of the intentional module barrels above.
- Prefer minimal cleanup over broad refactors.

## Output

Return a short list of:

- deleted junk files
- broken exports/aliases found
- any remaining manual copy work for the registry framework
