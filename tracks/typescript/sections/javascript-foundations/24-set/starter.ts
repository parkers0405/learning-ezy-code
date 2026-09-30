const repeated = ["red", "red", "blue"];
// `new Set(...)` is supplied built-in construction syntax.
export const uniqueColors = new Set(repeated);
uniqueColors.add("red");
