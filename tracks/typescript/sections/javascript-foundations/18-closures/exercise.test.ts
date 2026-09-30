import { describe, expect, it } from "vitest";
import { makeCounter } from "@exercise";
describe("closures", () => {
  it("remembers private state", () => {
    const count = makeCounter();
    expect(count()).toBe(1);
    expect(count()).toBe(2);
  });
});
