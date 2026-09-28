import { describe, expectTypeOf, it } from "vitest";
import type { CompletePoint } from "@exercise";

describe("CompletePoint utility type", () => {
  it("requires both numeric coordinates", () =>
    expectTypeOf<CompletePoint>().toEqualTypeOf<{ x: number; y: number }>());
  it("rejects a missing y coordinate", () => {
    // @ts-expect-error CompletePoint requires y
    const point: CompletePoint = { x: 10 };
    expectTypeOf(point).toMatchTypeOf<CompletePoint>();
  });
  it("rejects a missing x coordinate", () => {
    // @ts-expect-error CompletePoint requires x
    const point: CompletePoint = { y: 10 };
    expectTypeOf(point).toMatchTypeOf<CompletePoint>();
  });
});
