import { atom } from "jotai"

import { listToMap } from "@/util/datastructure/map"

import { GraphNode, GraphNodeId } from "../../graph-types"
import { graphNodeHiddenSetAtom, graphNodeMapAtom } from "../graph-core-atoms"
import { graphEdgeMapBySourceAtom } from "./edge-atoms"
import { graphNodesAtom } from "./node-atoms"

// TODO: extract out a 'visit children' utility function

export const graphNodeHiddenIndirectlySetAtom = atom((get) => {
  const nodeMap = get(graphNodeMapAtom)
  const edgeMap = get(graphEdgeMapBySourceAtom)
  const hiddenSet = get(graphNodeHiddenSetAtom)
  const hiddenIndirectlySet = new Set<GraphNodeId>(hiddenSet)

  const stack: GraphNodeId[] = [...hiddenIndirectlySet.entries()].map(
    ([id]) => id
  )
  while (stack.length > 0) {
    const id = stack.pop()
    if (!id) {
      continue
    }
    const node = nodeMap.get(id)
    if (!node) {
      continue
    }
    hiddenIndirectlySet.add(node.id)
    const outgoingEdges = edgeMap.get(node.id) || []

    for (const edge of outgoingEdges) {
      const targetNode = nodeMap.get(edge.target)
      if (!targetNode) {
        continue
      }
      if (hiddenIndirectlySet.has(targetNode.id)) {
        continue
      }
      stack.push(targetNode.id)
    }
  }
  return hiddenIndirectlySet
})

export const graphVisibleNodesAtom = atom(
  (get) => {
    const s = get(graphNodeHiddenIndirectlySetAtom)
    return get(graphNodesAtom).filter((n) => !s.has(n.id))
  },
  (get, set, updatedNodes: GraphNode[]) => {
    const updatedNodesMap = listToMap(updatedNodes, (n) => n.id)
    const previousVisibleNodes = get(graphVisibleNodesAtom)

    const removedNodes = previousVisibleNodes.filter(
      (n) => !updatedNodesMap.has(n.id)
    )
    // console.log(`removedNodes: ${removedNodes.length}`)
    const nextNodesMap = new Map(get(graphNodeMapAtom))

    for (const node of removedNodes) {
      nextNodesMap.delete(node.id)
    }
    for (const node of updatedNodes) {
      nextNodesMap.set(node.id, node)
    }
    set(graphNodeMapAtom, nextNodesMap)
  }
)
