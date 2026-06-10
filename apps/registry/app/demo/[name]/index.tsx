"use client";

import dynamic from "next/dynamic";
import type { ComponentType, ReactNode } from "react";
import { Renderer } from "./renderer";

type Demo = {
  name?: string;
  components?: Record<string, ReactNode>;
};

type DemoModule = Record<string, Demo>;
type DemoComponent = ComponentType;

function DemoRenderer({ demo }: { demo: Demo }) {
  if (!demo.components) return null;

  return (
    <>
      {Object.entries(demo.components).map(([key, node]) => (
        <div className="relative w-full" key={key}>
          <Renderer>{node}</Renderer>
        </div>
      ))}
    </>
  );
}

function makeDemo(loader: () => Promise<unknown>, exportName: string): DemoComponent {
  return dynamic(async () => {
    const mod = (await loader()) as DemoModule;
    const demo = mod[exportName];

    return function DemoWrapper() {
      return demo ? <DemoRenderer demo={demo} /> : null;
    };
  });
}

export const demos: Record<string, DemoComponent> = {
  "blank": makeDemo(() => import("./blocks/blank"), "blank"),
  "store": makeDemo(() => import("./blocks/store"), "store"),
  "dashboard": makeDemo(() => import("./blocks/dashboard"), "dashboard"),
  "hero": makeDemo(() => import("./components/hero"), "hero"),
  "login": makeDemo(() => import("./components/login"), "login"),
  "promo": makeDemo(() => import("./components/promo"), "promo"),
  "logo": makeDemo(() => import("./components/logo"), "logo"),
  "accordion": makeDemo(() => import("./ui/accordion"), "accordion"),
  "alert": makeDemo(() => import("./ui/alert"), "alert"),
  "avatar": makeDemo(() => import("./ui/avatar"), "avatar"),
  "badge": makeDemo(() => import("./ui/badge"), "badge"),
  "breadcrumb": makeDemo(() => import("./ui/breadcrumb"), "breadcrumb"),
  "button": makeDemo(() => import("./ui/button"), "button"),
  "calendar": makeDemo(() => import("./ui/calendar"), "calendar"),
  "card": makeDemo(() => import("./ui/card"), "card"),
  "carousel": makeDemo(() => import("./ui/carousel"), "carousel"),
  "chart": makeDemo(() => import("./ui/chart"), "chart"),
  "checkbox": makeDemo(() => import("./ui/checkbox"), "checkbox"),
  "collapsible": makeDemo(() => import("./ui/collapsible"), "collapsible"),
  "command": makeDemo(() => import("./ui/command"), "command"),
  "dialog": makeDemo(() => import("./ui/dialog"), "dialog"),
  "drawer": makeDemo(() => import("./ui/drawer"), "drawer"),
  "form": makeDemo(() => import("./ui/form"), "form"),
  "input": makeDemo(() => import("./ui/input"), "input"),
  "label": makeDemo(() => import("./ui/label"), "label"),
  "menubar": makeDemo(() => import("./ui/menubar"), "menubar"),
  "pagination": makeDemo(() => import("./ui/pagination"), "pagination"),
  "popover": makeDemo(() => import("./ui/popover"), "popover"),
  "progress": makeDemo(() => import("./ui/progress"), "progress"),
  "resizable": makeDemo(() => import("./ui/resizable"), "resizable"),
  "select": makeDemo(() => import("./ui/select"), "select"),
  "separator": makeDemo(() => import("./ui/separator"), "separator"),
  "sheet": makeDemo(() => import("./ui/sheet"), "sheet"),
  "sidebar": makeDemo(() => import("./ui/sidebar"), "sidebar"),
  "skeleton": makeDemo(() => import("./ui/skeleton"), "skeleton"),
  "slider": makeDemo(() => import("./ui/slider"), "slider"),
  "sonner": makeDemo(() => import("./ui/sonner"), "sonner"),
  "switch": makeDemo(() => import("./ui/switch"), "switchComponent"),
  "table": makeDemo(() => import("./ui/table"), "table"),
  "tabs": makeDemo(() => import("./ui/tabs"), "tabs"),
  "textarea": makeDemo(() => import("./ui/textarea"), "textarea"),
  "toggle": makeDemo(() => import("./ui/toggle"), "toggle"),
  "tooltip": makeDemo(() => import("./ui/tooltip"), "tooltip"),
  "brand-header": makeDemo(() => import("./components/brand-header"), "brandHeader"),
  "brand-sidebar": makeDemo(() => import("./components/brand-sidebar"), "brandSidebar"),
  "product-grid": makeDemo(() => import("./components/product-grid"), "productGrid"),
  "alert-dialog": makeDemo(() => import("./ui/alert-dialog"), "alertDialog"),
  "aspect-ratio": makeDemo(() => import("./ui/aspect-ratio"), "aspectRatio"),
  "context-menu": makeDemo(() => import("./ui/context-menu"), "contextMenu"),
  "data-table": makeDemo(() => import("./ui/data-table"), "dataTable"),
  "date-picker": makeDemo(() => import("./ui/date-picker"), "datePicker"),
  "dropdown-menu": makeDemo(() => import("./ui/dropdown-menu"), "dropdownMenu"),
  "hover-card": makeDemo(() => import("./ui/hover-card"), "hoverCard"),
  "input-otp": makeDemo(() => import("./ui/input-otp"), "inputOtp"),
  "navigation-menu": makeDemo(() => import("./ui/navigation-menu"), "navigationMenu"),
  "radio-group": makeDemo(() => import("./ui/radio-group"), "radioGroup"),
  "scroll-area": makeDemo(() => import("./ui/scroll-area"), "scrollArea"),
  "toggle-group": makeDemo(() => import("./ui/toggle-group"), "toggleGroup"),
};
