import {
  graphNodeMapAtom,
  graphNodeVisibilityMapAtom,
  graphVisibleNodesAtom,
} from "@/graph/state/graph-atoms"

import { AtomList } from "./atom-list"

export default function AtomView() {
  return (
    <div>
      <AtomList
        title="Atoms"
        values={[
          [graphNodeMapAtom],
          [graphVisibleNodesAtom],
          [graphNodeVisibilityMapAtom],
        ]}
      />
    </div>
  )
}
