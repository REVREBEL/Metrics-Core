export interface LookupValidationResult {
  valid: boolean;
  errors: Record<string, string>;
}

export type LookupValueFetcher = (
  tableKey: string,
  search: string,
) => Promise<
  Array<{ code?: string; segment_code?: string; is_active?: boolean }>
>;

export async function validateLookupDependencies(
  proposedChanges: Record<string, unknown>,
  originalValues: Record<string, unknown> | null,
  columns: Array<{ key: string; label: string; lookupDependency?: string }>,
  lookupFetcher?: LookupValueFetcher,
): Promise<LookupValidationResult> {
  const errors: Record<string, string> = {};

  for (const col of columns) {
    if (!col.lookupDependency) continue;

    const newValue = proposedChanges[col.key];
    const origValue = originalValues ? originalValues[col.key] : undefined;

    // Rule: An unchanged existing inactive dependency may remain visible and preserved when another column is edited.
    // A newly selected or changed dependency must resolve to an active governed value.
    if (newValue === undefined || newValue === origValue) {
      continue;
    }

    if (newValue === null || newValue === "") {
      continue;
    }

    const valStr = String(newValue).trim();
    if (!valStr) continue;

    const targetTableKey = col.lookupDependency;

    if (!lookupFetcher) {
      continue;
    }

    try {
      const rows = await lookupFetcher(targetTableKey, valStr);

      const targetRow = rows.find((r) => {
        const targetCode = String(r.code ?? r.segment_code ?? "").trim();
        return targetCode === valStr;
      });

      if (!targetRow) {
        errors[col.key] =
          `Code '${valStr}' was not found in referenced lookup table '${targetTableKey}'.`;
      } else if (targetRow.is_active === false) {
        errors[col.key] =
          `Code '${valStr}' in referenced lookup '${targetTableKey}' is inactive.`;
      }
    } catch {
      errors[col.key] =
        `Failed to validate referenced lookup code '${valStr}'.`;
    }
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}
