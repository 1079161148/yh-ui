import { defineBuildConfig } from 'unbuild'

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
    }
  ],
  declaration: true,
  clean: true,
  failOnWarn: true,
  externals: []
})
