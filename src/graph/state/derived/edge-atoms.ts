import { atom } from "jotai"

import { GraphEdge } from "@/graph/graph-types"
import { listToMap } from "@/util/datastructure/map"

import { graphEdgeMapAtom } from "../graph-core-atoms"

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
