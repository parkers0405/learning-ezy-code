# Local and Outer Scope, Defaults, and Returns

## Goal

Distinguish local and outer bindings, use a default parameter, and return the intended local result.

## Prerequisite recap

A function declaration has a name, parameters, a body, and a return value. Calling it binds arguments to parameters.

## Terms introduced

A binding's **scope** is the region of source where its name can be used. A parameter and a binding declared inside a function have **local scope**. A binding declared outside has **outer scope**. A **default parameter** supplies a value when the caller omits that argument. A **missing return** lets execution reach the end, producing `undefined`.

## Step-by-step mental model

When `greet("Ada")` runs, `name` receives `"Ada"` and the omitted `greeting` receives its default `"Hello"`. The body can read local `name`, local `greeting`, and outer `punctuation`. Its local `message` exists only during that call.

```ts
const punctuation = "!";
function greet(name: string, greeting = "Hello"): string {
  const message = `${greeting}, ${name}${punctuation}`;
  return message;
}
```

The `: string` pieces are supplied checker annotations: the parameter accepts text and the function returns text. Their formal lesson comes in TypeScript Foundations.

## Common mistakes

- Expecting a local binding to exist outside its function.
- Replacing an explicitly supplied argument with the default.
- Building the result but forgetting to return it.

## DSA relevance

Small scopes keep temporary algorithm state from leaking into unrelated steps. Defaults make genuinely optional inputs explicit.

## Self-check

1. Which bindings are local? 2. When is the default used? 3. What happens when a function body reaches its end without `return`?

## Exercise preparation

Build and return a local message using both parameters and the outer punctuation binding. Tests call both the default and explicit-greeting cases.

## Authoritative references

- [MDN: Function scope](https://developer.mozilla.org/en-US/docs/Glossary/Function_scope)
- [MDN: Default parameters](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Default_parameters)
