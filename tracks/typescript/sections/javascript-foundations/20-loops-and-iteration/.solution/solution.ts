export function sumUntilLimit(values: number[], limit: number): number {
  let total = 0;
  for (const value of values) {
    if (total + value > limit) {
      break;
    }
    total = total + value;
  }
  return total;
}

export function countDown(start: number): string {
  let current = start;
  let result = "";
  while (current > 0) {
    result = `${result}${current}`;
    current = current - 1;
  }
  return result;
}
