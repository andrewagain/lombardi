export type GraphNodeId = string
export type GraphEdgeId = string
export type GraphEdgePriority = number // may be a fraction
export interface GraphNode {
  id: GraphNodeId
  name: string
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
