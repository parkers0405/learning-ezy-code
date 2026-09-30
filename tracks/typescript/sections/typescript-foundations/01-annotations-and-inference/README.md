# Annotations and inference

**Required reading:** [Annotations and Inference](../../../textbook/typescript-foundations/01-annotations-and-inference.md)

## Behavioral contract

`inferredMessage` has static type `string`. `annotatedCount` has static type `number` and runtime value `3`; assigning text to that type is rejected.

## Practice instruction

Leave `inferredMessage` without an annotation so its type is inferred. Keep the explicit `: number` annotation on `annotatedCount` and correct only its value.
