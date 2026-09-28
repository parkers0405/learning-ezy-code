# Objects, Properties, and Destructuring

## Objectives

- Model related named values as objects.
- Read properties and destructure bindings.
- Copy and update objects without accidental mutation.

## Mental model

An object is a runtime collection of keyed properties with identity. Two separately created objects with equal-looking properties are not strictly equal. A TypeScript object type describes the required property shape but does not create, clone, or freeze a runtime object.

```ts
const player = { name: "Inez", score: 8 };
const { name, score } = player;
const promoted = { ...player, score: score + 1 };
```

Destructuring creates local bindings from properties. Spread copies enumerable own properties into a new object; later properties win, which is why the updated `score` comes after `...player`. The copy is shallow. If a property contains an array or nested object, both outer objects still refer to that nested value.

Bracket access (`record[key]`) handles computed keys; dot access (`record.name`) handles fixed identifiers. Later chapters show how `keyof` safely relates computed keys to object types.

The exercise supplies inline object annotations so strict checking knows which properties its function inputs contain. Focus on object behavior here. A later chapter introduces type aliases for naming and reusing shapes without repetition.

## Common mistakes

- Mutating an input object when the contract promises a new value.
- Putting an updated property before the spread and having the old value overwrite it.
- Treating spread as a deep clone.
- Comparing objects with `===` when structural equality was intended.

## DSA relevance

Objects represent nodes, intervals, coordinates, and records. Non-mutating updates reduce aliasing surprises, while intentional mutation can improve performance when ownership is clear.

## Self-check

1. Are `{ x: 1 } === { x: 1 }` equal?
2. Which duplicate property wins in an object literal?
3. What remains shared after a shallow copy?

## References

- [MDN: Working with objects](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Working_with_objects)
- [MDN: Destructuring](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring)
- [TypeScript Handbook: Object types](https://www.typescriptlang.org/docs/handbook/2/objects.html)
