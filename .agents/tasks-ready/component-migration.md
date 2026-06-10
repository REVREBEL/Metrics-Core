### 🛑 CRITICAL DIRECTIVES FOR GEMINI 2.5


1. **One Folder at a Time:** Do not attempt to migrate or analyze multiple component folders simultaneously. Focus *only* on the active folder specified by the user.
2. **Anti-Looping/State Cache:** If you find yourself repeating the same verification steps, file structures, or code blocks in a single response, stop immediately. Summarize what you have done and ask the user for confirmation before proceeding.
3. **No Lazy Coding / Missing Placeholders:** Do not emit code containing `// ... rest of the code` or `/* unchanged */`. You must output files completely or explicitly state that a file requires zero changes.
4. **Output Token Management:** If an output file or code diff is massive, output it in logical chunks. Append `[PART 1/2 - TO BE CONTINUED]` at the end of your response, and wait for the user to type "continue" before outputting the rest.
5. **Role Separation:** You are the **Analyzer and Code Generator**. You cannot run terminal commands. Expect the user to provide terminal outputs for you to digest.


---

# Metrics-Core Component Migration Checklist (Gemini 2.5 Edition)

**Migration Path:**

* **From:** `REVREBEL/Metrics-Core-Dep`
* **To:** `REVREBEL/Metrics-Core`

## 📦 Current Step: Initialize Session

*User: Provide the active folder path below to start.*

* **Target Folder:** `packages/ui/src/primitives/[FOLDER_NAME]`

---

## 1. Pre-Migration Inventory & Context Sync

**Gemini Directive:** Analyze the folder structures provided below. Flag any immediate naming collisions, missing target structures, or files that should *not* be migrated (e.g., build artifacts).

### 🛠️ Execution (User runs and provides output):

```bash
SOURCE_REPO="../Metrics-Core-Dep"
TARGET_FOLDER="packages/ui/src/primitives/[FOLDER_NAME]"

echo "=== SOURCE FILES ===" && find "$SOURCE_REPO/$TARGET_FOLDER" -type f | sort
echo "=== TARGET FILES ===" && find "$TARGET_FOLDER" -type f | sort
echo "=== DIFF STATUS ===" && diff -qr "$SOURCE_REPO/$TARGET_FOLDER" "$TARGET_FOLDER"

```

### 🧠 Gemini Validation Check:

* Identify source-only files vs. target-only files.
* Explicitly list which target files must be **overwritten** versus **preserved**.
* Filter out any `.turbo`, `.next`, or `dist` files accidentally caught in the inventory.

---

## 2. Dependency & Version Posture Review

**Gemini Directive:** Compare the package manifests. Look specifically for major version mismatches (e.g., React 18 vs 19) and library conflicts like Recharts, Motion, or Radix.

### 🛠️ Execution (User provides output):

```bash
cat package.json | jq '.devDependencies, .dependencies'
cat packages/ui/package.json | jq '.dependencies, .devDependencies, .peerDependencies'
cat ../Metrics-Core-Dep/package.json | jq '.devDependencies, .dependencies'
cat ../Metrics-Core-Dep/packages/ui/package.json | jq '.dependencies, .devDependencies, .peerDependencies'

```

### 🧠 Gemini Validation Check:

* **Strict Check:** Look for `"use-render": "link:@base-ui/react/use-render"`. If found, **DO NOT COPIED**. Force an upgrade to the modern Base UI equivalent.
* Verify `recharts` and `motion` compatibility if working on the `charts` folder.
* Flag any "dependency leaks" where the source repo points to packages missing in the target `package.json`.

---

## 3. Test & Mock Alignment

**Gemini Directive:** Review existing tests. Gemini must rewrite test syntaxes if moving from Jest to Vitest, and ensure vital DOM/Browser mocks are present.

### 🛠️ Execution (User provides output):

```bash
find "../Metrics-Core-Dep/$TARGET_FOLDER" \( -name "*.test.ts" -o -name "*.test.tsx" -o -name "*.spec.ts" -o -name "*.spec.tsx" -o -name "__tests__" \) -print

```

### 🧠 Gemini Validation Check:

* Convert Jest assertions to Vitest (`jest.fn()` ➡️ `vi.fn()`) if target repo uses Vitest.
* **Fail-safe for Charts/Primitives:** Check if the component uses `ResizeObserver`, `IntersectionObserver`, `matchMedia`, or `DOMRect`. If yes, output the exact mock setup block needed for the test environment.

---

## 4. Asset & Pipeline Scan

