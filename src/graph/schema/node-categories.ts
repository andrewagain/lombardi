/* eslint-disable @typescript-eslint/no-non-null-assertion */
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
    properties: [{ name: "location", type: "string" }],
    composeIds: [],
    isAbstract: true,
  },
  {
    id: "corporation",
    name: "Corporation",
    properties: [],
    composeIds: ["institution"],
  },
  {
    id: "government",
    name: "Government",
    properties: [],
    composeIds: ["institution"],
    isAbstract: true,
  },
  {
    id: "federal",
    name: "Federal",
    properties: [],
    composeIds: ["government"],
  },
  {
    id: "state",
    name: "State",
    properties: [],
    composeIds: ["government"],
  },
  {
    id: "local",
    name: "Local",
    properties: [],
    composeIds: ["government"],
  },
  {
    id: "nonprofit",
    name: "Nonprofit",
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
]

export const nodeCategoryMap = new Map(
  nodeCategories.map((category) => [category.id, category])
)

export function getNodeCategoryChain(categoryId: string): NodeCategory[] {
  const category = nodeCategoryMap.get(categoryId)
  if (!category) {
    throw new Error(`Unknown category: ${categoryId}`)
  }
  const remaining = [category]
  const visited = [category]
  while (remaining.length > 0) {
    const current = remaining.pop()!
    for (const composeId of current.composeIds) {
      const compose = nodeCategoryMap.get(composeId)
      if (!compose) {
        throw new Error(`Unknown category: ${composeId} in ${categoryId}`)
      }
      if (!visited.includes(compose)) {
        remaining.push(compose)
        visited.push(compose)
      }
    }
  }
  return visited
}
