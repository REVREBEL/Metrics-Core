import { and, eq, inArray } from "drizzle-orm";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";
import type {
  ChangeRequestFilters,
  ChangeRequestItemRecord,
  ChangeRequestRecord,
  ChangeRequestRepository,
  ChangeRequestWithItems,
  CreateChangeRequestParams,
  ReviewChangeRequestParams,
  WithdrawChangeRequestParams,
} from "./repository-types";

export { and, eq, inArray } from "drizzle-orm";

export * from "./repository-types";
export * from "./schema";

export class DatabaseConfigurationError extends Error {
  constructor(
    message = "DATABASE_URL environment variable is required to connect to PostgreSQL database.",
  ) {
    super(message);
    this.name = "DatabaseConfigurationError";
  }
}

export interface DraftEditRecord {
  id: string;
  tableKey: string;
  userId: string;
  rowKey: string;
  originalPayload: Record<string, unknown> | null;
  draftPayload: Record<string, unknown>;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface AuditLogRecord {
  actorId?: string | null;
  entityType: string;
  entityId?: string | null;
  action: string;
  metadata?: Record<string, unknown> | null;
  beforeState?: Record<string, unknown> | null;
  afterState?: Record<string, unknown> | null;
}

export interface SaveDraftWithAuditInput {
  tableKey: string;
  userId: string;
  rowKey: string;
  originalPayload?: Record<string, unknown> | null;
  draftPayload: Record<string, unknown>;
}

export interface DraftRepository {
  listDrafts(tableKey: string, userId: string): Promise<DraftEditRecord[]>;
  saveDraft(draft: SaveDraftWithAuditInput): Promise<DraftEditRecord>;
  saveDraftsWithAudit(
    tableKey: string,
    userId: string,
    records: SaveDraftWithAuditInput[],
  ): Promise<DraftEditRecord[]>;
  discardDrafts(tableKey: string, userId: string, rowKeys: string[]): Promise<number>;
  discardDraftsWithAudit(tableKey: string, userId: string, rowKeys: string[]): Promise<number>;
  discardAllDrafts(tableKey: string, userId: string): Promise<number>;
  discardAllDraftsWithAudit(tableKey: string, userId: string): Promise<number>;
  recordAuditLog(audit: AuditLogRecord): Promise<void>;
}

let cachedDb: ReturnType<typeof drizzle> | null = null;

export function getDb() {
  if (cachedDb) return cachedDb;

  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    throw new DatabaseConfigurationError();
  }
  const client = postgres(connectionString);
  cachedDb = drizzle(client, { schema });
  return cachedDb;
}

export class PostgresDraftRepository implements DraftRepository {
  private db: ReturnType<typeof getDb>;

  constructor() {
    this.db = getDb();
  }

  async listDrafts(tableKey: string, userId: string): Promise<DraftEditRecord[]> {
    const rows = await this.db
      .select()
      .from(schema.lookupTableDraftEdits)
      .where(
        and(
          eq(schema.lookupTableDraftEdits.tableKey, tableKey),
          eq(schema.lookupTableDraftEdits.userId, userId),
          eq(schema.lookupTableDraftEdits.status, "draft"),
        ),
      );

    return rows.map((r) => ({
      id: r.id,
      tableKey: r.tableKey,
      userId: r.userId,
      rowKey: r.rowKey,
      originalPayload: r.originalPayload as Record<string, unknown> | null,
      draftPayload: r.draftPayload as Record<string, unknown>,
      status: r.status,
      createdAt: r.createdAt,
      updatedAt: r.updatedAt,
    }));
  }

  async saveDraft(input: SaveDraftWithAuditInput): Promise<DraftEditRecord> {
    const [inserted] = await this.db
      .insert(schema.lookupTableDraftEdits)
      .values({
        tableKey: input.tableKey,
        userId: input.userId,
        rowKey: input.rowKey,
        originalPayload: input.originalPayload ?? null,
        draftPayload: input.draftPayload,
        status: "draft",
        updatedAt: new Date(),
      })
      .onConflictDoUpdate({
        target: [
          schema.lookupTableDraftEdits.userId,
          schema.lookupTableDraftEdits.tableKey,
          schema.lookupTableDraftEdits.rowKey,
        ],
        set: {
          draftPayload: input.draftPayload,
          originalPayload: input.originalPayload ?? undefined,
          status: "draft",
          updatedAt: new Date(),
        },
      })
      .returning();

    return {
      id: inserted.id,
      tableKey: inserted.tableKey,
      userId: inserted.userId,
      rowKey: inserted.rowKey,
      originalPayload: inserted.originalPayload as Record<string, unknown> | null,
      draftPayload: inserted.draftPayload as Record<string, unknown>,
      status: inserted.status,
      createdAt: inserted.createdAt,
      updatedAt: inserted.updatedAt,
    };
  }

