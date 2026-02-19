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
    }
  ],
  declaration: true,
  clean: true,
  externals: ['vue'],
  failOnWarn: false
})
