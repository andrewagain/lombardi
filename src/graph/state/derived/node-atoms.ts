import { atom } from "jotai"

import { GraphNode } from "@/graph/graph-types"
import { listToMap } from "@/util/datastructure/map"

import { graphNodeMapAtom, graphNodeSelectedIdsAtom } from "../graph-core-atoms"

export const graphNodeIdsAtom = atom((get) => [...get(graphNodeMapAtom).keys()])

export const graphNodesAtom = atom(
  (get) => [...get(graphNodeMapAtom).values()],
  (_, set, nodes: GraphNode[]) => {
    set(
      graphNodeMapAtom,
      listToMap(nodes, (n) => n.id)
    )
  }
)

export const graphNodeCountAtom = atom((get) => get(graphNodeMapAtom).size)

export const graphNodeFirstSelectedIdAtom = atom(
  (get) => get(graphNodeSelectedIdsAtom)[0]
)
