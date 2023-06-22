import dagre from "dagre"
import { atom, useAtomValue, useSetAtom } from "jotai"
import { useCallback, useEffect } from "react"

import { mapMapValues } from "@/util/datastructure/map"
import {
  Point,
  pointAdd,
  pointCopy,
  pointSignFlip,
} from "@/util/geometry/point"
import {
  getEncompassingBoundingRect,
  getRectCenter,
} from "@/util/geometry/rect"

const graphDagre = atom(get => {
    const g = new dagre.graphlib.Graph({ compound: true, directed: true })
    g.setGraph({ rankdir: "BT", ranksep: 300, nodesep: 100 })

    // Default to assigning a new object as a label for each new edge.
    g.setDefaultEdgeLabel(function () {
      return {}
    })

    for (let i = 0; i < graphContractKeys.length; i++) {
      const graphNodeId = graphContractKeys[i]
      const contractId = graphKeyToContractId(graphNodeId)
      g.setNode(contractId, {
        label: graphNodeId,
        width: ContractStyle.Width,
        height: ContractStyle.Height,
      })
    }

    for (let i = 0; i < graphLinks.length; i++) {
      const link = graphLinks[i]
      g.setEdge(link.fromId, link.toId)
    }
    return g
})


function getGraphOffset(m: Map<string, Point>): Point {
  if (m.size === 0) {
    return { x: 0, y: 0 }
  }
  const bounds = getEncompassingBoundingRect([...m.values()])
  const center = getRectCenter(bounds)
  return pointSignFlip(center)
}

function shiftMap(m: Map<string, Point>, offset: Point): Map<string, Point> {
  return mapMapValues(m, (p) => pointAdd(p, offset))
}

// convert position float array to position map
function getDagreContractPositionMap(
  g: dagre.graphlib.Graph,
  graphContractKeys: string[]
) {
  const m = new Map<string, Point>()
  for (let i = 0; i < graphContractKeys.length; i++) {
    const graphNodeId = graphContractKeys[i]
    m.set(graphNodeId, pointCopy(g.node(graphKeyToContractId(graphNodeId))))
  }
  return m
}

function getDagreLinkPositionMap(
  g: dagre.graphlib.Graph,
  graphLinks: ContractLink[],
  offset: Point
) {
  const m = new Map<GraphLinkKey, Point[]>()
  for (let i = 0; i < graphLinks.length; i++) {
    const link = graphLinks[i]
    const linkId = graphKeyForLink(link)
    const edge = g.edge(link.fromId, link.toId)
    m.set(
      linkId,
      edge.points.map((p) => pointAdd(p, offset))
    )
  }
  return m
}

export default function LayoutButton() {

  const relayout = 
    useCallback(() => {
      const g = new dagre.graphlib.Graph({ compound: true, directed: true })
      g.setGraph({ rankdir: "BT", ranksep: 300, nodesep: 100 })

      // Default to assigning a new object as a label for each new edge.
      g.setDefaultEdgeLabel(function () {
        return {}
      })

      for (let i = 0; i < graphContractKeys.length; i++) {
        const graphNodeId = graphContractKeys[i]
        const contractId = graphKeyToContractId(graphNodeId)
        g.setNode(contractId, {
          label: graphNodeId,
          width: ContractStyle.Width,
          height: ContractStyle.Height,
        })
      }

      for (let i = 0; i < graphLinks.length; i++) {
        const link = graphLinks[i]
        g.setEdge(link.fromId, link.toId)
      }

      const start = Date.now()
      dagre.layout(g)
      console.log(`layout in ${Date.now() - start}ms`)

      const positionMap = getDagreContractPositionMap(
        g,
        nodeIds
      )
      const offset = getGraphOffset(contractPositionMap)
      setGraphPositionMap(shiftMap(contractPositionMap, offset))
      setGraphLinkPathMap(getDagreLinkPositionMap(g, graphLinks, offset))
    }, [
      graphLinks,
      graphContractKeys,
      setGraphLinkPathMap,
      setGraphPositionMap,
    ])
  )

  useEffect(() => {
    relayout()
  }, [relayout, layoutTrigger])

  return null
}
