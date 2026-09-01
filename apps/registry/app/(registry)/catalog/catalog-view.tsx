"use client";

import {
  getRegistryFolderNode,
  getRegistryFolderRoots,
  type RegistryFolderNode,
} from "@lib/registry-folders";
import {
  getPreviewLayoutClasses,
  getRegistryPreviewSpec,
  getVisualPreview,
  RegistryButtonFamilyPreview,
  type RegistryButtonPreviewGroupId,
  type RegistryPreviewInput,
} from "@lib/registry-preview";
import {
  getRegistryItemsForFolder,
  getRootSummary,
  toFolderHref,
} from "@lib/site";
import {
  IconArrowRight,
  IconLayoutGrid,
  IconListDetails,
  IconSparkles,
} from "@tabler/icons-react";
import Link from "next/link";
import { useMemo, useState } from "react";

type FolderViewProps = {
  folderFilter?: string;
};

type RegistryCatalogItem = {
  description?: string;
  files?: Array<{ path: string; type: string; target?: string }>;
  name: string;
  title?: string;
  type: string;
};

type ButtonPreviewGroupId = RegistryButtonPreviewGroupId;

type GroupedPreviewEntry = {
  description?: string;
  items: RegistryCatalogItem[];
  layout: ReturnType<typeof getRegistryPreviewSpec>["layout"];
  previewId?: ButtonPreviewGroupId;
  previewInput: RegistryPreviewInput;
  title?: string;
};

const BUTTON_PREVIEW_GROUPS: Array<{
  description: string;
  itemNames: string[];
  layout: GroupedPreviewEntry["layout"];
  previewId: ButtonPreviewGroupId;
  title: string;
}> = [
  {
    title: "Core Button Variants",
    description:
      "Default, secondary, outline, destructive, ghost, and size states shown as one base family.",
    itemNames: [
      "button",
      "button-default",
      "button-secondary",
      "button-outline",
      "button-destructive",
      "button-ghost",
      "button-size",
    ],
    previewId: "core",
    layout: "half",
  },
  {
    title: "Icon And Inline Actions",
    description:
      "Compact icon buttons, inline icon placements, spinner affordances, and link-style actions.",
    itemNames: [
      "button-icon",
      "button-with-icon",
      "button-link",
      "button-spinner",
      "button-render",
    ],
    previewId: "icon",
    layout: "half",
  },
  {
    title: "Rounded Buttons",
    description:
      "Rounded pill treatments and icon controls should render as their own visual pattern.",
    itemNames: ["button-rounded"],
    previewId: "rounded",
    layout: "half",
  },
  {
    title: "Button Group Composition",
    description:
      "Horizontal, vertical, nested, separator, and grouped compositions belong together.",
    itemNames: [
      "button-group",
      "button-group-size",
      "button-group-orientation",
      "button-group-nested",
      "button-group-separator",
      "button-group-input",
      "button-group-input-group",
    ],
    previewId: "group",
    layout: "full",
  },
  {
    title: "Dropdown, Popover, Split",
    description:
      "Grouped actions with menus and split-button patterns need a wider preview canvas.",
    itemNames: [
      "button-group-dropdown",
      "button-group-popover",
      "button-group-select",
      "button-group-split",
    ],
    previewId: "menu",
    layout: "full",
  },
  {
    title: "Toolbar And Status Actions",
    description:
      "Toolbar toggles, async save states, and discovery-style actions should be previewed together.",
    itemNames: ["toolbar-button", "status-button", "discover-button"],
    previewId: "toolbar",
    layout: "half",
  },
];

