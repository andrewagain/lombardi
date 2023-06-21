import axios from "axios"
import { useAtom } from "jotai"
import { useEffect } from "react"

import { serializableDataAtom } from "@/graph/graph-serialize"

export function PersistGraphEffect() {
  const [data, setData] = useAtom(serializableDataAtom)

  useEffect(() => {
    if (data.nodes.length === 0) return
    axios.post("/api/save", { data })
  }, [data])

  useEffect(() => {
    axios.get("/api/load").then((response) => {
      setData(response.data)
    })
  }, [setData])

  return null
}
