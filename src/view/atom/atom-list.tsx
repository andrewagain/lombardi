import { Box, Input } from "@chakra-ui/react"
import { Atom, useAtom } from "jotai"
import { atomFamily, atomWithStorage } from "jotai/utils"
import { useCallback, useEffect, useMemo, useState } from "react"
import { LightAsync as SyntaxHighlighter } from "react-syntax-highlighter"
import json from "react-syntax-highlighter/dist/esm/languages/hljs/json"

import { isTruthy } from "@/util/function"

import { AtomCell } from "./cell/atom-cell"

const MISSING_LABEL_TEXT = "debugLabelFailure"

type WindowParam = string

function getStateParameter(type: "open" | "rows", title: string) {
  return `nuons.${title.replace(/\s/g, "")}.${type}`
}

const selectedRowsFamily = atomFamily((param: WindowParam) =>
  atomWithStorage<string[]>(param, [])
)

function ToggleButton({ title, param }: { title: string; param: string }) {
  const [selectedRowTitles, setSelectedRowTitles] = useAtom(
    selectedRowsFamily(param)
  )

  const isSelected = selectedRowTitles.includes(title)

  const toggle = useCallback(() => {
    if (selectedRowTitles.includes(title)) {
      setSelectedRowTitles(selectedRowTitles.filter((x) => x !== title))
    } else {
      setSelectedRowTitles([...selectedRowTitles, title])
    }
  }, [selectedRowTitles, setSelectedRowTitles, title])

  return (
    <button data-selected={isSelected ? true : undefined} onClick={toggle}>
      {title}{" "}
    </button>
  )
}

export interface AtomValue {
  name: string
  atom: Atom<any>
}

function getAtomValueLabel(a: AtomValue) {
  return `${a.name}:${a.atom.debugLabel || MISSING_LABEL_TEXT}`
}

export function AtomList({
  values,
  title,
}: {
  values: AtomValue[]
  title: string
}) {
  const param = getStateParameter("rows", title)
  const [selectedRowTitles, setSelectedRowTitles] = useAtom(
    selectedRowsFamily(param)
  )
  const valuesMap = useMemo(
    () =>
      new Map<string, AtomValue>(
        values.map((value) => [getAtomValueLabel(value), value])
      ),
    [values]
  )
  const [filterText, setFilterText] = useState("")

  useEffect(() => {
    SyntaxHighlighter.registerLanguage("json", json)
  }, [])

  const selectedValues = useMemo(
    () =>
      selectedRowTitles.map((title) => valuesMap.get(title)).filter(isTruthy),
    [selectedRowTitles, valuesMap]
  )

  const filteredValues = useMemo(
    () =>
      values.filter((value) =>
        value.atom.debugLabel?.toLowerCase().includes(filterText.toLowerCase())
      ),
    [values, filterText]
  )

  const removeCell = useCallback(
    (label: string) => {
      setSelectedRowTitles((prev) => prev.filter((x) => x !== label))
    },
    [setSelectedRowTitles]
  )

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
        {selectedValues.map((v) => (
          <AtomCell
            atomConfig={v.atom}
            key={v.atom.debugLabel}
            label={getAtomValueLabel(v)}
            onRemove={removeCell}
          />
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
        {filteredValues.map((v) => (
          <ToggleButton
            key={v.atom.debugLabel}
            param={param}
            title={getAtomValueLabel(v)}
          />
        ))}
      </Box>
    </Box>
  )
}
