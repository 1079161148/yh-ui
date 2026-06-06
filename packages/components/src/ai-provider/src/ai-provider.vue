<script setup lang="ts">
import { provide } from 'vue'
import { AI_PROVIDER_KEY, type AiProviderConfig, createInterceptors } from './ai-provider'

defineOptions({
  name: 'YhAiProvider'
})

const props = withDefaults(
  defineProps<{
    /** 全局 AI 接口基础 URL */
    baseUrl?: string
    /** 鉴权 Token */
    token?: string
    /** 全局请求头 */
    headers?: Record<string, string>
    /** 用户头像 URL */
    userAvatar?: string
    /** 助手头像 URL */
    assistantAvatar?: string
    /** 用户显示名称 */
    userName?: string
    /** 助手显示名称 */
    assistantName?: string
    /** 全局系统 Prompt */
    systemPrompt?: string
    /** 打字机配置 */
    typewriter?: { enabled?: boolean; charsPerFrame?: number }
    /** 请求超时时间（毫秒） */
    timeout?: number
    /** 是否允许携带凭证 */
    withCredentials?: boolean
    /** 请求模式 */
    mode?: 'cors' | 'no-cors' | 'same-origin'
    /** 缓存模式 */
    cache?: 'default' | 'no-store' | 'reload' | 'no-cache' | 'force-cache' | 'only-if-cached'
  }>(),
  {
    baseUrl: '',
    token: '',
    headers: () => ({}),
    userAvatar: '',
    assistantAvatar: '',
    userName: 'User',
    assistantName: 'Assistant',
    systemPrompt: '',
    typewriter: () => ({ enabled: true, charsPerFrame: 1 }),
    timeout: 30000,
    withCredentials: false,
    mode: 'cors',
    cache: 'default'
  }
)

// 创建拦截器管理器
const interceptors = createInterceptors()

const config: AiProviderConfig = {
  baseUrl: props.baseUrl,
  token: props.token,
  headers: props.headers,
  userAvatar: props.userAvatar,
  assistantAvatar: props.assistantAvatar,
  userName: props.userName,
  assistantName: props.assistantName,
  systemPrompt: props.systemPrompt,
  typewriter: props.typewriter,
  timeout: props.timeout,
  withCredentials: props.withCredentials,
  mode: props.mode,
  cache: props.cache,
  // 暴露拦截器管理器
  requestInterceptors: interceptors.request,
  responseInterceptors: interceptors.response
}

provide(AI_PROVIDER_KEY, config)

// 暴露拦截器供外部使用
defineExpose({
  /**
   * 添加请求拦截器
   */
  addRequestInterceptor: (interceptor: Parameters<(typeof interceptors.request)['use']>[0]) => {
    return interceptors.request.use(interceptor)
  },
  /**
   * 添加响应拦截器
   */
  addResponseInterceptor: (interceptor: Parameters<(typeof interceptors.response)['use']>[0]) => {
    return interceptors.response.use(interceptor)
  },
  /**
   * 移除请求拦截器
   */
  removeRequestInterceptor: (id: number) => {
    interceptors.request.eject(id)
  },
  /**
   * 移除响应拦截器
   */
  removeResponseInterceptor: (id: number) => {
    interceptors.response.eject(id)
  },
  /**
   * 清空所有拦截器
   */
  clearInterceptors: () => {
    interceptors.request.clear()
    interceptors.response.clear()
  }
})
</script>

<template>
  <slot></slot>
</template>
