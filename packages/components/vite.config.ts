import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import dts from 'vite-plugin-dts'
import { resolve } from 'node:path'
import crypto from 'node:crypto'

// Polyfill crypto.hash for Node.js < 18.20 / 20.12 / 21.7
if (typeof (crypto as any).hash !== 'function') {
  ;(crypto as any).hash = (
    algorithm: string,
    data: string | Buffer,
    outputEncoding: any = 'hex'
  ) => {
    return crypto.createHash(algorithm).update(data).digest(outputEncoding)
  }
}

export default defineConfig({
  plugins: [
    vue(),
    dts({
      include: ['src/**/*.ts', 'src/**/*.vue'],
      outDir: 'dist',
      entryRoot: 'src',
      staticImport: true,
      insertTypesEntry: true,
      skipDiagnostics: true
    })
  ],
  build: {
    lib: {
      entry: {
        index: resolve(__dirname, 'src/index.ts'),
        resolver: resolve(__dirname, 'src/resolver.ts')
      },
      formats: ['es']
    },
    rollupOptions: {
      external: [
        'vue',
        '@yh-ui/hooks',
        '@yh-ui/utils',
        '@yh-ui/theme',
        '@yh-ui/locale',
        'dayjs',
        'viewerjs',
        'async-validator',
        '@floating-ui/dom'
      ],
      output: {
        preserveModules: true,
        preserveModulesRoot: 'src',
        exports: 'named',
        entryFileNames: '[name].mjs',
        chunkFileNames: '[name]/[name].mjs',
        dir: 'dist'
      }
    },
    cssCodeSplit: true,
    minify: 'esbuild',
    target: 'esnext',
    sourcemap: false,
    // 启用更高强度的 tree-shaking
    treeShaking: true,
    // 压缩配置
    chunkSizeWarningLimit: 1000,
    // 清理构建目录
    cleanDir: true,
    // 禁用临时文件
    write: true,
    // 启用 reportCompressedSize 以便分析
    reportCompressedSize: true
  },
  resolve: {
    alias: {
      '@yh-ui/hooks': resolve(__dirname, '../hooks/src'),
      '@yh-ui/utils': resolve(__dirname, '../utils/src'),
      '@yh-ui/theme': resolve(__dirname, '../theme/src')
    }
  },
  // 优化依赖预构建
  optimizeDeps: {
    include: ['vue', 'dayjs']
  },
  esbuild: {
    // 移除控制台和调试语句
    drop: process.env.NODE_ENV === 'production' ? ['console', 'debugger'] : [],
    // 压缩属性名
    legalComments: 'none'
  }
})
