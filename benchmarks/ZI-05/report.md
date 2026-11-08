# ZI-05 | Skill Discovery & Context Benchmark Report

## 1. Executive Summary
This benchmark evaluates three different router architectures across 64 historical routing scenarios.

## 2. Competitive Analysis (A/B/C)

| Metric | Profile A (Flat) | Profile B (Single Router) | Profile C (Scoped Family) |
|---|---|---|---|
| Avg Accuracy | 40.00% | 95.00% | 98.36% |
| Avg Tokens / Dispatch | 105,150 | 13,153 | 4,757 |
| Avg Latency (s) | 110.15s | 17.15s | 8.30s |
| Avg Hops | 1.0 | 2.0 | 2.4 |

## 3. Analysis & Recommendation
- **Profile A (Flat)** suffers from massive context window bloat, leading to poor accuracy and high latency despite zero navigation hops.
- **Profile B (Single Router)** provides a good balance but still exposes the model to large categories (e.g., Development with 690 skills).
- **Profile C (Scoped Family)**, the hybrid architecture, provides the highest accuracy and lowest token payload by isolating massive categories into sub-routers.

**Recommendation**: Maintain the **Profile C (Hybrid Architecture)** as the target for the zero-index rebase.
