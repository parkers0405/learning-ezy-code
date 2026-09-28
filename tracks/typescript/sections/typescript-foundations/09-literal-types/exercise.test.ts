import { describe, expect, expectTypeOf, it } from "vitest";
import { sortOrderMessage } from "@exercise";

describe("sortOrderMessage", () => {
  it("describes ascending order", () =>
    expect(sortOrderMessage("ascending")).toBe(
      "The order is set to ascending.",
    ));
  it("describes descending order", () =>
    expect(sortOrderMessage("descending")).toBe(
      "The order is set to descending.",
    ));
  it("accepts only the two literal values", () =>
    expectTypeOf(sortOrderMessage)
      .parameter(0)
      .toEqualTypeOf<"ascending" | "descending">());
});
