import { atom } from "jotai"

import { GraphNode } from "@/graph/graph-types.ts"
import { graphSortEdges } from "@/graph/graph-util.ts"
import { isTruthy } from "@/util/function.ts"

import {
  graphEdgePriorityMapAtom,
  graphNodeMapAtom,
} from "../graph-core-atoms.ts"
import {
  graphEdgeMapBySourceAtom,
  graphEdgeMapByTargetAtom,
} from "./edge-atoms.ts"

export interface GraphTreeNode extends GraphNode {
  children?: GraphTreeNode[]
}

// Nodes without incoming edges
// Cycles will be ignored
// TODO: handle cycles by refusing to re-visit the same node twice
export const graphNodesWithoutIncomingEdgesAtom = atom<GraphNode[]>((get) => {
  const edgeMapByTarget = get(graphEdgeMapByTargetAtom)
  const nodeMap = get(graphNodeMapAtom)
  const roots = [...nodeMap.values()].filter((node) => {
    return !edgeMapByTarget.has(node.id)
  })
  return roots
})

// Nodes referenced more than once will be duplicated
export const graphTreeRootNodesAtom = atom<GraphTreeNode[]>((get) => {
  const rootNodes = get(graphNodesWithoutIncomingEdgesAtom)
  const nodeMap = get(graphNodeMapAtom)
  const edgePriorityMap = get(graphEdgePriorityMapAtom)
  const outgoingEdgeMap = get(graphEdgeMapBySourceAtom)

  // Create copies of all the root nodes
  const rootTreeNodes = rootNodes.map((x) => ({ ...x }))

  let nodeStack: GraphTreeNode[] = [...rootTreeNodes]
  while (nodeStack.length > 0) {
    // Since we just checked the nodeStack length, we know that nodeStack.pop() will not return undefined
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const node = nodeStack.pop()!

    const outgoingEdges = graphSortEdges(
      outgoingEdgeMap.get(node.id) || [],
      edgePriorityMap
    )

    const destinationNodes = outgoingEdges
      .map((edge) => nodeMap.get(edge.target))
      .filter(isTruthy)

    if (destinationNodes.length > 0) {
      node.children = destinationNodes.map((x) => ({ ...x }))
      nodeStack = [...nodeStack, ...node.children]
    }
  }

  return rootTreeNodes
})
