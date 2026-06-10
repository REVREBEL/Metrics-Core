import type { HTMLAttributes } from "react";

import { cn } from "@/lib/utils";

export interface TypographyLeadProps
  extends HTMLAttributes<HTMLParagraphElement> {}

export function TypographyLead({
  children,
  className,
  ...props
}: TypographyLeadProps) {
  return (
    <p className={cn("text-xl text-muted-foreground", className)} {...props}>
      {children}
    </p>
  );
}
