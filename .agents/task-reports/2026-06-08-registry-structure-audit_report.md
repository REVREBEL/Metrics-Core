Registry Structure Audit Report
I have performed a thorough audit of the non-registry workspace structure, import mappings, and configuration files across packages/ui and apps/. Here is the structured breakdown of findings and the requested actionable checklist.

Actionable Deliverables Checklist
1. Is the current non-registry structure acceptable?
Acceptable with critical caveats.

The Good: The directory separation between primitives, layout components, and registry-specific utilities is conceptually sound.
The Bad (Broken Paths): @ui-core/* is mapped in root tsconfig.json to ./packages/ui-general/src/primitives/ui-core/*. However, packages/ui-general does not exist in this workspace; the files reside under packages/ui/src/primitives/ui-core/*.
The Stale (Empty Folders & Broken Barrels): There are dozens of empty placeholder folders under primitives/* and components/*. The main barrels (packages/ui/src/primitives/index.ts and packages/ui/src/components/index.ts) contain broken exports pointing to these empty folders or non-existent index files, meaning any imports through those broad barrels fail standard compilation.
The Untracked (De-facto imports): The registry app (apps/registry) heavily imports from @ui and @ui/card, but this path alias is never defined in any tsconfig.json (the app compiles only because ignoreBuildErrors: true is enabled in next.config.ts).
2. Which alias paths are safe to treat as the main barrels?
The feature-specific aliases already mapped to existing files inside packages/ui/src are safe.

Safe Primitive Barrels:
@buttons/* -> ./packages/ui/src/primitives/buttons/*
@ui-core/* -> ./packages/ui/src/primitives/ui-core/* (once corrected in tsconfig)
Safe Layout Barrels:
@metrics-layouts/* -> ./packages/ui/src/components/metrics-layouts/*
Safe Registry Utility Barrels:
@ui-registry/* -> ./packages/ui/src/ui-registry/*
@ui-types/* -> ./packages/ui/src/types/*
Strictly Unsafe Barrels:
packages/ui/src/index.ts, packages/ui/src/primitives/index.ts, and packages/ui/src/components/index.ts must be avoided as they are broad, out-of-sync, and prone to circular dependencies.
3. Should @ui-types/registry exist?
Yes, but strictly under the safe @ui-types/* alias.

The root tsconfig.json currently maps "@types/*": ["./packages/ui/src/types/*"]. This is highly dangerous because @types`` is reserved by Node/npm for definitely typed packages(e.g., @types/react, @types/node). Having a local @types/* path override clashes with npm scope resolution and breaks standard compilation.
Fortunately, the safe alias "@ui-types/*": ["./packages/ui/src/types/*"] is already defined in tsconfig.
Therefore, @ui-types/registry mapping to ./packages/ui/src/types/registry.ts is the correct and safe source of truth for the RegistryCategory and RegistryComponent types. There is no need to split packages/ui/src/types/types.ts as it does not exist (all registry types are already clean and isolated inside registry.ts).
4. What should the first safe migration step be?
Correct Root Path Overrides in tsconfig.json:
Change "@ui-core/*": ["./packages/ui-general/src/primitives/ui-core/*"] to ["./packages/ui/src/primitives/ui-core/*"].
Remove "@types/*": ["./packages/ui/src/types/*"] to prevent conflicts with the npm @types/ namespace.
Harmonize @ui and @ui/card Imports in Registry App:
Standardize all loose @ui/* imports in apps/registry to the corrected @ui-core/* alias path so types and imports resolve cleanly.
Clean Up Broken broad barrels:
Scope down packages/ui/src/primitives/index.ts and components/index.ts to only export folders that contain real files (buttons, ui-core, metrics-layouts), preventing compilation errors.