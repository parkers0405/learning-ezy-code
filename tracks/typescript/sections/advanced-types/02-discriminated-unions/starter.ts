export interface Circle {
  kind: "circle";
  radius: number;
}
export interface Square {
  kind: "square";
  sideLength: number;
}
export type Shape = Circle | Square;
export function calculateArea(shape: Shape): number {
  return 0;
}
