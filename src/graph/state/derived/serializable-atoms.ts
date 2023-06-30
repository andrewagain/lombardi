import { atom } from "jotai"

import {
  GraphEdge,
  GraphEdgeId,
  GraphEdgePriority,
  GraphNode,
  NodePropertyValue,
} from "../../graph-types"
import {
  graphEdgePriorityMapAtom,
  graphNodePropertyMapAtom,
} from "../graph-core-atoms"
import { graphEdgesAtom } from "./edge-atoms"
import { graphNodesAtom } from "./node-atoms"

export interface SerializableData {
  nodes: GraphNode[]
  nodeProperties: [number, string | Map<string, NodePropertyValue>][][]
  edges: GraphEdge[]
  edgePriorities: [GraphEdgeId, GraphEdgePriority][]
}

export const serializableDataAtom = atom(
  (get) => {
    const data: SerializableData = {
      nodes: get(graphNodesAtom),
      edges: get(graphEdgesAtom),
      edgePriorities: [...get(graphEdgePriorityMapAtom).entries()],
      nodeProperties: [...get(graphNodePropertyMapAtom).entries()].map((x) => [
        ...x.entries(),
      ]),
    }
    return data
  },
  (_, set, data: SerializableData) => {
    set(graphNodesAtom, data.nodes)
    set(graphEdgesAtom, data.edges)
    set(graphEdgePriorityMapAtom, new Map(data.edgePriorities))
  }
)
