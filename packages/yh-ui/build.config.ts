import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
  entries: ['./src/index'],
  declaration: true,
  clean: true,
  failOnWarn: true,
  rollup: {
    emitCJS: true,
    cjsBridge: true
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
