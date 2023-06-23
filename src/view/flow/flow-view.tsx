// https://reactflow.dev/

import "reactflow/dist/style.css"

import { useAtom, useAtomValue } from "jotai"
import { useCallback } from "react"
import {
  applyNodeChanges,
  Background,
  BackgroundVariant,
  Controls,
  MiniMap,
  NodeChange,
  ReactFlow,
} from "reactflow"

import { flowEdgesAtom, flowNodesAtom } from "./flow-atoms"
import RepositionPanel from "./reposition-panel"

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
      <RepositionPanel />
      <Controls />
      <MiniMap
        style={{
          backgroundColor: "#222",
        }}
      />
      <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
    </ReactFlow>
  )
}
