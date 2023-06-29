import { Box, VStack } from "@chakra-ui/react"
import { useAtomValue } from "jotai"

import { GraphNode } from "@/graph/graph-types"
import { graphNodeFirstSelectedAtom } from "@/graph/state/derived/selection-atoms"

import { DescriptionInput } from "./input/description-input"
import { NameInput } from "./input/name-input"

function SingleDetailInternal({ node }: { node: GraphNode }) {
  return (
    <VStack padding={2}>
      <NameInput node={node} />
      <DescriptionInput node={node} />
    </VStack>
  )
}

export default function SingleDetail() {
  const node = useAtomValue(graphNodeFirstSelectedAtom)
  if (!node) {
    return <Box>🤪 Node Undefined 🤷‍♀️</Box>
  }
  return <SingleDetailInternal node={node} />
}
