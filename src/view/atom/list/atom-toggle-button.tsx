import { useAtom } from "jotai"
import { useCallback } from "react"

import { selectedAtomKeysAtom } from "../atom-atoms"
import { CategorizedAtom, getCategorizedAtomKey } from "../atom-util"

export default function AtomToggleButton({
  categorizedAtom,
}: {
  categorizedAtom: CategorizedAtom
}) {
  const key = getCategorizedAtomKey(categorizedAtom)
  const title = categorizedAtom.atom.debugLabel || ""
  const [selectedKeys, setSelectedKeys] = useAtom(selectedAtomKeysAtom)
  const isSelected = selectedKeys.includes(key)

  const toggle = useCallback(() => {
    if (selectedKeys.includes(title)) {
      setSelectedKeys(selectedKeys.filter((x) => x !== title))
    } else {
      setSelectedKeys([...selectedKeys, title])
    }
  }, [selectedKeys, setSelectedKeys, title])

  return (
    <button data-selected={isSelected ? true : undefined} onClick={toggle}>
      {title}
    </button>
  )
}
