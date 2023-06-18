import { useSetAtom } from "jotai"
import { useCallback } from "react"

import { GraphEdge,GraphNode } from "../graph-types.ts"
import { createEmptyGraph } from "../graph-util.ts"
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
