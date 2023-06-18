import { atom } from "jotai"
import { GraphNode } from "../graph-types.tsx"
import {
  graphNodeMapAtom,
  graphEdgeMapByTargetAtom,
  graphEdgeMapBySourceAtom,
  graphEdgePriorityMapAtom,
} from "./graph-atoms.tsx"
import { graphSortEdges } from "@/graph/graph-util.tsx"

export interface GraphTreeNode extends GraphNode {
  children: GraphTreeNode[]
}

// Nodes without incoming edges
// Cycles will be ignored
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

    const destinationNodes = outgoingEdges.map((edge) => {
      const targetNode = nodeMap.get(edge.target)
      if (!targetNode) {
        throw new Error(`Could not find node with id ${edge.target}`)
      }
      return targetNode
    })
    node.children = destinationNodes.map((x) => ({ ...x, children: [] }))
    nodeStack = [...nodeStack, ...node.children]
  }

  return rootTreeNodes
})
