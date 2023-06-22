import { format } from "date-fns"
import { Atom, useAtomValue } from "jotai"
import React, { useCallback, useMemo, useRef, useState } from "react"
import { BsX } from "react-icons/bs"

const log = console.log

type FormatType = "time" | "timerange" | null

function defaultFormat(value: any) {
  try {
    return format(value, "yyyy MMM d, hh:mm:ss a")
  } catch (err) {
    return `format(${value}) error:${err}`
  }
}

type PrismMainType = typeof import("prismjs")

async function importPrism(): Promise<PrismMainType> {
  import("prismjs/themes/prism-tomorrow.css")
  const p = await (await import("prismjs")).default
  const loadLanguages = await import("prismjs/components/")
  loadLanguages.default(["json"])
  return p
}

let prismImport: PrismMainType | null = null
let prismPromise: Promise<PrismMainType> | null = null
function getPrismImport() {
  if (prismImport) {
    return prismImport
  }
  if (prismPromise) {
    // console.log("Prism import in progress. Refusing to double-import");
    return null
  }
  log("Import prism: start")
  prismPromise = importPrism()
  prismPromise.then((p) => {
    log("Import prism: finish")
    prismImport = p
  })
}

const IDENTITY_FUNCTION = (x: string) => x

function getHighlightFunction(highlighted: boolean) {
  const p = getPrismImport()
  if (!p || !highlighted) {
    return IDENTITY_FUNCTION
  }
  return (json: string) => {
    return `<code class="language-json">${p.highlight(
      json,
      p.languages.json,
      "json"
    )}</code>`
  }
}

function formatValue(
  value: any,
  formatType?: FormatType,
  expanded = false,
  highlighted = false
) {
  const jsonSpaces = expanded ? 2 : 0
  const highlightFunction = getHighlightFunction(highlighted)

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
    return highlightFunction(
      JSON.stringify([...value.entries()], null, jsonSpaces)
    )
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
    return value
  }
  if (typeof value === "object") {
    return highlightFunction(JSON.stringify(value, null, jsonSpaces))
  }
  if (!value) {
    return "<unknown falsey>"
  }
  return value
}

export function AtomCell({
  label,
  atomConfig,
  formatType,
  onRemove,
}: {
  label: string
  atomConfig: Atom<any>
  formatType?: FormatType
  onRemove: (label: string) => void
}) {
  const valueElementRef = useRef<HTMLDivElement | null>(null)
  const value = useAtomValue(atomConfig)

  // collapse/expand logic
  const [expanded, setExpanded] = useState(false)
  const toggleExpanded = useCallback(() => {
    setExpanded((x) => !x)
  }, [])

  // json formatting
  const highlightable = useMemo(() => {
    if (formatType || !value) {
      return false
    }
    return value instanceof Map || typeof value === "object"
  }, [formatType, value])
  const [highlighted, setHighlighted] = useState(false)
  const toggleHighlighted = useCallback(() => {
    setHighlighted((x) => !x)
  }, [])

  const onCopy = useCallback(() => {
    const section = valueElementRef.current
    if (section) {
      const range = document.createRange()
      range.selectNode(section)
      const selection = window.getSelection()
      if (selection) {
        selection.removeAllRanges()
        selection.addRange(range)
        document.execCommand("copy")
        setTimeout(() => {
          selection.removeAllRanges()
        }, 200)
      }
    }
  }, [])

  const onVariable = useCallback(() => {
    const varName = label.replace(/\W/g, "_")
    window[varName as any] = value
    alert(`Set window.${varName}`)
  }, [label, value])

  const remove = useCallback(() => {
    onRemove(label)
  }, [label, onRemove])

  return (
    <React.Fragment>
      <div
        css={{
          position: "relative",
          "& button": {
            padding: 0,
            position: "absolute",
            display: "none",
            backgroundColor: "black",
            width: 16,
            height: 16,
            borderRadius: 2,
            alignItems: "center",
            justifyContent: "center",
          },
          "& button:hover": {
            backgroundColor: "#222",
          },
          "&:hover button": {
            display: "flex",
          },
        }}
      >
        <button onClick={remove}>
          <BsX size={10} />
        </button>
        <span css={{ color: colors.gray[400] }}>{label}</span>
      </div>
      <div
        css={{
          minWidth: 0,
          display: "flex",
          alignItems: "flex-start",
          position: "relative",
          backgroundColor: colors.blue[900],

          "&:not([data-expanded])": {
            overflow: "hidden",
            whiteSpace: "nowrap",
          },

          "&[data-expanded]": {
            wordWrap: "break-word",
            wordBreak: "break-all",
            whiteSpace: "pre-wrap",
            maxHeight: 300,
            overflowY: "scroll",
            border: `1px solid ${colors.cyan[400]}`,
            padding: "20px 4px 10px 4px",
          },
        }}
        data-expanded={expanded ? true : undefined}
      >
        <div
          css={{
            flex: "1 1 auto",
            overflow: "hidden",
          }}
          dangerouslySetInnerHTML={{
            __html: formatValue(value, formatType, expanded, highlighted),
          }}
          ref={valueElementRef}
        />
        <nav
          css={{
            flex: "0 0 auto",
            userSelect: "none",

            "&[data-expanded]": {
              position: "absolute",
              right: 0,
              top: 0,

              "& > div": {
                position: "sticky",
              },
            },

            "& > div": {
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
            },

            "& > div > button": {
              color: colors.cyan[400],
              height: 20,
            },
            "& > div > button:hover": {
              backgroundColor: colors.blue[800],
              borderRadius: 1,
            },
          }}
          data-expanded={expanded ? true : undefined}
        >
          <div>
            {expanded && (
              <React.Fragment>
                <button onClick={onCopy}>Copy</button>
                <button onClick={onVariable}>Var</button>
                {highlightable && (
                  <label
                    css={{
                      display: "flex",
                      alignItems: "center",
                      color: colors.cyan[200],
                      cursor: "pointer",

                      "&:hover": {
                        backgroundColor: colors.blue[800],
                        borderRadius: 1,
                      },
                    }}
                  >
                    <input
                      checked={highlighted}
                      onChange={toggleHighlighted}
                      type="checkbox"
                    />
                    Color
                  </label>
                )}
              </React.Fragment>
            )}
            <button
              css={{
                width: 30,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "width 0.2s",

                "&[data-expanded]": {
                  width: 50,
                },
                "& > div": {
                  transition: "transform 0.2s",
                  width: 0,
                  height: 0,
                  borderTop: "6px solid transparent",
                  borderBottom: "6px solid transparent",
                  borderRight: `6px solid ${colors.blue[400]}`,
                },
                "&[data-expanded] > div": {
                  transform: "rotate(-90deg)",
                },
              }}
              data-expanded={expanded ? true : undefined}
              onClick={toggleExpanded}
            >
              <div />
            </button>
          </div>
        </nav>
      </div>
    </React.Fragment>
  )
}
