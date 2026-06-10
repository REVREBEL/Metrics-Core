import type { ReactNode } from "react";

import {
  MobileSidebarTrigger,
  RegistrySidebar,
} from "@repo/ui/ui-registry";

export default function RegistryLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <>
      <MobileSidebarTrigger />
      <RegistrySidebar />
      <main className="flex w-full justify-center">{children}</main>
    </>
  );
}
