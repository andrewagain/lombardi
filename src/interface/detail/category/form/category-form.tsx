import { Box, Heading, HStack, Text } from "@chakra-ui/react"
import { useMemo } from "react"

import { GraphNodeId, NodeCategoryId } from "@/graph/graph-types"
import {
  getCategoryChainComposedNames,
  getCategoryChainProperties,
  getNodeCategoryChain,
  nodeCategoryMap,
} from "@/graph/schema/node-category-util"

import CategoryInput from "../input/category-input"

export default function CategoryForm({
  nodeId,
  categoryId,
}: {
  nodeId: GraphNodeId
  categoryId: NodeCategoryId
}) {
  const category = nodeCategoryMap.get(categoryId)
  const chain = useMemo(() => getNodeCategoryChain([categoryId]), [categoryId])
  const properties = useMemo(() => getCategoryChainProperties(chain), [chain])
  console.log("chain", chain)
  console.log("properties", properties)

  const composedNames = useMemo(
    () => getCategoryChainComposedNames(chain),
    [chain]
  )
  if (!category) {
    return null
  }

  return (
    <Box
      borderColor="interface.border"
      borderWidth="1px"
      width="100%"
      overflow="hidden"
      padding={3}
    >
      <HStack alignItems="baseline">
        <Heading size="md" marginBottom={1}>
          {category.name}
        </Heading>
        <Text fontSize={10} color="text.subtle">
          {composedNames.join(",")}
        </Text>
      </HStack>
      <Box>
        {properties.map((property) => (
          <Box key={property.name}>
            <Text color="text.secondary">{property.name}</Text>
            <CategoryInput
              nodeId={nodeId}
              category={category}
              property={property}
            />
          </Box>
        ))}
      </Box>
    </Box>
  )
}
