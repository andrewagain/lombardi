import { useLoadGraph, useSaveGraph } from "@/graph/graph-network.ts"

export default function Header() {
  const saveGraph = useSaveGraph()
  const loadGraph = useLoadGraph()

  return (
    <header style={{ display: "flex", justifyContent: "space-between" }}>
      <button onClick={saveGraph}>Save</button>
      <button onClick={loadGraph}>Load</button>
    </header>
  )
}
