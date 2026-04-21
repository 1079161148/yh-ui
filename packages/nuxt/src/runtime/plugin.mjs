import { defineNuxtPlugin } from 'nuxt/app'
import { createZIndexCounter, zIndexCounterKey } from '@yh-ui/hooks'
import { vLoading, vYhInfiniteScroll } from '@yh-ui/components'

export default defineNuxtPlugin((nuxtApp) => {
  // Create an isolated z-index counter for each Nuxt app instance.
  const zIndexCounter = createZIndexCounter()

  nuxtApp.vueApp.provide(zIndexCounterKey, zIndexCounter)
  nuxtApp.vueApp.directive('yh-loading', vLoading)
  nuxtApp.vueApp.directive('yh-infinite-scroll', vYhInfiniteScroll)
})
