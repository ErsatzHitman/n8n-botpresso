import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // Load ALL env vars (empty prefix) so N8N_URL is readable here
  // without being exposed in the browser bundle.
  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [react()],
    server: {
      proxy: {
        '/webhook': {
          target: env.N8N_URL || 'http://localhost:5678',
          changeOrigin: true,
        },
      },
    },
  }
})
