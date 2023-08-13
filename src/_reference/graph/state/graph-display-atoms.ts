import { atom, useSetAtom } from "jotai"
import { useCallback } from "react"

import { toggleArrayInclusion } from "@/util/datastructure/array"

export enum GraphDisplayElement {
  Nodes,
  Edges,
  Descriptions,
  Labels,
}

export const graphDisplayElementsAtom = atom([
  GraphDisplayElement.Nodes,
  GraphDisplayElement.Edges,
  GraphDisplayElement.Descriptions,
  GraphDisplayElement.Labels,
])

export function useToggleGraphDisplayElement(element: GraphDisplayElement) {
  const setGraphDisplayElements = useSetAtom(graphDisplayElementsAtom)

  return useCallback(() => {
    setGraphDisplayElements((a) => toggleArrayInclusion(a, element))
  }, [setGraphDisplayElements, element])
}
