export interface Car {
  model: string;
  year: string;
}

export function describeCar(car: Car): string {
  return `${car.model} (${car.year})`;
}
