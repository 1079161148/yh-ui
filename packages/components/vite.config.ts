import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import dts from 'vite-plugin-dts'
import { visualizer } from 'rollup-plugin-visualizer'
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
      insertTypesEntry: true
    }),
    visualizer({
      filename: 'stats.html',
      gzipSize: true,
      brotliSize: true
    })
  ],
  build: {
    lib: {
      entry: {
        index: resolve(__dirname, 'src/index.ts'),
        resolver: resolve(__dirname, 'src/resolver.ts')
      },
      formats: ['es', 'cjs']
    },
    rollupOptions: {
      external: ['vue', '@yh-ui/hooks', '@yh-ui/utils', '@yh-ui/theme'],
      output: {
        preserveModules: true,
        preserveModulesRoot: 'src',
        exports: 'named',
        entryFileNames: '[name].mjs',
        chunkFileNames: '[name].mjs'
      }
    },
    cssCodeSplit: true,
    minify: false
  },
  resolve: {
    alias: {
      '@yh-ui/hooks': resolve(__dirname, '../hooks/src'),
      '@yh-ui/utils': resolve(__dirname, '../utils/src'),
      '@yh-ui/theme': resolve(__dirname, '../theme/src')
    }
  }
})
