/**
 * 插件系统
 * 支持按需加载和树摇
 */

import { Request } from './request'
import type { InternalRequestOptions, RequestOptions, RequestResponse, RequestError } from './types'

/** 插件接口 */
export interface RequestPlugin {
  /** 插件名称 */
  name: string
  /** 插件版本 */
  version?: string
  /** 安装插件 */
  install: (request: Request, options?: Record<string, unknown>) => void
  /** 卸载插件 */
  uninstall?: (request: Request) => void
}

/** 插件实例 */
export interface PluginInstance {
  /** 插件 */
  plugin: RequestPlugin
  /** 选项 */
  options?: Record<string, unknown>
  /** 安装时间 */
  installedAt: number
}

/** 请求生命周期钩子 */
export interface RequestLifecycleHooks {
  /** 请求发送前 */
  onRequest?: (
    config: InternalRequestOptions
  ) => InternalRequestOptions | Promise<InternalRequestOptions>
  /** 请求发送后（成功） */
  onResponse?: <T>(response: RequestResponse<T>) => RequestResponse<T> | Promise<RequestResponse<T>>
  /** 请求发送后（错误） */
  onError?: (error: Error) => Error | Promise<Error>
  /** 请求完成（无论成功或失败） */
  onFinally?: () => void
}

/**
 * 插件管理器
 */
export class PluginManager {
  private plugins: Map<string, PluginInstance> = new Map()
  private request: Request | null = null
  private lifecycleHooks: RequestLifecycleHooks = {}

  /**
   * 初始化插件管理器
   */
  init(request: Request): void {
    this.request = request
  }

  /**
   * 注册插件
   */
  use(plugin: RequestPlugin, options?: Record<string, unknown>): this {
    if (this.plugins.has(plugin.name)) {
      console.warn(`Plugin ${plugin.name} is already installed`)
      return this
    }

    if (!this.request) {
      throw new Error('PluginManager must be initialized with a Request instance')
    }

    // 安装插件
    plugin.install(this.request, options)

    // 记录插件
    this.plugins.set(plugin.name, {
      plugin,
      options,
      installedAt: Date.now()
    })

    return this
  }

  /**
   * 卸载插件
   */
  uninstall(name: string): boolean {
    const instance = this.plugins.get(name)
    if (!instance) return false

    // 调用卸载方法
    if (instance.plugin.uninstall && this.request) {
      instance.plugin.uninstall(this.request)
    }

    this.plugins.delete(name)
    return true
  }

  /**
   * 获取插件
   */
  get(name: string): PluginInstance | undefined {
    return this.plugins.get(name)
  }

  /**
   * 获取所有插件
   */
  getAll(): PluginInstance[] {
    return Array.from(this.plugins.values())
  }

  /**
   * 检查插件是否已安装
   */
  has(name: string): boolean {
    return this.plugins.has(name)
  }

  /**
   * 清除所有插件
   */
  clear(): void {
    this.plugins.forEach((instance, name) => {
      this.uninstall(name)
    })
  }

  /**
   * 注册生命周期钩子
   */
  registerHooks(hooks: RequestLifecycleHooks): void {
    this.lifecycleHooks = {
      ...this.lifecycleHooks,
      ...hooks
    }
  }

  /**
   * 获取生命周期钩子
   */
  getHooks(): RequestLifecycleHooks {
    return { ...this.lifecycleHooks }
  }
}

// ==================== 内置插件 ====================

/**
 * 日志插件
 */
export const loggingPlugin: RequestPlugin = {
  name: 'logging',
  version: '1.0.0',
  install(request) {
    request.interceptors.request.use((config: InternalRequestOptions) => {
      console.log(`[YH-Request] → ${config.method} ${config.url}`)
      return config
    })

    request.interceptors.response.use((response: RequestResponse) => {
      console.log(`[YH-Request] ← ${response.response.status} ${response.config.url}`)
      return response
    })
  }
}

/**
 * 缓存插件
 */
export const cachePlugin: RequestPlugin = {
  name: 'cache',
  version: '1.0.0',
  install(
    request,
    options?: {
      getCache?: (key: string) => unknown
      setCache?: (key: string, value: unknown) => void
    }
  ) {
    request.interceptors.request.use((config: InternalRequestOptions) => {
      // GET 请求检查缓存
      if (config.method === 'GET' && options?.getCache) {
        const key = config.url || ''
        const cached = options.getCache(key)
        if (cached) {
          // 返回缓存数据（这里简化处理，实际需要更复杂的逻辑）
          console.log('[YH-Request Cache] Cache hit:', key)
        }
      }
      return config
    })

    request.interceptors.response.use((response: RequestResponse) => {
      // 缓存响应数据
      if (response.config.method === 'GET' && options?.setCache) {
        const key = response.config.url || ''
        options.setCache(key, response.data)
      }
      return response
    })
  }
}

/**
 * 错误处理插件
 */
export const errorHandlerPlugin: RequestPlugin = {
  name: 'errorHandler',
  version: '1.0.0',
  install(request, options?: { onError?: (error: Error) => void }) {
    request.interceptors.response.use(
      (response: RequestResponse) => response,
      (error: RequestError) => {
        if (options?.onError) {
          options.onError(error)
        }
        return Promise.reject(error)
      }
    )
  }
}

/**
 * 重试插件
 */
export const retryPlugin: RequestPlugin = {
  name: 'retry',
  version: '1.0.0',
  install(request, options?: { retries?: number; retryDelay?: number }) {
    const retries = options?.retries || 3
    const retryDelay = options?.retryDelay || 1000

    request.interceptors.response.use(
      (response: RequestResponse) => response,
      async (error: RequestError) => {
        const config = error.config
        if (!config) return Promise.reject(error)

        // @ts-ignore
        const currentRetries = config._retryCount || 0

        if (currentRetries < retries) {
          // @ts-ignore
          config._retryCount = currentRetries + 1
          await new Promise((resolve) => setTimeout(resolve, retryDelay))
          return request.request(config as unknown as RequestOptions & { url: string })
        }

        return Promise.reject(error)
      }
    )
  }
}

/**
 * 预定义插件集合
 */
export const builtInPlugins = {
  logging: loggingPlugin,
  cache: cachePlugin,
  errorHandler: errorHandlerPlugin,
  retry: retryPlugin
}
