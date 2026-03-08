import { defineBuildConfig } from 'unbuild'
import { resolve } from 'path'

export default defineBuildConfig({
  entries: ['src/index'],
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
  externals: ['vue', '@yh-ui/utils'],
  alias: {
    '@yh-ui/utils': resolve(__dirname, '../utils/src')
  }
})
