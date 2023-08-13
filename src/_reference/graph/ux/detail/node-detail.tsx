import { useAtomValue } from "jotai"

import { graphNodeSelectedIdsAtom } from "@/_reference/graph/state/graph-core-atoms"

import MultiDetail from "./multi-detail"
import SingleDetail from "./single-detail"

export default function NodeDetail() {
  const selectedNodeIds = useAtomValue(graphNodeSelectedIdsAtom)

  if (selectedNodeIds.length === 1) {
    return <SingleDetail />
  }
  return <MultiDetail />
}
