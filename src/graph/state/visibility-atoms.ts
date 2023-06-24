import { atom } from "jotai"

import { GraphNodeId } from "../graph-types"
import {
  graphEdgeMapBySourceAtom,
  graphNodeHiddenSetAtom,
  graphNodeMapAtom,
} from "./graph-atoms"

// TODO: 'visit children' function

export const graphHiddenIndirectlyNodeIdSetAtom = atom((get) => {
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
