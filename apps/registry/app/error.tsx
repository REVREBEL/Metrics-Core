"use client";
import { useEffect } from "react";
import Link from "next/link";

import {
  MobileSidebarTrigger,
  RegistrySidebar,
} from "@components/registry-sidebar";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <>
      <MobileSidebarTrigger />
      <RegistrySidebar />
      <main className="flex w-full justify-center">
        <div className="flex min-h-screen w-full flex-col items-center justify-center text-center">
          <h1 className="font-bold text-6xl text-muted-foreground tracking-tight md:text-8xl">
            500
          </h1>
          <h2 className="mt-4 font-bold text-2xl tracking-tight md:text-3xl">
            Something went wrong
          </h2>
          <div className="mt-6 flex gap-3">
            <button
              className="rounded-md bg-primary px-4 py-2 text-primary-foreground text-sm"
              onClick={reset}
              type="button"
            >
              Try Again
            </button>
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
