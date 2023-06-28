import { Box } from "@chakra-ui/react"
import { useAtomValue } from "jotai"

import { GraphNodeId } from "@/graph/graph-types"
import { graphNodeFamily } from "@/graph/state/derived/node-atoms"

export default function NodeDetail({ id }: { id: GraphNodeId }) {
  const node = useAtomValue(graphNodeFamily(id))
  if (!node) {
    return <Box>🤪 Node Undefined 🤷‍♀️</Box>
  }

  return (
    <Box>
      <Box>id: {node.id}</Box>
    </Box>
  )
}
