/**
 * 安全拦截器
 * 包含 CSRF 防护和 Token 刷新功能
 */

import type { InternalRequestOptions, RequestResponse, RequestError } from '../types'

/** CSRF 配置 */
export interface CSRFConfig {
  /** CSRF Token Cookie 名称 */
  cookieName?: string
  /** CSRF Token Header 名称 */
  headerName?: string
  /** 获取 Token 的函数 */
  getToken?: () => string | undefined
}

/** Token 刷新配置 */
export interface TokenRefreshConfig {
  /** 401 状态码是否触发刷新 */
  statusCode?: number
  /** 刷新 Token 的函数 */
  refreshToken?: () => Promise<boolean>
  /** 是否正在刷新中 */
  isRefreshing?: () => boolean
  /** 等待刷新的请求队列 */
  pendingRequests?: Array<() => void>
  /** 刷新后的 Header 更新 */
  updateHeaders?: (headers: Record<string, string>) => void
  /** 重试次数 */
  retryTimes?: number
}

/** 安全拦截器选项 */
export interface SecurityInterceptorOptions {
  /** CSRF 配置 */
  csrf?: CSRFConfig | false
  /** Token 刷新配置 */
  tokenRefresh?: TokenRefreshConfig | false
}

/**
 * 创建 CSRF 拦截器
 */
export function createCSRFInterceptor(config: CSRFConfig = {}) {
  const { cookieName = 'XSRF-TOKEN', headerName = 'X-XSRF-TOKEN', getToken } = config

  /**
   * 从 Cookie 获取 CSRF Token
   */
  const getCSRFToken = (): string | undefined => {
    if (getToken) {
      return getToken()
    }

    if (typeof document === 'undefined') return undefined

    const cookies = document.cookie.split(';')
    for (const cookie of cookies) {
      const [name, value] = cookie.trim().split('=')
      if (name === cookieName) {
        return decodeURIComponent(value)
      }
    }
    return undefined
  }

  return {
    /**
     * 请求拦截 - 添加 CSRF Token
     */
    onRequest: (config: InternalRequestOptions): InternalRequestOptions => {
      // 排除不需要 CSRF 的方法
      const safeMethods = ['GET', 'HEAD', 'OPTIONS']
      if (!safeMethods.includes(config.method || 'GET')) {
        const token = getCSRFToken()
        if (token) {
          return {
            ...config,
            headers: {
              ...config.headers,
              [headerName]: token
            }
          }
        }
      }
      return config
    },

    /**
     * 获取 CSRF Token
     */
    getCSRFToken
  }
}

/**
 * 创建 Token 刷新拦截器
 */
export function createTokenRefreshInterceptor(config: TokenRefreshConfig = {}) {
  const {
    statusCode = 401,
    refreshToken,
    isRefreshing = () => false,
    pendingRequests = [],
    updateHeaders,
    retryTimes = 3
  } = config

  // 存储原始请求配置用于重试
  const originalConfigs = new Map<string, InternalRequestOptions>()
  let currentRetryTimes = retryTimes

  return {
    /**
     * 请求拦截
     */
    onRequest: (config: InternalRequestOptions): InternalRequestOptions => {
      // 存储原始配置
      originalConfigs.set(config.requestId!, config)
      return config
    },

    /**
     * 响应拦截 - 处理 401
     */
    onResponseError: async (
      error: RequestError,
      _request: (config: InternalRequestOptions) => Promise<RequestResponse>
    ): Promise<RequestResponse> => {
      const { response, config: errorConfig } = error

      // 检查是否是 401 错误
      if (response?.status !== statusCode) {
        throw error
      }

      // 检查是否还有重试次数
      if (currentRetryTimes <= 0) {
        currentRetryTimes = retryTimes
        throw error
      }

      // 确保 config 存在
      const config = errorConfig
      if (!config) {
        throw error
      }

      // 如果正在刷新，等待刷新完成
      if (isRefreshing()) {
        return new Promise((resolve, reject) => {
          pendingRequests.push(() => {
            // 重试原始请求
            _request(config).then(resolve).catch(reject)
          })
        })
      }

      // 尝试刷新 Token
      if (refreshToken) {
        const refreshed = await refreshToken()

        if (refreshed) {
          // 更新 Headers
          if (updateHeaders && config.headers) {
            const newHeaders = { ...config.headers }
            updateHeaders(newHeaders)
            config.headers = newHeaders
          }

          // 重试原始请求
          currentRetryTimes--
          return _request(config)
        }
      }

      throw error
    },

    /**
     * 重置重试次数
     */
    resetRetryTimes: () => {
      currentRetryTimes = retryTimes
    }
  }
}

/**
 * 创建安全拦截器
 */
export function createSecurityInterceptor(options: SecurityInterceptorOptions = {}) {
  const { csrf = {}, tokenRefresh = {} } = options

  const csrfInterceptor = csrf === false ? null : createCSRFInterceptor(csrf)
  const tokenRefreshInterceptor =
    tokenRefresh === false ? null : createTokenRefreshInterceptor(tokenRefresh)

  return {
    /**
     * 请求拦截
     */
    onRequest: (config: InternalRequestOptions): InternalRequestOptions => {
      let result = config

      // CSRF
      if (csrfInterceptor) {
        result = csrfInterceptor.onRequest(result)
      }

      // Token 刷新
      if (tokenRefreshInterceptor) {
        result = tokenRefreshInterceptor.onRequest(result)
      }

      return result
    },

    /**
     * 获取 CSRF Token
     */
    getCSRFToken: csrfInterceptor?.getCSRFToken,

    /**
     * 重置 Token 刷新状态
     */
    resetTokenRefresh: tokenRefreshInterceptor?.resetRetryTimes
  }
}
