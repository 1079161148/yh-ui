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
    }
  ],
  declaration: true,
  clean: true,
  // 构建无警告则失败，保证产物质量
  failOnWarn: true,
  externals: ['vue', '@yh-ui/utils'],
  alias: {
    '@yh-ui/utils': resolve(__dirname, '../utils/src')
  }
})
