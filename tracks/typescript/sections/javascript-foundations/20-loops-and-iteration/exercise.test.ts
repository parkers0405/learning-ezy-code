import { describe, expect, it } from "vitest";
import { countDown, sumUntilLimit } from "@exercise";

describe("for...of and break", () => {
  it("sums values until the next value exceeds the limit", () => {
    expect(sumUntilLimit([2, 3, 5], 6)).toBe(5);
    expect(sumUntilLimit([1, 2, 3], 10)).toBe(6);
  });
});

describe("while", () => {
  it("repeats while its condition remains true", () => {
    expect(countDown(3)).toBe("321");
    expect(countDown(1)).toBe("1");
  });
});
