const values = [1, 2, 3, 4];
export const doubled = values.map((value) => value * 2);
export const evenValues = values.filter((value) => value % 2 === 0);
export const firstLargeValue = values.find((value) => value > 2);
