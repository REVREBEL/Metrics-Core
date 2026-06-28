import type { HTMLAttributes } from "react";

import { cn } from "@/lib/utils";

export interface TypographyTableProps extends HTMLAttributes<HTMLDivElement> {}

export function TypographyTable({
  children,
  className,
  ...props
}: TypographyTableProps) {
  return (
    <div className={cn("my-6 w-full overflow-y-auto", className)} {...props}>
      {children}
    </div>
  );
}
