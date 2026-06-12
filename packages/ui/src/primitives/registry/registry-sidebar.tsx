"use client";

import { Folder, Home, Search } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { useMemo, useState } from "react";
import { REGISTRY } from "@/lib/registry";

type PlaygroundEntry = {
  name: string;
  type: string;
  metadata?: {
    sourcePath?: string;
  };
};

type NavItem = {
  name: string;
  title: string;
  path: string;
};

export const gettingStartedItems: NavItem[] = [
  { name: "home", title: "Home", path: "/" },
  { name: "tokens", title: "Design Tokens", path: "/tokens" },
  { name: "catalog", title: "Component Catalog", path: "/catalog" },
];

type FolderGroup = {
  folder: string;
  items: NavItem[];
};

function toTitle(value: string) {
  return value
    .split(/[-_\s/]+/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function getFolderFromSourcePath(sourcePath: string | undefined) {
  if (!sourcePath) return "unknown";

  const withoutFile = sourcePath.replace(/\/[^/]+$/, "");
  return withoutFile.replace(/^src\//, "");
}

function folderHref(folder: string) {
  return `/catalog/folder/${folder
    .split("/")
    .map((part) => encodeURIComponent(part))
    .join("/")}`;
}

const sourceFolderGroups: FolderGroup[] = Object.entries(
  REGISTRY as Record<string, PlaygroundEntry>,
).reduce<FolderGroup[]>((groups, [id, entry]) => {
  if (!entry || typeof entry !== "object") return groups;

  const folder = getFolderFromSourcePath(entry.metadata?.sourcePath);
  let group = groups.find((candidate) => candidate.folder === folder);
  if (!group) {
    group = { folder, items: [] };
    groups.push(group);
  }

  group.items.push({
    name: id,
    title: toTitle(entry.name ?? id),
    path: `${folderHref(folder)}#${id}`,
  });

  return groups;
}, [])
  .map((group) => ({
    ...group,
    items: group.items.sort((a, b) => a.title.localeCompare(b.title)),
  }))
  .sort((a, b) => a.folder.localeCompare(b.folder));

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
          const isActive = pathname === item.path.split("#")[0];
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

function SourceFolderSection({
  groups,
  pathname,
}: {
  groups: FolderGroup[];
  pathname: string;
}) {
  return (
    <section className="border-b px-3 py-3">
      <div className="mb-2 flex items-center gap-2 font-medium text-muted-foreground text-xs uppercase tracking-wide">
        <Folder className="size-4" />
        Source Folders
      </div>
      <div className="space-y-1">
        {groups.map((group) => (
          <details key={group.folder} className="group" open={group.items.length < 12}>
            <summary className="cursor-pointer truncate rounded-md px-2 py-1.5 font-medium text-muted-foreground text-xs hover:bg-muted hover:text-foreground">
              {group.folder}
              <span className="ml-1 text-muted-foreground/70">
                ({group.items.length})
              </span>
            </summary>
            <nav className="mt-1 grid gap-1 pl-3">
              <Link
                className={[
                  "truncate rounded-md px-2 py-1.5 text-xs transition-colors",
                  pathname === folderHref(group.folder)
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground",
                ].join(" ")}
                href={folderHref(group.folder)}
              >
                View folder
              </Link>
              {group.items.map((item) => {
                const isActive = pathname === item.path.split("#")[0];
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
          </details>
        ))}
      </div>
    </section>
  );
}

function RegistrySidebar() {
  const pathname = usePathname();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredFolderGroups = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    if (!term) return sourceFolderGroups;

    return sourceFolderGroups
      .map((group) => ({
        ...group,
        items: group.items.filter(
          (item) =>
            item.title.toLowerCase().includes(term) ||
            group.folder.toLowerCase().includes(term),
        ),
      }))
      .filter((group) => group.items.length > 0);
  }, [searchTerm]);

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
              placeholder="Search..."
              type="search"
              value={searchTerm}
            />
          </label>
        </header>

        <div className="min-h-0 flex-1 overflow-y-auto">
          <RegistrySection
            icon={<Home className="size-4" />}
            items={gettingStartedItems}
            pathname={pathname}
            title="Getting Started"
          />
          <SourceFolderSection
            groups={filteredFolderGroups}
            pathname={pathname}
          />
        </div>
      </div>
    </aside>
  );
}

export { MobileSidebarTrigger, RegistrySidebar };
