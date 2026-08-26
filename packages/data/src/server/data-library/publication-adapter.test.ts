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
