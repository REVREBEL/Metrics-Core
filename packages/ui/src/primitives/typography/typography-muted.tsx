import type { HTMLAttributes } from "react";

import { cn } from "@/lib/utils";

export interface TypographyMutedProps
  extends HTMLAttributes<HTMLParagraphElement> {}

export function TypographyMuted({
  children,
  className,
  ...props
}: TypographyMutedProps) {
  return (
    <p className={cn("text-sm text-muted-foreground", className)} {...props}>
      {children}
    </p>
  );
}
