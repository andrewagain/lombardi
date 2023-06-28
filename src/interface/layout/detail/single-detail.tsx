import { Box } from "@chakra-ui/react"
import { useAtomValue } from "jotai"

import { graphNodeFirstAtom } from "@/graph/state/derived/node-atoms"

export default function SingleDetail() {
  const node = useAtomValue(graphNodeFirstAtom)
  if (!node) {
    return <Box>🤪 Node Undefined 🤷‍♀️</Box>
  }

  return (
    <Box>
      <Box>id: {node.id}</Box>
    </Box>
  )
}
