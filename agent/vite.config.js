import { defineConfig } from 'vite'

export default defineConfig({
  root: '.',
  server: {
    port: 5173,
    open: '/index.html'
  },
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: 'src/ozwell-iframe.js',
        iframe: 'src/components/index.html'
      }
    }
  }
})
