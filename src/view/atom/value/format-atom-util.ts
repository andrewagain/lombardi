import { format } from "date-fns"

export type FormatType = "time" | "timerange" | null

function defaultFormat(value: any) {
  try {
    return format(value, "yyyy MMM d, hh:mm:ss a")
  } catch (err) {
    return `format(${value}) error:${err}`
  }
}

export function isSyntaxHighlightable(value?: any) {
  return (
    value &&
    (value instanceof Map || value instanceof Set || typeof value === "object")
  )
}

export function formatAtomValue(
  value: any,
  formatType: FormatType | undefined,
  isExpanded: boolean
): string {
  const jsonSpaces = isExpanded ? 2 : 0

  if (value === null) {
    return "<null>"
  }
  if (typeof value === "undefined") {
    return "<undefined>"
  }
  if (typeof value === "boolean") {
    return value ? "true" : "false"
  }
  if (value instanceof Map) {
    return JSON.stringify([...value.entries()], null, jsonSpaces)
  }
  if (value instanceof Set) {
    return JSON.stringify([...value.values()], null, jsonSpaces)
  }
  if (formatType === "time" && typeof value === "number") {
    return `${defaultFormat(value)} / ${value}`
  }
  if (
    formatType === "timerange" &&
    typeof value?.start === "number" &&
    typeof value?.end === "number"
  ) {
    return `${defaultFormat(value.start)} -> ${defaultFormat(value.end)}`
  }
  if (typeof value === "number" || typeof value === "string") {
    return `${value}`
  }
  if (typeof value === "object") {
    return JSON.stringify(value, null, jsonSpaces)
  }
  if (!value) {
    return "<unknown falsey>"
  }
  return value
}
