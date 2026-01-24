import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { resolve } from 'node:path'

export default defineConfig({
  plugins: [vue(), vueJsx()],
  resolve: {
    alias: {
      '@yh-ui/components': resolve(__dirname, 'packages/components/src'),
      '@yh-ui/hooks': resolve(__dirname, 'packages/hooks/src'),
      '@yh-ui/utils': resolve(__dirname, 'packages/utils/src'),
      '@yh-ui/theme': resolve(__dirname, 'packages/theme/src'),
      '@yh-ui/locale': resolve(__dirname, 'packages/locale/src')
    }
  },
  test: {
    globals: true,
    environment: 'jsdom',
    // 包含普通测试和 SSR 测试
    include: ['packages/**/__tests__/**/*.test.ts', 'packages/**/__tests__/**/*.ssr.test.ts'],
    // 排除 Nuxt 集成测试（需要单独运行）
    exclude: [
      '**/node_modules/**',
      '**/dist/**',
      '**/cypress/**',
      '**/.{idea,git,cache,output,temp}/**',
      'packages/nuxt/__tests__/integration.test.ts'
    ],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      include: ['packages/*/src/**/*.{ts,vue}'],
      exclude: ['**/*.d.ts', '**/index.ts', '**/__tests__/**']
    },
    // SSR 相关配置
    server: {
      deps: {
        inline: ['vue', '@vue']
      }
    }
  }
})
