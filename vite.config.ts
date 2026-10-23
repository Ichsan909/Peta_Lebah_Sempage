import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    target: 'es2020',
    sourcemap: false,
    chunkSizeWarningLimit: 600,
    // Pisahkan pustaka agar cache browser awet saat hanya kode/data situs yang berubah.
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes('node_modules')) return
          return /leaflet/.test(id) ? 'peta' : 'vendor'
        },
      },
    },
  },
})