  async saveDraftsWithAudit(
    tableKey: string,
    userId: string,
    records: SaveDraftWithAuditInput[],
  ): Promise<DraftEditRecord[]> {
    return this.db.transaction(async (tx) => {
      const savedResults: DraftEditRecord[] = [];

      for (const input of records) {
        // Find existing draft to check action and beforeState
        const [existing] = await tx
          .select()
          .from(schema.lookupTableDraftEdits)
          .where(
            and(
              eq(schema.lookupTableDraftEdits.userId, userId),
              eq(schema.lookupTableDraftEdits.tableKey, tableKey),
              eq(schema.lookupTableDraftEdits.rowKey, input.rowKey),
            ),
          )
          .limit(1);

        const action = existing ? "DRAFT_UPDATED" : "DRAFT_CREATED";
        const beforeState = existing
          ? (existing.draftPayload as Record<string, unknown>)
          : null;

        const [saved] = await tx
          .insert(schema.lookupTableDraftEdits)
          .values({
            tableKey,
            userId,
            rowKey: input.rowKey,
            originalPayload: input.originalPayload ?? null,
            draftPayload: input.draftPayload,
            status: "draft",
            updatedAt: new Date(),
          })
          .onConflictDoUpdate({
            target: [
              schema.lookupTableDraftEdits.userId,
              schema.lookupTableDraftEdits.tableKey,
              schema.lookupTableDraftEdits.rowKey,
            ],
            set: {
              draftPayload: input.draftPayload,
              originalPayload: input.originalPayload ?? undefined,
              status: "draft",
              updatedAt: new Date(),
            },
          })
          .returning();

        await tx.insert(schema.appAuditLog).values({
          actorId: userId,
          entityType: "lookup_table_draft_edits",
          entityId: saved.id,
          action,
          metadata: { tableKey, rowKey: input.rowKey },
          beforeState,
          afterState: input.draftPayload,
        });

        savedResults.push({
          id: saved.id,
          tableKey: saved.tableKey,
          userId: saved.userId,
          rowKey: saved.rowKey,
          originalPayload: saved.originalPayload as Record<string, unknown> | null,
          draftPayload: saved.draftPayload as Record<string, unknown>,
          status: saved.status,
          createdAt: saved.createdAt,
          updatedAt: saved.updatedAt,
        });
      }

      return savedResults;
    });
  }

  async discardDrafts(tableKey: string, userId: string, rowKeys: string[]): Promise<number> {
    if (!rowKeys || rowKeys.length === 0) {
      throw new Error("discardDrafts requires a non-empty array of rowKeys.");
    }

    const deleted = await this.db
      .delete(schema.lookupTableDraftEdits)
      .where(
        and(
          eq(schema.lookupTableDraftEdits.tableKey, tableKey),
          eq(schema.lookupTableDraftEdits.userId, userId),
          inArray(schema.lookupTableDraftEdits.rowKey, rowKeys),
        ),
      )
      .returning({ id: schema.lookupTableDraftEdits.id });

    return deleted.length;
  }

  async discardDraftsWithAudit(
    tableKey: string,
    userId: string,
    rowKeys: string[],
  ): Promise<number> {
    if (!rowKeys || rowKeys.length === 0) {
      throw new Error("discardDraftsWithAudit requires a non-empty array of rowKeys.");
    }

    return this.db.transaction(async (tx) => {
      const deleted = await tx
        .delete(schema.lookupTableDraftEdits)
        .where(
          and(
            eq(schema.lookupTableDraftEdits.tableKey, tableKey),
            eq(schema.lookupTableDraftEdits.userId, userId),
            inArray(schema.lookupTableDraftEdits.rowKey, rowKeys),
          ),
        )
        .returning({ id: schema.lookupTableDraftEdits.id });

      await tx.insert(schema.appAuditLog).values({
        actorId: userId,
        entityType: "lookup_table_draft_edits",
        action: "DRAFT_DISCARDED",
        metadata: { tableKey, rowKeys, count: deleted.length },
      });

      return deleted.length;
    });
  }

