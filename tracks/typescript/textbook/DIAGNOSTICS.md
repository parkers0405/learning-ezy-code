# Reading Diagnostics

## Syntax-failure walkthrough

Suppose the checker reports `'}' expected` after `export const result = { ready: true;`. The parser could not complete the object-shaped notation because the opening `{` has no matching `}` and the semicolon is in the wrong place. Compare paired punctuation, correct the line to `export const result = { ready: true };`, and rerun. Start with the first syntax diagnostic because later messages may be consequences of it.

## Type-check failure walkthrough

Suppose `const count: number = "three"` reports “Type 'string' is not assignable to type 'number'.” The checker did not run the program. Read the declared contract (`number`), then the assigned value (`"three"`, a string). If the contract is correct, replace the value with a number such as `3`. Rerun `ezy test`; do not silence the error with an assertion.

## Assertion-failure walkthrough

Suppose a test reports `expected "not ready" to be "ready"`. Checking succeeded and the program ran. The received runtime value was `"not ready"`; the contract expects exact string `"ready"`. Find the exported binding in `starter.ts`, correct its value, and rerun. Do not edit the matcher.

## A repeatable routine

1. Read the failure phase and first diagnostic.
2. Read its file and line.
3. Compare the contract with the actual source or value.
4. Change one cause in learner-owned source.
5. Run `ezy test` again.
