import * as React from "react"
import type { Editor } from "@tiptap/react"
import type { FormatAction } from "../../types"
import { toggleVariants } from "../ui-core/toggle"
import type { VariantProps } from "class-variance-authority"
import {
  CodeIcon,
  DotsHorizontalIcon,
  FontBoldIcon,
  FontItalicIcon,
  StrikethroughIcon,
  TextNoneIcon,
  UnderlineIcon,
} from "@radix-ui/react-icons"
import { ToolbarSection } from "./toolbar-section"

type TextStyleAction =
  | "bold"
  | "italic"
  | "underline"
  | "strikethrough"
  | "code"
  | "clearFormatting"

interface TextStyle extends FormatAction {
  value: TextStyleAction
}

const formatActions: TextStyle[] = [
  {
    value: "bold",
    label: "Bold",
    icon: <FontBoldIcon className="size-5" />,
    action: (editor: Editor) => (editor.chain().focus() as any).toggleBold().run(),
    isActive: (editor: Editor) => editor.isActive("bold"),
    canExecute: (editor: Editor) =>
      (editor.can().chain().focus() as any).toggleBold().run() &&
      !editor.isActive("codeBlock"),
    shortcuts: ["mod", "B"],
  },
  {
    value: "italic",
    label: "Italic",
    icon: <FontItalicIcon className="size-5" />,
    action: (editor: Editor) => (editor.chain().focus() as any).toggleItalic().run(),
    isActive: (editor: Editor) => editor.isActive("italic"),
    canExecute: (editor: Editor) =>
      (editor.can().chain().focus() as any).toggleItalic().run() &&
      !editor.isActive("codeBlock"),
    shortcuts: ["mod", "I"],
  },
  {
    value: "underline",
    label: "Underline",
    icon: <UnderlineIcon className="size-5" />,
    action: (editor: Editor) => (editor.chain().focus() as any).toggleUnderline().run(),
    isActive: (editor: Editor) => editor.isActive("underline"),
    canExecute: (editor: Editor) =>
      (editor.can().chain().focus() as any).toggleUnderline().run() &&
      !editor.isActive("codeBlock"),
    shortcuts: ["mod", "U"],
  },
  {
    value: "strikethrough",
    label: "Strikethrough",
    icon: <StrikethroughIcon className="size-5" />,
    action: (editor: Editor) => (editor.chain().focus() as any).toggleStrike().run(),
    isActive: (editor: Editor) => editor.isActive("strike"),
    canExecute: (editor: Editor) =>
      (editor.can().chain().focus() as any).toggleStrike().run() &&
      !editor.isActive("codeBlock"),
    shortcuts: ["mod", "shift", "S"],
  },
  {
    value: "code",
    label: "Code",
    icon: <CodeIcon className="size-5" />,
    action: (editor: Editor) => (editor.chain().focus() as any).toggleCode().run(),
    isActive: (editor: Editor) => editor.isActive("code"),
    canExecute: (editor: Editor) =>
      (editor.can().chain().focus() as any).toggleCode().run() &&
      !editor.isActive("codeBlock"),
    shortcuts: ["mod", "E"],
  },
  {
    value: "clearFormatting",
    label: "Clear formatting",
    icon: <TextNoneIcon className="size-5" />,
    action: (editor: Editor) => (editor.chain().focus() as any).unsetAllMarks().run(),
    isActive: () => false,
    canExecute: (editor: Editor) =>
      (editor.can().chain().focus() as any).unsetAllMarks().run() &&
      !editor.isActive("codeBlock"),
    shortcuts: ["mod", "\\"],
  },
]

interface SectionTwoProps extends VariantProps<typeof toggleVariants> {
  editor: Editor
  activeActions?: TextStyleAction[]
  mainActionCount?: number
}

export const SectionTwo: React.FC<SectionTwoProps> = ({
  editor,
  activeActions = formatActions.map((action) => action.value),
  mainActionCount = 2,
  size,
  variant,
}) => {
  return (
    <ToolbarSection
      editor={editor}
      actions={formatActions}
      activeActions={activeActions}
      mainActionCount={mainActionCount}
      dropdownIcon={<DotsHorizontalIcon className="size-5" />}
      dropdownTooltip="More formatting"
      dropdownClassName="w-8"
      size={size}
      variant={variant}
    />
  )
}

SectionTwo.displayName = "SectionTwo"

export default SectionTwo
