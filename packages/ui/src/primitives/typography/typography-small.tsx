import type { HTMLAttributes } from "react";

import { cn } from "@/lib/utils";

export interface TypographySmallProps extends HTMLAttributes<HTMLElement> {}

export function TypographySmall({
  children,
  className,
  ...props
}: TypographySmallProps) {
  return (
    <small
      className={cn("text-sm leading-none font-medium", className)}
      {...props}
    >
      {children}
    </small>
  );
}
