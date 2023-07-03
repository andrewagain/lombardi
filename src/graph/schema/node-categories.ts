/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { isTruthy } from "@/util/function"

import { NodeCategory } from "../graph-types"

export const nodeCategories: NodeCategory[] = [
  {
    id: "organism",
    name: "Organism",
    properties: [
      { name: "birthday", type: "datetime" },
      { name: "species", type: "string" },
    ],
    composeIds: [],
    isAbstract: true,
  },
  {
    id: "animal",
    name: "Animal",
    properties: [],
    composeIds: ["organism"],
  },
  {
    id: "human",
    name: "Human",
    properties: [{ name: "title", type: "string" }],
    composeIds: ["animal"],
  },
  {
    id: "plant",
    name: "Plant",
    properties: [],
    composeIds: ["organism"],
  },
  {
    id: "institution",
    name: "Institution",
    aliases: ["Organization"],
    properties: [{ name: "location", type: "string" }],
    composeIds: [],
    isAbstract: true,
  },
  {
    id: "corporation",
    name: "Corporation",
    aliases: ["Company"],
    properties: [],
    composeIds: ["institution"],
  },
  {
    id: "government",
    name: "Government Institution",
    properties: [],
    composeIds: ["institution"],
    isAbstract: true,
  },
  {
    id: "federal-agency",
    name: "Federal Agency",
    properties: [],
    composeIds: ["government"],
  },
  {
    id: "state-agency",
    name: "State Agency",
    properties: [],
    composeIds: ["government"],
  },
  {
    id: "local-agency",
    name: "Local Agency",
    properties: [],
    composeIds: ["government"],
  },
  {
    id: "nonprofit",
    name: "Nonprofit Organization",
    properties: [],
    composeIds: ["institution"],
  },
  {
    id: "university",
    name: "University",
    properties: [],
    composeIds: ["institution"],
  },
  {
    id: "school",
    name: "School",
    properties: [],
    composeIds: ["institution"],
  },
  {
    id: "hospital",
    name: "Hospital",
    properties: [],
    composeIds: ["institution"],
  },
  {
    id: "religious-institution",
    name: "Religious",
    properties: [],
    composeIds: ["institution"],
    isAbstract: true,
  },
  {
    id: "church",
    name: "Church",
    properties: [],
    composeIds: ["religious-institution"],
  },
  {
    id: "logic",
    name: "Logic",
    properties: [],
    composeIds: [],
    isAbstract: true,
  },
  {
    id: "claim",
    name: "Claim",
    properties: [],
    composeIds: ["logic"],
  },
  {
    id: "question",
    name: "Question",
    properties: [],
    composeIds: ["logic"],
  },
  {
    id: "answer",
    name: "Answer",
    properties: [],
    composeIds: ["logic"],
  },
  {
    id: "assumption",
    name: "Assumption",
    properties: [],
    composeIds: ["logic"],
  },
  {
    id: "conclusion",
    name: "Conclusion",
    properties: [],
    composeIds: ["logic"],
  },
  {
    id: "source",
    name: "Source",
    properties: [{ name: "url", type: "url[]" }],
    composeIds: [],
    isAbstract: true,
  },
  {
    id: "scientific-study",
    name: "Scientific Study",
    aliases: ["Paper"],
    properties: [
      { name: "authors", type: "string[]" },
      { name: "doi", type: "string" },
    ],
    composeIds: ["source"],
  },
  {
    id: "book",
    name: "Book",
    properties: [
      { name: "author", type: "string" },
      { name: "isbn", type: "string" },
    ],
    composeIds: ["source"],
  },
  {
    id: "article",
    name: "Article",
    properties: [{ name: "author", type: "string" }],
    composeIds: ["source"],
  },
  {
    id: "podcast",
    name: "Podcast",
    properties: [],
    composeIds: ["source"],
  },
  {
    id: "website",
    name: "Website",
    properties: [],
    composeIds: ["source"],
  },
  {
    id: "video",
    name: "Video",
    properties: [],
    composeIds: ["source"],
  },
  {
    id: "image",
    name: "Image",
    properties: [],
    composeIds: ["source"],
  },
  {
    id: "audio",
    name: "Audio",
    properties: [],
    composeIds: ["source"],
  },
  {
    id: "document",
    name: "Document",
    properties: [],
    composeIds: ["source"],
  },
  {
    id: "data",
    name: "Data",
    properties: [],
    composeIds: ["source"],
  },
  {
    id: "dataset",
    name: "Dataset",
    properties: [],
    composeIds: ["source"],
  },

  {
    id: "event",
    name: "Event",
    properties: [{ name: "date", type: "datetime" }],
    composeIds: [],
    isAbstract: true,
  },
  {
    id: "natural-disaster",
    name: "Natural Disaster",
    properties: [],
    composeIds: ["event"],
  },
  {
    id: "earthquake",
    name: "Earthquake",
    properties: [],
    composeIds: ["natural-disaster"],
  },
  {
    id: "conference",
    name: "Conference",
    properties: [],
    composeIds: ["event"],
  },
]

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
