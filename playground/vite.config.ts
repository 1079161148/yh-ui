import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'node:path'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@yh-ui/components': resolve(__dirname, '../packages/components/src'),
      '@yh-ui/hooks': resolve(__dirname, '../packages/hooks/src'),
      '@yh-ui/utils': resolve(__dirname, '../packages/utils/src'),
      '@yh-ui/theme': resolve(__dirname, '../packages/theme/src')
    }
  },
  server: {
    port: 3000,
    open: true
  }
})
