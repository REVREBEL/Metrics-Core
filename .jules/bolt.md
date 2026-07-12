## 2025-05-14 - [DuckDB WASM Optimization]
**Learning:** Establishing a persistent connection and caching file registrations significantly reduces overhead in DuckDB WASM. More importantly, moving filters into the innermost subquery on Parquet sources enables predicate pushdown, avoiding expensive operations like `regexp_extract` on unnecessary rows.
**Action:** Always favor predicate pushdown by filtering early in SQL queries, especially when dealing with Parquet files and complex transformations.

## 2025-05-15 - [O(N log N * M) Sorting Anti-pattern]
**Learning:** Performing array filtering or complex calculations inside a `.sort()` comparator is a major performance bottleneck, as it runs $O(N \log N)$ times. In React components handling task lists, this can cause significant lag during re-renders.
**Action:** Always pre-calculate sorting criteria during the initial data grouping or transformation pass (single $O(T)$ pass) and store them in the group object for $O(1)$ access during sorting. Similarly, replace multiple `.filter()` calls for status grouping with a single-pass Record-based grouping.
