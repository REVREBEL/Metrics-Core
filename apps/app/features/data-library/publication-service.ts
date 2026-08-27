import { randomUUID } from "node:crypto";
import {
  type ChangeRequestWithItems,
  appAuditLog,
  eq,
  getDb,
  inArray,
  lookupTableChangeRequestItems,
  lookupTableChangeRequests,
  lookupTableDraftEdits,
} from "@repo/db";
import {
  type PublicationConflict,
  type PublicationTableDefinition,
  type WarehousePublicationResult,
  publishRowsToWarehouse,
} from "@repo/data/server/data-library";
import { getDataLibraryTableDefinition } from "./registry";
import type { VerifiedWorkspaceSession } from "./session";

export type PublicationOutcome =
  | "already_published"
  | "conflict"
  | "failed"
  | "invalid_state"
  | "not_found"
  | "published"
  | "unauthorized"
  | "unsupported";

export interface PublicationResult {
  success: boolean;
  outcome: PublicationOutcome;
  message: string;
  conflicts: PublicationConflict[];
  publishedRows: number;
  warehouseRowsWritten: number;
  correlationId: string;
  warehouseJobId: string | null;
  startedAt: string;
  completedAt: string;
  retryable: boolean;
  nextAction?: string;
}

interface AuditInput {
  actorId: string;
  requestId: string;
  tableKey: string;
  action:
    | "publication_conflict"
    | "publication_failed"
    | "publication_started"
    | "publication_succeeded";
  correlationId: string;
  metadata?: Record<string, unknown>;
  beforeState?: Record<string, unknown> | null;
  afterState?: Record<string, unknown> | null;
}

export interface PublicationDependencies {
  loadRequest(id: string): Promise<ChangeRequestWithItems | null>;
  recordAudit(input: AuditInput): Promise<void>;
  transitionOutcome(input: {
    requestId: string;
    draftIds: string[];
    requestStatus: "conflict" | "published";
    draftStatus: "draft" | "published";
    audit: AuditInput;
  }): Promise<void>;
  publishWarehouse(
    definition: PublicationTableDefinition,
    items: Array<{
      rowKey: string;
      originalPayload: Record<string, unknown> | null;
      submittedPayload: Record<string, unknown>;
    }>,
  ): Promise<WarehousePublicationResult>;
  now(): Date;
  newCorrelationId(): string;
}

function toIso(date: Date): string {
  return date.toISOString();
}

function buildResult(
  startedAt: Date,
  completedAt: Date,
  correlationId: string,
  partial: Omit<
    PublicationResult,
    "completedAt" | "correlationId" | "startedAt"
  >,
): PublicationResult {
  return {
    ...partial,
    correlationId,
    startedAt: toIso(startedAt),
    completedAt: toIso(completedAt),
  };
}

export function getPublicationCapability(
  tableKey: string,
  authContext: VerifiedWorkspaceSession,
): { configured: boolean; supported: boolean; canPublish: boolean } {
  const definition = getDataLibraryTableDefinition(tableKey);
  if (!definition) {
    return { configured: false, supported: false, canPublish: false };
  }

  const supported = definition.publication === "supported";
  const canPublish =
    authContext.isAuthenticated &&
    supported &&
    definition.permissions.publish.some((permission) =>
      authContext.permissions.includes(permission),
    );

  return { configured: true, supported, canPublish };
}

async function loadRequestFromDb(
  id: string,
): Promise<ChangeRequestWithItems | null> {
  const db = getDb();
  const [request] = await db
    .select()
    .from(lookupTableChangeRequests)
    .where(eq(lookupTableChangeRequests.id, id))
    .limit(1);

  if (!request) return null;

  const items = await db
    .select()
    .from(lookupTableChangeRequestItems)
    .where(eq(lookupTableChangeRequestItems.changeRequestId, id));

  return {
    ...request,
    items: items.map((item) => ({
      ...item,
      originalPayload: item.originalPayload as Record<string, unknown> | null,
      submittedPayload: item.submittedPayload as Record<string, unknown>,
      validationSnapshot: item.validationSnapshot as Record<string, unknown> | null,
    })),
  } as ChangeRequestWithItems;
}

