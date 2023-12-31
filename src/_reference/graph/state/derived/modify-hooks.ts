import { useAtom, useSetAtom } from "jotai"
import { useAtomCallback } from "jotai/utils"
import { useCallback } from "react"

import { listToMap, mergeMaps } from "@/util/datastructure/map.ts"
import { setCopyWithToggledItem } from "@/util/datastructure/set.ts"

import { GraphEdge, GraphNode, GraphNodeId } from "../../graph-types.ts"
import { graphSortEdges } from "../../graph-util.ts"
import {
  graphEdgeMapAtom,
  graphEdgePriorityMapAtom,
  graphNodeHiddenSetAtom,
  graphNodeMapAtom,
} from "../graph-core-atoms.ts"

export function useClearGraph() {
  const setNodeMap = useSetAtom(graphNodeMapAtom)
  const setEdgeMap = useSetAtom(graphEdgeMapAtom)
  const setEdgePriorityMap = useSetAtom(graphEdgePriorityMapAtom)

  return useCallback(() => {
    setNodeMap(new Map<GraphNodeId, GraphNode>())
    setEdgeMap(new Map<string, GraphEdge>())
    setEdgePriorityMap(new Map<string, number>())
  }, [setEdgeMap, setEdgePriorityMap, setNodeMap])
}

export function useAddNode() {
  const setNodeMap = useSetAtom(graphNodeMapAtom)

  return useCallback(
    (node: GraphNode) => {
      setNodeMap((nodeMap) => new Map(nodeMap).set(node.id, node))
    },
    [setNodeMap]
  )
}

export function useAddEdge() {
  const setEdgeMap = useSetAtom(graphEdgeMapAtom)

  return useCallback(
    (edge: GraphEdge) => {
      setEdgeMap((edgeMap) => new Map(edgeMap).set(edge.id, edge))
    },
    [setEdgeMap]
  )
}

export function useModifyNode() {
  const setNodeMap = useSetAtom(graphNodeMapAtom)

  return useCallback(
    (id: string, updates: Partial<GraphNode>) => {
      setNodeMap((nodeMap) => {
        const node = nodeMap.get(id)
        if (!node) {
          return nodeMap
        }
        return new Map(nodeMap).set(id, { ...node, ...updates })
      })
    },
    [setNodeMap]
  )
}

export function useRenameNode() {
  const modifyNode = useModifyNode()

  return useCallback(
    (id: string, name: string) => {
      modifyNode(id, { name })
    },
    [modifyNode]
  )
}

export function useDeleteNodes() {
  const setNodeMap = useSetAtom(graphNodeMapAtom)
  const setEdgeMap = useSetAtom(graphEdgeMapAtom)

  return useCallback(
    (ids: string[]) => {
      setEdgeMap((edgeMap) => {
        const newEdgeMap = new Map(edgeMap)
        for (const edge of edgeMap.values()) {
          if (ids.includes(edge.source) || ids.includes(edge.target)) {
            newEdgeMap.delete(edge.id)
          }
        }
        return newEdgeMap
      })
      setNodeMap((nodeMap) => {
        const newNodeMap = new Map(nodeMap)
        for (const id of ids) {
          newNodeMap.delete(id)
        }
        return newNodeMap
      })
    },
    [setNodeMap, setEdgeMap]
  )
}

// Modify the edges that are incoming on any of the nodes that need to move.
// The edge source should be changed to the new parent, and an index should be
// added to the edge position map.
export function useMoveNodes() {
  return useAtomCallback(
    useCallback(
      (
        get,
        set,
        {
          nodeIds,
          parentId,
          insertIndex,
        }: {
          nodeIds: string[]
          parentId: string | null
          insertIndex: number
        }
      ) => {
        if (!parentId) {
          console.log("Drag and drop without destination parent")
          return
        }

        //
        // Step 1: Update the edges
        //
        const edgeMap = get(graphEdgeMapAtom)

        // Put all nodes that are moving into a map for easy lookup
        const movingNodeIdMap = new Map(nodeIds.map((id) => [id, true]))

        // Find all edges that are incoming on any of the nodes that are moving
        const incomingEdges = [...edgeMap.values()].filter((e) =>
          movingNodeIdMap.has(e.target)
        )

        // Create new edges with the updated source
        const updatedIncomingEdges = incomingEdges.map((edge) => ({
          ...edge,
          source: parentId,
        }))
        const newEdgeMap = mergeMaps(
          edgeMap,
          listToMap(updatedIncomingEdges, (x) => x.id)
        )
        console.log("old edgeMap", edgeMap)
        console.log("newEdgeMap", newEdgeMap)
        set(graphEdgeMapAtom, newEdgeMap)

        //
        // Step 2: Prioritize the edges
        //
        const edgePriorityMap = get(graphEdgePriorityMapAtom)

        // Update the edge priority such that the moved edges are in the correct position
        const newEdgePriorityMap = new Map(edgePriorityMap)

        // Find the existing outgoing edges of the parent
        const parentOutgoingEdges = [...edgeMap.values()].filter(
          (edge) => edge.source === parentId
        )
        // Sort the outgoing edges of the parent
        const sortedSiblingEdges = graphSortEdges(
          parentOutgoingEdges,
          edgePriorityMap
        )
        sortedSiblingEdges.splice(insertIndex, 0, ...updatedIncomingEdges)

        console.log("sortedSiblingEdges", sortedSiblingEdges)
        sortedSiblingEdges.forEach((edge, i) => {
          console.log(`Setting priority of ${edge.id} to ${i + 1}`)
          newEdgePriorityMap.set(edge.id, i + 1)
        })

        set(graphEdgePriorityMapAtom, newEdgePriorityMap)
      },
      []
    )
  )
}

export function useToggleNodeVisibility(nodeId: GraphNodeId) {
  const [hiddenSet, setHiddenSet] = useAtom(graphNodeHiddenSetAtom)
  const visible = !hiddenSet.has(nodeId)

  const toggleVisibility = useCallback(() => {
    setHiddenSet((prevSet) => setCopyWithToggledItem(prevSet, nodeId))
  }, [setHiddenSet, nodeId])

  return [visible, toggleVisibility] as [boolean, () => void]
}
