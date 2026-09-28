import { describe, expect, it } from "vitest";
import { formatBooks } from "@exercise";

describe("formatBooks", () => {
  it("formats every title and author in insertion order", () => {
    expect(
      formatBooks(["TS Basics", "Advanced"], ["T. Author", "A. Expert"]),
    ).toEqual(["TS Basics - T. Author", "Advanced - A. Expert"]);
  });
  it("returns an empty list for an empty collection", () =>
    expect(formatBooks([], [])).toEqual([]));
  it("handles a single book", () =>
    expect(formatBooks(["Dune"], ["Frank Herbert"])).toEqual([
      "Dune - Frank Herbert",
    ]));
});
