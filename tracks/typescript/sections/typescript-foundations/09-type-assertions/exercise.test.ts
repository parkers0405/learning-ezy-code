import { describe, expect, it } from "vitest";
import { getStringLength } from "@exercise";

type IsAny<T> = 0 extends 1 & T ? true : false;
type Input = Parameters<typeof getStringLength>[0];
const inputIsNotAny: IsAny<Input> = false;
const acceptsUnknown: (value: unknown) => number = getStringLength;
const numericResult: number = getStringLength("type contract");
// @ts-expect-error The function contract returns a number, not text.
const textResult: string = getStringLength("type contract");
void [inputIsNotAny, acceptsUnknown, numericResult, textResult];

describe("getStringLength", () => {
  it("returns the tutorial string length", () =>
    expect(getStringLength("Hello, TypeScript!")).toBe(18));
  it("handles an empty string", () => expect(getStringLength("")).toBe(0));
  it("counts spaces and punctuation", () =>
    expect(getStringLength("a b!")).toBe(4));
});
