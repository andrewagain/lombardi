import { atom } from "jotai"

import { GraphNode } from "@/graph/graph-types.ts"
import { graphSortEdges } from "@/graph/graph-util.ts"

import {
  graphEdgeMapBySourceAtom,
  graphEdgeMapByTargetAtom,
  graphEdgePriorityMapAtom,
  graphNodeMapAtom,
} from "./graph-atoms.ts"

export interface GraphTreeNode extends GraphNode {
  isLeaf: boolean
  children: GraphTreeNode[]
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

  const rootTreeNodes: GraphTreeNode[] = rootNodes.map((node) => {
    return {
      ...node,
      isLeaf: false,
      children: [],
    }
  })

  let nodeStack: GraphTreeNode[] = [...rootTreeNodes]
  while (nodeStack.length > 0) {
    // Since we just checked the nodeStack length, we know that nodeStack.pop() will not return undefined
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const node = nodeStack.pop()!

    const outgoingEdges = graphSortEdges(
      outgoingEdgeMap.get(node.id) || [],
      edgePriorityMap
    )

    if (outgoingEdges.length === 0) {
      node.isLeaf = true
      continue
    }

    const destinationNodes = outgoingEdges.map((edge) => {
      const targetNode = nodeMap.get(edge.target)
      if (!targetNode) {
        throw new Error(`Could not find node with id ${edge.target}`)
      }
      return targetNode
    })

    node.children = destinationNodes.map((x) => ({
      ...x,
      children: [],
      isLeaf: false,
    }))
    nodeStack = [...nodeStack, ...node.children]
  }

  return rootTreeNodes
})
