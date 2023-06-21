import { atom } from "jotai"

import { listToMap } from "@/util/datastructure/map.ts"

import {
  GraphCoreData,
  GraphEdge,
  GraphEdgePriority,
  GraphNode,
} from "../graph-types.ts"

/**
 * Core graph data
 */
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

/**
 * Edge-specific
 */
export const graphEdgeIdsAtom = atom((get) => [...get(graphEdgeMapAtom).keys()])

export const graphEdgesAtom = atom((get) => [...get(graphEdgeMapAtom).values()])

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
