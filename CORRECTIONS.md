# Editorial corrections

The prose and exercises are adapted from upstream without changing their learning goals. Local corrections are documented rather than hidden:

- Converted old indented code blocks and inconsistent headings to ordinary fenced Markdown.
- Added explicit public exports so exercises are modules and their APIs can be tested without relying on console output.
- Replaced upstream's single expected-output checks with visible chapter-local Vitest contracts, multiple behavior cases where meaningful, and strict compile-time assertions for type-only lessons. Public exports were added where needed to make behavior testable without changing each lesson's goal.
- Corrected the interfaces solution's year from `2023` to the starter's `2022`; the value does not affect the lesson.
- Strengthened `updateProperty` so its value must have the selected property's type instead of upstream's `any`.
- Completed the upstream mixins starter/solution, which referenced undefined `Activatable` and `applyMixins` declarations.
- Reworked the intentional-error exercises (`Readonly` and `Required`) with `@ts-expect-error` assertions in their visible tests. This proves the compiler rejects the operations without leaving intentionally uncompilable solution files.
- The decorator lesson teaches the upstream legacy descriptor model. Its solution invokes that decorator explicitly instead of using `@log`, avoiding runtime disagreement between legacy TypeScript decorators and tools that implement the newer ECMAScript proposal; static checking still enables `experimentalDecorators` for the upstream model.
- Omitted orphaned duplicate files such as `Generics2.md`, `Generics3.md`, and similarly suffixed drafts because upstream `Welcome.md` does not link them. Upstream explicitly gives `Modules` no exercise; this edition adds a small, clearly labeled local import/export exercise so every topic workspace is independently runnable.
- Reorganized the 29 migrated topics into prerequisite-safe runtime, TypeScript, and advanced sections. The expanded 51-chapter course retains the original three local topics and adds 19 focused prerequisite bridges/splits without promoting duplicate upstream drafts.
- Replaced duplicated lesson prose in exercise directories with one ordered offline textbook. Exercise READMEs now remain focused on prerequisites, reading links, contracts, commands, and test expectations.
- Expanded the functions exercise to cover defaults and lexical closures, and the modules exercise to cover an explicit `RangeError` path in addition to named imports/exports.
