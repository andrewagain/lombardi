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

export function serializeNodeCategoryId(
  parents: string[],
  name: string
): string {
  return [...parents, name].join("/")
}

interface ShorthandNodeCategory {
  id: string
  properties?: ShorthandNodeProperty[]
  subcategories?: ShorthandNodeCategory[]
}

// category, parentIds, parentProperties
type StackItem = [ShorthandNodeCategory, string[], ShorthandNodeProperty[]]

function expandShorthand(
  shorthandNodeCategories: ShorthandNodeCategory[]
): NodeCategory[] {
  const stack: StackItem[] = shorthandNodeCategories.map((x) => [x, [], []])

  const longhandCategories: NodeCategory[] = []
  while (stack.length > 0) {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const [category, parentIds, parentProperties] = stack.pop()!
    const combinedProperties = [
      ...(category.properties || []),
      ...parentProperties,
    ]
    longhandCategories.push({
      id: serializeNodeCategoryId(parentIds, category.id),
      properties: combinedProperties.map(([name, type]) => ({
        name,
        type,
      })),
    })
    stack.push(
      ...(category.subcategories?.map(
        (x) => [x, [...parentIds, category.id], combinedProperties] as StackItem
      ) || [])
    )
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
    properties: [
      ["url", "string"],
      ["author", "string"],
    ],
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
        properties: [["ISBN", "string"]],
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
