/* eslint-disable @typescript-eslint/no-explicit-any */
import { Atom, useAtom } from "jotai"
import { atomFamily, atomWithStorage } from "jotai/utils"
import { useCallback, useMemo, useState } from "react"

import { AtomCell } from "./atom-cell"

const MISSING_LABEL_TEXT = "debugLabelFailure"

type WindowParam = string

function getStateParameter(type: "open" | "rows", title: string) {
  return `pactgraph.${title.replace(/\s/g, "")}.${type}`
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

type ValueTuple = [Atom<any>, any?]

export function AtomList({
  values,
  title,
}: {
  values: ValueTuple[]
  title: string
}) {
  const param = getStateParameter("rows", title)
  const [selectedRowTitles, setSelectedRowTitles] = useAtom(
    selectedRowsFamily(param)
  )
  const valuesMap = useMemo(
    () =>
      new Map<string, ValueTuple>(
        values.map((value) => [
          value[0].debugLabel || MISSING_LABEL_TEXT,
          value,
        ])
      ),
    [values]
  )
  const [filterText, setFilterText] = useState("")

  const selectedValues = useMemo(
    () =>
      selectedRowTitles
        .map((title) => valuesMap.get(title))
        .filter((x) => x) as ValueTuple[],
    [selectedRowTitles, valuesMap]
  )

  const filteredValues = useMemo(
    () =>
      values.filter((value) =>
        value[0].debugLabel?.toLowerCase().includes(filterText.toLowerCase())
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
    <div
      style={{
        overflow: "hidden",
        whiteSpace: "normal",
        width: "100%",
      }}
    >
      <div
        style={{
          flex: "0 0 auto",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {selectedValues.map((pair) => (
          <AtomCell
            atomConfig={pair[0]}
            formatType={pair[1]}
            key={pair[0].debugLabel}
            label={pair[0].debugLabel || MISSING_LABEL_TEXT}
            onRemove={removeCell}
          />
        ))}
      </div>
      <div
        style={{
          flex: "0 0 auto",
        }}
      >
        <input
          style={{
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
      </div>
      <div
        style={{
          flex: "1 1 auto",

          // "> button": {
          //   border: "1px solid gray",
          //   borderRadius: 2,
          //   color: "white",
          //   margin: "0 2px 2px 0",
          // },

          // "> button[data-selected]": {
          //   borderColor: "#6fcade",
          // },

          // "> button:hover": {
          //   backgroundColor: "#fff4",
          // },
        }}
      >
        {filteredValues.map((pair) => (
          <ToggleButton
            key={pair[0].debugLabel}
            param={param}
            title={pair[0].debugLabel || MISSING_LABEL_TEXT}
          />
        ))}
      </div>
    </div>
  )
}
