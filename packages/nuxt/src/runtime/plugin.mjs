import { defineNuxtPlugin } from 'nuxt/app'
import { vLoading, vYhInfiniteScroll } from '@yh-ui/components'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive('yh-loading', vLoading)
  nuxtApp.vueApp.directive('yh-infinite-scroll', vYhInfiniteScroll)
})
