export interface MyDictionary {
  [key: string]: string | number;
}

// @ts-expect-error Dictionary values are limited to string or number.
const rejectedDictionary: MyDictionary = { active: true };
void rejectedDictionary;
export function getValueFromDict(
  key: string,
  dict: MyDictionary,
): string | number | undefined {
  return dict[key];
}
