import type { HTMLAttributes } from "react";

import { cn } from "@/lib/utils";

export interface TypographyInlineCodeProps
  extends HTMLAttributes<HTMLElement> {}

export function TypographyInlineCode({
  children,
  className,
  ...props
}: TypographyInlineCodeProps) {
  return (
    <code
      className={cn(
        "relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold",
        className,
      )}
      {...props}
    >
      {children}
    </code>
  );
}
