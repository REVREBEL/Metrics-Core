"use client";

import { ThemeProvider } from "@repo/ui/context";
import type * as React from "react";

export function Providers({ children }: { children: React.ReactNode }) {
  return <ThemeProvider defaultTheme="system">{children}</ThemeProvider>;
}
