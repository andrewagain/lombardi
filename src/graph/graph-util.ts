import { sortBy, times } from "lodash-es"

import {
  GraphCoreData,
  GraphEdge,
  GraphEdgePriorityMap,
  GraphShorthand,
} from "./graph-types.ts"

export function createEmptyGraph(): GraphCoreData {
  return {
    nodeMap: new Map(),
    edgeMap: new Map(),
    edgePriorityMap: new Map(),
  }
}

export function translateShorthandGraph(g: GraphShorthand): GraphCoreData {
  return {
    nodeMap: new Map(g.nodes.map((n) => [n.id, n])),
    edgeMap: new Map(g.edges?.map((e) => [e.id, e])),
    edgePriorityMap: new Map(),
  }
}

export function graphSortEdges(
  edges: GraphEdge[],
  edgePriorityMap: GraphEdgePriorityMap
): GraphEdge[] {
  return sortBy(edges, (e) => edgePriorityMap.get(e.id) ?? -1)
}

// Create an exclusive range between start and end
export function rangeBetween(
  count: number,
  start: number,
  end: number
): number[] {
  if (end <= start) {
    return times(count, () => start)
  }
  const step = (end - start) / (count + 1)
  return times(count, (i) => start + step * (i + 1))
}

export function calculateInsertNodePriorities(
  insertCount: number,
  beforePriority: number | null,
  afterPriority: number | null
): number[] {
  if (afterPriority !== null && beforePriority !== null) {
    return rangeBetween(insertCount, beforePriority, afterPriority)
  }

  if (afterPriority !== null) {
    return rangeBetween(insertCount, 0, afterPriority)
  }

  if (beforePriority !== null) {
    return rangeBetween(
      insertCount,
      beforePriority + 1,
      beforePriority + insertCount + 1
    )
  }

  return times(insertCount, (i) => i + 1)
}

export function splitGraphNodeIdAndPropertyName(
  combo: string
): [string, string] {
  return combo.split(",") as [string, string]
}

export function combineGraphNodeIdAndPropertyName(
  nodeId: string,
  propertyName: string
): string {
  return [nodeId, propertyName].join(",")
}
