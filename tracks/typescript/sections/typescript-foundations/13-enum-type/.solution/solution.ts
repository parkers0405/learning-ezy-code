export enum Days {
  Sunday,
  Monday,
  Tuesday,
  Wednesday,
  Thursday,
  Friday,
  Saturday,
}

// @ts-expect-error An arbitrary string is not a Days member.
classifyDay("Monday");
export function classifyDay(day: Days): string {
  if (day === Days.Sunday || day === Days.Saturday) {
    return "Weekend";
  }
  return "Weekday";
}
