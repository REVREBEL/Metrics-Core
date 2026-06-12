# Tabler Icon Inventory & Consistency Guide

This document provides a centralized inventory of all Tabler Icons currently used within the `REBEL-APP` repository. It establishes clear visual and conceptual consistency guidelines to prevent duplicate, mismatched, or stylistically inconsistent icons from being introduced.

---

## 1. Summary

- **Total Unique Tabler Icons Used**: 111
- **Total Files Using Tabler Icons**: 68
- **Most Common Icons**:
  - `IconPlus`: 12 files
  - `IconSearch`: 10 files
  - `IconInfoCircle`: 9 files
  - `IconChevronDown`: 8 files
  - `IconChevronRIght`: 1 file
  - `IconAlertCircle`: 6 files
  - `IconCircleCheck`: 6 files
  - `IconTrash`: 6 files
  - `IconCheck`: 6 files
  - `IconCopy`: 6 files
  - `IconArrowRight`: 5 files
  - `IconClock`: 5 files
- **Potential Duplicates / Near-Equivalents**:
  - `IconPlus` vs `IconSquareRoundedPlusFilled` for create/add actions.
  - `IconCopy` vs `IconCopyFilled` for copy to clipboard actions.
  - `IconCheck` vs `IconCircleCheck` vs `IconCircleCheckFilled` vs `IconSquareRoundedCheckFilled` for success/completion.
  - `IconX` vs `IconCircleX` vs `IconSquareRoundedXFilled` for cancellation/failure.
  - `IconChevronDown` vs `IconSquareRoundedChevronDownFilled` for disclosure.

---

## 2. Icon Consistency Rules

To maintain high visual quality, follow these standard icon mappings for common user actions and categories. Only deviate from these rules if a distinct stylistic context is justified.

### Search
- **Standard**: `IconSearch`
- **Context**: Search inputs, search buttons, search filters.
- **Do Not Use**: Generic lookup or scan icons.

### Add / Create
- **Standard**: `IconPlus`
- **Context**: Buttons or links that trigger the creation of new entities (e.g. Add Task, Create Workspace).
- **Exceptions**: Use `IconSquareRoundedPlusFilled` only when matching other highly rounded, filled theme items in specialized cards.

### Edit
- **Standard**: `IconEdit` or `IconPencil` (Note: No standard edit icon is currently imported; recommend introducing these when edit states are needed).
- **Context**: Modifying or updating existing items.

### Delete / Remove
- **Standard**: `IconTrash`
- **Context**: Destructive delete actions, list item removal.
- **Exceptions**: Use `IconX` or `IconCircleX` for closing drawers/modals, or cancelling in-progress actions.

### Settings / Config
- **Standard**: `IconUserCog` or `IconSettings` (when introduced).
- **Context**: User configuration, workspaces settings, layout controls.

### User / Profile
- **Standard**: `IconUser`
- **Context**: Owner assignments, member sidebars, account page actions.

### External Link
- **Standard**: `IconExternalLink`
- **Context**: Inbound cards or metadata linking to third-party integrations or new browser windows.

### Chevron / Disclosure
- **Standard**: `IconChevronDown` (and matching directionals `IconChevronUp`, `IconChevronLeft`, `IconChevronRight`).
- **Context**: Dropdowns, accordions, back navigation.
- **Exception**: Use `IconSelector` exclusively inside Combobox selection components.

### Calendar / Date
- **Standard**: `IconCalendar`
- **Context**: Choosing dates, scheduling tasks, timeline logs.

### Alert / Error / Warning
- **Standard**: `IconAlertCircle` (Errors/Critical warnings), `IconAlertTriangle` (Warnings/Alert states).
- **Context**: Empty states, error messages, banner dialogs.

---

## 3. Duplicate / Inconsistent Icon Findings

We have audited the repository and identified several semantic overlaps where multiple variations of the same icon concepts are active. Below are our assessments and standardization recommendations:

### A. Create / Add Actions (`IconPlus` vs `IconSquareRoundedPlusFilled`)
- **Finding**: Standard `IconPlus` is used 12 times across primitives and dashboard page headers. However, `IconSquareRoundedPlusFilled` is imported in `button-group-dropdown.tsx`.
- **Recommendation**: Standardize on `IconPlus` for all text buttons or inline actions. Reserve the rounded filled variants (`IconSquareRoundedPlusFilled`) exclusively for dark-mode loaded, thick-bordered grid badges or when all icons in the component use the "SquareRounded" block theme.

### B. Clipboard Actions (`IconCopy` vs `IconCopyFilled`)
- **Finding**: `IconCopy` is used consistently across inputs (6 files) for copy-to-clipboard functionality. `IconCopyFilled` is used in button groups.
- **Recommendation**: Standardize on outline `IconCopy` for all user-interactive clipboard buttons to maintain a clean, lightweight look.

