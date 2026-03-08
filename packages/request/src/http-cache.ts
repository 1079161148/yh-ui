/**
 * HTTP 缓存协议支持
 * 支持 ETag、Last-Modified、Cache-Control 等 HTTP 缓存机制
 */

import type { InternalRequestOptions, RequestResponse } from './types'

// ==================== 类型定义 ====================

/** HTTP 缓存控制选项 */
export interface HttpCacheOptions {
  /** 启用条件请求 */
  enabled?: boolean
  /** ETag 头名称 */
  etagHeader?: string
  /** Last-Modified 头名称 */
  lastModifiedHeader?: string
  /** 缓存过期时间 (ms) */
  maxAge?: number
  /** 是否启用 stale-while-revalidate */
  staleWhileRevalidate?: boolean
  /** 备用缓存时间 (当使用 stale-while-revalidate 时) */
  staleTime?: number
}

/** 缓存条目 */
export interface HttpCacheEntry {
  /** ETag */
  etag?: string
  /** Last-Modified */
  lastModified?: string
  /** 缓存数据 */
  data: unknown
  /** 过期时间 */
  expireTime: number
  /** 创建时间 */
  createTime: number
  /** 响应头 */
  headers?: Record<string, string>
}

/** 条件请求响应 */
export interface ConditionalResponse {
  /** 是否有修改 */
  isModified: boolean
  /** 响应数据 */
  data?: unknown
  /** 缓存条目 */
  entry?: HttpCacheEntry
}

// ==================== HTTP 缓存类 ====================

/**
 * HTTP 缓存管理器
 * 支持 HTTP 条件请求 (ETag、Last-Modified)
 */
export class HttpCache {
  private cache = new Map<string, HttpCacheEntry>()
  private options: Required<HttpCacheOptions>

  constructor(options: HttpCacheOptions = {}) {
    this.options = {
      enabled: options.enabled ?? true,
      etagHeader: options.etagHeader ?? 'ETag',
      lastModifiedHeader: options.lastModifiedHeader ?? 'Last-Modified',
      maxAge: options.maxAge ?? 5 * 60 * 1000, // 5 分钟
      staleWhileRevalidate: options.staleWhileRevalidate ?? false,
      staleTime: options.staleTime ?? 60 * 1000 // 1 分钟
    }
  }

  /**
   * 从响应中提取缓存信息
   */
  extractCacheInfo(response: Response): { etag?: string; lastModified?: string } {
    const etag = response.headers.get(this.options.etagHeader) || undefined
    const lastModified = response.headers.get(this.options.lastModifiedHeader) || undefined
    return { etag, lastModified }
  }

  /**
   * 生成缓存键
   */
  private getCacheKey(config: InternalRequestOptions): string {
    return `${config.method}:${config.fullPath || config.url}`
  }

  /**
   * 获取缓存
   */
  get(key: string): HttpCacheEntry | undefined {
    const entry = this.cache.get(key)
    if (!entry) return undefined

    // 检查是否过期
    const now = Date.now()
    if (entry.expireTime && now > entry.expireTime) {
      this.cache.delete(key)
      return undefined
    }

    return entry
  }

  /**
   * 设置缓存
   */
  set(key: string, data: unknown, response: Response): void {
    const { etag, lastModified } = this.extractCacheInfo(response)
    const now = Date.now()

    // 解析 Cache-Control
    const cacheControl = response.headers.get('Cache-Control')
    let maxAge = this.options.maxAge

    if (cacheControl) {
      const maxAgeMatch = cacheControl.match(/max-age=(\d+)/)
      if (maxAgeMatch) {
        maxAge = parseInt(maxAgeMatch[1], 10) * 1000
      }
      // 处理 no-cache，表示需要每次验证
      if (cacheControl.includes('no-cache')) {
        maxAge = 0
      }
    }

    const entry: HttpCacheEntry = {
      etag,
      lastModified,
      data,
      expireTime: maxAge > 0 ? now + maxAge : now,
      createTime: now
    }

    this.cache.set(key, entry)
  }

  /**
   * 构建条件请求头
   */
  buildConditionalHeaders(config: InternalRequestOptions): Record<string, string> {
    const key = this.getCacheKey(config)
    const entry = this.get(key)
    const headers: Record<string, string> = {}

    if (entry) {
      // 添加 If-None-Match (ETag)
      if (entry.etag) {
        headers['If-None-Match'] = entry.etag
      }
      // 添加 If-Modified-Since (Last-Modified)
      if (entry.lastModified) {
        headers['If-Modified-Since'] = entry.lastModified
      }
    }

    return headers
  }

