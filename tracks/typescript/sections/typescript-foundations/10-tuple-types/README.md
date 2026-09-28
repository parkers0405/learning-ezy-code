# Tuple Types

**Prerequisites:** Complete preceding roadmap entries. **Required reading:** [Tuple Types](../../../textbook/typescript-foundations/10-tuple-types.md)

Tuples are arrays with a known length and type at each position, such as `[string, number]`. Named elements improve readability. Tuples can have optional and rest elements; use `readonly` tuples when mutation is undesirable.

## Exercise

Return `The value for Age is 30.` from the supplied string-number tuple.

### Test contract

Export `displayTuple` accepting exactly `[string, number]` and format either element values into the required sentence.

> Adapted from upstream `Tuple Types.md`; see the root `NOTICE`.

Run `corepack yarn test`, `corepack yarn typecheck`, `corepack yarn submit`, or `corepack yarn solution` here.
