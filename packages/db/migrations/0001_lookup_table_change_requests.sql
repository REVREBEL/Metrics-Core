-- Migration 0001: Data Library Change Requests Schema
CREATE TABLE IF NOT EXISTS "lookup_table_change_requests" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"table_key" varchar(255) NOT NULL,
	"title" varchar(255) NOT NULL,
	"description" text,
	"submitter_id" uuid NOT NULL REFERENCES "app_users"("id"),
	"reviewer_id" uuid REFERENCES "app_users"("id"),
	"status" varchar(50) NOT NULL,
	"review_notes" text,
	"submitted_at" timestamp with time zone DEFAULT now() NOT NULL,
	"reviewed_at" timestamp with time zone,
	"withdrawn_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);

CREATE INDEX IF NOT EXISTS "change_requests_status_idx" ON "lookup_table_change_requests" ("status");
CREATE INDEX IF NOT EXISTS "change_requests_submitter_idx" ON "lookup_table_change_requests" ("submitter_id");
CREATE INDEX IF NOT EXISTS "change_requests_table_idx" ON "lookup_table_change_requests" ("table_key");

CREATE TABLE IF NOT EXISTS "lookup_table_change_request_items" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"change_request_id" uuid NOT NULL REFERENCES "lookup_table_change_requests"("id") ON DELETE cascade,
	"draft_edit_id" uuid NOT NULL REFERENCES "lookup_table_draft_edits"("id"),
	"row_key" text NOT NULL,
	"original_payload" jsonb,
	"submitted_payload" jsonb NOT NULL,
	"validation_snapshot" jsonb,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);

CREATE UNIQUE INDEX IF NOT EXISTS "change_request_items_req_draft_idx" 
ON "lookup_table_change_request_items" ("change_request_id", "draft_edit_id");
