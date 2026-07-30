import {
  boolean,
  jsonb,
  pgTable,
  text,
  timestamp,
  uniqueIndex,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

export const dataLibraryTables = pgTable("data_library_tables", {
  id: uuid("id").primaryKey().defaultRandom(),
  tableName: varchar("table_name", { length: 255 }).notNull().unique(),
  displayName: varchar("display_name", { length: 255 }),
  description: text("description"),
  uiMetadata: jsonb("ui_metadata"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
});

export const lookupTableDraftEdits = pgTable(
  "lookup_table_draft_edits",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    dataLibraryTableId: uuid("data_library_table_id"),
    tableKey: varchar("table_key", { length: 255 }).notNull(),
    userId: uuid("user_id").notNull(),
    rowKey: text("row_key").notNull(),
    originalPayload: jsonb("original_payload"),
    draftPayload: jsonb("draft_payload").notNull(),
    status: varchar("status", { length: 50 }).default("draft").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (table) => [
    uniqueIndex("lookup_table_draft_edits_user_table_row_idx").on(
      table.userId,
      table.tableKey,
      table.rowKey,
    ),
  ],
);

export const appAuditLog = pgTable("app_audit_log", {
  id: uuid("id").primaryKey().defaultRandom(),
  actorId: uuid("actor_id"),
  entityType: varchar("entity_type", { length: 255 }).notNull(),
  entityId: text("entity_id"),
  action: varchar("action", { length: 100 }).notNull(),
  metadata: jsonb("metadata"),
  beforeState: jsonb("before_state"),
  afterState: jsonb("after_state"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

export const appUsers = pgTable("app_users", {
  id: uuid("id").primaryKey().defaultRandom(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  name: varchar("name", { length: 255 }),
  isActive: boolean("is_active").default(true).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

export const userRoles = pgTable("user_roles", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id").notNull().references(() => appUsers.id, { onDelete: "cascade" }),
  role: varchar("role", { length: 100 }).notNull(),
  permissions: jsonb("permissions"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

export const lookupTableChangeRequests = pgTable("lookup_table_change_requests", {
  id: uuid("id").primaryKey().defaultRandom(),
  tableKey: varchar("table_key", { length: 255 }).notNull(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description"),
  submitterId: uuid("submitter_id").notNull(),
  reviewerId: uuid("reviewer_id"),
  status: varchar("status", { length: 50 }).notNull(),
  reviewNotes: text("review_notes"),
  submittedAt: timestamp("submitted_at", { withTimezone: true }).defaultNow().notNull(),
  reviewedAt: timestamp("reviewed_at", { withTimezone: true }),
  withdrawnAt: timestamp("withdrawn_at", { withTimezone: true }),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
});

export const lookupTableChangeRequestItems = pgTable(
  "lookup_table_change_request_items",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    changeRequestId: uuid("change_request_id")
      .notNull()
      .references(() => lookupTableChangeRequests.id, { onDelete: "cascade" }),
    draftEditId: uuid("draft_edit_id")
      .notNull()
      .references(() => lookupTableDraftEdits.id),
    rowKey: text("row_key").notNull(),
    originalPayload: jsonb("original_payload"),
    submittedPayload: jsonb("submitted_payload").notNull(),
    validationSnapshot: jsonb("validation_snapshot"),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (table) => [
    uniqueIndex("change_request_items_req_draft_idx").on(
      table.changeRequestId,
      table.draftEditId,
    ),
  ],
);
