## 2025-05-15 - [Intl Formatter Memoization]
**Learning:** Instantiating `Intl.NumberFormat` and `Intl.DateTimeFormat` can be significantly more expensive (up to 100x) than the formatting operation itself. In high-frequency render paths like table cells or chart tooltips, this can cause measurable lag.
**Action:** Always extract `Intl` formatter instances to a shared utility file or memoize them at the module level rather than creating them inside components or loops.
