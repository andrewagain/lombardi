import { Box } from "@chakra-ui/react"

import * as edgeAtoms from "@/graph/state/derived/edge-atoms"
import * as nodeAtoms from "@/graph/state/derived/node-atoms"
import * as serialAtoms from "@/graph/state/derived/serializable-atoms"
import * as treeAtoms from "@/graph/state/derived/tree-atoms"
import * as visibilityAtoms from "@/graph/state/derived/visibility-atoms"
import * as graphCoreAtoms from "@/graph/state/graph-core-atoms"
import Panel from "@/interface/panel/panel"

import { AtomSet } from "./atom-util"
import AtomKeyList from "./key/atom-key-list"
import { AtomValueList } from "./value/atom-value-list"

function getImportAtomSet(importName: string, importObject: object): AtomSet {
  return {
    name: importName,
    atoms: Object.values(importObject),
  }
}

let _cachedImportSets: AtomSet[] | null = null
function getAllImportSets(): AtomSet[] {
  if (_cachedImportSets) {
    return _cachedImportSets
  }
  _cachedImportSets = [
    getImportAtomSet("core", graphCoreAtoms),
    getImportAtomSet("node", nodeAtoms),
    getImportAtomSet("edge", edgeAtoms),
    getImportAtomSet("serial", serialAtoms),
    getImportAtomSet("tree", treeAtoms),
    getImportAtomSet("visibility", visibilityAtoms),
  ]
  return _cachedImportSets
}

export default function AtomView() {
  return (
    <Box
      height="100%"
      width="100%"
      minWidth={0}
      minHeight={0}
      overflow="hidden"
    >
      <Panel orientation="top" panelKey="values" overflowY="scroll" padding={2}>
        <AtomValueList atomSets={getAllImportSets()} />
      </Panel>

      <AtomKeyList atomSets={getAllImportSets()} />
    </Box>
  )
}
