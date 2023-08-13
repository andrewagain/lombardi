import dagre from "dagre"
import { atom } from "jotai"
import { Edge, Node } from "reactflow"

import { GraphEdge, GraphNode } from "@/_reference/graph/graph-types"
import { graphEdgesAtom } from "@/_reference/graph/state/derived/edge-atoms"
import { graphNodeSelectedIdMapAtom } from "@/_reference/graph/state/derived/selection-atoms"
import { graphVisibleNodesAtom } from "@/_reference/graph/state/derived/visibility-atoms"
import {
  graphNodePositionMapAtom,
  graphNodeSelectedIdsAtom,
} from "@/_reference/graph/state/graph-core-atoms"
import { isZeroPoint } from "@/util/geometry/point"

export type FlowNode = Node<GraphNode>
export type FlowEdge = Edge<GraphEdge>

export const flowNodesAtom = atom(
  (get) => {
    const nodes = get(graphVisibleNodesAtom)
    const positions = get(graphNodePositionMapAtom)
    const selectedMap = get(graphNodeSelectedIdMapAtom)
    const flowNodes: FlowNode[] = nodes.map((node) => {
      return {
        id: node.id,
        position: positions.get(node.id) ?? { x: 0, y: 0 },
        type: "standard",
        selected: selectedMap.has(node.id),
        data: {
          ...node,
          label: node.name,
        },
      }
    })
    // console.log(`${flowNodes.length} flow nodes`)
    return flowNodes
  },
  (get, set, flowNodes: FlowNode[]) => {
    const nodes: GraphNode[] = flowNodes.map((flowNode) => {
      return {
        ...flowNode.data,
        id: flowNode.id,
        name: flowNode.data.name,
      }
    })
    set(graphVisibleNodesAtom, nodes)

    const positionMap = new Map(get(graphNodePositionMapAtom))
    flowNodes.forEach((flowNode) => {
      if (!isZeroPoint(flowNode.position)) {
        positionMap.set(flowNode.id, flowNode.position)
      }
    })
    set(graphNodePositionMapAtom, positionMap)

    const selectedIds = flowNodes.filter((n) => n.selected).map((n) => n.id)
    set(graphNodeSelectedIdsAtom, selectedIds)
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
