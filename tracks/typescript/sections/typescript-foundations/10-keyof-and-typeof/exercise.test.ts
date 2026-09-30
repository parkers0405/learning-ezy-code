import { describe, expect, expectTypeOf, it } from "vitest";
import { readLearner, type LearnerKey } from "@exercise";

// @ts-expect-error "missing" is not a key of the learner object.
const invalidKey = readLearner("missing");
void invalidKey;

describe("keyof and typeof", () => {
  it("reads every inferred object key without generics", () => {
    expectTypeOf<LearnerKey>().toEqualTypeOf<"name" | "lessons">();
    expect(readLearner("name")).toBe("Ada");
    expect(readLearner("lessons")).toBe(2);
  });
});
