import { describe, expectTypeOf, it } from "vitest";
import type { NullablePoint } from "@exercise";

// @ts-expect-error Mapped values allow number or null, not text.
const invalidPoint: NullablePoint = { x: "zero", y: 1 };
void invalidPoint;

describe("NullablePoint mapped type", () => {
  it("allows null for x", () =>
    expectTypeOf<{ x: null; y: number }>().toMatchTypeOf<NullablePoint>());
  it("allows null for y", () =>
    expectTypeOf<{ x: number; y: null }>().toMatchTypeOf<NullablePoint>());
  it("preserves both Point keys", () =>
    expectTypeOf<keyof NullablePoint>().toEqualTypeOf<"x" | "y">());
});
