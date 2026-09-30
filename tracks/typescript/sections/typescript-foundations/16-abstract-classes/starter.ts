export abstract class Shape {
  abstract area(): number;
}
export class Circle extends Shape {
  constructor(public radius: number) {
    super();
  }
  area(): number {
    return 0;
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
    return 0;
  }
}
