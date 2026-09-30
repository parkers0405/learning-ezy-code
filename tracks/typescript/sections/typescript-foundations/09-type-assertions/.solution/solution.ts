export function getStringLength(value: unknown): number {
  return (value as string).length;
}

// @ts-expect-error Unknown cannot be assigned before it is checked or asserted.
const rejectedString: string = {} as unknown;
void rejectedString;
