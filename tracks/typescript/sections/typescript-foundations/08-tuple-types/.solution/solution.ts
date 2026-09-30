export function displayTuple(input: [string, number]): string {
  return `The value for ${input[0]} is ${input[1]}.`;
}

// @ts-expect-error Tuple positions have fixed types.
displayTuple([1, "wrong"]);
