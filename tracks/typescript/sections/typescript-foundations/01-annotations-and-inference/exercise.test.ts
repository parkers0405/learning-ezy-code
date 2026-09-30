import { describe, expect, expectTypeOf, it } from "vitest";
import { annotatedCount, inferredMessage } from "@exercise";

// @ts-expect-error The annotated count rejects text.
const invalidCount: typeof annotatedCount = "three";
void invalidCount;
describe("annotations and inference", () => {
  it("aligns types and values", () => {
    expectTypeOf(inferredMessage).toBeString();
    expectTypeOf(annotatedCount).toBeNumber();
    expect(annotatedCount).toBe(3);
  });
});
