import { CaretDownIcon } from "@radix-ui/react-icons";
import type { Editor } from "@tiptap/react";
import type { VariantProps } from "class-variance-authority";
import * as React from "react";
import { cn } from "@/lib/utils";
import type { FormatAction } from "../../types";
import { ToolbarButton } from "../buttons/toolbar-button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../dropdowns/dropdown-menu";
import type { toggleVariants } from "../ui-core/toggle";
import { getShortcutKey } from "../utils";
import { ShortcutKey } from "./shortcut-key";

interface ToolbarSectionProps extends VariantProps<typeof toggleVariants> {
  editor: Editor;
  actions: FormatAction[];
  activeActions?: string[];
  mainActionCount?: number;
  dropdownIcon?: React.ReactNode;
  dropdownTooltip?: string;
  dropdownClassName?: string;
}

export const ToolbarSection: React.FC<ToolbarSectionProps> = ({
  editor,
  actions,
  activeActions,
  mainActionCount = 0,
  dropdownIcon,
  dropdownTooltip = "More options",
  dropdownClassName = "w-12",
  size,
  variant,
}) => {
  const { mainActions, dropdownActions } = React.useMemo(() => {
    // ⚡ Bolt: If activeActions is undefined, fallback to mapping actions.value inside useMemo to avoid array allocation on every render pass.
    const effectiveActiveActions =
      activeActions ?? actions.map((action) => action.value);
    // Build a Set for O(1) filter membership checks and a Map for O(1) sort index lookups.
    const activeSet = new Set(effectiveActiveActions);
    const orderMap = new Map<string, number>();
    for (let i = 0; i < effectiveActiveActions.length; i++) {
      orderMap.set(effectiveActiveActions[i], i);
    }

    const sortedActions = actions
      .filter((action) => activeSet.has(action.value))
      .sort(
        (a, b) =>
          (orderMap.get(a.value) ?? Number.POSITIVE_INFINITY) -
          (orderMap.get(b.value) ?? Number.POSITIVE_INFINITY),
      );

    return {
      mainActions: sortedActions.slice(0, mainActionCount),
      dropdownActions: sortedActions.slice(mainActionCount),
    };
  }, [actions, activeActions, mainActionCount]);

  const renderToolbarButton = React.useCallback(
    (action: FormatAction) => (
      <ToolbarButton
        key={action.label}
        onClick={() => action.action(editor)}
        disabled={!action.canExecute(editor)}
        isActive={action.isActive(editor)}
        tooltip={`${action.label} ${action.shortcuts.map((s: string) => getShortcutKey(s).symbol).join(" ")}`}
        aria-label={action.label}
        size={size}
        variant={variant}
      >
        {action.icon}
      </ToolbarButton>
    ),
    [editor, size, variant],
  );

  const renderDropdownMenuItem = React.useCallback(
    (action: FormatAction) => (
      <DropdownMenuItem
        key={action.label}
        onClick={() => action.action(editor)}
        disabled={!action.canExecute(editor)}
        className={cn("flex flex-row items-center justify-between gap-4", {
          "bg-accent": action.isActive(editor),
        })}
        aria-label={action.label}
      >
        <span className="grow">{action.label}</span>
        <ShortcutKey keys={action.shortcuts} />
      </DropdownMenuItem>
    ),
    [editor],
  );

  const isDropdownActive = dropdownActions.some((action) =>
    action.isActive(editor),
  );

  return (
    <>
      {mainActions.map(renderToolbarButton)}
      {dropdownActions.length > 0 && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <ToolbarButton
              isActive={isDropdownActive}
              tooltip={dropdownTooltip}
              aria-label={dropdownTooltip}
              className={cn("gap-0", dropdownClassName)}
              size={size}
              variant={variant}
            >
              {dropdownIcon || <CaretDownIcon className="size-5" />}
            </ToolbarButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-full">
            {dropdownActions.map(renderDropdownMenuItem)}
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </>
  );
};

export default ToolbarSection;
