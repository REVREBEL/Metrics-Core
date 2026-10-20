export function normalizeKeyValue(val: unknown): string {
  if (val === null || val === undefined) return "";
  if (typeof val === "string") return val.trim();
  return String(val);
}

// ⚡ Bolt Optimization: Use WeakMap to cache canonical row key strings by row object reference.
// In table grids like DataLibraryWorkspace (50 rows x 15 columns = 750 cells), canonicalizeRowKey
// is called on every cell render pass and keystroke. Caching by row object reference turns
// repeated JSON.stringify & object allocation passes into O(1) lookups, eliminating thousands of
// redundant object allocations and stringifications during table editing/filtering.
const rowKeyCache = new WeakMap<Record<string, unknown>, Map<string, string>>();

export function canonicalizeRowKey(
  primaryKeyFields: string[],
  row: Record<string, unknown>,
): string {
  if (!row || typeof row !== "object") {
    return buildCanonicalRowKey(primaryKeyFields, row);
  }

  const pkKey = JSON.stringify(primaryKeyFields);
  let rowMap = rowKeyCache.get(row);
  if (!rowMap) {
    rowMap = new Map();
    rowKeyCache.set(row, rowMap);
  } else {
    const cached = rowMap.get(pkKey);
    if (cached !== undefined) {
      return cached;
    }
  }

  const result = buildCanonicalRowKey(primaryKeyFields, row);
  rowMap.set(pkKey, result);
  return result;
}

function buildCanonicalRowKey(
  primaryKeyFields: string[],
  row: Record<string, unknown>,
): string {
  const obj: Record<string, string> = {};
  for (let i = 0; i < primaryKeyFields.length; i++) {
    const key = primaryKeyFields[i];
    obj[key] = normalizeKeyValue(row[key]);
  }
  return JSON.stringify(obj);
}
