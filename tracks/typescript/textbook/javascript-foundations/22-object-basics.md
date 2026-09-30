# Object Properties, Identity, and Mutation

## Goal

Create an object, update a property, and reason about identity.

## Prerequisite recap

Bindings can refer to values and arrays.

## Terms introduced

An **object literal** creates keyed properties. **Mutation** changes an existing object. **Identity** asks whether two references point to the same object.

## Step-by-step mental model

Create one object and mutate a property with dot access. A second object literal creates a different identity even when its properties look similar, so strict equality is false:

```ts
const learner = { lessons: 1 };
learner.lessons = 2;
const otherLearner = { lessons: 2 };
const sameLearner = learner === otherLearner; // false
```

Assigning the existing object to another binding is different. `const alias = learner` copies the reference, not the object. Both names then refer to the same identity, so strict equality is true:

```ts
const alias = learner;
const sameLearner = learner === alias; // true
```

## Common mistakes

- Assuming equal-looking objects share identity. - Thinking `const` prevents property mutation.

## DSA relevance

Graphs and linked structures rely on references and mutation.

## Self-check

1. What does object equality compare? 2. Can a property of a const-bound object change?

## Exercise preparation

Mutate `learner.lessons` to `2`, bind `const alias = learner`, and export the result of `learner === alias`. The exercise result is `true` because both bindings hold the same reference.

## Authoritative references

- [MDN: Working with objects](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Working_with_objects)
