## 2025-05-14 - [DuckDB WASM Optimization]
**Learning:** Establishing a persistent connection and caching file registrations significantly reduces overhead in DuckDB WASM. More importantly, moving filters into the innermost subquery on Parquet sources enables predicate pushdown, avoiding expensive operations like `regexp_extract` on unnecessary rows.
**Action:** Always favor predicate pushdown by filtering early in SQL queries, especially when dealing with Parquet files and complex transformations.

## 2025-05-15 - [Kanban Grouping & Memoization]
**Learning:** Nested filtering in render loops ((S \cdot I)$) significantly degrades performance as the number of columns and items grows. Memoization (.memo$) is only effective if all props, especially function handlers, are stabilized using $ or equivalent patterns.
**Action:** Always use single-pass grouping ($) for multi-column layouts and ensure all callback props are stabilized when using $.
