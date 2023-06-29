import { Box } from "@chakra-ui/react"
import { useAtomValue } from "jotai"

import { GraphNode } from "@/graph/graph-types"
import { graphNodeFirstSelectedAtom } from "@/graph/state/derived/selection-atoms"

import { NameInput } from "./name-input"

function SingleDetailInternal({ node }: { node: GraphNode }) {
  return (
    <Box padding={2}>
      <NameInput node={node} />
    </Box>
  )
}

export default function SingleDetail() {
  const node = useAtomValue(graphNodeFirstSelectedAtom)
  if (!node) {
    return <Box>🤪 Node Undefined 🤷‍♀️</Box>
  }
  return <SingleDetailInternal node={node} />
}
