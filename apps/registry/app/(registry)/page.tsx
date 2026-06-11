import {
  IconArrowRight,
  IconAwardFilled,
  IconBinaryTree2Filled,
  IconDeviceGamepad2Filled,
  IconHierarchy3,
  IconPuzzleFilled,
  IconSparkles,
} from "@tabler/icons-react";
import Link from "next/link";

import { MCPTabs } from "@repo/ui/ui-registry";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/primitives/ui-core/card";
import {
  getBlocks,
  getComponents,
  getUIPrimitives,
  type Component,
} from "@lib/registry";
import {
  getFoundationRoots,
  getRegistryCounts,
  getRootEntryCount,
  getRootSummary,
  getStagedRoots,
  toFolderHref,
} from "@lib/site";

const uiItems = getUIPrimitives().slice(0, 4) as Component[];
const componentItems = getComponents().slice(0, 3) as Component[];
const blockItems = getBlocks().slice(0, 4) as Component[];
const foundationRoots = getFoundationRoots().slice(0, 5);
const stagedRoots = getStagedRoots();
const counts = getRegistryCounts();

export default function Home() {
  return (
    <main className="mx-auto w-full max-w-7xl px-5 py-6 md:px-8 md:py-10">
      <section className="rounded-[2rem] border border-white/70 bg-white/85 p-6 shadow-[0_24px_80px_rgba(15,23,42,0.08)] backdrop-blur md:p-8 dark:border-slate-800 dark:bg-slate-950/75">
        <div className="grid gap-8 xl:grid-cols-[1.35fr_0.9fr]">
          <div className="space-y-6">
            <div className="inline-flex items-center rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-slate-600 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300">
              Registry website first
            </div>
            <div className="space-y-3">
              <h1 className="max-w-4xl font-semibold text-4xl tracking-tight md:text-6xl">
                Build the registry foundation before metrics components take over the site.
              </h1>
              <p className="max-w-3xl text-base text-muted-foreground md:text-lg">
                The homepage now centers on primitives, tokens, folder-based browsing, and install paths. Metrics compositions stay staged until the registry shell is stable.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                href="/catalog"
                className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-slate-700 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200"
              >
                Open folder catalog
                <IconArrowRight className="size-4" />
              </Link>
              <Link
                href="/tokens"
                className="inline-flex items-center gap-2 rounded-full border border-slate-300 px-5 py-3 text-sm font-medium transition hover:bg-slate-100 dark:border-slate-700 dark:hover:bg-slate-900"
              >
                Review token sources
                <IconSparkles className="size-4" />
              </Link>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              <div className="rounded-2xl bg-slate-950 px-4 py-4 text-white dark:bg-slate-900">
                <div className="text-3xl font-semibold tabular-nums">{counts.primitives}</div>
                <div className="mt-1 text-sm text-slate-300">UI primitives installable now</div>
              </div>
              <div className="rounded-2xl border border-slate-200 px-4 py-4 dark:border-slate-800">
                <div className="text-3xl font-semibold tabular-nums">{counts.folderNodes}</div>
                <div className="mt-1 text-sm text-muted-foreground">Browsable registry folders</div>
              </div>
              <div className="rounded-2xl border border-dashed border-slate-300 px-4 py-4 dark:border-slate-700">
                <div className="text-3xl font-semibold tabular-nums">{counts.components}</div>
                <div className="mt-1 text-sm text-muted-foreground">Metrics components still staged</div>
              </div>
            </div>
          </div>

          <div className="rounded-[1.75rem] border border-slate-200/80 bg-slate-50/90 p-5 dark:border-slate-800 dark:bg-slate-900/90">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <div className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                  Focus right now
                </div>
                <h2 className="mt-1 font-semibold text-xl">Foundation checklist</h2>
              </div>
              <IconHierarchy3 className="size-5 text-muted-foreground" />
            </div>
            <div className="space-y-3 text-sm">
              <div className="rounded-2xl bg-white px-4 py-3 dark:bg-slate-950">
                <div className="font-medium">1. Folder-first navigation</div>
                <p className="mt-1 text-muted-foreground">
                  Keep primitives, tokens, helpers, and source structure easy to inspect without dumping every metrics composition onto the homepage.
                </p>
              </div>
              <div className="rounded-2xl bg-white px-4 py-3 dark:bg-slate-950">
                <div className="font-medium">2. Reliable install metadata</div>
                <p className="mt-1 text-muted-foreground">
                  Registry pages still expose item install paths and MCP config, but the website now frames them inside the actual foundation work.
                </p>
              </div>
              <div className="rounded-2xl bg-white px-4 py-3 dark:bg-slate-950">
                <div className="font-medium">3. Stage metrics later</div>
                <p className="mt-1 text-muted-foreground">
                  Metrics-specific components remain discoverable, but they are visually demoted until the base registry UX is complete.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-6 grid gap-6 xl:grid-cols-[1.25fr_0.95fr]">
        <Card className="border-white/70 bg-white/85 shadow-none dark:border-slate-800 dark:bg-slate-950/75">
          <CardHeader className="space-y-2">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Foundation folders</CardTitle>
                <CardDescription>
                  The front page now prioritizes the source areas that make the registry useful before metrics modules land.
                </CardDescription>
              </div>
              <div className="rounded-xl bg-slate-900 p-2 text-white dark:bg-white dark:text-slate-900">
                <IconBinaryTree2Filled className="size-5" />
              </div>
            </div>
          </CardHeader>
          <CardContent className="grid gap-3 md:grid-cols-2">
            {foundationRoots.map((root) => {
              const summary = getRootSummary(root.id);
              return (
                <Link
                  key={root.id}
                  href={toFolderHref(root.id)}
                  className="rounded-2xl border border-slate-200 bg-white px-4 py-4 transition hover:-translate-y-0.5 hover:border-slate-400 dark:border-slate-800 dark:bg-slate-950"
                >
                  <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                    {summary.eyebrow}
                  </div>
                  <div className="mt-2 flex items-center justify-between gap-3">
                    <h3 className="font-medium text-base">{root.title}</h3>
                    <span className="rounded-full border px-2 py-1 text-xs">
                      {getRootEntryCount(root)}
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {summary.description}
                  </p>
                </Link>
              );
            })}
          </CardContent>
        </Card>

        <Card className="border-white/70 bg-white/85 shadow-none dark:border-slate-800 dark:bg-slate-950/75">
          <CardHeader className="space-y-2">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Installable now</CardTitle>
                <CardDescription>
                  Registry items that already have a clean install story while the site foundation is still being hardened.
                </CardDescription>
              </div>
              <div className="rounded-xl bg-slate-900 p-2 text-white dark:bg-white dark:text-slate-900">
                <IconDeviceGamepad2Filled className="size-5" />
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <div className="mb-3 flex items-center gap-2 text-sm font-medium">
                <IconDeviceGamepad2Filled className="size-4 text-muted-foreground" />
                UI primitives
              </div>
              <div className="space-y-2">
                {uiItems.map((item) => (
                  <Link
                    key={item.name}
                    href={`/registry/${item.name}`}
                    className="flex items-center justify-between rounded-xl border border-slate-200 px-3 py-2 text-sm transition hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-900"
                  >
                    <span>{item.title ?? item.name}</span>
                    <IconArrowRight className="size-4 text-muted-foreground" />
                  </Link>
                ))}
              </div>
            </div>

            <div>
              <div className="mb-3 flex items-center gap-2 text-sm font-medium">
                <IconPuzzleFilled className="size-4 text-muted-foreground" />
                Blocks
              </div>
              <div className="space-y-2">
                {blockItems.map((item) => (
                  <Link
                    key={item.name}
                    href={`/registry/${item.name}`}
                    className="flex items-center justify-between rounded-xl border border-slate-200 px-3 py-2 text-sm transition hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-900"
                  >
                    <span>{item.title ?? item.name}</span>
                    <IconArrowRight className="size-4 text-muted-foreground" />
                  </Link>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      <section className="mt-6 grid gap-6 lg:grid-cols-2">
        <Card className="border-white/70 bg-white/85 shadow-none dark:border-slate-800 dark:bg-slate-950/75">
          <CardHeader className="space-y-2">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Staged metrics area</CardTitle>
                <CardDescription>
                  These roots stay visible so the migration path is explicit, but they do not lead the website yet.
                </CardDescription>
              </div>
              <div className="rounded-xl bg-slate-900 p-2 text-white dark:bg-white dark:text-slate-900">
                <IconAwardFilled className="size-5" />
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            {stagedRoots.map((root) => {
              const summary = getRootSummary(root.id);
              return (
                <Link
                  key={root.id}
                  href={toFolderHref(root.id)}
                  className="block rounded-2xl border border-dashed border-slate-300 px-4 py-4 transition hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-900"
                >
                  <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                    {summary.eyebrow}
                  </div>
                  <div className="mt-2 font-medium">{root.title}</div>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {summary.description}
                  </p>
                </Link>
              );
            })}
            <div className="rounded-2xl border border-slate-200 px-4 py-4 dark:border-slate-800">
              <div className="mb-2 font-medium text-sm">Representative staged items</div>
              <div className="space-y-2">
                {componentItems.map((item) => (
                  <Link
                    key={item.name}
                    href={`/registry/${item.name}`}
                    className="flex items-center justify-between rounded-xl bg-slate-50 px-3 py-2 text-sm transition hover:bg-slate-100 dark:bg-slate-900 dark:hover:bg-slate-800"
                  >
                    <span>{item.title ?? item.name}</span>
                    <IconArrowRight className="size-4 text-muted-foreground" />
                  </Link>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <div className="rounded-[1.75rem] border border-white/70 bg-white/85 p-6 dark:border-slate-800 dark:bg-slate-950/75">
            <h2 className="font-semibold text-xl">MCP configuration</h2>
            <p className="mb-4 mt-2 text-sm text-muted-foreground">
              This registry still exposes MCP wiring, but the page now frames it as part of the registry foundation. Verify the published{" "}
              <Link href="/r/registry.json" className="underline underline-offset-4">
                `style:theme`
              </Link>{" "}
              matches your token sources before widening the catalog.
            </p>
            <MCPTabs rootUrl={process.env.VERCEL_PROJECT_PRODUCTION_URL ?? ""} />
          </div>

          <div className="rounded-[1.75rem] border border-white/70 bg-white/85 p-6 dark:border-slate-800 dark:bg-slate-950/75">
            <h2 className="font-semibold text-xl">Current registry shape</h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl bg-slate-50 px-4 py-4 dark:bg-slate-900">
                <div className="text-2xl font-semibold tabular-nums">{counts.blocks}</div>
                <div className="mt-1 text-sm text-muted-foreground">Blocks ready to install</div>
              </div>
              <div className="rounded-2xl bg-slate-50 px-4 py-4 dark:bg-slate-900">
                <div className="text-2xl font-semibold tabular-nums">{counts.rootFolders}</div>
                <div className="mt-1 text-sm text-muted-foreground">Top-level source roots</div>
              </div>
              <div className="rounded-2xl bg-slate-50 px-4 py-4 dark:bg-slate-900">
                <div className="text-2xl font-semibold tabular-nums">{counts.totalItems}</div>
                <div className="mt-1 text-sm text-muted-foreground">Registry items in manifest</div>
              </div>
              <div className="rounded-2xl bg-slate-50 px-4 py-4 dark:bg-slate-900">
                <div className="text-2xl font-semibold tabular-nums">{counts.components}</div>
                <div className="mt-1 text-sm text-muted-foreground">Metrics compositions waiting</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
