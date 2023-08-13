import { Atom } from "jotai"

export interface AtomSet {
  name: string
  atoms: Atom<any>[]
}

export function getStateParameter(type: "open" | "rows", title: string) {
  return `nuons.${title.replace(/\s/g, "")}.${type}`
}

export function getSetCategorizedAtoms(s: AtomSet): CategorizedAtom[] {
  return s.atoms.map((a) => ({
    categoryName: s.name,
    atom: a,
  }))
}

export interface CategorizedAtom {
  categoryName: string
  atom: Atom<any>
}

export function getCategorizedAtomKey(a: CategorizedAtom) {
  return `${a.categoryName}.${a.atom.debugLabel}`
}

export function getCategorizedAtomMap(
  atomSets: AtomSet[]
): Map<string, CategorizedAtom> {
  const map = new Map<string, CategorizedAtom>()
  atomSets.forEach((set) => {
    getSetCategorizedAtoms(set).forEach((ca) => {
      map.set(getCategorizedAtomKey(ca), ca)
    })
  })
  return map
}