  async discardAllDrafts(tableKey: string, userId: string): Promise<number> {
    const deleted = await this.db
      .delete(schema.lookupTableDraftEdits)
      .where(
        and(
          eq(schema.lookupTableDraftEdits.tableKey, tableKey),
          eq(schema.lookupTableDraftEdits.userId, userId),
        ),
      )
      .returning({ id: schema.lookupTableDraftEdits.id });

    return deleted.length;
  }

  async discardAllDraftsWithAudit(
    tableKey: string,
    userId: string,
  ): Promise<number> {
    return this.db.transaction(async (tx) => {
      const deleted = await tx
        .delete(schema.lookupTableDraftEdits)
        .where(
          and(
            eq(schema.lookupTableDraftEdits.tableKey, tableKey),
            eq(schema.lookupTableDraftEdits.userId, userId),
          ),
        )
        .returning({ id: schema.lookupTableDraftEdits.id });

      await tx.insert(schema.appAuditLog).values({
        actorId: userId,
        entityType: "lookup_table_draft_edits",
        action: "DRAFT_DISCARD_ALL",
        metadata: { tableKey, count: deleted.length },
      });

      return deleted.length;
    });
  }

  async recordAuditLog(audit: AuditLogRecord): Promise<void> {
    await this.db.insert(schema.appAuditLog).values({
      actorId: audit.actorId ?? null,
      entityType: audit.entityType,
      entityId: audit.entityId ?? null,
      action: audit.action,
      metadata: audit.metadata ?? null,
      beforeState: audit.beforeState ?? null,
      afterState: audit.afterState ?? null,
    });
  }
}

export class InMemoryDraftRepository implements DraftRepository {
  private drafts: Map<string, DraftEditRecord> = new Map();
  public auditLogs: AuditLogRecord[] = [];

  private getKey(tableKey: string, userId: string, rowKey: string): string {
    return `${userId}:${tableKey}:${rowKey}`;
  }

  async listDrafts(tableKey: string, userId: string): Promise<DraftEditRecord[]> {
    const results: DraftEditRecord[] = [];
    for (const draft of this.drafts.values()) {
      if (
        draft.tableKey === tableKey &&
        draft.userId === userId &&
        draft.status === "draft"
      ) {
        results.push({ ...draft });
      }
    }
    return results;
  }

  async saveDraft(input: SaveDraftWithAuditInput): Promise<DraftEditRecord> {
    const key = this.getKey(input.tableKey, input.userId, input.rowKey);
    const existing = this.drafts.get(key);
    const now = new Date();
    const record: DraftEditRecord = {
      id: existing ? existing.id : `draft-${Math.random().toString(36).substring(2, 9)}`,
      tableKey: input.tableKey,
      userId: input.userId,
      rowKey: input.rowKey,
      originalPayload: input.originalPayload ?? existing?.originalPayload ?? null,
      draftPayload: input.draftPayload,
      status: "draft",
      createdAt: existing ? existing.createdAt : now,
      updatedAt: now,
    };
    this.drafts.set(key, record);
    return { ...record };
  }

  async saveDraftsWithAudit(
    tableKey: string,
    userId: string,
    records: SaveDraftWithAuditInput[],
  ): Promise<DraftEditRecord[]> {
    const savedResults: DraftEditRecord[] = [];

    for (const input of records) {
      const key = this.getKey(tableKey, userId, input.rowKey);
      const existing = this.drafts.get(key);
      const action = existing ? "DRAFT_UPDATED" : "DRAFT_CREATED";
      const beforeState = existing ? existing.draftPayload : null;

      const saved = await this.saveDraft(input);
      savedResults.push(saved);

      this.auditLogs.push({
        actorId: userId,
        entityType: "lookup_table_draft_edits",
        entityId: saved.id,
        action,
        metadata: { tableKey, rowKey: input.rowKey },
        beforeState,
        afterState: input.draftPayload,
      });
    }

    return savedResults;
  }

