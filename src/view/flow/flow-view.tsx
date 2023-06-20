// https://reactflow.dev/

import { atom, useAtomValue } from "jotai"
import {
  Background,
  BackgroundVariant,
  Controls,
  Edge,
  MiniMap,
  Node,
  ReactFlow,
  XYPosition,
} from "reactflow"

import { GraphEdge, GraphNode, GraphNodeId } from "@/graph/graph-types"
import { graphEdgesAtom, graphNodesAtom } from "@/graph/state/graph-atoms"

type FlowNode = Node<GraphNode>
type FlowEdge = Edge<GraphEdge>

const flowPositionMapAtom = atom(new Map<GraphNodeId, XYPosition>())

const flowNodesAtom = atom((get) => {
  const nodes = get(graphNodesAtom)
  const positions = get(flowPositionMapAtom)
  const flowNodes: FlowNode[] = nodes.map((node) => {
    return {
      id: node.id,
      position: positions.get(node.id) ?? { x: 0, y: 0 },
      data: node,
    }
  })
  return flowNodes
})

const flowEdgesAtom = atom((get) => {
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

export default function FlowView() {
  const nodes = useAtomValue(flowNodesAtom)
  const edges = useAtomValue(flowEdgesAtom)

  return (
    <ReactFlow nodes={nodes} edges={edges}>
      <Controls />
      <MiniMap />
      <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
    </ReactFlow>
  )
}
