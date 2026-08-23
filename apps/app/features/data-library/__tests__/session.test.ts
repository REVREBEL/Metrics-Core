import assert from "node:assert/strict";
import { createHmac } from "node:crypto";
import { test } from "node:test";
import {
  aggregateUserPermissions,
  createSignedSessionToken,
  getSessionSecret,
  verifySessionToken,
} from "../session";

const TEST_SECRET = "test-session-secret-key-12345";

test("createSignedSessionToken and verifySessionToken validate signed session token", () => {
  const userId = "00000000-0000-0000-0000-000000000001";
  const token = createSignedSessionToken(userId, TEST_SECRET);

  const verified = verifySessionToken(token, TEST_SECRET);
  assert.ok(verified);
  assert.equal(verified?.userId, userId);
});

test("verifySessionToken rejects tampered signature or invalid token format", () => {
  const userId = "00000000-0000-0000-0000-000000000001";
  const token = createSignedSessionToken(userId, TEST_SECRET);

  // 1. Tampered payload
  const tampered = token.replace(
    userId,
    "00000000-0000-0000-0000-000000000002",
  );
  assert.equal(verifySessionToken(tampered, TEST_SECRET), null);

  // 2. Tampered signature
  const parts = token.split(".");
  const badSigToken = `${parts[0]}.${parts[1]}.invalid_signature_hex`;
  assert.equal(verifySessionToken(badSigToken, TEST_SECRET), null);

  // 3. Raw UUID string without signature
  assert.equal(
    verifySessionToken("00000000-0000-0000-0000-000000000001", TEST_SECRET),
    null,
  );
});

test("verifySessionToken rejects future timestamps and expired timestamps", () => {
  const userId = "00000000-0000-0000-0000-000000000001";

  // 1. Future timestamp
  const futureTime = (Date.now() + 600000).toString(); // +10 minutes
  const futureSig = createHmac("sha256", TEST_SECRET)
    .update(`${userId}.${futureTime}`)
    .digest("hex");
  const futureToken = `${userId}.${futureTime}.${futureSig}`;
  assert.equal(verifySessionToken(futureToken, TEST_SECRET), null);

  // 2. Expired timestamp (> 7 days)
  const expiredTime = (Date.now() - 8 * 24 * 60 * 60 * 1000).toString(); // -8 days
  const expiredSig = createHmac("sha256", TEST_SECRET)
    .update(`${userId}.${expiredTime}`)
    .digest("hex");
  const expiredToken = `${userId}.${expiredTime}.${expiredSig}`;
  assert.equal(verifySessionToken(expiredToken, TEST_SECRET), null);
});

test("getSessionSecret throws Error when SESSION_SECRET and NEXTAUTH_SECRET are unconfigured", () => {
  const origSessionSecret = process.env.SESSION_SECRET;
  const origNextAuthSecret = process.env.NEXTAUTH_SECRET;

  delete process.env.SESSION_SECRET;
  delete process.env.NEXTAUTH_SECRET;

  try {
    assert.throws(() => getSessionSecret(), /not configured/i);
  } finally {
    if (origSessionSecret) process.env.SESSION_SECRET = origSessionSecret;
    if (origNextAuthSecret) process.env.NEXTAUTH_SECRET = origNextAuthSecret;
  }
});

test("aggregateUserPermissions aggregates, flattens, deduplicates, and ignores malformed role records", () => {
  const roleRecords = [
    {
      permissions: [
        "data_library.lookup_tables.view",
        "data_library.change_requests.submit",
      ],
    },
    {
      permissions: [
        "data_library.change_requests.submit",
        "data_library.change_requests.review",
      ],
    },
    { permissions: null },
    { permissions: "not-an-array" },
    { permissions: ["  data_library.change_requests.decide  ", ""] },
  ];

  const aggregated = aggregateUserPermissions(roleRecords);
  assert.deepEqual(aggregated.sort(), [
    "data_library.change_requests.decide",
    "data_library.change_requests.review",
    "data_library.change_requests.submit",
    "data_library.lookup_tables.view",
  ]);
});
