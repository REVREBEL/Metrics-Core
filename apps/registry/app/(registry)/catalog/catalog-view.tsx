"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

import {
  getRegistryFolderNode,
  getRegistryFolderRoots,
  type RegistryFolderNode,
} from "@lib/registry-folders";

type FolderViewProps = {
  folderFilter?: string;
};

function toTitle(value: string) {
  return value
    .split(/[-_\s/]+/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function folderHref(folder: string) {
  return `/catalog/folder/${folder
    .split("/")
    .map((part) => encodeURIComponent(part))
    .join("/")}`;
}

function getNode(folderId: string | undefined) {
  if (!folderId) return null;
  return getRegistryFolderNode(folderId) ?? null;
}

function getNodeText(node: RegistryFolderNode) {
  return [
    node.id,
    node.title,
    node.sourcePath,
    ...node.directFiles,
  ]
    .join(" ")
    .toLowerCase();
}

function hasMatchingDescendant(node: RegistryFolderNode, query: string): boolean {
  return node.children.some((childId) => {
    const child = getRegistryFolderNode(childId);
    if (!child) return false;
    return getNodeText(child).includes(query) || hasMatchingDescendant(child, query);
  });
}

function matchesFolder(node: RegistryFolderNode, query: string): boolean {
  if (!query) return true;
  return getNodeText(node).includes(query) || hasMatchingDescendant(node, query);
}

function FolderCard({ node }: { node: RegistryFolderNode }) {
  return (
    <Link
      className="rounded-lg border bg-card p-4 transition-colors hover:bg-muted/50"
      href={folderHref(node.id)}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <h2 className="font-medium text-base">{node.title}</h2>
          <p className="mt-1 break-all text-muted-foreground text-xs">{node.sourcePath}</p>
        </div>
        <span className="rounded-full border px-2 py-1 text-xs">
          {node.childCount + node.directFileCount}
        </span>
      </div>
      <div className="mt-4 flex flex-wrap gap-2 text-xs text-muted-foreground">
        <span className="rounded-full border px-2 py-1">{node.kind}</span>
        <span className="rounded-full border px-2 py-1">{node.childCount} groups</span>
        <span className="rounded-full border px-2 py-1">{node.directFileCount} files</span>
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
        <Link
          className="block rounded-md px-2 py-1.5 text-xs text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          href={folderHref(node.id)}
        >
          Open folder
        </Link>
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

  const breadcrumb = useMemo(() => {
    if (!currentNode) return [];

    const trail: RegistryFolderNode[] = [];
    let cursor: RegistryFolderNode | null = currentNode;

    while (cursor) {
      trail.unshift(cursor);
      cursor = cursor.parentId ? getRegistryFolderNode(cursor.parentId) ?? null : null;
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
                  <Link className="underline-offset-4 hover:underline" href={folderHref(node.id)}>
                    {node.title}
                  </Link>
                </span>
              ))}
            </div>
          ) : null}
        </div>

        <div className="rounded-lg border bg-card px-4 py-3 text-right">
          <div className="font-semibold text-2xl tabular-nums">
            {currentNode ? currentNode.directFileCount + currentNode.childCount : rootNodes.length}
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
          <section className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
            {directChildren.map((node) => (
              <FolderCard key={node.id} node={node} />
            ))}
          </section>

          <section className="rounded-lg border bg-card p-4">
            <div className="flex items-center justify-between gap-3">
              <h2 className="font-medium text-base">Direct Files</h2>
              <span className="text-xs text-muted-foreground">
                {visibleFiles.length} file{visibleFiles.length === 1 ? "" : "s"}
              </span>
            </div>
            <div className="mt-3 divide-y rounded-md border">
              {visibleFiles.length > 0 ? (
                visibleFiles.map((filePath) => (
                  <div key={filePath} className="flex items-center justify-between gap-3 px-3 py-2 text-sm">
                    <span className="truncate font-mono">{filePath}</span>
                    <span className="text-xs text-muted-foreground">{toTitle(filePath.split("/").pop() ?? "")}</span>
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
            <h2 className="font-medium text-base">Nested Tree</h2>
            <div className="mt-3 space-y-1">
              <FolderTree node={currentNode} query={normalizedQuery} />
            </div>
          </section>
        </div>
      )}
    </div>
  );
}
