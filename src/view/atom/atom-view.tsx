import { Box } from "@chakra-ui/react"

import * as graphCoreAtoms from "@/graph/state/graph-core-atoms"

import { AtomList, AtomValueTuple } from "./atom-list"

function getImportTuples(i: object): AtomValueTuple[] {
  return Object.values(i).map((atom) => [atom])
}

export default function AtomView() {
  return (
    <Box padding={3}>
      <AtomList title="Atoms" values={getImportTuples(graphCoreAtoms)} />
    </Box>
  )
}
