export interface Car {
  model: string;
  year: number;
}

// @ts-expect-error Car requires a numeric year.
const rejectedCar: Car = { model: "Ada", year: "1843" };
void rejectedCar;

export function describeCar(car: Car): string {
  return `${car.model} (${car.year})`;
}
