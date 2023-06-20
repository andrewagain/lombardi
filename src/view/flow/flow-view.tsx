import { atom, useAtomValue } from "jotai"
import {
  Background,
  BackgroundVariant,
  Controls,
  MiniMap,
  Node,
  ReactFlow,
  XYPosition,
} from "reactflow"

import { GraphNode, GraphNodeId } from "@/graph/graph-types"
import { graphNodesAtom } from "@/graph/state/graph-atoms"

const flowPositionMapAtom = atom(new Map<GraphNodeId, XYPosition>())

const flowNodesAtom = atom((get) => {
  const nodes = get(graphNodesAtom)
  const positions = get(flowPositionMapAtom)
  const flowNodes: Node<GraphNode>[] = nodes.map((node) => {
    return {
      id: node.id,
      position: positions.get(node.id) ?? { x: 0, y: 0 },
      data: node,
    }
  })
  return flowNodes
})

// https://reactflow.dev/
export default function FlowView() {
  const nodes = useAtomValue(flowNodesAtom)

  return (
    <ReactFlow nodes={nodes}>
      <Controls />
      <MiniMap />
      <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
    </ReactFlow>
  )
}
