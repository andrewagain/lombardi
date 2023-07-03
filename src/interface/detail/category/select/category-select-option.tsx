import { Box, Text } from "@chakra-ui/react"
import { components, OptionProps } from "chakra-react-select"
import { useMemo } from "react"

import { NodeCategory } from "@/graph/graph-types"
import { getNodeCategoryChain } from "@/graph/schema/node-categories"

export default function CategorySelectOption(props: OptionProps<NodeCategory>) {
  const categoryChain = useMemo(
    () => getNodeCategoryChain([props.data.id]),
    [props.data]
  )
  const parentText = categoryChain
    .slice(0, -1)
    .map((x) => x.name)
    .join(" / ")
  return (
    <components.Option {...props}>
      <Box>
        <Text fontSize={10}>{parentText}</Text>
        <Box>{props.data.name}</Box>
      </Box>
    </components.Option>
  )
}
