import {
  Box,
  Button,
  Heading,
  HStack,
  IconButton,
  Spacer,
} from "@chakra-ui/react"
import { useAtomValue } from "jotai"
import { Dispatch, SetStateAction, useCallback, useMemo, useRef } from "react"
import { BsX } from "react-icons/bs"
import { HiVariable } from "react-icons/hi"
import { MdExpandLess, MdExpandMore } from "react-icons/md"
import {
  PiClipboardTextDuotone,
  PiHighlighterCircle,
  PiHighlighterCircleDuotone,
} from "react-icons/pi"

import ToggleIconButton from "@/util/component/toggle-icon-button"

import { CategorizedAtom, getCategorizedAtomKey } from "../atom-util"
import { isSyntaxHighlightable } from "./format-atom-util"

export function AtomValueToolbar({
  categorizedAtom,
  onRemove,
  expanded,
  highlighted,
  setExpanded,
  setHighlighted,
}: {
  categorizedAtom: CategorizedAtom
  onRemove: (key: string) => void
  expanded: boolean
  setExpanded: Dispatch<SetStateAction<boolean>>
  highlighted: boolean
  setHighlighted: Dispatch<SetStateAction<boolean>>
}) {
  const valueElementRef = useRef<HTMLDivElement | null>(null)
  const value = useAtomValue(categorizedAtom.atom)

  const toggleExpanded = useCallback(() => {
    setExpanded((x) => !x)
  }, [setExpanded])

  const syntaxHighlightable = useMemo(
    () => isSyntaxHighlightable(value),
    [value]
  )
  const toggleHighlighted = useCallback(() => {
    setHighlighted((x) => !x)
  }, [setHighlighted])

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
  }, [categorizedAtom, value])

  const remove = useCallback(() => {
    onRemove(getCategorizedAtomKey(categorizedAtom))
  }, [categorizedAtom, onRemove])

  return (
    <HStack position="relative">
      <Heading size="md">{categorizedAtom.atom.debugLabel || "n/a"}</Heading>
      <Spacer />
      <IconButton size="sm" onClick={onCopy} aria-label="Copy to Clipboard">
        <PiClipboardTextDuotone />
      </IconButton>
      <IconButton
        size="sm"
        onClick={onSetGlobalVariable}
        aria-label="Assign Value to Global Variable"
      >
        <HiVariable />
      </IconButton>

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

      <Box position="absolute" left={0} top={0}>
        <Button onClick={remove} aria-label="Remove">
          <BsX size={10} />
        </Button>
      </Box>
    </HStack>
  )
}
