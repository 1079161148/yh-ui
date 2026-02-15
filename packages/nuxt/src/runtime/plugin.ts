import { defineNuxtPlugin } from 'nuxt/app'
import type { NuxtApp } from 'nuxt/app'
import { createZIndexCounter, zIndexCounterKey } from '@yh-ui/hooks'
import { vLoading, vYhInfiniteScroll } from '@yh-ui/components'

export default defineNuxtPlugin((nuxtApp: NuxtApp) => {
  // 为每个请求创建独立的 z-index 计数器
  const zIndexCounter = createZIndexCounter()

  // 在 Vue 应用中提供计数器
  nuxtApp.vueApp.provide(zIndexCounterKey, zIndexCounter)

  // 注册全局指令
  nuxtApp.vueApp.directive('yh-loading', vLoading)
  nuxtApp.vueApp.directive('yh-infinite-scroll', vYhInfiniteScroll)
})
