import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
  entries: ['./src/index'],
  declaration: true,
  clean: true,
  failOnWarn: false,
  rollup: {
    emitCJS: false
  },
  externals: ['vue', '@yh-ui/utils', '@yh-ui/locale', 'dayjs']
})
