export class Counter {
  count: number;
  constructor(start: number) {
    this.count = start;
  }
  increment(): number {
    return this.count;
  }
}
