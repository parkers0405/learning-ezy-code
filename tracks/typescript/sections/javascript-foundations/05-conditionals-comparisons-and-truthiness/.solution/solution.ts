export function firstDefined(
  a: number | null | undefined,
  b: number | null | undefined,
  c: number,
): number {
  return a ?? b ?? c;
}
