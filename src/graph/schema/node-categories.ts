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
    id: "Organism",
    properties: [
      ["birthday", "datetime"],
      ["species", "string"],
    ],
    subcategories: [
      {
        id: "Human",
        properties: [["title", "string"]],
      },
      {
        id: "Animal",
      },
      {
        id: "Plant",
      },
    ],
  },
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
      {
        id: "University",
      },
      {
        id: "School",
      },
      {
        id: "Hospital",
      },
      {
        id: "Religious",
      },
      {
        id: "Sports",
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
      {
        id: "Question",
      },
      {
        id: "Answer",
      },
      {
        id: "Assumption",
      },
      {
        id: "Conclusion",
      },
    ],
  },
  {
    id: "Source",
    properties: [["url", "string"]],
    subcategories: [
      {
        id: "Video",
      },
      {
        id: "Study",
      },
      {
        id: "Website",
      },
      {
        id: "Book",
      },
      {
        id: "Podcast",
      },
    ],
  },
]

export const nodeCategories = shorthandNodeCategories.map(expandShorthand)

export const nodeCategoryMap = new Map(
  nodeCategories.map((category) => [category.id, category])
)
