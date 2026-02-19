import { defineBuildConfig } from 'unbuild'

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
    },
    'src/index'
  ],
  declaration: true,
  clean: true,
  rollup: {
    emitCJS: true,
    cjsBridge: true,
    output: {
      exports: 'named'
    }
  },
  externals: ['vue', 'dayjs', 'xlsx']
})
