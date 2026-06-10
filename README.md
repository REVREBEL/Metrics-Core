# Metrics Registry

The Metrics Registry is organized by category to avoid importing every component into the app at once.

## Rules

- Do not import all components into a global registry.
- Add components to the nearest category folder.
- Each category owns its own `index.ts`.
- Each category page renders only its own examples.
- Registry examples should use mock/static data.
- Do not connect registry examples to live APIs.
- Do not add heavy client logic unless the source component requires it.

## Add a Component

1. Create an example file in `src/registry/categories/<category>/components`.
2. Import that example into `src/registry/categories/<category>/index.ts`.
3. Add metadata to the category registry array.
4. Visit `/registry/<category>` to confirm rendering.# Metrics-Core
