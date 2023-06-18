import { atom } from "jotai"

import { GraphEdge, GraphRoot } from "../graph-types.ts"
import { createEmptyGraph } from "../graph-util.ts"

export const graphRootAtom = atom<GraphRoot>(createEmptyGraph())

/**
 * Node-specific
 */
export const graphNodeMapAtom = atom((get) => get(graphRootAtom).nodeMap)

export const graphNodeIdsAtom = atom((get) => [...get(graphNodeMapAtom).keys()])

export const graphNodesAtom = atom((get) => [...get(graphNodeMapAtom).values()])

/**
 * Edge-specific
 */
export const graphEdgeMapAtom = atom((get) => get(graphRootAtom).edgeMap)

export const graphEdgePriorityMapAtom = atom(
  (get) => get(graphRootAtom).edgePriorityMap
)

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

export const graphNodeCountAtom = atom((get) => get(graphNodeMapAtom).size)
