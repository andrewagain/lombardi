import { NodeCategory } from "../graph-types"
type ShorthandNodeCategory = [string | undefined, string, string[]]

export function toNodeCategories(
  shorthand: ShorthandNodeCategory[]
): NodeCategory[] {
  return shorthand.map(([parent, name, properties]) => ({
    parent,
    name,
    properties,
  }))
}

export const nodeCategories: ShorthandNodeCategory[] = [
  ["", "Organism", ["birthday", "species"]],
  ["Organism", "Human", ["job"]],
  ["Organism", "Animal", []],
  ["Organism", "Plant", []],
  ["", "Institution", ["location"]],
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
  ["", "Source", ["url"]],
  ["Source", "Video", []],
  ["Source", "Study", []],
  ["Source", "Website", []],
  ["Source", "Book", []],
  ["Source", "Podcast", []],
]
