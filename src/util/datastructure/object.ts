export function objectCopyWithoutProperties<T>(
  obj: T | undefined,
  propertyNames: (keyof T)[]
): Partial<T> {
  if (!obj) {
    return {};
  }
  if (propertyNames.length === 0) {
    return obj;
  }
  const copy = { ...obj };
  propertyNames.forEach((name) => {
    delete copy[name];
  });
  return copy;
}
