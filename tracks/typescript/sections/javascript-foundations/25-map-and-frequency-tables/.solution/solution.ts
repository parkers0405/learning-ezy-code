export function frequencies(values: string[]): Map<string, number> {
  const counts = new Map<string, number>();
  for (const value of values) {
    const previous = counts.get(value) ?? 0;
    counts.set(value, previous + 1);
  }
  return counts;
}
