export function log(
  target: object,
  propertyKey: string,
  descriptor: PropertyDescriptor,
): void {
  const original = descriptor.value as (...args: unknown[]) => unknown;
  descriptor.value = function (...args: unknown[]) {
    console.log(`${propertyKey} method called`);
    return original.apply(this, args);
  };
}
export class Calculator {
  add(a: number, b: number): number {
    return a + b;
  }
}
const descriptor = Object.getOwnPropertyDescriptor(
  Calculator.prototype,
  "add",
)!;
log(Calculator.prototype, "add", descriptor);
Object.defineProperty(Calculator.prototype, "add", descriptor);
