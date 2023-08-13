// import Layout from "@/_reference/graph/ux/graph-ux.tsx"

import AppLayout from "./app-layout.tsx"
import ProviderStack from "./provider-stack.tsx"

export default function App() {
  return (
    <ProviderStack>
      <AppLayout />
    </ProviderStack>
  )
}
