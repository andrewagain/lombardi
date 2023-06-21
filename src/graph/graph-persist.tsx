import axios from "axios"
import { useAtom, useAtomValue } from "jotai"
import { useEffect } from "react"

import { serializableDataAtom } from "@/graph/graph-serialize"

import { graphIdAtom } from "./state/graph-atoms"

export function PersistGraphEffect() {
  const [data, setData] = useAtom(serializableDataAtom)
  const graphId = useAtomValue(graphIdAtom)

  useEffect(() => {
    if (data.nodes.length === 0) return
    axios.post("/api/save", { graphId, data })
  }, [data, graphId])

  useEffect(() => {
    axios.post("/api/load", { graphId }).then((response) => {
      setData(response.data)
    })
  }, [setData, graphId])

  return null
}
