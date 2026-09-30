# Modules

## Goal

Connect files with named exports, relative imports, and re-exports while keeping dependency direction clear.

## Prerequisite recap

Earlier chapters used `export` in supplied declarations so tests could access your values. This chapter explains that file boundary directly.

## Terms introduced

A **module** is a file with its own top-level scope that imports or exports. A **named export** makes a specific binding available to other modules. An **import** creates a local binding connected to an export. A **relative path** begins with `./` or `../` and locates another file relative to the importing file. A **re-export** forwards another module's export. A **dependency** is a module another module needs.

## Step-by-step mental model

One file exports a binding:

```ts
// constants.ts
export const greeting = "Hello";
```

Another imports it by the same exported name:

```ts
// message.ts
import { greeting } from "./constants.js";
export const message = `${greeting} World`;
```

The braces select named exports. `./constants.js` means a neighboring module; this course's TypeScript setup uses the runtime `.js` extension in import paths even though the source file is `.ts`.

An index module may forward the name without creating another implementation:

```ts
export { message } from "./message.js";
```

Dependency direction follows the import: `message.ts` depends on `constants.ts`. Keeping lower-level modules independent of their consumers avoids cycles and makes testing simpler.

## Common mistakes

- Importing a named export without braces.
- Using a bare package-like path when a relative path is intended.
- Reversing dependency direction by making a low-level utility import its caller.
- Copying a value instead of re-exporting the existing binding.

## DSA relevance

Modules separate data structures, algorithms, and tests while making dependencies visible.

## Self-check

1. What does `./` mean? 2. Why do named imports use braces? 3. Which way does dependency direction point?

## Exercise preparation

Export from the helper file, import into the main file, and expose the required result. No package resolution or dynamic loading is involved.

## Authoritative references

- [MDN: JavaScript modules](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules)
- [TypeScript: Modules](https://www.typescriptlang.org/docs/handbook/2/modules.html)
