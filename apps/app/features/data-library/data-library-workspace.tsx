"use client";

import {
  AlertTriangle,
  CheckCircle2,
  Database,
  GitPullRequest,
  LockKeyhole,
  Search,
} from "lucide-react";
import { useMemo, useState } from "react";
import type { DataLibraryTableDefinition } from "./registry";

type DataLibraryWorkspaceProps = {
  definitions: DataLibraryTableDefinition[];
};

export function DataLibraryWorkspace({
  definitions,
}: DataLibraryWorkspaceProps) {
  const [selectedKey, setSelectedKey] = useState(definitions[0]?.key ?? "");
  const [query, setQuery] = useState("");

  const visibleDefinitions = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    if (!normalizedQuery) return definitions;
    return definitions.filter((definition) =>
      [
        definition.title,
        definition.description,
        definition.table,
        definition.group,
      ].some((value) => value.toLowerCase().includes(normalizedQuery)),
    );
  }, [definitions, query]);

  const selected =
    definitions.find((definition) => definition.key === selectedKey) ??
    definitions[0];

  if (!selected) {
    return (
      <div className="rounded-lg border border-dashed border-border p-8 text-center text-sm text-muted-foreground">
        No governed tables are registered.
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <header className="flex flex-wrap items-start justify-between gap-4 border-b border-border/40 pb-4">
        <div>
          <div className="mb-1 flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-primary">
            <Database className="size-3.5" />
            Data Governance
          </div>
          <h2 className="text-2xl font-bold tracking-tight">Metrics Library</h2>
          <p className="mt-1 max-w-2xl text-sm text-muted-foreground">
            Registry-driven lookup and mapping table management.
          </p>
        </div>
        <div className="rounded-full border border-amber-500/20 bg-amber-500/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-amber-600">
          Persistence adapter pending
        </div>
      </header>

      <div className="grid gap-4 lg:grid-cols-[220px_minmax(0,1fr)_240px]">
        <aside className="rounded-xl border border-border/40 bg-muted/10 p-3">
          <div className="relative mb-3">
            <Search className="absolute left-2.5 top-2.5 size-3.5 text-muted-foreground" />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Find a table"
              className="h-9 w-full rounded-md border border-border/40 bg-background pl-8 pr-3 text-xs outline-none focus-visible:ring-1 focus-visible:ring-primary"
            />
          </div>
          <div className="space-y-1">
            {visibleDefinitions.map((definition) => (
              <button
                key={definition.key}
                type="button"
                onClick={() => setSelectedKey(definition.key)}
                className={`w-full rounded-md border px-3 py-2 text-left transition-colors ${
                  selected.key === definition.key
                    ? "border-primary/30 bg-primary/10 text-primary"
                    : "border-transparent text-muted-foreground hover:bg-muted/40 hover:text-foreground"
                }`}
              >
                <span className="block text-xs font-semibold">
                  {definition.title}
                </span>
                <span className="mt-0.5 block text-[10px] uppercase tracking-wider">
                  {definition.category} · {definition.group}
                </span>
              </button>
            ))}
          </div>
        </aside>

        <main className="min-w-0 rounded-xl border border-border/40 bg-background">
          <div className="border-b border-border/30 p-4">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <h3 className="font-semibold">{selected.title}</h3>
                <p className="mt-1 text-xs text-muted-foreground">
                  {selected.description}
                </p>
              </div>
              <code className="rounded bg-muted px-2 py-1 text-[10px] text-muted-foreground">
                {selected.dataset}.{selected.table}
              </code>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-border/30 bg-muted/30 text-[10px] uppercase tracking-wider text-muted-foreground">
                <tr>
                  <th className="px-3 py-2 font-semibold">Column</th>
                  <th className="px-3 py-2 font-semibold">Type</th>
                  <th className="px-3 py-2 font-semibold">Behavior</th>
                  <th className="px-3 py-2 font-semibold">Dependency</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/25">
                {selected.columns.map((column) => (
                  <tr key={column.key}>
                    <td className="px-3 py-2.5">
                      <div className="font-medium">{column.label}</div>
                      <code className="text-[10px] text-muted-foreground">
                        {column.key}
                      </code>
                    </td>
                    <td className="px-3 py-2.5 text-muted-foreground">
                      {column.type}
                    </td>
                    <td className="px-3 py-2.5">
                      <span
                        className={
                          column.editable
                            ? "text-emerald-600"
                            : "text-muted-foreground"
                        }
                      >
                        {column.editable ? "Editable" : "Read only"}
                      </span>
                      {column.required ? " · Required" : ""}
                    </td>
                    <td className="px-3 py-2.5 text-[10px] text-muted-foreground">
                      {column.lookupDependency ?? "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="m-4 flex gap-3 rounded-lg border border-amber-500/20 bg-amber-500/5 p-4">
            <AlertTriangle className="mt-0.5 size-4 shrink-0 text-amber-600" />
            <div>
              <p className="text-xs font-semibold">Row service not connected</p>
              <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                Metrics-Core does not currently contain the repository-owned
                database schema, auth helpers, or warehouse read adapter needed
                to load and persist governed rows safely. No fixture rows are
                presented as live data.
              </p>
            </div>
          </div>
        </main>

        <aside className="space-y-3 rounded-xl border border-border/40 bg-muted/10 p-4">
          <div>
            <div className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
              Table inspector
            </div>
            <p className="mt-2 text-xs leading-relaxed">{selected.grain}</p>
          </div>
          <dl className="space-y-3 border-t border-border/30 pt-3 text-xs">
            <div>
              <dt className="text-[10px] uppercase tracking-wider text-muted-foreground">
                Logical key
              </dt>
              <dd className="mt-1 font-mono text-[10px]">
                {selected.primaryKey.join(" + ")}
              </dd>
            </div>
            <div>
              <dt className="flex items-center gap-1 text-[10px] uppercase tracking-wider text-muted-foreground">
                <LockKeyhole className="size-3" /> Concurrency
              </dt>
              <dd className="mt-1 text-amber-600">
                {selected.concurrency.status}
              </dd>
            </div>
            <div>
              <dt className="flex items-center gap-1 text-[10px] uppercase tracking-wider text-muted-foreground">
                <GitPullRequest className="size-3" /> Publication
              </dt>
              <dd className="mt-1 capitalize">{selected.publication}</dd>
            </div>
            <div>
              <dt className="flex items-center gap-1 text-[10px] uppercase tracking-wider text-muted-foreground">
                <CheckCircle2 className="size-3" /> Current value owner
              </dt>
              <dd className="mt-1">{selected.currentValueOwner}</dd>
            </div>
          </dl>
        </aside>
      </div>
    </div>
  );
}
