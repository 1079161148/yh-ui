// docs/public/codesandbox-runtime/components/ai-provider/src/ai-provider.js
import { renderSlot as _renderSlot } from 'vue'
import { provide } from 'vue'

// docs/public/codesandbox-runtime/components/ai-provider/src/ai-provider-meta.js
var __defProp = Object.defineProperty
var __defNormalProp = (obj, key, value) =>
  key in obj
    ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value })
    : (obj[key] = value)
var __publicField = (obj, key, value) =>
  __defNormalProp(obj, typeof key !== 'symbol' ? key + '' : key, value)
var AiInterceptorManager = class {
  constructor() {
    __publicField(this, 'interceptors', [])
  }
  /**
   * 添加拦截器
   */
  use(interceptor) {
    this.interceptors.push(interceptor)
    return this.interceptors.length - 1
  }
  /**
   * 移除拦截器
   */
  eject(id) {
    if (this.interceptors[id]) {
      this.interceptors[id] = null
    }
  }
  /**
   * 清空所有拦截器
   */
  clear() {
    this.interceptors = []
  }
  /**
   * 遍历所有拦截器
   */
  forEach(fn) {
    this.interceptors.forEach((interceptor, index) => {
      if (interceptor !== null && interceptor !== void 0) {
        fn(interceptor, index)
      }
    })
  }
  /**
   * 获取所有拦截器
   */
  getAll() {
    return [...this.interceptors]
  }
}
function createInterceptors() {
  return {
    request: new AiInterceptorManager(),
    response: new AiInterceptorManager()
  }
}
var AI_PROVIDER_KEY = Symbol('YhAiProvider')

// docs/public/codesandbox-runtime/components/ai-provider/src/ai-provider.js
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return _renderSlot(_ctx.$slots, 'default')
}
var __sfc__ = /* @__PURE__ */ Object.assign(
  {
    name: 'YhAiProvider'
  },
  {
    __name: 'ai-provider',
    props: {
      baseUrl: { type: String, required: false, default: '' },
      token: { type: String, required: false, default: '' },
      headers: { type: Object, required: false, default: () => ({}) },
      userAvatar: { type: String, required: false, default: '' },
      assistantAvatar: { type: String, required: false, default: '' },
      userName: { type: String, required: false, default: 'User' },
      assistantName: { type: String, required: false, default: 'Assistant' },
      systemPrompt: { type: String, required: false, default: '' },
      typewriter: {
        type: Object,
        required: false,
        default: () => ({ enabled: true, charsPerFrame: 1 })
      },
      timeout: { type: Number, required: false, default: 3e4 },
      withCredentials: { type: Boolean, required: false, default: false },
      mode: { type: String, required: false, default: 'cors' },
      cache: { type: String, required: false, default: 'default' }
    },
    setup(__props, { expose: __expose }) {
      const props = __props
      const interceptors = createInterceptors()
      const config = {
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
      __expose({
        /**
         * 添加请求拦截器
         */
        addRequestInterceptor: (interceptor) => {
          return interceptors.request.use(interceptor)
        },
        /**
         * 添加响应拦截器
         */
        addResponseInterceptor: (interceptor) => {
          return interceptors.response.use(interceptor)
        },
        /**
         * 移除请求拦截器
         */
        removeRequestInterceptor: (id) => {
          interceptors.request.eject(id)
        },
        /**
         * 移除响应拦截器
         */
        removeResponseInterceptor: (id) => {
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
      const __returned__ = {
        props,
        interceptors,
        config,
        provide,
        get AI_PROVIDER_KEY() {
          return AI_PROVIDER_KEY
        },
        get createInterceptors() {
          return createInterceptors
        }
      }
      Object.defineProperty(__returned__, '__isScriptSetup', { enumerable: false, value: true })
      return __returned__
    }
  }
)
__sfc__.render = render
var stdin_default = __sfc__
export { stdin_default as default }
