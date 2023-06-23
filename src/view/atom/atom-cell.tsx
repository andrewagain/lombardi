/* eslint-disable @typescript-eslint/no-explicit-any */
import { format } from "date-fns"
import { Atom, useAtomValue } from "jotai"
import React, { useCallback, useMemo, useRef, useState } from "react"
import { BsX } from "react-icons/bs"
import { LightAsync as SyntaxHighlighter } from "react-syntax-highlighter"
import json from "react-syntax-highlighter/dist/esm/languages/hljs/json"
import agate from "react-syntax-highlighter/dist/esm/styles/hljs/agate"

import styles from "./atom-cell.module.css"

const log = console.log

log("SyntaxHighlighter", SyntaxHighlighter.registerLanguage("json", json))

type FormatType = "time" | "timerange" | null

function defaultFormat(value: any) {
  try {
    return format(value, "yyyy MMM d, hh:mm:ss a")
  } catch (err) {
    return `format(${value}) error:${err}`
  }
}

function formatValue(value: any, formatType?: FormatType): string {
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
    return JSON.stringify([...value.entries()], null, 2)
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
    return JSON.stringify(value, null, 2)
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

  const formattedValue = useMemo(
    () => formatValue(value, formatType),
    [formatType, value]
  )

  return (
    <React.Fragment>
      <div className={styles.atomCellContainer}>
        <button onClick={remove}>
          <BsX size={10} />
        </button>
        <span className={styles.label}>{label}</span>
      </div>
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
