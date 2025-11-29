import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import tsconfigPaths from "vite-tsconfig-paths"
import tailwindcss from '@tailwindcss/vite'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  base: mode === 'production' ? '/Local-Event-Bulletin-Board-Frontend/' : '/',
  plugins: [react(), 
    tsconfigPaths(),
    tailwindcss()
  ],
}))