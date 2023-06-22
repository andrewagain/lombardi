// https://reactflow.dev/

import "reactflow/dist/style.css"

import dagre from "dagre"
import { atom, useAtom, useAtomValue } from "jotai"
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
  Panel,
  ReactFlow,
  XYPosition,
} from "reactflow"

import {
  GraphEdge,
  GraphNode,
  GraphNodeId,
  NodePosition,
} from "@/graph/graph-types"
import {
  graphEdgesAtom,
  graphNodeIdsAtom,
  graphNodePositionMapAtom,
  graphNodesAtom,
} from "@/graph/state/graph-atoms"
import { listToMap } from "@/util/datastructure/map"
import { pointCopy } from "@/util/geometry/point"

type FlowNode = Node<GraphNode>
type FlowEdge = Edge<GraphEdge>

const flowNodesAtom = atom(
  (get) => {
    const nodes = get(graphNodesAtom)
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
    const nodes: GraphNode[] = flowNodes.map((flowNode) => {
      return {
        ...flowNode.data,
        id: flowNode.id,
        name: flowNode.data.name,
      }
    })
    set(graphNodesAtom, nodes)

    const positionsMap: Map<GraphNodeId, XYPosition> = listToMap(
      flowNodes,
      (f) => f.id,
      (f) => f.position
    )
    set(graphNodePositionMapAtom, positionsMap)
  }
)

// convert position float array to position map
function getDagreContractPositionMap(
  g: dagre.graphlib.Graph,
  nodeIds: string[]
) {
  const m = new Map<string, NodePosition>()
  nodeIds.forEach((nodeId) => {
    m.set(nodeId, pointCopy(g.node(nodeId)))
  })
  return m
}

const flowDagreAtom = atom((get) => {
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

  const repositionNodes = useAtomCallback(
    useCallback((get, set) => {
      const g = get(flowDagreAtom)
      const start = Date.now()
      dagre.layout(g)
      console.log(`layout in ${Date.now() - start}ms`)

      const nodeIds = get(graphNodeIdsAtom)
      const positionMap = getDagreContractPositionMap(g, nodeIds)
      set(graphNodePositionMapAtom, positionMap)
    }, [])
  )

  return (
    <ReactFlow nodes={nodes} edges={edges} onNodesChange={onNodesChange}>
      <Controls />
      <MiniMap
        style={{
          backgroundColor: "#222",
        }}
      />
      <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
      <Panel position="top-right">
        <button onClick={repositionNodes}>Reposition</button>
      </Panel>
    </ReactFlow>
  )
}
