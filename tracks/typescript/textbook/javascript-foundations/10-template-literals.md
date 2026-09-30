# Template Literals and Interpolation

## Goal

Create text with backticks and insert already-known values with interpolation.

## Prerequisite recap

String literals produce text. Named bindings can hold strings or numbers. `+` can join strings, and property/method access was introduced in chapter 9.

## Terms introduced

A **template literal** is text enclosed by backticks: `` `text` ``. **Interpolation** places the value of an expression into that text with `${...}`.

## Step-by-step mental model

JavaScript reads ordinary characters inside backticks as text. At `${`, it evaluates the expression inside the braces, inserts that value's text, and continues reading the template.

```ts
const learner = "Ada";
const lessons = 3;
const summary = `${learner} completed ${lessons} lessons.`;
```

The resulting string is `"Ada completed 3 lessons."`. Backticks delimit the complete template; `${learner}` and `${lessons}` mark the two insertion points.

## Common mistakes

- Using ordinary quote marks while expecting `${...}` interpolation.
- Omitting the `$` or one brace.
- Adding unwanted spaces outside an interpolation.

## DSA relevance

Template literals make trace messages and formatted algorithm results readable without long concatenation expressions.

## Self-check

1. Which character opens and closes a template literal? 2. What does `${name}` do? 3. Are the braces included in the resulting text?

## Exercise preparation

Use one template literal to combine the supplied learner name and lesson count into the exact tested sentence.

## Authoritative references

- [MDN: Template literals](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals)
