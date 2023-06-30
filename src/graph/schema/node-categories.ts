import {
  NodeCategory,
  NodePropertyName,
  NodePropertyType,
} from "../graph-types"
type ShorthandNodeProperty = [NodePropertyName, NodePropertyType]

interface ShorthandNodeCategory {
  id: string
  properties?: ShorthandNodeProperty[]
  subcategories?: ShorthandNodeCategory[]
}

function expandShorthand(
  shorthandNodeCategory: ShorthandNodeCategory
): NodeCategory {
  const { id, properties = [], subcategories = [] } = shorthandNodeCategory
  return {
    id,
    properties: properties.map(([name, type]) => ({ name, type })),
    subcategories: subcategories.map(expandShorthand),
  }
}

const shorthandNodeCategories: ShorthandNodeCategory[] = [
  {
    id: "Institution",
    properties: [["location", "string"]],
    subcategories: [
      {
        id: "Corporation",
      },
      {
        id: "Government",
        subcategories: [
          {
            id: "Federal",
          },
          {
            id: "State",
          },
          {
            id: "Local",
          },
        ],
      },
      {
        id: "Nonprofit",
      },
    ],
  },
  {
    id: "Logic",
    properties: [],
    subcategories: [
      {
        id: "Claim",
      },
    ],
  },
]

export const nodeCategories = shorthandNodeCategories.map(expandShorthand)

export const nodeCategoryMap = new Map(
  nodeCategories.map((category) => [category.id, category])
)
