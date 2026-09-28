export class Animal {
  constructor(public name: string) {}
  speak(): string {
    return `${this.name} makes a noise.`;
  }
}
export class Dog extends Animal {}
