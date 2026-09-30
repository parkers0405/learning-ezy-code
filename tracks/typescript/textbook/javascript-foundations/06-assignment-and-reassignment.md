# Assignment and Reassignment

## Goal

Update a deliberately mutable binding.

## Prerequisite recap

Declarations create and initialize bindings.

## Terms introduced

**Assignment** stores a value; **reassignment** changes one after initialization. `=` assigns and does not compare.

## Step-by-step mental model

`let score = 2` runs first. `score = 5` evaluates `5` and replaces the current binding value. The tested behavior is the final value `5`; using a `let` declaration followed by assignment is the requested practice technique.

```ts
let score = 2;
score = 5;
```

## Common mistakes

- Writing a second `let`. - Reassigning a `const`.

## DSA relevance

Counters and accumulators model changing algorithm state.

## Self-check

1. How does reassignment differ from declaration? 2. What is the final value above?

## Exercise preparation

Change the assignment, not the declaration. A runtime assertion can observe the final value but cannot prove which declaration keyword or assignment sequence produced it.

## Authoritative references

- [MDN: Assignment](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Assignment)
