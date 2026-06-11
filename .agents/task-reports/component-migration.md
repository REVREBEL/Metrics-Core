# 🤖 Gemini 2.5 Execution Guardrails

*Include these meta-instructions at the absolute top of your prompt session with Gemini 2.5.*

> ### 🛑 CRITICAL DIRECTIVES FOR GEMINI 2.5
> 
> 
> 1. **One Folder at a Time:** Do not attempt to analyze or migrate multiple primitive folders at once. Focus entirely on the single active folder specified by the user.
> 2. **Anti-Looping/State Cache:** If you notice yourself repeating the same verification steps, file structures, or code blocks within a single response, stop immediately. Summarize your current progress and prompt the user for direction.
> 3. **No Lazy Coding / Missing Placeholders:** Never emit code containing `// ... rest of the code` or `/* unchanged */`. Output files completely, or explicitly confirm that a file requires zero modifications.
> 4. **Output Token Management:** If a file or code diff is structurally massive, break it into logical chunks. Append `[PART 1/2 - TO BE CONTINUED]` at the end of your response, and wait for the user to type "continue" before sending the rest.
> 5. **Path Typo Enforcement:** Strictly enforce the target directory structure: `packages/ui/src/primitives`. Flag any incoming paths utilizing the incorrect `package/ui/primitives` layout.
> 
> 

---

# Metrics-Core to REBEL-APP Migration Checklist (Gemini 2.5 Edition)

**Migration Paths:**

* **Source Root:** `./Metrics-Core/packages/ui/src/primitives/`
* **Destination Root:** `./REBEL-APP/packages/ui/src/primitives/`

## 📦 Current Step: Initialize Session

*User: Provide the active primitive folder path below to start.*

* **Active Primitive Folder:** `packages/ui/src/primitives/[FOLDER_NAME]`

---

## 1. Pre-Migration Inventory & Path Validation

**Gemini Directive:** Verify the target folder structure and map out incoming source files. Flag any structural mismatches between the two repositories before any code is modified.

### 🛠️ Execution (User runs and provides output):

```bash
SOURCE_ROOT="./Metrics-Core"
DEST_ROOT="./REBEL-APP"
PRIMITIVE_FOLDER="packages/ui/src/primitives/[FOLDER_NAME]"

echo "=== PATH VALIDATION ==="
if [[ "$PRIMITIVE_FOLDER" == *"package/ui/primitives"* ]]; then
  echo "❌ ERROR: Incorrect directory structure detected!"
else
  echo "✅ Path structure looks correct."
fi

echo "=== SOURCE INVENTORY ===" && find "$SOURCE_ROOT/$PRIMITIVE_FOLDER" -type f | sort
echo "=== DESTINATION INVENTORY ===" && find "$DEST_ROOT/$PRIMITIVE_FOLDER" -type f | sort 2>/dev/null || echo "Target folder does not exist yet."

```

### 🧠 Gemini Validation Check:

* List files that exist only in the source vs. files already existing in the destination.
* Determine if target files should be overwritten or preserved.
* Filter out environment files, temporary cache files (`.turbo`, `.next`), or build artifacts.

---

## 2. Static Code & Dependency Audit

**Gemini Directive:** Track down absolute imports, repository-specific aliases, and potential dependency mismatches. Look for breaking framework assumptions or missing packages in the destination repository.

### 🛠️ Execution (User provides output):

```bash
echo "=== IMPORTS SCAN ==="
rg "from ['\"]|import .* from" "$SOURCE_ROOT/$PRIMITIVE_FOLDER"

```

### 🧠 Gemini Validation Check:

* Scan for repository aliases (e.g., `@/components/*`, `~/*`). Formulate relative path conversions or map them to the destination repository's alias system.
* Check for subpath/self-imports (e.g., `import { X } from "@repo/ui"`) inside `packages/ui` and convert them to internal relative imports to avoid cyclical bundling loops.

---

## 3. Test, Mock, & Storybook Alignment

**Gemini Directive:** Ensure unit tests, integration tests, and Storybook components are fully accounted for. Determine if test frameworks or rendering environments differ between the repositories.

### 🛠️ Execution (User provides output):

```bash
echo "=== TESTING & STORIES INVENTORY ==="
find "$SOURCE_ROOT/$PRIMITIVE_FOLDER" \( -name "*.test.*" -o -name "*.spec.*" -o -name "*.stories.*" -o -name "*.story.*" \) -print

```

### 🧠 Gemini Validation Check:

* Identify test framework shifts (e.g., Jest syntax migrating to Vitest). Provide exact syntax transformation mapping where necessary.
* Flag missing environment mocks (e.g., `ResizeObserver` for charts, `Portal/Dialog` boundaries for dropdowns/menus).

---

## 4. Refactoring & Migration Execution

**Gemini Directive:** The user will now copy the component directory. Gemini will ingest the copied files or the requested file modifications and apply the refactoring rules established in Steps 1–3.

### 🛠️ Execution (User copies files and shares source code blocks):

```bash
rsync -av "$SOURCE_ROOT/$PRIMITIVE_FOLDER/" "$DEST_ROOT/$PRIMITIVE_FOLDER/"
```

