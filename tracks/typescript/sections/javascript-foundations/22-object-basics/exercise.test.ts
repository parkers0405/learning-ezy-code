import { describe, expect, it } from "vitest";
import { learner, sameLearner } from "@exercise";
describe("objects", () => {
  it("exports the updated property and shared-identity result", () => {
    expect(learner.lessons).toBe(2);
    expect(sameLearner).toBe(true);
  });
});
