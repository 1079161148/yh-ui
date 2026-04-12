var __defProp = Object.defineProperty
var __defNormalProp = (obj, key, value) =>
  key in obj
    ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value })
    : (obj[key] = value)
var __publicField = (obj, key, value) =>
  __defNormalProp(obj, typeof key !== 'symbol' ? key + '' : key, value)
class AiInterceptorManager {
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
class AiRequestError extends Error {
  constructor(message, config, code) {
    super(message)
    __publicField(this, 'config')
    __publicField(this, 'code')
    __publicField(this, 'status')
    this.name = 'AiRequestError'
    this.config = config
    this.code = code
  }
}
function createInterceptors() {
  return {
    request: new AiInterceptorManager(),
    response: new AiInterceptorManager()
  }
}
const AI_PROVIDER_KEY = Symbol('YhAiProvider')
export { AI_PROVIDER_KEY, AiInterceptorManager, AiRequestError, createInterceptors }
