import react from "@vitejs/plugin-react"
import * as url from "url"
import { defineConfig } from "vite"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
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
