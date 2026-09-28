export type Constructor = new (...args: any[]) => object;

export function applyMixins(derived: Constructor, bases: Constructor[]): void {}

export class Logger {
  log(message: string): void {
    console.log(message);
  }
}

export class Activatable {
  active = false;

  activate(): void {
    this.active = true;
  }

  deactivate(): void {
    this.active = false;
  }
}

export class LoggedActivatable extends Activatable {
  declare log: (message: string) => void;

  override activate(): void {
    super.activate();
    this.log("Activating...");
  }

  override deactivate(): void {
    super.deactivate();
    this.log("Deactivating...");
  }
}

applyMixins(LoggedActivatable, [Logger]);
