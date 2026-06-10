#!/usr/bin/env bash
set -e

PORT="${PORT:-3000}"

# Start Next.js in the background
next dev -H 0.0.0.0 -p "$PORT" &
NEXT_PID=$!

# Ensure the background process is terminated when this script exits
trap 'kill "$NEXT_PID" 2>/dev/null || true' EXIT

echo "[start-dev] Next.js started (PID $NEXT_PID), warming up port $PORT..."

# Next.js 16 Turbopack lazily binds the TCP socket on first request.
# Poll with curl until it responds — this forces the socket open so
# Replit's waitForPort probe can succeed.
for i in $(seq 1 120); do
  sleep 1
  if ! kill -0 "$NEXT_PID" 2>/dev/null; then
    echo "[start-dev] ERROR: Next.js process died unexpectedly."
    exit 1
  fi
  if curl -sf --max-time 2 "http://127.0.0.1:$PORT/" > /dev/null 2>&1; then
    echo "[start-dev] Port $PORT is open."
    break
  fi
done

wait "$NEXT_PID"
