// Functions useful in data filtering/processing

// pass isDefined() to filter() and TypeScript will know to remove the 'undefined' type from the resulting array
// [0, 1, undefined, 7].filter(isDefined) => [1,7] as number[]
// https://stackoverflow.com/a/54318054
export function isDefined<T>(argument: T | undefined): argument is T {
  return argument !== undefined
}

export function isTruthy<T>(argument: T | undefined): argument is T {
  return !!argument
}

export function IdentifyFunction<T>(x: T) {
  return x
}

export async function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}
