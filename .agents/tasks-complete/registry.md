---
title: Introduction
description: Run your own code registry.
---

You can use the `shadcn` CLI to run your own code registry. Running your own registry allows you to distribute your custom components, hooks, pages, config, rules and other files to any project.

<Callout>
  **Note:** The registry works with any project type and any framework, and is
  not limited to React.
</Callout>

<figure className="flex flex-col gap-4">
  <Image
    src="/images/registry-light.png"
    width="1432"
    height="960"
    alt="Registry"
    className="mt-6 w-full overflow-hidden rounded-lg border dark:hidden"
  />
  <Image
    src="/images/registry-dark.png"
    width="1432"
    height="960"
    alt="Registry"
    className="mt-6 hidden w-full overflow-hidden rounded-lg border shadow-sm dark:block"
  />
  <figcaption className="text-center text-sm text-gray-500">
    A distribution system for code
  </figcaption>
</figure>

Ready to create your own registry? In the next section, we'll walk you through setting up your own custom registry step-by-step, from creating your first component to publishing it for others to use.

<div className="mt-6 grid gap-4 sm:grid-cols-2">
<LinkedCard
  href="/docs/registry/getting-started"
  className="items-start text-sm md:p-6"
>
  <div className="font-medium">Getting Started</div>
  <div className="text-muted-foreground">
    Set up and build your own registry
  </div>
</LinkedCard>

<LinkedCard href="/docs/registry/github" className="items-start text-sm md:p-6">
  <div className="font-medium">GitHub</div>
  <div className="text-muted-foreground">
    Turn a GitHub repository into a registry
  </div>
</LinkedCard>

<LinkedCard
  href="/docs/registry/namespace"
  className="items-start text-sm md:p-6"
>
  <div className="font-medium">Namespaces</div>
  <div className="text-muted-foreground">
    Configure registries with namespaces
  </div>
</LinkedCard>

<LinkedCard
  href="/docs/registry/authentication"
  className="items-start text-sm md:p-6"
>
  <div className="font-medium">Authentication</div>
  <div className="text-muted-foreground">
    Secure your registry with authentication
  </div>
</LinkedCard>

<LinkedCard
  href="/docs/registry/examples"
  className="items-start text-sm md:p-6"
>
  <div className="font-medium">Examples</div>
  <div className="text-muted-foreground">Browse example registry items</div>
</LinkedCard>

<LinkedCard
  href="/docs/registry/registry-json"
  className="items-start text-sm md:p-6"
>
  <div className="font-medium">Schema</div>
  <div className="text-muted-foreground">
    Schema specification for registry.json
  </div>
</LinkedCard>
</div>---
title: Introduction
description: Run your own code registry.
---

You can use the `shadcn` CLI to run your own code registry. Running your own registry allows you to distribute your custom components, hooks, pages, config, rules and other files to any project.

<Callout>
  **Note:** The registry works with any project type and any framework, and is
  not limited to React.
</Callout>

<figure className="flex flex-col gap-4">
  <Image
    src="/images/registry-light.png"
    width="1432"
    height="960"
    alt="Registry"
    className="mt-6 w-full overflow-hidden rounded-lg border dark:hidden"
  />
  <Image
    src="/images/registry-dark.png"
    width="1432"
    height="960"
    alt="Registry"
    className="mt-6 hidden w-full overflow-hidden rounded-lg border shadow-sm dark:block"
  />
  <figcaption className="text-center text-sm text-gray-500">
    A distribution system for code
  </figcaption>
</figure>

Ready to create your own registry? In the next section, we'll walk you through setting up your own custom registry step-by-step, from creating your first component to publishing it for others to use.

<div className="mt-6 grid gap-4 sm:grid-cols-2">
<LinkedCard
  href="/docs/registry/getting-started"
  className="items-start text-sm md:p-6"
>
  <div className="font-medium">Getting Started</div>
  <div className="text-muted-foreground">
    Set up and build your own registry
  </div>
</LinkedCard>

<LinkedCard href="/docs/registry/github" className="items-start text-sm md:p-6">
  <div className="font-medium">GitHub</div>
  <div className="text-muted-foreground">
    Turn a GitHub repository into a registry
  </div>
</LinkedCard>

<LinkedCard
  href="/docs/registry/namespace"
  className="items-start text-sm md:p-6"
>
  <div className="font-medium">Namespaces</div>
  <div className="text-muted-foreground">
    Configure registries with namespaces
  </div>
</LinkedCard>

<LinkedCard
  href="/docs/registry/authentication"
  className="items-start text-sm md:p-6"
>
  <div className="font-medium">Authentication</div>
  <div className="text-muted-foreground">
    Secure your registry with authentication
  </div>
</LinkedCard>

<LinkedCard
  href="/docs/registry/examples"
  className="items-start text-sm md:p-6"
>
  <div className="font-medium">Examples</div>
  <div className="text-muted-foreground">Browse example registry items</div>
</LinkedCard>

<LinkedCard
  href="/docs/registry/registry-json"
  className="items-start text-sm md:p-6"
>
  <div className="font-medium">Schema</div>
  <div className="text-muted-foreground">
    Schema specification for registry.json
  </div>
</LinkedCard>
</div>



---
title: Getting Started
description: Learn how to get setup and run your own component registry.
---

This guide will walk you through the process of setting up your own registry. It assumes you already have a project with components, hooks, utilities or other files you would like to distribute.

**If you have an existing public GitHub repository, you can turn it into a
registry by adding a `registry.json` file at the root.** See
[GitHub Registries](/docs/registry/github) for details.

If you're starting a new registry project, you can use the [registry template](https://github.com/shadcn-ui/registry-template) as a starting point. We have already configured it for you.

## Requirements

You are free to design and publish your custom registry as you see fit. The only requirement is that your registry catalog and registry items must conform to the [registry schema specification](/docs/registry/registry-json) and [registry-item schema specification](/docs/registry/registry-item-json).

Your registry can be a Next.js, Vite, Vue, Svelte, PHP or any other framework as long as it supports serving JSON over HTTP. It can also be a public GitHub repository with a `registry.json` file at the root.

If you'd like to see an example of a registry, we have a [template project](https://github.com/shadcn-ui/registry-template) for you to use as a starting point.

## registry.json

The `registry.json` is the entry point for the registry. It contains the registry's name, homepage, and defines all the items present in the registry.

Your registry must have this file (or JSON payload) present at the root of the registry endpoint. The registry endpoint is the URL where your registry is hosted.

Here's an example `registry.json` file:

```json title="registry.json" showLineNumbers
{
  "$schema": "https://ui.shadcn.com/schema/registry.json",
  "name": "acme",
  "homepage": "https://acme.com",
  "items": [
    {
      "name": "button",
      "type": "registry:ui",
      "title": "Button",
      "description": "A simple button component.",
      "files": [
        {
          "path": "components/ui/button.tsx",
          "type": "registry:ui"
        }
      ]
    }
  ]
}
```

## Structure your registry

You can structure your source registry in one of two ways:

- Define all items in a single root `registry.json`.
- Use a root `registry.json` with `include` to compose multiple `registry.json` files.

### Option A: Single registry.json

Create a `registry.json` file in the root of your project. Add all your registry items to the `items` array. This is the simplest way to define a registry.

```json title="registry.json" showLineNumbers
{
  "$schema": "https://ui.shadcn.com/schema/registry.json",
  "name": "acme",
  "homepage": "https://acme.com",
  "items": [
    {
      "name": "button",
      "type": "registry:ui",
      "title": "Button",
      "description": "A simple button component.",
      "files": [
        {
          "path": "components/ui/button.tsx",
          "type": "registry:ui"
        }
      ]
    },
    {
      "name": "hello-world",
      "type": "registry:block",
      "title": "Hello World",
      "description": "A simple hello world component.",
      "registryDependencies": ["button"],
      "files": [
        {
          "path": "registry/default/hello-world/hello-world.tsx",
          "type": "registry:component"
        }
      ]
    }
  ]
}
```

This `registry.json` file must conform to the [registry schema specification](/docs/registry/registry-json).

### Option B: Using include

For larger registries, you can use `include` to compose your source registry
from multiple `registry.json` files.

```txt
registry.json
components
└── ui
    ├── button.tsx
    ├── input.tsx
    └── registry.json
hooks
├── registry.json
├── use-media-query.ts
└── use-toggle.ts
```

The root `registry.json` defines the registry metadata and includes the nested
registry files.

{/* prettier-ignore */}
```json title="registry.json" showLineNumbers
{
  "$schema": "https://ui.shadcn.com/schema/registry.json",
  "name": "acme",
  "homepage": "https://acme.com",
  "include": [
    "components/ui/registry.json",
    "hooks/registry.json"
  ]
}
```

Included `registry.json` files are valid registry files for composition and may
omit `name` and `homepage`. Only the root `registry.json` must define the
registry metadata.

```json title="components/ui/registry.json" showLineNumbers
{
  "$schema": "https://ui.shadcn.com/schema/registry.json",
  "items": [
    {
      "name": "button",
      "type": "registry:ui",
      "files": [
        {
          "path": "button.tsx",
          "type": "registry:ui"
        }
      ]
    },
    {
      "name": "input",
      "type": "registry:ui",
      "files": [
        {
          "path": "input.tsx",
          "type": "registry:ui"
        }
      ]
    }
  ]
}
```

