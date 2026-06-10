import type { HTMLAttributes } from "react";

import { cn } from "@/lib/utils";

export interface TypographyListProps extends HTMLAttributes<HTMLUListElement> {}

export function TypographyList({
  children,
  className,
  ...props
}: TypographyListProps) {
  return (
    <ul className={cn("my-6 ml-6 list-disc [&>li]:mt-2", className)} {...props}>
      {children}
    </ul>
  );
}
