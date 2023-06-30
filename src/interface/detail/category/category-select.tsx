import {
  ActionMeta,
  GroupBase,
  OnChangeValue,
  Select,
} from "chakra-react-select"
import { useAtomValue } from "jotai"
import { useCallback, useMemo } from "react"
import { OptionsOrGroups } from "react-select"

import { GraphNodeId, NodeCategory } from "@/graph/graph-types"
import { nodeCategories, nodeCategoryMap } from "@/graph/schema/node-categories"
import { useModifyNode } from "@/graph/state/derived/modify-hooks"
import { graphNodeFamily } from "@/graph/state/derived/node-atoms"
import { isTruthy } from "@/util/function"

function getOptionLabel(n: NodeCategory) {
  return n.id
}

function getOptionValue(n: NodeCategory) {
  return n.id
}

type Option = NodeCategory

// https://react-select.com/props#groupheading

type GroupType = GroupBase<NodeCategory>
function optionsToGroups(
  n: NodeCategory[]
): OptionsOrGroups<NodeCategory, GroupType> {
  return n.map((x) => ({
    ...x,
    options: optionsToGroups(x.subcategories),
    label: x.id,
  }))
}

const options = optionsToGroups(nodeCategories)

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
    <div>
      <Select
        closeMenuOnSelect={false}
        isMulti
        value={value}
        options={options}
        getOptionLabel={getOptionLabel}
        getOptionValue={getOptionValue}
        onChange={onChange}
      />
    </div>
  )
}
