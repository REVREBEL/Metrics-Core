## 2025-05-14 - [DuckDB WASM Optimization]
**Learning:** Establishing a persistent connection and caching file registrations significantly reduces overhead in DuckDB WASM. More importantly, moving filters into the innermost subquery on Parquet sources enables predicate pushdown, avoiding expensive operations like `regexp_extract` on unnecessary rows.
**Action:** Always favor predicate pushdown by filtering early in SQL queries, especially when dealing with Parquet files and complex transformations.

## 2025-05-15 - [O(N log N * M) Sorting Anti-pattern]
**Learning:** Performing array filtering or complex calculations inside a `.sort()` comparator is a major performance bottleneck, as it runs $O(N \log N)$ times. In React components handling task lists, this can cause significant lag during re-renders.
**Action:** Always pre-calculate sorting criteria during the initial data grouping or transformation pass (single $O(T)$ pass) and store them in the group object for $O(1)$ access during sorting. Similarly, replace multiple `.filter()` calls for status grouping with a single-pass Record-based grouping.
## 2026-07-10 - [SQL Optimization & Result Caching]
**Learning:** In DuckDB WASM, redundant aggregations (SUMs) for derived metrics (ratios, variances) can be avoided by using a CTE to pre-aggregate. Furthermore, client-side result caching for static Parquet sources eliminates DuckDB query overhead entirely for repeated requests.
**Action:** Use CTEs for complex aggregations and implement a simple Map-based cache for expensive client-side analytics queries.
## 2025-05-15 - [Kanban Grouping & Memoization]
**Learning:** Nested filtering in render loops ((S \cdot I)$) significantly degrades performance as the number of columns and items grows. Memoization (.memo$) is only effective if all props, especially function handlers, are stabilized using $ or equivalent patterns.
**Action:** Always use single-pass grouping ($) for multi-column layouts and ensure all callback props are stabilized when using $.
## 2025-05-15 - [Date Formatting in Loops]
**Learning:** Calling `toLocaleDateString` inside a loop (like `Array.from` or `.map`) is surprisingly expensive because it creates a new `Intl.DateTimeFormat` instance implicitly every time. Moving it outside the loop when the date/options are static significantly improves performance.
**Action:** Always move static date formatting and expensive object creation outside of render loops or data generation loops. Use `useMemo` for static chart data to prevent redundant calculations on every re-render.

## 2026-07-06 - [Task Grouping Sort Optimization]
**Learning:** Performing array filtering inside a sort comparator creates a performance bottleneck ((N \log N \cdot M)$). Pre-calculating sort keys during the initial data transformation pass reduces this to (N + M \log M)$.
**Action:** Always pre-calculate expensive sort criteria during the grouping or mapping phase rather than inside the `sort()` method.
