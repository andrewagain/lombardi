import { Box } from "@chakra-ui/react"
import { useAtomValue } from "jotai"
import React, { useCallback, useMemo, useRef, useState } from "react"
import { BsX } from "react-icons/bs"
import { LightAsync as SyntaxHighlighter } from "react-syntax-highlighter"
import agate from "react-syntax-highlighter/dist/esm/styles/hljs/agate"

import colors from "@/app/theme/colors"

import { CategorizedAtom, getCategorizedAtomKey } from "../atom-util"
import { formatAtomValue } from "./format-atom-value"

//             label={ca.atom.debugLabel || ""}

export function AtomCell({
  categorizedAtom,
  onRemove,
}: {
  categorizedAtom: CategorizedAtom
  onRemove: (key: string) => void
}) {
  const valueElementRef = useRef<HTMLDivElement | null>(null)
  const value = useAtomValue(categorizedAtom.atom)

  // collapse/expand logic
  const [expanded, setExpanded] = useState(false)
  const toggleExpanded = useCallback(() => {
    setExpanded((x) => !x)
  }, [])

  // json formatting
  const highlightable = useMemo(() => {
    if (!value) {
      return false
    }
    return (
      value instanceof Map || value instanceof Set || typeof value === "object"
    )
  }, [value])
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
    const varName =
      categorizedAtom.atom.debugLabel?.replace(/\W/g, "_") || "atom_var"
    window[varName as any] = value
    alert(`window.${varName} has been set`)
  }, [categorizedAtom, value])

  const remove = useCallback(() => {
    onRemove(getCategorizedAtomKey(categorizedAtom))
  }, [categorizedAtom, onRemove])

  const formattedValue = useMemo(
    () => formatAtomValue(value, undefined, expanded),
    [value, expanded]
  )

  return (
    <React.Fragment>
      <Box
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
        <Box css={{ color: colors.gray[400], display: "inline" }}>
          {categorizedAtom.atom.debugLabel || "n/a"}
        </Box>
      </Box>
      <Box
        css={{
          minWidth: 0,
          display: "flex",
          alignItems: "flex-start",
          position: "relative",
          backgroundColor: colors.blue[900],

          "&:not([data-expanded])": {
            maxHeight: 60,
            overflow: "hidden",
            whiteSpace: "nowrap",
          },

          "&[data-expanded]": {
            maxHeight: 300,
            wordWrap: "break-word",
            wordBreak: "break-all",
            whiteSpace: "pre-wrap",
            overflowY: "scroll",
            border: `1px solid ${colors.cyan[400]}`,
            padding: "20px 4px 10px 4px",
          },
        }}
        data-expanded={expanded ? true : undefined}
      >
        <Box
          ref={valueElementRef}
          css={{
            flex: "1 1 auto",
            overflow: "hidden",
          }}
        >
          {highlighted ? (
            <SyntaxHighlighter language="json" style={agate}>
              {formattedValue}
            </SyntaxHighlighter>
          ) : (
            formattedValue
          )}
        </Box>
        <Box
          as="nav"
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
                  <Box
                    as="label"
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
                  </Box>
                )}
              </React.Fragment>
            )}
            <Box
              as="button"
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
            </Box>
          </div>
        </Box>
      </Box>
    </React.Fragment>
  )
}