  async discardDrafts(tableKey: string, userId: string, rowKeys: string[]): Promise<number> {
    if (!rowKeys || rowKeys.length === 0) {
      throw new Error("discardDrafts requires a non-empty array of rowKeys.");
    }
    let count = 0;
    for (const rowKey of rowKeys) {
      const key = this.getKey(tableKey, userId, rowKey);
      if (this.drafts.delete(key)) {
        count++;
      }
    }
    return count;
  }

  async discardDraftsWithAudit(
    tableKey: string,
    userId: string,
    rowKeys: string[],
  ): Promise<number> {
    const count = await this.discardDrafts(tableKey, userId, rowKeys);
    this.auditLogs.push({
      actorId: userId,
      entityType: "lookup_table_draft_edits",
      action: "DRAFT_DISCARDED",
      metadata: { tableKey, rowKeys, count },
    });
    return count;
  }

  async discardAllDrafts(tableKey: string, userId: string): Promise<number> {
    let count = 0;
    for (const [key, draft] of Array.from(this.drafts.entries())) {
      if (draft.tableKey === tableKey && draft.userId === userId) {
        this.drafts.delete(key);
        count++;
      }
    }
    return count;
  }

  async discardAllDraftsWithAudit(
    tableKey: string,
    userId: string,
  ): Promise<number> {
    const count = await this.discardAllDrafts(tableKey, userId);
    this.auditLogs.push({
      actorId: userId,
      entityType: "lookup_table_draft_edits",
      action: "DRAFT_DISCARD_ALL",
      metadata: { tableKey, count },
    });
    return count;
  }

  async recordAuditLog(audit: AuditLogRecord): Promise<void> {
    this.auditLogs.push({ ...audit });
  }
}

export class PostgresChangeRequestRepository implements ChangeRequestRepository {
  private db: ReturnType<typeof getDb>;

  constructor() {
    this.db = getDb();
  }

  async createChangeRequestWithAudit(
    params: CreateChangeRequestParams,
  ): Promise<ChangeRequestWithItems> {
    if (!params.drafts || params.drafts.length === 0) {
      throw new Error("Cannot create a change request with zero drafts.");
    }

    const trimmedTitle = params.title.trim();
    if (!trimmedTitle || trimmedTitle.length < 3 || trimmedTitle.length > 100) {
      throw new Error("Title is required and must be between 3 and 100 characters.");
    }

    return this.db.transaction(async (tx) => {
      const draftIds = params.drafts.map((d) => d.draftEditId);

      const selectedDrafts = await tx
        .select()
        .from(schema.lookupTableDraftEdits)
        .where(
          and(
            eq(schema.lookupTableDraftEdits.userId, params.submitterId),
            eq(schema.lookupTableDraftEdits.tableKey, params.tableKey),
            inArray(schema.lookupTableDraftEdits.id, draftIds),
          ),
        )
        .for("update");

      if (selectedDrafts.length !== draftIds.length) {
        throw new Error(
          "One or more selected drafts do not exist, belong to another table/user, or were deleted.",
        );
      }

      for (const draft of selectedDrafts) {
        if (draft.status !== "draft") {
          throw new Error(
            `Draft for row '${draft.rowKey}' is already in status '${draft.status}' and cannot be submitted.`,
          );
        }
      }

      const [req] = await tx
        .insert(schema.lookupTableChangeRequests)
        .values({
          tableKey: params.tableKey,
          title: trimmedTitle,
          description: params.description?.trim() || null,
          submitterId: params.submitterId,
          status: "submitted",
          submittedAt: new Date(),
          updatedAt: new Date(),
        })
        .returning();

      const itemsToInsert = params.drafts.map((d) => ({
        changeRequestId: req.id,
        draftEditId: d.draftEditId,
        rowKey: d.rowKey,
        originalPayload: d.originalPayload ?? null,
        submittedPayload: d.draftPayload,
        validationSnapshot: d.validationSnapshot ?? null,
      }));

      const insertedItems = await tx
        .insert(schema.lookupTableChangeRequestItems)
        .values(itemsToInsert)
        .returning();

      await tx
        .update(schema.lookupTableDraftEdits)
        .set({ status: "submitted", updatedAt: new Date() })
        .where(inArray(schema.lookupTableDraftEdits.id, draftIds));

      await tx.insert(schema.appAuditLog).values({
        actorId: params.submitterId,
        entityType: "lookup_table_change_requests",
        entityId: req.id,
        action: "CHANGE_REQUEST_SUBMITTED",
        metadata: {
          tableKey: params.tableKey,
          title: req.title,
          itemCount: insertedItems.length,
          draftIds,
        },
        afterState: { id: req.id, title: req.title, status: "submitted" },
      });

      const items: ChangeRequestItemRecord[] = insertedItems.map((item) => ({
        id: item.id,
        changeRequestId: item.changeRequestId,
        draftEditId: item.draftEditId,
        rowKey: item.rowKey,
        originalPayload: item.originalPayload as Record<string, unknown> | null,
        submittedPayload: item.submittedPayload as Record<string, unknown>,
        validationSnapshot: item.validationSnapshot as Record<string, unknown> | null,
        createdAt: item.createdAt,
      }));

      return {
        id: req.id,
        tableKey: req.tableKey,
        title: req.title,
        description: req.description,
        submitterId: req.submitterId,
        reviewerId: req.reviewerId,
        status: req.status as "submitted",
        reviewNotes: req.reviewNotes,
        submittedAt: req.submittedAt,
        reviewedAt: req.reviewedAt,
        withdrawnAt: req.withdrawnAt,
        createdAt: req.createdAt,
        updatedAt: req.updatedAt,
        items,
      };
    });
  }

