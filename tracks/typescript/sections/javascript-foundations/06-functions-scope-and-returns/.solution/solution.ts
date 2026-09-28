export function multiply(a: number, b: number): number {
  return a * b;
}

export function greet(name: string, greeting = "Hello"): string {
  return `${greeting}, ${name}!`;
}

export function makeScaler(factor: number): (value: number) => number {
  return (value) => value * factor;
}