  /**
   * 处理条件响应
   */
  handleConditionalResponse(
    config: InternalRequestOptions,
    response: Response,
    data: unknown
  ): ConditionalResponse {
    const key = this.getCacheKey(config)
    const entry = this.get(key)

    // 304 Not Modified - 使用缓存
    if (response.status === 304) {
      if (entry) {
        return {
          isModified: false,
          data: entry.data,
          entry
        }
      }
    }

    // 有修改，更新缓存
    this.set(key, data, response)

    return {
      isModified: true,
      data
    }
  }

  /**
   * 获取缓存数据（可能返回过期数据用于 stale-while-revalidate）
   */
  getWithFallback(key: string): { data: unknown; isStale: boolean } | undefined {
    const entry = this.get(key)
    if (!entry) return undefined

    const now = Date.now()
    const isStale = !!(entry.expireTime && now > entry.expireTime)

    return {
      data: entry.data,
      isStale
    }
  }

  /**
   * 删除缓存
   */
  delete(key: string): boolean {
    return this.cache.delete(key)
  }

  /**
   * 清空缓存
   */
  clear(): void {
    this.cache.clear()
  }

  /**
   * 获取缓存大小
   */
  size(): number {
    return this.cache.size
  }

  /**
   * 清理过期缓存
   */
  cleanup(): void {
    const now = Date.now()
    for (const [key, entry] of this.cache.entries()) {
      if (entry.expireTime && now > entry.expireTime) {
        this.cache.delete(key)
      }
    }
  }
}

// ==================== 缓存拦截器 ====================

/**
 * 创建 HTTP 缓存拦截器
 */
export function createHttpCacheInterceptor(options: HttpCacheOptions = {}) {
  const cache = new HttpCache(options)

  return {
    /**
     * 请求拦截 - 添加条件请求头
     */
    onRequest: (config: InternalRequestOptions): InternalRequestOptions => {
      if (!options.enabled) return config

      // 只对 GET 请求启用缓存
      if (config.method !== 'GET') return config

      const conditionalHeaders = cache.buildConditionalHeaders(config)

      return {
        ...config,
        headers: {
          ...config.headers,
          ...conditionalHeaders
        }
      }
    },

    /**
     * 响应拦截 - 处理条件响应
     */
    onResponse: <T>(response: RequestResponse<T>): RequestResponse<T> => {
      if (!options.enabled) return response

      // 只对 GET 请求处理缓存
      if (response.config.method !== 'GET') return response

      // 304 响应不包含数据，需要从缓存获取
      if (response.response.status === 304) {
        const key = `${response.config.method}:${response.config.fullPath || response.config.url}`
        const entry = cache.get(key)

        if (entry) {
          return {
            ...response,
            data: entry.data as T
          }
        }
      }

      // 存储响应数据
      cache.set(
        `${response.config.method}:${response.config.fullPath || response.config.url}`,
        response.data,
        response.response
      )

      return response
    },

    /**
     * 获取缓存实例
     */
    getCache: () => cache
  }
}

// ==================== 全局缓存实例 ====================

/**
 * 全局 HTTP 缓存实例
 */
export const httpCache = new HttpCache()

/**
 * 创建条件请求拦截器（使用全局缓存）
 */
export function createConditionalRequestInterceptor(options: HttpCacheOptions = {}) {
  return createHttpCacheInterceptor({ ...options })
}

// ==================== 便捷函数 ====================

/**
 * 解析 Cache-Control 头
 */
export function parseCacheControl(header: string | null): {
  maxAge?: number
  noCache: boolean
  noStore: boolean
  mustRevalidate: boolean
  isPublic: boolean
  isPrivate: boolean
} {
  if (!header)
    return {
      noCache: false,
      noStore: false,
      mustRevalidate: false,
      isPublic: false,
      isPrivate: false
    }

  const result: {
    maxAge?: number
    noCache: boolean
    noStore: boolean
    mustRevalidate: boolean
    isPublic: boolean
    isPrivate: boolean
  } = {
    noCache: false,
    noStore: false,
    mustRevalidate: false,
    isPublic: false,
    isPrivate: false
  }

  // max-age
  const maxAgeMatch = header.match(/max-age=(\d+)/)
  if (maxAgeMatch) {
    result.maxAge = parseInt(maxAgeMatch[1], 10)
  }

  // 布尔标志
  if (header.includes('no-cache')) result.noCache = true
  if (header.includes('no-store')) result.noStore = true
  if (header.includes('must-revalidate')) result.mustRevalidate = true
  if (header.includes('public')) result.isPublic = true
  if (header.includes('private')) result.isPrivate = true

  return result
}

/**
 * 判断响应是否可以缓存
 */
export function isResponseCacheable(response: Response): boolean {
  const cacheControl = parseCacheControl(response.headers.get('Cache-Control'))

  // no-store 明确禁止缓存
  if (cacheControl.noStore) return false

  // public 或 private 响应可以缓存
  if (cacheControl.isPublic || cacheControl.isPrivate) return true

  // 默认 GET 响应可以缓存
  return response.ok
}
