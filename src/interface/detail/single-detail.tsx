import { Box, VStack } from "@chakra-ui/react"
import { useAtomValue } from "jotai"

import { graphNodeFirstSelectedAtom } from "@/graph/state/derived/selection-atoms"

import CategorySelect from "./category/category-select"
import CategoryFormList from "./category/form/category-form-list"
import { DescriptionInput } from "./input/description-input"
import { NameInput } from "./input/name-input"

export default function SingleDetail() {
  const node = useAtomValue(graphNodeFirstSelectedAtom)
  if (!node) {
    return <Box>🤪 Node Undefined 🤷‍♀️</Box>
  }

  return (
    <VStack padding={2} alignItems="stretch">
      <NameInput node={node} />
      <DescriptionInput node={node} />
      <CategorySelect nodeId={node.id} />
      <CategoryFormList nodeId={node.id} />
    </VStack>
  )
}
