"use client";

import * as duckdb from "@duckdb/duckdb-wasm";
import { useCallback, useEffect, useState } from "react";

// Define the shape of our summary statistics
// Marking fields as optional/nullable to handle potential NULL results from SQL aggregations
export interface HotelSummaryStats {
  property_name: string;
  rooms_cy?: number | null;
  revenue_cy?: number | null;
  rooms_ly_actual?: number | null;
  rev_ly_actual?: number | null;
  rev_budget?: number | null;
  rooms_budget?: number | null;
  available_rooms?: number | null;
  occ_cy?: number | null;
  occ_py?: number | null;
  occ_budget?: number | null;
  adr_cy?: number | null;
  adr_py?: number | null;
  adr_budget?: number | null;
  revpar_cy?: number | null;
  revpar_py?: number | null;
  revpar_budget?: number | null;
  occ_var?: number | null;
  adr_var?: number | null;
  revpar_var?: number | null;
  rooms_var?: number | null;
  revenue_var?: number | null;
  rev_to_budget?: number | null;
  budget_reach_pct?: number | null;
}

// Singleton for DuckDB WASM instance
let dbPromise: Promise<duckdb.AsyncDuckDB> | null = null;
// Singleton for a persistent connection to avoid connection overhead per query
let connPromise: Promise<duckdb.AsyncDuckDBConnection> | null = null;
// Set of registered files to avoid redundant I/O and worker communication
const registeredFiles = new Set<string>();
// Result cache to avoid redundant DuckDB queries for identical parameters
const statsCache = new Map<string, HotelSummaryStats>();

const PARQUET_URL = "/data/dashboard_current.parquet";
const INTERNAL_PATH = "dashboard_current.parquet";

async function getDuckDB() {
  if (dbPromise) return dbPromise;

  dbPromise = (async () => {
    try {
      // Use same-origin assets to avoid cross-origin Worker restrictions.
      const localBundles: duckdb.DuckDBBundles = {
        mvp: {
          mainModule: "/duckdb/duckdb-mvp.wasm",
          mainWorker: "/duckdb/duckdb-browser-mvp.worker.js",
        },
        eh: {
          mainModule: "/duckdb/duckdb-eh.wasm",
          mainWorker: "/duckdb/duckdb-browser-eh.worker.js",
        },
      };
      const bundle = await duckdb.selectBundle(localBundles);
      if (!bundle.mainWorker) {
        throw new Error("No suitable DuckDB worker bundle found");
      }
      const worker = new Worker(bundle.mainWorker);
      const logger = new duckdb.ConsoleLogger();
      const db = new duckdb.AsyncDuckDB(logger, worker);

      await db.instantiate(bundle.mainModule, bundle.pthreadWorker);
      return db;
    } catch (err) {
      // Reset singleton on failure to allow retries
      dbPromise = null;
      throw err;
    }
  })();

  return dbPromise;
}

async function getDuckDBConnection() {
  if (connPromise) return connPromise;

  connPromise = (async () => {
    const db = await getDuckDB();
    return db.connect();
  })();

  return connPromise;
}

