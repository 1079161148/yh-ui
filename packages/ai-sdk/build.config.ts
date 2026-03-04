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
  externals: ['vue', '@yh-ui/components', '@langchain/core', 'ai'],
  alias: {
    '@yh-ui/components': resolve(__dirname, '../components/src')
  },
  failOnWarn: false
})
