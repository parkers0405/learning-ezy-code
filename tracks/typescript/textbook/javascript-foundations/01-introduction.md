# Your First Edit, Test, and Submit

## Goal

Know where you are, which file to edit, and how to complete one learning loop.

## Prerequisite recap

None. This course starts from zero.

## Terms introduced

An **editor** changes files. A **terminal** runs text commands. `cd` means “change directory”; it changes the terminal's **current directory**, the folder a command acts in. A **file extension** is the ending after a dot: `.ts` identifies a TypeScript file and `.md` identifies a Markdown reading. This **repository** contains the course; a **track** is one language path; a **chapter** is one lesson.

## Step-by-step mental model

Open this repository in an editor. Open a terminal and `cd` to the repository. `./ezy start 1` selects the first chapter; installed shell integration can also enter its directory. `ezy read` opens the lesson, `ezy test` gives feedback, `ezy submit` records a pass, and `ezy status` shows progress. Commands belong in the terminal; TypeScript belongs in `.ts` files. Edit `starter.ts`, not `exercise.test.ts` or `.solution/solution.ts`.

**Supplied syntax — recognize the line, but do not try to master it yet:**

```ts
export const message = "Hello World";
```

For now, read it as “make the greeting available to the course test.” `export`, `const`, the name, `=`, quotes, and the semicolon are decoded in later chapters.

## Common mistakes

- Typing TypeScript into the terminal. - Running from an unrelated current directory. - Editing tests or solutions.

## DSA relevance

Every later algorithm uses this edit-test-debug loop.

## Self-check

1. How do editor and terminal differ? 2. What is a current directory? 3. Which file may you edit? 4. What do the five `ezy` commands do?

## Exercise preparation

Confirm the exact `Hello World` value, test, and submit. The test preserves existing learner work.

## Authoritative references

- [MDN: Getting started](https://developer.mozilla.org/en-US/docs/Learn/Getting_started_with_the_web)
