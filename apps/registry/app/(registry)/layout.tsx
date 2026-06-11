import type { ReactNode } from "react";

import {
  MobileSidebarTrigger,
  RegistrySidebar,
} from "@components/registry-sidebar";

export default function RegistryLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(13,37,91,0.12),_transparent_40%),linear-gradient(180deg,_rgba(255,255,255,0.92),_rgba(240,244,249,0.96))] dark:bg-[radial-gradient(circle_at_top,_rgba(83,187,255,0.14),_transparent_32%),linear-gradient(180deg,_rgba(8,18,37,0.98),_rgba(5,12,25,1))]">
      <MobileSidebarTrigger />
      <div className="mx-auto flex min-h-screen w-full max-w-[1600px]">
        <RegistrySidebar />
        <main className="min-w-0 flex-1">{children}</main>
      </div>
    </div>
  );
}
