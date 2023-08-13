import { Box } from "@chakra-ui/react"
import { useAtom } from "jotai"
import { useCallback, useEffect, useMemo } from "react"
import { LightAsync as SyntaxHighlighter } from "react-syntax-highlighter"
import json from "react-syntax-highlighter/dist/esm/languages/hljs/json"

import { isTruthy } from "@/util/function"

import { selectedAtomKeysAtom } from "../atom-atoms"
import {
  AtomSet,
  CategorizedAtom,
  getCategorizedAtomKey,
  getCategorizedAtomMap,
} from "../atom-util"
import { AtomCell } from "./atom-value-row"

export function AtomValueList({ atomSets }: { atomSets: AtomSet[] }) {
  const [selectedKeys, setSelectedKeys] = useAtom(selectedAtomKeysAtom)
  const categorizedAtomMap = useMemo(
    () => getCategorizedAtomMap(atomSets),
    [atomSets]
  )

  const selectedAtoms: CategorizedAtom[] = useMemo(
    () =>
      selectedKeys.map((key) => categorizedAtomMap.get(key)).filter(isTruthy),
    [selectedKeys, categorizedAtomMap]
  )

  const removeCell = useCallback(
    (key: string) => {
      console.log("removing key:", key)
      setSelectedKeys((prev) => prev.filter((x) => x !== key))
    },
    [setSelectedKeys]
  )

  useEffect(() => {
    SyntaxHighlighter.registerLanguage("json", json)
  }, [])

  return (
    <Box
      css={{
        overflow: "hidden",
        whiteSpace: "normal",
        width: "100%",
      }}
    >
      <Box
        css={{
          flex: "0 0 auto",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {selectedAtoms.map((ca) => (
          <AtomCell
            categorizedAtom={ca}
            key={getCategorizedAtomKey(ca)}
            onRemove={removeCell}
          />
        ))}
      </Box>
    </Box>
  )
}
