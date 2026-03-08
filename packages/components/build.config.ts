import { defineBuildConfig } from 'unbuild'
import { resolve } from 'path'
import { pathToFileURL } from 'url'
import { existsSync, readFileSync } from 'fs'
import { basename } from 'pathe'

const themeStylesDir = resolve(__dirname, '../theme/src/styles')

/**
 * 自定义 SASS Importer
 * 使用虚拟 URL Scheme (yh-ui:) 彻底解决 Windows 下 junction 嵌套和相对路径加载问题。
 */
const yhUiThemeImporter = {
  canonicalize(url: string): URL | null {
    // 1. 处理入口引入，如 @use '@yh-ui/theme/styles/mixins/mixins'
    let subPath = ''
    if (url.startsWith('@yh-ui/theme/styles/')) {
      subPath = url.slice('@yh-ui/theme/styles/'.length)
    }
    // 2. 处理虚拟路径内部的相对引入，例如在虚拟 URL yh-ui:theme/styles/mixins/mixins.scss
    // 中引入 ../variables，会被 Sass 解析为 yh-ui:theme/styles/variables
    else if (url.startsWith('yh-ui:theme/styles/')) {
      subPath = url.slice('yh-ui:theme/styles/'.length)
    } else {
      return null
    }

    // 清理子路径
    subPath = subPath.replace(/\.scss$/, '').replace(/\.sass$/, '')
    const dir = resolve(
      themeStylesDir,
      subPath.includes('/') ? subPath.slice(0, subPath.lastIndexOf('/')) : ''
    )
    const name = subPath.includes('/') ? subPath.slice(subPath.lastIndexOf('/') + 1) : subPath

    // 尝试寻找存在的物理文件
    const candidates = [
      resolve(themeStylesDir, `${subPath}.scss`),
      resolve(themeStylesDir, `${subPath}.sass`),
      resolve(dir, `_${name}.scss`),
      resolve(dir, `_${name}.sass`),
      resolve(themeStylesDir, subPath, 'index.scss'),
      resolve(themeStylesDir, subPath, '_index.scss')
    ]

    for (const candidate of candidates) {
      if (existsSync(candidate)) {
        // 返回虚拟 URL 且将真实物理路径作为 query 传递给 load 函数
        // 这样可以避免 Sass 默认的 file:// URL 处理机制带来的一些跨目录引用问题
        return new URL(`yh-ui:theme/styles/${subPath}?path=${encodeURIComponent(candidate)}`)
      }
    }
    return null
  },

  load(canonicalUrl: URL): { contents: string; syntax: 'scss' | 'sass' } | null {
    if (canonicalUrl.protocol !== 'yh-ui:') {
      return null
    }
    const filePath = canonicalUrl.searchParams.get('path')
    if (!filePath) return null

    try {
      return {
        contents: readFileSync(filePath, 'utf8'),
        syntax: filePath.endsWith('.sass') ? 'sass' : 'scss'
      }
    } catch {
      return null
    }
  }
}

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
              importers: [yhUiThemeImporter],
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
