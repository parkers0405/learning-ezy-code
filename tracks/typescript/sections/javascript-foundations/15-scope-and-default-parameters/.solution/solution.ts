const punctuation = "!";
export function greet(name: string, greeting = "Hello"): string {
  const message = `${greeting}, ${name}${punctuation}`;
  return message;
}
