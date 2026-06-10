import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getPageNumbers(
  currentPage: number,
  totalPages: number,
): Array<number | "..."> {
  if (totalPages <= 0) {
    return [];
  }

  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  if (currentPage <= 4) {
    return [1, 2, 3, 4, 5, "...", totalPages];
  }

  if (currentPage >= totalPages - 3) {
    return [
      1,
      "...",
      totalPages - 4,
      totalPages - 3,
      totalPages - 2,
      totalPages - 1,
      totalPages,
    ];
  }

  return [
    1,
    "...",
    currentPage - 1,
    currentPage,
    currentPage + 1,
    "...",
    totalPages,
  ];
}

export function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function getPrompt() {
  return "Use this registry item as a production-ready starting point. Preserve the component structure, styling tokens, and accessibility behavior.";
}

const escapeMap: Record<string, string> = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;",
};

export function escapeHtml(unsafe: unknown): string {
  if (typeof unsafe !== "string") return "";

  // Avoid double-encoding existing entities while still escaping unsafe HTML.
  return unsafe.replace(
    /&(?!#?[a-zA-Z0-9]+;)|[<>"']/g,
    (match) => escapeMap[match] ?? match,
  );
}
