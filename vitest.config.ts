import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { resolve } from 'node:path'
import crypto from 'node:crypto'

// Polyfill crypto.hash for Node.js < 18.20 / 20.12 / 21.7
if (typeof (crypto as unknown as { hash: unknown }).hash !== 'function') {
  ;(
    crypto as unknown as {
      hash: (
        algorithm: string,
        data: string | Buffer,
        outputEncoding?: crypto.BinaryToTextEncoding
      ) => string | Buffer
    }
  ).hash = (
    algorithm: string,
    data: string | Buffer,
    outputEncoding: crypto.BinaryToTextEncoding = 'hex'
  ) => {
    return crypto.createHash(algorithm).update(data).digest(outputEncoding)
  }
}

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
    environment: 'happy-dom',
    // 包含普通测试和 SSR 测试
    include: ['packages/**/__tests__/**/*.{test,ssr.test}.{ts,tsx}'],
    // 排除 Nuxt 集成测试（需要单独运行）
    exclude: [
      '**/node_modules/**',
      '**/dist/**',
      '**/cypress/**',
      '**/.{idea,git,cache,output,temp}/**',
      // Nuxt E2E 集成测试需要真实 Nuxt 服务器，单独运行
      'packages/nuxt/__tests__/e2e/**'
    ],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html', 'clover', 'lcov', 'json-summary'],
      reportsDirectory: './coverage',
      include: ['packages/*/src/**/*.{ts,vue}'],
      exclude: ['**/*.d.ts', '**/index.ts', '**/__tests__/**', '**/dist/**'],
      clean: true,
      reportOnFailure: true
    },
    // SSR 相关配置
    server: {
      deps: {
        inline: ['vue', '@vue']
      }
    }
  }
})