export function useHotelAnalytics() {
  const [isReady, setIsReady] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let mounted = true;
    getDuckDB()
      .then(() => {
        if (mounted) setIsReady(true);
      })
      .catch((err: unknown) => {
        if (!mounted) return;
        if (err instanceof Error) {
          setError(err);
        } else {
          setError(
            new Error(
              typeof err === "string" ? err : "Failed to initialize DuckDB",
            ),
          );
        }
      });
    return () => {
      mounted = false;
    };
  }, []);

  /**
   * Retrieves summary statistics for a given hotel and date range from the 'Current' snapshot.
   */
  const getSummaryStats = useCallback(
    async (
      hotelName: string,
      year: number,
      month: number,
    ): Promise<HotelSummaryStats | null> => {
      if (!isReady) throw new Error("DuckDB is not ready yet.");

      const cacheKey = `${hotelName}-${year}-${month}`;
      const cached = statsCache.get(cacheKey);
      if (cached) {
        return cached;
      }

      try {
        const db = await getDuckDB();
        const conn = await getDuckDBConnection();

        // Register the file URL only if it hasn't been registered before
        if (!registeredFiles.has(INTERNAL_PATH)) {
          await db.registerFileURL(
            INTERNAL_PATH,
            new URL(PARQUET_URL, window.location.origin).toString(),
            duckdb.DuckDBDataProtocol.HTTP,
            false,
          );
          registeredFiles.add(INTERNAL_PATH);
        }

        // Basic escaping of hotelName to mitigate simple string injection
        const escapedHotelName = hotelName.replace(/'/g, "''");

        // PERFORMANCE:
        // 1. Moved filters into the innermost subquery to enable DuckDB predicate pushdown.
        // 2. Used a CTE (base_sums) to perform aggregations once, avoiding redundant SUM calls
        //    for ratio and variance calculations in the outer query.
        const query = `
          WITH base_sums AS (
            SELECT
              property_name,
              SUM(rooms_cy) as s_rooms_cy,
              SUM(revenue_cy) as s_revenue_cy,
              SUM(rooms_ly_actual) as s_rooms_ly_actual,
              SUM(rev_ly_actual) as s_rev_ly_actual,
              SUM(rev_budget) as s_rev_budget,
              SUM(rooms_budget) as s_rooms_budget,
              SUM(available_rooms) as s_available_rooms
            FROM (
              SELECT
                property_name,
                rooms_cy,
                revenue_cy,
                rooms_ly_actual,
                rev_ly_actual,
                rev_budget,
                rooms_budget,
                available_rooms,
                CAST(regexp_extract(stay_date::VARCHAR, '([0-9]{4}-[0-9]{2}-[0-9]{2})') AS DATE) as normalized_stay_date
              FROM read_parquet('${INTERNAL_PATH}')
              WHERE property_name = '${escapedHotelName}'
            )
            WHERE date_part('year', normalized_stay_date) = ${Number(year)}
              AND date_part('month', normalized_stay_date) = ${Number(month)}
            GROUP BY property_name
          )
          SELECT
            property_name,
            s_rooms_cy as rooms_cy,
            s_revenue_cy as revenue_cy,
            s_rooms_ly_actual as rooms_ly_actual,
            s_rev_ly_actual as rev_ly_actual,
            s_rev_budget as rev_budget,
            s_rooms_budget as rooms_budget,
            s_available_rooms as available_rooms,

            -- Calculated ratios using pre-aggregated sums
            s_rooms_cy / NULLIF(s_available_rooms, 0) as occ_cy,
            s_rooms_ly_actual / NULLIF(s_available_rooms, 0) as occ_py,
            s_rooms_budget / NULLIF(s_available_rooms, 0) as occ_budget,
            s_revenue_cy / NULLIF(s_rooms_cy, 0) as adr_cy,
            s_rev_ly_actual / NULLIF(s_rooms_ly_actual, 0) as adr_py,
            s_rev_budget / NULLIF(s_rooms_budget, 0) as adr_budget,
            s_revenue_cy / NULLIF(s_available_rooms, 0) as revpar_cy,
            s_rev_ly_actual / NULLIF(s_available_rooms, 0) as revpar_py,
            s_rev_budget / NULLIF(s_available_rooms, 0) as revpar_budget,

            -- Variances
            (s_rooms_cy / NULLIF(s_available_rooms, 0)) - (s_rooms_ly_actual / NULLIF(s_available_rooms, 0)) as occ_var,
            (s_revenue_cy / NULLIF(s_rooms_cy, 0)) - (s_rev_ly_actual / NULLIF(s_rooms_ly_actual, 0)) as adr_var,
            (s_revenue_cy / NULLIF(s_available_rooms, 0)) - (s_rev_ly_actual / NULLIF(s_available_rooms, 0)) as revpar_var,
            s_rooms_cy - s_rooms_ly_actual as rooms_var,
            s_revenue_cy - s_rev_ly_actual as revenue_var,
            s_rev_budget - s_revenue_cy as rev_to_budget,
            s_revenue_cy / NULLIF(s_rev_budget, 0) as budget_reach_pct
          FROM base_sums;
        `;

        const result = await conn.query(query);

        if (result.numRows === 0) return null;

        const row = result.get(0);
        if (row) {
          const stats = row.toJSON() as HotelSummaryStats;
          statsCache.set(cacheKey, stats);
          return stats;
        }
        return null;
      } catch (err) {
        console.error("DuckDB query failed:", err);
        throw err;
      }
      // Note: We no longer close the connection here as it is managed by a singleton
    },
    [isReady],
  );

  return { isReady, error, getSummaryStats };
}
