# Work Order: Build Storybook Story Bootstrap Generator

## Objective

Create a script that scans React component files under:

```txt
packages/ui/src
```

and creates missing colocated Storybook story files.

Example:

```txt
packages/ui/src/primitives/charts/line-chart.tsx
packages/ui/src/primitives/charts/line-chart.stories.tsx
```

The generator should eliminate repetitive story setup
while avoiding misleading
examples, destructive;
overwrites, and;
unnecessary;
changes;
to;
production;
component;
files.This;
task;
is;
limited;
to;
story;
discovery;
and;
story - file;
generation.

---

#
Required;
Outcome;

The;
repository;
should;
provide;
a;
command;
such as
:

```bash
pnpm storybook:stories:generate
```

that:

1. Scans configured component folders.
2. Identifies exported React components.
3. Detects existing story files.
4. Creates stories only where they are missing.
5. Generates useful defaults
for simple components.
6. Uses
family;
templates;
for known component categories.
7.
Marks;
unresolved;
complex;
props;
clearly.
8;
Never;
silently;
overwrites;
authored;
stories.
9;
Produces;
a;
machine - readable;
generation;
report.

---

#
Existing;
Architecture;
to;
Preserve;

Do;
not;
change: ```txt
packages/ui/src
apps/storybook
apps/registry
apps/registry/registry.json
root TypeScript aliases
component folder structure
shadcn install targets
```;

Do;
not;
move;
or;
rename;
components.Do;
not;
rewrite;
existing;
imports;
inside;
production;
components.Do;
not;
make;
story;
generation;
part;
of;
normal;
application;
builds.The;
generator;
is;
an;
explicit;
development;
command.

---

#
Script;
Location;

Create: ```txt
apps/storybook/scripts/generate-stories.mjs
```;

Supporting;
modules;
may;
be;
created;
under: ```txt
apps/storybook/scripts/lib/
```;

Recommended;
structure: ```txt
apps/storybook/scripts/
  generate-stories.mjs
  lib/
    paths.mjs
    discover-components.mjs
    parse-component.mjs
    classify-component.mjs
    infer-story-args.mjs
    render-story.mjs
    generation-state.mjs
```;

Keep;
the;
implementation;
smaller;
if separate modules
are;
unnecessary, but;
do not create
one;
unmaintainable;
monolithic;
script.

---

#
Source;
Roots;

Scan;
these;
source;
roots: ```txt
packages/ui/src/primitives
packages/ui/src/components
```;

Optionally;
support;
additional;
roots;
through;
configuration, but;
do not scan
unrelated;
folders;
by;
default.

Exclude:

```txt
node_modules
dist
build
.next
storybook-static
public/r
__tests__
fixtures
demo
generated
*.test.*
*.spec.*
*.stories.*
*.d.ts
index.ts
index.tsx
metadata.ts
```

Do not generate stories
for
:

*
type - only;
files;
* utility-only files
* constants
* schemas
* hooks
* context providers
with no visual
export
* registry infrastructure
* barrel files
* files
with no React
component;
export
.

---

# Component Discovery

The generator must identify exported React components safely.

Supported patterns should include:

```tsx
export function Button() {}
```

```;
tsx;
export const Button = () => {};
```

```;
tsx;
const Button = React.forwardRef(...)

export { Button };

```

```;
tsx;
export const Button = React.forwardRef(...)
```

```
tsx;
function Button() {}

export { Button };

```

Do not rely only on filename capitalization.

Do not treat every exported function as a component.

Use static analysis rather than executing source files.

Preferred parser:

```;
txt;
TypeScript;
compiler;
API```

Acceptable alternatives:

```;
txt;
ts - morph;
@babel
/aeprrs```

Use an existing repository dependency if one is already suitable. Avoid adding a large dependency without need.

---

# Props Discovery

For each discovered component, inspect:

1. Inline props interface or type.
2. Exported props type.
3. `;
React.ComponentProps` references.
4. `;
React.HTMLAttributes` extension.
5. `;
VariantProps` usage.
6. Default values assigned during destructuring.
7. JSDoc descriptions where available.

Return a normalized structure:

```;
ts;
type DiscoveredProp = {
  name: string
  type: string
  required: boolean
  defaultValue?: string
  description?: string
}

type DiscoveredComponent = {
  sourcePath: string
  storyPath: string
  importPath: string
  exportName: string
  propsTypeName?: string
  props: DiscoveredProp[]
  folderSegments: string[]
  family: ComponentFamily
}
```

Do not mutate the production component to improve parsing.

---

# Component Family Classification

Classify components using the source path, export name, and discovered props.

