// https://reactflow.dev/

import "reactflow/dist/style.css"

import { useAtom, useAtomValue, useSetAtom } from "jotai"
import { useCallback, useRef } from "react"
import {
  applyNodeChanges,
  Background,
  BackgroundVariant,
  Controls,
  MiniMap,
  NodeChange,
  OnSelectionChangeFunc,
  ReactFlow,
  ReactFlowInstance,
} from "reactflow"

import { graphNodeSelectedIdsAtom } from "@/graph/state/graph-core-atoms"

import { flowEdgesAtom, flowNodesAtom } from "./flow-atoms"
import nodeTypes from "./node/node-types"
import RepositionPanel from "./reposition-panel"

export default function FlowView() {
  const [nodes, setNodes] = useAtom(flowNodesAtom)
  const edges = useAtomValue(flowEdgesAtom)
  const setSelectedIds = useSetAtom(graphNodeSelectedIdsAtom)
  const flowRef = useRef<ReactFlowInstance>()

  const onNodesChange = useCallback(
    (changes: NodeChange[]) => {
      setNodes(applyNodeChanges(changes, nodes))
    },
    [nodes, setNodes]
  )

  const onSelectionChange: OnSelectionChangeFunc = useCallback(
    (selection) => {
      setSelectedIds(selection.nodes.map((node) => node.data.id))
    },
    [setSelectedIds]
  )

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onSelectionChange={onSelectionChange}
      nodeTypes={nodeTypes}
      onInit={(instance) => {
        flowRef.current = instance
      }}
    >
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
