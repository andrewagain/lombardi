import { Box } from "@chakra-ui/react"
import { useAtomValue } from "jotai"

import { graphNodeSelectedIdsAtom } from "@/graph/state/graph-core-atoms"

export default function MultiDetail() {
  const selectedNodeIds = useAtomValue(graphNodeSelectedIdsAtom)

  return (
    <Box>
      <Box>{selectedNodeIds.length} nodes selected</Box>
    </Box>
  )
}