async function recordAuditInDb(input: AuditInput): Promise<void> {
  const db = getDb();
  await db.insert(appAuditLog).values({
    actorId: input.actorId,
    entityType: "lookup_table_change_request",
    entityId: input.requestId,
    action: input.action,
    metadata: {
      tableKey: input.tableKey,
      correlationId: input.correlationId,
      ...input.metadata,
    },
    beforeState: input.beforeState ?? null,
    afterState: input.afterState ?? null,
  });
}

async function transitionOutcomeInDb(input: {
  requestId: string;
  draftIds: string[];
  requestStatus: "conflict" | "published";
  draftStatus: "draft" | "published";
  audit: AuditInput;
}): Promise<void> {
  const db = getDb();
  await db.transaction(async (tx) => {
    await tx
      .update(lookupTableChangeRequests)
      .set({ status: input.requestStatus, updatedAt: new Date() })
      .where(eq(lookupTableChangeRequests.id, input.requestId));

    if (input.draftIds.length > 0) {
      await tx
        .update(lookupTableDraftEdits)
        .set({ status: input.draftStatus, updatedAt: new Date() })
        .where(inArray(lookupTableDraftEdits.id, input.draftIds));
    }

    await tx.insert(appAuditLog).values({
      actorId: input.audit.actorId,
      entityType: "lookup_table_change_request",
      entityId: input.audit.requestId,
      action: input.audit.action,
      metadata: {
        tableKey: input.audit.tableKey,
        correlationId: input.audit.correlationId,
        ...input.audit.metadata,
      },
      beforeState: input.audit.beforeState ?? null,
      afterState: input.audit.afterState ?? null,
    });
  });
}

const defaultDependencies: PublicationDependencies = {
  loadRequest: loadRequestFromDb,
  recordAudit: recordAuditInDb,
  transitionOutcome: transitionOutcomeInDb,
  publishWarehouse: publishRowsToWarehouse,
  now: () => new Date(),
  newCorrelationId: () => randomUUID(),
};