function toTitle(value: string) {
  return value
    .split(/[-_\s/]+/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function getNode(folderId: string | undefined) {
  if (!folderId) return null;
  return getRegistryFolderNode(folderId) ?? null;
}

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

function isButtonsFolder(node: RegistryFolderNode | null) {
  if (!node) return false;
  return (
    node.id === "primitives/buttons" ||
    node.sourcePath.endsWith("/primitives/buttons") ||
    node.sourcePath.includes("/primitives/buttons")
  );
}

function buildDefaultGroupedEntries(
  items: RegistryCatalogItem[],
): GroupedPreviewEntry[] {
  const groups = new Map<string, GroupedPreviewEntry>();

  for (const item of items) {
    const previewInput = {
      description: item.description,
      name: item.name,
      sourcePath: item.files?.[0]?.path,
      title: item.title,
      type: item.type,
    };
    const spec = getRegistryPreviewSpec(previewInput);

    if (spec.layout !== "grouped") {
      groups.set(`${item.name}:${spec.template}`, {
        items: [item],
        layout: spec.layout,
        previewInput,
      });
      continue;
    }

    const sourcePath = previewInput.sourcePath ?? "";
    const familyKey = sourcePath.split("/").slice(0, 3).join("/") || item.type;
    const key = `${spec.template}:${familyKey}`;
    const existing = groups.get(key);

    if (existing) {
      existing.items.push(item);
    } else {
      groups.set(key, {
        items: [item],
        layout: spec.layout,
        previewInput: {
          ...previewInput,
          name: item.title ?? toTitle(familyKey.split("/").pop() ?? item.name),
          title: item.title ?? toTitle(familyKey.split("/").pop() ?? item.name),
        },
      });
    }
  }

  return Array.from(groups.values());
}

function buildButtonGroupedEntries(
  items: RegistryCatalogItem[],
): GroupedPreviewEntry[] {
  const itemMap = new Map(items.map((item) => [item.name, item]));
  const assigned = new Set<string>();
  const entries: GroupedPreviewEntry[] = [];

  for (const group of BUTTON_PREVIEW_GROUPS) {
    const groupedItems = group.itemNames
      .map((name) => itemMap.get(name))
      .filter((item): item is RegistryCatalogItem => Boolean(item));

    if (groupedItems.length === 0) continue;

    groupedItems.forEach((item) => assigned.add(item.name));

    entries.push({
      title: group.title,
      description: group.description,
      items: groupedItems,
      layout: group.layout,
      previewId: group.previewId,
      previewInput: {
        name: group.title,
        title: group.title,
        description: group.description,
        sourcePath: groupedItems[0]?.files?.[0]?.path,
        type: groupedItems[0]?.type,
      },
    });
  }

  const leftovers = items.filter((item) => !assigned.has(item.name));
  return entries.concat(buildDefaultGroupedEntries(leftovers));
}

function hasMatchingDescendant(
  node: RegistryFolderNode,
  query: string,
): boolean {
  return node.children.some((childId) => {
    const child = getRegistryFolderNode(childId);
    if (!child) return false;
    return (
      getNodeText(child).includes(query) || hasMatchingDescendant(child, query)
    );
  });
}

function matchesFolder(node: RegistryFolderNode, query: string): boolean {
  if (!query) return true;
  return (
    getNodeText(node).includes(query) || hasMatchingDescendant(node, query)
  );
}

function FolderCard({ node }: { node: RegistryFolderNode }) {
  return (
    <Link
      className="rounded-2xl border bg-card p-4 transition-colors hover:bg-muted/50"
      href={toFolderHref(node.id)}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <h2 className="font-medium text-base">{node.title}</h2>
          <p className="mt-1 break-all text-muted-foreground text-xs">
            {node.sourcePath}
          </p>
        </div>
        <span className="rounded-full border px-2 py-1 text-xs">
          {node.childCount + node.directFileCount}
        </span>
      </div>
      <div className="mt-4 flex flex-wrap gap-2 text-xs text-muted-foreground">
        <span className="rounded-full border px-2 py-1">{node.kind}</span>
        <span className="rounded-full border px-2 py-1">
          {node.childCount} groups
        </span>
        <span className="rounded-full border px-2 py-1">
          {node.directFileCount} files
        </span>
      </div>
    </Link>
  );
}

function FolderTree({
  node,
  query,
}: {
  node: RegistryFolderNode;
  query: string;
}) {
  const visibleChildren = node.children
    .map((childId) => getRegistryFolderNode(childId))
    .filter((child): child is RegistryFolderNode => Boolean(child))
    .filter((child) => matchesFolder(child, query));

  if (!matchesFolder(node, query)) return null;

  return (
    <details className="group" open={node.depth < 1 || Boolean(query)}>
      <summary className="cursor-pointer rounded-md px-2 py-1.5 text-sm text-muted-foreground hover:bg-muted hover:text-foreground">
        <div className="flex items-center justify-between gap-3">
          <span className="truncate">{node.title}</span>
          <span className="text-xs">
            {node.directFileCount} files · {node.childCount} groups
          </span>
        </div>
      </summary>
      <div className="mt-2 space-y-1 pl-3">
        {visibleChildren.map((child) => (
          <FolderTree key={child.id} node={child} query={query} />
        ))}
      </div>
    </details>
  );
}

export function CatalogView({ folderFilter }: FolderViewProps) {
  const [query, setQuery] = useState("");
  const normalizedQuery = query.trim().toLowerCase();

  const rootNodes = useMemo(() => getRegistryFolderRoots(), []);
  const currentNode = useMemo(() => getNode(folderFilter), [folderFilter]);

  const visibleRoots = useMemo(
    () => rootNodes.filter((node) => matchesFolder(node, normalizedQuery)),
    [normalizedQuery, rootNodes],
  );

  const directChildren = useMemo(() => {
    if (!currentNode) return [];
    return currentNode.children
      .map((id) => getRegistryFolderNode(id))
      .filter((node): node is RegistryFolderNode => Boolean(node))
      .filter((node) => matchesFolder(node, normalizedQuery));
  }, [currentNode, normalizedQuery]);

  const visibleFiles = useMemo(() => {
    if (!currentNode) return [];
    return currentNode.directFiles.filter((filePath) =>
      filePath.toLowerCase().includes(normalizedQuery),
    );
  }, [currentNode, normalizedQuery]);

  const matchedItems = useMemo(() => {
    if (!currentNode) return [];
    return getRegistryItemsForFolder(currentNode.id, visibleFiles);
  }, [currentNode, visibleFiles]);

  const groupedPreviewEntries = useMemo(() => {
    if (isButtonsFolder(currentNode)) {
      return buildButtonGroupedEntries(matchedItems);
    }

    return buildDefaultGroupedEntries(matchedItems);
  }, [currentNode, matchedItems]);

  const breadcrumb = useMemo(() => {
    if (!currentNode) return [];

    const trail: RegistryFolderNode[] = [];
    let cursor: RegistryFolderNode | null = currentNode;

    while (cursor) {
      trail.unshift(cursor);
      cursor = cursor.parentId
        ? (getRegistryFolderNode(cursor.parentId) ?? null)
        : null;
    }

    return trail;
  }, [currentNode]);

  return (
    <div className="container mx-auto max-w-7xl px-6 py-8">
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div className="space-y-2">
          <h1 className="font-semibold text-2xl tracking-tight">
            {currentNode ? currentNode.title : "Registry"}
          </h1>
          <p className="text-muted-foreground text-sm">
            {currentNode
              ? `Folder-first view for ${currentNode.sourcePath}.`
              : "Browse the registry by folder first so the site stays predictable and the tree stays stable."}
          </p>
          {breadcrumb.length > 0 ? (
            <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
              {breadcrumb.map((node, index) => (
                <span key={node.id} className="flex items-center gap-2">
                  {index > 0 ? <span>/</span> : null}
                  <Link
                    className="underline-offset-4 hover:underline"
                    href={toFolderHref(node.id)}
                  >
                    {node.title}
                  </Link>
                </span>
              ))}
            </div>
          ) : null}
        </div>

        <div className="rounded-lg border bg-card px-4 py-3 text-right">
          <div className="font-semibold text-2xl tabular-nums">
            {currentNode
              ? currentNode.directFileCount + currentNode.childCount
              : rootNodes.length}
          </div>
          <div className="text-muted-foreground text-xs">
            {currentNode ? "visible entries" : "root folders"}
          </div>
        </div>
      </div>

      <div className="mb-6">
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search folders or files..."
          className="h-10 w-full rounded-md border bg-background px-3 text-sm outline-none ring-offset-background placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring"
        />
      </div>

      {!currentNode ? (
        <div className="space-y-6">
          <section className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
            {visibleRoots.map((node) => (
              <FolderCard key={node.id} node={node} />
            ))}
          </section>

          <section className="rounded-lg border bg-card p-4">
            <h2 className="font-medium text-base">Folder Tree</h2>
            <div className="mt-3 space-y-1">
              {visibleRoots.map((node) => (
                <FolderTree key={node.id} node={node} query={normalizedQuery} />
              ))}
            </div>
          </section>
        </div>
      ) : (
        <div className="space-y-6">
          <section className="rounded-[1.5rem] border bg-card p-5">
            <div className="flex items-center justify-between gap-3">
              <div>
                <div className="flex items-center gap-2 text-sm font-medium">
                  <IconSparkles className="size-4 text-muted-foreground" />
                  Registry items in this folder
                </div>
                <p className="mt-1 text-sm text-muted-foreground">
                  {
                    getRootSummary(
                      currentNode.id.split("/")[0] ?? currentNode.id,
                    ).description
                  }
                </p>
              </div>
              <span className="rounded-full border px-3 py-1 text-xs">
                {matchedItems.length} item{matchedItems.length === 1 ? "" : "s"}
              </span>
            </div>

            {matchedItems.length > 0 ? (
              <div className="mt-5 grid gap-4 xl:grid-cols-2">
                {groupedPreviewEntries.map((entry) => (
                  <div
                    key={`${entry.previewId ?? "default"}:${entry.previewInput.name}:${entry.items.map((item) => item.name).join(",")}`}
                    className={[
                      "rounded-2xl border bg-background p-4",
                      getPreviewLayoutClasses(entry.layout),
                    ].join(" ")}
                  >
                    <div className="mb-4 flex items-start justify-between gap-3">
                      <div>
                        <div className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                          {entry.items[0]?.type.replace("registry:", "")}
                        </div>
                        <h2 className="mt-2 font-semibold text-xl">
                          {entry.title ??
                            (entry.layout === "grouped"
                              ? (entry.previewInput.title ??
                                entry.previewInput.name)
                              : (entry.items[0]?.title ??
                                toTitle(
                                  entry.items[0]?.name ??
                                    entry.previewInput.name,
                                )))}
                        </h2>
                        <p className="mt-2 text-sm text-muted-foreground">
                          {entry.description ??
                            (entry.layout === "grouped"
                              ? `${entry.items.length} related registry items shown together.`
                              : entry.items[0]?.description ||
                                "Registry item available for install and preview.")}
                        </p>
                      </div>
                      {entry.items.length === 1 ? (
                        <Link
                          href={`/registry/${entry.items[0].name}`}
                          className="inline-flex items-center gap-1 rounded-full border px-3 py-1.5 text-xs transition hover:bg-muted"
                        >
                          Open item
                          <IconArrowRight className="size-3.5" />
                        </Link>
                      ) : (
                        <span className="rounded-full border px-3 py-1.5 text-xs">
                          {entry.items.length} items
                        </span>
                      )}
                    </div>
                    <RegistryGroupPreview entry={entry} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="mt-5 rounded-2xl border border-dashed p-5 text-sm text-muted-foreground">
                This folder does not map cleanly to registry item metadata yet,
                so the raw source files are listed below.
              </div>
            )}
          </section>

          <section className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
            {directChildren.map((node) => (
              <FolderCard key={node.id} node={node} />
            ))}
          </section>

          <section className="rounded-lg border bg-card p-4">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <IconListDetails className="size-4 text-muted-foreground" />
                <h2 className="font-medium text-base">Direct Files</h2>
              </div>
              <span className="text-xs text-muted-foreground">
                {visibleFiles.length} file{visibleFiles.length === 1 ? "" : "s"}
              </span>
            </div>
            <div className="mt-3 divide-y rounded-md border">
              {visibleFiles.length > 0 ? (
                visibleFiles.map((filePath) => (
                  <div
                    key={filePath}
                    className="flex items-center justify-between gap-3 px-3 py-2 text-sm"
                  >
                    <span className="truncate font-mono">{filePath}</span>
                    <span className="text-xs text-muted-foreground">
                      {toTitle(filePath.split("/").pop() ?? "")}
                    </span>
                  </div>
                ))
              ) : (
                <div className="px-3 py-4 text-sm text-muted-foreground">
                  No direct files match this folder search.
                </div>
              )}
            </div>
          </section>

          <section className="rounded-lg border bg-card p-4">
            <div className="flex items-center gap-2">
              <IconLayoutGrid className="size-4 text-muted-foreground" />
              <h2 className="font-medium text-base">Nested Tree</h2>
            </div>
            <div className="mt-3 space-y-1">
              <FolderTree node={currentNode} query={normalizedQuery} />
            </div>
          </section>
        </div>
      )}
    </div>
  );
}

function RegistryItemPreview({ item }: { item: RegistryCatalogItem }) {
  const Preview = getVisualPreview({
    description: item.description,
    name: item.name,
    sourcePath: item.files?.[0]?.path,
    title: item.title,
    type: item.type,
  });

  return (
    <div className="rounded-2xl border bg-card p-4">
      <Preview
        description={item.description}
        name={item.name}
        sourcePath={item.files?.[0]?.path}
        title={item.title}
      />
      <div className="mt-4 flex items-center justify-between gap-3 border-t pt-4">
        <div className="text-xs text-muted-foreground">
          {item.files?.[0]?.path ?? "Registry item"}
        </div>
        <Link
          href={`/registry/${item.name}`}
          className="inline-flex items-center gap-1 rounded-full border px-3 py-1.5 text-xs transition hover:bg-muted"
        >
          Open install view
          <IconArrowRight className="size-3.5" />
        </Link>
      </div>
    </div>
  );
}

function RegistryGroupPreview({ entry }: { entry: GroupedPreviewEntry }) {
  const Preview = getVisualPreview(entry.previewInput);

  return (
    <div className="rounded-2xl border bg-card p-4">
      {entry.previewId ? (
        <RegistryButtonFamilyPreview previewId={entry.previewId} />
      ) : (
        <Preview
          description={entry.previewInput.description}
          name={entry.previewInput.name}
          sourcePath={entry.previewInput.sourcePath}
          title={entry.previewInput.title}
        />
      )}
      <div className="mt-4 border-t pt-4">
        <div className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
          {entry.items.length === 1 ? "Install view" : "Items in this preview"}
        </div>
        <div className="flex flex-wrap gap-2">
          {entry.items.map((item) => (
            <Link
              key={item.name}
              href={`/registry/${item.name}`}
              className="inline-flex items-center gap-1 rounded-full border px-3 py-1.5 text-xs transition hover:bg-muted"
            >
              {item.title ?? toTitle(item.name)}
              <IconArrowRight className="size-3.5" />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
