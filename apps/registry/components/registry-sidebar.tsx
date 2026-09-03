"use client";

import {
  getRegistryFolderNode,
  type RegistryFolderNode,
} from "@lib/registry-folders";
import {
  getFoundationRoots,
  getRootSummary,
  getStagedRoots,
  toFolderHref,
} from "@lib/site";
import {
  IconBinaryTree2,
  IconBooks,
  IconChevronDown,
  IconChevronRight,
  IconFolder,
  IconHome2,
  IconSearch,
  IconSparkles,
} from "@tabler/icons-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { type ReactNode, useMemo, useState } from "react";

type NavItem = {
  href: string;
  icon: ReactNode;
  title: string;
};

const primaryNav: NavItem[] = [
  { href: "/", icon: <IconHome2 className="size-4" />, title: "Overview" },
  {
    href: "/catalog",
    icon: <IconBinaryTree2 className="size-4" />,
    title: "Catalog",
  },
  {
    href: "/tokens",
    icon: <IconSparkles className="size-4" />,
    title: "Tokens",
  },
];

// Module-level cache to avoid repeated array creation and string lowercasing per node
const nodeTextCache = new Map<string, string>();

function getNodeText(node: RegistryFolderNode): string {
  let text = nodeTextCache.get(node.id);
  if (!text) {
    text = [node.id, node.title, node.sourcePath, ...node.directFiles]
      .join(" ")
      .toLowerCase();
    nodeTextCache.set(node.id, text);
  }
  return text;
}

function matchesNode(node: RegistryFolderNode, query: string): boolean {
  if (!query) return true;

  if (getNodeText(node).includes(query)) return true;

  return node.children.some((childId) => {
    const child = getRegistryFolderNode(childId);
    return child ? matchesNode(child, query) : false;
  });
}

function NavSection({
  items,
  pathname,
}: {
  items: NavItem[];
  pathname: string;
}) {
  return (
    <nav className="space-y-1">
      {items.map((item) => {
        const active = pathname === item.href;
        return (
          <Link
            key={item.href}
            href={item.href}
            className={[
              "flex items-center gap-2 rounded-xl px-3 py-2 text-sm transition-colors",
              active
                ? "bg-foreground text-background"
                : "text-muted-foreground hover:bg-background/80 hover:text-foreground",
            ].join(" ")}
          >
            {item.icon}
            <span>{item.title}</span>
          </Link>
        );
      })}
    </nav>
  );
}

function FolderTree({
  node,
  pathname,
  query,
}: {
  node: RegistryFolderNode;
  pathname: string;
  query: string;
}) {
  if (!matchesNode(node, query)) return null;

  const href = toFolderHref(node.id);
  const active = pathname === href;
  const visibleChildren = node.children
    .map((childId) => getRegistryFolderNode(childId))
    .filter((child): child is RegistryFolderNode => Boolean(child))
    .filter((child) => matchesNode(child, query));

  return (
    <details open={node.depth < 1 || Boolean(query)} className="group">
      <summary className="list-none">
        <Link
          href={href}
          className={[
            "flex items-center justify-between gap-2 rounded-lg px-2.5 py-2 text-xs transition-colors",
            active
              ? "bg-slate-900 text-white"
              : "text-muted-foreground hover:bg-white/70 hover:text-foreground",
          ].join(" ")}
        >
          <span className="flex min-w-0 items-center gap-2">
            <span className="inline-flex group-open:hidden">
              <IconChevronRight className="size-3" />
            </span>
            <span className="hidden group-open:inline-flex">
              <IconChevronDown className="size-3" />
            </span>
            <span className="truncate">{node.title}</span>
          </span>
          <span className="text-[10px] opacity-70">
            {node.directFileCount + node.childCount}
          </span>
        </Link>
      </summary>
      <div className="mt-1 space-y-1 pl-3">
        {visibleChildren.map((child) => (
          <FolderTree
            key={child.id}
            node={child}
            pathname={pathname}
            query={query}
          />
        ))}
      </div>
    </details>
  );
}

function SectionTitle({ icon, title }: { icon: ReactNode; title: string }) {
  return (
    <div className="mb-3 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
      {icon}
      <span>{title}</span>
    </div>
  );
}

