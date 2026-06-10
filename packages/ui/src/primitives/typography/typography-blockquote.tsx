import type { HTMLAttributes } from "react";

import { cn } from "@/lib/utils";

export interface TypographyBlockquoteProps
  extends HTMLAttributes<HTMLQuoteElement> {}

export function TypographyBlockquote({
  children,
  className,
  ...props
}: TypographyBlockquoteProps) {
  return (
    <blockquote
      className={cn("mt-6 border-l-2 pl-6 italic", className)}
      {...props}
    >
      {children}
    </blockquote>
  );
}
