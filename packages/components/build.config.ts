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
      pattern: ['**', '!**/__tests__/**'],
      format: 'esm',
      ext: 'mjs',
      declaration: false
    },
    {
      builder: 'mkdist',
      input: './src',
      outDir: './dist',
      pattern: ['**', '!**/__tests__/**'],
      format: 'cjs',
      ext: 'cjs',
      declaration: false
    }
  ],
  declaration: false,
  clean: true,
  externals: [
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
  failOnWarn: false
})
