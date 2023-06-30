import {
  NodeCategory,
  NodePropertyName,
  NodePropertyType,
} from "../graph-types"
type ShorthandNodeProperty = [NodePropertyName, NodePropertyType]

interface ShorthandNodeCategory {
  name: string
  properties?: ShorthandNodeProperty[]
  subcategories?: ShorthandNodeCategory[]
}

function expandShorthand(
  shorthandNodeCategory: ShorthandNodeCategory
): NodeCategory {
  const { name, properties = [], subcategories = [] } = shorthandNodeCategory
  return {
    name,
    properties: properties.map(([name, type]) => ({ name, type })),
    subcategories: subcategories.map(expandShorthand),
  }
}

const shorthandNodeCategories: ShorthandNodeCategory[] = [
  {
    name: "Organism",
    properties: [
      ["birthday", "datetime"],
      ["species", "string"],
    ],
    subcategories: [
      {
        name: "Human",
        properties: [["title", "string"]],
      },
      {
        name: "Animal",
      },
      {
        name: "Plant",
      },
    ],
  },
  {
    name: "Institution",
    properties: [["location", "string"]],
    subcategories: [
      {
        name: "Corporation",
      },
      {
        name: "Government",
      },
      {
        name: "Nonprofit",
      },
      {
        name: "University",
      },
      {
        name: "School",
      },
      {
        name: "Hospital",
      },
      {
        name: "Religious",
      },
      {
        name: "Sports",
      },
    ],
  },
  {
    name: "Logic",
    properties: [],
    subcategories: [
      {
        name: "Claim",
      },
      {
        name: "Question",
      },
      {
        name: "Answer",
      },
      {
        name: "Assumption",
      },
      {
        name: "Conclusion",
      },
    ],
  },
  {
    name: "Source",
    properties: [["url", "string"]],
    subcategories: [
      {
        name: "Video",
      },
      {
        name: "Study",
      },
      {
        name: "Website",
      },
      {
        name: "Book",
      },
      {
        name: "Podcast",
      },
    ],
  },
]

export const nodeCategories = shorthandNodeCategories.map(expandShorthand)
