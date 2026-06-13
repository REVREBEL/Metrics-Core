import type { HTMLAttributes } from "react";

import { cn } from "@/lib/utils";

export interface TypographyPProps
  extends HTMLAttributes<HTMLParagraphElement> {}

export function TypographyP({
  children,
  className,
  ...props
}: TypographyPProps) {
  return (
    <p
      className={cn("leading-7 [&:not(:first-child)]:mt-6", className)}
      {...props}
    >
      {children}
    </p>
  );
}
