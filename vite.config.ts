import path from "path"
import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vitest/config"

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  test: {
    environment: 'jsdom',
    setupFiles: './src/tests/setup.ts',
    globals: true,
  },
  server: {
    proxy: {
      "/currency-api": {
        target: "https://api.currencybeacon.com/v1",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/currency-api/, ""),
      },
    },
  },
})