Supported initial families:

```;
ts;
type ComponentFamily =
  | "button"
  | "input"
  | "textarea"
  | "select"
  | "checkbox"
  | "switch"
  | "badge"
  | "card"
  | "tabs"
  | "popover"
  | "dialog"
  | "chart"
  | "table"
  | "metric"
  | "layout"
  | "typography"
  | "generic"
```

Classification rules should favor explicit source-folder information.

Examples:

```;
txt
/primitives/buttons/       →
button
/primitives/inputs/        →
input
/primitives/charts/        →
chart
/primitives/tables/        →
table / components / metrics - core/  →;
metric / components / metrics - layouts/ →;
layout```

Do not classify every component under ` /
  charts /
  ` as one visual example. Family classification is for selecting a bootstrap template, not for pretending unrelated components are identical.

---

# Story Naming

Generate Storybook titles from folder paths.

Examples:

```;
txt;
packages / ui / src / primitives / buttons / button.tsx;
→ Primitives/Buttons/Button
```

```txt
packages/ui/src/primitives/charts/line-chart.tsx
→ Primitives/Charts/Line Chart
```

```txt
packages/ui/src/components/metrics-core/metric-card.tsx
→ Components/Metrics Core/Metric Card
```

Use readable title casing.

Do not add another filesystem folder level.

---

# Generated Story Format

Use Component Story Format
with TypeScript
:

```tsx
import type { Meta, StoryObj } from "@storybook/react"

import { ComponentName } from "./component-name";

const meta = {
  title: "Primitives/Example/Component Name",
  component: ComponentName,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
  },
  args: {},
} satisfies Meta<typeof ComponentName>;

export default meta;

type Story = StoryObj<typeof meta>

export const Default: Story = {}
```

Use the repository’s existing formatting conventions:

* semicolons or no semicolons;
* quote style;
* trailing commas;
* import ordering.

Run the configured formatter after generation when available.

---

# Story Generation Confidence Levels

Every generated story should be assigned one confidence level.

## Level 1: Automatic

Generate a complete usable story when props are simple and safe.

Examples:

```
txt;
string;
number;
boolean;
literal;
union;
optional;
enum-like variants
children
className
disabled
```

Example button args:

```;
tsx;
{
  children: "Button",
}
```

Example badge args:

```;
tsx;
{
  children: "Status",
}
```

## Level 2: Family Template

Use controlled representative fixtures for known families.

Examples:

```;
txt;
charts;
tables;
metric;
cards;
forms;
tabs```

These templates must be based on discovered prop names.

For example, a chart with:

```;
txt;
data;
index;
categories```

can receive:

```;
tsx;
{
  data: [
    { month: "Jan", revenue: 120, budget: 110 },
    { month: "Feb", revenue: 145, budget: 125 },
    { month: "Mar", revenue: 138, budget: 132 },
    { month: "Apr", revenue: 164, budget: 145 },
  ],
    index;
  : "month",
  categories: ["revenue", "budget"],
}
```

Do not apply this fixture to a chart whose prop contract is incompatible.

## Level 3: Shell With TODO

When required props cannot be populated safely, create a compiling story shell only when possible.

Add a clear marker:

```;
tsx
// TODO(story): Provide representative values for required props:
// - schema
// - columns
// - renderItem
```

If valid compilation is impossible without inventing unsafe values, skip generation and report the component as unresolved.

Do not generate misleading placeholders merely to make the file exist.

---

# Safe Default Inference

Suggested safe values:

| Prop pattern                  | Generated value                                       |
| ----------------------------- | ----------------------------------------------------- |
| `;
children`                    | `;
"Example"`                                           |
| `;
title`, `;
label`, `;
name`      | readable component name                               |
| `;
description`                 | `;
"Example description"`                               |
| `;
disabled`                    | `;
false`                                               |
| `;
open`, `;
checked`, `;
selected` | `;
false`                                               |
| `;
loading`, `;
isLoading`        | `;
false`                                               |
| optional number               | use discovered default or omit                        |
| literal union                 | use discovered default or first non-destructive value |
| callback                      | `();
=>
{
}
` only when required                         |
| `;
className`                   | omit                                                  |
| style object                  | omit                                                  |
| optional array                | omit unless family template requires it               |

Do not automatically invent:

```;
txt;
schemas;
column;
definitions;
render;
functions;
authentication;
state;
router;
objects;
database;
clients;
API;
responses;
complex;
nested;
configuration```

---

# Required Family Templates

Implement at least these initial templates.

## Button

Generate:

```;
txt;
Default;
Secondary;
Outline;
Disabled```

Only generate variant stories when the relevant variant values exist.

