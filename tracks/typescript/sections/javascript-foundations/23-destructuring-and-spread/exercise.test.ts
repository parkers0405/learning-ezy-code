import { describe, expect, it } from "vitest";
import { name, playerWithBonus, score } from "@exercise";

describe("object destructuring and spread", () => {
  it("exports the selected property values", () => {
    expect(name).toBe("Ada");
    expect(score).toBe(7);
  });
  it("exports the requested updated object", () => {
    expect(playerWithBonus).toEqual({ name: "Ada", score: 10, active: true });
  });
});
