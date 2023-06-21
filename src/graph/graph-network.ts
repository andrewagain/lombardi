import axios from "axios"
import { atom, useAtomValue, useSetAtom } from "jotai"
import { useCallback } from "react"

import {
  GraphEdge,
  GraphEdgeId,
  GraphEdgePriority,
  GraphNode,
} from "./graph-types"
import {
  graphEdgePriorityMapAtom,
  graphEdgesAtom,
  graphNodesAtom,
} from "./state/graph-atoms"

interface SerializableData {
  nodes: GraphNode[]
  edges: GraphEdge[]
  edgePriorities: [GraphEdgeId, GraphEdgePriority][]
}

const serializableDataAtom = atom(
  (get) => {
    const data: SerializableData = {
      nodes: get(graphNodesAtom),
      edges: get(graphEdgesAtom),
      edgePriorities: [...get(graphEdgePriorityMapAtom).entries()],
    }
    return data
  },
  (_, set, data: SerializableData) => {
    set(graphNodesAtom, data.nodes)
    set(graphEdgesAtom, data.edges)
    set(graphEdgePriorityMapAtom, new Map(data.edgePriorities))
  }
)

export function useSaveGraph() {
  const data = useAtomValue(serializableDataAtom)
  return useCallback(() => {
    axios.post("/api/save", { data })
  }, [data])
}

export function useLoadGraph() {
  const setData = useSetAtom(serializableDataAtom)
  return useCallback(() => {
    axios.get("/api/load").then((response) => {
      setData(response.data)
    })
  }, [setData])
}