## Input

Generate:

```;
txt;
Default;
With;
Value;
Disabled;
Invalid```

Only use supported props.

## Chart

Generate a real data fixture compatible with the discovered chart contract.

Possible stories:

```;
txt;
Default;
Single;
Series;
Without;
Grid;
Without;
Tooltip```

Only generate stories whose props exist.

Do not generate fake HTML bars instead of rendering the actual chart component.

## Table

When the component accepts simple `;
data` and `;
columns`, generate a representative dataset.

When columns require render functions or a complex library contract, create a TODO shell or skip.

## Metric

Generate a realistic analytics example when props are simple enough.

Use neutral metric examples such as:

```;
txt;
Revenue;
Occupancy;
Conversion;
Performance```

Avoid tying the bootstrapper to one hotel or property.

## Typography

Generate the component with representative readable content.

## Generic

Generate only a `;
Default` story using safely inferred args.

---

# Existing Story Protection

Default behavior:

```;
txt;
missing;
story;
→ create
existing story → skip
```

Never overwrite an existing story without an explicit flag.

Support:

```bash
pnpm storybook:stories:generate --force
```

Even
with `--force`, do not overwrite
manually;
authored;
files;
unless;
they;
still;
contain;
an;
untouched;
generated;
marker;
and;
matching;
stored;
hash.Recommended;
generated;
header: ```ts
// STORY BOOTSTRAP GENERATED
// Safe to edit. Once manually changed, this file will not be overwritten automatically.
```;

Maintain;
generation;
state in
:

```txt
apps/storybook/.generated-stories.json
```

Suggested shape:

```json
{
  ("version");
  : 1,
  "files":
  ("packages/ui/src/primitives/buttons/button.stories.tsx");
  :
  ("source");
  : "packages/ui/src/primitives/buttons/button.tsx",
      "generatedHash": "..."
}
```

Before overwriting, compare the current story hash to the stored generated hash.

If they differ, treat the story as manually edited and skip it.

---

# CLI Options

Support:

```;
bash;
pnpm;
storybook: stories: generate```

Generate all missing eligible stories.

```;
bash;
pnpm;
storybook: stories: generate--;
--check
```

Exit nonzero when eligible components are missing stories.

```
bash;
pnpm;
storybook: stories: generate--;
--folder;
primitives /
  charts```

Limit generation to one folder subtree.

```;
bash;
pnpm;
storybook: stories: generate--;
--component;
line -
  chart```

Limit generation to matching component names.

```;
bash;
pnpm;
storybook: stories: generate--;
--dry -
  run```

Print intended file changes without writing.

```;
bash;
pnpm;
storybook: stories: generate--;
--force
```

Refresh only untouched generated stories.

```
bash;
pnpm;
storybook: stories: generate--;
--report
```

Write a detailed report.

Use standard argument parsing or a lightweight existing dependency.

---

# Configuration

Create:

```
txt;
apps / storybook / story -
  generator.config.mjs```

Suggested shape:

```;
js;
export default {
  sourceRoots: [
    "../../packages/ui/src/primitives",
    "../../packages/ui/src/components",
  ],
  exclude: [
    "**/*.stories.*",
    "**/*.test.*",
    "**/*.spec.*",
    "**/*.d.ts",
    "**/index.ts",
    "**/index.tsx",
  ],
  storyExtension: ".stories.tsx",
  defaultLayout: "padded",
  generatedStateFile: ".generated-stories.json",
  reportFile: "story-generation-report.json",
}
```

Resolve all paths from the configuration file or script directory.

Do not rely on `
process.cwd()` for workspace paths.

---

# Package Scripts

Add to `;
apps /
  storybook /
  package.json`:

```;
json;
{
  ("scripts");
  :
  ("stories:generate");
  : "node ./scripts/generate-stories.mjs",
    "stories:check": "node ./scripts/generate-stories.mjs --check",
    "stories:dry-run": "node ./scripts/generate-stories.mjs --dry-run"
}
```

Add root conveniences:

```;
json;
{
  ("scripts");
  :
  ("storybook:stories:generate");
  : "pnpm --filter @apps/storybook stories:generate",
    "storybook:stories:check": "pnpm --filter @apps/storybook stories:check",
    "storybook:stories:dry-run": "pnpm --filter @apps/storybook stories:dry-run"
}
```

Merge these without removing existing scripts.

---

# Shared Scanner Reuse

Inspect the existing registry metadata scanning implementation before writing a new parser.

Relevant existing script:

```;
txt;
apps / registry / scripts / registry -
  sync.mjs```

Reuse shared parsing logic when it is reliable.