  async listChangeRequests(
    filters?: ChangeRequestFilters,
  ): Promise<ChangeRequestRecord[]> {
    const conditions = [];

    if (filters?.status) {
      conditions.push(eq(schema.lookupTableChangeRequests.status, filters.status));
    }
    if (filters?.tableKey) {
      conditions.push(eq(schema.lookupTableChangeRequests.tableKey, filters.tableKey));
    }
    if (filters?.submitterId) {
      conditions.push(eq(schema.lookupTableChangeRequests.submitterId, filters.submitterId));
    }

    const rows = await this.db
      .select()
      .from(schema.lookupTableChangeRequests)
      .where(conditions.length > 0 ? and(...conditions) : undefined);

    return rows.map((r) => ({
      id: r.id,
      tableKey: r.tableKey,
      title: r.title,
      description: r.description,
      submitterId: r.submitterId,
      reviewerId: r.reviewerId,
      status: r.status as ChangeRequestRecord["status"],
      reviewNotes: r.reviewNotes,
      submittedAt: r.submittedAt,
      reviewedAt: r.reviewedAt,
      withdrawnAt: r.withdrawnAt,
      createdAt: r.createdAt,
      updatedAt: r.updatedAt,
    }));
  }

  async getChangeRequest(id: string): Promise<ChangeRequestWithItems | null> {
    const [req] = await this.db
      .select()
      .from(schema.lookupTableChangeRequests)
      .where(eq(schema.lookupTableChangeRequests.id, id))
      .limit(1);

    if (!req) return null;

    const items = await this.db
      .select()
      .from(schema.lookupTableChangeRequestItems)
      .where(eq(schema.lookupTableChangeRequestItems.changeRequestId, id));

    return {
      id: req.id,
      tableKey: req.tableKey,
      title: req.title,
      description: req.description,
      submitterId: req.submitterId,
      reviewerId: req.reviewerId,
      status: req.status as ChangeRequestRecord["status"],
      reviewNotes: req.reviewNotes,
      submittedAt: req.submittedAt,
      reviewedAt: req.reviewedAt,
      withdrawnAt: req.withdrawnAt,
      createdAt: req.createdAt,
      updatedAt: req.updatedAt,
      items: items.map((i) => ({
        id: i.id,
        changeRequestId: i.changeRequestId,
        draftEditId: i.draftEditId,
        rowKey: i.rowKey,
        originalPayload: i.originalPayload as Record<string, unknown> | null,
        submittedPayload: i.submittedPayload as Record<string, unknown>,
        validationSnapshot: i.validationSnapshot as Record<string, unknown> | null,
        createdAt: i.createdAt,
      })),
    };
  }

