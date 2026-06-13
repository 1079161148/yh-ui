import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'node:path'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: [
      { find: '@yh-ui/components', replacement: resolve(__dirname, '../packages/components/src') },
      { find: '@yh-ui/hooks', replacement: resolve(__dirname, '../packages/hooks/src') },
      { find: '@yh-ui/utils', replacement: resolve(__dirname, '../packages/utils/src') },
      { find: '@yh-ui/theme', replacement: resolve(__dirname, '../packages/theme/src') },
      { find: '@yh-ui/flow', replacement: resolve(__dirname, '../packages/flow/src') },
      { find: '@yh-ui/locale', replacement: resolve(__dirname, '../packages/locale/src') },
      { find: '@yh-ui/request', replacement: resolve(__dirname, '../packages/request/src') },
      { find: '@yh-ui/ai-sdk', replacement: resolve(__dirname, '../packages/ai-sdk/src') },
      { find: '@yh-ui/icons', replacement: resolve(__dirname, '../packages/icons/src') },
      { find: /^dayjs$/, replacement: resolve(__dirname, '../node_modules/dayjs/esm/index.js') },
      {
        find: /^dayjs\/dayjs\.min\.js$/,
        replacement: resolve(__dirname, '../node_modules/dayjs/esm/index.js')
      }
    ]
  },
  // 优化依赖预构建：dayjs 和所有插件都是 CJS 格式，必须预构建为 ESM
  // 否则在源码模式下（alias 指向 src/）Vite 冷启动时可能直接投递 CJS 文件
  // 导致浏览器报 "does not provide an export named 'default'"
  optimizeDeps: {
    include: [
      'dayjs',
      'dayjs/plugin/advancedFormat',
      'dayjs/plugin/customParseFormat',
      'dayjs/plugin/isBetween',
      'dayjs/plugin/isoWeek',
      'dayjs/plugin/quarterOfYear',
      'dayjs/plugin/weekOfYear'
    ],
    needsInterop: ['dayjs']
  },
  server: {
    port: 3000,
    open: true,
    // WebContainer 需要这些响应头才能在浏览器中运行
    headers: {
      'Cross-Origin-Embedder-Policy': 'require-corp',
      'Cross-Origin-Opener-Policy': 'same-origin'
    }
  }
})
