import { atom } from "jotai"
import { atomFamily } from "jotai/utils"

import { GraphNode, GraphNodeId } from "@/graph/graph-types"
import { listToMap } from "@/util/datastructure/map"

import { graphNodeMapAtom } from "../graph-core-atoms"

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

export const graphNodeFamily = atomFamily((nodeId: GraphNodeId) => {
  return atom((get) => get(graphNodeMapAtom).get(nodeId))
})

export const graphNodeFirstAtom = atom((get) => {
  const nodes = get(graphNodesAtom)
  return nodes.length > 0 ? nodes[0] : undefined
})
