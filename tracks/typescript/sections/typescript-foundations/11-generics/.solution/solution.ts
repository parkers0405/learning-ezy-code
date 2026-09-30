export function wrapInArray<T>(value: T): T[] {
  return [value];
}

// @ts-expect-error Explicit string type argument rejects a number.
wrapInArray<string>(1);
