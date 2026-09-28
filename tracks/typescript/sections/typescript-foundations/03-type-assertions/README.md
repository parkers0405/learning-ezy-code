# Type Assertions

**Prerequisites:** Complete preceding roadmap entries. **Required reading:** [Type Assertions](../../../textbook/typescript-foundations/03-type-assertions.md)

An assertion tells the compiler to treat a value as a type: `value as string` or, outside JSX, `<string>value`. It performs no runtime conversion or validation, so use it only when you know something the compiler cannot infer. Prefer narrowing when possible.

## Exercise

Use an assertion in `getStringLength` to return the supplied string's length.

### Test contract

Export `getStringLength(value: any)` and use a string assertion to return the input's character count, including zero-length and punctuation cases.

> Adapted and reformatted from upstream `Type Assertions.md`; see the root `NOTICE`.

Run `corepack yarn test`, `corepack yarn typecheck`, `corepack yarn submit`, or `corepack yarn solution` here.
