import {
  NodeCategory,
  NodePropertyName,
  NodePropertyType,
} from "../graph-types"
type ShorthandNodeProperty = [NodePropertyName, NodePropertyType]

export interface NodeCategoryIdParts {
  parents: string[]
  name: string
}

export function parseNodeCategoryId(id: string): NodeCategoryIdParts {
  const parts = id.split("/")
  return {
    parents: parts.slice(0, -1),
    name: parts[parts.length - 1],
  }
}

interface ShorthandNodeCategory {
  id: string
  properties?: ShorthandNodeProperty[]
  subcategories?: ShorthandNodeCategory[]
}

function expandShorthand(
  shorthandNodeCategories: ShorthandNodeCategory[]
): NodeCategory[] {
  const shorthandCategories = [...shorthandNodeCategories]
  const longhandCategories: NodeCategory[] = []
  while (shorthandCategories.length > 0) {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const s = shorthandCategories.pop()!
    longhandCategories.push({
      id: s.id,
      properties: (s.properties || []).map(([name, type]) => ({ name, type })),
    })
    shorthandCategories.push(...(s.subcategories || []))
  }

  return longhandCategories
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

export const nodeCategories = expandShorthand(shorthandNodeCategories)

export const nodeCategoryMap = new Map(
  nodeCategories.map((category) => [category.id, category])
)
