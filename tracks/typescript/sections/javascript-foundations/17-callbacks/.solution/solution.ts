export function applyTwice(
  value: number,
  action: (item: number) => number,
): number {
  const afterFirstCall = action(value);
  const afterSecondCall = action(afterFirstCall);
  return afterSecondCall;
}
