# Classes

**Required reading:** [Classes](../../../textbook/typescript-foundations/14-classes.md)

## Behavioral contract

`new Counter(start: number)` creates a `Counter`; each `increment(): number` call increases that instance's count by one and returns the new count. Non-number constructor arguments are rejected.

## Practice instruction

Inside the supplied class method, update `this.count` with expanded assignment and return `this.count`. Keep state on the instance rather than in an outer binding.
