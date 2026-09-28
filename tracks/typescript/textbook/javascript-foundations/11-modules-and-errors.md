# Modules and Basic Error Handling

## Objectives

- Export and import module values explicitly.
- Distinguish expected return outcomes from thrown failures.
- Narrow caught values before inspecting them.

## Mental model

A file containing a top-level `import` or `export` is a module with its own scope. Named exports make dependencies visible and let tests import exactly the public contract.

```ts
// math.ts
export function divide(left: number, right: number): number {
  if (right === 0) throw new RangeError("division by zero");
  return left / right;
}

// report.ts
import { divide } from "./math.js";
```

Throwing interrupts normal control flow until a matching `catch` handles the value. Use exceptions for failures a function cannot represent as an ordinary result. For an expected absence, returning `undefined` or a later discriminated result type may communicate better.

JavaScript allows throwing any value. With safe compiler settings, a caught value should be treated as `unknown`; check `error instanceof Error` before reading `.message`. A `finally` block runs whether the protected operation succeeds or throws, which is useful for releasing resources—not for hiding errors.

Imports are runtime relationships, while TypeScript also checks their exported types. A `type`-only import can be removed entirely from JavaScript output.

## Common mistakes

- Forgetting to export a value that another module needs.
- Catching every exception and silently returning a misleading value.
- Assuming every caught value is an `Error` object.
- Creating circular module dependencies that are sensitive to initialization order.

## DSA relevance

Modules separate data structures from clients and tests. Explicit failure behavior clarifies preconditions such as non-empty stacks or valid indexes, while keeping the successful algorithm path readable.

## Self-check

1. What gives a module its own scope?
2. When might `undefined` be clearer than throwing?
3. Why narrow a caught value before reading `.message`?

## References

- [MDN: JavaScript modules](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules)
- [MDN: throw](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/throw)
- [TypeScript Handbook: Modules](https://www.typescriptlang.org/docs/handbook/2/modules.html)
