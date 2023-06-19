import { useSetAtom } from "jotai"
import { useCallback } from "react"

import { isTruthy } from "@/util/function.ts"

import { GraphEdge, GraphNode } from "../graph-types.ts"
import { createEmptyGraph, graphSortEdges } from "../graph-util.ts"
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

// TODO: function that updates the given edges/nodes on graphRoot

// Modify the edges that are incoming on any of the nodes that need to move.
// The edge source should be changed to the new parent, and an index should be
// added to the edge position map.
export function useMoveNodes() {
  const setGraphRoot = useSetAtom(graphRootAtom)

  return useCallback(
    (
      nodeIds: string[],
      destinationParentId: string,
      destinationParentIndex: number
    ) => {
      setGraphRoot((graphRoot) => {
        const movingNodeIdMap = new Map(nodeIds.map((id) => [id, true]))
        const movingNodes = nodeIds
          .map((id) => graphRoot.nodeMap.get(id))
          .filter(isTruthy)
        const incomingEdges = [...graphRoot.edgeMap.values()].filter((e) =>
          movingNodeIdMap.has(e.target)
        )

        const updatedIncomingEdges = incomingEdges.map((edge) => ({
          ...edge,
          source: destinationParentId,
        }))

        const newEdgeMap = new Map(graphRoot.edgeMap)
        updatedIncomingEdges.forEach((edge) => {
          newEdgeMap.set(edge.id, edge)
        })

        const newEdgePriorityMap = new Map(graphRoot.edgePriorityMap)
        const parentOutgoingEdges = [...graphRoot.edgeMap.values()].filter(
          (edge) => edge.source === destinationParentId
        )
        const parentOutgoingEdgeSorted = graphSortEdges(
          parentOutgoingEdges,
          graphRoot.edgePriorityMap
        )

        return {
          ...graphRoot,
          edgeMap: newEdgeMap,
          edgePriorityMap: newEdgePriorityMap,
        }
      })
    },
    [setGraphRoot]
  )
}
