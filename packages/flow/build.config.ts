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
        srcPath: string
        path: string
        getContents: () => Promise<string> | string
      }) => {
        if (!['.sass', '.scss'].includes(input.extension)) {
          return
        }
        if (basename(input.srcPath).startsWith('_')) {
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
              url: pathToFileURL(input.srcPath)
            }).css,
            path: input.path,
            extension: '.css'
          }
        ]
      }

      options.loaders = [customSassLoader, 'js', 'vue', 'postcss']
    }
  },
  failOnWarn: false
})
