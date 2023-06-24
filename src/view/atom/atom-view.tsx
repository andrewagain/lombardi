import { Box } from "@chakra-ui/react"

import * as edgeAtoms from "@/graph/state/derived/edge-atoms"
import * as nodeAtoms from "@/graph/state/derived/node-atoms"
import * as serialAtoms from "@/graph/state/derived/serializable-atoms"
import * as treeAtoms from "@/graph/state/derived/tree-atoms"
import * as visibilityAtoms from "@/graph/state/derived/visibility-atoms"
import * as graphCoreAtoms from "@/graph/state/graph-core-atoms"

import { AtomList, AtomValue } from "./atom-list"

function getImportAtomValues(
  importName: string,
  importObject: object
): AtomValue[] {
  return Object.values(importObject).map((atom) => ({
    atom,
    name: importName,
  }))
}

export default function AtomView() {
  return (
    <Box padding={3}>
      <AtomList
        title="Atoms"
        values={[
          ...getImportAtomValues("core", graphCoreAtoms),
          ...getImportAtomValues("node", nodeAtoms),
          ...getImportAtomValues("edge", edgeAtoms),
          ...getImportAtomValues("serial", serialAtoms),
          ...getImportAtomValues("tree", treeAtoms),
          ...getImportAtomValues("visibility", visibilityAtoms),
        ]}
      />
    </Box>
  )
}
