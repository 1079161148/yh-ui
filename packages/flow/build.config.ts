import { defineBuildConfig } from 'unbuild'
import { resolve } from 'path'
import { pathToFileURL } from 'url'
import { basename } from 'pathe'

export default defineBuildConfig({
  entries: [
    {
      builder: 'mkdist',
      input: './src',
      outDir: './dist',
      format: 'esm',
      ext: 'mjs',
      declaration: true
    },
    {
      builder: 'mkdist',
      input: './src',
      outDir: './dist',
      format: 'cjs',
      ext: 'cjs',
      declaration: false
    }
  ],
  declaration: true,
  clean: true,
  externals: ['vue', '@yh-ui/utils', '@yh-ui/hooks'],
  alias: {
    '@yh-ui/hooks': resolve(__dirname, '../hooks/src'),
    '@yh-ui/utils': resolve(__dirname, '../utils/src')
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
        // _index.scss 等私有标记文件跳过
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

      options.loaders = [customSassLoader as never, 'js', 'vue', 'postcss']
    }
  },
  failOnWarn: true
})
