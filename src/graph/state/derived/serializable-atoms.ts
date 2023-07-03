import { atom } from "jotai"

import {
  nestedMapFromEntries,
  nestedMapToEntries,
} from "@/util/datastructure/map"

import {
  GraphEdge,
  GraphEdgeId,
  GraphEdgePriority,
  GraphNode,
  GraphNodeId,
  NodePropertyName,
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
  nodeProperties: [GraphNodeId, [NodePropertyName, NodePropertyValue][]][]
  edges: GraphEdge[]
  edgePriorities: [GraphEdgeId, GraphEdgePriority][]
}

export const serializableDataAtom = atom(
  (get) => {
    const data: SerializableData = {
      nodes: get(graphNodesAtom),
      edges: get(graphEdgesAtom),
      edgePriorities: [...get(graphEdgePriorityMapAtom).entries()],
      nodeProperties: nestedMapToEntries(get(graphNodePropertyMapAtom)),
    }
    return data
  },
  (_, set, data: SerializableData) => {
    set(graphNodesAtom, data.nodes)
    set(graphEdgesAtom, data.edges)
    set(graphEdgePriorityMapAtom, new Map(data.edgePriorities))
    set(graphNodePropertyMapAtom, nestedMapFromEntries(data.nodeProperties))
  }
)