**Gemini Directive:** Track down hidden assets, local SVGs, and absolute `/public` assets that will break upon folder migration.

### 🛠️ Execution (User provides output):

```bash
rg "\.svg|\.png|\.jpg|\.jpeg|\.webp|\.gif|\.json|/public/|public/" "../Metrics-Core-Dep/$TARGET_FOLDER"

```

### 🧠 Gemini Validation Check:

* Identify if SVGs are imported as React Components (`import { ReactComponent as Icon }`) or Asset URLs. Match this against the target repository’s asset pipeline configuration.

---

## 5. Enhanced Static Code Analysis (Pre-Copy)

**Gemini Directive:** Scan the raw code context for aliases, toxic self-imports, and outdated imports.

### 🛠️ Execution (User provides output):

```bash
rg "from ['\"]|import .* from|@/|~/" "../Metrics-Core-Dep/$TARGET_FOLDER"

```

### 🧠 Gemini Validation Check:

* Flag all old aliases (e.g., `@/components/*` or `~/*`) that need to be re-mapped to internal relative paths or target repository aliases.

---

## 6. The Migration & Refactoring Engine

**Gemini Directive:** The user will now copy the files using `rsync`. Gemini will ingest the copied code files one by one (or in batches) and apply the refactoring rules gathered from Steps 1–5.

### 🛠️ Execution (User copies and provisions file contents):

```bash
rsync -av "../Metrics-Core-Dep/$TARGET_FOLDER/" "$TARGET_FOLDER/"

```

*User Action: Paste the contents of the components that need refactoring into the prompt chat.*

### 🧠 Gemini Code Transformation Rules:

* **Client/Server Boundary:** Force `"use client";` at the top of any file utilizing `useState`, `useEffect`, `useRef`, or third-party chart/animation libraries.
* **Anti-Self-Import Loop:** Strip out recursive self-imports like `import { Button } from "@repo/ui"` inside `packages/ui`. Force direct relative paths (e.g., `import { Button } from "../buttons/button"`).
* **Tailwind v4 / Styling Check:** Update legacy token configurations or CSS variable structures to the new `theme-reference.css` or `globals.css` structure. Reject any imports pointing to a legacy `global.css`.

---

## 7. Verification, Compilation & Registry Sync

**Gemini Directive:** Guide the user through validation. If any build errors occur, the user will paste them here, and Gemini will patch the specific files without reverting other changes.

### 🛠️ Execution (User runs validation commands):

```bash
pnpm install
pnpm --filter '@repo/ui' lint
pnpm --filter '@repo/ui' build
pnpm --filter '@apps/registry' registry:folders:sync
pnpm --filter '@apps/registry' generate-registry
pnpm --filter '@apps/registry' build

```

---

## 8. Anti-Looping Session Handshake

**Gemini Directive:** To ensure you do not lose state or context, do not proceed to the next component folder until you output the completed Markdown template below for the current folder.

### 📋 Migration Report Template

```markdown
### 📁 Migration Report: [FOLDER_NAME]
- [ ] Inventory Verified (No stray cache files)
- [ ] Dependencies Audited (Verified React 19/Tailwind v4 compatibility)
- [ ] Path Aliases Fixed (No self-referencing @repo/ui imports)
- [ ] "use client" Guarded
- [ ] Local Mocks Provided (ResizeObserver/DOMRect handled)
- [ ] Registry Sync Executed

**Next Folder in Sequence:** [Insert next folder from the recommended order]

```

---

## 📈 Recommended Session Processing Order

*Process one row completely, close the chat session or clear history (to prevent context degradation/looping), and open a fresh prompt session for the next row.*

| Order | Target Primitive Folder | Structural Complexity | Primary Risk |
| --- | --- | --- | --- |
| **1** | `packages/ui/src/primitives/buttons` | Low | Target aliases & `cn` merges |
| **2** | `packages/ui/src/primitives/inputs` | Low | ForwardRef structures |
| **3** | `packages/ui/src/primitives/tables` | Medium | Flexbox vs Layout shifting |
| **4** | `packages/ui/src/primitives/charts` | High | Recharts hydration, ResizeObserver mocks, theme tokens |

---

### How to use this with Gemini 2.5:

1. Paste the **Guardrails** and **Step 1** into a new prompt window.
2. Feed Gemini the terminal outputs as requested.
3. Once a folder passes Step 7 and generates the Step 8 report, **start a fresh chat session** for the next folder. This completely mitigates the attention-drift and looping issues native to long LLM conversations!