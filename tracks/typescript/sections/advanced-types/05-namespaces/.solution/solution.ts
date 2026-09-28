export namespace Geometry {
  export function areaOfRectangle(width: number, height: number): number {
    return width * height;
  }
  export function areaOfCircle(radius: number): number {
    return Math.PI * radius * radius;
  }
}
