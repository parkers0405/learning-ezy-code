import { describe, expect, it } from "vitest";
import { describePositiveCount } from "@exercise";

describe("try, catch, and finally", () => {
  it("keeps the successful result and runs finally", () => {
    expect(describePositiveCount("4")).toBe("count: 4; finished");
  });
  it("catches both familiar error kinds and runs finally", () => {
    expect(describePositiveCount("no")).toBe("number required; finished");
    expect(describePositiveCount("-1")).toBe(
      "positive value required; finished",
    );
  });
});
