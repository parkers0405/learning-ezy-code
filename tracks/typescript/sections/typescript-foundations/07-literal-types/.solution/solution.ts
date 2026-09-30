export function sortOrderMessage(order: "ascending" | "descending"): string {
  return `The order is set to ${order}.`;
}

// @ts-expect-error Only the two declared literal values are accepted.
sortOrderMessage("sideways");
