## 2025-05-15 - Debouncing Search in Data Tables
**Learning:** In components like `TasksTable` that perform complex filtering and sorting on local data, updating the filtered result on every keystroke in a search input leads to excessive re-renders and potential lag, especially with larger datasets.
**Action:** Always debounce search inputs that trigger heavy computations or large list re-renders. 300ms is a safe default to balance responsiveness and performance.
