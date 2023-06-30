import { Box, VStack } from "@chakra-ui/react"
import { useAtomValue } from "jotai"

import { graphNodeFirstSelectedAtom } from "@/graph/state/derived/selection-atoms"

import CategoryForm from "./category/category-form"
import CategorySelect from "./category/category-select"
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
      <CategorySelect nodeId={node.id} />
      {(node.categories || []).map((category) => (
        <CategoryForm nodeId={node.id} category={category} />
      ))}
    </VStack>
  )
}
