# Strings and Template Literals

## Objectives

- Create strings with quotes and template literals.
- Interpolate expressions and normalize text.
- Account for immutability and zero-based indexing.

## Mental model

A JavaScript string is an immutable sequence of UTF-16 code units. Methods such as `trim()` and `toUpperCase()` produce new strings rather than changing their receiver. TypeScript's `string` type constrains values before execution; JavaScript performs each method call at runtime.

Single quotes, double quotes, and backticks create strings. Backticks also enable interpolation: JavaScript evaluates expressions inside `${...}` and converts their values to text.

```ts
const learner = "Mina";
const solved = 4;
const summary = `${learner} solved ${solved + 1} problems`;
const initial = "  ada".trim().charAt(0).toUpperCase();
```

Indexes begin at zero. `text.length` counts UTF-16 code units, so user-perceived characters such as some emoji can occupy more than one index. That distinction matters in international text; elementary ASCII exercises usually avoid it.

## Common mistakes

- Writing `"Hello ${name}"`; interpolation requires backticks.
- Calling `text.toUpperCase()` without using its returned string.
- Assuming `charAt(0)` on empty text throws; it returns `""`.
- Forgetting that `+` concatenates when either operand is a string.

## DSA relevance

Normalization, comparison, scanning, and building output appear in parsing, palindrome, frequency, and substring problems. Understanding the string representation prevents incorrect “character” assumptions.

## Self-check

1. Does `trim()` mutate its receiver?
2. Which delimiter enables interpolation?
3. Why can `length` differ from the number of displayed symbols?

## References

- [MDN: Template literals](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals)
- [MDN: String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)
- [TypeScript Handbook: Primitive types](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#the-primitives-string-number-and-boolean)
