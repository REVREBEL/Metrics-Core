"use client";

import { Folder, Home, Search } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { useMemo, useState } from "react";

import {
  REGISTRY_FOLDER_MANIFEST,
  type RegistryFolderNode,
} from "@/lib/registry-folders";

type NavItem = {
  name: string;
  title: string;
  path: string;
};

function folderHref(folder: string) {
  return `/catalog/folder/${folder
    .split("/")
    .map((part) => encodeURIComponent(part))
    .join("/")}`;
}

function matches(node: RegistryFolderNode, query: string): boolean {
  const haystack = [node.id, node.title, node.sourcePath, ...node.directFiles]
    .join(" ")
    .toLowerCase();

  if (!query) return true;
  if (haystack.includes(query)) return true;
  return node.children.some((childId) => {
    const child = REGISTRY_FOLDER_MANIFEST.nodes[childId];
    return child ? matches(child, query) : false;
  });
}

function FolderTree({
  node,
  pathname,
  query,
}: {
  node: RegistryFolderNode;
  pathname: string;
  query: string;
}): React.ReactNode {
  if (!matches(node, query)) return null;

  const isActive = pathname === folderHref(node.id);
  const children = node.children
    .map((id) => REGISTRY_FOLDER_MANIFEST.nodes[id])
    .filter((child): child is RegistryFolderNode => Boolean(child))
    .filter((child) => matches(child, query));

  return (
    <details className="group" open={node.depth < 1 || Boolean(query)}>
      <summary
        className={[
          "cursor-pointer truncate rounded-md px-2 py-1.5 text-xs transition-colors",
          isActive
            ? "bg-primary text-primary-foreground"
            : "text-muted-foreground hover:bg-muted hover:text-foreground",
        ].join(" ")}
      >
        <div className="flex items-center justify-between gap-2">
          <span className="truncate">{node.title}</span>
          <span className="text-[10px] opacity-70">
            {node.directFileCount + node.childCount}
          </span>
        </div>
      </summary>
      <div className="mt-1 space-y-1 pl-3">
        <Link
          className={[
            "block truncate rounded-md px-2 py-1.5 text-xs transition-colors",
            pathname === folderHref(node.id)
              ? "bg-primary text-primary-foreground"
              : "text-muted-foreground hover:bg-muted hover:text-foreground",
          ].join(" ")}
          href={folderHref(node.id)}
        >
          Open folder
        </Link>
        {children.map((child) => (
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

export const gettingStartedItems: NavItem[] = [
  { name: "home", title: "Home", path: "/" },
  { name: "catalog", title: "Catalog", path: "/catalog" },
];

function MobileSidebarTrigger() {
  return null;
}

function RegistrySection({
  title,
  icon,
  items,
  pathname,
}: {
  title: string;
  icon: ReactNode;
  items: NavItem[];
  pathname: string;
}) {
  return (
    <section className="border-b px-3 py-3">
      <div className="mb-2 flex items-center gap-2 font-medium text-muted-foreground text-xs uppercase tracking-wide">
        {icon}
        {title}
      </div>
      <nav className="grid gap-1">
        {items.map((item) => {
          const isActive = pathname === item.path;
          return (
            <Link
              className={[
                "truncate rounded-md px-2 py-1.5 text-sm transition-colors",
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground",
              ].join(" ")}
              href={item.path}
              key={item.name}
            >
              {item.title}
            </Link>
          );
        })}
      </nav>
    </section>
  );
}

function RegistrySidebar() {
  const pathname = usePathname();
  const [searchTerm, setSearchTerm] = useState("");

  const rootNodes = useMemo(
    () =>
      REGISTRY_FOLDER_MANIFEST.roots
        .map((id) => REGISTRY_FOLDER_MANIFEST.nodes[id])
        .filter((node): node is RegistryFolderNode => Boolean(node))
        .filter((node) => matches(node, searchTerm.trim().toLowerCase())),
    [searchTerm],
  );

  return (
    <aside className="hidden h-svh w-72 shrink-0 border-r bg-background md:block">
      <div className="sticky top-0 flex h-svh flex-col">
        <header className="border-b px-4 py-4">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <span className="rounded-md bg-primary px-2 py-1 text-primary-foreground text-xs">
              UI
            </span>
            Registry
          </Link>
          <label className="relative mt-4 block">
            <Search className="absolute left-2 top-2.5 size-4 text-muted-foreground" />
            <input
              className="h-9 w-full rounded-md border bg-background pl-8 pr-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Search folders..."
              type="search"
              value={searchTerm}
            />
          </label>
        </header>

        <div className="flex-1 overflow-y-auto">
          <RegistrySection
            icon={<Home className="size-4" />}
            items={gettingStartedItems}
            pathname={pathname}
            title="Getting Started"
          />

          <section className="border-b px-3 py-3">
            <div className="mb-2 flex items-center gap-2 font-medium text-muted-foreground text-xs uppercase tracking-wide">
              <Folder className="size-4" />
              Source Folders
            </div>
            <div className="space-y-1">
              {rootNodes.map((node) => (
                <FolderTree
                  key={node.id}
                  node={node}
                  pathname={pathname}
                  query={searchTerm.trim().toLowerCase()}
                />
              ))}
            </div>
          </section>
        </div>
      </div>
    </aside>
  );
}

export { MobileSidebarTrigger, RegistrySidebar };
