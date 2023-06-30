import { NodeCategory, NodePropertyType } from "../graph-types"
type ShorthandNodePropertyType = [string, NodePropertyType]
type ShorthandNodeCategory = [
  string | undefined,
  string,
  ShorthandNodePropertyType[]
]
const shorthandNodeCategories: ShorthandNodeCategory[] = [
  [
    "",
    "Organism",
    [
      ["birthday", "datetime"],
      ["species", "string"],
    ],
  ],
  ["Organism", "Human", [["title", "string"]]],
  ["Organism", "Animal", []],
  ["Organism", "Plant", []],
  ["", "Institution", [["location", "string"]]],
  ["Institution", "Corporation", []],
  ["Institution", "Government", []],
  ["Institution", "Nonprofit", []],
  ["Institution", "University", []],
  ["Institution", "School", []],
  ["Institution", "Hospital", []],
  ["Institution", "Religious", []],
  ["Institution", "Sports", []],
  ["", "Logic", []],
  ["Logic", "Claim", []],
  ["Logic", "Question", []],
  ["Logic", "Answer", []],
  ["Logic", "Premise", []],
  ["Logic", "Conclusion", []],
  ["", "Source", [["url", "string"]]],
  ["Source", "Video", []],
  ["Source", "Study", []],
  ["Source", "Website", []],
  ["Source", "Book", []],
  ["Source", "Podcast", []],
]

export function toNodeCategories(
  shorthand: ShorthandNodeCategory[]
): NodeCategory[] {
  return shorthand.map(([parent, name, properties]) => ({
    parent,
    name,
    properties: properties.map(([name, type]) => ({ name, type })),
  }))
}

export const nodeCategories = toNodeCategories(shorthandNodeCategories)
