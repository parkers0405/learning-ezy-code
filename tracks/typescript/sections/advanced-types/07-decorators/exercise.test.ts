import { describe, expect, expectTypeOf, it, vi } from "vitest";
import { Calculator, log } from "@exercise";

// @ts-expect-error The decorated method retains numeric parameters.
const invalidSum = new Calculator().add("two", 3);
void invalidSum;
// @ts-expect-error The second add parameter is also numeric.
const invalidSecondAddend = new Calculator().add(2, "three");
void invalidSecondAddend;
expectTypeOf(Calculator.prototype.add).toEqualTypeOf<
  (a: number, b: number) => number
>();

describe("log method decorator", () => {
  it("logs the decorated method name", () => {
    const output = vi.spyOn(console, "log").mockImplementation(() => {});
    const descriptor = Object.getOwnPropertyDescriptor(
      Calculator.prototype,
      "add",
    )!;
    log(Calculator.prototype, "add", descriptor);
    Object.defineProperty(Calculator.prototype, "add", descriptor);
    new Calculator().add(2, 3);
    expect(output).toHaveBeenCalledWith("add method called");
  });
  it("preserves the original return value", () =>
    expect(new Calculator().add(7, 8)).toBe(15));
});
