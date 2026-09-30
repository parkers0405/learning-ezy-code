# Callbacks

## Behavioral contract

`applyTwice(value, action)` calls `action` exactly twice: first with `value`, then with the first result. It returns the second result.

## Practice instruction

Store or directly pass the first callback result into the second callback call, then return the second result. The callback type annotation is supplied scaffolding.
