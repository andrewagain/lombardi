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
      console.log("onNodesChange", changes)
      // okay so it looks like when you initially set the nodes,
      // this gets called with a dimension change for each node (which is good)
      // but the problem is that this happens after we have calculated the layout,
      // and this wipes out the layout positions to 0,0
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
