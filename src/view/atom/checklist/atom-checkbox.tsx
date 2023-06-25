import { Box, Checkbox } from "@chakra-ui/react"
import { useAtom, useAtomValue } from "jotai"
import { useCallback } from "react"

import { toggleArrayInclusion } from "@/util/datastructure/array"

import { atomFilterTextAtom, selectedAtomKeysAtom } from "../atom-atoms"
import { CategorizedAtom, getCategorizedAtomKey } from "../atom-util"

function getHighlightedText(text: string, highlight: string) {
  if (!highlight) {
    return <span>{text}</span>
  }

  // Split on highlight term and include term into parts, ignore case
  const parts = text.split(new RegExp(`(${highlight})`, "gi"))
  return (
    <span>
      {parts.map((part, i) => (
        <span
          key={i}
          style={
            part.toLowerCase() === highlight.toLowerCase()
              ? { fontWeight: "bold" }
              : {}
          }
        >
          {part}
        </span>
      ))}
    </span>
  )
}

export default function AtomCheckbox({
  categorizedAtom,
}: {
  categorizedAtom: CategorizedAtom
}) {
  const filterText = useAtomValue(atomFilterTextAtom)

  const key = getCategorizedAtomKey(categorizedAtom)
  const title = categorizedAtom.atom.debugLabel || ""
  const [selectedKeys, setSelectedKeys] = useAtom(selectedAtomKeysAtom)
  const isSelected = selectedKeys.includes(key)

  const toggle = useCallback(() => {
    setSelectedKeys((prev) => toggleArrayInclusion(prev, key))
  }, [setSelectedKeys, key])

  return (
    <Box>
      <Checkbox
        isChecked={isSelected}
        onChange={toggle}
        textOverflow="ellipsis"
        overflow="hidden"
      >
        {getHighlightedText(title, filterText)}
      </Checkbox>
    </Box>
  )
}
