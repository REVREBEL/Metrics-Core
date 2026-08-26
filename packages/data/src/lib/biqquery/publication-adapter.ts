import { BigQuery } from "@google-cloud/bigquery";
import {
  getMappingTableRegistryEntry,
  type MappingTableRegistryEntry,
} from "@ui-registry";
import { getDb } from "@repo/db";
import {
  appAuditLog,
  lookupTableChangeRequestItems,
  lookupTableChangeRequests,
} from "@repo/db/schema";
import { and, eq } from "drizzle-orm";

function getBigQueryWriteClient() {
  // In a real application, this would be configured with service account credentials
  // through environment variables, especially for a server-side environment.
  return new BigQuery();
}

export interface PublicationConflict {
  rowKey: string;
  message: string;
  conflictingFields: Record<string, { expected: any; actual: any }>;
}

export interface PublicationResult {
  success: boolean;
  message: string;
  conflicts: PublicationConflict[];
  publishedRows: number;
}

async function createAuditLog(
  actorId: string,
  action: string,
  entityType: string,
  entityId: string,
  metadata: object = {}
) {
  const db = await getDb();
  await db.insert(appAuditLog).values({
    actorId,
    action,
    entityType,
    entityId,
    metadata,
  });
}

export async function publishChangeRequest(
  changeRequestId: string,
  actorId: string
): Promise<PublicationResult> {
  const db = await getDb();

  await createAuditLog(
    actorId,
    "publication_started",
    "lookup_table_change_request",
    changeRequestId
  );

  try {
    const request = await db.query.lookupTableChangeRequests.findFirst({
      where: eq(lookupTableChangeRequests.id, changeRequestId),
      with: {
        items: true,
      },
    });

    if (!request) {
      throw new Error(`Change request ${changeRequestId} not found.`);
    }

    if (request.status !== "approved") {
      return {
        success: false,
        message: `Change request is not in 'approved' state. Current state: ${request.status}.`,
        conflicts: [],
        publishedRows: 0,
      };
    }

    // Actual publication logic will be implemented here in the next step.
    // This will involve iterating through request.items, checking for conflicts
    // in BigQuery, and then applying the updates.

    // For now, returning a placeholder for successful validation.
    return {
      success: true,
      message: "Publication logic is next.",
      conflicts: [],
      publishedRows: 0,
    };
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred.";
    await createAuditLog(
      actorId,
      "publication_failed",
      "lookup_table_change_request",
      changeRequestId,
      { error: errorMessage }
    );
    return {
      success: false,
      message: errorMessage,
      conflicts: [],
      publishedRows: 0,
    };
  }
}