import { Box } from "@chakra-ui/react"

import * as edgeAtoms from "@/graph/state/derived/edge-atoms"
import * as nodeAtoms from "@/graph/state/derived/node-atoms"
import * as serialAtoms from "@/graph/state/derived/serializable-atoms"
import * as treeAtoms from "@/graph/state/derived/tree-atoms"
import * as visibilityAtoms from "@/graph/state/derived/visibility-atoms"
import * as graphCoreAtoms from "@/graph/state/graph-core-atoms"

import { AtomList, AtomSet } from "./atom-list"

function getImportAtomSet(importName: string, importObject: object): AtomSet {
  return {
    name: importName,
    atoms: Object.values(importObject),
  }
}

export default function AtomView() {
  return (
    <Box padding={3}>
      <AtomList
        title="Atoms"
        atomSets={[
          getImportAtomSet("core", graphCoreAtoms),
          getImportAtomSet("node", nodeAtoms),
          getImportAtomSet("edge", edgeAtoms),
          getImportAtomSet("serial", serialAtoms),
          getImportAtomSet("tree", treeAtoms),
          getImportAtomSet("visibility", visibilityAtoms),
        ]}
      />
    </Box>
  )
}
