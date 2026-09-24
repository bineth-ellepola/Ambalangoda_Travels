import fs from 'node:fs'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Point the dev proxy at whatever PORT the backend's .env uses
function backendPort() {
  try {
    const env = fs.readFileSync(new URL('../backend/.env', import.meta.url), 'utf8')
    return env.match(/^PORT=(\d+)/m)?.[1] || '5000'
  } catch {
    return '5000'
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': `http://localhost:${backendPort()}`,
    },
  },
})
