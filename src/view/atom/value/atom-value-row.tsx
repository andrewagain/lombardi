import { Box, Button, Checkbox } from "@chakra-ui/react"
import { useAtomValue } from "jotai"
import React, { useCallback, useMemo, useRef, useState } from "react"
import { BsX } from "react-icons/bs"
import { HiVariable } from "react-icons/hi"
import { MdExpandLess, MdExpandMore } from "react-icons/md"
import {
  PiClipboardTextDuotone,
  PiHighlighterCircle,
  PiHighlighterCircleDuotone,
} from "react-icons/pi"
import { LightAsync as SyntaxHighlighter } from "react-syntax-highlighter"
import agate from "react-syntax-highlighter/dist/esm/styles/hljs/agate"

import colors from "@/app/theme/colors"
import ToggleIconButton from "@/util/component/toggle-icon-button"

import { CategorizedAtom, getCategorizedAtomKey } from "../atom-util"
import { formatAtomValue } from "./format-atom-value"

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

  const syntaxHighlightable = useMemo(
    () =>
      value &&
      (value instanceof Map ||
        value instanceof Set ||
        typeof value === "object"),
    [value]
  )

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

  const onSetGlobalVariable = useCallback(() => {
    const varName =
      categorizedAtom.atom.debugLabel?.replace(/\W/g, "_") || "atom_var"
    window[varName as any] = value
    const msg = `window.${varName} has been set`
    console.log(msg, value)
    alert(msg)
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
      <Box>
        <Button onClick={remove} aria-label="Remove">
          <BsX size={10} />
        </Button>
        <Button onClick={onCopy} aria-label="Copy to Clipboard">
          <PiClipboardTextDuotone />
        </Button>
        <Button
          onClick={onSetGlobalVariable}
          aria-label="Assign Value to Global Variable"
        >
          <HiVariable />
        </Button>
        <Box css={{ color: colors.gray[400], display: "inline" }}>
          {categorizedAtom.atom.debugLabel || "n/a"}
        </Box>
        {syntaxHighlightable && (
          <ToggleIconButton
            aria-label="Toggle Syntax Highlighting"
            on={highlighted}
            OnIcon={PiHighlighterCircleDuotone}
            OffIcon={PiHighlighterCircle}
            onClick={toggleHighlighted}
          />
        )}
        <ToggleIconButton
          aria-label="Expand/Collapse"
          on={expanded}
          OnIcon={MdExpandLess}
          OffIcon={MdExpandMore}
          onClick={toggleExpanded}
        />
      </Box>
      <Box ref={valueElementRef} whiteSpace={expanded ? "normal" : "nowrap"}>
        {highlighted ? (
          <SyntaxHighlighter language="json" style={agate}>
            {formattedValue}
          </SyntaxHighlighter>
        ) : (
          formattedValue
        )}
      </Box>
    </React.Fragment>
  )
}