export async function publishFeatureChangeRequest(
  changeRequestId: string,
  authContext: VerifiedWorkspaceSession,
  dependencies: PublicationDependencies = defaultDependencies,
): Promise<PublicationResult> {
  const startedAt = dependencies.now();
  const correlationId = dependencies.newCorrelationId();

  if (!authContext.isAuthenticated) {
    return buildResult(startedAt, dependencies.now(), correlationId, {
      success: false,
      outcome: "unauthorized",
      message: "Authentication is required to publish Data Library changes.",
      conflicts: [],
      publishedRows: 0,
      warehouseRowsWritten: 0,
      warehouseJobId: null,
      retryable: false,
    });
  }

  let request: ChangeRequestWithItems | null;
  try {
    request = await dependencies.loadRequest(changeRequestId);
  } catch (error) {
    return buildResult(startedAt, dependencies.now(), correlationId, {
      success: false,
      outcome: "failed",
      message:
        error instanceof Error
          ? error.message
          : "Unable to load the change request.",
      conflicts: [],
      publishedRows: 0,
      warehouseRowsWritten: 0,
      warehouseJobId: null,
      retryable: true,
    });
  }

  if (!request) {
    return buildResult(startedAt, dependencies.now(), correlationId, {
      success: false,
      outcome: "not_found",
      message: `Change request ${changeRequestId} was not found.`,
      conflicts: [],
      publishedRows: 0,
      warehouseRowsWritten: 0,
      warehouseJobId: null,
      retryable: false,
    });
  }

  const definition = getDataLibraryTableDefinition(request.tableKey);
  if (!definition || definition.publication !== "supported") {
    return buildResult(startedAt, dependencies.now(), correlationId, {
      success: false,
      outcome: "unsupported",
      message: `Publication is not supported for ${request.tableKey}.`,
      conflicts: [],
      publishedRows: 0,
      warehouseRowsWritten: 0,
      warehouseJobId: null,
      retryable: false,
    });
  }

  if (
    !definition.permissions.publish.some((permission) =>
      authContext.permissions.includes(permission),
    )
  ) {
    return buildResult(startedAt, dependencies.now(), correlationId, {
      success: false,
      outcome: "unauthorized",
      message: "You do not have permission to publish this Data Library table.",
      conflicts: [],
      publishedRows: 0,
      warehouseRowsWritten: 0,
      warehouseJobId: null,
      retryable: false,
    });
  }

  if (request.status === "published") {
    return buildResult(startedAt, dependencies.now(), correlationId, {
      success: true,
      outcome: "already_published",
      message: "This change request has already been published.",
      conflicts: [],
      publishedRows: request.items.length,
      warehouseRowsWritten: 0,
      warehouseJobId: null,
      retryable: false,
    });
  }

  if (request.status !== "approved") {
    return buildResult(startedAt, dependencies.now(), correlationId, {
      success: false,
      outcome: "invalid_state",
      message: "Only approved change requests can be published.",
      conflicts: [],
      publishedRows: 0,
      warehouseRowsWritten: 0,
      warehouseJobId: null,
      retryable: false,
    });
  }

  const draftIds = request.items.map((item) => item.draftEditId);
  await dependencies.recordAudit({
    actorId: authContext.userId,
    requestId: request.id,
    tableKey: request.tableKey,
    action: "publication_started",
    correlationId,
    metadata: { rowKeys: request.items.map((item) => item.rowKey) },
    beforeState: { status: request.status },
  });

  try {
    const warehouseResult = await dependencies.publishWarehouse(definition, request.items);

    if (!warehouseResult.success) {
      await dependencies.transitionOutcome({
        requestId: request.id,
        draftIds,
        requestStatus: "conflict",
        draftStatus: "draft",
        audit: {
          actorId: authContext.userId,
          requestId: request.id,
          tableKey: request.tableKey,
          action: "publication_conflict",
          correlationId,
          metadata: {
            conflicts: warehouseResult.conflicts,
            rowKeys: request.items.map((item) => item.rowKey),
          },
          beforeState: { status: "approved" },
          afterState: { status: "conflict" },
        },
      });

      return buildResult(startedAt, dependencies.now(), correlationId, {
        success: false,
        outcome: "conflict",
        message: "Publication stopped because warehouse data changed.",
        conflicts: warehouseResult.conflicts,
        publishedRows: 0,
        warehouseRowsWritten: 0,
        warehouseJobId: warehouseResult.jobId,
        retryable: false,
        nextAction:
          "Refresh current warehouse values, revise the restored drafts, and submit a new change request.",
      });
    }

    await dependencies.transitionOutcome({
      requestId: request.id,
      draftIds,
      requestStatus: "published",
      draftStatus: "published",
      audit: {
        actorId: authContext.userId,
        requestId: request.id,
        tableKey: request.tableKey,
        action: "publication_succeeded",
        correlationId,
        metadata: {
          publishedRows: warehouseResult.publishedRows,
          warehouseRowsWritten: warehouseResult.warehouseRowsWritten,
          warehouseJobId: warehouseResult.jobId,
          rowKeys: request.items.map((item) => item.rowKey),
        },
        beforeState: { status: "approved" },
        afterState: { status: "published" },
      },
    });

    return buildResult(startedAt, dependencies.now(), correlationId, {
      success: true,
      outcome: "published",
      message:
        warehouseResult.warehouseRowsWritten === 0
          ? "Warehouse values were already applied; application state was reconciled successfully."
          : `Publication successful. ${warehouseResult.publishedRows} request rows published.`,
      conflicts: [],
      publishedRows: warehouseResult.publishedRows,
      warehouseRowsWritten: warehouseResult.warehouseRowsWritten,
      warehouseJobId: warehouseResult.jobId,
      retryable: false,
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "An unknown publication error occurred.";

    try {
      await dependencies.recordAudit({
        actorId: authContext.userId,
        requestId: request.id,
        tableKey: request.tableKey,
        action: "publication_failed",
        correlationId,
        metadata: {
          error: message,
          rowKeys: request.items.map((item) => item.rowKey),
        },
        beforeState: { status: "approved" },
        afterState: { status: "approved" },
      });
    } catch {
      // Preserve the original publication failure. A retry can reconcile state.
    }

    return buildResult(startedAt, dependencies.now(), correlationId, {
      success: false,
      outcome: "failed",
      message,
      conflicts: [],
      publishedRows: 0,
      warehouseRowsWritten: 0,
      warehouseJobId: null,
      retryable: true,
      nextAction: "Retry the approved request after the operational error is resolved.",
    });
  }
}
