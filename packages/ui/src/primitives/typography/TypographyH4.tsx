import type { HTMLAttributes } from "react";

import { cn } from "@/lib/utils";

export interface TypographyH4Props extends HTMLAttributes<HTMLHeadingElement> {}

export function TypographyH4({
  children,
  className,
  ...props
}: TypographyH4Props) {
  return (
    <h4
      className={cn(
        "scroll-m-20 text-xl font-semibold tracking-tight uppercase",
        className,
      )}
      {...props}
    >
      {children}
    </h4>
  );
}
