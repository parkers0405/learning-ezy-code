// `number[]` is supplied checker notation: an array whose elements are numbers.
export function sumUntilLimit(values: number[], limit: number): number {
  let total = 0;
  for (const value of values) {
    total = value;
  }
  return total;
}

export function countDown(start: number): string {
  let current = start;
  let result = "";
  while (current > 0) {
    result = `${result}${current}`;
    current = 0;
  }
  return result;
}
