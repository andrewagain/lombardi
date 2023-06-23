import Layout from "@/interface/layout/layout.tsx"

import ProviderStack from "./provider-stack.tsx"

export default function App() {
  return (
    <ProviderStack>
      <Layout />
    </ProviderStack>
  )
}