  async reviewChangeRequestWithAudit(
    params: ReviewChangeRequestParams,
  ): Promise<ChangeRequestWithItems> {
    const trimmedNotes = params.reviewNotes?.trim() ?? null;
    if (params.decision === "reject" && (!trimmedNotes || trimmedNotes.length < 3)) {
      throw new Error("Rejection notes are required and must be at least 3 characters.");
    }

    return this.db.transaction(async (tx) => {
      const [req] = await tx
        .select()
        .from(schema.lookupTableChangeRequests)
        .where(eq(schema.lookupTableChangeRequests.id, params.changeRequestId))
        .for("update");

      if (!req) {
        throw new Error("Change request not found.");
      }

      if (req.status !== "submitted") {
        throw new Error(`Change request '${req.id}' is in status '${req.status}' and cannot be reviewed.`);
      }

      if (req.submitterId === params.reviewerId) {
        throw new Error("Self-review prohibited. Submitter cannot approve or reject their own request.");
      }

      const newReqStatus = params.decision === "approve" ? "approved" : "rejected";
      const newDraftStatus = params.decision === "approve" ? "approved" : "draft";

      const [updatedReq] = await tx
        .update(schema.lookupTableChangeRequests)
        .set({
          status: newReqStatus,
          reviewerId: params.reviewerId,
          reviewNotes: trimmedNotes,
          reviewedAt: new Date(),
          updatedAt: new Date(),
        })
        .where(eq(schema.lookupTableChangeRequests.id, params.changeRequestId))
        .returning();

      const items = await tx
        .select()
        .from(schema.lookupTableChangeRequestItems)
        .where(eq(schema.lookupTableChangeRequestItems.changeRequestId, params.changeRequestId));

      const draftEditIds = items.map((i) => i.draftEditId);

      await tx
        .update(schema.lookupTableDraftEdits)
        .set({ status: newDraftStatus, updatedAt: new Date() })
        .where(inArray(schema.lookupTableDraftEdits.id, draftEditIds));

      const action = params.decision === "approve" ? "CHANGE_REQUEST_APPROVED" : "CHANGE_REQUEST_REJECTED";

      await tx.insert(schema.appAuditLog).values({
        actorId: params.reviewerId,
        entityType: "lookup_table_change_requests",
        entityId: updatedReq.id,
        action,
        metadata: {
          tableKey: updatedReq.tableKey,
          reviewerId: params.reviewerId,
          reviewNotes: trimmedNotes,
        },
        beforeState: { status: "submitted" },
        afterState: { status: newReqStatus },
      });

      return {
        id: updatedReq.id,
        tableKey: updatedReq.tableKey,
        title: updatedReq.title,
        description: updatedReq.description,
        submitterId: updatedReq.submitterId,
        reviewerId: updatedReq.reviewerId,
        status: updatedReq.status as ChangeRequestRecord["status"],
        reviewNotes: updatedReq.reviewNotes,
        submittedAt: updatedReq.submittedAt,
        reviewedAt: updatedReq.reviewedAt,
        withdrawnAt: updatedReq.withdrawnAt,
        createdAt: updatedReq.createdAt,
        updatedAt: updatedReq.updatedAt,
        items: items.map((i) => ({
          id: i.id,
          changeRequestId: i.changeRequestId,
          draftEditId: i.draftEditId,
          rowKey: i.rowKey,
          originalPayload: i.originalPayload as Record<string, unknown> | null,
          submittedPayload: i.submittedPayload as Record<string, unknown>,
          validationSnapshot: i.validationSnapshot as Record<string, unknown> | null,
          createdAt: i.createdAt,
        })),
      };
    });
  }

