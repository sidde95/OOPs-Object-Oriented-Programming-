import { defineConfig } from 'electron-vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  main: {
    // Electron main process — Node.js environment
    build: {
      outDir: 'dist/main'
    }
  },
  preload: {
    build: {
      outDir: 'dist/preload'
    }
  },
  renderer: {
    // React frontend — browser-like environment
    plugins: [react()],
    build: {
      outDir: 'dist/renderer'
    }
  }
})