function RegistrySidebar() {
  const pathname = usePathname();
  const [query, setQuery] = useState("");
  const normalizedQuery = query.trim().toLowerCase();

  const foundationRoots = useMemo(
    () =>
      getFoundationRoots().filter((root) => matchesNode(root, normalizedQuery)),
    [normalizedQuery],
  );

  const stagedRoots = useMemo(
    () => getStagedRoots().filter((root) => matchesNode(root, normalizedQuery)),
    [normalizedQuery],
  );

  return (
    <aside className="hidden w-[300px] shrink-0 border-r border-slate-200/70 bg-slate-100/80 backdrop-blur md:block dark:border-slate-800 dark:bg-slate-950/70">
      <div className="sticky top-0 flex h-screen flex-col">
        <div className="border-b border-slate-200/70 px-4 py-5 dark:border-slate-800">
          <Link
            href="/"
            className="block rounded-2xl bg-slate-900 px-4 py-4 text-white"
          >
            <div className="text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-300">
              REVREBEL
            </div>
            <div className="mt-2 text-lg font-semibold">
              Registry Foundations
            </div>
            <p className="mt-1 text-sm text-slate-300">
              Stabilize primitives, tokens, and install paths before metrics
              compositions move in.
            </p>
          </Link>

          <label className="relative mt-4 block">
            <IconSearch className="pointer-events-none absolute left-3 top-3 size-4 text-muted-foreground" />
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search folders and files..."
              className="h-10 w-full rounded-xl border border-slate-200 bg-white pl-10 pr-3 text-sm outline-none transition focus-visible:ring-2 focus-visible:ring-slate-400 dark:border-slate-800 dark:bg-slate-900"
            />
          </label>
        </div>

        <div className="flex-1 space-y-6 overflow-y-auto px-4 py-5">
          <section>
            <SectionTitle
              icon={<IconHome2 className="size-4" />}
              title="Navigate"
            />
            <NavSection items={primaryNav} pathname={pathname} />
          </section>

          <section>
            <SectionTitle
              icon={<IconFolder className="size-4" />}
              title="Foundation Folders"
            />
            <div className="space-y-2">
              {foundationRoots.map((root) => {
                const summary = getRootSummary(root.id);
                return (
                  <div
                    key={root.id}
                    className="rounded-2xl border border-white/80 bg-white/70 p-2 dark:border-slate-800 dark:bg-slate-900/70"
                  >
                    <Link
                      href={toFolderHref(root.id)}
                      className="mb-2 block rounded-xl px-2.5 py-2 hover:bg-slate-100 dark:hover:bg-slate-800"
                    >
                      <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                        {summary.eyebrow}
                      </div>
                      <div className="mt-1 font-medium text-sm">
                        {root.title}
                      </div>
                    </Link>
                    <FolderTree
                      node={root}
                      pathname={pathname}
                      query={normalizedQuery}
                    />
                  </div>
                );
              })}
            </div>
          </section>

          {stagedRoots.length > 0 ? (
            <section>
              <SectionTitle
                icon={<IconBooks className="size-4" />}
                title="Staged"
              />
              <div className="space-y-2">
                {stagedRoots.map((root) => {
                  const summary = getRootSummary(root.id);
                  return (
                    <Link
                      key={root.id}
                      href={toFolderHref(root.id)}
                      className="block rounded-2xl border border-dashed border-slate-300 bg-white/40 px-3 py-3 text-sm transition hover:bg-white/70 dark:border-slate-700 dark:bg-slate-900/40"
                    >
                      <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                        {summary.eyebrow}
                      </div>
                      <div className="mt-1 font-medium">{root.title}</div>
                      <p className="mt-1 text-xs text-muted-foreground">
                        {summary.description}
                      </p>
                    </Link>
                  );
                })}
              </div>
            </section>
          ) : null}
        </div>
      </div>
    </aside>
  );
}

function MobileSidebarTrigger() {
  return (
    <div className="sticky top-0 z-20 border-b border-slate-200/70 bg-background/90 px-4 py-3 backdrop-blur md:hidden dark:border-slate-800">
      <div className="flex items-center justify-between gap-3">
        <div>
          <div className="text-[11px] font-semibold uppercase tracking-[0.24em] text-muted-foreground">
            REVREBEL
          </div>
          <div className="font-semibold text-sm">Registry Foundations</div>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <Link href="/" className="rounded-full border px-3 py-1.5">
            Home
          </Link>
          <Link
            href="/catalog"
            className="rounded-full bg-foreground px-3 py-1.5 text-background"
          >
            Catalog
          </Link>
        </div>
      </div>
    </div>
  );
}

export { MobileSidebarTrigger, RegistrySidebar };
