import { useAtom } from "jotai"

import { useClearGraph } from "@/_reference/graph/state/derived/modify-hooks"
import { graphIdAtom } from "@/_reference/graph/state/graph-core-atoms"

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
        <option value="nodetypes">Node Types</option>
        <option value="opioid">Opioid Overdose Epidemic</option>
        <option value="metacrisis">Metacrisis</option>
        <option value="vaccines">Vaccines</option>
        <option value="covid19">Covid-19 Pandemic</option>
        <option value="usagov">USA Government</option>
      </select>
    </div>
  )
}
