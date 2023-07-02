import { Box, HStack, Text } from "@chakra-ui/react"
import { useMemo } from "react"

import { GraphNodeId, NodeCategoryId } from "@/graph/graph-types"
import { getNodeCategoryChain } from "@/graph/schema/node-categories"

import CategoryInput from "./category-input"

export default function CategoryForm({
  nodeId,
  categoryId,
}: {
  nodeId: GraphNodeId
  categoryId: NodeCategoryId
}) {
  const chain = useMemo(() => getNodeCategoryChain(categoryId), [categoryId])

  return (
    <div>
      {chain.map((category) => (
        <Box key={category.id}>
          <h2>{category.name}</h2>
          {category.properties.map((property) => (
            <HStack key={property.name}>
              <Text>{property.name}</Text>
              <CategoryInput
                nodeId={nodeId}
                category={category}
                property={property}
              />
            </HStack>
          ))}
        </Box>
      ))}
    </div>
  )
}
