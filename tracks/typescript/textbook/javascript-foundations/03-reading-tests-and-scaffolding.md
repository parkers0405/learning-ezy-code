# Reading Tests and Supplied Scaffolding

## Goal

Decode the small Vitest subset used in early visible tests without being asked to write test syntax yet.

## Prerequisite recap

Checking rejects invalid source before runtime assertions compare actual and expected results.

## Terms introduced

An **import** brings names from another module into the current file. A **test** is a repeatable check. `describe` groups related tests, and `it` gives one test a readable name. `expect` wraps an actual runtime value. A **matcher** states the expected relationship; early chapters use `toBe` for exact primitive values. `@exercise` is a course alias that points tests at the active starter or isolated solution.

## Step-by-step mental model

Read this supplied test by token groups:

```ts
import { describe, expect, it } from "vitest";
import { result } from "@exercise";

describe("result", () => {
  it("has the requested value", () => {
    expect(result).toBe(3);
  });
});
```

- `import { describe, expect, it }` selects three named Vitest tools.
- `import { result } from "@exercise"` selects your named export.
- `describe("result", ...` starts a group named `result`.
- `() => { ... }` is supplied “run this body later” syntax. Chapter 16 explains arrow syntax and chapter 17 formally teaches callbacks before you must write one.
- `it("has the requested value", ...` names one check.
- `expect(result)` identifies the actual value; `.toBe(3)` requires exact value `3`.
- Each `});` closes the innermost body and call.

Some early tests also supply `expectTypeOf(result).toBeNumber()`. That checks the static type seen by TypeScript; it does not execute a second runtime comparison. Later matchers are introduced where they first appear instead of being implied by this chapter.

## Common mistakes

- Editing `@exercise` or a test to hide a learner-code failure.
- Reading only the test title and skipping the matcher.
- Treating supplied arrow/callback scaffolding as syntax already required from memory.

## DSA relevance

Tests preserve examples and edge cases as executable contracts. Reading actual values and matchers helps diagnose an algorithm one case at a time.

## Self-check

1. What does `@exercise` point to? 2. Which token group states exact expected value? 3. Is callback syntax learner-authored in this exercise?

## Exercise preparation

Read the visible test from imports through matcher, then satisfy both its static and runtime checks by changing only `starter.ts`.

## Authoritative references

- [Vitest Test API](https://vitest.dev/api/)
- [Vitest expectTypeOf](https://vitest.dev/api/expect-typeof.html)
