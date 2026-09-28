import { describe, expect, it } from "vitest";
import { frequencies, uniqueInOrder } from "@exercise";

describe("uniqueInOrder", () => {
  it("removes duplicates while preserving first-seen order", () =>
    expect(uniqueInOrder(["b", "a", "b", "c", "a"])).toEqual(["b", "a", "c"]));
  it("handles empty input", () => expect(uniqueInOrder([])).toEqual([]));
});

describe("frequencies", () => {
  it("counts repeated values", () =>
    expect([...frequencies(["red", "blue", "red"]).entries()]).toEqual([
      ["red", 2],
      ["blue", 1],
    ]));
  it("returns an empty Map for empty input", () =>
    expect(frequencies([])).toEqual(new Map()));
  it("keeps distinct case-sensitive keys", () =>
    expect(frequencies(["A", "a"])).toEqual(
      new Map([
        ["A", 1],
        ["a", 1],
      ]),
    ));
});
