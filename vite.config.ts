import react from "@vitejs/plugin-react"
import jotaiDebugLabel from "jotai/babel/plugin-debug-label"
import jotaiReactRefresh from "jotai/babel/plugin-react-refresh"
import * as url from "url"
import { defineConfig } from "vite"

// https://vitejs.dev/config/
export default defineConfig({
  // https://jotai.org/docs/guides/vite
  plugins: [
    react({ babel: { plugins: [jotaiDebugLabel, jotaiReactRefresh] } }),
  ],
  resolve: {
    alias: {
      "@": `${url.fileURLToPath(new URL(".", import.meta.url))}/src`,
    },
  },
  css: {
    modules: {
      localsConvention: "camelCaseOnly",
    },
  },
})
