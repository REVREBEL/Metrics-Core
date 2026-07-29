---
title: Tabler Icon Inventory & Search Guide
description: Verified Metrics-Core Tabler icon inventory with semantic intent and search keywords.
---

# Tabler Icon Inventory & Search Guide

This is the maintained icon reference for `REVREBEL/Metrics-Core`. Use it to verify the exact Tabler React export and to find an icon by intent rather than by memorizing its component name.

## Source of truth

- Package: `@tabler/icons-react`
- Declared version: `^3.44.0`
- Generated usage counts: `apps/registry/lib/tabler-icon-usage.ts`
- Current inventory: **138 unique exports** and **302 imports/usages**
- Exact spelling and casing are required. Use `IconChevronRight`, not `IconChevronRIght`.
- `IconEye` and `IconEyeOff` are valid exports. Use `IconEye` for visible/reveal states and `IconEyeOff` for hidden/concealed states.

The generated usage registry owns current counts. This page owns semantic intent, search keywords, and standardization decisions.

## Search by intent

Search this page with plain-language terms such as `hide password`, `show password`, `delete`, `open new tab`, `filter`, `dark mode`, `property`, `loading`, `drag`, or `verified`.

| Intent | Preferred icon | Useful keywords |
|---|---|---|
| Search | `IconSearch` | search, find, lookup, query |
| Add/create | `IconPlus` | add, create, new, insert |
| Edit | `IconEdit` | edit, modify, update, change |
| Delete permanently | `IconTrash` | delete, trash, destructive |
| Close/dismiss | `IconX` | close, dismiss, cancel, clear |
| Show/reveal | `IconEye` | show password, reveal, preview, visibility |
| Hide/conceal | `IconEyeOff` | hide password, conceal, masked input, private |
| Settings | `IconSettings` | settings, configuration, preferences |
| User administration | `IconUserCog` | user settings, permissions, roles |
| Success | `IconCircleCheck` | success, completed, approved |
| Selection/confirmation | `IconCheck` | selected, confirm, apply |
| Warning | `IconAlertTriangle` | warning, caution, risk |
| Error | `IconAlertCircle` | error, critical, validation |
| External destination | `IconExternalLink` | external link, new tab, outbound |
| Loading | `IconLoader2` | loading, processing, wait, spinner |
| More actions | `IconDots` / `IconDotsVertical` | more, overflow, actions, menu |

## Consistency rules

- Prefer outline icons for standard interactive controls.
- Use filled icons only for intentionally emphasized, selected, branded, or badge-like states.
- Do not mix outline and filled directional icons in the same navigation flow.
- Use `IconCheck` for selection or confirmation and `IconCircleCheck` for read-only success/completion.
- Use `IconTrash` for destructive deletion and `IconX` for close/dismiss.
- Prefer `IconLogout` over the alias-like `IconLogOut` spelling in new work.
- Every new icon must update the generated usage inventory and add intent keywords here.

## Verified inventory

