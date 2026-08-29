import type { ColumnConfig, JsonData } from "@/types/table-types";
import type { Column } from "@/workers/data-processor.worker";

// BOLT OPTIMIZATION: Hoist regex outside of detectColumnType to avoid recreating RegExp instance on every string check.
const DATE_REGEX = /^\d{4}-\d{2}-\d{2}|^\d{2}\/\d{2}\/\d{4}|^\d{2}-\d{2}-\d{4}/;

export const detectColumnType = (
  value: string | number | boolean | null | undefined | object,
): "string" | "number" | "boolean" | "date" | "object" => {
  if (value === null || value === undefined) return "string";
  if (typeof value === "boolean") return "boolean";
  if (typeof value === "number") return "number";
  if (typeof value === "object") return "object";
  if (typeof value === "string") {
    // Try to detect dates using hoisted regex
    if (DATE_REGEX.test(value) && !Number.isNaN(Date.parse(value))) {
      return "date";
    }
  }
  return "string";
};

export const detectColumns = (data: JsonData[]): Column[] => {
  if (data.length === 0) return [];

  const firstRow = data[0];
  const keys = Object.keys(firstRow);
  const detectedColumns: Column[] = new Array(keys.length);

  // BOLT OPTIMIZATION: Single-pass column type detection per key.
  // Previous implementation ran multiple .map() passes, Set allocations, and O(N^2) arr.filter() inside .reduce().
  // This single-pass approach counts type frequencies directly in a Map (O(N)) and tracks unique string values efficiently.
  for (let index = 0; index < keys.length; index++) {
    const key = keys[index];
    const typeCounts: Record<string, number> = {};
    const uniqueStrings = new Set<string>();

    for (let i = 0; i < data.length; i++) {
      const value = data[i][key];
      const type = detectColumnType(value);
      typeCounts[type] = (typeCounts[type] || 0) + 1;

      if (type === "string" && uniqueStrings.size <= 2) {
        uniqueStrings.add(String(value));
      }
    }

    // Determine the most frequent type
    let mostCommonType: "string" | "number" | "boolean" | "date" | "object" = "string";
    let maxCount = -1;

    for (const type in typeCounts) {
      if (typeCounts[type] > maxCount) {
        maxCount = typeCounts[type];
        mostCommonType = type as "string" | "number" | "boolean" | "date" | "object";
      }
    }

    // If type is string, check if it has exactly 2 unique values (boolean-like)
    if (mostCommonType === "string" && uniqueStrings.size === 2) {
      mostCommonType = "boolean";
    }

    detectedColumns[index] = {
      id: key,
      accessor: key,
      label:
        key.charAt(0).toUpperCase() +
        key
          .slice(1)
          .replace(/([A-Z])/g, " $1")
          .trim(),
      type: mostCommonType,
      order: index,
    };
  }

  return detectedColumns;
};

export const detectColumnsConfig = (data: JsonData[]): ColumnConfig[] => {
  const columns = detectColumns(data);
  return columns.map((col) => ({
    ...col,
    filterable: true,
    hasFacetedFilter: false,
    options: undefined,
    optionsMode: "auto" as const,
  }));
};
