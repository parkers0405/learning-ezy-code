# Loops and Iteration

## Objectives

- Select `for`, `while`, or `for...of` for an iteration task.
- Maintain initialization, progress, and termination invariants.
- Use `break` and `continue` sparingly and intentionally.

## Mental model

A loop repeats a statement while making progress toward termination. A counting `for` loop places initialization, condition, and update together. `for...of` reads values from an iterable and avoids manual indexing. A `while` loop fits algorithms whose next step controls when they stop.

JavaScript performs every iteration at runtime. TypeScript can reject invalid operations inside a loop and track narrowed types, but it cannot prove that an arbitrary loop terminates.

```ts
let total = 0;
for (const value of [3, 5, 8]) {
  total += value;
}

for (let index = 0; index < 3; index += 1) {
  console.log(index);
}
```

At the start of every iteration, ask what remains true (the invariant), what changes (progress), and why the condition eventually becomes false (termination). `break` exits the nearest loop. `continue` skips to its next iteration. Both are useful, but many jumps can hide the invariant.

Do not use `for...in` for array values: it iterates enumerable property keys as strings. Use `for...of` for values or an indexed loop when the position is needed.

Parallel arrays store related values at the same index. When `titles[index]` corresponds to `authors[index]`, an indexed loop makes that relationship explicit. Real programs often replace parallel arrays with objects once object modeling has been introduced.

## Common mistakes

- Using `<= array.length`, which reads one position past the end.
- Forgetting to update a `while` loop's state.
- Accidentally nesting a full traversal and turning linear work into quadratic work.
- Mutating the collection's length while iterating without accounting for shifted positions.

## DSA relevance

Traversal is the engine of searching, sorting, scanning, and dynamic programming. Loop invariants are also a practical way to explain and prove algorithm correctness.

## Self-check

1. When is `for...of` clearer than an indexed loop?
2. What three questions establish a loop's correctness?
3. Why avoid `for...in` for array values?

## References

- [MDN: Loops and iteration](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Loops_and_iteration)
- [MDN: for...of](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...of)
