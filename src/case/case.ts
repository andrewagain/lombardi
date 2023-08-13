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

export enum CaseSourceType {
  Case = "case",
  Article = "article",
  Book = "book",
  Video = "video",
  Audio = "audio",
  Image = "image",
  Other = "other",
}

// Source document on which a support item relies.
export interface CaseSource {
  id: string
  url: string
  type: CaseSourceType
  externalId: string
}

// A point in support of the case being made.
export interface CaseSupportPoint {
  id: string
  title: string
  text: string
}

// An argument or point that a user is making.
export interface Case {
  id: string
  title: string
  text: string
  clarification: CaseClarification
  supportPoints: CaseSupportPoint[]
  conclusion: string // describes why the supporting points tie the case together
}

export enum CaseReviewPointType {
  MinorError = "MinorError", // typo, grammar, etc.
  UnclearCase = "UnclearCase", // reader does not understand what point the author is attempting to make here, and/or clarifying section is not helpful
  UnsupportedCase = "UnsupportedCase", // reader may agree with all supporting items, does not believe they are sufficient to make the case
  SupportPointConnection = "SupportPointConnection", // reader might agree with the support point, but believes it is not supportive of the case (supportPointId will be set)
  SourceConnection = "SourceConnection", // reader might agree with the statements of the source, but does not believe it is a good reference for the supporting point (sourceId will be set)
  IncorrectSource = "IncorrectSource", // reader believes this source is providing inaccurate information (sourceId will be set)
}

export interface CaseReviewPoint {
  type: CaseReviewPointType
  text: string
  supportPointId?: string
  sourceId?: string
}

// A response that user provides to a case they are reviewing.
export interface CaseReview {
  agree: boolean
  // disagreement requires at least one case point be added
  points: CaseReviewPoint[]
}
