export function describePositiveCount(text: string): string {
  let result = "unfinished";
  try {
    const value = Number(text);
    if (Number.isNaN(value)) {
      throw new TypeError("number required");
    }
    if (value <= 0) {
      throw new RangeError("positive value required");
    }
    result = `count: ${value}`;
  } catch (caught: unknown) {
    result = "error";
  } finally {
    result = `${result}; finished`;
  }
  return result;
}
