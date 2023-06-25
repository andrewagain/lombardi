import { Box, Heading, Input } from "@chakra-ui/react"
import { Atom, useAtom } from "jotai"
import { atomFamily, atomWithStorage } from "jotai/utils"
import { useCallback, useEffect, useMemo, useState } from "react"
import { LightAsync as SyntaxHighlighter } from "react-syntax-highlighter"
import json from "react-syntax-highlighter/dist/esm/languages/hljs/json"

import { isTruthy } from "@/util/function"

import { AtomCell } from "./cell/atom-cell"

type WindowParam = string

function getStateParameter(type: "open" | "rows", title: string) {
  return `nuons.${title.replace(/\s/g, "")}.${type}`
}

const selectedKeysFamily = atomFamily((param: WindowParam) =>
  atomWithStorage<string[]>(param, [])
)

function ToggleButton({ title, param }: { title: string; param: string }) {
  const [selectedKeys, setSelectedRowTitles] = useAtom(
    selectedKeysFamily(param)
  )

  const isSelected = selectedKeys.includes(title)

  const toggle = useCallback(() => {
    if (selectedKeys.includes(title)) {
      setSelectedRowTitles(selectedKeys.filter((x) => x !== title))
    } else {
      setSelectedRowTitles([...selectedKeys, title])
    }
  }, [selectedKeys, setSelectedRowTitles, title])

  return (
    <button data-selected={isSelected ? true : undefined} onClick={toggle}>
      {title}{" "}
    </button>
  )
}

export interface AtomSet {
  name: string
  atoms: Atom<any>[]
}

function getSetCategorizedAtoms(s: AtomSet): CategorizedAtom[] {
  return s.atoms.map((a) => ({
    categoryName: s.name,
    atom: a,
  }))
}

interface CategorizedAtom {
  categoryName: string
  atom: Atom<any>
}

function getCategorizedAtomKey(a: CategorizedAtom) {
  return `${a.categoryName}.${a.atom.debugLabel}`
}

function getCategorizedAtomMap(
  atomSets: AtomSet[]
): Map<string, CategorizedAtom> {
  const map = new Map<string, CategorizedAtom>()
  atomSets.forEach((set) => {
    getSetCategorizedAtoms(set).forEach((ca) => {
      map.set(getCategorizedAtomKey(ca), ca)
    })
  })
  return map
}

export function AtomList({
  atomSets,
  title,
}: {
  atomSets: AtomSet[]
  title: string
}) {
  const param = getStateParameter("rows", title)
  const [selectedKeys, setSelectedKeys] = useAtom(selectedKeysFamily(param))
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
          <ToggleButton
            key={getCategorizedAtomKey(ca)}
            param={param}
            title={ca.atom.debugLabel || ""}
          />
        ))}
      </Box>
    </Box>
  )
}
