import axios from "axios"
import { useAtomValue, useSetAtom } from "jotai"
import { useCallback } from "react"

import { graphCoreDataAtom } from "./state/graph-atoms"

export function useSaveGraph() {
  const data = useAtomValue(graphCoreDataAtom)
  return useCallback(() => {
    axios.post("/api/save", { data })
  }, [data])
}

export function useLoadGraph() {
  const setData = useSetAtom(graphCoreDataAtom)
  return useCallback(() => {
    axios.get("/api/load").then((response) => {
      setData(response.data)
    })
  }, [setData])
}
