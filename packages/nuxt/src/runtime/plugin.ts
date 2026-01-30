import { defineNuxtPlugin } from '#app'
import { createZIndexCounter, zIndexCounterKey } from '@yh-ui/hooks'
import { vLoading } from '@yh-ui/components'

export default defineNuxtPlugin((nuxtApp) => {
  // 为每个请求创建独立的 z-index 计数器
  const zIndexCounter = createZIndexCounter()

  // 在 Vue 应用中提供计数器
  nuxtApp.vueApp.provide(zIndexCounterKey, zIndexCounter)

  // 注册全局指令
  nuxtApp.vueApp.directive('loading', vLoading)
})
