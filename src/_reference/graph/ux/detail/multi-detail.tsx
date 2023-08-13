import { Box } from "@chakra-ui/react"
import { useAtomValue } from "jotai"

import { graphNodeSelectedIdsAtom } from "@/_reference/graph/state/graph-core-atoms"

export default function MultiDetail() {
  const selectedNodeIds = useAtomValue(graphNodeSelectedIdsAtom)

  return (
    <Box>
      <Box textAlign="center" paddingTop={4} color="text.subtle">
        {selectedNodeIds.length} nodes selected
      </Box>
    </Box>
  )
}
