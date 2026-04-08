import { defineBuildConfig } from 'unbuild'
import { resolve } from 'path'

export default defineBuildConfig([
  // ── 主入口：保持现有行为，用于正常 npm 使用 ───────────────────────
  {
    entries: ['./src/index', './src/resolver'],
    declaration: true,
    clean: true,
    failOnWarn: false,
    rollup: {
      emitCJS: true,
      cjsBridge: true,
      output: { exports: 'named' }
    },
    externals: [
      'vue',
      '@yh-ui/components',
      '@yh-ui/hooks',
      '@yh-ui/utils',
      '@yh-ui/theme',
      '@yh-ui/locale'
    ]
  },
  // ── full bundle：内联所有 @yh-ui/* 子包，专供 Playground CDN 使用 ──
  // 输出 dist/full.mjs，只外部化 vue（esm.sh 可以直接服务此文件）
  {
    entries: [
      {
        input: './src/index',
        name: 'full'
      }
    ],
    declaration: false,
    clean: false,
    failOnWarn: false,
    rollup: {
      emitCJS: false,
      output: {
        exports: 'named',
        format: 'esm',
        entryFileNames: '[name].mjs'
      },
      resolve: {
        // 内联 @yh-ui/components 等子包的 dist（通过 workspace alias 解析）
        preferBuiltins: false,
        exportConditions: ['module', 'import', 'default']
      },
      inlineDependencies: true
    },
    // 只外部化 vue 和第三方包，内联所有 @yh-ui/* 子包
    externals: [
      'vue',
      'dayjs',
      'async-validator',
      '@floating-ui/dom',
      'viewerjs',
      'axios',
      'highlight.js',
      'mermaid',
      'echarts',
      'monaco-editor',
      'pinia',
      'vue-router',
      'zod',
      '@langchain/core',
      'lz-string'
    ],
    alias: {
      '@yh-ui/components': resolve(__dirname, '../components/dist/index.mjs'),
      '@yh-ui/hooks': resolve(__dirname, '../hooks/dist/index.mjs'),
      '@yh-ui/utils': resolve(__dirname, '../utils/dist/index.mjs'),
      '@yh-ui/theme': resolve(__dirname, '../theme/dist/index.mjs'),
      '@yh-ui/locale': resolve(__dirname, '../locale/dist/index.mjs')
    }
  }
])
