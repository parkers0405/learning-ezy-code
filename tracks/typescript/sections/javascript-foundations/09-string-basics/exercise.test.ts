import { describe, expect, it } from "vitest";
import { fullName, letterCount, loudName } from "@exercise";
describe("strings", () => {
  it("joins and inspects text", () => {
    expect(fullName).toBe("Ada Lovelace");
    expect(letterCount).toBe(12);
    expect(loudName).toBe("ADA LOVELACE");
  });
});
