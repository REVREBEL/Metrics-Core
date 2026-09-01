import { describe, expect, it } from "vitest";
import {
  detectColumns,
  detectColumnsConfig,
  detectColumnType,
} from "./column-detection";

describe("column-detection", () => {
  describe("detectColumnType", () => {
    it("detects null/undefined as string", () => {
      expect(detectColumnType(null)).toBe("string");
      expect(detectColumnType(undefined)).toBe("string");
    });

    it("detects boolean values", () => {
      expect(detectColumnType(true)).toBe("boolean");
      expect(detectColumnType(false)).toBe("boolean");
    });

    it("detects numbers", () => {
      expect(detectColumnType(123)).toBe("number");
      expect(detectColumnType(0)).toBe("number");
      expect(detectColumnType(-45.67)).toBe("number");
    });

    it("detects objects", () => {
      expect(detectColumnType({ key: "val" })).toBe("object");
      expect(detectColumnType([])).toBe("object");
    });

    it("detects valid dates", () => {
      expect(detectColumnType("2025-05-14")).toBe("date");
      expect(detectColumnType("05/14/2025")).toBe("date");
    });

    it("falls back to string for general strings", () => {
      expect(detectColumnType("hello world")).toBe("string");
      expect(detectColumnType("active")).toBe("string");
    });
  });

  describe("detectColumns", () => {
    it("returns empty array for empty input data", () => {
      expect(detectColumns([])).toEqual([]);
    });

    it("detects types across rows accurately", () => {
      const data = [
        {
          id: 1,
          name: "Alice",
          active: "yes",
          createdAt: "2025-01-01",
          meta: { role: "admin" },
        },
        {
          id: 2,
          name: "Bob",
          active: "no",
          createdAt: "2025-01-02",
          meta: { role: "user" },
        },
        {
          id: 3,
          name: "Charlie",
          active: "yes",
          createdAt: "2025-01-03",
          meta: { role: "user" },
        },
      ];

      const columns = detectColumns(data);

      expect(columns).toEqual([
        { id: "id", accessor: "id", label: "Id", type: "number", order: 0 },
        {
          id: "name",
          accessor: "name",
          label: "Name",
          type: "string",
          order: 1,
        },
        {
          id: "active",
          accessor: "active",
          label: "Active",
          type: "boolean",
          order: 2,
        },
        {
          id: "createdAt",
          accessor: "createdAt",
          label: "Created At",
          type: "date",
          order: 3,
        },
        {
          id: "meta",
          accessor: "meta",
          label: "Meta",
          type: "object",
          order: 4,
        },
      ]);
    });
  });

  describe("detectColumnsConfig", () => {
    it("wraps detected columns with default configuration", () => {
      const data = [{ val: 42 }];
      const config = detectColumnsConfig(data);

      expect(config).toEqual([
        {
          id: "val",
          accessor: "val",
          label: "Val",
          type: "number",
          order: 0,
          filterable: true,
          hasFacetedFilter: false,
          options: undefined,
          optionsMode: "auto",
        },
      ]);
    });
  });
});
