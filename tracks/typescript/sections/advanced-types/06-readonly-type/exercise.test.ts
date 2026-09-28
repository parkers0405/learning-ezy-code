import { describe, expectTypeOf, it } from "vitest";
import type { ReadonlyPoint } from "@exercise";

describe("ReadonlyPoint", () => {
  it("retains numeric x and y", () =>
    expectTypeOf<ReadonlyPoint>().toMatchTypeOf<{
      readonly x: number;
      readonly y: number;
    }>());
  it("rejects assignment to x", () => {
    const point = {} as ReadonlyPoint;
    // @ts-expect-error x must be readonly
    point.x = 100;
  });
  it("rejects assignment to y", () => {
    const point = {} as ReadonlyPoint;
    // @ts-expect-error y must be readonly
    point.y = 100;
  });
});
