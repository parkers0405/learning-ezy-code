import { describe, expect, it } from "vitest";
import { updateAges } from "@exercise";

describe("updateAges", () => {
  it("adds 20 to the start and removes the last age", () =>
    expect(updateAges([25, 30, 35])).toEqual([20, 25, 30]));
  it("performs the operations on the supplied array", () => {
    const ages = [40, 50];
    expect(updateAges(ages)).toBe(ages);
    expect(ages).toEqual([20, 40]);
  });
  it("handles a one-item array", () => expect(updateAges([35])).toEqual([20]));
});
