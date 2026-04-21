import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
  entries: ['src/module', 'src/runtime/plugin'],
  declaration: true,
  clean: true,
  rollup: {
    emitCJS: true
  },
  externals: ['@nuxt/kit', '@nuxt/schema', 'nuxt', '#app', '@yh-ui/hooks', '@yh-ui/components'],
  failOnWarn: true
})
