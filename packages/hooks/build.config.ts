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
      declaration: true,
      // 排除测试目录
      pattern: ['**/*.ts', '!**/__tests__/**']
    },
    {
      builder: 'mkdist',
      input: './src',
      outDir: './dist',
      format: 'cjs',
      ext: 'cjs',
      declaration: false,
      pattern: ['**/*.ts', '!**/__tests__/**']
    },
    'src/index'
  ],
  declaration: true,
  clean: true,
  // 临时允许警告，以观察哪些地方有问题
  failOnWarn: false,
  rollup: {
    emitCJS: true,
    cjsBridge: true,
    output: {
      exports: 'named'
    }
  },
  externals: ['vue', '@yh-ui/utils', '@yh-ui/locale', 'dayjs'],
  alias: {
    '@yh-ui/utils': resolve(__dirname, '../utils/src'),
    '@yh-ui/locale': resolve(__dirname, '../locale/src')
  }
})
