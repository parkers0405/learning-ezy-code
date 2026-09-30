# Values, Primitive Categories, and Literals

## Goal

Recognize runtime values, name JavaScript's primitive categories, and read literal notation.

## Prerequisite recap

Chapter 3 showed how a visible test compares a result. The course still supplies all surrounding declaration syntax.

## Terms introduced

A **value** is a piece of data that exists while a program runs. A **primitive** is a value in one of JavaScript's basic non-container categories. A **literal** is notation that writes a value directly in source code.

JavaScript's primitive categories are string, number, boolean, undefined, null, bigint, and symbol. This exercise uses only the first three. Text in quotes is a string literal, digits can form a number literal, and `true` and `false` are boolean literals.

## Step-by-step mental model

When JavaScript reaches a literal, that notation produces its value:

```ts
"hello"; // the string value hello
4; // the number value four
true; // the boolean value true
```

Quotes matter: `"4"` is text, while `4` is a number. `"false"` is text, while `false` is a boolean. Ordinary whole-number-looking and decimal-looking values both belong to JavaScript's number category.

The exercise wraps each literal in supplied course syntax. Focus only on the value after `=`.

## Common mistakes

- Counting quote marks as part of a string's value.
- Treating `"true"` as the boolean `true`.
- Assuming `4` and `4.5` belong to different JavaScript primitive categories.

## DSA relevance

Algorithm inputs eventually reduce to concrete values such as text, numbers, and yes/no conditions. Distinguishing their categories prevents invalid comparisons and calculations later.

## Self-check

1. What is a value? 2. Why is a primitive called basic? 3. Which notation creates text? 4. Are `3` and `3.5` both numbers?

## Exercise preparation

Change only the three literals so the exports contain `"hello"`, `4`, and `true`.

## Authoritative references

- [MDN: JavaScript data types](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Data_structures)
- [MDN: Literals](https://developer.mozilla.org/en-US/docs/Glossary/Literal)
