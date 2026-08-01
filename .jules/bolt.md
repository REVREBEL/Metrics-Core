## 2025-05-14 - [DuckDB WASM Optimization]
**Learning:** Establishing a persistent connection and caching file registrations significantly reduces overhead in DuckDB WASM. More importantly, moving filters into the innermost subquery on Parquet sources enables predicate pushdown, avoiding expensive operations like `regexp_extract` on unnecessary rows.
**Action:** Always favor predicate pushdown by filtering early in SQL queries, especially when dealing with Parquet files and complex transformations.

## 2026-07-15 - [Component Filtering Anti-pattern]
**Learning:** Several pages in the mission-control section perform O(N) filtering and string operations directly in the render body. While the current mock data is small, this causes unnecessary computation on every state update (e.g., status toggles, log updates).
**Action:** Use `useMemo` for filtered lists and move static badge/color helpers outside component scopes to ensure lean render cycles.
## 2025-05-14 - [React Props Stability in useMemo]
**Learning:** Destructuring props when using them as dependencies in `useMemo` is critical. Using the rest-spread `props` object directly in the dependency array is ineffective because React creates a fresh object reference on every render, causing the `useMemo` to re-execute every time.
**Action:** Always destructure specific props and use those stable values (primitives or memoized objects) in dependency arrays to ensure `useMemo` and `useCallback` actually provide performance benefits.
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

## 2026-07-26 - [Single-Pass Loop & Date Hoisting Optimization]
**Learning:** Running multiple `.filter()` traversals over the same array to gather statistics is a waste of CPU cycles ($O(K \cdot N)$), and instantiating `new Date()` inside loops creates immense garbage collection overhead. In addition, performing expensive computations for unused variables (e.g., `_overdueTasks` inside `DepartmentCard`) wastes resources.
**Action:** Refactor multiple `.filter` blocks into a single-pass `for...of` loop to compute stats in $O(N)$ with no array allocations. Hoist `new Date()` and map lookups outside of render/loop contexts, and prune unused loop computations.

## 2026-07-27 - [Broken Memoization via Unstable Date Dependencies]
**Learning:** Passing newly instantiated Date objects or non-primitives created directly in the render body into a `useMemo` dependency array completely breaks memoization. Since React does strict reference equality checks (`===`), the new references on every render trigger re-computation of the memoized block (e.g. running 5 separate `.filter()` traversals over thousands of items). Furthermore, implicit `toLocaleDateString` calls recreate the expensive `Intl.DateTimeFormat` object.
**Action:** Always group and memoize unstable variables (like dynamic dates) in a single `useMemo` block first, or extract them, before passing them as dependencies. Also, hoist `Intl.DateTimeFormat` formatters to package level to avoid implicit creation costs.

## 2026-07-28 - [BigQuery Filter Option Caching]
**Learning:** Querying distinct filter options directly from BigQuery on every table view or dropdown open results in multiple parallel, redundant BigQuery scans with 1-2s latency. Since lookup values and categories are highly static in the application workspace context, server-side in-memory caching of these distinct values eliminates warehouse scan overhead completely.
**Action:** Always implement a lightweight TTL cache on distinct dropdown query readers connected to external data warehouses.
