import type { ComponentType } from "react";

export type RegistryCategory = {
  id: string;
  title: string;
  description?: string;
  href: string;
};

export type RegistryComponent = {
  id: string;
  title: string;
  description?: string;
  tags?: string[];
  status?: "stable" | "experimental" | "deprecated";
  component: ComponentType;
  display?: "card" | "inline" | "full";
};
