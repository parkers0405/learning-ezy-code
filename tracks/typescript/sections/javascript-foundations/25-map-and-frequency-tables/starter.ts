export function frequencies(values: string[]): Map<string, number> {
  const counts = new Map<string, number>();
  for (const value of values) {
    counts.set(value, 0);
  }
  return counts;
}
