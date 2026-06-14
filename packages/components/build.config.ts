import { defineBuildConfig } from 'unbuild'
import { resolve } from 'path'
import { pathToFileURL } from 'url'
import { basename } from 'pathe'
import { vueLoader } from 'vue-sfc-transformer/mkdist'
import { build as esbuild } from 'esbuild'

export default defineBuildConfig({
  entries: [
    {
      builder: 'mkdist',
      input: './src',
      outDir: './dist',
      // 排除 dayjs-plugins：mkdist 只转译不打包，裸导入会原样输出到 dist，
      // 导致消费方 Vite 无法解析 dayjs/plugin/* 子路径。改用下方 rollup 条目内联打包。
      pattern: ['**', '!**/__tests__/**', '!dayjs-plugins*'],
      format: 'esm',
      ext: 'mjs',
      declaration: true
    },
    {
      builder: 'mkdist',
      input: './src',
      outDir: './dist',
      pattern: ['**', '!**/__tests__/**', '!dayjs-plugins*'],
      format: 'cjs',
      ext: 'cjs',
      declaration: false
    },
    // dayjs-plugins 专用 rollup 条目：
    // externals 只精确匹配 'dayjs'，不匹配 'dayjs/plugin/*' 子路径，
    // 所以 rollup 会将所有插件函数代码直接内联进 dist，
    // 生成完全自包含的 dayjs-plugins.mjs / .cjs，消费方零配置。
    {
      builder: 'rollup',
      input: './src/dayjs-plugins',
      outDir: './dist'
    }
  ],
  declaration: true,
  clean: true,
  externals: [
    'vue',
    '@yh-ui/hooks',
    '@yh-ui/utils',
    '@yh-ui/theme',
    '@yh-ui/locale',
    // 注意：不再把 dayjs 加入 mkdist externals。
    // dayjs.mjs / dayjs.cjs 由 build:done 钩子通过 esbuild 重新打包，
    // 将 dayjs 内联进去，使产物完全自包含，消费方无需任何 optimizeDeps 配置。
    // dayjs-plugins 的 rollup 入口通过下方正则仍会把 'dayjs' 外部化（该入口
    // 只需内联插件函数，不内联 dayjs 核心）。
    /^dayjs$/,
    'viewerjs',
    'async-validator',
    '@floating-ui/dom'
  ],
  alias: {
    '@yh-ui/theme': resolve(__dirname, '../theme'),
    '@yh-ui/hooks': resolve(__dirname, '../hooks/src'),
    '@yh-ui/utils': resolve(__dirname, '../utils/src'),
    '@yh-ui/locale': resolve(__dirname, '../locale/src')
  },
  hooks: {
    /**
     * 在整个构建完成后，用 esbuild 将 dist/dayjs.mjs 和 dist/dayjs.cjs 重新打包，
     * 把 dayjs (CJS/UMD, 无 ESM default export) 内联进去，产物完全自包含。
     *
     * 根因：dayjs 只有 "main": "dayjs.min.js"，没有 ESM 入口。
     * mkdist 转译后 dayjs.mjs 里保留 `import dayjsObject from "dayjs"`，
     * 在未配置 optimizeDeps 的消费端 Vite 中浏览器直接加载 dayjs.min.js（CJS），
     * 报 "does not provide an export named 'default'"。
     * 内联后消费方零配置，彻底消除此报错。
     */
    async 'build:done'(_ctx) {
      const src = resolve(__dirname, 'src/dayjs.ts')
      const pluginsSrc = resolve(__dirname, 'src/dayjs-plugins.ts')
      await Promise.all([
        esbuild({
          entryPoints: [src],
          bundle: true, // 将 dayjs 内联，不保留裸 import
          format: 'esm',
          outfile: resolve(__dirname, 'dist/dayjs.mjs'),
          platform: 'neutral', // 兼容 SSR / Node
          mainFields: ['module', 'main'], // platform:neutral 不自动读 main 字段，须显式指定
          target: 'es2018',
          allowOverwrite: true,
          legalComments: 'eof' // 保留 dayjs MIT 许可证注释
        }),
        esbuild({
          entryPoints: [src],
          bundle: true,
          format: 'cjs',
          outfile: resolve(__dirname, 'dist/dayjs.cjs'),
          platform: 'neutral',
          mainFields: ['module', 'main'],
          target: 'es2018',
          allowOverwrite: true,
          legalComments: 'eof'
        }),
        esbuild({
          entryPoints: [pluginsSrc],
          bundle: true,
          format: 'esm',
          outfile: resolve(__dirname, 'dist/dayjs-plugins.mjs'),
          platform: 'neutral',
          mainFields: ['module', 'main'],
          target: 'es2018',
          allowOverwrite: true,
          legalComments: 'eof'
        }),
        esbuild({
          entryPoints: [pluginsSrc],
          bundle: true,
          format: 'cjs',
          outfile: resolve(__dirname, 'dist/dayjs-plugins.cjs'),
          platform: 'neutral',
          mainFields: ['module', 'main'],
          target: 'es2018',
          allowOverwrite: true,
          legalComments: 'eof'
        }),
        esbuild({
          entryPoints: [resolve(__dirname, 'src/mermaid.ts')],
          bundle: true,
          format: 'esm',
          outfile: resolve(__dirname, 'dist/mermaid.mjs'),
          platform: 'browser',
          mainFields: ['module', 'main'],
          target: 'es2020',
          allowOverwrite: true,
          minify: true
        }),
        esbuild({
          entryPoints: [resolve(__dirname, 'src/mermaid.ts')],
          bundle: true,
          format: 'cjs',
          outfile: resolve(__dirname, 'dist/mermaid.cjs'),
          platform: 'browser',
          mainFields: ['module', 'main'],
          target: 'es2020',
          allowOverwrite: true,
          minify: true
        })
      ])
    },

    async 'mkdist:entry:options'(_ctx, _entry, options) {
      const customSassLoader = async (input: {
        extension: string
        srcPath?: string
        path: string
        getContents: () => Promise<string> | string
      }) => {
        if (!['.sass', '.scss'].includes(input.extension)) {
          return
        }

        if (input.srcPath && basename(input.srcPath).startsWith('_')) {
          return [{ contents: '', path: input.path, skip: true }]
        }

        const sass = await import('sass')
        const compileString =
          sass.compileString ?? (sass as unknown as { default: typeof sass }).default.compileString
        const contents = await input.getContents()

        return [
          {
            contents: compileString(contents, {
              loadPaths: ['node_modules'],
              ...(input.srcPath ? { url: pathToFileURL(input.srcPath) } : {})
            }).css,
            path: input.path,
            extension: '.css'
          }
        ]
      }

      options.loaders = [customSassLoader as never, vueLoader as never, 'js', 'postcss']
    }
  },
  rollup: {
    emitCJS: true,
    cjsBridge: true,
    output: { exports: 'named' }
  },
  failOnWarn: false
})
