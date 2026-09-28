# Runtime and Compile-Time Introduction

## Objectives

- Distinguish TypeScript checking from JavaScript execution.
- Follow the edit, type-check, test, and submit loop.
- Read a function signature as an input/output contract.

## Mental model

TypeScript is JavaScript plus a static type checker. The checker examines source code before it runs and reports operations it cannot prove safe. A tool then removes type syntax; a JavaScript runtime executes the result. Types can prevent many mistakes, but they do not validate network responses, user input, or other runtime data by themselves.

```ts
function double(value: number): number {
  return value * 2;
}

double(4); // runtime result: 8
// double("4"); // compile-time error
```

The `number` annotations disappear from emitted JavaScript. Multiplication and function calls remain. This runtime/type-system boundary is the central model for the whole track.

Type inference means annotations are not required everywhere. `const attempts = 3` is inferred as a number. Annotate public function boundaries when it makes a contract easier to understand; let clear local values be inferred.

Early exercises include supplied `export` keywords and occasional parameter annotations so the test runner can reach learner code and strict checking can understand its inputs. Treat those pieces as scaffolding for now; modules and TypeScript's type syntax are explained in later chapters. Change only the behavior requested by each exercise contract.

## Common mistakes

- Treating a successful type-check as proof that an algorithm is correct. Tests cover behavior that types do not.
- Expecting TypeScript to exist at runtime. An annotation cannot inspect unknown data.
- Editing tests to make an implementation pass. Tests are the contract; edit learner source instead.
- Reading a diagnostic only from the top. Its file, line, expected type, and received type usually identify the mismatch.

## DSA relevance

Algorithm work alternates between static structure and dynamic behavior. Types describe inputs, outputs, nodes, and invariants; tests demonstrate boundary cases and complexity-sensitive behavior. Keeping those jobs separate makes debugging systematic.

## Self-check

1. Which tool executes arithmetic: TypeScript or JavaScript?
2. Does passing the checker prove the returned value is correct?
3. Why can local inference be preferable to repeating obvious types?

## References

- [TypeScript Handbook: TypeScript for the New Programmer](https://www.typescriptlang.org/docs/handbook/typescript-from-scratch.html)
- [TypeScript Handbook: Everyday Types](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html)
