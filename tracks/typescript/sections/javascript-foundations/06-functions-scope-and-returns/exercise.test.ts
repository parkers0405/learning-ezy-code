import { describe, expect, it } from "vitest";
import { greet, makeScaler, multiply } from "@exercise";

describe("multiply", () => {
  it("multiplies two positive numbers", () => expect(multiply(3, 4)).toBe(12));
  it("handles zero", () => expect(multiply(9, 0)).toBe(0));
  it("preserves the sign of a negative product", () =>
    expect(multiply(-3, 5)).toBe(-15));
});

describe("defaults, returns, and lexical scope", () => {
  it("uses the default greeting when one is omitted", () =>
    expect(greet("Ada")).toBe("Hello, Ada!"));
  it("accepts an explicit greeting", () =>
    expect(greet("Lin", "Welcome")).toBe("Welcome, Lin!"));
  it("captures the factor in a returned function", () => {
    const triple = makeScaler(3);
    expect(triple(4)).toBe(12);
    expect(triple(-2)).toBe(-6);
  });
});
