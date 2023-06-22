/* eslint-disable @typescript-eslint/no-explicit-any */
import { Atom, useAtom } from "jotai"
import { atomFamily, atomWithStorage } from "jotai/utils"
import { useCallback, useMemo, useState } from "react"

import { AtomCell } from "./atom-cell"
import styles from "./atom-list.module.css"

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
    <div className={styles.container}>
      <div className={styles.selectedValues}>
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
      <div className={styles.inputWrapper}>
        <input
          className={styles.inputField}
          onChange={(e) => {
            setFilterText(e.target.value)
          }}
          placeholder="Filter property keys"
          type="search"
          value={filterText}
        />
      </div>
      <div className={styles.filterButtons}>
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
