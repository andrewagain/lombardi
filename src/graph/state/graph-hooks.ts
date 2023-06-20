import { useSetAtom } from "jotai"
import { useAtomCallback } from "jotai/utils"
import { useCallback } from "react"

import { GraphEdge, GraphNode } from "../graph-types.ts"
import {
  calculateInsertNodePriorities,
  createEmptyGraph,
  graphSortEdges,
} from "../graph-util.ts"
import { graphRootAtom } from "./graph-atoms.ts"

export function useClearGraph() {
  const setGraphRoot = useSetAtom(graphRootAtom)
  return useCallback(() => {
    setGraphRoot(createEmptyGraph())
  }, [setGraphRoot])
}

export function useAddNode() {
  const setGraphRoot = useSetAtom(graphRootAtom)
  return useCallback(
    (node: GraphNode) => {
      setGraphRoot((graphRoot) => {
        const { nodeMap } = graphRoot
        return {
          ...graphRoot,
          nodeMap: new Map(nodeMap).set(node.id, node),
        }
      })
    },
    [setGraphRoot]
  )
}

export function useAddEdge() {
  const setGraphRoot = useSetAtom(graphRootAtom)
  return useCallback(
    (edge: GraphEdge) => {
      setGraphRoot((graphRoot) => {
        const { edgeMap } = graphRoot
        return {
          ...graphRoot,
          edgeMap: new Map(edgeMap).set(edge.id, edge),
        }
      })
    },
    [setGraphRoot]
  )
}

export function useRenameNode() {
  const setGraphRoot = useSetAtom(graphRootAtom)
  return useCallback(
    (id: string, name: string) => {
      setGraphRoot((graphRoot) => {
        const { nodeMap } = graphRoot
        const node = nodeMap.get(id)
        if (!node) {
          return graphRoot
        }
        return {
          ...graphRoot,
          nodeMap: new Map(nodeMap).set(id, { ...node, name }),
        }
      })
    },
    [setGraphRoot]
  )
}

export function useDeleteNodes() {
  const setGraphRoot = useSetAtom(graphRootAtom)

  return useCallback(
    (ids: string[]) => {
      setGraphRoot((graphRoot) => {
        const { nodeMap, edgeMap } = graphRoot
        const newEdgeMap = new Map(edgeMap)
        for (const id of ids) {
          nodeMap.delete(id)
          for (const edge of edgeMap.values()) {
            if (edge.source === id || edge.target === id) {
              newEdgeMap.delete(edge.id)
            }
          }
        }
        return {
          ...graphRoot,
          edgeMap: newEdgeMap,
        }
      })
    },
    [setGraphRoot]
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
        const graphRoot = get(graphRootAtom)
        // Put all nodes that are moving into a map for easy lookup
        const movingNodeIdMap = new Map(nodeIds.map((id) => [id, true]))

        // Find all edges that are incoming on any of the nodes that are moving
        const incomingEdges = [...graphRoot.edgeMap.values()].filter((e) =>
          movingNodeIdMap.has(e.target)
        )

        // Create new edges with the updated source
        const updatedIncomingEdges = incomingEdges.map((edge) => ({
          ...edge,
          source: parentId,
        }))

        // Create a new edge map with the updated edges
        const newEdgeMap = new Map(graphRoot.edgeMap)
        updatedIncomingEdges.forEach((edge) => {
          newEdgeMap.set(edge.id, edge)
        })

        // Update the edge priority such that the moved edges are in the correct position
        const newEdgePriorityMap = new Map(graphRoot.edgePriorityMap)

        // Find the existing outgoing edges of the parent
        const parentOutgoingEdges = [...graphRoot.edgeMap.values()].filter(
          (edge) => edge.source === parentId
        )
        // Sort the outgoing edges of the parent
        const parentOutgoingEdgeSorted = graphSortEdges(
          parentOutgoingEdges,
          graphRoot.edgePriorityMap
        )

        // Find the index of the first outgoing edge that is not moving
        const beforeNode = parentOutgoingEdgeSorted[insertIndex - 1]
        const afterNode = parentOutgoingEdgeSorted[insertIndex]
        const beforePriority =
          graphRoot.edgePriorityMap.get(beforeNode?.id ?? null) || null
        const afterPriority =
          graphRoot.edgePriorityMap.get(afterNode?.id ?? null) || null
        console.log("bp", beforePriority)
        console.log("ap", afterPriority)

        const priorities = calculateInsertNodePriorities(
          parentOutgoingEdgeSorted.length,
          beforePriority,
          afterPriority
        )
        console.log("priorities", priorities)

        parentOutgoingEdgeSorted.forEach((edge, i) => {
          newEdgePriorityMap.set(edge.id, priorities[i])
        })

        console.log("newedgeprioritymap", [...newEdgePriorityMap.entries()])

        set(graphRootAtom, {
          ...graphRoot,
          edgeMap: newEdgeMap,
          edgePriorityMap: newEdgePriorityMap,
        })
      },
      []
    )
  )
}
