import type { Editor } from "@tiptap/react";

export interface FormatAction {
  value: string;
  label: string;
  icon: React.ReactNode;
  shortcuts: string[];
  isActive: (editor: Editor) => boolean;
  action: (editor: Editor) => void;
  canExecute: (editor: Editor) => boolean;
}
