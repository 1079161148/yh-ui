import { PluginManager, Request, type RequestResponse, type RequestError } from '@yh-ui/request'
import { loggingPlugin, errorHandlerPlugin, retryPlugin } from '@yh-ui/request'
import { useTabsStore } from '@/stores/tabs'
import { useUserStore } from '@/stores/user'

const request = new Request({
  defaultOptions: {
    baseURL: '/api',
    timeout: 30000,
    retry: false,
    retryTimes: 3,
    retryDelay: 1000
  }
})

const pluginManager = new PluginManager()

pluginManager.init(request)
pluginManager.use(loggingPlugin)
pluginManager.use(retryPlugin, { retries: 3, retryDelay: 1000 })
pluginManager.use(errorHandlerPlugin, {
  onError: (error: RequestError) => {
    if (error.response?.status === 401) {
      const redirect = `${window.location.pathname}${window.location.search}${window.location.hash}`
      const tabsStore = useTabsStore()
      const userStore = useUserStore()
      tabsStore.removeAllTabs()
      userStore.clearUser()
      window.location.href = `/login?redirect=${encodeURIComponent(redirect)}`
      return
    }
    if (error.response?.status === 403) {
      console.warn('[Request] 权限不足:', error.config?.url)
    }
  }
})

request.interceptors.request.use((config) => {
  const userStore = useUserStore()
  if (userStore.token) {
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${userStore.token}`
    }
  }
  return config
})

request.interceptors.response.use(
  (response: RequestResponse) => {
    const data = response.data as Record<string, unknown>
    if (data && data.code !== undefined && data.code !== 0 && data.code !== 200) {
      return Promise.reject(new Error((data.message as string) || '请求失败'))
    }
    return response
  },
  (error: RequestError) => {
    return Promise.reject(error)
  }
)

export default request
