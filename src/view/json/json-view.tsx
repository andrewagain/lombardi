"use client";

import { graphRootAtom } from "@/graph/state/graph-atoms.js";
import {
  graphNodesWithoutIncomingEdgesAtom,
  graphTreeRootNodesAtom,
} from "@/graph/state/tree-atoms.js";
import { useAtomValue } from "jotai";

// https://github.com/brimdata/react-arborist
export default function JsonView() {
  const root = useAtomValue(graphRootAtom);
  const rootNodes = useAtomValue(graphNodesWithoutIncomingEdgesAtom);
  const tree = useAtomValue(graphTreeRootNodesAtom);

  return (
    <div className="w-full h-full">
      <div>{JSON.stringify([...root.nodeMap.values()])}</div>
      <div>{JSON.stringify([...root.edgeMap.values()])}</div>
      <div>{JSON.stringify(rootNodes)}</div>
      <div>{JSON.stringify(tree)}</div>
    </div>
  );
}
