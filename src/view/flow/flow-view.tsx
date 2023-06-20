// https://reactflow.dev/

import "reactflow/dist/style.css"

import { atom, useAtom, useAtomValue } from "jotai"
import { useCallback } from "react"
import {
  applyNodeChanges,
  Background,
  BackgroundVariant,
  Controls,
  Edge,
  MiniMap,
  Node,
  NodeChange,
  ReactFlow,
  XYPosition,
} from "reactflow"

import { GraphEdge, GraphNode, GraphNodeId } from "@/graph/graph-types"
import {
  graphEdgesAtom,
  graphNodeMapAtom,
  graphNodesAtom,
} from "@/graph/state/graph-atoms"

type FlowNode = Node<GraphNode>
type FlowEdge = Edge<GraphEdge>

const flowPositionMapAtom = atom(new Map<GraphNodeId, XYPosition>())

const flowNodesAtom = atom(
  (get) => {
    const nodes = get(graphNodesAtom)
    const positions = get(flowPositionMapAtom)
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
    const nodes: GraphNode[] = flowNodes.map((flowNode) => {
      return {
        ...flowNode.data,
        id: flowNode.id,
        name: flowNode.data.name,
      }
    })
    const positions = new Map<GraphNodeId, XYPosition>()
    flowNodes.forEach((flowNode) => {
      positions.set(flowNode.id, flowNode.position)
    })
    set(flowPositionMapAtom, positions)

    const nodeMap = new Map<GraphNodeId, GraphNode>()
    nodes.forEach((node) => {
      nodeMap.set(node.id, node)
    })
    set(graphNodeMapAtom, nodeMap)
  }
)

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
  const [nodes, setNodes] = useAtom(flowNodesAtom)
  const edges = useAtomValue(flowEdgesAtom)

  const onNodesChange = useCallback(
    (changes: NodeChange[]) => {
      setNodes(applyNodeChanges(changes, nodes))
    },
    [nodes, setNodes]
  )

  return (
    <ReactFlow nodes={nodes} edges={edges} onNodesChange={onNodesChange}>
      <Controls />
      <MiniMap />
      <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
    </ReactFlow>
  )
}
