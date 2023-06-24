import { atom } from "jotai"

import { listToMap } from "@/util/datastructure/map.ts"

import {
  GraphCoreData,
  GraphEdge,
  GraphEdgePriority,
  GraphNode,
  GraphNodeId,
  NodePosition,
} from "../graph-types.ts"

/**
 * Core graph data
 */
export const graphIdAtom = atom("opioid")

export const graphNodeMapAtom = atom(new Map<string, GraphNode>())

export const graphEdgeMapAtom = atom(new Map<string, GraphEdge>())

export const graphEdgePriorityMapAtom = atom(
  new Map<string, GraphEdgePriority>()
)

export const graphCoreDataAtom = atom(
  (get) => {
    const data: GraphCoreData = {
      nodeMap: get(graphNodeMapAtom),
      edgeMap: get(graphEdgeMapAtom),
      edgePriorityMap: get(graphEdgePriorityMapAtom),
    }
    return data
  },
  (_, set, update: GraphCoreData) => {
    set(graphNodeMapAtom, update.nodeMap)
    set(graphEdgeMapAtom, update.edgeMap)
    set(graphEdgePriorityMapAtom, update.edgePriorityMap)
  }
)

/**
 * Node-specific
 */
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

export const graphNodePositionMapAtom = atom(
  new Map<GraphNodeId, NodePosition>()
)

export const graphNodeHiddenSetAtom = atom(new Set<GraphNodeId>())

export const graphVisibleNodesAtom = atom(
  (get) => {
    const s = get(graphNodeHiddenSetAtom)
    return get(graphNodesAtom).filter((n) => s.has(n.id))
  },
  (get, set, visibleNodes: GraphNode[]) => {
    const visibleNodesMap = listToMap(visibleNodes, (n) => n.id)
    const previousVisibleNodes = get(graphVisibleNodesAtom)

    const removedNodes = previousVisibleNodes.filter(
      (n) => !visibleNodesMap.has(n.id)
    )
    console.log(`removedNodes: ${removedNodes.length}`)
    const nextNodesMap = new Map(get(graphNodeMapAtom))

    for (const node of removedNodes) {
      nextNodesMap.delete(node.id)
    }
    for (const node of visibleNodes) {
      nextNodesMap.set(node.id, node)
    }
    set(graphNodeMapAtom, nextNodesMap)
  }
)

/**
 * Edge-specific
 */
export const graphEdgeIdsAtom = atom((get) => [...get(graphEdgeMapAtom).keys()])

export const graphEdgesAtom = atom(
  (get) => [...get(graphEdgeMapAtom).values()],
  (_, set, edges: GraphEdge[]) => {
    set(
      graphEdgeMapAtom,
      listToMap(edges, (e) => e.id)
    )
  }
)

// Map from source node id to list of edges
export const graphEdgeMapBySourceAtom = atom((get) => {
  const edges = get(graphEdgesAtom)
  const edgeMapBySource = new Map<string, GraphEdge[]>()
  for (const edge of edges) {
    const { source } = edge
    const existingEdges = edgeMapBySource.get(source)
    if (existingEdges) {
      existingEdges.push(edge)
    } else {
      edgeMapBySource.set(source, [edge])
    }
  }
  return edgeMapBySource
})

export const graphEdgeMapByTargetAtom = atom((get) => {
  const edges = get(graphEdgesAtom)
  const edgeMapByTarget = new Map<string, GraphEdge[]>()
  for (const edge of edges) {
    const { target } = edge
    const existingEdges = edgeMapByTarget.get(target)
    if (existingEdges) {
      existingEdges.push(edge)
    } else {
      edgeMapByTarget.set(target, [edge])
    }
  }
  return edgeMapByTarget
})
