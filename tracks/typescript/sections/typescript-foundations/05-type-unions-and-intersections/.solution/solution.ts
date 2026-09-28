export type Car = { type: "car"; doors: number };
export type Bike = { type: "bike"; hasBell: boolean };
export type Vehicle = Car | Bike;
export function identifyVehicle(vehicle: Vehicle): "car" | "bike" {
  return vehicle.type;
}
