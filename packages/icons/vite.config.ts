import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'
import { resolve } from 'node:path'

export default defineConfig({
  plugins: [
    dts({
      include: ['src/**/*.ts'],
      outDir: 'dist',
      insertTypesEntry: true
    })
  ],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      formats: ['es']
    },
    rollupOptions: {
      external: ['vue', '@iconify/vue'],
      output: {
        preserveModules: true,
        preserveModulesRoot: 'src',
        exports: 'named',
        entryFileNames: '[name].mjs',
        chunkFileNames: '[name]/[name].mjs',
        dir: 'dist'
      }
    },
    minify: 'esbuild',
    target: 'esnext',
    sourcemap: false,
    emptyOutDir: true,
    write: true
  },
  resolve: {
    alias: {}
  }
})
