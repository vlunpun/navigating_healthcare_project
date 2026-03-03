import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
      '/auth': {
        target: 'https://frailty-infer-707091819757.us-central1.run.app',
        changeOrigin: true,
      },
      '/infer-with-guidance': {
        target: 'https://frailty-infer-707091819757.us-central1.run.app',
        changeOrigin: true,
      },
      '/chat': {
        target: 'https://frailty-infer-707091819757.us-central1.run.app',
        changeOrigin: true,
      },
    },
  },
})
