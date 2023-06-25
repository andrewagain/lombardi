import { Box, Checkbox } from "@chakra-ui/react"
import { useAtom } from "jotai"
import { useCallback } from "react"

import { toggleArrayInclusion } from "@/util/datastructure/array"

import { selectedAtomKeysAtom } from "../atom-atoms"
import { CategorizedAtom, getCategorizedAtomKey } from "../atom-util"

export default function AtomCheckbox({
  categorizedAtom,
}: {
  categorizedAtom: CategorizedAtom
}) {
  const key = getCategorizedAtomKey(categorizedAtom)
  const title = categorizedAtom.atom.debugLabel || ""
  const [selectedKeys, setSelectedKeys] = useAtom(selectedAtomKeysAtom)
  const isSelected = selectedKeys.includes(key)

  const toggle = useCallback(() => {
    setSelectedKeys((prev) => toggleArrayInclusion(prev, key))
  }, [setSelectedKeys, key])

  return (
    <Box>
      <Checkbox isChecked={isSelected} onChange={toggle}>
        {title}
      </Checkbox>
    </Box>
  )
}
