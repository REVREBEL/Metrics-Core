# Low-Risk Cleanup Pass

## Goal
Clean up harmless workspace noise without changing registry behavior.

## Hard Rules

- Do not add or remove component logic.
- Do not create new barrels.
- Do not touch the recurring registry scripts.
- Stop after the first unexpected blocker and report it.

## Tasks

1. Remove stray `.DS_Store` files under the workspace.
2. Update stale documentation references to match the current alias plan.
3. Replace any leftover `src/primitives/registry` references with the new `src/ui-registry` path in docs only.
4. Leave code behavior unchanged.

## Output

- Files removed.
- Docs references updated.
- Any unexpected path conflicts or missing files.
