import {
  CaretDownIcon,
  CodeIcon,
  DividerHorizontalIcon,
  PlusIcon,
  QuoteIcon,
} from "@radix-ui/react-icons";
import type { Editor } from "@tiptap/react";
import type { VariantProps } from "class-variance-authority";
import type * as React from "react";
import type { FormatAction } from "../../types";
import { ImageEditDialog } from "../image-blocks/image-edit-dialog";
import { LinkEditPopover } from "../links/link-edit-popover";
import type { toggleVariants } from "../ui-core/toggle";
import { ToolbarSection } from "./toolbar-section";

type InsertElementAction = "codeBlock" | "blockquote" | "horizontalRule";
interface InsertElement extends FormatAction {
  value: InsertElementAction;
}

const formatActions: InsertElement[] = [
  {
    value: "codeBlock",
    label: "Code block",
    icon: <CodeIcon className="size-5" />,
    action: (editor: Editor) =>
      (editor.chain().focus() as any).toggleCodeBlock().run(),
    isActive: (editor: Editor) => editor.isActive("codeBlock"),
    canExecute: (editor: Editor) =>
      (editor.can().chain().focus() as any).toggleCodeBlock().run(),
    shortcuts: ["mod", "alt", "C"],
  },
  {
    value: "blockquote",
    label: "Blockquote",
    icon: <QuoteIcon className="size-5" />,
    action: (editor: Editor) =>
      (editor.chain().focus() as any).toggleBlockquote().run(),
    isActive: (editor: Editor) => editor.isActive("blockquote"),
    canExecute: (editor: Editor) =>
      (editor.can().chain().focus() as any).toggleBlockquote().run(),
    shortcuts: ["mod", "shift", "B"],
  },
  {
    value: "horizontalRule",
    label: "Divider",
    icon: <DividerHorizontalIcon className="size-5" />,
    action: (editor: Editor) =>
      (editor.chain().focus() as any).setHorizontalRule().run(),
    isActive: () => false,
    canExecute: (editor: Editor) =>
      (editor.can().chain().focus() as any).setHorizontalRule().run(),
    shortcuts: ["mod", "alt", "-"],
  },
];

// ⚡ Bolt: Hoist static default action values array outside component scope to prevent allocating a new array on every render pass,
// ensuring stable prop references and restoring useMemo cache hits in ToolbarSection.
const DEFAULT_ACTIVE_ACTIONS: InsertElementAction[] = formatActions.map(
  (action) => action.value,
);

interface SectionFiveProps extends VariantProps<typeof toggleVariants> {
  editor: Editor;
  activeActions?: InsertElementAction[];
  mainActionCount?: number;
}

export const SectionFive: React.FC<SectionFiveProps> = ({
  editor,
  activeActions = DEFAULT_ACTIVE_ACTIONS,
  mainActionCount = 0,
  size,
  variant,
}) => {
  return (
    <>
      <LinkEditPopover editor={editor} size={size} variant={variant} />
      <ImageEditDialog editor={editor} size={size} variant={variant} />
      <ToolbarSection
        editor={editor}
        actions={formatActions}
        activeActions={activeActions}
        mainActionCount={mainActionCount}
        dropdownIcon={
          <>
            <PlusIcon className="size-5" />
            <CaretDownIcon className="size-5" />
          </>
        }
        dropdownTooltip="Insert elements"
        size={size}
        variant={variant}
      />
    </>
  );
};

SectionFive.displayName = "SectionFive";

export default SectionFive;
