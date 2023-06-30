import { atom } from "jotai"

import {
  GraphEdge,
  GraphEdgeId,
  GraphEdgePriority,
  GraphNode,
  GraphNodeId,
  GraphNodeIdAndPropertyName,
  NodePosition,
  NodePropertyValue,
} from "../graph-types.ts"

export const graphIdAtom = atom("opioid")

export const graphNodeMapAtom = atom(new Map<GraphNodeId, GraphNode>())

export const graphEdgeMapAtom = atom(new Map<GraphEdgeId, GraphEdge>())

export const graphEdgePriorityMapAtom = atom(
  new Map<GraphEdgeId, GraphEdgePriority>()
)

export const graphNodePositionMapAtom = atom(
  new Map<GraphNodeId, NodePosition>()
)

export const graphNodeHiddenSetAtom = atom(new Set<GraphNodeId>())

export const graphNodeSelectedIdsAtom = atom([] as GraphNodeId[])

export const graphNodePropertyMapAtom = atom(
  new Map<GraphNodeIdAndPropertyName, NodePropertyValue>()
)
