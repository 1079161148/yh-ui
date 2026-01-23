import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
  entries: ['src/module'],
  declaration: true,
  clean: true,
  rollup: {
    emitCJS: true
  },
  externals: ['@nuxt/kit', '@nuxt/schema', 'nuxt', '#app'],
  failOnWarn: false
})
