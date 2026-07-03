# Bolt's Journal - Critical Learnings Only

## 2025-01-24 - Initializing Bolt's Journal
**Learning:** Starting fresh in this repository.
**Action:** Always measure first, optimize second.

## 2025-01-24 - Context Memoization & Correctness
**Learning:** When memoizing a Context value, always include all members of the context in the dependency array, even if they appear static (e.g., `hotelId = null`) or are considered stable by linters (e.g., `useState` setters). Linters like Biome may flag them as unnecessary, but omitting them can lead to stale closure bugs if the implementation changes or the "static" value becomes dynamic later.
**Action:** Use `biome-ignore` if necessary to maintain a complete dependency array for context memoization.
