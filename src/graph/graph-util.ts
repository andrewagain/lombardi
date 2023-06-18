import { sortBy } from "lodash-es";
import {
  GraphEdge,
  GraphEdgePriorityMap,
  GraphRoot,
  GraphShorthand,
} from "./graph-types.js";

export function createEmptyGraph(): GraphRoot {
  return {
    nodeMap: new Map(
      [
        { id: "root", name: "root" },
        { id: "a", name: "a" },
        { id: "b", name: "b" },
      ].map((n) => [n.id, n])
    ),
    edgeMap: new Map(
      [
        { id: "ra", source: "root", target: "a" },
        { id: "rb", source: "root", target: "b" },
      ].map((e) => [e.id, e])
    ),
    edgePriorityMap: new Map([["ra", 1]]),
  };
}

export function translateShorthandGraph(g: GraphShorthand): GraphRoot {
  return {
    nodeMap: new Map(g.nodes.map((n) => [n.id, n])),
    edgeMap: new Map(g.edges?.map((e) => [e.id, e])),
    edgePriorityMap: new Map(),
  };
}

export function graphSortEdges(
  edges: GraphEdge[],
  edgePriorityMap: GraphEdgePriorityMap
): GraphEdge[] {
  return sortBy(edges, (e) => edgePriorityMap.get(e.id) ?? -1);
}
