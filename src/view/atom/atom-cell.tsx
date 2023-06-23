import { Box } from "@chakra-ui/react"
import { Atom, useAtomValue } from "jotai"
import React, { useCallback, useMemo, useRef, useState } from "react"
import { BsX } from "react-icons/bs"
import { LightAsync as SyntaxHighlighter } from "react-syntax-highlighter"
import agate from "react-syntax-highlighter/dist/esm/styles/hljs/agate"

import styles from "./atom-cell.module.css"
import { formatAtomValue, FormatType } from "./format-atom-value"

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

  const formattedValue = useMemo(
    () => formatAtomValue(value, formatType),
    [formatType, value]
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
        <span className={styles.label}>{label}</span>
      </Box>
      <div
        className={styles.cellContent}
        data-expanded={expanded ? true : undefined}
      >
        <div className={styles.cellInner} ref={valueElementRef}>
          {highlighted ? (
            <SyntaxHighlighter language="json" style={agate}>
              {formattedValue}
            </SyntaxHighlighter>
          ) : (
            formattedValue
          )}
        </div>
        <nav
          className={styles.cellNav}
          data-expanded={expanded ? true : undefined}
        >
          <div>
            {expanded && (
              <React.Fragment>
                <button onClick={onCopy}>Copy</button>
                <button onClick={onVariable}>Var</button>
                {highlightable && (
                  <label className={styles.checkboxLabel}>
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
              className={styles.expandButton}
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
