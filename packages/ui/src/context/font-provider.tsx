"use client";

import { type Font, fonts } from "@fonts";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { getCookie, removeCookie, setCookie } from "@/lib/cookies";

const FONT_COOKIE_NAME = "font";
const FONT_COOKIE_MAX_AGE = 60 * 60 * 24 * 365; // 1 year

type FontContextType = {
  font: Font;
  setFont: (font: Font) => void;
  resetFont: () => void;
};

const FontContext = createContext<FontContextType | null>(null);

export function FontProvider({ children }: { children: React.ReactNode }) {
  const [font, _setFont] = useState<Font>(() => {
    const savedFont = getCookie(FONT_COOKIE_NAME);
    return fonts.includes(savedFont as Font) ? (savedFont as Font) : fonts[0];
  });

  useEffect(() => {
    // Ensure this code runs only on the client
    if (typeof window === "undefined") return;

    const applyFont = (font: string) => {
      const root = document.documentElement;
      root.classList.forEach((cls) => {
        if (cls.startsWith("font-")) root.classList.remove(cls);
      });
      // Convert "Funnel Sans" -> "funnel-sans" to avoid invalid class characters
      const fontClass = font.replace(/\s+/g, "-").toLowerCase();
      root.classList.add(`font-${fontClass}`);
    };

    applyFont(font);
  }, [font]);

  // Optimized: Memoize the setFont function to prevent unnecessary re-renders of consumer components
  const setFont = useCallback((font: Font) => {
    setCookie(FONT_COOKIE_NAME, font, FONT_COOKIE_MAX_AGE);
    _setFont(font);
  }, []);

  // Optimized: Memoize the resetFont function to prevent unnecessary re-renders of consumer components
  const resetFont = useCallback(() => {
    removeCookie(FONT_COOKIE_NAME);
    _setFont(fonts[0]);
  }, []);

  // Optimized: Memoize the contextValue object to prevent unnecessary re-renders of all consumer components
  const contextValue = useMemo(
    () => ({ font, setFont, resetFont }),
    [font, setFont, resetFont],
  );

  return <FontContext value={contextValue}>{children}</FontContext>;
}

// eslint-disable-next-line react-refresh/only-export-components
export const useFont = () => {
  const context = useContext(FontContext);
  if (!context) {
    throw new Error("useFont must be used within a FontProvider");
  }
  return context;
};
