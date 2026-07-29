import assert from "node:assert/strict";
import { test } from "node:test";
import {
  buildDataLibraryFilterOptionsQuery,
  buildDataLibraryQuery,
} from "./query-builder";
import type { DataLibraryReadDefinition } from "./query-contract";

const mockDefinition: DataLibraryReadDefinition = {
  key: "metrics_core.lkp_segment",
  dataset: "metrics_core",
  table: "lkp_segment",
  primaryKey: ["code"],
  defaultSort: { column: "sort", direction: "asc" },
  permissions: {
    read: ["data_library.lookup_tables.view"],
    edit: ["data_library.lookup_tables.edit"],
    review: ["data_library.lookup_tables.review"],
    publish: ["data_library.lookup_tables.publish"],
  },
  columns: [
    {
      key: "code",
      label: "Code",
      type: "string",
      editable: false,
      required: true,
      description: "Code",
      searchable: true,
      sortable: true,
      filterable: true,
      visible: true,
    },
    {
      key: "name",
      label: "Name",
      type: "string",
      editable: true,
      required: true,
      description: "Name",
      searchable: true,
      sortable: true,
      filterable: false,
      visible: true,
    },
    {
      key: "sort",
      label: "Sort",
      type: "integer",
      editable: true,
      required: false,
      description: "Sort",
      searchable: false,
      sortable: true,
      filterable: false,
      visible: true,
    },
    {
      key: "is_active",
      label: "Active",
      type: "boolean",
      editable: true,
      required: true,
      description: "Active",
      searchable: false,
      sortable: true,
      filterable: true,
      visible: true,
    },
    {
      key: "internal_notes",
      label: "Internal Notes",
      type: "string",
      editable: false,
      required: false,
      description: "Hidden column",
      searchable: true,
      sortable: false,
      filterable: false,
      visible: false,
    },
  ],
};

test("buildDataLibraryQuery - basic SELECT, visible columns only", () => {
  const result = buildDataLibraryQuery(mockDefinition, {
    tableKey: "metrics_core.lkp_segment",
    page: 1,
    pageSize: 25,
  });

  assert.ok(result.sql.includes("SELECT `code`, `name`, `sort`, `is_active`"));
  assert.ok(!result.sql.includes("`internal_notes`"));
  assert.ok(result.sql.includes("FROM `metrics_core`.`lkp_segment`"));
  assert.ok(result.sql.includes("ORDER BY `sort` ASC NULLS LAST, `code` ASC NULLS LAST"));
  assert.strictEqual(result.params.limitParam, 25);
  assert.strictEqual(result.params.offsetParam, 0);
});

test("buildDataLibraryQuery - parameterized search across searchable text columns only", () => {
  const result = buildDataLibraryQuery(mockDefinition, {
    tableKey: "metrics_core.lkp_segment",
    page: 1,
    pageSize: 10,
    search: " transient ",
  });

  assert.ok(result.sql.includes("LOWER(`code`) LIKE @searchParam OR LOWER(`name`) LIKE @searchParam"));
  assert.ok(!result.sql.includes("LOWER(`is_active`)"));
  assert.strictEqual(result.params.searchParam, "%transient%");
});

test("buildDataLibraryQuery - parameterized boolean and string filters", () => {
  const result = buildDataLibraryQuery(mockDefinition, {
    tableKey: "metrics_core.lkp_segment",
    page: 1,
    pageSize: 10,
    filters: {
      is_active: "true",
      code: "ACC",
      name: "UnfilterableColumnAttempt", // name is filterable: false, should be ignored
    },
  });

  assert.ok(result.sql.includes("`is_active` = @filter_is_active"));
  assert.ok(result.sql.includes("`code` = @filter_code"));
  assert.ok(!result.sql.includes("@filter_name"));
  assert.strictEqual(result.params.filter_is_active, true);
  assert.strictEqual(result.params.filter_code, "ACC");
});

test("buildDataLibraryQuery - deduplicates primary key in ORDER BY when requested sort is primary key", () => {
  const result = buildDataLibraryQuery(mockDefinition, {
    tableKey: "metrics_core.lkp_segment",
    page: 1,
    pageSize: 10,
    sort: { column: "code", direction: "desc" },
  });

  // Should sort by `code` DESC NULLS LAST and NOT append `code` ASC NULLS LAST twice
  assert.ok(result.sql.includes("ORDER BY `code` DESC NULLS LAST"));
  assert.ok(!result.sql.includes("ORDER BY `code` DESC NULLS LAST, `code` ASC"));
});

test("buildDataLibraryQuery - rejects invalid page or pageSize bounds", () => {
  assert.throws(
    () =>
      buildDataLibraryQuery(mockDefinition, {
        tableKey: "metrics_core.lkp_segment",
        page: 0,
        pageSize: 25,
      }),
    /Page index must be an integer >= 1/,
  );

  assert.throws(
    () =>
      buildDataLibraryQuery(mockDefinition, {
        tableKey: "metrics_core.lkp_segment",
        page: 1,
        pageSize: 150,
      }),
    /Page size must be an integer between 1 and 100/,
  );
});

test("buildDataLibraryFilterOptionsQuery - generates SELECT DISTINCT with limit", () => {
  const filterQuery = buildDataLibraryFilterOptionsQuery(mockDefinition, "code");
  assert.strictEqual(filterQuery.columnKey, "code");
  assert.ok(filterQuery.sql.includes("SELECT DISTINCT `code` AS value"));
  assert.ok(filterQuery.sql.includes("FROM `metrics_core`.`lkp_segment`"));
  assert.ok(filterQuery.sql.includes("ORDER BY value ASC"));
  assert.ok(filterQuery.sql.includes("LIMIT 100"));
});