  async withdrawChangeRequestWithAudit(
    params: WithdrawChangeRequestParams,
  ): Promise<ChangeRequestWithItems> {
    return this.db.transaction(async (tx) => {
      const [req] = await tx
        .select()
        .from(schema.lookupTableChangeRequests)
        .where(eq(schema.lookupTableChangeRequests.id, params.changeRequestId))
        .for("update");

      if (!req) {
        throw new Error("Change request not found.");
      }

      if (req.status !== "submitted") {
        throw new Error(`Change request '${req.id}' is in status '${req.status}' and cannot be withdrawn.`);
      }

      const [updatedReq] = await tx
        .update(schema.lookupTableChangeRequests)
        .set({
          status: "withdrawn",
          withdrawnAt: new Date(),
          updatedAt: new Date(),
        })
        .where(eq(schema.lookupTableChangeRequests.id, params.changeRequestId))
        .returning();

      const items = await tx
        .select()
        .from(schema.lookupTableChangeRequestItems)
        .where(eq(schema.lookupTableChangeRequestItems.changeRequestId, params.changeRequestId));

      const draftEditIds = items.map((i) => i.draftEditId);

      await tx
        .update(schema.lookupTableDraftEdits)
        .set({ status: "draft", updatedAt: new Date() })
        .where(inArray(schema.lookupTableDraftEdits.id, draftEditIds));

      await tx.insert(schema.appAuditLog).values({
        actorId: params.actorId,
        entityType: "lookup_table_change_requests",
        entityId: updatedReq.id,
        action: "CHANGE_REQUEST_WITHDRAWN",
        metadata: {
          tableKey: updatedReq.tableKey,
          actorId: params.actorId,
        },
        beforeState: { status: "submitted" },
        afterState: { status: "withdrawn" },
      });

      return {
        id: updatedReq.id,
        tableKey: updatedReq.tableKey,
        title: updatedReq.title,
        description: updatedReq.description,
        submitterId: updatedReq.submitterId,
        reviewerId: updatedReq.reviewerId,
        status: updatedReq.status as ChangeRequestRecord["status"],
        reviewNotes: updatedReq.reviewNotes,
        submittedAt: updatedReq.submittedAt,
        reviewedAt: updatedReq.reviewedAt,
        withdrawnAt: updatedReq.withdrawnAt,
        createdAt: updatedReq.createdAt,
        updatedAt: updatedReq.updatedAt,
        items: items.map((i) => ({
          id: i.id,
          changeRequestId: i.changeRequestId,
          draftEditId: i.draftEditId,
          rowKey: i.rowKey,
          originalPayload: i.originalPayload as Record<string, unknown> | null,
          submittedPayload: i.submittedPayload as Record<string, unknown>,
          validationSnapshot: i.validationSnapshot as Record<string, unknown> | null,
          createdAt: i.createdAt,
        })),
      };
    });
  }
}

export class InMemoryChangeRequestRepository implements ChangeRequestRepository {
  public requests: Map<string, ChangeRequestRecord> = new Map();
  public items: Map<string, ChangeRequestItemRecord[]> = new Map();
  public auditLogs: AuditLogRecord[] = [];

  async createChangeRequestWithAudit(
    params: CreateChangeRequestParams,
  ): Promise<ChangeRequestWithItems> {
    if (!params.drafts || params.drafts.length === 0) {
      throw new Error("Cannot create a change request with zero drafts.");
    }

    const trimmedTitle = params.title.trim();
    if (!trimmedTitle || trimmedTitle.length < 3 || trimmedTitle.length > 100) {
      throw new Error("Title is required and must be between 3 and 100 characters.");
    }

    const reqId = `req-${Math.random().toString(36).substring(2, 9)}`;
    const now = new Date();

    const requestRecord: ChangeRequestRecord = {
      id: reqId,
      tableKey: params.tableKey,
      title: trimmedTitle,
      description: params.description?.trim() || null,
      submitterId: params.submitterId,
      reviewerId: null,
      status: "submitted",
      reviewNotes: null,
      submittedAt: now,
      reviewedAt: null,
      withdrawnAt: null,
      createdAt: now,
      updatedAt: now,
    };

    const itemRecords: ChangeRequestItemRecord[] = params.drafts.map((d) => ({
      id: `item-${Math.random().toString(36).substring(2, 9)}`,
      changeRequestId: reqId,
      draftEditId: d.draftEditId,
      rowKey: d.rowKey,
      originalPayload: d.originalPayload ?? null,
      submittedPayload: d.draftPayload,
      validationSnapshot: d.validationSnapshot ?? null,
      createdAt: now,
    }));

    this.requests.set(reqId, requestRecord);
    this.items.set(reqId, itemRecords);

    this.auditLogs.push({
      actorId: params.submitterId,
      entityType: "lookup_table_change_requests",
      entityId: reqId,
      action: "CHANGE_REQUEST_SUBMITTED",
      metadata: {
        tableKey: params.tableKey,
        title: trimmedTitle,
        itemCount: itemRecords.length,
      },
      afterState: { id: reqId, title: trimmedTitle, status: "submitted" },
    });

    return {
      ...requestRecord,
      items: itemRecords,
    };
  }

