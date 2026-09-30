# Errors and Exceptions

## Goal

Trace success and two failure paths through `try`, `throw`, `catch`, and `finally`.

## Prerequisite recap

Functions, conversions, comparisons, and conditionals can select different runtime paths.

## Terms introduced

An **exception** interrupts the normal statement order. `throw` starts exceptional flow. `try` marks statements that may throw, `catch` handles a thrown value, and `finally` runs after either success or failure. `Error` is JavaScript's base error object; `TypeError` and `RangeError` identify familiar error categories.

## Step-by-step mental model

The exercise supplies several built-ins:

- `Number(text)` converts text to a number.
- `NaN` is the special “not a number” number value produced when conversion fails.
- `Number.isNaN(value)` checks specifically for that value.
- `new TypeError(message)` and `new RangeError(message)` construct error objects.
- `caught: unknown` is strict TypeScript notation: JavaScript permits any value to be thrown, so the caught value's type is not assumed.
- `caught instanceof Error` is a runtime check proving a familiar error object before `.message` is read.

Trace three inputs. For `"4"`, conversion succeeds, no throw occurs, and `finally` appends `"; finished"`. For `"no"`, the first condition throws `TypeError`; `catch` reads its message; then `finally` appends. For `"-1"`, conversion succeeds but the range condition throws `RangeError`, followed by the same catch/finally path.

```ts
try {
  // conversion and checks
} catch (caught: unknown) {
  if (caught instanceof Error) {
    result = caught.message;
  }
} finally {
  result = `${result}; finished`;
}
```

## Common mistakes

- Treating `NaN` as the string `"NaN"`.
- Reading `caught.message` before narrowing `unknown`.
- Assuming `finally` runs only after an error.
- Replacing specific errors with one generic result.

## DSA relevance

Expected search absence often belongs in an ordinary return value; exceptions are more appropriate when a required input contract is violated.

## Self-check

1. Which block runs on all three paths? 2. Why is the caught value `unknown`? 3. Which error represents failed conversion, and which represents a nonpositive number?

## Exercise preparation

Preserve the supplied conversion, error construction, and `finally` block. In `catch`, use `instanceof Error` to keep each thrown message. Tests cover success, `TypeError`, and `RangeError` paths.

## Authoritative references

- [MDN: Control flow and error handling](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Control_flow_and_error_handling)
- [TypeScript: `unknown` in catch variables](https://www.typescriptlang.org/tsconfig/useUnknownInCatchVariables.html)
