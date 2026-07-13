## 2025-05-14 - [DuckDB WASM Optimization]
**Learning:** Establishing a persistent connection and caching file registrations significantly reduces overhead in DuckDB WASM. More importantly, moving filters into the innermost subquery on Parquet sources enables predicate pushdown, avoiding expensive operations like `regexp_extract` on unnecessary rows.
**Action:** Always favor predicate pushdown by filtering early in SQL queries, especially when dealing with Parquet files and complex transformations.

## 2025-05-14 - [React Props Stability in useMemo]
**Learning:** Destructuring props when using them as dependencies in `useMemo` is critical. Using the rest-spread `props` object directly in the dependency array is ineffective because React creates a fresh object reference on every render, causing the `useMemo` to re-execute every time.
**Action:** Always destructure specific props and use those stable values (primitives or memoized objects) in dependency arrays to ensure `useMemo` and `useCallback` actually provide performance benefits.
