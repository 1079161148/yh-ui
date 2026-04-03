import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
  entries: [
    './src/index',
    './src/resolver',
    {
      builder: 'copy',
      input: './src',
      outDir: './dist',
      pattern: 'style.css'
    }
  ],
  declaration: true,
  clean: true,
  failOnWarn: false,
  rollup: {
    emitCJS: true,
    cjsBridge: true,
    output: {
      exports: 'named'
    }
  },
  externals: [
    'vue',
    '@yh-ui/components',
    '@yh-ui/hooks',
    '@yh-ui/utils',
    '@yh-ui/theme',
    '@yh-ui/locale'
  ]
})
