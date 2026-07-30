"use client";

import { Button } from "@buttons/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@ui-core";
import { Check, Copy } from "lucide-react";
import { useState } from "react";
import { OpenInV0Button } from "./open-in-v0";

type Component = {
  name: string;
  type: string;
  title?: string;
  description?: string;
};

interface ComponentCardProps {
  component: Component;
  baseUrl: string;
  prompt: string;
  hasDemo?: boolean;
}

export function ComponentCard({
  component,
  baseUrl,
  prompt,
  hasDemo = true,
}: ComponentCardProps) {
  const [copied, setCopied] = useState(false);

  const isBlock = component.type === "registry:block";
  const v0RegistryUrl = isBlock
    ? `https://${baseUrl}/r/${component.name}.json`
    : `https://${baseUrl}/r/blank.json`;

  const registryUrl = `https://${baseUrl}/r/${component.name}.json`;
  const npxCommand = `npx shadcn@latest add ${registryUrl}`;

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(npxCommand);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  return (
    <section>
      <Card id="starting-kit" className="border-foreground/25">
        <CardHeader>
          <div className="flex flex-col gap-4">
            <CardTitle className="font-medium text-lg">Preview</CardTitle>

            <div className="flex w-full flex-col gap-4 sm:flex-row sm:items-center sm:justify-between sm:gap-16">
              <CardDescription>{component.description}</CardDescription>

              <div className="flex items-center gap-1 sm:ml-auto">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipContent className="font-mono">
                      Copy npx command
                    </TooltipContent>
                    <TooltipTrigger asChild>
                      <Button
                        onClick={copyToClipboard}
                        variant="outline"
                        className="p-4"
                        aria-label="Copy npx command to clipboard"
                      >
                        {copied ? (
                          <Check className="size-4" />
                        ) : (
                          <Copy className="size-4" />
                        )}
                      </Button>
                    </TooltipTrigger>
                  </Tooltip>
                </TooltipProvider>

                <OpenInV0Button
                  registryUrl={v0RegistryUrl}
                  title={`${component.title} Kit`}
                  prompt={prompt}
                />
              </div>
            </div>
          </div>
        </CardHeader>

        <CardContent className="flex flex-col items-center justify-center gap-4 rounded-md px-6">
          {hasDemo ? (
            <div
              className={
                "h-[800px] w-full overflow-hidden rounded-md border border-border p-4"
              }
            >
              <iframe
                id="iframe"
                src={`/demo/${component.name}`}
                className="h-full w-full"
                title="Page Preview"
              />
            </div>
          ) : (
            <div className="w-full rounded-md border border-border p-6 text-sm text-muted-foreground">
              No demo page is registered for <code>{component.name}</code> yet.
              This registry item is available for install/export, but needs a
              demo entry in <code>registry/app/demo/[name]/index.tsx</code> to
              render a live preview.
            </div>
          )}
        </CardContent>
      </Card>
    </section>
  );
}
