export abstract class Shape {
  abstract area(): number;
}
export class Circle extends Shape {
  constructor(public radius: number) {
    super();
  }
  area(): number {
    return Math.PI * this.radius * this.radius;
  }
}
export class Rectangle extends Shape {
  constructor(
    public width: number,
    public height: number,
  ) {
    super();
  }
  area(): number {
    return this.width * this.height;
  }
}

// @ts-expect-error Abstract classes cannot be constructed directly.
new Shape();
