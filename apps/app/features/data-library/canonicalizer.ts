export function normalizeKeyValue(val: unknown): string {
  if (val === null || val === undefined) return "";
  if (typeof val === "string") return val.trim();
  return String(val);
}

// BOLT OPTIMIZATION:
// Avoid intermediate object allocation `Record<string, string>` and full `JSON.stringify(obj)` call on every invocation.
// In data grids and table operations, `canonicalizeRowKey` is called hundreds/thousands of times per render/fetch pass.
// Directly constructing the JSON string in a single `for` loop pass avoids garbage collection overhead and object creation.
export function canonicalizeRowKey(
  primaryKeyFields: string[],
  row: Record<string, unknown>,
): string {
  let json = "{";
  for (let i = 0; i < primaryKeyFields.length; i++) {
    const key = primaryKeyFields[i];
    const val = normalizeKeyValue(row[key]);
    if (i > 0) json += ",";
    json += `${JSON.stringify(key)}:${JSON.stringify(val)}`;
  }
  json += "}";
  return json;
}
