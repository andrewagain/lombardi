// https://reactflow.dev/

import "reactflow/dist/style.css"

import { atom, useAtomValue } from "jotai"
import { useAtomCallback } from "jotai/utils"
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

const flowNodesAtom = atom((get) => {
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

  // const onNodesChange = useAtomCallback(
  //   useCallback((get, set, changes: NodeChange[]) => {
  //     const newNodes = applyNodeChanges(get(graphNodesAtom), changes)
  //     const nodesMap = new Map(get(graphNodeMapAtom))
  //     changes.forEach((change) => {
  //       if (change.type === "add" || change.type === "update") {
  //         nodesMap.set(change.node.id, change.node.position)
  //       }
  //     }

  //   }, [])
  // )

  return (
    <ReactFlow nodes={nodes} edges={edges} onNodesChange={onNodesChange}>
      <Controls />
      <MiniMap />
      <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
    </ReactFlow>
  )
}
