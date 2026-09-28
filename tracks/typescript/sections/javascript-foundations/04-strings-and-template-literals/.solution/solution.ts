export function formatProfile(
  name: string,
  language: string,
  solved: number,
): string {
  return `${name} solves ${language} problems (${solved} complete)`;
}

export function initials(first: string, last: string): string {
  return `${first.trim().charAt(0)}${last.trim().charAt(0)}`.toUpperCase();
}
