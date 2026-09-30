import { describe, expect, it } from "vitest";
import { uniqueColors } from "@exercise";
describe("Set", () => {
  it("keeps unique values and adds one", () => {
    expect([...uniqueColors]).toEqual(["red", "blue", "green"]);
  });
});
