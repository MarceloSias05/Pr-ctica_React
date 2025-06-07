import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    // Avoid conflicts with Unity server
    strictPort: true,
  },
  // Configure asset handling for Unity files
  assetsInclude: ['**/*.br', '**/*.data', '**/*.wasm'],
  // Ensure proper MIME types for Unity files
  define: {
    global: 'globalThis',
  },
})