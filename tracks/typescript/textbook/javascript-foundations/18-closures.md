# Closures

## Goal

Understand a returned function remembering outer state.

## Prerequisite recap

Callbacks and arrow functions are function values.

## Terms introduced

A **closure** is a function together with access to bindings from where it was created.

## Step-by-step mental model

Each `makeCounter` call creates a separate `count`. The returned arrow closes over it. Later calls update that same binding even after `makeCounter` returned.

```ts
let count = 0;
return () => {
  count = count + 1;
  return count;
};
```

## Common mistakes

- Resetting state inside the returned function. - Sharing one outer variable among independent counters.

## DSA relevance

Closures retain traversal state and build configurable helpers.

## Self-check

1. Which binding is remembered? 2. Do two counters share it?

## Exercise preparation

Update and return the closed-over count.

## Authoritative references

- [MDN: Closures](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Closures)
