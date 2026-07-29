## Summary

Describe what changed and why.

## Metrics-Core UI delivery

Complete this section for reusable UI or registry work. Use `N/A` with a reason when a field does not apply.

```text
Classification:
Source path:
Story path:
Registry item: yes / no / deferred
Exports updated:
Tests added or updated:
Documentation updated:
Validation run:
Known limitations:
```

## Validation

- [ ] Formatting or lint
- [ ] Typecheck
- [ ] Relevant tests
- [ ] Storybook discovery/build when UI changed
- [ ] Registry validation/generation when registry changed
- [ ] Relevant package or application build
- [ ] Skipped or unavailable checks are explained below

### Validation notes

List exact commands and results. Do not mark checks complete when they were not run.

## Repository safeguards

- [ ] Work targets `REVREBEL/Metrics-Core`, not the older `REVREBEL/Metrics` repository.
- [ ] Root and scoped `AGENTS.md` guidance was reviewed.
- [ ] Existing aliases and package boundaries were preserved.
- [ ] No feature data or workflow logic was moved into `packages/ui`.
- [ ] New reusable components include a real colocated Storybook story unless explicitly excluded.
- [ ] Registry eligibility was decided explicitly rather than assumed.
