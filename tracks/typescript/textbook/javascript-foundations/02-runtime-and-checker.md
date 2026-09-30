# Runtime, Checker, and Failures

## Goal

Tell checking from running, identify syntax, type, and assertion failures, and act on the first useful diagnostic.

## Prerequisite recap

You can enter an exercise directory, edit `starter.ts`, and run `ezy test`.

## Terms introduced

The **checker** examines source relationships without running the program. The **runtime** executes checked source. A **diagnostic** is a message about a problem. A **syntax failure** means source cannot be parsed as valid code. A **type failure** means the checker found an incompatible relationship. An **assertion failure** means checking succeeded and a runtime result differed from the expected result.

## Step-by-step mental model

The course checks first and runs tests second. Identify the phase before changing code:

1. A syntax diagnostic such as `'}' expected` points to incomplete punctuation. Check that line and the line just before it.
2. A type diagnostic such as `Type 'string' is not assignable to type 'number'` says the source is grammatical but two described categories conflict.
3. An assertion report such as `expected "not ready" to be "ready"` proves checking and execution reached the comparison; behavior is wrong.

Read the first diagnostic, its file and line, and its expected-versus-received detail. Change one cause in learner-owned source, save, and rerun. The longer walkthroughs in [Reading Diagnostics](../DIAGNOSTICS.md) show all three paths.

## Common mistakes

- Treating every red message as the same kind of failure.
- Fixing later messages before the first one, even though one early error can cause several follow-on messages.
- Editing visible tests instead of the starter they describe.

## DSA relevance

Separating invalid code from wrong runtime behavior makes algorithm debugging a sequence of smaller questions.

## Self-check

1. Which phase happens first? 2. What has already succeeded when an assertion fails? 3. Where should you begin when several diagnostics appear?

## Exercise preparation

Run the supplied failing exercise, identify its assertion phase, and set the exact requested runtime value.

## Authoritative references

- [TypeScript for the New Programmer](https://www.typescriptlang.org/docs/handbook/typescript-from-scratch.html)
- [Vitest assertions](https://vitest.dev/guide/features.html#assertions)
