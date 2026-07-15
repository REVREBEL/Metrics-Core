## 2025-05-14 - [DuckDB WASM Optimization]
**Learning:** Establishing a persistent connection and caching file registrations significantly reduces overhead in DuckDB WASM. More importantly, moving filters into the innermost subquery on Parquet sources enables predicate pushdown, avoiding expensive operations like `regexp_extract` on unnecessary rows.
**Action:** Always favor predicate pushdown by filtering early in SQL queries, especially when dealing with Parquet files and complex transformations.

## 2026-07-15 - [Component Filtering Anti-pattern]
**Learning:** Several pages in the mission-control section perform O(N) filtering and string operations directly in the render body. While the current mock data is small, this causes unnecessary computation on every state update (e.g., status toggles, log updates).
**Action:** Use `useMemo` for filtered lists and move static badge/color helpers outside component scopes to ensure lean render cycles.
