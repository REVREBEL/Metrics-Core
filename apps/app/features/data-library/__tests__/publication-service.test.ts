import assert from "node:assert/strict";
import { test } from "node:test";
import type { ChangeRequestWithItems } from "@repo/db";
import {
  getPublicationCapability,
  type PublicationDependencies,
  publishFeatureChangeRequest,
} from "../publication-service";

function makeRequest(
  status: ChangeRequestWithItems["status"] = "approved",
): ChangeRequestWithItems {
  const now = new Date("2026-08-26T20:00:00.000Z");
  return {
    id: "request-1",
    tableKey: "metrics_core.map_segment",
    title: "Update segment mapping",
    description: null,
    submitterId: "submitter-1",
    reviewerId: "reviewer-1",
    status,
    reviewNotes: null,
    submittedAt: now,
    reviewedAt: now,
    withdrawnAt: null,
    createdAt: now,
    updatedAt: now,
    items: [
      {
        id: "item-1",
        changeRequestId: "request-1",
        draftEditId: "draft-1",
        rowKey: JSON.stringify({
          property_code: "P1",
          source_application_code: "PMS",
          code: "CORP",
        }),
        originalPayload: {
          property_code: "P1",
          source_application_code: "PMS",
          code: "CORP",
          segment_code: "TRANSIENT",
          finance_segment_code: null,
          gl_code: null,
          is_active: true,
        },
        submittedPayload: { segment_code: "CORPORATE" },
        validationSnapshot: {},
        createdAt: now,
      },
    ],
  };
}

function makeSession(permissions: string[]) {
  return {
    userId: "publisher-1",
    isAuthenticated: true,
    permissions,
  };
}

function makeDependencies(request: ChangeRequestWithItems) {
  const audits: Array<{ action: string }> = [];
  const transitions: Array<{
    requestStatus: "conflict" | "published";
    draftStatus: "draft" | "published";
  }> = [];
  let warehouseCalls = 0;
  let publisher: PublicationDependencies["publishWarehouse"] = async () => ({
    success: true,
    conflicts: [],
    publishedRows: 1,
    warehouseRowsWritten: 1,
    jobId: "job-1",
  });
  let auditRecorder: PublicationDependencies["recordAudit"] = async (input) => {
    audits.push({ action: input.action });
  };

  const deps: PublicationDependencies = {
    async loadRequest() {
      return request;
    },
    async recordAudit(input) {
      return auditRecorder(input);
    },
    async transitionOutcome(input) {
      transitions.push({
        requestStatus: input.requestStatus,
        draftStatus: input.draftStatus,
      });
      request.status = input.requestStatus;
      audits.push({ action: input.audit.action });
    },
    async publishWarehouse(definition, items) {
      warehouseCalls += 1;
      return publisher(definition, items);
    },
    now() {
      return new Date("2026-08-26T20:00:00.000Z");
    },
    newCorrelationId() {
      return "corr-1";
    },
  };

  return {
    deps,
    audits,
    transitions,
    get warehouseCalls() {
      return warehouseCalls;
    },
    setPublisher(next: PublicationDependencies["publishWarehouse"]) {
      publisher = next;
    },
    setAuditRecorder(next: PublicationDependencies["recordAudit"]) {
      auditRecorder = next;
    },
  };
}

test("publication capability requires the exact registry publish permission", () => {
  const denied = getPublicationCapability(
    "metrics_core.map_segment",
    makeSession(["data_library.mapping_tables.review"]),
  );
  assert.equal(denied.supported, true);
  assert.equal(denied.canPublish, false);

  const allowed = getPublicationCapability(
    "metrics_core.map_segment",
    makeSession(["data_library.mapping_tables.publish"]),
  );
  assert.equal(allowed.canPublish, true);
});

