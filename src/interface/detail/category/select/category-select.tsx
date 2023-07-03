import { ActionMeta, OnChangeValue, Select } from "chakra-react-select"
import { useAtomValue } from "jotai"
import { useCallback, useMemo } from "react"

import { GraphNodeId, NodeCategory } from "@/graph/graph-types"
import { nodeCategories, nodeCategoryMap } from "@/graph/schema/node-categories"
import { useModifyNode } from "@/graph/state/derived/modify-hooks"
import { graphNodeFamily } from "@/graph/state/derived/node-atoms"
import { isTruthy } from "@/util/function"

import CategorySelectOption from "./category-select-option"

function getOptionLabel(n: NodeCategory) {
  return n.name
}

function getOptionValue(n: NodeCategory) {
  return n.id
}

export default function CategorySelect({ nodeId }: { nodeId: GraphNodeId }) {
  const node = useAtomValue(graphNodeFamily(nodeId))
  const modifyNode = useModifyNode()

  const onChange = useCallback(
    (
      categories: OnChangeValue<NodeCategory, true>,
      actionMeta: ActionMeta<NodeCategory>
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
      components={{ Option: CategorySelectOption }}
    />
  )
}
