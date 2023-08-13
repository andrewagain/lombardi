import { atom } from "jotai"

import { listToBooleanMap } from "@/util/datastructure/map"

import { graphNodeSelectedIdsAtom } from "../graph-core-atoms"
import { graphNodeFamily } from "./node-atoms"

export const graphNodeSelectedIdMapAtom = atom((get) =>
  listToBooleanMap(get(graphNodeSelectedIdsAtom))
)
export const graphNodeFirstSelectedIdAtom = atom(
  (get) => get(graphNodeSelectedIdsAtom)[0]
)

export const graphNodeFirstSelectedAtom = atom((get) => {
  return get(graphNodeFamily(get(graphNodeFirstSelectedIdAtom)))
})
