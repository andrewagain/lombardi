import { Box, VStack } from "@chakra-ui/react"
import { useAtomValue } from "jotai"

import { graphNodeFirstSelectedAtom } from "@/graph/state/derived/selection-atoms"

import CategoryForm from "./input/category-form"
import { DescriptionInput } from "./input/description-input"
import { NameInput } from "./input/name-input"

export default function SingleDetail() {
  const node = useAtomValue(graphNodeFirstSelectedAtom)
  if (!node) {
    return <Box>🤪 Node Undefined 🤷‍♀️</Box>
  }

  return (
    <VStack padding={2}>
      <NameInput node={node} />
      <DescriptionInput node={node} />
      {(node.categories || []).map((category) => (
        <CategoryForm nodeId={node.id} category={category} />
      ))}
    </VStack>
  )
}