test("publication rejects unauthorized and non-approved requests before warehouse execution", async () => {
  const request = makeRequest("approved");
  const harness = makeDependencies(request);

  const unauthorized = await publishFeatureChangeRequest(
    request.id,
    makeSession(["data_library.mapping_tables.review"]),
    harness.deps,
  );
  assert.equal(unauthorized.outcome, "unauthorized");
  assert.equal(harness.warehouseCalls, 0);

  request.status = "submitted";
  const invalidState = await publishFeatureChangeRequest(
    request.id,
    makeSession(["data_library.mapping_tables.publish"]),
    harness.deps,
  );
  assert.equal(invalidState.outcome, "invalid_state");
  assert.equal(harness.warehouseCalls, 0);
});

test("publication fails closed before warehouse execution when audit initialization fails", async () => {
  const request = makeRequest("approved");
  const harness = makeDependencies(request);
  harness.setAuditRecorder(async () => {
    throw new Error("audit unavailable");
  });

  const result = await publishFeatureChangeRequest(
    request.id,
    makeSession(["data_library.mapping_tables.publish"]),
    harness.deps,
  );

  assert.equal(result.outcome, "failed");
  assert.equal(result.retryable, true);
  assert.equal(harness.warehouseCalls, 0);
});

test("conflicts are durable and restore drafts for recovery", async () => {
  const request = makeRequest("approved");
  const harness = makeDependencies(request);
  harness.setPublisher(async () => ({
    success: false,
    conflicts: [
      {
        rowKey: request.items[0].rowKey,
        message: "Warehouse changed.",
        conflictingFields: {
          segment_code: { expected: "TRANSIENT", actual: "GROUP" },
        },
      },
    ],
    publishedRows: 0,
    warehouseRowsWritten: 0,
    jobId: null,
  }));

  const result = await publishFeatureChangeRequest(
    request.id,
    makeSession(["data_library.mapping_tables.publish"]),
    harness.deps,
  );

  assert.equal(result.outcome, "conflict");
  assert.equal(result.success, false);
  assert.equal(result.conflicts.length, 1);
  assert.deepEqual(harness.transitions, [
    { requestStatus: "conflict", draftStatus: "draft" },
  ]);
  assert.ok(harness.audits.some((entry) => entry.action === "publication_conflict"));
});

test("successful publication updates request and draft lifecycle and records success", async () => {
  const request = makeRequest("approved");
  const harness = makeDependencies(request);

  const result = await publishFeatureChangeRequest(
    request.id,
    makeSession(["data_library.mapping_tables.publish"]),
    harness.deps,
  );

  assert.equal(result.success, true);
  assert.equal(result.outcome, "published");
  assert.equal(result.publishedRows, 1);
  assert.equal(result.warehouseJobId, "job-1");
  assert.deepEqual(harness.transitions, [
    { requestStatus: "published", draftStatus: "published" },
  ]);
  assert.ok(harness.audits.some((entry) => entry.action === "publication_started"));
  assert.ok(harness.audits.some((entry) => entry.action === "publication_succeeded"));
});

test("operational failure remains retryable and a later retry is idempotent", async () => {
  const request = makeRequest("approved");
  const harness = makeDependencies(request);
  harness.setPublisher(async () => {
    throw new Error("temporary warehouse outage");
  });

  const first = await publishFeatureChangeRequest(
    request.id,
    makeSession(["data_library.mapping_tables.publish"]),
    harness.deps,
  );
  assert.equal(first.outcome, "failed");
  assert.equal(first.retryable, true);
  assert.equal(request.status, "approved");
  assert.ok(harness.audits.some((entry) => entry.action === "publication_failed"));

  harness.setPublisher(async () => ({
    success: true,
    conflicts: [],
    publishedRows: 1,
    warehouseRowsWritten: 0,
    jobId: null,
  }));
  const second = await publishFeatureChangeRequest(
    request.id,
    makeSession(["data_library.mapping_tables.publish"]),
    harness.deps,
  );
  assert.equal(second.outcome, "published");
  assert.equal(request.status, "published");

  const callsAfterSuccess = harness.warehouseCalls;
  const third = await publishFeatureChangeRequest(
    request.id,
    makeSession(["data_library.mapping_tables.publish"]),
    harness.deps,
  );
  assert.equal(third.outcome, "already_published");
  assert.equal(harness.warehouseCalls, callsAfterSuccess);
});
