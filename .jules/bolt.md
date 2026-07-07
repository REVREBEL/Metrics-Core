## 2025-05-14 - [DuckDB WASM Optimization]
**Learning:** Establishing a persistent connection and caching file registrations significantly reduces overhead in DuckDB WASM. More importantly, moving filters into the innermost subquery on Parquet sources enables predicate pushdown, avoiding expensive operations like `regexp_extract` on unnecessary rows.
**Action:** Always favor predicate pushdown by filtering early in SQL queries, especially when dealing with Parquet files and complex transformations.

## 2025-05-15 - [Date Formatting in Loops]
**Learning:** Calling `toLocaleDateString` inside a loop (like `Array.from` or `.map`) is surprisingly expensive because it creates a new `Intl.DateTimeFormat` instance implicitly every time. Moving it outside the loop when the date/options are static significantly improves performance.
**Action:** Always move static date formatting and expensive object creation outside of render loops or data generation loops. Use `useMemo` for static chart data to prevent redundant calculations on every re-render.
