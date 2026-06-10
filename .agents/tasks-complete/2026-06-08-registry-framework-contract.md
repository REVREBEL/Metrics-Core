# Registry Framework Contract

## Goal
Define the registry data contract and automation skeleton needed to support a clean, component-by-component migration later.

## Hard Rules

- Do not migrate any components yet.
- Do not create barrels in empty directories.
- Do not refactor unrelated app code while working this task.
- Stop on the first real blocker and report it instead of looping.

## What to define

1. The registry component metadata shape.
2. The source folder conventions for:
   - primitives
   - components
   - registry-only copies
   - types
   - fonts
   - hooks
   - styles
   - utils
3. The automated scan-and-register workflow:
   - discover files in a folder
   - extract or infer props
   - infer display mode or page type
   - write/update registry metadata
   - surface the entry in the registry site and consumption API
4. The page model for each content type:
   - visual component pages
   - list-only pages
   - token/shade pages
   - font specimen pages
   - hook/reference pages

## Expected Output

- A concise contract document or task checklist.
- A recommended first implementation slice.
- A list of any inputs still needed before coding starts.

## Notes

The framework should support a single shared nav and separate logical pages by module, while keeping registry-only code isolated in `ui-registry`.
