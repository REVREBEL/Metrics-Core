import { eq, and, inArray } from "drizzle-orm";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

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

export interface DraftRepository {
  listDrafts(tableKey: string, userId: string): Promise<DraftEditRecord[]>;
  saveDraft(draft: {
    tableKey: string;
    userId: string;
    rowKey: string;
    originalPayload?: Record<string, unknown> | null;
    draftPayload: Record<string, unknown>;
  }): Promise<DraftEditRecord>;
  discardDrafts(tableKey: string, userId: string, rowKeys: string[]): Promise<number>;
  discardAllDrafts(tableKey: string, userId: string): Promise<number>;
  recordAuditLog(audit: AuditLogRecord): Promise<void>;
}

export function getDb() {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    throw new DatabaseConfigurationError();
  }
  const client = postgres(connectionString);
  return drizzle(client, { schema });
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

  async saveDraft(input: {
    tableKey: string;
    userId: string;
    rowKey: string;
    originalPayload?: Record<string, unknown> | null;
    draftPayload: Record<string, unknown>;
  }): Promise<DraftEditRecord> {
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

  async saveDraft(input: {
    tableKey: string;
    userId: string;
    rowKey: string;
    originalPayload?: Record<string, unknown> | null;
    draftPayload: Record<string, unknown>;
  }): Promise<DraftEditRecord> {
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

  async recordAuditLog(audit: AuditLogRecord): Promise<void> {
    this.auditLogs.push({ ...audit });
  }
}