  async listChangeRequests(
    filters?: ChangeRequestFilters,
  ): Promise<ChangeRequestRecord[]> {
    const results: ChangeRequestRecord[] = [];
    for (const req of this.requests.values()) {
      if (filters?.status && req.status !== filters.status) continue;
      if (filters?.tableKey && req.tableKey !== filters.tableKey) continue;
      if (filters?.submitterId && req.submitterId !== filters.submitterId) continue;
      results.push({ ...req });
    }
    return results;
  }

  async getChangeRequest(id: string): Promise<ChangeRequestWithItems | null> {
    const req = this.requests.get(id);
    if (!req) return null;
    const items = this.items.get(id) ?? [];
    return {
      ...req,
      items: items.map((i) => ({ ...i })),
    };
  }

  async reviewChangeRequestWithAudit(
    params: ReviewChangeRequestParams,
  ): Promise<ChangeRequestWithItems> {
    const req = this.requests.get(params.changeRequestId);
    if (!req) {
      throw new Error("Change request not found.");
    }

    if (req.status !== "submitted") {
      throw new Error(`Change request '${req.id}' is in status '${req.status}' and cannot be reviewed.`);
    }

    if (req.submitterId === params.reviewerId) {
      throw new Error("Self-review prohibited. Submitter cannot approve or reject their own request.");
    }

    const trimmedNotes = params.reviewNotes?.trim() ?? null;
    if (params.decision === "reject" && (!trimmedNotes || trimmedNotes.length < 3)) {
      throw new Error("Rejection notes are required and must be at least 3 characters.");
    }

    const now = new Date();
    const newReqStatus = params.decision === "approve" ? "approved" : "rejected";

    const updated: ChangeRequestRecord = {
      ...req,
      status: newReqStatus,
      reviewerId: params.reviewerId,
      reviewNotes: trimmedNotes,
      reviewedAt: now,
      updatedAt: now,
    };

    this.requests.set(req.id, updated);

    const action = params.decision === "approve" ? "CHANGE_REQUEST_APPROVED" : "CHANGE_REQUEST_REJECTED";

    this.auditLogs.push({
      actorId: params.reviewerId,
      entityType: "lookup_table_change_requests",
      entityId: req.id,
      action,
      metadata: {
        tableKey: req.tableKey,
        reviewerId: params.reviewerId,
        reviewNotes: trimmedNotes,
      },
      beforeState: { status: "submitted" },
      afterState: { status: newReqStatus },
    });

    const items = this.items.get(req.id) ?? [];
    return {
      ...updated,
      items: items.map((i) => ({ ...i })),
    };
  }

  async withdrawChangeRequestWithAudit(
    params: WithdrawChangeRequestParams,
  ): Promise<ChangeRequestWithItems> {
    const req = this.requests.get(params.changeRequestId);
    if (!req) {
      throw new Error("Change request not found.");
    }

    if (req.status !== "submitted") {
      throw new Error(`Change request '${req.id}' is in status '${req.status}' and cannot be withdrawn.`);
    }

    const now = new Date();
    const updated: ChangeRequestRecord = {
      ...req,
      status: "withdrawn",
      withdrawnAt: now,
      updatedAt: now,
    };

    this.requests.set(req.id, updated);

    this.auditLogs.push({
      actorId: params.actorId,
      entityType: "lookup_table_change_requests",
      entityId: req.id,
      action: "CHANGE_REQUEST_WITHDRAWN",
      metadata: {
        tableKey: req.tableKey,
        actorId: params.actorId,
      },
      beforeState: { status: "submitted" },
      afterState: { status: "withdrawn" },
    });

    const items = this.items.get(req.id) ?? [];
    return {
      ...updated,
      items: items.map((i) => ({ ...i })),
    };
  }
}
