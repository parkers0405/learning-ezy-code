# Source and published-site parity audit

## Canonical extraction source

- Repository: [ronreiter/interactive-tutorials](https://github.com/ronreiter/interactive-tutorials)
- License: Apache-2.0 (copied in `LICENSE`)
- Inspected commit: `926659bad1120b2c6d8e3c58eb6655aa8257eff3`
- Canonical path: `tutorials/learn-ts.org/en/`
- Ordering authority: links in canonical `Welcome.md`

For every linked topic, the upstream Markdown's lesson, exercise prompt, tutorial/starter code, expected output, and solution were inspected. This project adapts those 29 files into strict, runnable topic workspaces. `Modules.md` explicitly had no upstream exercise; its workspace contains a clearly marked local exercise. Corrections are enumerated in `CORRECTIONS.md`.

## Published-site audit

A Firecrawl map of `https://www.learn-ts.org/en/` supplied during project creation confirmed **Welcome plus exactly 29 currently navigated topics: 11 Basics and 18 Advanced**. Those topics all remain represented, but the local pedagogical order is now defined by `tracks/typescript/track.json` and adds three original JavaScript-foundation topics.

The map also exposed stale/orphan duplicate URLs that are not linked by current navigation: `Type Guards2`, `Mapped Types2`, `Enums`, `Enums2`, `Type Assertions2`, `Generics2`, `Generics3`, `Decorators2`, `Decorators3`, `Index Types2`, `Type Aliases2`, `Unions and Intersections2`, and `Utility Types2`. Matching Markdown files were inventoried but are deliberately **not** curriculum workspaces. No correction in this edition was sourced solely from those orphan drafts.

## Completeness result

| Item                   | Published navigation |            Local |
| ---------------------- | -------------------: | ---------------: |
| Orientation/Welcome    |                    1 | 1 (`WELCOME.md`) |
| Basics topics          |                   11 |    11 workspaces |
| Advanced topics        |                   18 |    18 workspaces |
| Canonical topic total  |                   29 |    29 workspaces |
| Original local topics  |                    0 |     3 workspaces |
| Current track total    |                   29 |    32 workspaces |
| Stale duplicate topics |                   13 |     0 workspaces |

Result: **complete parity with current navigation, with no stale duplicates promoted into the curriculum.**

## Stable migration map

The `legacySlug` fields in `track.json` are the machine-readable migration authority. This table makes the 29-topic provenance auditable:

| Upstream topic                | Local chapter ID                 |
| ----------------------------- | -------------------------------- |
| Introduction                  | `js-introduction`                |
| Variables and Types           | `js-values-variables-primitives` |
| Operators                     | `js-operators-expressions`       |
| Truthy and Falsy              | `js-conditionals-truthiness`     |
| Functions                     | `js-functions-scope-returns`     |
| Arrays                        | `js-arrays-operations`           |
| Loops                         | `js-loops-iteration`             |
| Modules                       | `js-modules-errors`              |
| Classes                       | `ts-classes`                     |
| Interfaces                    | `ts-interfaces`                  |
| Type Assertions               | `ts-type-assertions`             |
| keyof and typeof Operators    | `ts-keyof-typeof`                |
| Type Unions and Intersections | `ts-unions-intersections`        |
| Enum Type                     | `ts-enum`                        |
| Generics                      | `ts-generics`                    |
| Index Types                   | `ts-index-types`                 |
| Literal Types                 | `ts-literal-types`               |
| Tuple Types                   | `ts-tuples`                      |
| Type Aliases                  | `ts-aliases`                     |
| Type Guards                   | `ts-guards`                      |
| Abstract Classes              | `ts-abstract-classes`            |
| Conditional Types             | `ts-conditional-types`           |
| Discriminated Unions          | `ts-discriminated-unions`        |
| Mapped Types                  | `ts-mapped-types`                |
| Mixins                        | `ts-mixins`                      |
| Namespaces                    | `ts-namespaces`                  |
| Readonly Type                 | `ts-readonly`                    |
| Decorators                    | `ts-decorators`                  |
| Utility Types                 | `ts-utility-types`               |

`js-strings-template-literals`, `js-objects-destructuring`, and `js-map-set` are original additions and therefore have no `legacySlug`.
