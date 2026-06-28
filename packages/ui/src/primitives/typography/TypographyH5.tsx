import type { HTMLAttributes } from "react";

import { cn } from "@/lib/utils";

export interface TypographyH5Props extends HTMLAttributes<HTMLHeadingElement> {}

export function TypographyH5({
  children,
  className,
  ...props
}: TypographyH5Props) {
  return (
    <h5
      className={cn(
        "scroll-m-20 text-xl font-semibold tracking-tight uppercase",
        className,
      )}
      {...props}
    >
      {children}
    </h5>
  );
}
