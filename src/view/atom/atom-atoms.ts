import { atomWithStorage } from "jotai/utils"

export const selectedAtomKeysAtom = atomWithStorage<string[]>(
  "nuons.selectedAtomKeys",
  []
)
