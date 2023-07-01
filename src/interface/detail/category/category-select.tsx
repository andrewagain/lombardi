import { Box, Text } from "@chakra-ui/react"
import {
  ActionMeta,
  components,
  OnChangeValue,
  OptionProps,
  Select,
} from "chakra-react-select"
import { useAtomValue } from "jotai"
import { useCallback, useMemo } from "react"

import { GraphNodeId, NodeCategory } from "@/graph/graph-types"
import {
  nodeCategories,
  nodeCategoryMap,
  parseNodeCategoryId,
} from "@/graph/schema/node-categories"
import { useModifyNode } from "@/graph/state/derived/modify-hooks"
import { graphNodeFamily } from "@/graph/state/derived/node-atoms"
import { isTruthy } from "@/util/function"

function getOptionLabel(n: NodeCategory) {
  return parseNodeCategoryId(n.id).name
}

function getOptionValue(n: NodeCategory) {
  return n.id
}

type Option = NodeCategory

const Option = (props: OptionProps<NodeCategory>) => {
  const { parents, name } = parseNodeCategoryId(props.data.id)
  return (
    <components.Option {...props}>
      <Box>
        <Text fontSize={10}>{parents.join(" / ")}</Text>
        <Box>{name}</Box>
      </Box>
    </components.Option>
  )
}

export default function CategorySelect({ nodeId }: { nodeId: GraphNodeId }) {
  const node = useAtomValue(graphNodeFamily(nodeId))
  const modifyNode = useModifyNode()

  const onChange = useCallback(
    (
      categories: OnChangeValue<Option, true>,
      actionMeta: ActionMeta<Option>
    ) => {
      if (actionMeta.action === "select-option") {
        modifyNode(nodeId, { categories: categories.map((x) => x.id) })
      } else if (actionMeta.action === "remove-value") {
        modifyNode(nodeId, { categories: categories.map((x) => x.id) })
      }
    },
    [modifyNode, nodeId]
  )

  const value = useMemo(
    () =>
      (node?.categories || [])
        .map((id) => nodeCategoryMap.get(id))
        .filter(isTruthy),
    [node?.categories]
  )

  return (
    <Select
      isMulti
      value={value}
      options={nodeCategories}
      getOptionLabel={getOptionLabel}
      getOptionValue={getOptionValue}
      onChange={onChange}
      components={{ Option }}
    />
  )
}
