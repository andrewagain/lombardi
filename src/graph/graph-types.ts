export type GraphNodeId = string
export type GraphEdgeId = string
export type GraphEdgePriority = number // may be a fraction
export interface GraphNode {
  id: GraphNodeId
  name: string
  categories: NodeCategory[]
  description?: string
  icon?: string
}

export interface GraphEdge {
  id: GraphEdgeId
  source: GraphNodeId
  target: GraphNodeId
}

export enum GraphElementType {
  Node = "Node",
  Edge = "Edge",
}

export type GraphNodeMap = Map<GraphNodeId, GraphNode>
export type GraphEdgeMap = Map<GraphEdgeId, GraphEdge>
export type GraphEdgePriorityMap = Map<GraphEdgeId, GraphEdgePriority>

export interface GraphCoreData {
  nodeMap: GraphNodeMap
  edgeMap: GraphEdgeMap
  edgePriorityMap: GraphEdgePriorityMap
}

// For manually written examples
export interface GraphShorthand {
  nodes: GraphNode[]
  edges?: GraphEdge[]
}

export interface NodePosition {
  x: number
  y: number
}

export type NodePropertyName = string
export type NodePropertyType = "datetime" | "string" | "number" | "boolean"

export interface NodeProperty {
  name: string
  type: NodePropertyType
}

export interface NodeCategory {
  parent: string | undefined
  name: string
  properties: NodeProperty[]
}

export type NodePropertyValue = string | number | boolean | Date | undefined

export type GraphNodeIdAndPropertyName = string
