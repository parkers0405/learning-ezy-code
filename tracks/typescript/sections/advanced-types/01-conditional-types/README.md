# Conditional types

**Required reading:** [Conditional Types](../../../textbook/advanced-types/01-conditional-types.md)

## Behavioral contract

`IsString<string>` is exactly `"Yes"`, `IsString<number>` is exactly `"No"`, and `IsString<string | boolean>` distributes to `"Yes" | "No"`; `"Maybe"` is rejected.

## Practice instruction

Define `IsString<T>` with the conditional type form `T extends string ? "Yes" : "No"`. This is a compile-time-only exercise with no runtime implementation.

## Attribution

> Adapted from upstream `Conditional Types.md`; see the root `NOTICE`.
