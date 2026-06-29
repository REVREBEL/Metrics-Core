import type { HTMLAttributes } from "react";

import { cn } from "@/lib/utils";

export interface TypographyLargeProps extends HTMLAttributes<HTMLDivElement> {}

export function TypographyLarge({
  children,
  className,
  ...props
}: TypographyLargeProps) {
  return (
    <div className={cn("text-lg font-semibold", className)} {...props}>
      {children}
    </div>
  );
}
