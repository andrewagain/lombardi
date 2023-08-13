import { Box } from "@chakra-ui/react"

import * as interfaceAtoms from "@/_reference/graph/state/derived/edge-atoms"
import Panel from "@/util/component/panel/panel"

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
  _cachedImportSets = [getImportAtomSet("node", interfaceAtoms)]
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
