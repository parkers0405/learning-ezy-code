import { describe, expect, expectTypeOf, it } from "vitest";
import { classifyDay, Days } from "@exercise";

const allDays: Days[] = [
  Days.Sunday,
  Days.Monday,
  Days.Tuesday,
  Days.Wednesday,
  Days.Thursday,
  Days.Friday,
  Days.Saturday,
];
void allDays;
expectTypeOf<keyof typeof Days>().toEqualTypeOf<
  | "Sunday"
  | "Monday"
  | "Tuesday"
  | "Wednesday"
  | "Thursday"
  | "Friday"
  | "Saturday"
>();

// @ts-expect-error A raw day name is not a Days enum member.
const invalidDay = classifyDay("Sunday");
void invalidDay;

describe("classifyDay", () => {
  it.each([Days.Sunday, Days.Saturday])(
    "classifies weekend enum member %s",
    (day) => expect(classifyDay(day)).toBe("Weekend"),
  );
  it.each([Days.Monday, Days.Wednesday, Days.Friday])(
    "classifies weekday enum member %s",
    (day) => expect(classifyDay(day)).toBe("Weekday"),
  );
});
