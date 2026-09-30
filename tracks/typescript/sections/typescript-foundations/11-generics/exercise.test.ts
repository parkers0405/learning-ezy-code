import { describe, expect, expectTypeOf, it } from "vitest";
import { wrapInArray } from "@exercise";

const stringArray = wrapInArray("typed");
// @ts-expect-error The generic result preserves string elements, not numbers.
const invalidGenericResult: number[] = stringArray;
void invalidGenericResult;

describe("wrapInArray", () => {
  it("wraps a number and preserves its type", () => {
    const result = wrapInArray(42);
    expectTypeOf(result).toEqualTypeOf<number[]>();
    expect(result).toEqual([42]);
  });
  it("wraps a string", () => expect(wrapInArray("ts")).toEqual(["ts"]));
  it("keeps the same object reference", () => {
    const value = { id: 1 };
    expect(wrapInArray(value)[0]).toBe(value);
  });
});
