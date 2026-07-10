## 2025-05-14 - [DuckDB WASM Optimization]
**Learning:** Establishing a persistent connection and caching file registrations significantly reduces overhead in DuckDB WASM. More importantly, moving filters into the innermost subquery on Parquet sources enables predicate pushdown, avoiding expensive operations like `regexp_extract` on unnecessary rows.
**Action:** Always favor predicate pushdown by filtering early in SQL queries, especially when dealing with Parquet files and complex transformations.

## 2026-07-10 - [SQL Optimization & Result Caching]
**Learning:** In DuckDB WASM, redundant aggregations (SUMs) for derived metrics (ratios, variances) can be avoided by using a CTE to pre-aggregate. Furthermore, client-side result caching for static Parquet sources eliminates DuckDB query overhead entirely for repeated requests.
**Action:** Use CTEs for complex aggregations and implement a simple Map-based cache for expensive client-side analytics queries.
