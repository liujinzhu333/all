import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
  base: '/all/',
  define: {
    '__PROJECT_ROOT__': JSON.stringify(process.cwd())
  },
  plugins: [
    vue(),
    vueDevTools(),
  ],
  assetsInclude: ['​**​/*.md'], // 明确包含 .md 文件
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  server: {
    fs: {
      allow: ['..'] // 允许访问父目录
    },
    proxy: {
      '/api/weather': {
        target: 'https://wis.qq.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
      '/api': {
        target: 'http://localhost:3000/api',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    }
  }
})
