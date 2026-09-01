"use client";

import { IconCheck, IconCopy } from "@tabler/icons-react";
import { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

type CopyCodeProps = {
  code: string;
  language?: string;
};

function CopyCode({ code = "", language }: CopyCodeProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      // Check if clipboard API is available
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(code);
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
      } else {
        // Fallback method for older browsers or non-secure contexts
        const textArea = document.createElement("textarea");

        textArea.value = code;
        textArea.style.position = "absolute";
        textArea.style.left = "-999999px";
        document.body.prepend(textArea);
        textArea.select();
        document.execCommand("copy");
        textArea.remove();
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
      }
    } catch (err) {
      console.error("Failed to copy", err);

      // Show user feedback even if copy failed
      alert("Failed to copy code to clipboard");
    }
  };

  return (
    <div
      className="bg-muted relative rounded-[14px] p-2.5"
      style={{ fontFamily: "'Fira Code', monospace" }}
    >
      <div className="rounded-[10px] bg-white px-3.5 py-2.5 text-xs dark:bg-black">
        <pre className="overflow-x-auto">
          <SyntaxHighlighter language={language} style={vscDarkPlus} PreTag="div">
            {code}
          </SyntaxHighlighter>
        </pre>
        <button
          type="button"
          onClick={handleCopy}
          className="bg-muted absolute end-0 bottom-0 rounded-md p-1.5 transition-colors"
          aria-label={copied ? "Copied" : "Copy code"}
        >
          {copied ? (
            <IconCheck className="size-4" />
          ) : (
            <IconCopy className="size-4" />
          )}
        </button>
      </div>
    </div>
  );
}

export { CopyCode };
