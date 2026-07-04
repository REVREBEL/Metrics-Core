"use client";

import { createContext, useContext } from "react";

export interface Workspace {
  id: string;
  name: string;
  slug: string;
}

export interface Organization {
  id: string;
  name: string;
  slug: string;
}

export interface MainEntity {
  id: string;
  name: string;
  slug: string;
  type: string;
}

export interface Hotel {
  id: string;
  name: string;
  slug: string;
  code: string;
}

export interface Engagement {
  id: string;
  name: string;
  code: string;
}

export interface WorkspaceScope {
  workspace: Workspace;
  organization: Organization;
  mainEntity: MainEntity;
  hotel: Hotel;
  engagement: Engagement;
}

export const FIXTURE_WORKSPACE_SCOPE: WorkspaceScope = {
  workspace: {
    id: "ws-rebel-01",
    name: "RevRebel Workspace",
    slug: "revrebel-workspace",
  },
  organization: {
    id: "org-rebel-01",
    name: "RevRebel LLC",
    slug: "revrebel",
  },
  mainEntity: {
    id: "entity-hotel-01",
    name: "Grand Hotel & Suites",
    slug: "grand-hotel-suites",
    type: "hotel",
  },
  hotel: {
    id: "hotel-01",
    name: "Grand Hotel",
    slug: "grand-hotel",
    code: "GHS-01",
  },
  engagement: {
    id: "eng-metrics-01",
    name: "Metrics Implementation",
    code: "REV-METRICS",
  },
};

const WorkspaceContext = createContext<WorkspaceScope | null>(null);

export interface WorkspaceProviderProps {
  children: React.ReactNode;
  value?: WorkspaceScope;
}

export function WorkspaceProvider({
  children,
  value = FIXTURE_WORKSPACE_SCOPE,
}: WorkspaceProviderProps) {
  return <WorkspaceContext value={value}>{children}</WorkspaceContext>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useWorkspace() {
  const context = useContext(WorkspaceContext);
  if (!context) {
    throw new Error("useWorkspace must be used within a WorkspaceProvider");
  }
  return context;
}
