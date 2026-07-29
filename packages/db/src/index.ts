import { and, eq, inArray } from "drizzle-orm";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

export { and, eq, inArray } from "drizzle-orm";

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
