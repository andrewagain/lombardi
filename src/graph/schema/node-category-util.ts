/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { isTruthy } from "@/util/function"

import { NodeCategory } from "../graph-types"
import { nodeCategories } from "./node-categories"

export const nodeCategoryMap = new Map(
  nodeCategories.map((category) => [category.id, category])
)

export function getNodeCategoryChain(categoryIds: string[]): NodeCategory[] {
  const rootCategories = categoryIds
    .map((id) => nodeCategoryMap.get(id))
    .filter(isTruthy)
  if (rootCategories.length < categoryIds.length) {
    throw new Error(
      `Unknown category(s): ${categoryIds.filter(
        (id) => !nodeCategoryMap.has(id)
      )}`
    )
  }

  const remaining = [...rootCategories]
  const visited = [...rootCategories]
  while (remaining.length > 0) {
    const current = remaining.pop()!
    for (const composeId of current.composeIds) {
      const compose = nodeCategoryMap.get(composeId)
      if (!compose) {
        throw new Error(`Unknown category: ${composeId} from ${categoryIds}`)
      }
      if (!visited.includes(compose)) {
        remaining.push(compose)
        visited.push(compose)
      }
    }
  }
  return visited
}
