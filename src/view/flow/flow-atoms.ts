import dagre from "dagre"
import { atom } from "jotai"
import { Edge, Node } from "reactflow"

import { GraphEdge, GraphNode } from "@/graph/graph-types"
import {
  graphEdgesAtom,
  graphNodeHiddenSetAtom,
  graphNodeMapAtom,
  graphNodePositionMapAtom,
  graphNodesAtom,
} from "@/graph/state/graph-atoms"
import { listToMap } from "@/util/datastructure/map"
import { isZeroPoint } from "@/util/geometry/point"

export type FlowNode = Node<GraphNode>
export type FlowEdge = Edge<GraphEdge>

const graphVisibleNodesAtom = atom(
  (get) => {
    const s = get(graphNodeHiddenSetAtom)
    return get(graphNodesAtom).filter((n) => !s.has(n.id))
  },
  (get, set, visibleNodes: GraphNode[]) => {
    const visibleNodesMap = listToMap(visibleNodes, (n) => n.id)
    const previousVisibleNodes = get(graphVisibleNodesAtom)

    const removedNodes = previousVisibleNodes.filter(
      (n) => !visibleNodesMap.has(n.id)
    )
    console.log(`removedNodes: ${removedNodes.length}`)
    const nextNodesMap = new Map(get(graphNodeMapAtom))

    for (const node of removedNodes) {
      nextNodesMap.delete(node.id)
    }
    for (const node of visibleNodes) {
      nextNodesMap.set(node.id, node)
    }
    set(graphNodeMapAtom, nextNodesMap)
  }
)

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
    console.log(`${flowNodes.length} flow nodes`)
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
