import { describe, expect, it } from "vitest";
import { describePlayer, withBonus } from "@exercise";

const player = { name: "Mina", score: 10, active: true };

describe("describePlayer", () => {
  it("reads selected object properties", () =>
    expect(describePlayer(player)).toBe("Mina: 10"));
  it("works for zero scores", () =>
    expect(describePlayer({ name: "Kai", score: 0, active: false })).toBe(
      "Kai: 0",
    ));
});

describe("withBonus", () => {
  it("returns a copy with an updated score", () =>
    expect(withBonus(player, 5)).toEqual({
      name: "Mina",
      score: 15,
      active: true,
    }));
  it("does not mutate the input object", () => {
    const original = { ...player };
    expect(withBonus(original, 2)).not.toBe(original);
    expect(original).toEqual(player);
  });
});
