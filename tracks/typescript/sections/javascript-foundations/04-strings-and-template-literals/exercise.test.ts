import { describe, expect, it } from "vitest";
import { formatProfile, initials } from "@exercise";

describe("formatProfile", () => {
  it("interpolates text and a number", () =>
    expect(formatProfile("Ada", "TypeScript", 12)).toBe(
      "Ada solves TypeScript problems (12 complete)",
    ));
  it("preserves spaces and punctuation in interpolated values", () =>
    expect(formatProfile("A. Lee", "JS/TS", 0)).toBe(
      "A. Lee solves JS/TS problems (0 complete)",
    ));
});

describe("initials", () => {
  it("combines and uppercases first characters", () =>
    expect(initials("grace", "hopper")).toBe("GH"));
  it("trims surrounding whitespace", () =>
    expect(initials("  alan", "turing  ")).toBe("AT"));
});
