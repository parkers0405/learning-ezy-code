export class Counter {
  count: number;
  constructor(start: number) {
    this.count = start;
  }
  increment(): number {
    this.count = this.count + 1;
    return this.count;
  }
}

// @ts-expect-error Counter construction requires a number.
new Counter("zero");
