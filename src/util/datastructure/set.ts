export function toggleSetItem<T>(set: Set<T>, item: T) {
  if (set.has(item)) {
    set.delete(item)
  } else {
    set.add(item)
  }
}

export function setCopyWithToggledItem<T>(set: Set<T>, item: T) {
  const nextSet = new Set(set)
  toggleSetItem(nextSet, item)
  return nextSet
}
