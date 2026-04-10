import { inject, computed, unref } from 'vue'
const configProviderContextKey = Symbol('configProviderContextKey')
const useConfig = () => {
  const configRef = inject(configProviderContextKey, null)
  const globalSize = computed(() => {
    const config = unref(configRef)
    return (config == null ? void 0 : config.size) || 'default'
  })
  const globalZIndex = computed(() => {
    const config = unref(configRef)
    return (config == null ? void 0 : config.zIndex) || 2e3
  })
  const globalLocale = computed(() => {
    const config = unref(configRef)
    return config == null ? void 0 : config.locale
  })
  return {
    config: configRef,
    globalSize,
    globalZIndex,
    globalLocale
  }
}
export { configProviderContextKey, useConfig }
