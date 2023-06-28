import { Box } from "@chakra-ui/react"
import { useAtomValue } from "jotai"

import { graphNodeSelectedIdMapAtom } from "@/graph/state/derived/selection-atoms"
import { graphNodeSelectedIdsAtom } from "@/graph/state/graph-core-atoms"

import NodeDetail from "../detail/node-detail"

export default function RightPanel() {
  const selectedNodeIds = useAtomValue(graphNodeSelectedIdsAtom)
  const firstNodeId = selectedNodeIds[0]
  if (firstNodeId && selectedNodeIds.length === 1) {
    return <NodeDetail id={firstNodeId} />
  }

  return <Box gridArea="r-panel">{selectedNodeIds.length} nodes selected</Box>
}
