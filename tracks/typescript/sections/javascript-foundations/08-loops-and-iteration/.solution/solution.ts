export function formatBooks(titles: string[], authors: string[]): string[] {
  const lines: string[] = [];
  for (let index = 0; index < titles.length; index += 1) {
    lines.push(`${titles[index]} - ${authors[index]}`);
  }
  return lines;
}
