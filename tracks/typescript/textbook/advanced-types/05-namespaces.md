# Namespaces

## Objectives

- Read namespace declarations in existing TypeScript.
- Distinguish namespaces from ECMAScript modules.
- Avoid unnecessary namespace/module combinations.

## Mental model and syntax

A TypeScript namespace groups names and emits JavaScript that builds or augments an object.

```ts
namespace Geometry {
  export function area(width: number, height: number): number {
    return width * height;
  }
}

Geometry.area(3, 4);
```

Only exported members are visible outside the namespace. Namespace declarations with the same name can merge, a behavior used by some older libraries and declaration files.

For modern Node and browser projects, ECMAScript modules are normally the default. Each module already has scope, explicit import/export relationships, tooling support, and standard runtime semantics. A namespace is not simply a type-only folder; it usually emits a wrapper object. Avoid placing namespaces inside modules merely to add another layer of qualification.

Namespaces remain useful knowledge for ambient declarations, global-script integrations, and maintaining non-module code. Use the project context rather than treating them as universally obsolete or universally preferred.

## Common mistakes

- Expecting unexported namespace members to be public.
- Confusing filesystem modules with namespace objects.
- Combining both patterns and creating `Module.Namespace.member` ceremony.
- Assuming a namespace is erased when it contains values.

## DSA relevance

Namespaces occasionally organize global educational scripts, but modules usually provide cleaner dependency boundaries for reusable algorithm implementations.

## Self-check

1. Does a value namespace emit JavaScript?
2. What modern feature normally provides file-level scope?
3. Why might declaration files still use namespaces?

## References

- [TypeScript Handbook: Namespaces](https://www.typescriptlang.org/docs/handbook/namespaces.html)
- [TypeScript Handbook: Namespaces and Modules](https://www.typescriptlang.org/docs/handbook/namespaces-and-modules.html)
