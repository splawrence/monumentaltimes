import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/',
  server: {
    middlewareMode: false,
    proxy: {
      '/api/tina': {
        target: 'http://localhost:4001',
        changeOrigin: true,
      },
    },
  },
  build: {
    copyPublicDir: true,
    outDir: 'dist',
  },
})
