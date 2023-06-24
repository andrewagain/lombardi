import { atom } from "jotai"

import {
  GraphEdge,
  GraphEdgePriority,
  GraphNode,
  GraphNodeId,
  NodePosition,
} from "../graph-types.ts"

export const graphIdAtom = atom("opioid")

export const graphNodeMapAtom = atom(new Map<string, GraphNode>())

export const graphEdgeMapAtom = atom(new Map<string, GraphEdge>())

export const graphEdgePriorityMapAtom = atom(
  new Map<string, GraphEdgePriority>()
)

export const graphNodePositionMapAtom = atom(
  new Map<GraphNodeId, NodePosition>()
)

export const graphNodeHiddenSetAtom = atom(new Set<GraphNodeId>())

export const graphNodeSelectedSetAtom = atom(new Set<GraphNodeId>())
