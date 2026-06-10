"use client";

// React Imports
import { useState } from "react";

// Util Imports
import { toast } from "@/utils/toast";

export const useCopy = (duration = 1500, toastMessage?: string) => {
  // States
  const [copied, setCopied] = useState<boolean>(false);

  const copy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), duration);
      if (toastMessage) {
        toast("success", `${toastMessage} copied to clipboard`, {
          position: "top-right",
        });
      }

      return true;
    } catch (err) {
      console.error(`${toastMessage} failed to copy to clipboard`, err);
      if (toastMessage) {
        toast("error", `${toastMessage} failed to copy to clipboard`, {
          position: "top-right",
        });
      }

      return false;
    }
  };

  return { copied, copy };
};