```json title="hooks/registry.json" showLineNumbers
{
  "$schema": "https://ui.shadcn.com/schema/registry.json",
  "items": [
    {
      "name": "use-toggle",
      "type": "registry:hook",
      "files": [
        {
          "path": "use-toggle.ts",
          "type": "registry:hook"
        }
      ]
    },
    {
      "name": "use-media-query",
      "type": "registry:hook",
      "files": [
        {
          "path": "use-media-query.ts",
          "type": "registry:hook"
        }
      ]
    }
  ]
}
```

When using `include`, file paths are relative to the `registry.json` file that
declares the item.

## Add an item

### Create a UI component

Add your first item. Here's an example of a simple `<Button />` component:

```tsx title="components/ui/button.tsx" showLineNumbers
import * as React from "react"

export function Button(props: React.ComponentProps<"button">) {
  return (
    <button
      {...props}
      className="rounded-md bg-neutral-900 px-4 py-2 text-sm font-medium text-white"
    />
  )
}
```

<Callout className="mt-6">
  **Note:** This example places the component in the `components/ui` directory.
  You can place it anywhere in your project as long as you set the correct path
  in the `registry.json` file.
</Callout>

```txt
components
└── ui
    └── button.tsx
```

### Add the item to the registry

To add your component to the registry, add an item definition to `registry.json`.
If you are using `include`, add the item to the included `registry.json` file
that owns the component. For example, add a UI component to
`components/ui/registry.json`.

```json title="registry.json" showLineNumbers {6-17}
{
  "$schema": "https://ui.shadcn.com/schema/registry.json",
  "name": "acme",
  "homepage": "https://acme.com",
  "items": [
    {
      "name": "button",
      "type": "registry:ui",
      "title": "Button",
      "description": "A simple button component.",
      "files": [
        {
          "path": "components/ui/button.tsx",
          "type": "registry:ui"
        }
      ]
    }
  ]
}
```

You define your registry item by adding a `name`, `type`, `title`, `description` and `files`.

For every file you add, you must specify the `path` and `type` of the file. In a single-file registry, the `path` is relative to the root of your project. When using `include`, the `path` is relative to the `registry.json` file that declares the item. The `type` is the type of the file.

You can read more about the registry item schema and file types in the [registry item schema docs](/docs/registry/registry-item-json).

## Serve your registry

You can serve your registry as static JSON files or from dynamic route handlers.

### Option A: Static JSON files

Run the build command to generate static registry JSON files.

```bash
npx shadcn@latest build
```

If your source registry uses `include`, `shadcn build` resolves the included
registries and writes a flattened registry to your output directory. The
generated `registry.json` does not contain `include`.

