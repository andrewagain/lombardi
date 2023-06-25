import { Box } from "@chakra-ui/react"

import * as edgeAtoms from "@/graph/state/derived/edge-atoms"
import * as nodeAtoms from "@/graph/state/derived/node-atoms"
import * as serialAtoms from "@/graph/state/derived/serializable-atoms"
import * as treeAtoms from "@/graph/state/derived/tree-atoms"
import * as visibilityAtoms from "@/graph/state/derived/visibility-atoms"
import * as graphCoreAtoms from "@/graph/state/graph-core-atoms"
import { PanelDivider } from "@/interface/controls/panel-divider"

import { AtomSet } from "./atom-util"
import { AtomCellList } from "./cell/atom-cell-list"
import AtomChecklist from "./checklist/atom-checklist"

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
      display="grid"
      gridTemplateAreas={`"t" "d" "b"`}
      gridTemplateRows="auto auto 1fr"
      height="100%"
      width="100%"
      minWidth={1}
    >
      <Box gridArea="t" css={{ height: 200 }} padding={2} minWidth={1}>
        <AtomCellList atomSets={getAllImportSets()} />
      </Box>
      <PanelDivider orientation="bottom" gridArea="d" />
      <Box gridArea="b" display="flex" flexDirection="column" overflow="hidden">
        <AtomChecklist atomSets={getAllImportSets()} />
      </Box>
    </Box>
  )
}
