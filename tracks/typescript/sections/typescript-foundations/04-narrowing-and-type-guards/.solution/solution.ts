export function processValue(value: number | string): number {
  if (typeof value === "string") {
    return value.length;
  }
  return value * value;
}

// @ts-expect-error The union excludes booleans.
processValue(true);