### C. Checkmark / Completion states (`IconCheck` vs `IconCircleCheck` vs `IconSquareRoundedCheckFilled`)
- **Finding**: Multiple checked styles are used: simple check (`IconCheck`) inside custom selectors/buttons, circled check (`IconCircleCheck`) for dashboard lists/states, and filled check (`IconSquareRoundedCheckFilled`) for dropdown item checkmarks.
- **Recommendation**:
  - Use `IconCheck` for selection/activation indicators in menus and selects.
  - Use `IconCircleCheck` for read-only success/completed entity list states.
  - Use `IconSquareRoundedCheckFilled` only for visually active "copied" states or highly badge-like cards.

### D. Navigation / Directionals (`IconArrowRight` vs `IconSquareRoundedArrowLeftFilled`)
- **Finding**: Back buttons use `IconSquareRoundedArrowLeftFilled`, while forwards/next buttons use regular `IconArrowRight`.
- **Recommendation**: If regular directional arrows (`IconArrowRight`) are used, back navigation should use regular `IconArrowLeft` to maintain balance. Avoid mixing filled rounded styles with plain outline arrow styles in the same feature flow.

---

## 4. Icon Inventory Table

| Icon Name | Import Source | Files Used In | Component / Feature Area | Usage Context | Recommended Status | Notes |
|---|---|---|---|---|---|---|
| **IconAlertCircle** | `@tabler/icons-react` | `packages/ui/src/components/metrics-layouts/tasks/calendar-view_page.tsx`<br>`packages/ui/src/components/metrics-layouts/tasks/data/data.tsx`<br>`packages/ui/src/components/metrics-layouts/tasks/group-views.tsx`<br>`packages/ui/src/components/metrics-layouts/tasks/growth-plan_states.tsx`<br>`packages/ui/src/components/metrics-layouts/tasks/meeting-recap_page.tsx`<br>`packages/ui/src/primitives/inputs/input-group-with-tooltip.tsx` | Tasks Dashboard, Inputs Primitive | Icon representation | **Keep** | Standard icon usage. |
| **IconAlertSquareRoundedFilled** | `@tabler/icons-react` | `packages/ui/src/primitives/buttons/button-group-dropdown.tsx` | Buttons Primitive | Icon representation | **Keep** | Standard icon usage. |
| **IconAlertTriangle** | `@tabler/icons-react` | `packages/ui/src/components/metrics-layouts/tasks/data/data.tsx`<br>`packages/ui/src/components/metrics-layouts/tasks/kanban_page.tsx`<br>`packages/ui/src/components/metrics-layouts/tasks/owner-rollup_page.tsx` | Tasks Dashboard | Icon representation | **Keep** | Standard icon usage. |
| **IconArchive** | `@tabler/icons-react` | `apps/registry/app/(registry)/catalog/catalog-view.tsx`<br>`packages/ui/src/components/metrics-layouts/tasks/data/data.tsx` | Registry App, Tasks Dashboard | Icon representation | **Keep** | Standard icon usage. |
| **IconArrowDown** | `@tabler/icons-react` | `packages/ui/src/components/metrics-layouts/tasks/data/data.ts`<br>`packages/ui/src/components/metrics-layouts/tasks/data/data.tsx` | Tasks Dashboard | Icon representation | **Keep** | Standard icon usage. |
| **IconArrowRight** | `@tabler/icons-react` | `apps/registry/app/(registry)/catalog/catalog-view.tsx`<br>`apps/registry/app/(registry)/page.tsx`<br>`packages/ui/src/components/metrics-layouts/tasks/data/data.ts`<br>`packages/ui/src/components/metrics-layouts/tasks/data/data.tsx`<br>`packages/ui/src/components/metrics-layouts/tasks/meeting-recap_page.tsx` | Registry App, Tasks Dashboard | Icon representation | **Keep** | Standard icon usage. |
| **IconArrowsUpDown** | `@tabler/icons-react` | `packages/ui/src/components/metrics-layouts/tasks/data-bulk-actions_table.tsx` | Tasks Dashboard | Icon representation | **Keep** | Standard icon usage. |
| **IconArrowUp** | `@tabler/icons-react` | `packages/ui/src/components/metrics-layouts/tasks/data/data.ts`<br>`packages/ui/src/components/metrics-layouts/tasks/data/data.tsx`<br>`packages/ui/src/primitives/inputs/input-group-textarea-examples.tsx` | Tasks Dashboard, Inputs Primitive | Icon representation | **Keep** | Standard icon usage. |
| **IconAwardFilled** | `@tabler/icons-react` | `apps/registry/app/(registry)/page.tsx` | Registry App | Icon representation | **Keep** | Standard icon usage. |
| **IconBan** | `@tabler/icons-react` | `packages/ui/src/components/metrics-layouts/tasks/data/data.tsx` | Tasks Dashboard | Icon representation | **Keep** | Standard icon usage. |
| **IconBell** | `@tabler/icons-react` | `packages/ui/src/components/metrics-layouts/settings/settings_layout.tsx`<br>`packages/ui/src/primitives/lists/list-item.tsx` | Settings Layout, Lists Primitive | Icon representation | **Keep** | Standard icon usage. |
| **IconBellXFilled** | `@tabler/icons-react` | `packages/ui/src/primitives/buttons/button-group-dropdown.tsx` | Buttons Primitive | Icon representation | **Keep** | Standard icon usage. |
| **IconBinaryTree2** | `@tabler/icons-react` | `apps/registry/components/registry-sidebar.tsx` | Registry App | Icon representation | **Keep** | Standard icon usage. |
| **IconBinaryTree2Filled** | `@tabler/icons-react` | `apps/registry/app/(registry)/page.tsx` | Registry App | Icon representation | **Keep** | Standard icon usage. |
| **IconBoltFilled** | `@tabler/icons-react` | `packages/ui/src/primitives/buttons/button-group-popover.tsx` | Buttons Primitive | Icon representation | **Keep** | Standard icon usage. |
| **IconBooks** | `@tabler/icons-react` | `apps/registry/components/registry-sidebar.tsx` | Registry App | Icon representation | **Keep** | Standard icon usage. |
| **IconBrandJavascript** | `@tabler/icons-react` | `packages/ui/src/primitives/inputs/input-group-textarea.tsx` | Inputs Primitive | Icon representation | **Keep** | Standard icon usage. |
| **IconBuilding** | `@tabler/icons-react` | `packages/ui/src/components/metrics-layouts/tasks/group-views.tsx`<br>`packages/ui/src/components/metrics-layouts/tasks/growth-plan_states.tsx` | Tasks Dashboard | Icon representation | **Keep** | Standard icon usage. |
| **IconCalendar** | `@tabler/icons-react` | `packages/ui/src/components/metrics-layouts/tasks/calendar-view_page.tsx`<br>`packages/ui/src/components/metrics-layouts/tasks/growth-plan_header.tsx`<br>`packages/ui/src/components/metrics-layouts/tasks/growth-plan_states.tsx`<br>`packages/ui/src/components/metrics-layouts/tasks/meeting-recap_page.tsx` | Tasks Dashboard | Date selector / Calendar views | **Keep** | Standard icon usage. |
| **IconCalendarCheck** | `@tabler/icons-react` | `packages/ui/src/primitives/lists/list-item.tsx` | Lists Primitive | Icon representation | **Keep** | Standard icon usage. |
| **IconCalendarEvent** | `@tabler/icons-react` | `packages/ui/src/primitives/lists/list-item.tsx` | Lists Primitive | Icon representation | **Keep** | Standard icon usage. |
| **IconChartBar** | `@tabler/icons-react` | `packages/ui/src/lib/registry.visual-previews.tsx` | General UI | Icon representation | **Keep** | Standard icon usage. |
| **IconCheck** | `@tabler/icons-react` | `packages/ui/src/primitives/buttons/status-button.tsx`<br>`packages/ui/src/primitives/inputs/input-group-button.tsx`<br>`packages/ui/src/primitives/inputs/input-group-icon.tsx`<br>`packages/ui/src/primitives/inputs/input-group-with-kbd.tsx`<br>`packages/ui/src/primitives/lists/list-item.tsx`<br>`packages/ui/src/primitives/ui-core/select.tsx` | Buttons Primitive, Inputs Primitive, Lists Primitive, UI Core Primitive | Completed/successful action status | **Keep** | Standard icon usage. |
| **IconChevronDown** | `@tabler/icons-react` | `apps/registry/app/(registry)/catalog/catalog-view.tsx`<br>`apps/registry/components/registry-sidebar.tsx`<br>`packages/ui/src/components/metrics-layouts/tasks/group-views.tsx`<br>`packages/ui/src/components/metrics-layouts/tasks/growth-plan_sidebar.tsx`<br>`packages/ui/src/components/metrics-layouts/tasks/tasks-mutate_drawer.tsx`<br>`packages/ui/src/primitives/inputs/input-group-dropdown.tsx`<br>`packages/ui/src/primitives/inputs/input-group-with-tooltip.tsx`<br>`packages/ui/src/primitives/ui-core/select.tsx` | Registry App, Tasks Dashboard, Inputs Primitive, UI Core Primitive | Collapsible/disclosure state indicator | **Keep** | Standard icon usage. |
| **IconChevronLeft** | `@tabler/icons-react` | `packages/ui/src/components/metrics-layouts/tasks/calendar-view_page.tsx` | Tasks Dashboard | Icon representation | **Keep** | Standard icon usage. |
| **IconChevronRight** | `@tabler/icons-react` | `apps/registry/components/registry-sidebar.tsx`<br>`packages/ui/src/components/metrics-layouts/tasks/calendar-view_page.tsx`<br>`packages/ui/src/primitives/buttons/button-group-select.tsx` | Registry App, Tasks Dashboard, Buttons Primitive | Icon representation | **Keep** | Standard icon usage. |
| **IconChevronUp** | `@tabler/icons-react` | `packages/ui/src/primitives/ui-core/select.tsx` | UI Core Primitive | Collapsible/disclosure state indicator | **Keep** | Standard icon usage. |
| **IconCircle** | `@tabler/icons-react` | `packages/ui/src/components/metrics-layouts/tasks/data/data.ts`<br>`packages/ui/src/components/metrics-layouts/tasks/data/data.tsx` | Tasks Dashboard | Icon representation | **Keep** | Standard icon usage. |
| **IconCircleArrowUp** | `@tabler/icons-react` | `packages/ui/src/components/metrics-layouts/tasks/data-bulk-actions_table.tsx` | Tasks Dashboard | Icon representation | **Keep** | Standard icon usage. |
| **IconCircleCheck** | `@tabler/icons-react` | `packages/ui/src/components/metrics-layouts/tasks/calendar-view_page.tsx`<br>`packages/ui/src/components/metrics-layouts/tasks/data/data.ts`<br>`packages/ui/src/components/metrics-layouts/tasks/data/data.tsx`<br>`packages/ui/src/components/metrics-layouts/tasks/group-views.tsx`<br>`packages/ui/src/components/metrics-layouts/tasks/meeting-recap_page.tsx`<br>`packages/ui/src/components/metrics-layouts/tasks/owner-rollup_page.tsx` | Tasks Dashboard | Completed/successful action status | **Keep** | Standard icon usage. |
| **IconCircleCheckFilled** | `@tabler/icons-react` | `apps/docs/src/components/code-group/dropdown.tsx` | Docs App | Icon representation | **Keep (Special)** | Used for visually loaded indicators / status badges. |
| **IconCircleFadingArrowUp** | `@tabler/icons-react` | `packages/ui/src/primitives/buttons/button-icon.tsx` | Buttons Primitive | Icon representation | **Keep** | Standard icon usage. |
| **IconCircleOff** | `@tabler/icons-react` | `packages/ui/src/components/metrics-layouts/tasks/data/data.tsx` | Tasks Dashboard | Icon representation | **Keep** | Standard icon usage. |
| **IconCircleX** | `@tabler/icons-react` | `packages/ui/src/components/metrics-layouts/tasks/data/data.ts` | Tasks Dashboard | Icon representation | **Keep** | Standard icon usage. |
| **IconClock** | `@tabler/icons-react` | `packages/ui/src/components/metrics-layouts/tasks/calendar-view_page.tsx`<br>`packages/ui/src/components/metrics-layouts/tasks/data/data.tsx`<br>`packages/ui/src/components/metrics-layouts/tasks/group-views.tsx`<br>`packages/ui/src/components/metrics-layouts/tasks/owner-rollup_page.tsx`<br>`packages/ui/src/components/metrics-layouts/tasks/workstreams_section.tsx` | Tasks Dashboard | Time tracking / durations / logs | **Keep** | Standard icon usage. |
| **IconClockHour1Filled** | `@tabler/icons-react` | `packages/ui/src/components/metrics-layouts/tasks/data/data.ts` | Tasks Dashboard | Icon representation | **Keep** | Standard icon usage. |
| **IconCode** | `@tabler/icons-react` | `packages/ui/src/primitives/inputs/input-group-textarea-examples.tsx` | Inputs Primitive | Icon representation | **Keep** | Standard icon usage. |
| **IconConfetti** | `@tabler/icons-react` | `packages/ui/src/primitives/lists/list-item.tsx` | Lists Primitive | Icon representation | **Keep** | Standard icon usage. |
| **IconCopy** | `@tabler/icons-react` | `packages/ui/src/primitives/inputs/input-group-block-start.tsx`<br>`packages/ui/src/primitives/inputs/input-group-button.tsx`<br>`packages/ui/src/primitives/inputs/input-group-textarea-examples.tsx`<br>`packages/ui/src/primitives/inputs/input-group-textarea.tsx`<br>`packages/ui/src/primitives/inputs/input-group-with-addons.tsx`<br>`packages/ui/src/primitives/inputs/input-group-with-buttons.tsx` | Inputs Primitive | Copy details to clipboard | **Keep** | Preferred outline copy icon. |
| **IconCopyFilled** | `@tabler/icons-react` | `packages/ui/src/primitives/buttons/button-group-dropdown.tsx`<br>`packages/ui/src/ui-registry/component-card.tsx` | Buttons Primitive, General UI | Copy details to clipboard | **Deprecate** | Prefer outline `IconCopy` for interactive state actions to match standard style. |
| **IconCornerDownLeft** | `@tabler/icons-react` | `packages/ui/src/primitives/inputs/input-group-textarea.tsx` | Inputs Primitive | Icon representation | **Keep** | Standard icon usage. |
| **IconCreditCard** | `@tabler/icons-react` | `packages/ui/src/primitives/inputs/input-group-icon.tsx` | Inputs Primitive | Icon representation | **Keep** | Standard icon usage. |
| **IconDatabase** | `@tabler/icons-react` | `packages/ui/src/lib/registry.visual-previews.tsx` | General UI | Icon representation | **Keep** | Standard icon usage. |
| **IconDeviceDesktop** | `@tabler/icons-react` | `packages/ui/src/components/metrics-layouts/settings/settings_layout.tsx`<br>`packages/ui/src/components/metrics-layouts/tasks/growth-plan_sidebar.tsx` | Settings Layout, Tasks Dashboard | Icon representation | **Keep** | Standard icon usage. |
| **IconDeviceGamepad2Filled** | `@tabler/icons-react` | `apps/registry/app/(registry)/page.tsx` | Registry App | Icon representation | **Keep** | Standard icon usage. |
| **IconDots** | `@tabler/icons-react` | `apps/registry/app/(registry)/catalog/catalog-view.tsx`<br>`packages/ui/src/primitives/inputs/input-group-dropdown.tsx` | Registry App, Inputs Primitive | Icon representation | **Keep** | Standard icon usage. |
| **IconDotsVertical** | `@tabler/icons-react` | `packages/ui/src/components/metrics-layouts/tasks/growth-plan_sidebar.tsx`<br>`packages/ui/src/components/metrics-layouts/tasks/kanban_page.tsx`<br>`packages/ui/src/components/metrics-layouts/tasks/tasks_table.tsx` | Tasks Dashboard | Icon representation | **Keep** | Standard icon usage. |
| **IconDownload** | `@tabler/icons-react` | `packages/ui/src/components/metrics-layouts/tasks/data-bulk-actions_table.tsx`<br>`packages/ui/src/components/metrics-layouts/tasks/tasks_table.tsx` | Tasks Dashboard | Icon representation | **Keep** | Standard icon usage. |
| **IconExternalLink** | `@tabler/icons-react` | `packages/ui/src/primitives/inputs/input-group-in-card.tsx` | Inputs Primitive | Icon representation | **Keep** | Standard icon usage. |
| **IconEye** | `@tabler/icons-react` | `packages/ui/src/components/metrics-layouts/tasks/kanban_page.tsx` | Tasks Dashboard | Icon representation | **Keep** | Standard icon usage. |
| **IconEyeOff** | `@tabler/icons-react` | `packages/ui/src/primitives/inputs/input-group-inline-end.tsx`<br>`packages/ui/src/primitives/inputs/input-group-with-addons.tsx` | Inputs Primitive | Icon representation | **Keep** | Standard icon usage. |
| **IconFidgetSpinnerFilled** | `@tabler/icons-react` | `packages/ui/src/primitives/ui-core/spinner.tsx` | UI Core Primitive | Icon representation | **Keep** | Standard icon usage. |
| **IconFileCode** | `@tabler/icons-react` | `packages/ui/src/primitives/inputs/input-group-block-start.tsx` | Inputs Primitive | Icon representation | **Keep** | Standard icon usage. |
| **IconFileText** | `@tabler/icons-react` | `packages/ui/src/components/metrics-layouts/tasks/growth-plan_states.tsx`<br>`packages/ui/src/components/metrics-layouts/tasks/meeting-recap_page.tsx` | Tasks Dashboard | Icon representation | **Keep** | Standard icon usage. |
| **IconFilter** | `@tabler/icons-react` | `packages/ui/src/primitives/lists/list-item.tsx` | Lists Primitive | Icon representation | **Keep** | Standard icon usage. |
| **IconFlame** | `@tabler/icons-react` | `packages/ui/src/primitives/buttons/discover-button.tsx` | Buttons Primitive | Icon representation | **Keep** | Standard icon usage. |
| **IconFolder** | `@tabler/icons-react` | `apps/registry/components/registry-sidebar.tsx` | Registry App | Icon representation | **Keep** | Standard icon usage. |
| **IconGitBranch** | `@tabler/icons-react` | `packages/ui/src/primitives/buttons/button-with-icon.tsx` | Buttons Primitive | Icon representation | **Keep** | Standard icon usage. |
| **IconGitFork** | `@tabler/icons-react` | `packages/ui/src/primitives/buttons/button-with-icon.tsx` | Buttons Primitive | Icon representation | **Keep** | Standard icon usage. |
| **IconGripVertical** | `@tabler/icons-react` | `packages/ui/src/components/metrics-layouts/tasks/kanban_page.tsx` | Tasks Dashboard | Icon representation | **Keep** | Standard icon usage. |
| **IconHeart** | `@tabler/icons-react` | `packages/ui/src/primitives/buttons/discover-button.tsx` | Buttons Primitive | Icon representation | **Keep** | Standard icon usage. |
| **IconHelpCircle** | `@tabler/icons-react` | `packages/ui/src/primitives/inputs/input-group-tooltip.tsx` | Inputs Primitive | Icon representation | **Keep** | Standard icon usage. |
| **IconHelpCircleFilled** | `@tabler/icons-react` | `packages/ui/src/components/metrics-layouts/tasks/data/data.ts` | Tasks Dashboard | Icon representation | **Keep** | Standard icon usage. |
| **IconHierarchy3** | `@tabler/icons-react` | `apps/registry/app/(registry)/page.tsx` | Registry App | Icon representation | **Keep** | Standard icon usage. |
| **IconHome2** | `@tabler/icons-react` | `apps/registry/components/registry-sidebar.tsx` | Registry App | Icon representation | **Keep** | Standard icon usage. |
| **IconInfoCircle** | `@tabler/icons-react` | `packages/ui/src/primitives/inputs/input-group-button.tsx`<br>`packages/ui/src/primitives/inputs/input-group-icon.tsx`<br>`packages/ui/src/primitives/inputs/input-group-label.tsx`<br>`packages/ui/src/primitives/inputs/input-group-textarea-examples.tsx`<br>`packages/ui/src/primitives/inputs/input-group-tooltip.tsx`<br>`packages/ui/src/primitives/inputs/input-group-with-addons.tsx`<br>`packages/ui/src/primitives/inputs/input-group-with-kbd.tsx`<br>`packages/ui/src/primitives/inputs/input-group-with-tooltip.tsx`<br>`packages/ui/src/primitives/inputs/input-input-group.tsx` | Inputs Primitive | Contextual tooltips/help popovers | **Keep** | Standard icon usage. |
| **IconLayoutDashboard** | `@tabler/icons-react` | `packages/ui/src/lib/registry.visual-previews.tsx` | General UI | Icon representation | **Keep** | Standard icon usage. |
| **IconLayoutGrid** | `@tabler/icons-react` | `apps/registry/app/(registry)/catalog/catalog-view.tsx`<br>`packages/ui/src/components/metrics-layouts/tasks/growth-plan_states.tsx`<br>`packages/ui/src/lib/registry.visual-previews.tsx` | Registry App, Tasks Dashboard, General UI | Icon representation | **Keep** | Standard icon usage. |
| **IconLayoutKanban** | `@tabler/icons-react` | `packages/ui/src/components/metrics-layouts/tasks/growth-plan_header.tsx` | Tasks Dashboard | Icon representation | **Keep** | Standard icon usage. |
| **IconLayoutSidebarLeftExpandFilled** | `@tabler/icons-react` | `packages/ui/src/components/metrics-layouts/tasks/tasks_layout.tsx` | Tasks Dashboard | Icon representation | **Keep** | Standard icon usage. |
| **IconLink** | `@tabler/icons-react` | `packages/ui/src/components/metrics-layouts/tasks/kanban_page.tsx`<br>`packages/ui/src/primitives/inputs/input-group-button-group.tsx` | Tasks Dashboard, Inputs Primitive | Icon representation | **Keep** | Standard icon usage. |
| **IconList** | `@tabler/icons-react` | `packages/ui/src/components/metrics-layouts/tasks/growth-plan_states.tsx` | Tasks Dashboard | Icon representation | **Keep** | Standard icon usage. |
| **IconListCheck** | `@tabler/icons-react` | `packages/ui/src/components/metrics-layouts/tasks/kanban_page.tsx` | Tasks Dashboard | Icon representation | **Keep** | Standard icon usage. |
| **IconListDetails** | `@tabler/icons-react` | `apps/registry/app/(registry)/catalog/catalog-view.tsx` | Registry App | Icon representation | **Keep** | Standard icon usage. |
| **IconLoader** | `@tabler/icons-react` | `packages/ui/src/primitives/inputs/input-group-spinner.tsx` | Inputs Primitive | Icon representation | **Keep** | Standard icon usage. |
| **IconLoader2** | `@tabler/icons-react` | `packages/ui/src/components/metrics-layouts/tasks/growth-plan_states.tsx` | Tasks Dashboard | Icon representation | **Keep** | Standard icon usage. |
| **IconMail** | `@tabler/icons-react` | `packages/ui/src/primitives/inputs/input-group-icon.tsx`<br>`packages/ui/src/primitives/inputs/input-group-in-card.tsx` | Inputs Primitive | Icon representation | **Keep** | Standard icon usage. |
| **IconMapPin** | `@tabler/icons-react` | `packages/ui/src/primitives/lists/list-item.tsx` | Lists Primitive | Icon representation | **Keep** | Standard icon usage. |
| **IconMessage** | `@tabler/icons-react` | `packages/ui/src/components/metrics-layouts/tasks/kanban_page.tsx` | Tasks Dashboard | Icon representation | **Keep** | Standard icon usage. |
| **IconMessageCircle** | `@tabler/icons-react` | `packages/ui/src/components/metrics-layouts/tasks/data/data.tsx` | Tasks Dashboard | Icon representation | **Keep** | Standard icon usage. |
| **IconMicrophone** | `@tabler/icons-react` | `packages/ui/src/primitives/inputs/input-group-with-addons.tsx` | Inputs Primitive | Icon representation | **Keep** | Standard icon usage. |
| **IconMinus** | `@tabler/icons-react` | `packages/ui/src/primitives/buttons/button-group-orientation.tsx` | Buttons Primitive | Icon representation | **Keep** | Standard icon usage. |
| **IconPalette** | `@tabler/icons-react` | `packages/ui/src/components/metrics-layouts/settings/settings_layout.tsx` | Settings Layout | Icon representation | **Keep** | Standard icon usage. |
| **IconPlus** | `@tabler/icons-react` | `apps/registry/app/(registry)/catalog/catalog-view.tsx`<br>`packages/ui/src/components/metrics-layouts/tasks/growth-plan_header.tsx`<br>`packages/ui/src/components/metrics-layouts/tasks/growth-plan_sidebar.tsx`<br>`packages/ui/src/components/metrics-layouts/tasks/growth-plan_states.tsx`<br>`packages/ui/src/components/metrics-layouts/tasks/kanban_page.tsx`<br>`packages/ui/src/components/metrics-layouts/tasks/meeting-recap_page.tsx`<br>`packages/ui/src/components/metrics-layouts/tasks/tasks-mutate_drawer.tsx`<br>`packages/ui/src/primitives/buttons/button-group-input-group.tsx`<br>`packages/ui/src/primitives/buttons/button-group-nested.tsx`<br>`packages/ui/src/primitives/buttons/button-group-orientation.tsx`<br>`packages/ui/src/primitives/buttons/button-group-size.tsx`<br>`packages/ui/src/primitives/buttons/button-group-split.tsx` | Registry App, Tasks Dashboard, Buttons Primitive | Add/create new item actions | **Keep** | Primary action icon for creating or adding elements. |
| **IconPresentation** | `@tabler/icons-react` | `packages/ui/src/components/metrics-layouts/tasks/growth-plan_states.tsx` | Tasks Dashboard | Icon representation | **Keep** | Standard icon usage. |
| **IconPuzzleFilled** | `@tabler/icons-react` | `apps/registry/app/(registry)/page.tsx` | Registry App | Icon representation | **Keep** | Standard icon usage. |
| **IconRadio** | `@tabler/icons-react` | `packages/ui/src/primitives/inputs/input-group-with-addons.tsx` | Inputs Primitive | Icon representation | **Keep** | Standard icon usage. |
| **IconRefresh** | `@tabler/icons-react` | `packages/ui/src/primitives/inputs/input-group-textarea-examples.tsx`<br>`packages/ui/src/primitives/inputs/input-group-textarea.tsx`<br>`packages/ui/src/primitives/inputs/input-otp-form.tsx` | Inputs Primitive | Icon representation | **Keep** | Standard icon usage. |
| **IconSearch** | `@tabler/icons-react` | `apps/registry/app/(registry)/catalog/catalog-view.tsx`<br>`apps/registry/components/registry-sidebar.tsx`<br>`packages/ui/src/components/metrics-layouts/tasks/growth-plan_sidebar.tsx`<br>`packages/ui/src/primitives/buttons/button-group-input.tsx`<br>`packages/ui/src/primitives/buttons/discover-button.tsx`<br>`packages/ui/src/primitives/inputs/input-group-icon.tsx`<br>`packages/ui/src/primitives/inputs/input-group-inline-start.tsx`<br>`packages/ui/src/primitives/inputs/input-group-kbd.tsx`<br>`packages/ui/src/primitives/inputs/input-group-with-addons.tsx`<br>`packages/ui/src/primitives/inputs/input-group-with-kbd.tsx` | Registry App, Tasks Dashboard, Buttons Primitive, Inputs Primitive | Search field input prefix/adornment | **Keep** | Standard icon usage. |
| **IconSelector** | `@tabler/icons-react` | `packages/ui/src/primitives/ui-core/combobox.tsx` | UI Core Primitive | Icon representation | **Keep** | Standard icon usage. |
| **IconSparkles** | `@tabler/icons-react` | `apps/registry/app/(registry)/catalog/catalog-view.tsx`<br>`apps/registry/app/(registry)/page.tsx`<br>`apps/registry/components/registry-sidebar.tsx`<br>`packages/ui/src/primitives/inputs/input-group-with-kbd.tsx` | Registry App, Inputs Primitive | Icon representation | **Keep** | Standard icon usage. |
| **IconSquareRoundedArrowLeftFilled** | `@tabler/icons-react` | `apps/registry/app/(registry)/registry/[name]/page.tsx`<br>`apps/registry/app/(registry)/tokens/page.tsx` | Registry App | Icon representation | **Keep** | Standard icon usage. |
| **IconSquareRoundedArrowUpFilled** | `@tabler/icons-react` | `apps/docs/src/components/card/card.tsx` | Docs App | Icon representation | **Keep** | Standard icon usage. |
| **IconSquareRoundedCheckFilled** | `@tabler/icons-react` | `packages/ui/src/primitives/buttons/button-group-dropdown.tsx`<br>`packages/ui/src/primitives/dropdowns/dropdown-menu.tsx`<br>`packages/ui/src/ui-registry/component-card.tsx` | Buttons Primitive, Dropdowns Primitive, General UI | Icon representation | **Keep (Special)** | Used for visually loaded indicators / status badges. |
| **IconSquareRoundedChevronDownFilled** | `@tabler/icons-react` | `packages/ui/src/primitives/buttons/button-group-dropdown.tsx`<br>`packages/ui/src/primitives/buttons/button-group-popover.tsx` | Buttons Primitive | Icon representation | **Keep** | Standard icon usage. |
| **IconSquareRoundedChevronRightFilled** | `@tabler/icons-react` | `packages/ui/src/primitives/buttons/button-size.tsx`<br>`packages/ui/src/primitives/dropdowns/dropdown-menu.tsx` | Buttons Primitive, Dropdowns Primitive | Icon representation | **Keep** | Standard icon usage. |
| **IconSquareRoundedChevronUpFilled** | `@tabler/icons-react` | `packages/ui/src/primitives/buttons/button-rounded.tsx` | Buttons Primitive | Icon representation | **Keep** | Standard icon usage. |
| **IconSquareRoundedMinusFilled** | `@tabler/icons-react` | `packages/ui/src/primitives/inputs/input-otp.tsx` | Inputs Primitive | Icon representation | **Keep** | Standard icon usage. |
| **IconSquareRoundedPlusFilled** | `@tabler/icons-react` | `packages/ui/src/primitives/buttons/button-group-dropdown.tsx` | Buttons Primitive | Icon representation | **Deprecate** | Inconsistent style. Prefer standard `IconPlus` for unified visuals across action items. |
| **IconSquareRoundedXFilled** | `@tabler/icons-react` | `packages/ui/src/primitives/buttons/button-group-dropdown.tsx` | Buttons Primitive | Icon representation | **Keep** | Standard icon usage. |
| **IconStack2** | `@tabler/icons-react` | `packages/ui/src/components/metrics-layouts/tasks/growth-plan_sidebar.tsx` | Tasks Dashboard | Icon representation | **Keep** | Standard icon usage. |
| **IconStar** | `@tabler/icons-react` | `apps/registry/app/(registry)/catalog/catalog-view.tsx`<br>`packages/ui/src/primitives/inputs/input-group-button.tsx`<br>`packages/ui/src/primitives/inputs/input-group-icon.tsx`<br>`packages/ui/src/primitives/inputs/input-group-with-addons.tsx` | Registry App, Inputs Primitive | Icon representation | **Keep** | Standard icon usage. |
| **IconTable** | `@tabler/icons-react` | `packages/ui/src/components/metrics-layouts/tasks/growth-plan_header.tsx`<br>`packages/ui/src/lib/registry.visual-previews.tsx` | Tasks Dashboard, General UI | Icon representation | **Keep** | Standard icon usage. |
| **IconTool** | `@tabler/icons-react` | `packages/ui/src/components/metrics-layouts/settings/settings_layout.tsx` | Settings Layout | Icon representation | **Keep** | Standard icon usage. |
| **IconTrash** | `@tabler/icons-react` | `packages/ui/src/components/metrics-layouts/tasks/data-actions_table-row.tsx`<br>`packages/ui/src/components/metrics-layouts/tasks/data-bulk-actions_table.tsx`<br>`packages/ui/src/components/metrics-layouts/tasks/tasks-mutate_drawer.tsx`<br>`packages/ui/src/components/metrics-layouts/tasks/tasks_table.tsx`<br>`packages/ui/src/primitives/forms/fields/array.tsx`<br>`packages/ui/src/primitives/inputs/input-group-with-buttons.tsx` | Tasks Dashboard, General UI, Inputs Primitive | Delete/remove actions | **Keep** | Standard destructive delete/remove affordance. |
| **IconTrendingUp** | `@tabler/icons-react` | `packages/ui/src/components/metrics-layouts/tasks/growth-plan_sidebar.tsx` | Tasks Dashboard | Icon representation | **Keep** | Standard icon usage. |
| **IconUser** | `@tabler/icons-react` | `packages/ui/src/components/metrics-layouts/tasks/group-views.tsx`<br>`packages/ui/src/components/metrics-layouts/tasks/growth-plan_states.tsx` | Tasks Dashboard | Icon representation | **Keep** | Standard icon usage. |
| **IconUserCog** | `@tabler/icons-react` | `packages/ui/src/components/metrics-layouts/settings/settings_layout.tsx` | Settings Layout | Icon representation | **Keep** | Standard icon usage. |
| **IconVideo** | `@tabler/icons-react` | `packages/ui/src/primitives/lists/list-item.tsx` | Lists Primitive | Icon representation | **Keep** | Standard icon usage. |
| **IconWorld** | `@tabler/icons-react` | `packages/ui/src/components/metrics-layouts/tasks/growth-plan_sidebar.tsx` | Tasks Dashboard | Icon representation | **Keep** | Standard icon usage. |
| **IconX** | `@tabler/icons-react` | `packages/ui/src/primitives/buttons/discover-button.tsx`<br>`packages/ui/src/primitives/ui-core/combobox.tsx` | Buttons Primitive, UI Core Primitive | Icon representation | **Keep** | Standard icon usage. |



RECENT ADDS > THESE NEED TO BE CATELOGED

IconMoonFilled
IconSunHighFilled
IconDeviceDesktop
IconJewishStarFilled
IconWritingSignFilled
