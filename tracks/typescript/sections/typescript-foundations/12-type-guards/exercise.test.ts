import { describe, expect, it } from "vitest";
import { processValue } from "@exercise";

describe("processValue type guard", () => {
  it("squares a number", () => expect(processValue(4)).toBe(16));
  it("squares a negative number", () => expect(processValue(-3)).toBe(9));
  it("returns a string length", () => expect(processValue("hello")).toBe(5));
  it("handles an empty string", () => expect(processValue("")).toBe(0));
});
