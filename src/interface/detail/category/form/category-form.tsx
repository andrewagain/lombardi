import { Box, Heading, HStack, Text } from "@chakra-ui/react"
import React, { useMemo } from "react"

import { GraphNodeId, NodeCategoryId } from "@/graph/graph-types"
import {
  getCategoryChainComposedNames,
  getCategoryChainProperties,
  getNodeCategoryChain,
  nodeCategoryMap,
} from "@/graph/schema/node-category-util"

import CategoryInput from "../category-input"

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
      padding={2}
    >
      <HStack alignItems="baseline">
        <Heading size="md">{category.name}</Heading>
        <Text fontSize={10}>({composedNames.join(",")})</Text>
      </HStack>
      <Box
        display="grid"
        gridTemplateColumns={"auto 1fr"}
        gridRowGap={2}
        gridColumnGap={2}
      >
        {properties.map((property) => (
          <React.Fragment key={property.name}>
            <Text>{property.name}</Text>
            <CategoryInput
              nodeId={nodeId}
              category={category}
              property={property}
            />
          </React.Fragment>
        ))}
      </Box>
    </Box>
  )
}
