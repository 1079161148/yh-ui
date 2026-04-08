"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AiRequestError = exports.AiInterceptorManager = exports.AI_PROVIDER_KEY = void 0;
exports.createInterceptors = createInterceptors;
class AiInterceptorManager {
  interceptors = [];
  /**
   * 添加拦截器
   */
  use(interceptor) {
    this.interceptors.push(interceptor);
    return this.interceptors.length - 1;
  }
  /**
   * 移除拦截器
   */
  eject(id) {
    if (this.interceptors[id]) {
      this.interceptors[id] = null;
    }
  }
  /**
   * 清空所有拦截器
   */
  clear() {
    this.interceptors = [];
  }
  /**
   * 遍历所有拦截器
   */
  forEach(fn) {
    this.interceptors.forEach((interceptor, index) => {
      if (interceptor !== null && interceptor !== void 0) {
        fn(interceptor, index);
      }
    });
  }
  /**
   * 获取所有拦截器
   */
  getAll() {
    return [...this.interceptors];
  }
}
exports.AiInterceptorManager = AiInterceptorManager;
class AiRequestError extends Error {
  config;
  code;
  status;
  constructor(message, config, code) {
    super(message);
    this.name = "AiRequestError";
    this.config = config;
    this.code = code;
  }
}
exports.AiRequestError = AiRequestError;
function createInterceptors() {
  return {
    request: new AiInterceptorManager(),
    response: new AiInterceptorManager()
  };
}
const AI_PROVIDER_KEY = exports.AI_PROVIDER_KEY = Symbol("YhAiProvider");