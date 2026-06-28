import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const backendTarget = process.env.VITE_API_BASE_URL || 'http://localhost:5000'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: backendTarget,
        changeOrigin: true,
        secure: false,
        timeout: 60000,
        proxyTimeout: 60000
      },
      '/jobs-json': {
        target: backendTarget,
        changeOrigin: true,
        secure: false,
        timeout: 60000,
        proxyTimeout: 60000
      },
      '/jobs-csv': {
        target: backendTarget,
        changeOrigin: true,
        secure: false,
        timeout: 60000,
        proxyTimeout: 60000
      }
    }
  }
})




























