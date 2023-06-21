import { useAtom } from "jotai"

import { graphIdAtom } from "@/graph/state/graph-atoms"
import { useClearGraph } from "@/graph/state/graph-hooks"

export default function GraphSelect() {
  const [graphId, setGraphId] = useAtom(graphIdAtom)
  const clearGraph = useClearGraph()

  return (
    <div>
      <select
        value={graphId}
        onChange={(event) => {
          clearGraph()
          setGraphId(event.target.value)
        }}
      >
        <option value="opioid">Opioid Overdose Epidemic</option>
        <option value="covid19">Covid-19 Pandemic</option>
        <option value="usagov">USA Government</option>
      </select>
    </div>
  )
}
