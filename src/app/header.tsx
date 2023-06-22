import GraphSelect from "./control/graph-select"
import LayoutButton from "./control/layout-button"

export default function Header() {
  return (
    <header style={{ display: "flex", justifyContent: "space-between" }}>
      Header
      <LayoutButton />
      <GraphSelect />
    </header>
  )
}
