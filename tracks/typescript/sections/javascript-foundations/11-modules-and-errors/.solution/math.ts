export function add(x: number, y: number): number {
  return x + y;
}

export function divide(x: number, y: number): number {
  if (y === 0) throw new RangeError("division by zero");
  return x / y;
}
