export enum Days {
  Sunday,
  Monday,
  Tuesday,
  Wednesday,
  Thursday,
  Friday,
  Saturday,
}
export function classifyDay(day: Days): string {
  return day === Days.Sunday || day === Days.Saturday ? "Weekend" : "Weekday";
}