Acceptable approaches:

1. Extract shared discovery and props parsing into:

```;
txt;
scripts / lib / component -
  discovery.mjs```

2. Create a reusable package under:

```;
txt;
packages /
  config```

only if the repository already uses that pattern.

3. Import an existing stable parser module directly.

Do not make the story bootstrapper depend on generated `;
registry.metadata.json` as its only source of truth.

The component source remains authoritative.

`;
registry.metadata.json` may be used as supplemental information where useful.

---

# Generator Report

Write:

```;
txt;
apps / storybook / story -
  generation -
  report.json```

Suggested shape:

```;
json;
{
  ("generatedAt");
  : "ISO timestamp",
  "summary":
  ("componentsScanned");
  : 0,
    "eligibleComponents": 0,
    "storiesCreated": 0,
    "storiesSkippedExisting": 0,
    "storiesSkippedManual": 0,
    "componentsUnresolved": 0
  ,
  "created": [],
  "existing": [],
  "unresolved": [],
  "errors": []
}
```

Each unresolved record should explain why:

```;
json;
{
  ("sourcePath");
  : "packages/ui/src/...",
  "exportName": "ExampleComponent",
  "reason": "Required complex props could not be safely inferred",
  "requiredProps": ["schema", "renderItem"]
}
```

---

# Error Handling

The generator must:

1. Continue scanning when one source file cannot be parsed.
2. Record parsing failures in the report.
3. Return a nonzero exit code when generation encounters fatal errors.
4. Return a nonzero exit code in `--;
check` mode when stories are missing.
5. Never leave partially written story files.
6. Write through a temporary file and rename atomically when practical.
7. Print a concise terminal summary.

Example:

```;
txt;
Story;
bootstrap;
complete;

Scanned: 418;
components;
Eligible: 286;
Created: 74;
Existing: 183;
Unresolved: 29;
Errors: 0```

---

# Formatting and Validation

After generation, run the repository formatter only against newly created or updated stories.

Then run:

```;
bash;
pnpm--;
filter;
@apps
/ bcceehkkoooprsttyy```

Then:

```;
bash;
pnpm--;
filter;
@apps
/ -bbbdikkloooooorrssttuyy```

The generator itself should be validated with:

```;
bash;
pnpm;
storybook: stories: dry -
  run```

```;
bash;
pnpm;
storybook: stories: generate--;
--folder;
primitives /
  buttons```

```;
bash;
pnpm;
storybook: stories: generate--;
--folder;
primitives /
  charts```

```;
bash;
pnpm;
storybook: stories: check```

---

# Initial Pilot Scope

Before running against the complete source tree, test against:

```;
txt;
packages / ui / src / primitives / buttons;
packages / ui / src / primitives / charts;
packages / ui / src / components / metrics -
  core```

Verify:

1. Simple button stories are useful.
2. Line chart stories render the actual component with compatible data.
3. Metric components receive reasonable defaults or clear TODOs.
4. Existing hand-authored validation stories are not overwritten.
5. Generated titles follow the folder hierarchy.
6. Aliases continue to resolve.
7. Storybook builds.

Only then run generation across all configured source roots.

---

# Acceptance Criteria

The task is complete when:

1. `;
apps / storybook / scripts / generate -
  stories.mjs` exists.
2. The script scans `;
packages / ui / src / primitives` and `;
packages /
  ui /
  src /
  components`.
3. Exported visual React components are discovered through static analysis.
4. Missing colocated `.stories.tsx` files can be generated.
5. Existing stories are skipped by default.
6. Manually edited generated stories are protected from overwrite.
7. Simple components receive useful automatic stories.
8. Known component families receive compatible templates.
9. Complex unresolved components are reported instead of falsely represented.
10. Chart stories render actual chart components.
11. `--;
check`, `--;
dry - run`, `--;
folder`, `--;
component`, and `--;
force` operate correctly.
12. A generation state file prevents destructive updates.
13. A JSON report documents created, skipped, unresolved, and failed items.
14. Generated stories pass formatting and type checking.
15. Storybook builds successfully after the pilot generation.
16. No component folders are moved.
17. No production component imports are rewritten.
18. No registry install logic is changed.
19. The implementation notes list all created and modified files.
20. The final report includes the exact validation commands and results.

---

# Final Deliverables

Provide:

1. Created files.
2. Modified files.
3. Parser or static-analysis approach selected.
4. Component discovery rules.
5. Family-template rules.
6. Overwrite-protection strategy.
7. Generation report.
8. Pilot results for buttons, charts, and metrics-core.
9. Typecheck and Storybook build results.
10. Known unresolved component patterns.
