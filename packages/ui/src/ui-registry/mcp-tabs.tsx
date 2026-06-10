"use client";

import { Button } from "@buttons/button";
import { Check, ClipboardIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { AddToCursor } from "./add-to-cursor";

export async function copyToClipboard(value: string) {
  await navigator.clipboard.writeText(value);
}

export function MCPTabs({ rootUrl }: { rootUrl: string }) {
  const [tab, setTab] = useState("cursor");
  const [hasCopied, setHasCopied] = useState(false);

  const mcp = {
    command: "npx -y shadcn@canary registry:mcp",
    env: {
      REGISTRY_URL: `https://${rootUrl}/r/registry.json`,
    },
  };

  const mcpServer = JSON.stringify(
    {
      mcpServers: {
        shadcn: mcp,
      },
    },
    null,
    2,
  );

  useEffect(() => {
    if (hasCopied) {
      setTimeout(() => {
        setHasCopied(false);
      }, 2000);
    }
  }, [hasCopied]);

  return (
    <div className="space-y-4">
      <div className="inline-flex rounded-md border p-1">
        <button
          className={[
            "rounded-md px-3 py-1.5 text-sm transition-colors",
            tab === "cursor"
              ? "bg-primary text-primary-foreground"
              : "text-muted-foreground hover:bg-muted hover:text-foreground",
          ].join(" ")}
          onClick={() => setTab("cursor")}
          type="button"
        >
          Cursor
        </button>
        <button
          className={[
            "rounded-md px-3 py-1.5 text-sm transition-colors",
            tab === "windsurf"
              ? "bg-primary text-primary-foreground"
              : "text-muted-foreground hover:bg-muted hover:text-foreground",
          ].join(" ")}
          onClick={() => setTab("windsurf")}
          type="button"
        >
          Windsurf
        </button>
      </div>

      {tab === "cursor" ? (
        <p className="text-muted-foreground text-sm">
          Click Add to Cursor or copy and paste the code into{" "}
          <code className="inline text-sm tabular-nums">.cursor/mcp.json</code>
        </p>
      ) : (
        <p className="text-muted-foreground text-sm">
          Copy and paste the code into{" "}
          <code className="inline text-sm tabular-nums">
            .codeium/windsurf/mcp_config.json
          </code>
        </p>
      )}

      <div className="relative">
        <div className="absolute top-3 right-3 flex gap-2">
          {tab === "cursor" && <AddToCursor mcp={mcp} />}

          <Button
            size="sm"
            variant="outline"
            onClick={() => {
              copyToClipboard(mcpServer);
              setHasCopied(true);
            }}
            className="shadow-none"
          >
            {hasCopied ? <Check /> : <ClipboardIcon />}
            Copy
          </Button>
        </div>

        <pre className="mt-16 overflow-x-auto rounded-lg border bg-muted p-1 sm:mt-0">
          <code className="relative rounded bg-transparent p-1 font-mono text-muted-foreground text-sm">
            {mcpServer}
          </code>
        </pre>
      </div>
    </div>
  );
}
