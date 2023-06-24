import { Atom } from "jotai"

const MISSING_LABEL_TEXT = "debugLabelFailure"

export function getAtomLabel(a: Atom<any>) {
  return a.debugLabel || MISSING_LABEL_TEXT
}
