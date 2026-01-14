import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
  entries: ['./src/index'],
  declaration: true,
  clean: true,
  rollup: {
    emitCJS: true
  },
  externals: ['vue', '@yh-ui/components', '@yh-ui/hooks', '@yh-ui/utils', '@yh-ui/theme']
})
