import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import dts from 'vite-plugin-dts'
import { resolve } from 'node:path'

export default defineConfig({
  plugins: [
    vue(),
    dts({
      include: ['src/**/*.ts', 'src/**/*.vue'],
      outDir: 'dist',
      entryRoot: 'src',
      staticImport: true,
      insertTypesEntry: true
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
