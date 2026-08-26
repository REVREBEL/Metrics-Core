
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { publishChangeRequest } from './publication-adapter';

// Mock dependencies
vi.mock('@repo/db', () => ({
  getDb: vi.fn(),
}));

vi.mock('@google-cloud/bigquery', () => ({
  BigQuery: vi.fn(() => ({
    dataset: vi.fn(() => ({
      table: vi.fn(() => ({
        query: vi.fn(),
        dataset: { createTable: vi.fn() },
      })),
    })),
    createQueryJob: vi.fn(),
  })),
}));

vi.mock('@features/data-library/registry', () => ({
  getDataLibraryTableDefinition: vi.fn(),
}));

vi.mock('@features/data-library/canonicalizer', () => ({
    canonicalizeRowKey: vi.fn(),
    decanonicalizeRowKey: vi.fn(),
  }));

describe('publishChangeRequest', () => {
  let mockDb;
  let mockBigQuery;
  let mockTable;

  beforeEach(() => {
    // ... (Setup mock implementations for db, bq, etc.)
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should successfully publish an approved change request', async () => {
    // TODO: Implement test for successful publication
  });

  it('should return an error if the change request is not in approved state', async () => {
    // TODO: Implement test for non-approved request
  });

  it('should detect a stale data conflict and return a conflict result', async () => {
    // TODO: Implement test for stale data conflict
  });

  it('should handle conflicts where a row was unexpectedly deleted', async () => {
    // TODO: Implement test for row-not-found conflict
  });

  it('should handle conflicts where a row was unexpectedly created', async () => {
    // TODO: Implement test for row-already-exists conflict
  });

import { describe, it, expect, vi, beforeEach } from "vitest";
import { publishChangeRequest } from "./publication-adapter";
import { getDb } from "@repo/db";
import { BigQuery } from "@google-cloud/bigquery";

// ... (mocks)

describe("publishChangeRequest", () => {
  // ... (mock setup)

  it("should successfully publish an approved change request", async () => {
    // ... (success test)
  });

  it("should return a conflict result when the data is stale", async () => {
    // Arrange
    mockDb.query.lookupTableChangeRequests.findFirst.mockResolvedValue({
      id: "req-1",
      status: "approved",
      tableKey: "metrics_core.map_segment",
      items: [
        {
          id: "item-1",
          rowKey: JSON.stringify({ property_code: "p1", source_application_code: "a1", code: "c1" }),
          originalPayload: { segment_code: "s1" },
          submittedPayload: { segment_code: "s2" },
          draftEditId: "draft-1",
        },
      ],
    });

    const mockJob = {
        getMetadata: vi.fn().mockResolvedValue([{ statistics: { query: { numDmlAffectedRows: "0" } } }])
    };
    mockBigQuery.createQueryJob.mockResolvedValue([mockJob]);

    // Act
    const result = await publishChangeRequest("req-1", "user-1");

    // Assert
    expect(result.success).toBe(false);
    expect(result.conflicts.length).toBe(1);
    expect(mockDb.insert).toHaveBeenCalledWith(expect.objectContaining({ action: "publication_conflict" }));
  });

  it("should return a failure result when the change request is not approved", async () => {
    // Arrange
    mockDb.query.lookupTableChangeRequests.findFirst.mockResolvedValue({
      id: "req-1",
      status: "submitted",
      tableKey: "metrics_core.map_segment",
      items: [],
    });

    // Act
    const result = await publishChangeRequest("req-1", "user-1");

    // Assert
    expect(result.success).toBe(false);
    expect(result.message).toContain("not in 'approved' state");
  });

  // ... other failure cases

});
