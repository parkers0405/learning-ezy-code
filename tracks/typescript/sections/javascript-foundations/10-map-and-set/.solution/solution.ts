export function uniqueInOrder(values: string[]): string[] {
  return [...new Set(values)];
}

export function frequencies(values: string[]): Map<string, number> {
  const counts = new Map<string, number>();
  for (const value of values) counts.set(value, (counts.get(value) ?? 0) + 1);
  return counts;
}
