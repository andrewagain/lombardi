import { Box, HStack, Text, VStack } from "@chakra-ui/react"
import { useAtomValue } from "jotai"
import { useMemo } from "react"

import { GraphNodeId } from "@/graph/graph-types"
import { getNodeCategoryChain } from "@/graph/schema/node-categories"
import { graphNodeFamily } from "@/graph/state/derived/node-atoms"

import CategoryInput from "./category-input"

export default function CategoryForm({ nodeId }: { nodeId: GraphNodeId }) {
  const node = useAtomValue(graphNodeFamily(nodeId))
  const chain = useMemo(
    () => getNodeCategoryChain(node?.categories || []),
    [node?.categories]
  )

  return (
    <VStack alignItems="stretch">
      {chain.map((category) => (
        <Box key={category.id} borderColor="interface.border" borderWidth="1px">
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
    </VStack>
  )
}
