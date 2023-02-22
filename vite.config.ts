import path from 'node:path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  server: {
    proxy: {
      "/api": {
        target: "https://www.googleapis.com",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, "")
      },
    },
  },
})
