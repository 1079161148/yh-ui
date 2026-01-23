// @ts-ignore
import { defineNuxtPlugin, provide } from '#app'
import { createZIndexCounter, zIndexCounterKey } from '@yh-ui/hooks'

export default defineNuxtPlugin((nuxtApp: { vueApp: { provide: Function } }) => {
  // 为每个请求创建独立的 z-index 计数器
  const zIndexCounter = createZIndexCounter()

  // 在 Vue 应用中提供计数器
  nuxtApp.vueApp.provide(zIndexCounterKey, zIndexCounter)
})
