# Functions, Defaults, Scope, and Returns

## Objectives

- Define typed parameters and return values.
- Use defaults and lexical scope deliberately.
- Keep functions focused and predictable.

## Mental model

A function packages behavior behind an input/output boundary. Calling it creates a local scope for parameters and bindings. Name lookup is lexical: code can use bindings from the surrounding source scopes, but outside code cannot access a function's locals.

Parameters, closures, calls, and returned values are JavaScript runtime behavior. Type annotations describe the permitted calls and return paths during compile-time checking, then disappear from emitted code.

```ts
const taxRate = 0.2;

function total(price: number, quantity = 1): number {
  const subtotal = price * quantity;
  return subtotal + subtotal * taxRate;
}
```

The default is used when the argument is omitted or explicitly `undefined`, not when it is `0`. A `return` immediately ends the call. If execution reaches the end without returning, JavaScript returns `undefined`. TypeScript can detect a missing path when the declared result excludes `undefined` and strict checking is enabled.

Functions are values: they can be stored, passed to methods such as `map`, and returned. Arrow functions provide compact syntax and capture `this` differently; ordinary standalone transformations can use either style.

## Common mistakes

- Logging a result but forgetting to return it.
- Mutating outer state unexpectedly, making repeated calls hard to reason about.
- Replacing a default with `quantity || 1`, which treats a valid zero as missing.
- Declaring parameters more broadly than the function can actually handle.

## DSA relevance

Small functions isolate algorithm steps and recursive functions express subproblems. Clear contracts identify base cases, input constraints, and accumulator results.

## Self-check

1. What does a function return when no `return` runs?
2. When is a default parameter applied?
3. Can code outside a function access its local binding?

## References

- [MDN: Functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions)
- [MDN: Default parameters](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Default_parameters)
- [TypeScript Handbook: Functions](https://www.typescriptlang.org/docs/handbook/2/functions.html)
