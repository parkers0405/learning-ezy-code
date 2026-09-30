# Strings, Concatenation, Properties, and Methods

## Goal

Join strings, read length, and call one method.

## Prerequisite recap

Operators combine values in expressions.

## Terms introduced

**Concatenation** joins strings with `+`. **Property access** reads a named feature with a dot. A **method** is a function reached through a value; parentheses call it.

## Step-by-step mental model

Join names first. Store the result. Read `.length`, then call `.toUpperCase()` in separate named statements.

```ts
const fullName = first + " " + last;
const size = fullName.length;
const loud = fullName.toUpperCase();
```

## Common mistakes

- Omitting the space. - Forgetting method-call parentheses.

## DSA relevance

String algorithms inspect lengths and transform text.

## Self-check

1. Does `.length` need parentheses? 2. What do call parentheses mean?

## Exercise preparation

Complete three named operations.

## Authoritative references

- [MDN: String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)
