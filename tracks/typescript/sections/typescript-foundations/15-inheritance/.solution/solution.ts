export class Animal {
  constructor(public name: string) {}
  speak(): string {
    return `${this.name} makes a sound`;
  }
}

export class Dog extends Animal {
  constructor(name: string) {
    super(name);
  }
  override speak(): string {
    return `${this.name} barks`;
  }
}

// @ts-expect-error Dog construction requires a string name.
new Dog(1);
