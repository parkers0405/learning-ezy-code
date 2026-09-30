# Enum Type

## Goal

Use members of a supplied numeric enum and classify them with an explicit condition.

## Prerequisite recap

Literal types described closed choices at checker time. Classes introduced declarations that also create runtime values.

## Terms introduced

An **enum** declares a closed group of named members and creates a runtime object. A **numeric enum** gives the first uninitialized member value `0` and increments later members by one.

## Step-by-step mental model

```ts
enum Days {
  Sunday,
  Monday,
  Tuesday,
}
```

`Days.Sunday` is the named member for numeric value `0`; `Days.Monday` is `1`. Code should use member names rather than depending on those numbers.

```ts
if (day === Days.Sunday) {
  return "Weekend";
}
return "Weekday";
```

Unlike aliases and interfaces, a regular enum exists at runtime. This exercise focuses only on selecting members and branching; string enums and enum alternatives are separate design choices.

The test uses supplied `it.each([...])` syntax. Vitest runs the same named test body once for each member in the array; `%s` in the title displays that case's value. This avoids copying an identical assertion for every day.

## Common mistakes

- Comparing an enum parameter with the text `"Sunday"`.
- Forgetting that both Saturday and Sunday are weekend members.
- Assuming an enum is erased like an interface.

## DSA relevance

Named states and directions can make state machines and grid traversal easier to read.

## Self-check

1. Does a regular enum exist at runtime? 2. What value does the first numeric member receive? 3. Why prefer `Days.Sunday` to `0`?

## Exercise preparation

Use an explicit `if` condition for `Days.Sunday` or `Days.Saturday`, then return `"Weekday"` afterward. Do not use a ternary; tests verify results, while this source form is deliberate practice.

## Authoritative references

- [TypeScript Handbook: Enums](https://www.typescriptlang.org/docs/handbook/enums.html)
