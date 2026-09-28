export function updateProperty<T, K extends keyof T>(
  obj: T,
  key: K,
  value: T[K],
): T {
  return obj;
}
