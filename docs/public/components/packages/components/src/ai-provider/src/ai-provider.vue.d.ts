type __VLS_Props = {
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
  typewriter?: {
    enabled?: boolean
    charsPerFrame?: number
  }
  /** 请求超时时间（毫秒） */
  timeout?: number
  /** 是否允许携带凭证 */
  withCredentials?: boolean
  /** 请求模式 */
  mode?: 'cors' | 'no-cors' | 'same-origin'
  /** 缓存模式 */
  cache?: 'default' | 'no-store' | 'reload' | 'no-cache' | 'force-cache' | 'only-if-cached'
}
declare const interceptors: {
  request: import('./ai-provider').AiInterceptorManager<
    import('./ai-provider').AiRequestInterceptor
  >
  response: import('./ai-provider').AiInterceptorManager<
    import('./ai-provider').AiResponseInterceptor
  >
}
declare var __VLS_1: {}
type __VLS_Slots = {} & {
  default?: (props: typeof __VLS_1) => any
}
declare const __VLS_component: import('vue').DefineComponent<
  __VLS_Props,
  {
    /**
     * 添加请求拦截器
     */
    addRequestInterceptor: (
      interceptor: Parameters<(typeof interceptors.request)['use']>[0]
    ) => number
    /**
     * 添加响应拦截器
     */
    addResponseInterceptor: (
      interceptor: Parameters<(typeof interceptors.response)['use']>[0]
    ) => number
    /**
     * 移除请求拦截器
     */
    removeRequestInterceptor: (id: number) => void
    /**
     * 移除响应拦截器
     */
    removeResponseInterceptor: (id: number) => void
    /**
     * 清空所有拦截器
     */
    clearInterceptors: () => void
  },
  {},
  {},
  {},
  import('vue').ComponentOptionsMixin,
  import('vue').ComponentOptionsMixin,
  {},
  string,
  import('vue').PublicProps,
  Readonly<__VLS_Props> & Readonly<{}>,
  {
    mode: 'cors' | 'no-cors' | 'same-origin'
    typewriter: {
      enabled?: boolean
      charsPerFrame?: number
    }
    systemPrompt: string
    headers: Record<string, string>
    withCredentials: boolean
    baseUrl: string
    token: string
    userAvatar: string
    assistantAvatar: string
    userName: string
    assistantName: string
    timeout: number
    cache: 'default' | 'no-store' | 'reload' | 'no-cache' | 'force-cache' | 'only-if-cached'
  },
  {},
  {},
  {},
  string,
  import('vue').ComponentProvideOptions,
  false,
  {},
  any
>
declare const _default: __VLS_WithSlots<typeof __VLS_component, __VLS_Slots>
export default _default
type __VLS_WithSlots<T, S> = T & {
  new (): {
    $slots: S
  }
}
