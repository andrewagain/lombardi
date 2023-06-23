import { listToBooleanMap } from "./map.js"

// Return an array containing those elements that are found in all the given arrays
export function arrayIntersection<T>(arrays: T[][]): T[] {
  if (arrays.length === 0) {
    return []
  }
  if (arrays.length === 1) {
    return arrays[0]
  }

  const countMap = new Map<T, number>()
  for (let i = 1; i < arrays.length; i++) {
    const arr = arrays[i]
    for (let j = 0; j < arr.length; j++) {
      const element = arr[j]
      countMap.set(element, (countMap.get(element) || 0) + 1)
    }
  }

  return arrays[0].filter((x) => countMap.get(x) === arrays.length - 1)
}

// check if the two arrays contain any of the same items
export function arrayOverlap<T>(a: T[], b: T[]): boolean {
  const aMap = listToBooleanMap<T>(a)
  return !!b.find((x) => aMap.has(x))
}

// returns an array of all possible pairs of items
export function permutePairs<T>(items: T[]) {
  const pairs: [T, T][] = []
  for (let i = 0; i < items.length; i++) {
    for (let j = 0; j < items.length; j++) {
      if (i !== j) {
        pairs.push([items[i], items[j]])
      }
    }
  }
  return pairs
}

export function getArrayLast<T>(items: T[]): T {
  return items[items.length - 1]
}

export async function asyncFilter<T>(
  a: T[],
  f: (i: T) => Promise<boolean>
): Promise<T[]> {
  if (a.length === 0) {
    return []
  }
  return new Promise((resolve) => {
    const results = new Map<number, boolean>()

    a.forEach(async (value, index) => {
      results.set(index, await f(value))
      if (results.size === a.length) {
        resolve(a.filter((_, i) => results.get(i)))
      }
    })
  })
}

export function toggleArrayInclusion<T>(array: T[], item: T): T[] {
  if (array.includes(item)) {
    return array.filter((x) => x !== item)
  }
  return [...array, item]
}
