import { defineConfig } from 'vite'

export default defineConfig({
  root: '.',
  publicDir: 'src/components',
  server: {
    port: 5173,
    open: '/test/demo/index.html'
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
