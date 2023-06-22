import dagre from "dagre"
import { atom } from "jotai"
import { Edge, Node, XYPosition } from "reactflow"

import { GraphEdge, GraphNode, GraphNodeId } from "@/graph/graph-types"
import {
  graphEdgesAtom,
  graphNodePositionMapAtom,
  graphVisibleNodesAtom,
} from "@/graph/state/graph-atoms"
import { listToMap } from "@/util/datastructure/map"

export type FlowNode = Node<GraphNode>
export type FlowEdge = Edge<GraphEdge>

export const flowNodesAtom = atom(
  (get) => {
    const nodes = get(graphVisibleNodesAtom)
    const positions = get(graphNodePositionMapAtom)
    const flowNodes: FlowNode[] = nodes.map((node) => {
      return {
        id: node.id,
        position: positions.get(node.id) ?? { x: 0, y: 0 },
        data: {
          ...node,
          label: node.name,
        },
      }
    })
    return flowNodes
  },
  (_, set, flowNodes: FlowNode[]) => {
    // this is called with flow nodes at position=0,0
    // but why is it called initially?
    // because node dimensions are updated by flow? does that make sense?
    console.log("flowNodesAtom.set", flowNodes)
    const nodes: GraphNode[] = flowNodes.map((flowNode) => {
      return {
        ...flowNode.data,
        id: flowNode.id,
        name: flowNode.data.name,
      }
    })
    set(graphVisibleNodesAtom, nodes)

    const positionsMap: Map<GraphNodeId, XYPosition> = listToMap(
      flowNodes,
      (f) => f.id,
      (f) => f.position
    )
    set(graphNodePositionMapAtom, positionsMap)
  }
)

export const flowDagreAtom = atom((get) => {
  const g = new dagre.graphlib.Graph({ compound: true, directed: true })
  g.setGraph({ rankdir: "TB", ranksep: 100, nodesep: 100 })

  // Default to assigning a new object as a label for each new edge.
  g.setDefaultEdgeLabel(function () {
    return {}
  })

  const flowNodes = get(flowNodesAtom)
  flowNodes.forEach((n) => {
    g.setNode(n.id, {
      label: n.data.name,
      width: n.width ?? 100,
      height: n.height ?? 100,
    })
  })

  const edges = get(graphEdgesAtom)
  edges.forEach((e) => {
    g.setEdge(e.source, e.target)
  })

  return g
})

export const flowEdgesAtom = atom((get) => {
  const edges = get(graphEdgesAtom)
  const flowEdges: FlowEdge[] = edges.map((edge) => {
    return {
      id: edge.id,
      source: edge.source,
      target: edge.target,
      data: edge,
    }
  })
  return flowEdges
})
