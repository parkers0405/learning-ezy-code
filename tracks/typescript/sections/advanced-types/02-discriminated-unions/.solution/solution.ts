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
  switch (shape.kind) {
    case "circle":
      return Math.PI * shape.radius ** 2;
    case "square":
      return shape.sideLength ** 2;
  }
}