<Callout className="mt-6">
  **Note:** By default, the build command will generate the registry JSON files
  in `public/r` e.g `public/r/button.json`. You can change the output directory by passing the `--output` option. See the [shadcn build command](/docs/cli#build) for more information.

</Callout>

If you're running your registry on Next.js, you can serve these files by running
the `next` server. The command might differ for other frameworks.

```bash
npm run dev
```

Your files will now be served at `http://localhost:3000/r/[NAME].json` eg. `http://localhost:3000/r/button.json`.

### Option B: Dynamic route handlers

If you want to serve registry JSON from your source `registry.json` at request
time, use the producer-side loader APIs from `shadcn/registry`.

Install `shadcn` as a runtime dependency:

```bash
npm install shadcn
```

Use `loadRegistry` to serve the registry catalog.

```ts title="app/r/registry.json/route.ts" showLineNumbers
import { loadRegistry } from "shadcn/registry"

export async function GET() {
  try {
    const registry = await loadRegistry()

    return Response.json(registry)
  } catch (error) {
    console.error(error)

    return Response.json({ error: "Failed to load registry." }, { status: 500 })
  }
}
```

Use `loadRegistryItem` to serve individual registry items.

```ts title="app/r/[name].json/route.ts" showLineNumbers
import { loadRegistryItem, RegistryItemNotFoundError } from "shadcn/registry"

export async function GET(
  _request: Request,
  context: {
    params: Promise<{
      name: string
    }>
  }
) {
  const { name } = await context.params

  try {
    const item = await loadRegistryItem(name)

    return Response.json(item)
  } catch (error) {
    if (error instanceof RegistryItemNotFoundError) {
      return Response.json(
        { error: `Registry item "${name}" was not found.` },
        { status: 404 }
      )
    }

    console.error(error)

    return Response.json(
      { error: "Failed to load registry item." },
      { status: 500 }
    )
  }
}
```

Both loaders resolve `include` before returning JSON, so route handlers can use
the same source `registry.json` structure without running `shadcn build`.

<Accordion type="single" collapsible>
  <AccordionItem value="content-negotiation">
    <AccordionTrigger>Content negotiation</AccordionTrigger>
    <AccordionContent>

The `shadcn` CLI supports **HTTP Content Negotiation**. This allows you to host your registry at any endpoint — including the root of your domain — and serve different content depending on who is asking.

From a single URL, you can serve:

<ul>
  <li>
    <strong>HTML</strong> to browsers — a landing page, documentation, or
    marketing site.
  </li>
  <li>
    <strong>JSON</strong> to the <code>shadcn</code> CLI — an installable
    registry item.
  </li>
  <li>
    <strong>Markdown</strong> to AI agents and LLMs — a machine-readable version
    of your content.
  </li>
</ul>

The client signals its preference using the `Accept` request header, and your server decides what to return.

#### Request headers

When the CLI makes a request to a registry, it sends the following headers:

- **User-Agent**: `shadcn`
- **Accept**: `application/vnd.shadcn.v1+json, application/json;q=0.9`

#### Root hosting

By checking these headers on your server, you can route CLI traffic to an installable registry item while keeping browser traffic flowing to your documentation or homepage.

The examples below assume your built registry item is served at `/r/index.json`. Adjust the path to match your output.

In Next.js, express this as a rewrite in `next.config.ts`. This keeps the negotiation in the routing layer and avoids a Proxy function for this static rewrite:

```typescript title="next.config.ts" showLineNumbers
import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  async rewrites() {
    return {
      beforeFiles: [
        {
          source: "/",
          has: [
            {
              type: "header",
              key: "accept",
              value: "(.*)application/vnd\\.shadcn\\.v1\\+json(.*)",
            },
          ],
          destination: "/r/index.json",
        },
        {
          source: "/",
          has: [
            {
              type: "header",
              key: "user-agent",
              value: "shadcn",
            },
          ],
          destination: "/r/index.json",
        },
      ],
    }
  },
  async headers() {
    return [
      {
        source: "/",
        headers: [{ key: "Vary", value: "Accept, User-Agent" }],
      },
    ]
  },
}

export default nextConfig
```

Or, in an Express.js server:

```javascript title="server.js" showLineNumbers
app.get("/", (req, res) => {
  res.vary("Accept")
  res.vary("User-Agent")

  // Check if the client prefers the shadcn vendor type.
  if (req.accepts("application/vnd.shadcn.v1+json")) {
    return res.json(registryData)
  }

  // Optional: Secondary check for the User-Agent.
  if (req.get("User-Agent") === "shadcn") {
    return res.json(registryData)
  }

  // Otherwise, serve your documentation or homepage.
  res.send(htmlContent)
})
```

This enables:

<ul>
  <li>
    <strong>Branded Registry URLs</strong>:{" "}
    <code>shadcn add https://ui.example.com</code>
  </li>
  <li>
    <strong>Shorter URLs</strong>: Users type your domain root, not{" "}
    <code>/r/</code> or <code>/registry/</code> sub-paths.
  </li>
  <li>
    <strong>Easy Mnemonics</strong>: Easier for users to remember and share your
    registry.
  </li>
</ul>

      </AccordionContent>

    </AccordionItem>

</Accordion>

## Test your registry

After your registry is being served, test it with the same CLI commands that
other developers will use.

### Using URL

Use the catalog URL for commands that discover items, like `list` and `search`.
Use item URLs for commands that read or install a specific item, like `view` and
`add`.

#### List items

Start by confirming that the registry catalog can be discovered.

```bash
npx shadcn@latest list http://localhost:3000/r/registry.json
```

#### Search items

Search the registry by query.

```bash
npx shadcn@latest search http://localhost:3000/r/registry.json --query button
```

#### View an item

Then view one registry item by name.

```bash
npx shadcn@latest view http://localhost:3000/r/button.json
```

#### Add an item

To test the install flow, run `add` from a project where you want to install the
item.

```bash
npx shadcn@latest add http://localhost:3000/r/button.json
```

### Using namespace

#### Add the registry

You can also test your registry with a namespace. From a project with a
`components.json` file, add your registry URL template to the project.

```bash
npx shadcn@latest registry add @acme=http://localhost:3000/r/{name}.json
```

The `{name}` placeholder must resolve to an item JSON file. For example,
`@acme/button` resolves to `http://localhost:3000/r/button.json`. The catalog is
still served separately at `http://localhost:3000/r/registry.json`.

#### List items

Then list the items in your registry.

```bash
npx shadcn@latest list @acme
```

#### Search items

Search the registry by query.

```bash
npx shadcn@latest search @acme --query button
```

#### View an item

View one registry item by name.

```bash
npx shadcn@latest view @acme/button
```

#### Add an item

To test the install flow, run `add` from a project where you want to install the
item.

```bash
npx shadcn@latest add @acme/button
```

See the [Namespaced Registries](/docs/registry/namespace) docs for more
information.

## Publish your registry

To make your registry available to other developers, publish your project to a
public URL. Once deployed, users can install items directly from item URLs, or
they can add your registry as a namespace in their project.

### Share namespace setup instructions

If you want users to install items with a namespace like `@acme/button`, tell
them to add your registry URL template to their project. The `{name}`
placeholder is replaced by the item name when the CLI resolves the registry
item.

The template must resolve to item JSON files. For example, `@acme/button`
resolves to `https://acme.com/r/button.json`. Your registry catalog should still
be served separately at `https://acme.com/r/registry.json`.

They can add the namespace with the CLI.

```bash
npx shadcn@latest registry add @acme=https://acme.com/r/{name}.json
```

Or they can add it manually under the `registries` field in their
`components.json` file.

```json title="components.json" showLineNumbers
{
  "registries": {
    "@acme": "https://acme.com/r/{name}.json"
  }
}
```

Users can then consume items from your registry by namespace.

```bash
npx shadcn@latest add @acme/button
```

### Add your namespace to the registry index

If your registry is open source and publicly available, you can submit your
namespace to the official registry index. This lets users add your namespace by
name instead of pasting the full URL template.

See the [Registry Index](/docs/registry/registry-index) docs for the submission
requirements.

## Guidelines

Here are some guidelines to follow when building components for a registry.

- Place your registry item in the `registry/[STYLE]/[NAME]` directory. I'm using `default` as an example. It can be anything you want as long as it's nested under the `registry` directory.
- For blocks, the following properties are required: `name`, `description`, `type` and `files`.
- It is recommended to add a proper name and description to your registry item. This helps LLMs understand the component and its purpose.
- Make sure to list all registry dependencies in `registryDependencies`. A registry dependency is an item address such as `button`, `@acme/input-form`, `acme/ui/button` or `http://localhost:3000/r/editor.json`.
- Make sure to list all dependencies in `dependencies`. A dependency is the name of the package in the registry eg. `zod`, `sonner`, etc. To set a version, you can use the `name@version` format eg. `zod@^3.20.0`.
- **Imports should always use the `@/registry` path.** eg. `import { HelloWorld } from "@/registry/default/hello-world/hello-world"`
- Ideally, place your files within a registry item in `components`, `hooks`, `lib` directories.




---
title: GitHub Registries
description: Use a public GitHub repository as a registry.
---

You can now turn **any public GitHub repository into a registry.**

Add a `registry.json` file to the root of the repo, describe the files you want
to share, and users can install them with the `shadcn` CLI.

```bash
npx shadcn@latest add <username>/<repo>/<item>
```

You do not need to set up a registry server or publish generated JSON files. **The GitHub repository becomes the source registry.**

## Distribute Anything

Registry items are **not limited to components or React code.** They can include
any files from your repository: source files, configuration, docs, templates,
workflows, rules or project conventions.

<div className="not-prose my-6 overflow-hidden rounded-lg border text-sm">
  <div className="hidden grid-cols-[220px_1fr] border-b bg-muted/50 px-4 py-3 font-medium md:grid">
    <div>Use case</div>
    <div>Example files</div>
  </div>
  {[
    ["Components", "components/date-picker.tsx", "components/data-table.tsx"],
    [
      "Helpers and utilities",
      "lib/format-date.ts",
      "lib/cn.ts",
      "hooks/use-copy.ts",
    ],
    [
      "Design system packages",
      "tokens/colors.json",
      "styles/theme.css",
      "components/*",
    ],
    [
      "Feature kits",
      "app/(auth)/*",
      "lib/auth.ts",
      "components/login-form.tsx",
    ],
    ["Agent workflows", "AGENTS.md", ".cursor/rules/*", ".claude/commands/*"],
    [
      "Project conventions",
      ".editorconfig",
      "biome.json",
      "docs/conventions.md",
    ],
    [
      "Codemods and migration kits",
      "codemods/*",
      "scripts/migrate.ts",
      "docs/migration.md",
    ],
    ["Testing setup", "vitest.config.ts", "test/setup.ts", "docs/testing.md"],
    [
      "CI and release workflows",
      ".github/workflows/ci.yml",
      ".github/workflows/release.yml",
    ],
    [
      "Project automation",
      "scripts/release.ts",
      "scripts/checks.ts",
      "docs/automation.md",
    ],
    [
      "Issue and pull request templates",
      ".github/ISSUE_TEMPLATE/*",
      ".github/pull_request_template.md",
    ],
    ["MCP configuration", ".mcp.json", ".cursor/mcp.json"],
  ].map(([label, ...files]) => (
    <div
      className="grid gap-2 border-b px-4 py-3 last:border-b-0 md:grid-cols-[220px_1fr]"
      key={label}
    >
      <div className="font-medium">{label}</div>
      <div className="flex min-w-0 flex-wrap gap-1.5">
        {files.map((file) => (
          <code key={file}>{file}</code>
        ))}
      </div>
    </div>
  ))}
</div>

## When to use GitHub

Use a GitHub registry when:

- You already have reusable code in a public GitHub repository.
- You want users to install directly from `owner/repo/item`.
- You want to distribute config files, rules, docs, templates, utilities or
  any other files from the same repository.
- You do not need private repo access or custom request authentication.

## Requirements

A GitHub registry must:

- Be a public `github.com` repository.
- Have a `registry.json` file at the repository root.
- Use valid `registry.json` and `registry-item.json` schemas.
- Reference source files that exist in the repository.

Private repositories and GitHub Enterprise hosts are not currently supported by
GitHub addresses. For private or authenticated registries, use a
[namespace](/docs/registry/namespace) with
[authentication](/docs/registry/authentication).

## Step 1: Add registry.json

Given an existing public repository:

```txt
.
├── ...
├── .editorconfig
├── AGENTS.md
└── docs
    └── conventions.md
```

Add `registry.json` at the root of the repository.

```txt
.
├── ...
├── registry.json
├── .editorconfig
├── AGENTS.md
└── docs
    └── conventions.md
```

Define the item you want to distribute.

```json title="registry.json" showLineNumbers
{
  "$schema": "https://ui.shadcn.com/schema/registry.json",
  "name": "acme-toolkit",
  "homepage": "https://github.com/acme/toolkit",
  "items": [
    {
      "name": "project-conventions",
      "type": "registry:item",
      "title": "Project Conventions",
      "description": "Shared project conventions, editor settings and agent instructions.",
      "files": [
        {
          "path": "AGENTS.md",
          "type": "registry:file",
          "target": "~/AGENTS.md"
        },
        {
          "path": ".editorconfig",
          "type": "registry:file",
          "target": "~/.editorconfig"
        },
        {
          "path": "docs/conventions.md",
          "type": "registry:file",
          "target": "~/docs/conventions.md"
        }
      ]
    }
  ]
}
```

Commit and push the file.

```bash
git add registry.json
```

```bash
git commit -m "add registry"
```

```bash
git push
```

Users can now install the item from GitHub.

```bash
npx shadcn@latest add acme/toolkit/project-conventions
```

## Step 2: Distribute any file

A registry item can install one file or many files. Use the `files` array to
declare the files that belong together.

For example, a testing setup can install a Vitest config, a setup file and a
short team guide.

```txt
registry.json
config
└── vitest.config.ts
docs
└── testing.md
test
└── setup.ts
```

```json title="registry.json" showLineNumbers
{
  "$schema": "https://ui.shadcn.com/schema/registry.json",
  "name": "acme-toolkit",
  "homepage": "https://github.com/acme/toolkit",
  "items": [
    {
      "name": "vitest-setup",
      "type": "registry:item",
      "title": "Vitest Setup",
      "description": "A Vitest setup with project defaults and docs.",
      "files": [
        {
          "path": "config/vitest.config.ts",
          "type": "registry:file",
          "target": "~/vitest.config.ts"
        },
        {
          "path": "test/setup.ts",
          "type": "registry:file",
          "target": "~/test/setup.ts"
        },
        {
          "path": "docs/testing.md",
          "type": "registry:file",
          "target": "~/docs/testing.md"
        }
      ]
    }
  ]
}
```

Users install it the same way.

```bash
npx shadcn@latest add acme/toolkit/vitest-setup
```

Use `target` when a file should be written to a specific destination in the
user's project.

```json title="registry.json" showLineNumbers
{
  "$schema": "https://ui.shadcn.com/schema/registry.json",
  "name": "acme-toolkit",
  "homepage": "https://github.com/acme/toolkit",
  "items": [
    {
      "name": "editorconfig",
      "type": "registry:file",
      "files": [
        {
          "path": "config/.editorconfig",
          "type": "registry:file",
          "target": "~/.editorconfig"
        }
      ]
    }
  ]
}
```

```bash
npx shadcn@latest add acme/toolkit/editorconfig
```

## Step 3: Validate the registry

Before sharing the registry, validate it from the CLI.

```bash
npx shadcn@latest registry validate acme/toolkit
```

The command reads the root `registry.json`, resolves includes, validates the
registry items, and checks that referenced files exist.

You can also validate a branch, tag or commit SHA.

```bash
npx shadcn@latest registry validate acme/toolkit#v1.0.0
```

## Step 4: List and search items

Use `list` to see every item in the repository registry.

```bash
npx shadcn@latest list acme/toolkit
```

Use `search` to filter the catalog.

```bash
npx shadcn@latest search acme/toolkit --query conventions
```

Use `view` to inspect one item payload.

```bash
npx shadcn@latest view acme/toolkit/project-conventions
```

## Organize with include

For larger repositories, keep item definitions close to the source files they
describe.

```txt
registry.json
config
├── prettier.config.mjs
└── registry.json
rules
├── agent.md
└── registry.json
```

The root `registry.json` can include the nested registry files.

```json title="registry.json" showLineNumbers
{
  "$schema": "https://ui.shadcn.com/schema/registry.json",
  "name": "acme-toolkit",
  "homepage": "https://github.com/acme/toolkit",
  "include": ["config/registry.json", "rules/registry.json"]
}
```

The included registry file declares items for that directory.

```json title="rules/registry.json" showLineNumbers
{
  "$schema": "https://ui.shadcn.com/schema/registry.json",
  "items": [
    {
      "name": "agent-rules",
      "type": "registry:file",
      "files": [
        {
          "path": "agent.md",
          "type": "registry:file",
          "target": "~/AGENTS.md"
        }
      ]
    }
  ]
}
```

When using `include`, file paths are relative to the `registry.json` file that
declares the item.

```bash
npx shadcn@latest add acme/toolkit/project-conventions
```

## Registry dependencies

Use `registryDependencies` when one registry item depends on another registry
item.

### Same repository dependencies

For dependencies in the same GitHub repository, use the full GitHub item
address.

```json title="registry.json" showLineNumbers
{
  "$schema": "https://ui.shadcn.com/schema/registry.json",
  "name": "acme-toolkit",
  "homepage": "https://github.com/acme/toolkit",
  "items": [
    {
      "name": "project-setup",
      "type": "registry:item",
      "registryDependencies": [
        "acme/toolkit/agent-rules",
        "acme/toolkit/prettier-config",
        "acme/toolkit/tsconfig"
      ],
      "files": [
        {
          "path": "docs/project-setup.md",
          "type": "registry:file",
          "target": "~/docs/project-setup.md"
        }
      ]
    }
  ]
}
```

A docs item can depend on a template item from the same repository.

```json title="registry.json" showLineNumbers
{
  "$schema": "https://ui.shadcn.com/schema/registry.json",
  "name": "acme-toolkit",
  "homepage": "https://github.com/acme/toolkit",
  "items": [
    {
      "name": "contributing-guide",
      "type": "registry:item",
      "registryDependencies": ["acme/toolkit/readme-template"],
      "files": [
        {
          "path": "docs/contributing.md",
          "type": "registry:file",
          "target": "~/docs/contributing.md"
        }
      ]
    }
  ]
}
```

A CI setup can depend on the same formatting and testing defaults that users can
install separately.

```json title="registry.json" showLineNumbers
{
  "$schema": "https://ui.shadcn.com/schema/registry.json",
  "name": "acme-toolkit",
  "homepage": "https://github.com/acme/toolkit",
  "items": [
    {
      "name": "ci-setup",
      "type": "registry:item",
      "registryDependencies": [
        "acme/toolkit/prettier-config",
        "acme/toolkit/vitest-setup"
      ],
      "files": [
        {
          "path": ".github/workflows/ci.yml",
          "type": "registry:file",
          "target": "~/.github/workflows/ci.yml"
        }
      ]
    }
  ]
}
```

### External registry dependencies

Items can also depend on external registries. Use the full item address for the
registry that owns the dependency.

```json title="registry.json" showLineNumbers
{
  "$schema": "https://ui.shadcn.com/schema/registry.json",
  "name": "acme-toolkit",
  "homepage": "https://github.com/acme/toolkit",
  "items": [
    {
      "name": "workspace-setup",
      "type": "registry:item",
      "registryDependencies": [
        "@acme/tsconfig",
        "contoso/devtools/prettier-config"
      ],
      "files": [
        {
          "path": "docs/workspace.md",
          "type": "registry:file",
          "target": "~/docs/workspace.md"
        }
      ]
    }
  ]
}
```

### Dependency refs

Refs are not inherited across dependencies. If a dependency should be pinned,
include its own ref.

```json title="registry.json" showLineNumbers
{
  "$schema": "https://ui.shadcn.com/schema/registry.json",
  "name": "acme-toolkit",
  "homepage": "https://github.com/acme/toolkit",
  "items": [
    {
      "name": "project-setup",
      "type": "registry:item",
      "registryDependencies": [
        "acme/toolkit/agent-rules#v1.0.0",
        "acme/toolkit/tsconfig#c0ffee254729296a45d6691db565cf707a3fef5d"
      ],
      "files": [
        {
          "path": "docs/project-setup.md",
          "type": "registry:file",
          "target": "~/docs/project-setup.md"
        }
      ]
    }
  ]
}
```

## Useful commands

List every item in a GitHub registry.

```bash
npx shadcn@latest list acme/toolkit
```

Search a GitHub registry.

```bash
npx shadcn@latest search acme/toolkit -q conventions
```

Validate a GitHub registry.

```bash
npx shadcn@latest registry validate acme/toolkit
```

Install an item from a GitHub registry.

```bash
npx shadcn@latest add acme/toolkit/project-conventions
```

View an item from a GitHub registry.

```bash
npx shadcn@latest view acme/toolkit/project-conventions
```

Install an item whose registry item name contains `/`.

```bash
npx shadcn@latest add acme/toolkit/rules/agent
```

<Callout>
  For GitHub item addresses, the first two path segments are the GitHub owner
  and repository. Any remaining segments are the registry item name, not a file
  path. An address ending in `.json` is treated as a file path.
</Callout>

Install from a tag.

```bash
npx shadcn@latest add acme/toolkit/project-conventions#v1.0.0
```

Install from a full commit SHA.

```bash
npx shadcn@latest add acme/toolkit/project-conventions#c0ffee254729296a45d6691db565cf707a3fef5d
```

## Refs

Use `#ref` to install from a branch, tag or commit SHA.

```bash
npx shadcn@latest add acme/toolkit/project-conventions#main
```

Refs may contain slashes.

```bash
npx shadcn@latest add acme/toolkit/project-conventions#feature/conventions
```

If no ref is provided, the CLI uses the repository default branch.

The CLI uses Git to resolve branches, tags and short refs into a commit SHA
before reading files. Full 40-character commit SHAs are used directly and do not
require Git.

## Review before installing

GitHub registry items install code and project files from public repositories.
Treat a GitHub item address like any other third-party code dependency.

Before installing from a source you do not control:

- Review the repository and the root `registry.json`.
- Review the item definition, especially `files`, `target`, `dependencies`,
  `devDependencies`, `registryDependencies` and `envVars`.
- Check any external registry dependencies. They can install files from other
  registries.
- Prefer pinned refs for published install commands. A full 40-character commit
  SHA is the most reproducible option.
- Use `shadcn view acme/toolkit/project-conventions` to inspect the resolved
  item payload before installing.
- Pipe `shadcn view` output to your agent or review tool if you want help
  checking the item.
- Use `shadcn add acme/toolkit/project-conventions --dry-run` to preview an
  install without writing files.
- Use `--diff` or `--view` with `shadcn add` to inspect file changes or file
  contents before applying them.




  ---
title: Namespaces
description: Configure and use multiple resource registries with namespace support.
---

Namespaced registries let you configure multiple resource sources in one project. This means you can install components, libraries, utilities, AI prompts, configuration files, and other resources from various registries, whether they're public, third-party, or your own custom private libraries.

## Table of Contents

- [Overview](#overview)
- [Decentralized Namespace System](#decentralized-namespace-system)
- [Getting Started](#getting-started)
- [Registry Naming Convention](#registry-naming-convention)
- [Configuration](#configuration)
- [Authentication & Security](#authentication--security)
- [Versioning](#versioning)
- [Dependency Resolution](#dependency-resolution)
- [Built-in Registries](#built-in-registries)
- [CLI Commands](#cli-commands)
- [Error Handling](#error-handling)
- [Creating Your Own Registry](#creating-your-own-registry)
- [Example Configurations](#example-configurations)
- [Technical Details](#technical-details)
- [Best Practices](#best-practices)
- [Troubleshooting](#troubleshooting)

---

## Overview

Registry namespaces are prefixed with `@` and provide a way to organize and reference resources from different sources. Resources can be any type of content: components, libraries, utilities, hooks, AI prompts, configuration files, themes, and more. For example:

- `@shadcn/button` - UI component from the shadcn registry
- `@v0/dashboard` - Dashboard component from the v0 registry
- `@ai-elements/input` - AI prompt input from an AI elements registry
- `@acme/auth-utils` - Authentication utilities from your company's private registry
- `@ai/chatbot-rules` - AI prompt rules from an AI resources registry
- `@themes/dark-mode` - Theme configuration from a themes registry

---

## Decentralized Namespace System

We intentionally designed the namespace system to be decentralized. There is a [central open source registry index](/docs/registry/registry-index) for open source namespaces but you are free to create and use any namespace you want.

This decentralized approach gives you complete flexibility to organize your resources however makes sense for your organization.

You can create multiple registries for different purposes:

```json title="components.json" showLineNumbers
{
  "registries": {
    "@acme-ui": "https://registry.acme.com/ui/{name}.json",
    "@acme-docs": "https://registry.acme.com/docs/{name}.json",
    "@acme-ai": "https://registry.acme.com/ai/{name}.json",
    "@acme-themes": "https://registry.acme.com/themes/{name}.json",
    "@acme-internal": {
      "url": "https://internal.acme.com/registry/{name}.json",
      "headers": {
        "Authorization": "Bearer ${INTERNAL_TOKEN}"
      }
    }
  }
}
```

This allows you to:

- **Organize by type**: Separate UI components, documentation, AI resources, etc.
- **Organize by team**: Different teams can maintain their own registries
- **Organize by visibility**: Public vs. private resources
- **Organize by version**: Stable vs. experimental registries
- **No naming conflicts**: Since there's no central authority, you don't need to worry about namespace collisions

### Examples of Multi-Registry Setups

#### By Resource Type

```json title="components.json" showLineNumbers
{
  "@components": "https://cdn.company.com/components/{name}.json",
  "@hooks": "https://cdn.company.com/hooks/{name}.json",
  "@utils": "https://cdn.company.com/utils/{name}.json",
  "@prompts": "https://cdn.company.com/ai-prompts/{name}.json"
}
```

#### By Team or Department

```json title="components.json" showLineNumbers
{
  "@design": "https://create.company.com/registry/{name}.json",
  "@engineering": "https://eng.company.com/registry/{name}.json",
  "@marketing": "https://marketing.company.com/registry/{name}.json"
}
```

#### By Stability

```json title="components.json" showLineNumbers
{
  "@stable": "https://registry.company.com/stable/{name}.json",
  "@latest": "https://registry.company.com/beta/{name}.json",
  "@experimental": "https://registry.company.com/experimental/{name}.json"
}
```

---

## Getting Started

### Installing Resources

Once configured, you can install resources using the namespace syntax:

```bash
npx shadcn@latest add @v0/dashboard
```

or multiple resources at once:

```bash
npx shadcn@latest add @acme/header @lib/auth-utils @ai/chatbot-rules
```

### Quick Configuration

Add registries to your `components.json`:

```json title="components.json"
{
  "registries": {
    "@v0": "https://v0.dev/chat/b/{name}",
    "@acme": "https://registry.acme.com/resources/{name}.json"
  }
}
```

Then start installing:

```bash
npx shadcn@latest add @acme/button
```

---

## Registry Naming Convention

Registry names must follow these rules:

- Start with `@` symbol
- Contain only alphanumeric characters, hyphens, and underscores
- Examples of valid names: `@v0`, `@acme-ui`, `@my_company`

The pattern for referencing resources is: `@namespace/resource-name`

---

## GitHub and Namespaces

GitHub registry addresses and namespaces solve different problems.

Use a GitHub address when the registry is a public GitHub repository and you
want users to install without configuring `components.json`.

```bash
npx shadcn@latest add acme/ui/button
```

Use a namespace when you want a stable alias, custom hosting, authentication,
request headers, query parameters or private registry support.

```bash
npx shadcn@latest add @acme/button
```

See the [GitHub registry](/docs/registry/github) docs for more information.

---

## Configuration

Namespaced registries are configured in your `components.json` file under the `registries` field.

### Basic Configuration

The simplest way to configure a registry is with a URL template string:

```json title="components.json"
{
  "registries": {
    "@v0": "https://v0.dev/chat/b/{name}",
    "@acme": "https://registry.acme.com/resources/{name}.json",
    "@lib": "https://lib.company.com/utilities/{name}",
    "@ai": "https://ai-resources.com/r/{name}.json"
  }
}
```

> **Note:** The `{name}` placeholder in the URL is automatically parsed and replaced with the resource name when you run `npx shadcn@latest add @namespace/resource-name`. For example, `@acme/button` becomes `https://registry.acme.com/resources/button.json`. See [URL Pattern System](#url-pattern-system) for more details.

### Advanced Configuration

For registries that require authentication or additional parameters, use the object format:

```json title="components.json"
{
  "registries": {
    "@private": {
      "url": "https://api.company.com/registry/{name}.json",
      "headers": {
        "Authorization": "Bearer ${REGISTRY_TOKEN}",
        "X-API-Key": "${API_KEY}"
      },
      "params": {
        "version": "latest",
        "format": "json"
      }
    }
  }
}
```

> **Note:** Environment variables in the format `${VAR_NAME}` are automatically expanded from your environment (process.env). This works in URLs, headers, and params. For example, `${REGISTRY_TOKEN}` will be replaced with the value of `process.env.REGISTRY_TOKEN`. See [Authentication & Security](#authentication--security) for more details on using environment variables.

---

### URL Pattern System

Registry URLs support the following placeholders:

### `{name}` Placeholder (required)

The `{name}` placeholder is replaced with the resource name:

```json title="components.json" showLineNumbers
{
  "@acme": "https://registry.acme.com/{name}.json"
}
```

When installing `@acme/button`, the URL becomes: `https://registry.acme.com/button.json`
When installing `@acme/auth-utils`, the URL becomes: `https://registry.acme.com/auth-utils.json`

### `{style}` Placeholder (optional)

The `{style}` placeholder is replaced with the current style configuration:

```json
{
  "@themes": "https://registry.example.com/{style}/{name}.json"
}
```

With style set to `new-york`, installing `@themes/card` resolves to: `https://registry.example.com/new-york/card.json`

The style placeholder is optional. Use this when you want to serve different versions of the same resource. For example, you can serve a different version of a component for each style.

---

## Authentication & Security

### Environment Variables

Use environment variables to securely store credentials:

```json title="components.json"
{
  "registries": {
    "@private": {
      "url": "https://api.company.com/registry/{name}.json",
      "headers": {
        "Authorization": "Bearer ${REGISTRY_TOKEN}"
      }
    }
  }
}
```

Then set the environment variable:

```bash title=".env.local"
REGISTRY_TOKEN=your_secret_token_here
```

### Authentication Methods

#### Bearer Token (OAuth 2.0)

```json
{
  "@github": {
    "url": "https://api.github.com/repos/org/registry/contents/{name}.json",
    "headers": {
      "Authorization": "Bearer ${GITHUB_TOKEN}"
    }
  }
}
```

#### API Key in Headers

```json title="components.json" showLineNumbers
{
  "@private": {
    "url": "https://api.company.com/registry/{name}",
    "headers": {
      "X-API-Key": "${API_KEY}"
    }
  }
}
```

#### Basic Authentication

```json title="components.json" showLineNumbers
{
  "@internal": {
    "url": "https://registry.company.com/{name}.json",
    "headers": {
      "Authorization": "Basic ${BASE64_CREDENTIALS}"
    }
  }
}
```

#### Query Parameter Authentication

```json title="components.json" showLineNumbers
{
  "@secure": {
    "url": "https://registry.example.com/{name}.json",
    "params": {
      "api_key": "${API_KEY}",
      "client_id": "${CLIENT_ID}",
      "signature": "${REQUEST_SIGNATURE}"
    }
  }
}
```

#### Multiple Authentication Methods

Some registries require multiple authentication methods:

```json title="components.json" showLineNumbers
{
  "@enterprise": {
    "url": "https://api.enterprise.com/v2/registry/{name}",
    "headers": {
      "Authorization": "Bearer ${ACCESS_TOKEN}",
      "X-API-Key": "${API_KEY}",
      "X-Workspace-Id": "${WORKSPACE_ID}"
    },
    "params": {
      "version": "latest"
    }
  }
}
```

### Security Considerations

When working with namespaced registries, especially third-party or public ones, security is paramount. Here's how we handle security:

### Resource Validation

All resources fetched from registries are validated against our registry item schema before installation. This ensures:

- **Structure validation**: Resources must conform to the expected JSON schema
- **Type safety**: Resource types are validated (`registry:ui`, `registry:lib`, etc.)
- **No arbitrary code execution**: Resources are data files, not executable scripts

### Environment Variable Security

Environment variables used for authentication are:

- **Never logged**: The CLI never logs or displays environment variable values
- **Expanded at runtime**: Variables are only expanded when needed, not stored
- **Isolated per registry**: Each registry maintains its own authentication context

Example of secure configuration:

```json title="components.json" showLineNumbers
{
  "registries": {
    "@private": {
      "url": "https://api.company.com/registry/{name}.json",
      "headers": {
        "Authorization": "Bearer ${PRIVATE_REGISTRY_TOKEN}"
      }
    }
  }
}
```

Never commit actual tokens to version control. Use `.env.local`:

```bash title=".env.local"
PRIVATE_REGISTRY_TOKEN=actual_token_here
```

### HTTPS Enforcement

We strongly recommend using HTTPS for all registry URLs:

- **Encrypted transport**: Prevents man-in-the-middle attacks
- **Certificate validation**: Ensures you're connecting to the legitimate registry
- **Credential protection**: Headers and tokens are encrypted in transit

```json title="components.json" showLineNumbers
{
  "registries": {
    "@secure": "https://registry.example.com/{name}.json", // ✅ Good
    "@insecure": "http://registry.example.com/{name}.json" // ❌ Avoid
  }
}
```

### Content Security

Resources from registries are treated as data, not code:

1. **JSON parsing only**: Resources must be valid JSON
2. **Schema validation**: Must match the registry item schema
3. **File path restrictions**: Files can only be written to configured paths
4. **No script execution**: The CLI doesn't execute any code from registry resources

### Registry Trust Model

The namespace system operates on a trust model:

- **You trust what you install**: Only add registries you trust to your configuration
- **Explicit configuration**: Registries must be explicitly configured in `components.json`
- **No automatic registry discovery**: The CLI never automatically adds registries
- **Dependency transparency**: All dependencies are clearly listed in registry items

### Best Practices for Registry Operators

If you're running your own registry:

1. **Use HTTPS always**: Never serve registry content over HTTP
2. **Implement authentication**: Require API keys or tokens for private registries
3. **Rate limiting**: Protect your registry from abuse
4. **Content validation**: Validate resources before serving them

Example secure registry setup:

```json title="components.json" showLineNumbers
{
  "@company": {
    "url": "https://registry.company.com/v1/{name}.json",
    "headers": {
      "Authorization": "Bearer ${COMPANY_TOKEN}",
      "X-Registry-Version": "1.0"
    }
  }
}
```

### Inspecting Resources Before Installation

The CLI provides transparency about what's being installed. You can see the payload of a registry item using the following command:

```bash
npx shadcn@latest view @acme/button
```

This will output the payload of the registry item to the console.

---

## Dependency Resolution

### Basic Dependency Resolution

Resources can have dependencies across different registries:

```json title="registry-item.json" showLineNumbers
{
  "name": "dashboard",
  "type": "registry:block",
  "registryDependencies": [
    "@shadcn/card", // From default registry
    "@v0/chart", // From v0 registry
    "@acme/data-table", // From acme registry
    "@lib/data-fetcher", // Utility library
    "@ai/analytics-prompt" // AI prompt resource
  ]
}
```

The CLI automatically resolves and installs all dependencies from their respective registries.

### Advanced Dependency Resolution

Understanding how dependencies are resolved internally is important if you're developing registries or need to customize third-party resources.

### How Resolution Works

When you run `npx shadcn@latest add @namespace/resource`, the CLI does the following:

1. **Clears registry context** to start fresh
2. **Fetches the main resource** from the specified registry
3. **Recursively resolves dependencies** from their respective registries
4. **Applies topological sorting** to ensure proper installation order
5. **Deduplicates files** based on target paths (last one wins)
6. **Deep merges configurations** (tailwind, cssVars, css, envVars)

This means that if you run the following command:

```bash
npx shadcn@latest add @acme/auth @custom/login-form
```

The `login-form.ts` from `@custom/login-form` will override the `login-form.ts` from `@acme/auth` because it's resolved last.

### Overriding Third-Party Resources

You can leverage the dependency resolution process to override any third-party resource by adding them to your custom resource under `registryDependencies` and overriding with your own custom values.

#### Example: Customizing a Third-Party Button

Let's say you want to customize a button from a vendor registry:

**1. Original vendor button** (`@vendor/button`):

```json title="button.json" showLineNumbers
{
  "name": "button",
  "type": "registry:ui",
  "files": [
    {
      "path": "components/ui/button.tsx",
      "type": "registry:ui",
      "content": "// Vendor's button implementation\nexport function Button() { ... }"
    }
  ],
  "cssVars": {
    "light": {
      "--button-bg": "blue"
    }
  }
}
```

**2. Create your custom override** (`@my-company/custom-button`):

```json title="custom-button.json" showLineNumbers
{
  "name": "custom-button",
  "type": "registry:ui",
  "registryDependencies": [
    "@vendor/button" // Import original first
  ],
  "cssVars": {
    "light": {
      "--button-bg": "purple" // Override the color
    }
  }
}
```

**3. Install your custom version**:

```bash
npx shadcn@latest add @my-company/custom-button
```

This installs the original button from `@vendor/button` and then overrides the `cssVars` with your own custom values.

### Advanced Override Patterns

#### Extending Without Replacing

Keep the original and add extensions:

```json title="extended-table.json" showLineNumbers
{
  "name": "extended-table",
  "registryDependencies": ["@vendor/table"],
  "files": [
    {
      "path": "components/ui/table-extended.tsx",
      "content": "import { Table } from '@vendor/table'\n// Add your extensions\nexport function ExtendedTable() { ... }"
    }
  ]
}
```

This will install the original table from `@vendor/table` and then add your extensions to `components/ui/table-extended.tsx`.

#### Partial Override (Multi-file Resources)

Override only specific files from a complex component:

```json title="custom-auth.json" showLineNumbers
{
  "name": "custom-auth",
  "registryDependencies": [
    "@vendor/auth" // Has multiple files
  ],
  "files": [
    {
      "path": "lib/auth-server.ts",
      "type": "registry:lib",
      "content": "// Your custom auth server"
    }
  ]
}
```

### Resolution Order Example

When you install `@custom/dashboard` that depends on multiple resources:

```json title="dashboard.json" showLineNumbers
{
  "name": "dashboard",
  "registryDependencies": [
    "@shadcn/card", // 1. Resolved first
    "@vendor/chart", // 2. Resolved second
    "@custom/card" // 3. Resolved last (overrides @shadcn/card)
  ]
}
```

Resolution order:

1. `@shadcn/card` - installs to `components/ui/card.tsx`
2. `@vendor/chart` - installs to `components/ui/chart.tsx`
3. `@custom/card` - overwrites `components/ui/card.tsx` (if same target)

### Key Resolution Features

1. **Source Tracking**: Each resource knows which registry it came from, avoiding naming conflicts
2. **Circular Dependency Prevention**: Automatically detects and prevents circular dependencies
3. **Smart Installation Order**: Dependencies are installed first, then the resources that use them

---

## Versioning

You can implement versioning for your registry resources using query parameters. This allows users to pin specific versions or use different release channels.

### Basic Version Parameter

```json title="components.json" showLineNumbers
{
  "@versioned": {
    "url": "https://registry.example.com/{name}",
    "params": {
      "version": "v2"
    }
  }
}
```

This resolves `@versioned/button` to: `https://registry.example.com/button?version=v2`

### Dynamic Version Selection

Use environment variables to control versions across your project:

```json title="components.json" showLineNumbers
{
  "@stable": {
    "url": "https://registry.company.com/{name}",
    "params": {
      "version": "${REGISTRY_VERSION}"
    }
  }
}
```

This allows you to:

- Set `REGISTRY_VERSION=v1.2.3` in production
- Override per environment (dev, staging, prod)

### Semantic Versioning

Implement semantic versioning with range support:

```json title="components.json" showLineNumbers
{
  "@npm-style": {
    "url": "https://registry.example.com/{name}",
    "params": {
      "semver": "^2.0.0",
      "prerelease": "${ALLOW_PRERELEASE}"
    }
  }
}
```

### Version Resolution Best Practices

1. **Use environment variables** for version control across environments
2. **Provide sensible defaults** using the `${VAR:-default}` syntax
3. **Document version schemes** clearly for registry users
4. **Support version pinning** for reproducible builds
5. **Implement version discovery** endpoints (e.g., `/versions/{name}`)
6. **Cache versioned resources** appropriately with proper cache headers

---

## CLI Commands

The shadcn CLI provides several commands for working with namespaced registries:

### Adding Resources

Install resources from any configured registry:

```bash
# Install from a specific registry
npx shadcn@latest add @v0/dashboard

# Install multiple resources
npx shadcn@latest add @acme/button @lib/utils @ai/prompt

# Install from URL directly
npx shadcn@latest add https://registry.example.com/button.json

# Install from local file
npx shadcn@latest add ./local-registry/button.json
```

### Viewing Resources

Inspect registry items before installation:

```bash
# View a resource from a registry
npx shadcn@latest view @acme/button

# View multiple resources
npx shadcn@latest view @v0/dashboard @shadcn/card

# View from URL
npx shadcn@latest view https://registry.example.com/button.json
```

The `view` command displays:

- Resource metadata (name, type, description)
- Dependencies and registry dependencies
- File contents that will be installed
- CSS variables and Tailwind configuration
- Required environment variables

### Searching Registries

Search for available resources in registries:

```bash
# Search a specific registry
npx shadcn@latest search @v0

# Search with query
npx shadcn@latest search @acme --query "auth"

# Search multiple registries
npx shadcn@latest search @v0 @acme @lib

# Limit results
npx shadcn@latest search @v0 --limit 10 --offset 20

# List all items (alias for search)
npx shadcn@latest list @acme
```

Search results include:

- Resource name and type
- Description
- Registry source

---

## Error Handling

### Registry Not Configured

If you reference a registry that isn't configured:

```bash
npx shadcn@latest add @non-existent/component
```

Error:

```txt
Unknown registry "@non-existent". Make sure it is defined in components.json as follows:
{
  "registries": {
    "@non-existent": "[URL_TO_REGISTRY]"
  }
}
```

### Missing Environment Variables

If required environment variables are not set:

```txt
Registry "@private" requires the following environment variables:

  • REGISTRY_TOKEN

Set the required environment variables to your .env or .env.local file.
```

### Resource Not Found

404 Not Found:

```txt
The item at https://registry.company.com/button.json was not found. It may not exist at the registry.
```

This usually means:

- The resource name is misspelled
- The resource doesn't exist in the registry
- The registry URL pattern is incorrect

### Authentication Failures

401 Unauthorized:

```txt
You are not authorized to access the item at https://api.company.com/button.json
Check your authentication credentials and environment variables.
```

403 Forbidden:

```txt
Access forbidden for https://api.company.com/button.json
Verify your API key has the necessary permissions.
```

---

## Creating Your Own Registry

To make your registry compatible with the namespace system, you can serve any type of resource - components, libraries, utilities, AI prompts, themes, configurations, or any other shareable code/content:

1. **Implement the registry item schema**: Your registry must return JSON that conforms to the [registry item schema](/docs/registry/registry-item-json).

2. **Support the URL pattern**: Include `{name}` in your URL template where the resource name will be inserted.

3. **Define resource types**: Use appropriate `type` fields to identify your resources (e.g., `registry:ui`, `registry:lib`, `registry:ai`, `registry:theme`, etc.).

4. **Handle authentication** (if needed): Accept authentication via headers or query parameters.

5. **Document your namespace**: Provide clear instructions for users to configure your registry:

```json title="components.json" showLineNumbers
{
  "registries": {
    "@your-registry": "https://your-domain.com/r/{name}.json"
  }
}
```

---

## Technical Details

### Parser Pattern

The namespace parser uses the following regex pattern:

```regex title="namespace-parser.js"
/^(@[a-zA-Z0-9](?:[a-zA-Z0-9-_]*[a-zA-Z0-9])?)\/(.+)$/
```

This ensures valid namespace formatting and proper component name extraction.

### Resolution Process

1. **Parse**: Extract namespace and component name from `@namespace/component`
2. **Lookup**: Find registry configuration for `@namespace`
3. **Build URL**: Replace placeholders with actual values
4. **Set Headers**: Apply authentication headers if configured
5. **Fetch**: Retrieve component from the resolved URL
6. **Validate**: Ensure response matches registry item schema
7. **Resolve Dependencies**: Recursively fetch any registry dependencies

### Cross-Registry Dependencies

When a component has dependencies from different registries, the resolver:

1. Maintains separate authentication contexts for each registry
2. Resolves each dependency from its respective source
3. Deduplicates files based on target paths
4. Merges configurations (tailwind, cssVars, etc.) from all sources

---

## Best Practices

1. **Use environment variables** for sensitive data like API keys and tokens
2. **Namespace your registry** with a unique, descriptive name
3. **Document authentication requirements** clearly for users
4. **Implement proper error responses** with helpful messages
5. **Cache registry responses** when possible to improve performance
6. **Support style variants** if your components have multiple themes

---

## Troubleshooting

### Resources not found

- Verify the registry URL is correct and accessible
- Check that the `{name}` placeholder is included in the URL
- Ensure the resource exists in the registry
- Confirm the resource type matches what the registry provides

### Authentication issues

- Confirm environment variables are set correctly
- Verify API keys/tokens are valid and not expired
- Check that headers are being sent in the correct format

### Dependency conflicts

- Review resources with the same name from different registries
- Use fully qualified names (`@namespace/resource`) to avoid ambiguity
- Check for circular dependencies between registries
- Ensure resource types are compatible when mixing registries




---
title: Authentication
description: Secure your registry with authentication for private and personalized components.
---

Authentication lets you run private registries, control who can access your components, and give different teams or users different content. This guide shows common authentication patterns and how to set them up.

Authentication enables these use cases:

- **Private Components**: Keep your business logic and internal components secure
- **Team-Specific Resources**: Give different teams different components
- **Access Control**: Limit who can see sensitive or experimental components
- **Usage Analytics**: See who's using which components in your organization
- **Licensing**: Control who gets premium or licensed components

## Common Authentication Patterns

### Token-Based Authentication

The most common approach uses Bearer tokens or API keys:

```json title="components.json"
{
  "registries": {
    "@private": {
      "url": "https://registry.company.com/{name}.json",
      "headers": {
        "Authorization": "Bearer ${REGISTRY_TOKEN}"
      }
    }
  }
}
```

Set your token in environment variables:

```bash title=".env.local"
REGISTRY_TOKEN=your_secret_token_here
```

### API Key Authentication

Some registries use API keys in headers:

```json title="components.json"
{
  "registries": {
    "@company": {
      "url": "https://api.company.com/registry/{name}.json",
      "headers": {
        "X-API-Key": "${API_KEY}",
        "X-Workspace-Id": "${WORKSPACE_ID}"
      }
    }
  }
}
```

### Query Parameter Authentication

For simpler setups, use query parameters:

```json title="components.json"
{
  "registries": {
    "@internal": {
      "url": "https://registry.company.com/{name}.json",
      "params": {
        "token": "${ACCESS_TOKEN}"
      }
    }
  }
}
```

This creates: `https://registry.company.com/button.json?token=your_token`

## Server-Side Implementation

Here's how to add authentication to your registry server:

### Next.js API Route Example

```typescript title="app/api/registry/[name]/route.ts"
import { NextRequest, NextResponse } from "next/server"

export async function GET(
  request: NextRequest,
  { params }: { params: { name: string } }
) {
  // Get token from Authorization header.
  const authHeader = request.headers.get("authorization")
  const token = authHeader?.replace("Bearer ", "")

  // Or from query parameters.
  const queryToken = request.nextUrl.searchParams.get("token")

  // Check if token is valid.
  if (!isValidToken(token || queryToken)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  // Check if token can access this component.
  if (!hasAccessToComponent(token, params.name)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 })
  }

  // Return the component.
  const component = await getComponent(params.name)
  return NextResponse.json(component)
}

function isValidToken(token: string | null) {
  // Add your token validation logic here.
  // Check against database, JWT validation, etc.
  return token === process.env.VALID_TOKEN
}

function hasAccessToComponent(token: string, componentName: string) {
  // Add role-based access control here.
  // Check if token can access specific component.
  return true // Your logic here.
}
```

### Express.js Example

```javascript title="server.js"
app.get("/registry/:name.json", (req, res) => {
  const token = req.headers.authorization?.replace("Bearer ", "")

  if (!isValidToken(token)) {
    return res.status(401).json({ error: "Unauthorized" })
  }

  const component = getComponent(req.params.name)
  if (!component) {
    return res.status(404).json({ error: "Component not found" })
  }

  res.json(component)
})
```

## Advanced Authentication Patterns

### Team-Based Access

Give different teams different components:

```typescript title="api/registry/route.ts"
async function GET(request: NextRequest) {
  const token = extractToken(request)
  const team = await getTeamFromToken(token)

  // Get components for this team.
  const components = await getComponentsForTeam(team)
  return NextResponse.json(components)
}
```

### User-Personalized Registries

Give users components based on their preferences:

```typescript
async function GET(request: NextRequest) {
  const user = await authenticateUser(request)

  // Get user's style and framework preferences.
  const preferences = await getUserPreferences(user.id)

  // Get personalized component version.
  const component = await getPersonalizedComponent(params.name, preferences)

  return NextResponse.json(component)
}
```

### Temporary Access Tokens

Use expiring tokens for better security:

```typescript
interface TemporaryToken {
  token: string
  expiresAt: Date
  scope: string[]
}

async function validateTemporaryToken(token: string) {
  const tokenData = await getTokenData(token)

  if (!tokenData) return false
  if (new Date() > tokenData.expiresAt) return false

  return true
}
```

## Multi-Registry Authentication

With [namespaced registries](/docs/registry/namespace), you can set up multiple registries with different authentication:

```json title="components.json"
{
  "registries": {
    "@public": "https://public.company.com/{name}.json",
    "@internal": {
      "url": "https://internal.company.com/{name}.json",
      "headers": {
        "Authorization": "Bearer ${INTERNAL_TOKEN}"
      }
    },
    "@premium": {
      "url": "https://premium.company.com/{name}.json",
      "headers": {
        "X-License-Key": "${LICENSE_KEY}"
      }
    }
  }
}
```

This lets you:

- Mix public and private registries
- Use different authentication per registry
- Organize components by access level

## Security Best Practices

### Use Environment Variables

Never commit tokens to version control. Always use environment variables:

```bash title=".env.local"
REGISTRY_TOKEN=your_secret_token_here
API_KEY=your_api_key_here
```

Then reference them in `components.json`:

```json
{
  "registries": {
    "@private": {
      "url": "https://registry.company.com/{name}.json",
      "headers": {
        "Authorization": "Bearer ${REGISTRY_TOKEN}"
      }
    }
  }
}
```

### Use HTTPS

Always use HTTPS URLs for registries to protect your tokens in transit:

```json
{
  "@secure": "https://registry.company.com/{name}.json" // ✅
  "@insecure": "http://registry.company.com/{name}.json" // ❌
}
```

### Add Rate Limiting

Protect your registry from abuse:

```typescript
import rateLimit from "express-rate-limit"

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
})

app.use("/registry", limiter)
```

### Rotate Tokens

Change access tokens regularly:

```typescript
// Create new token with expiration.
function generateToken() {
  const token = crypto.randomBytes(32).toString("hex")
  const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30 days.

  return { token, expiresAt }
}
```

### Log Access

Track registry access for security and analytics:

```typescript
async function logAccess(request: Request, component: string, userId: string) {
  await db.accessLog.create({
    timestamp: new Date(),
    userId,
    component,
    ip: request.ip,
    userAgent: request.headers["user-agent"],
  })
}
```

## Testing Authentication

Test your authenticated registry locally:

```bash
# Test with curl.
curl -H "Authorization: Bearer your_token" \
  https://registry.company.com/button.json

# Test with the CLI.
REGISTRY_TOKEN=your_token npx shadcn@latest add @private/button
```

## Error Handling

The shadcn CLI handles authentication errors gracefully:

- **401 Unauthorized**: Token is invalid or missing
- **403 Forbidden**: Token lacks permission for this resource
- **429 Too Many Requests**: Rate limit exceeded

### Custom Error Messages

Your registry server can return custom error messages in the response body, and the CLI will display them to users:

```typescript
// Registry server returns custom error
return NextResponse.json(
  {
    error: "Unauthorized",
    message:
      "Your subscription has expired. Please renew at company.com/billing",
  },
  { status: 403 }
)
```

The user will see:

```txt
Your subscription has expired. Please renew at company.com/billing
```

This helps provide context-specific guidance:

```typescript
// Different error messages for different scenarios
if (!token) {
  return NextResponse.json(
    {
      error: "Unauthorized",
      message:
        "Authentication required. Set REGISTRY_TOKEN in your .env.local file",
    },
    { status: 401 }
  )
}

if (isExpiredToken(token)) {
  return NextResponse.json(
    {
      error: "Unauthorized",
      message: "Token expired. Request a new token at company.com/tokens",
    },
    { status: 401 }
  )
}

if (!hasTeamAccess(token, component)) {
  return NextResponse.json(
    {
      error: "Forbidden",
      message: `Component '${component}' is restricted to the Design team`,
    },
    { status: 403 }
  )
}
```

## Next Steps

To set up authentication with multiple registries and advanced patterns, see the [Namespaced Registries](/docs/registry/namespace) documentation. It covers:

- Setting up multiple authenticated registries
- Using different authentication per namespace
- Cross-registry dependency resolution
- Advanced authentication patterns



---
title: MCP Server
description: MCP support for registry developers
---

The [shadcn MCP server](/docs/mcp) works out of the box with any shadcn-compatible registry. You do not need to do anything special to enable MCP support for your registry.

---

## Prerequisites

The MCP server works by requesting your registry index. Make sure you have a registry item file at the root of your registry named `registry`.

For example, if your registry is hosted at `https://acme.com/r/[name].json`, you should have a file at `https://acme.com/r/registry.json` or `https://acme.com/r/registry` if you're using a JSON file extension.

This file must be a valid JSON file that conforms to the [registry schema](/docs/registry/registry-json).

---

## Configuring MCP

Ask your registry consumers to configure your registry in their `components.json` file and install the shadcn MCP server:

<Tabs defaultValue="claude">
  <TabsList>
    <TabsTrigger value="claude">Claude Code</TabsTrigger>
    <TabsTrigger value="cursor">Cursor</TabsTrigger>
    <TabsTrigger value="vscode">VS Code</TabsTrigger>
    <TabsTrigger value="codex">Codex</TabsTrigger>
    <TabsTrigger value="opencode">OpenCode</TabsTrigger>
  </TabsList>
  <TabsContent value="claude" className="mt-4">
    **Configure your registry** in your `components.json` file:

    ```json title="components.json" showLineNumbers
    {
      "registries": {
        "@acme": "https://acme.com/r/{name}.json"
      }
    }
    ```

    **Run the following command** in your project:

    ```bash
    npx shadcn@latest mcp init --client claude
    ```

    **Restart Claude Code** and try the following prompts:
       - Show me the components in the acme registry
       - Create a landing page using items from the acme registry

    **Note:** You can use `/mcp` command in Claude Code to debug the MCP server.

  </TabsContent>

  <TabsContent value="cursor" className="mt-4">
    **Configure your registry** in your `components.json` file:

    ```json title="components.json" showLineNumbers
    {
      "registries": {
        "@acme": "https://acme.com/r/{name}.json"
      }
    }
    ```
    **Run the following command** in your project:
       ```bash
       npx shadcn@latest mcp init --client cursor
       ```

    Open **Cursor Settings** and **Enable the MCP server** for shadcn. Then try the following prompts:
       - Show me the components in the acme registry
       - Create a landing page using items from the acme registry

  </TabsContent>

  <TabsContent value="vscode" className="mt-4">
    **Configure your registry** in your `components.json` file:

    ```json title="components.json" showLineNumbers
    {
      "registries": {
        "@acme": "https://acme.com/r/{name}.json"
      }
    }
    ```
    **Run the following command** in your project:
       ```bash
       npx shadcn@latest mcp init --client vscode
       ```

    Open `.vscode/mcp.json` and click **Start** next to the shadcn server. Then try the following prompts with GitHub Copilot:
       - Show me the components in the acme registry
       - Create a landing page using items from the acme registry

  </TabsContent>

  <TabsContent value="codex" className="mt-4">
    **Configure your registry** in your `components.json` file:

    ```json title="components.json" showLineNumbers
    {
      "registries": {
        "@acme": "https://acme.com/r/{name}.json"
      }
    }
    ```

    **Add the following configuration** to `~/.codex/config.toml`:
       ```toml
       [mcp_servers.shadcn]
       command = "npx"
       args = ["shadcn@latest", "mcp"]
       ```

    **Restart Codex** and try the following prompts:
       - Show me the components in the acme registry
       - Create a landing page using items from the acme registry

  </TabsContent>

  <TabsContent value="opencode" className="mt-4">
    **Configure your registry** in your `components.json` file:

    ```json title="components.json" showLineNumbers
    {
      "registries": {
        "@acme": "https://acme.com/r/{name}.json"
      }
    }
    ```

    **Run the following command** in your project:
       ```bash
       npx shadcn@latest mcp init --client opencode
       ```

    **Restart OpenCode** and try the following prompts:
       - Show me the components in the acme registry
       - Create a landing page using items from the acme registry

  </TabsContent>
</Tabs>

You can read more about the MCP server in the [MCP documentation](/docs/mcp).

---

## Best Practices

Here are some best practices for MCP-compatible registries:

1. **Clear Descriptions**: Add concise, informative descriptions that help AI assistants understand what a registry item is for and how to use it.
2. **Proper Dependencies**: List all `dependencies` accurately so MCP can install them automatically.
3. **Registry Dependencies**: Use `registryDependencies` to indicate relationships between items.
4. **Consistent Naming**: Use kebab-case for component names and maintain consistency across your registry.




---
title: Open in v0
description: Integrate your registry with Open in v0.
---

If your registry is hosted and publicly accessible via a URL, you can open a registry item in v0 by using the `https://v0.dev/chat/api/open?url=[URL]` endpoint.

eg. [https://v0.dev/chat/api/open?url=https://ui.shadcn.com/r/styles/new-york/login-01.json](https://v0.dev/chat/api/open?url=https://ui.shadcn.com/r/styles/new-york/login-01.json)

<Callout className="mt-6">
  **Important:** `Open in v0` does not support `cssVars`, `css`, `envVars`,
  namespaced registries, or advanced authentication methods.
</Callout>

## Button

See [Build your Open in v0 button](https://v0.dev/chat/button) for more information on how to build your own `Open in v0` button.

Here's a simple example of how to add a `Open in v0` button to your site.

```tsx showLineNumbers
import { Button } from "@/components/ui/button"

export function OpenInV0Button({ url }: { url: string }) {
  return (
    <Button
      aria-label="Open in v0"
      className="h-8 gap-1 rounded-[6px] bg-black px-3 text-xs text-white hover:bg-black hover:text-white dark:bg-white dark:text-black"
      asChild
    >
      <a
        href={`https://v0.dev/chat/api/open?url=${url}`}
        target="_blank"
        rel="noreferrer"
      >
        Open in{" "}
        <svg
          viewBox="0 0 40 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 text-current"
        >
          <path
            d="M23.3919 0H32.9188C36.7819 0 39.9136 3.13165 39.9136 6.99475V16.0805H36.0006V6.99475C36.0006 6.90167 35.9969 6.80925 35.9898 6.71766L26.4628 16.079C26.4949 16.08 26.5272 16.0805 26.5595 16.0805H36.0006V19.7762H26.5595C22.6964 19.7762 19.4788 16.6139 19.4788 12.7508V3.68923H23.3919V12.7508C23.3919 12.9253 23.4054 13.0977 23.4316 13.2668L33.1682 3.6995C33.0861 3.6927 33.003 3.68923 32.9188 3.68923H23.3919V0Z"
            fill="currentColor"
          ></path>
          <path
            d="M13.7688 19.0956L0 3.68759H5.53933L13.6231 12.7337V3.68759H17.7535V17.5746C17.7535 19.6705 15.1654 20.6584 13.7688 19.0956Z"
            fill="currentColor"
          ></path>
        </svg>
      </a>
    </Button>
  )
}
```

```jsx
<OpenInV0Button url="https://example.com/r/hello-world.json" />
```

## Authentication

Open in v0 only supports query parameter authentication. It does not support namespaced registries or advanced authentication methods like Bearer tokens or API keys in headers.

### Using Query Parameter Authentication

To add authentication to your registry for Open in v0, use a `token` query parameter:

```
https://registry.company.com/r/hello-world.json?token=your_secure_token_here
```

When implementing this on your registry server:

1. Check for the `token` query parameter
2. Validate the token against your authentication system
3. Return a `401 Unauthorized` response if the token is invalid or missing
4. Both the shadcn CLI and Open in v0 will handle the 401 response and display an appropriate message to users

### Example Implementation

```typescript
// Next.js API route example
export async function GET(request: NextRequest) {
  const token = request.nextUrl.searchParams.get("token")

  if (!isValidToken(token)) {
    return NextResponse.json(
      {
        error: "Unauthorized",
        message: "Invalid or missing token",
      },
      { status: 401 }
    )
  }

  // Return the registry item
  return NextResponse.json(registryItem)
}
```

<Callout className="mt-6">
  **Security Note:** Make sure to encrypt and expire tokens. Never expose
  production tokens in documentation or examples.
</Callout>