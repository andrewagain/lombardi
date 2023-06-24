import { Box } from "@chakra-ui/react"

import {
  graphNodeHiddenSetAtom,
  graphNodeMapAtom,
} from "@/graph/state/graph-core-atoms"
import { graphNodeHiddenIndirectlySetAtom } from "@/graph/state/derived/visibility-atoms"

import { AtomList } from "./atom-list"

export default function AtomView() {
  return (
    <Box padding={3}>
      <AtomList
        title="Atoms"
        values={[
          [graphNodeMapAtom],
          [graphNodeHiddenSetAtom],
          [graphNodeHiddenIndirectlySetAtom],
        ]}
      />
    </Box>
  )
}
