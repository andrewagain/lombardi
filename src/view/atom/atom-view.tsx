import {
  graphNodeHiddenSetAtom,
  graphNodeMapAtom,
  graphVisibleNodesAtom,
} from "@/graph/state/graph-atoms"
import { graphNodeHiddenIndirectlySetAtom } from "@/graph/state/visibility-atoms"

import { AtomList } from "./atom-list"

export default function AtomView() {
  return (
    <div>
      <AtomList
        title="Atoms"
        values={[
          [graphNodeMapAtom],
          [graphVisibleNodesAtom],
          [graphNodeHiddenSetAtom],
          [graphNodeHiddenIndirectlySetAtom],
        ]}
      />
    </div>
  )
}
