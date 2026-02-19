import { defineBuildConfig } from 'unbuild'
import { resolve } from 'path'

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
  // mkdist 模式不需要 rollup 配置
  // rollup entries 已移除，因为 rollup 无法处理 .vue 文件
  // mkdist 会逐文件转译，完美支持 Vue SFC
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
  failOnWarn: false
})
