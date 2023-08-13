// Definition for a word used in the case title, description, or supporting items.
export interface CaseTerm {
  name: string
  definition: string
}

// Set of details that clarify the case being made, for the user to review prior to reading the supporting items.
export interface CaseClarification {
  overview: string
  antiCases: string[]
  terms: CaseTerm[]
}

// Source document on which a support item relies.
export interface CaseSource {
  id: string
  url: string
}

// A point in support of the case being made.
export interface CaseSupportPoint {
  id: string
  title: string
  text: string
}

export interface Case {
  id: string
  title: string
  text: string
  clarification: CaseClarification
  supportPoints: CaseSupportPoint[]
  conclusion: string // describes why the supporting points tie the case together
}
