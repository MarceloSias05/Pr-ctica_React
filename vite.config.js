import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    hmr: {
      overlay: false
    }
  },
  assetsInclude: ['**/*.br'], // Incluir archivos .br como assets
  build: {
    assetsInlineLimit: 0 // No inline assets para evitar problemas con Unity
  }
})