**The existing directory has index files in each of the component folders. After copying the files contents, you can remove this file as it's not needed in the new structure. Do this prior to sever and lint checks.**


*User Action: Paste the contents of the files requiring refactoring directly into the chat session.*

### 🧠 Gemini Code Transformation Rules:

* **Client/Server Boundaries:** Ensure explicit `"use client";` directives are preserved or added to primitives using interactive hooks (`useState`, `useEffect`, `useRef`), browser globals (`window`, `document`), or interactive third-party utilities.
* **Typo Elimination:** Scan the incoming code for any hardcoded layout paths referencing the invalid `package/ui/primitives` layout.
* **Component-Specific Guardrails:** Ensure `forwardRef` structures are intact for form inputs, accessibility properties are preserved, and class-merging tokens fit the target architecture.

---

## 5. Verification & Compilation

**Gemini Directive:** Guide the user through validation steps. If compiling errors or linter errors occur, analyze the log output and output targeted fixes without regressing previous file patches.

### 🛠️ Execution (User runs validation tasks from the destination root):

```bash
cd "$DEST_ROOT"
pnpm install
pnpm run lint --filter="./$PRIMITIVE_FOLDER"
pnpm run build --filter="./$PRIMITIVE_FOLDER"

```

---

## 6. Post-Migration Handshake Report

**Gemini Directive:** Output this final summary report once validation commands pass cleanly. Do not progress to a new primitive folder in the same conversation thread; force a clean context break.

### 📋 Migration Report Template

```markdown
### 📁 Migration Report: [FOLDER_NAME]
- [ ] Directory Verified (Confirmed `packages/ui/src/primitives` layout)
- [ ] Dependencies Audited & Internal Self-Imports Resolved
- [ ] TypeScript Compilation Passing
- [ ] ESLint Compliance Verified
- [ ] Tests and Storybook Context Maintained

**Next Folder in Sequence:** [Insert next folder from the recommended table below]

```

---

## 📈 Comprehensive Session Processing Order

*Process exactly one primitive row at a time. To prevent context degradation and looping behaviors native to long LLM conversations, close or clear the chat session and open a fresh prompt window for each row.*

| Order | Target Primitive Folder | Structural Complexity | Primary Risk / Notes |
| --- | --- | --- | --- |
| **1** | `packages/ui/src/primitives/skeleton` | Low | Simple styling/token alignment; great initialization test. |
| **2** | `packages/ui/src/primitives/typography` | Low | Font tokens, semantic HTML tags, class-merging tools. |
| **3** | `packages/ui/src/primitives/buttons` | Low | Target aliases, `cn` utility merges, variant exports. |
| **4** | `packages/ui/src/primitives/links` | Low | `Next/link` compatibility, external tracking behaviors, accessibility. |
| **5** | `packages/ui/src/primitives/lists` | Low | Layout spacing tokens, marker styles, nested list configurations. |
| **6** | `packages/ui/src/primitives/textarea` | Low | `forwardRef` structures, form boundaries, custom resize behaviors. |
| **7** | `packages/ui/src/primitives/inputs` | Low–Medium | `forwardRef` tracking, label association, validation state wrappers. |
| **8** | `packages/ui/src/primitives/tabs` | Medium | Radix/Base UI engine compatibility, active-state styling. |
| **9** | `packages/ui/src/primitives/dropdowns` | Medium | Portal mounting behavior, overlay positioning, z-index tokens. |
| **10** | `packages/ui/src/primitives/menus` | Medium | Nested flyouts, dynamic focus management, Radix version parity. |
| **11** | `packages/ui/src/primitives/popovers` | Medium | Collision detection handling, outside-click listener loops. |
| **12** | `packages/ui/src/primitives/forms` | Medium | React Hook Form dependencies, validation schema structures. |
| **13** | `packages/ui/src/primitives/layouts` | Medium | Responsive layouts, container sizing conventions, spacing tokens. |
| **14** | `packages/ui/src/primitives/sections` | Medium | Composition with layouts, responsive stacking sequences. |
| **15** | `packages/ui/src/primitives/image-blocks` | Medium | Next.js Image component optimization, responsive aspect ratios. |
| **16** | `packages/ui/src/primitives/timelines` | Medium | Layout track alignments, indicator styling, fluid line scaling. |
| **17** | `packages/ui/src/primitives/users` | Medium | Avatar dependency packages, fallback state assets, aria-labels. |
| **18** | `packages/ui/src/primitives/tables` | Medium–High | Layout shifting, mobile overflow handling, TanStack Table parity. |
| **19** | `packages/ui/src/primitives/data-grid` | High | Complex table states, sorting/filtering systems, virtualization. |
| **20** | `packages/ui/src/primitives/charts` | High | Recharts hydration cycles, `ResizeObserver` test mocks, theme tokens. |
| **21** | `packages/ui/src/primitives/studio-blocks` | High | Composite layout blocks, nested local primitive dependencies. |
| **22** | `packages/ui/src/primitives/ui-core` | High | **Foundational risk.** Leave at the end unless explicitly requested. |
| **23** | `packages/ui/src/primitives/registry` | High | Registry metadata tracking, manifest generation, playground wiring. |
