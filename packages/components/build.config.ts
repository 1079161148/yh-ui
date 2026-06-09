import { defineBuildConfig } from 'unbuild'
import { resolve } from 'path'
import { pathToFileURL } from 'url'
import { basename } from 'pathe'
import { vueLoader } from 'vue-sfc-transformer/mkdist'

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
    // 使用正则精确匹配，避免 unbuild 的前缀匹配逻辑把 'dayjs/plugin/*' 也外部化。
    // 字符串 'dayjs' 会匹配所有以 'dayjs/' 开头的路径（包括 dayjs/plugin/*），
    // 导致 rollup 无法将插件代码内联进 dayjs-plugins.mjs。
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
