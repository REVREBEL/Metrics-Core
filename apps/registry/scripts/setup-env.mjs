import { existsSync, readFileSync, writeFileSync } from "fs";

function parseEnvFile(path) {
  if (!existsSync(path)) return {};
  const out = {};
  for (const line of readFileSync(path, "utf8").split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    const val = trimmed
      .slice(eq + 1)
      .trim()
      .replace(/^['"]|['"]$/g, "");
    out[key] = val;
  }
  return out;
}

const fileEnv = {
  ...parseEnvFile(".env"),
  ...parseEnvFile(".env.local"),
};

function get(key) {
  return process.env[key] || fileEnv[key] || "";
}

const publishableKey =
  get("NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY") ||
  get("CLERK_PUBLISHABLE_KEY") ||
  get("VITE_CLERK_PUBLISHABLE_KEY");

const secretKey = get("CLERK_SECRET_KEY");
const encryptionKey = get("CLERK_ENCRYPTION_KEY");

const lines = [];

if (publishableKey)
  lines.push(`NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=${publishableKey}`);
if (secretKey) lines.push(`CLERK_SECRET_KEY=${secretKey}`);
if (encryptionKey) lines.push(`CLERK_ENCRYPTION_KEY=${encryptionKey}`);

lines.push(`NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in`);
lines.push(`NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up`);
lines.push(`NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL=/`);
lines.push(`NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL=/`);

if (lines.length > 0) {
  writeFileSync(".env.local", lines.join("\n") + "\n");
  console.log("[env] .env.local written with Clerk keys");
} else {
  console.warn("[env] Warning: No Clerk keys found in environment");
  console.warn(
    "[env] Add CLERK_PUBLISHABLE_KEY and CLERK_SECRET_KEY to Replit Secrets or .env.local",
  );
}