| Icon export | Uses | Verified | Primary intent | Search keywords | Status | Notes |
|---|---:|:---:|---|---|---|---|
| `IconPlus` | 14 | Yes | Add or create | add, create, new, insert, plus | Keep | — |
| `IconCheck` | 11 | Yes | Confirm or select | confirm, check, selected, apply, done | Keep | — |
| `IconSearch` | 11 | Yes | Search or find | search, find, lookup, query, magnifier | Keep | — |
| `IconChevronDown` | 10 | Yes | Expand or open downward | expand, open, dropdown, disclosure, down | Keep | — |
| `IconInfoCircle` | 9 | Yes | Information or help | info, information, help, tooltip, details | Keep | — |
| `IconChevronRight` | 7 | Yes | Navigate forward or expand right | next, forward, right, drill in, expand | Keep | — |
| `IconCopy` | 7 | Yes | Copy to clipboard | copy, clipboard, duplicate, clone | Keep | — |
| `IconTrash` | 7 | Yes | Delete permanently | delete, trash, remove permanently, destructive | Keep | — |
| `IconAlertCircle` | 6 | Yes | Error or critical alert | error, alert, critical, warning, validation | Keep | — |
| `IconCircleCheck` | 6 | Yes | Completed or successful state | success, complete, completed, approved, valid | Keep | — |
| `IconStar` | 6 | Yes | Favorite or featured | favorite, star, featured, rating, bookmark | Keep | — |
| `IconArrowRight` | 5 | Yes | Move or continue forward | next, continue, forward, navigate, right | Keep | — |
| `IconClock` | 5 | Yes | Time or duration | time, clock, duration, schedule, history | Keep | — |
| `IconDots` | 5 | Yes | More actions | more, actions, overflow, menu, options | Keep | — |
| `IconSquareRoundedCheckFilled` | 5 | Yes | Emphasized selected or success state | selected, success, active, checked, filled | Specialized | Filled/specialized styling. |
| `IconAlertTriangle` | 4 | Yes | Warning or caution | warning, caution, risk, attention, alert | Keep | — |
| `IconBell` | 4 | Yes | Notification | notification, alert, reminder, bell, updates | Keep | — |
| `IconCalendar` | 4 | Yes | Date or calendar | date, calendar, schedule, booking, timeline | Keep | — |
| `IconChevronLeft` | 4 | Yes | Navigate back or previous | back, previous, left, prior, navigate | Keep | — |
| `IconCreditCard` | 4 | Yes | Payment method | payment, credit card, billing, card, checkout | Keep | — |
| `IconSparkles` | 4 | Yes | AI, enhancement, or featured action | ai, magic, enhance, sparkle, featured | Keep | — |
| `IconSquareRoundedChevronDownFilled` | 4 | Yes | Emphasized dropdown disclosure | dropdown, expand, disclosure, down, filled | Specialized | Filled/specialized styling. |
| `IconArrowUp` | 3 | Yes | Move up or increase | up, increase, upload, rise, move | Keep | — |
| `IconBuilding` | 3 | Yes | Property or organization | building, hotel, property, company, organization | Keep | — |
| `IconDeviceDesktop` | 3 | Yes | Desktop or system display | desktop, monitor, device, system theme, computer | Keep | — |
| `IconDotsVertical` | 3 | Yes | More actions vertical | more, actions, overflow, kebab, menu | Keep | — |
| `IconFileText` | 3 | Yes | Text document | document, file, text, notes, report | Keep | — |
| `IconLayoutGrid` | 3 | Yes | Grid view | grid, cards, tiles, layout, gallery | Keep | — |
| `IconMail` | 3 | Yes | Email | email, mail, message, inbox, contact | Keep | — |
| `IconRefresh` | 3 | Yes | Refresh or retry | refresh, reload, retry, sync, reset | Keep | — |
| `IconSquareRoundedArrowLeftFilled` | 3 | Yes | Emphasized back navigation | back, previous, left, return, filled | Specialized | Filled/specialized styling. |
| `IconUser` | 3 | Yes | User or assignee | user, person, profile, owner, assignee | Keep | — |
| `IconX` | 3 | Yes | Close, dismiss, or clear | close, dismiss, cancel, clear, remove selection | Keep | — |
| `IconArchive` | 2 | Yes | Archive item | archive, store, inactive, history, retain | Keep | — |
| `IconArrowDown` | 2 | Yes | Move down or decrease | down, decrease, download, lower, move | Keep | — |
| `IconChevronUp` | 2 | Yes | Collapse or open upward | collapse, close, disclosure, up, accordion | Keep | — |
| `IconCode` | 2 | Yes | Source code | code, developer, snippet, programming, technical | Keep | — |
| `IconCopyFilled` | 2 | Yes | Emphasized copy state | copy, copied, clipboard, duplicate, filled | Review | Review against preferred outline variant. |
| `IconDownload` | 2 | Yes | Download or export | download, export, save file, retrieve | Keep | — |
| `IconEyeOff` | 2 | Yes | Hide or conceal value | hide password, password, visibility off, conceal, private, masked input | Keep | Hidden/concealed state. |
| `IconFolder` | 2 | Yes | Folder or collection | folder, directory, collection, files, browse | Keep | — |
| `IconGripVertical` | 2 | Yes | Vertical drag handle | drag, reorder, move, handle, vertical | Keep | — |
| `IconHelpCircle` | 2 | Yes | Help or question | help, question, support, tooltip, guidance | Keep | — |
| `IconInfoSquareRoundedFilled` | 2 | Yes | Emphasized information | info, information, notice, tooltip, filled | Specialized | Filled/specialized styling. |
| `IconLayoutSidebarLeftExpandFilled` | 2 | Yes | Expand left sidebar | sidebar, expand, navigation panel, left rail, open | Specialized | Filled/specialized styling. |
| `IconLink` | 2 | Yes | Link or relationship | link, url, attach, relationship, connect | Keep | — |
| `IconLoader2` | 2 | Yes | Loading or processing | loading, spinner, processing, wait, progress | Preferred | — |
| `IconMessage` | 2 | Yes | Message or comment | message, comment, chat, note, discussion | Keep | — |
| `IconMinus` | 2 | Yes | Remove or decrease | minus, remove, subtract, collapse, decrease | Keep | — |
| `IconSelector` | 2 | Yes | Select or switch option | select, combobox, choose, switch, options | Keep | — |
| `IconSettingsFilled` | 2 | Yes | Emphasized settings | settings, configuration, preferences, admin, filled | Specialized | Filled/specialized styling. |
| `IconSquareRoundedArrowRightFilled` | 2 | Yes | Emphasized forward navigation | next, forward, right, continue, filled | Specialized | Filled/specialized styling. |
| `IconSquareRoundedChevronRightFilled` | 2 | Yes | Emphasized right disclosure | next, drill in, disclosure, right, filled | Specialized | Filled/specialized styling. |
| `IconSquareRoundedChevronUpFilled` | 2 | Yes | Emphasized upward disclosure | collapse, up, disclosure, filled, close | Specialized | Filled/specialized styling. |
| `IconTable` | 2 | Yes | Table view | table, rows, columns, grid, data | Keep | — |
| `IconAdjustmentsHorizontal` | 1 | Yes | Filters or adjustments | filter, adjust, controls, tune, settings | Keep | — |
| `IconAlertSquareRoundedFilled` | 1 | Yes | Emphasized alert | alert, warning, error, notice, filled | Specialized | Filled/specialized styling. |
| `IconAppWindow` | 1 | Yes | Application window | app, window, interface, browser, screen | Keep | — |
| `IconArrowAutofitHeightFilled` | 1 | Yes | Resize height | resize, height, autofit, vertical size, fit | Specialized | Filled/specialized styling. |
| `IconArrowNarrowLeft` | 1 | Yes | Back or previous | back, previous, left, return, narrow arrow | Keep | — |
| `IconArrowNarrowRight` | 1 | Yes | Forward or next | next, forward, right, continue, narrow arrow | Keep | — |
| `IconArrowsUpDown` | 1 | Yes | Sort or reorder | sort, reorder, move, up down, arrange | Keep | — |
| `IconAwardFilled` | 1 | Yes | Achievement or award | award, achievement, winner, recognition, badge | Specialized | Filled/specialized styling. |
| `IconBadgeCheck` | 1 | Yes | Verified or approved | verified, approved, badge, trusted, certified | Keep | — |
| `IconBan` | 1 | Yes | Blocked or prohibited | blocked, prohibited, ban, unavailable, disabled | Keep | — |
| `IconBellXFilled` | 1 | Yes | Notifications off | mute notifications, notifications off, disabled alerts, bell off, filled | Specialized | Filled/specialized styling. |
| `IconBinaryTree2` | 1 | Yes | Hierarchy or dependency tree | hierarchy, tree, dependencies, structure, lineage | Keep | — |
| `IconBinaryTree2Filled` | 1 | Yes | Emphasized hierarchy | hierarchy, tree, dependencies, structure, filled | Specialized | Filled/specialized styling. |
| `IconBoltFilled` | 1 | Yes | Quick action or automation | quick, fast, automation, power, bolt | Specialized | Filled/specialized styling. |
| `IconBooks` | 1 | Yes | Documentation or library | docs, documentation, books, library, knowledge | Keep | — |
| `IconBrandJavascript` | 1 | Yes | JavaScript | javascript, js, code, development, language | Keep | — |
| `IconBuildingBroadcastTowerFilled` | 1 | Yes | Broadcast or distribution | broadcast, distribution, signal, channel, tower | Specialized | Filled/specialized styling. |
| `IconCalendarCheck` | 1 | Yes | Scheduled or confirmed date | scheduled, confirmed, calendar, date, complete | Keep | — |
| `IconCalendarEvent` | 1 | Yes | Calendar event | event, meeting, calendar, schedule, appointment | Keep | — |
| `IconCaretDownFilled` | 1 | Yes | Compact dropdown indicator | dropdown, caret, down, select, filled | Specialized | Filled/specialized styling. |
| `IconChartBar` | 1 | Yes | Bar chart or analytics | chart, analytics, metrics, bars, reporting | Keep | — |
| `IconChevronsUpDown` | 1 | Yes | Sortable or selectable control | sort, select, expand, up down, switch | Keep | — |
| `IconCircle` | 1 | Yes | Neutral status or radio state | status, circle, neutral, indicator, radio | Keep | — |
| `IconCircleArrowUp` | 1 | Yes | Upload or move upward | upload, up, move, promote, arrow | Keep | — |
| `IconCircleCheckFilled` | 1 | Yes | Emphasized success | success, complete, approved, checked, filled | Specialized | Filled/specialized styling. |
| `IconCircleFadingArrowUp` | 1 | Yes | Progress or promote | progress, promote, upward, improve, action | Keep | — |
| `IconCircleOff` | 1 | Yes | Inactive or unavailable | inactive, unavailable, disabled, off, status | Keep | — |
| `IconConfetti` | 1 | Yes | Celebration or success | celebrate, success, launch, milestone, confetti | Keep | — |
| `IconCornerDownLeft` | 1 | Yes | Enter or return key | enter, return, submit, newline, keyboard | Keep | — |
| `IconCreditCardFilled` | 1 | Yes | Emphasized payment method | payment, billing, credit card, checkout, filled | Specialized | Filled/specialized styling. |
| `IconDatabase` | 1 | Yes | Database or data source | database, data, warehouse, storage, dataset | Keep | — |
| `IconDeviceFloppyFilled` | 1 | Yes | Save | save, persist, floppy, store, commit | Specialized | Filled/specialized styling. |
| `IconDeviceGamepad2Filled` | 1 | Yes | Playground or interactive demo | playground, gamepad, demo, interactive, controls | Specialized | Filled/specialized styling. |
| `IconEdit` | 1 | Yes | Edit or modify | edit, modify, update, pencil, change | Keep | — |
| `IconExternalLink` | 1 | Yes | Open external destination | external link, open new tab, outbound, launch, url | Keep | — |
| `IconEye` | 1 | Yes | View or reveal | view, show, preview, visibility, reveal, inspect, show password | Keep | Visible/revealed state. |
| `IconFidgetSpinnerFilled` | 1 | Yes | Loading spinner | loading, spinner, processing, wait, progress | Specialized | Filled/specialized styling. |
| `IconFileCode` | 1 | Yes | Code file | code file, source, script, developer, file | Keep | — |
| `IconFileFilled` | 1 | Yes | File | file, document, attachment, asset, filled | Specialized | Filled/specialized styling. |
| `IconFilter` | 1 | Yes | Filter results | filter, narrow, refine, criteria, funnel | Keep | — |
| `IconFlame` | 1 | Yes | Trending or popular | hot, popular, trending, flame, featured | Keep | — |
| `IconFolderFilled` | 1 | Yes | Emphasized folder | folder, directory, collection, files, filled | Specialized | Filled/specialized styling. |
| `IconGitBranch` | 1 | Yes | Git branch | git, branch, version control, source, workflow | Keep | — |
| `IconGitFork` | 1 | Yes | Git fork | git, fork, version control, repository, branch | Keep | — |
| `IconGripHorizontal` | 1 | Yes | Horizontal drag handle | drag, resize, reorder, handle, horizontal | Keep | — |
| `IconHeart` | 1 | Yes | Like or favorite | like, favorite, heart, love, save | Keep | — |
| `IconHierarchy3` | 1 | Yes | Hierarchy or organization chart | hierarchy, org chart, structure, relationships, tree | Keep | — |
| `IconHome2` | 1 | Yes | Home | home, dashboard, start, landing, main | Keep | — |
| `IconLayoutDashboard` | 1 | Yes | Dashboard | dashboard, overview, metrics, layout, workspace | Keep | — |
| `IconLayoutKanban` | 1 | Yes | Kanban board | kanban, board, cards, workflow, tasks | Keep | — |
| `IconList` | 1 | Yes | List view | list, rows, view, items, menu | Keep | — |
| `IconListCheck` | 1 | Yes | Checklist or completed list | checklist, tasks, complete, list, validation | Keep | — |
| `IconListDetails` | 1 | Yes | Detailed list | details, list, metadata, rows, catalog | Keep | — |
| `IconLoader` | 1 | Yes | Loading or processing | loading, spinner, processing, wait, progress | Review | Review against preferred outline variant. |
| `IconLogOut` | 1 | Yes | Sign out | logout, log out, sign out, exit, account | Standardize | Prefer `IconLogout` in new work. |
| `IconLogout` | 1 | Yes | Sign out | logout, log out, sign out, exit, account | Preferred | Preferred sign-out export. |
| `IconMapPin` | 1 | Yes | Location | location, map, pin, address, property | Keep | — |
| `IconMessageCircle` | 1 | Yes | Conversation or comment | chat, comment, message, conversation, discussion | Keep | — |
| `IconMicrophone` | 1 | Yes | Voice input or audio | microphone, voice, audio, record, speech | Keep | — |
| `IconMoonFilled` | 1 | Yes | Dark theme | dark mode, theme, night, moon, appearance | Specialized | Filled/specialized styling. |
| `IconPalette` | 1 | Yes | Appearance or color | palette, color, theme, appearance, branding | Keep | — |
| `IconPinOff` | 1 | Yes | Unpin | unpin, detach, remove pin, stop pinning, pin off | Keep | — |
| `IconPresentation` | 1 | Yes | Presentation or report | presentation, slides, report, briefing, deck | Keep | — |
| `IconPuzzleFilled` | 1 | Yes | Extension or integration | plugin, integration, extension, puzzle, add-on | Specialized | Filled/specialized styling. |
| `IconRadio` | 1 | Yes | Broadcast or radio | radio, broadcast, live, signal, channel | Keep | — |
| `IconSettings` | 1 | Yes | Settings or configuration | settings, configuration, preferences, controls, admin | Keep | — |
| `IconShare` | 1 | Yes | Share | share, send, distribute, link, collaborate | Keep | — |
| `IconSquareRoundedArrowUpFilled` | 1 | Yes | Emphasized upward action | up, upload, promote, top, filled | Specialized | Filled/specialized styling. |
| `IconSquareRoundedMinusFilled` | 1 | Yes | Emphasized remove or decrease | minus, remove, decrease, collapse, filled | Specialized | Filled/specialized styling. |
| `IconSquareRoundedPlusFilled` | 1 | Yes | Emphasized add action | add, create, plus, new, filled | Review | Review against preferred outline variant. |
| `IconSquareRoundedXFilled` | 1 | Yes | Emphasized close or failure | close, cancel, error, remove, filled | Specialized | Filled/specialized styling. |
| `IconStack2` | 1 | Yes | Layers or stack | layers, stack, group, collection, hierarchy | Keep | — |
| `IconSunHighFilled` | 1 | Yes | Light theme | light mode, theme, day, sun, appearance | Specialized | Filled/specialized styling. |
| `IconTool` | 1 | Yes | Tools or maintenance | tools, maintenance, admin, utility, configuration | Keep | — |
| `IconTrashFilled` | 1 | Yes | Emphasized delete | delete, trash, destructive, remove permanently, filled | Specialized | Filled/specialized styling. |
| `IconTrendingUp` | 1 | Yes | Positive trend or growth | trend, growth, increase, performance, up | Keep | — |
| `IconUserCog` | 1 | Yes | User administration | user settings, permissions, account admin, role, configuration | Keep | — |
| `IconUserFilled` | 1 | Yes | Emphasized user | user, profile, person, owner, filled | Specialized | Filled/specialized styling. |
| `IconVideo` | 1 | Yes | Video | video, camera, media, recording, meeting | Keep | — |
| `IconWallet` | 1 | Yes | Wallet or finance | wallet, finance, payment, money, billing | Keep | — |
| `IconWorld` | 1 | Yes | Global or web | global, world, web, international, internet | Keep | — |
| `IconWritingSignFilled` | 1 | Yes | Writing or content | writing, content, edit, copy, text | Specialized | Filled/specialized styling. |
| `IconXboxX` | 1 | Yes | Failure or close state | error, failure, close, cancel, x | Keep | — |

## Maintenance

When adding, renaming, or replacing an icon:

1. confirm the named export against the installed `@tabler/icons-react` version;
2. use exact casing;
3. regenerate or update `apps/registry/lib/tabler-icon-usage.ts`;
4. add intent-focused keywords here;
5. record whether the icon is preferred, specialized, under review, or being standardized;
6. run the repository icon checks and report the actual result.

Automated validation should fail when a named import is not exported, a used icon is undocumented, a documented icon is unused, counts are stale, or a casing/spelling variant is introduced accidentally.
