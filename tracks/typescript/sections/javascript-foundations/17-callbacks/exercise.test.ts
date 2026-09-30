import { describe, expect, it } from "vitest";
import { applyTwice } from "@exercise";
describe("callbacks", () => {
  it("calls the supplied function twice", () => {
    const received: number[] = [];
    const addOne = (value: number) => {
      received.push(value);
      return value + 1;
    };
    expect(applyTwice(3, addOne)).toBe(5);
    expect(received).toEqual([3, 4]);
  });
});
