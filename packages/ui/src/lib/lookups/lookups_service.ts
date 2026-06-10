import { eq, inArray } from "drizzle-orm";
import type * as DbModuleTypes from "@/db/index";
import type * as SchemaModuleTypes from "@/db/schema";
import { lookupTableMetadata, lookupTableRowsByKey } from "./fixtures";
import { saveLookupTableChangesSchema } from "./schemas";
import type {
  LookupTableMetadata,
  LookupTableRow,
  SaveLookupTableChangesPayload,
  SaveLookupTableChangesResult,
} from "./types";

type DbModule = typeof DbModuleTypes;
type SchemaModule = typeof SchemaModuleTypes;

async function getDbModules(): Promise<{
  db: DbModule["db"];
  schema: SchemaModule;
} | null> {
  try {
    const [{ db }, schema] = await Promise.all([
      import("@/db/index"),
      import("@/db/schema"),
    ]);
    return { db, schema };
  } catch {
    return null;
  }
}

export async function listLookupTables(): Promise<LookupTableMetadata[]> {
  const modules = await getDbModules();

  if (!modules) {
    return lookupTableMetadata;
  }

  const { db, schema } = modules;

  try {
    const rows = await db
      .select()
      .from(schema.dataLibraryTables)
      .where(
        inArray(
          schema.dataLibraryTables.tableName,
          lookupTableMetadata.map((table) => table.key),
        ),
      );

    if (rows.length === 0) {
      return lookupTableMetadata;
    }

    const mapped = rows.map((row) => {
      const metadata = row.uiMetadata as Record<string, unknown>;
      return {
        key: row.tableName,
        displayName: row.displayName ?? row.tableName,
        description: row.description ?? "",
        approximateRowCount: Number(metadata.approximateRowCount ?? 0),
        lastUpdated: String(
          metadata.lastUpdated ?? row.createdAt.toISOString(),
        ),
        lastRefreshed: String(
          metadata.lastRefreshed ?? row.createdAt.toISOString(),
        ),
        status: (metadata.status as LookupTableMetadata["status"]) ?? "draft",
      };
    });

    return mapped.sort((a, b) => a.displayName.localeCompare(b.displayName));
  } catch {
    return lookupTableMetadata;
  }
}

export async function getLookupTableRows(
  tableKey: string,
): Promise<LookupTableRow[]> {
  const rows = lookupTableRowsByKey[tableKey];

  if (!rows) {
    throw new Error(`Lookup table ${tableKey} was not found`);
  }

  return rows;
}

export async function saveLookupTableChanges(
  payload: SaveLookupTableChangesPayload,
): Promise<SaveLookupTableChangesResult> {
  const parsed = saveLookupTableChangesSchema.safeParse(payload);

  if (!parsed.success) {
    return {
      ok: false,
      message: "Fix validation errors before saving.",
      errors: parsed.error.flatten().fieldErrors,
    };
  }

  if (!lookupTableRowsByKey[parsed.data.tableKey]) {
    return {
      ok: false,
      message: "Lookup table was not found.",
    };
  }

  const modules = await getDbModules();

  if (modules) {
    const { db, schema } = modules;

    try {
      await db.transaction(async (tx) => {
        const [table] = await tx
          .select({ id: schema.dataLibraryTables.id })
          .from(schema.dataLibraryTables)
          .where(eq(schema.dataLibraryTables.tableName, parsed.data.tableKey))
          .limit(1);

        if (!table) {
          throw new Error("Lookup table metadata not found");
        }

        for (const change of parsed.data.changes) {
          const [draft] = await tx
            .insert(schema.lookupTableDraftEdits)
            .values({
              dataLibraryTableId: table.id,
              rowIdentifier: change.id,
              draftPayload: change,
            })
            .returning({ id: schema.lookupTableDraftEdits.id });

          await tx.insert(schema.lookupTableChangeRequests).values({
            draftEditId: draft.id,
            rationale: "Lookup Table Manager draft save",
          });

          await tx.insert(schema.appAuditLog).values({
            entityType: "lookup_table_draft_edits",
            entityId: draft.id,
            action: "lookup_table_change_saved",
            metadata: {
              tableKey: parsed.data.tableKey,
              rowIdentifier: change.id,
            },
            afterState: change,
          });
        }
      });
    } catch {
      return {
        ok: false,
        message: "Unable to persist lookup table changes to Postgres.",
      };
    }
  }

  return {
    ok: true,
    savedAt: new Date().toISOString(),
    message: `${parsed.data.changes.length} row change${parsed.data.changes.length === 1 ? "" : "s"} queued for persistence.`,
  };
}
