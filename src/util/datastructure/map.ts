export type BooleanMap<T> = Map<T, boolean>

export function listToBooleanMap<T>(list: T[]): BooleanMap<T> {
  const m = new Map<T, boolean>()
  for (let i = 0; i < list.length; i++) {
    const item: T = list[i]
    m.set(item, true)
  }
  return m
}

export function booleanMapCopyWithKeys<T>(
  prevMap: BooleanMap<T>,
  newKeys: T[]
): BooleanMap<T> {
  const m = new Map(prevMap)
  for (let i = 0; i < newKeys.length; i++) {
    const key: T = newKeys[i]
    m.set(key, true)
  }
  return m
}

export function listToMap<Item, Key, Value = Item>(
  items: Item[],
  getKey: (item: Item, index: number) => Key,
  getValue: (item: Item, index: number) => Value = (x) => x as any as Value
): Map<Key, Value> {
  const m = new Map<Key, Value>()
  for (let index = 0; index < items.length; index++) {
    const item = items[index]
    m.set(getKey(item, index), getValue(item, index))
  }
  return m
}

// apply the given function to the values of the given object and return a new object with the values changed
export function mapObjectValues<Value, NewValue>(
  obj: { [key: string]: Value },
  mapFunc: (v: Value, key: string) => NewValue
) {
  const newObj: { [key: string]: NewValue } = {}

  const keys = Object.keys(obj)
  keys.forEach((key) => {
    newObj[key] = mapFunc(obj[key], key)
  })
  return newObj
}

// apply the given function to the values of the given map and return a new map with the values changed
export function mapMapValues<Value, NewValue>(
  map: Map<string, Value>,
  mapFunc: (v: Value, key: string) => NewValue
): Map<string, NewValue> {
  const newMap = new Map<string, NewValue>()
  ;[...map.entries()].forEach(([key, value]) => {
    newMap.set(key, mapFunc(value, key))
  })
  return newMap
}

// given a map (k -> v), return a map from v -> k[]
// k becomes an array because multiple keys can map to the same value
export function reverseMap<Key, Value>(m: Map<Key, Value>): Map<Value, Key[]> {
  const r = new Map<Value, Key[]>()
  ;[...m.entries()].forEach(([key, value]) => {
    const existing = r.get(value) || []
    r.set(value, [...existing, key])
  })
  return r
}

// second map takes precedence
export function mergeMaps<K, V>(m1: Map<K, V>, m2: Map<K, V>) {
  const m = new Map(m1)
  const m2Entries = [...m2.entries()]
  for (let i = 0; i < m2Entries.length; i++) {
    const [k, v] = m2Entries[i]
    m.set(k, v)
  }
  return m
}

// make a copy of a map and add the given value to it
export function mapCopyWithItem<T, U>(oldMap: Map<T, U>, key: T, value: U) {
  const nextMap = new Map(oldMap)
  nextMap.set(key, value)
  return nextMap
}

// make a copy of a map and add the given value to it
export function mapCopyPlusKeysValues<T, U>(
  oldMap: Map<T, U>,
  keys: T[],
  values: U[]
) {
  const nextMap = new Map(oldMap)
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i]
    const value = values[i]
    nextMap.set(key, value)
  }
  return nextMap
}

// make a copy of a map and add the given value to it
export function mapCopyPlusValuesGetKey<T, U>(
  oldMap: Map<T, U>,
  values: U[],
  getKey: (item: U) => T
) {
  const nextMap = new Map(oldMap)
  for (let i = 0; i < values.length; i++) {
    const value = values[i]
    const key = getKey(value)
    nextMap.set(key, value)
  }
  return nextMap
}

export function nestedMapToEntries<K1, K2, V>(
  map: Map<K1, Map<K2, V>>
): [K1, [K2, V][]][] {
  return [...map.entries()].map(([key1, innerMap]) => [
    key1,
    [...innerMap.entries()],
  ])
}

export function nestedMapFromEntries<K1, K2, V>(
  entries: [K1, [K2, V][]][]
): Map<K1, Map<K2, V>> {
  return new Map(
    entries.map(
      ([key1, innerEntries]) =>
        [key1, new Map(innerEntries)] as [K1, Map<K2, V>]
    )
  )
}
