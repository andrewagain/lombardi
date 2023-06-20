// by 'map list' we mean a map in which the values are arrays
type MapList<T> = Map<string, T[]>;

export function mapListPairs<T>(m: MapList<T>): [string, T][] {
  const pairs: [string, T][] = [];

  const entries = [...m.entries()];
  for (let i = 0; i < entries.length; i++) {
    const [key, list] = entries[i];
    for (let j = 0; j < list.length; j++) {
      pairs.push([key, list[j]]);
    }
  }

  return pairs;
}
