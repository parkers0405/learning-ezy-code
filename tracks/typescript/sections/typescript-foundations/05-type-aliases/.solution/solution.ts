export type Rectangle = { width: number; height: number };
export function computeArea(rect: Rectangle): number {
  return rect.width * rect.height;
}

// @ts-expect-error Rectangle requires both dimensions.
const rejectedRectangle: Rectangle = { width: 2 };
void rejectedRectangle;
