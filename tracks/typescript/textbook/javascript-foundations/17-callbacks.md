# Callbacks

## Goal

Pass a function to another function and invoke it.

## Prerequisite recap

Functions can be stored as values.

## Terms introduced

A **callback** is a function passed to other code to be called by that code.

## Step-by-step mental model

`applyTwice` receives a value and an action. Call action once, name the result, call it again with that result, then return the second result. Type annotations are supplied scaffolding.

```ts
const first = action(value);
const second = action(first);
return second;
```

## Common mistakes

- Returning the callback instead of calling it. - Calling twice with the original value.

## DSA relevance

Callbacks parameterize traversal and transformation behavior.

## Self-check

1. Who decides when a callback runs? 2. What becomes the second argument value?

## Exercise preparation

Use two named call results.

## Authoritative references

- [MDN: Callback function glossary](https://developer.mozilla.org/en-US/docs/Glossary/Callback_function)
