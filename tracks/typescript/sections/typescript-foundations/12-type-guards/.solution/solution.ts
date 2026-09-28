export function processValue(value: number | string): number {
  return typeof value === "number" ? value * value : value.length;
}
