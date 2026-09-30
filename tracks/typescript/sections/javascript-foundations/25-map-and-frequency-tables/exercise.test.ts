import { describe, expect, it } from "vitest";
import { frequencies } from "@exercise";
describe("Map frequency tables", () => {
  it("counts repeated keys", () => {
    expect([...frequencies(["a", "b", "a"])]).toEqual([
      ["a", 2],
      ["b", 1],
    ]);
  });
});
