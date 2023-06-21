import { useAtom } from "jotai"

import { graphIdAtom } from "@/graph/state/graph-atoms"

export default function GraphSelect() {
  const [graphId, setGraphId] = useAtom(graphIdAtom)
  return (
    <select
      value={graphId}
      onChange={(event) => {
        setGraphId(event.target.value)
      }}
    >
      <option value="opioid">Opioid Overdose Epidemic</option>
      <option value="covid19">Covid-19 Pandemic</option>
      <option value="usagov">USA Government</option>
    </select>
  )
}
