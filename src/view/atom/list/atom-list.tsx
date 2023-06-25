import { Box, Heading, Input } from "@chakra-ui/react"
import { useAtom } from "jotai"
import { useCallback, useEffect, useMemo, useState } from "react"
import { LightAsync as SyntaxHighlighter } from "react-syntax-highlighter"
import json from "react-syntax-highlighter/dist/esm/languages/hljs/json"

import { isTruthy } from "@/util/function"

import { selectedAtomKeysAtom } from "../atom-atoms"
import {
  AtomSet,
  CategorizedAtom,
  getCategorizedAtomKey,
  getCategorizedAtomMap,
  getSetCategorizedAtoms,
} from "../atom-util"
import { AtomCell } from "../cell/atom-cell"
import AtomToggleButton from "./atom-toggle-button"

export function AtomList({ atomSets }: { atomSets: AtomSet[] }) {
  const [selectedKeys, setSelectedKeys] = useAtom(selectedAtomKeysAtom)
  const [filterText, setFilterText] = useState("")
  const categorizedAtomMap = useMemo(
    () => getCategorizedAtomMap(atomSets),
    [atomSets]
  )

  const selectedAtoms: CategorizedAtom[] = useMemo(
    () =>
      selectedKeys.map((key) => categorizedAtomMap.get(key)).filter(isTruthy),
    [selectedKeys, categorizedAtomMap]
  )

  const filteredSets: AtomSet[] = useMemo(() => {
    if (!filterText) {
      return atomSets
    }
    return atomSets.map((set) => ({
      ...set,
      atoms: set.atoms.filter((atom) =>
        atom.debugLabel?.toLowerCase().includes(filterText.toLowerCase())
      ),
    }))
  }, [atomSets, filterText])

  const removeCell = useCallback(
    (label: string) => {
      setSelectedKeys((prev) => prev.filter((x) => x !== label))
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
        {filteredSets.map((set) => (
          <Box>
            <Heading size="sm">{set.name}</Heading>
            <Box>
              {getSetCategorizedAtoms(set).map((ca) => (
                <AtomCell
                  atomConfig={ca.atom}
                  key={getCategorizedAtomKey(ca)}
                  label={ca.atom.debugLabel || ""}
                  onRemove={removeCell}
                />
              ))}
            </Box>
          </Box>
        ))}
      </Box>
      <Box
        css={{
          flex: "0 0 auto",
        }}
      >
        <Input
          css={{
            backgroundColor: "#0004",
            border: 0,
            color: "white",
            width: "100%",
            margin: "4px 0",
            outline: 0,
          }}
          onChange={(e) => {
            setFilterText(e.target.value)
          }}
          placeholder="Filter property keys"
          type="search"
          value={filterText}
        />
      </Box>
      <Box
        css={{
          flex: "1 1 auto",

          "> button": {
            border: "1px solid gray",
            borderRadius: 2,
            color: "white",
            margin: "0 2px 2px 0",
          },

          "> button[data-selected]": {
            borderColor: "#6fcade",
          },

          "> button:hover": {
            backgroundColor: "#fff4",
          },
        }}
      >
        {selectedAtoms.map((ca) => (
          <AtomToggleButton categorizedAtom={ca} />
        ))}
      </Box>
    </Box>
  )
}
