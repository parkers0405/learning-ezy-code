export interface Car {
  model: string;
  year: number;
}

export function describeCar(car: Car): string {
  return `${car.model} (${car.year})`;
}
