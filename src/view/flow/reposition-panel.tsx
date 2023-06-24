import { IconButton } from "@chakra-ui/react"
import dagre from "dagre"
import { useAtomValue } from "jotai"
import { useAtomCallback } from "jotai/utils"
import { useCallback, useEffect, useRef } from "react"
import { TbLayout2 } from "react-icons/tb"
import { Panel } from "reactflow"

import { NodePosition } from "@/graph/graph-types"
import {
  graphNodeIdsAtom,
  graphNodeMapAtom,
  graphNodePositionMapAtom,
} from "@/graph/state/graph-atoms"
import { pointCopy } from "@/util/geometry/point"

import { flowDagreAtom } from "./flow-atoms"

function getDagreContractPositionMap(
  g: dagre.graphlib.Graph,
  nodeIds: string[]
) {
  const m = new Map<string, NodePosition>()
  nodeIds.forEach((nodeId) => {
    const node = g.node(nodeId)
    if (node) {
      m.set(nodeId, pointCopy(node))
    }
  })
  return m
}

export default function RepositionPanel() {
  const nodeMap = useAtomValue(graphNodeMapAtom)
  const nodeCountRef = useRef(nodeMap.size)

  const repositionNodes = useAtomCallback(
    useCallback((get, set) => {
      const g = get(flowDagreAtom)
      const start = Date.now()
      dagre.layout(g)
      console.log(`layout in ${Date.now() - start}ms`)

      const nodeIds = get(graphNodeIdsAtom)
      const positionMap = getDagreContractPositionMap(g, nodeIds)
      console.log("positionMap", [...positionMap.entries()])
      set(graphNodePositionMapAtom, positionMap)
    }, [])
  )

  useEffect(() => {
    if (nodeMap.size === nodeCountRef.current) {
      return
    }
    nodeCountRef.current = nodeMap.size
    console.log(`repositioning ${nodeMap.size} nodes`)
    repositionNodes()
  }, [repositionNodes, nodeMap])

  return (
    <Panel position="top-right">
      <IconButton onClick={repositionNodes} aria-label="Reposition">
        <TbLayout2 />
      </IconButton>
    </Panel>
  )
}
