## 2025-05-14 - [DuckDB WASM Optimization]
**Learning:** Establishing a persistent connection and caching file registrations significantly reduces overhead in DuckDB WASM. More importantly, moving filters into the innermost subquery on Parquet sources enables predicate pushdown, avoiding expensive operations like `regexp_extract` on unnecessary rows.
**Action:** Always favor predicate pushdown by filtering early in SQL queries, especially when dealing with Parquet files and complex transformations.

## 2026-07-06 - [Task Grouping Sort Optimization]
**Learning:** Performing array filtering inside a sort comparator creates a performance bottleneck ((N \log N \cdot M)$). Pre-calculating sort keys during the initial data transformation pass reduces this to (N + M \log M)$.
**Action:** Always pre-calculate expensive sort criteria during the grouping or mapping phase rather than inside the `sort()` method.
