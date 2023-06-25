import { atom } from "jotai"
import { atomWithStorage } from "jotai/utils"

export const selectedAtomKeysAtom = atomWithStorage<string[]>(
  "nuons.selectedAtomKeys",
  []
)

export const atomFilterTextAtom = atom("")
