import { atom } from "jotai"

import { listToBooleanMap } from "@/util/datastructure/map"

import { graphNodeSelectedIdsAtom } from "../graph-core-atoms"

export const graphNodeSelectedIdMapAtom = atom((get) =>
  listToBooleanMap(get(graphNodeSelectedIdsAtom))
)
