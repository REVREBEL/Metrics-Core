import Link from "next/link";

import {
  MobileSidebarTrigger,
  RegistrySidebar,
} from "@components/registry-sidebar";

export default function NotFound() {
  return (
    <>
      <MobileSidebarTrigger />
      <RegistrySidebar />
      <main className="flex w-full justify-center">
        <div className="flex min-h-screen w-full flex-col items-center justify-center text-center">
          <h1 className="font-bold text-6xl text-muted-foreground tracking-tight md:text-8xl">
            404
          </h1>
          <h2 className="mt-8 font-semibold text-2xl tracking-tight md:text-3xl">
            Page Not Found
          </h2>
          <div className="mt-8 flex gap-3">
            <Link
              className="rounded-md bg-primary px-4 py-2 text-primary-foreground text-sm"
              href="/"
            >
              Go Home
            </Link>
            <Link
              className="rounded-md border px-4 py-2 text-sm"
              href="/r/registry.json"
            >
              View Registry
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
