import { Box } from "@chakra-ui/react"
import { Atom } from "jotai"

import * as graphCoreAtoms from "@/graph/state/graph-core-atoms"

import { AtomList } from "./atom-list"

export default function AtomView() {
  const coreAtoms: Atom<any>[] = Object.values(graphCoreAtoms)

  return (
    <Box padding={3}>
      <AtomList title="Atoms" values={coreAtoms.map((atom) => [atom])} />
    </Box>
  )
}
