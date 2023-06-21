import { atom } from "jotai"

import {
  GraphEdge,
  GraphEdgeId,
  GraphEdgePriority,
  GraphNode,
} from "./graph-types"
import {
  graphEdgePriorityMapAtom,
  graphEdgesAtom,
  graphNodesAtom,
} from "./state/graph-atoms"

export interface SerializableData {
  nodes: GraphNode[]
  edges: GraphEdge[]
  edgePriorities: [GraphEdgeId, GraphEdgePriority][]
}

export const serializableDataAtom = atom(
  (get) => {
    const data: SerializableData = {
      nodes: get(graphNodesAtom),
      edges: get(graphEdgesAtom),
      edgePriorities: [...get(graphEdgePriorityMapAtom).entries()],
    }
    return data
  },
  (_, set, data: SerializableData) => {
    set(graphNodesAtom, data.nodes)
    set(graphEdgesAtom, data.edges)
    set(graphEdgePriorityMapAtom, new Map(data.edgePriorities))
  }
)
