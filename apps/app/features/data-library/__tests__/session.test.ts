import assert from "node:assert/strict";
import { test } from "node:test";
import { createSignedSessionToken, verifySessionToken } from "../session";

test("createSignedSessionToken and verifySessionToken validate signed session token", () => {
  const userId = "00000000-0000-0000-0000-000000000001";
  const token = createSignedSessionToken(userId);

  const verified = verifySessionToken(token);
  assert.ok(verified);
  assert.equal(verified?.userId, userId);
});

test("verifySessionToken rejects tampered signature or invalid token format", () => {
  const userId = "00000000-0000-0000-0000-000000000001";
  const token = createSignedSessionToken(userId);

  // 1. Tampered payload
  const tampered = token.replace(
    userId,
    "00000000-0000-0000-0000-000000000002",
  );
  assert.equal(verifySessionToken(tampered), null);

  // 2. Tampered signature
  const parts = token.split(".");
  const badSigToken = `${parts[0]}.${parts[1]}.invalid_signature_hex`;
  assert.equal(verifySessionToken(badSigToken), null);

  // 3. Raw UUID string without signature
  assert.equal(
    verifySessionToken("00000000-0000-0000-0000-000000000001"),
    null,
  );
});
