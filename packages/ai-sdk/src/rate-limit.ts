/**
 * YH-UI AI SDK - 限流中间件
 *
 * 支持按用户/API Key 的令牌桶或滑动窗口，可与 AI Gateway 策略对齐。
 */

export interface RateLimitConfig {
  /** 时间窗口（毫秒） */
  windowMs: number
  /** 窗口内最大请求数 */
  max: number
  /** 标识键：从 config 或 headers 中取，如 'userId' | 'apiKey'，默认同一 key 共享限额 */
  keyBy?:
    | 'userId'
    | 'apiKey'
    | 'ip'
    | ((config: { headers?: Record<string, string>; [k: string]: unknown }) => string)
  /** 超限时返回的消息 */
  message?: string
}

interface WindowState {
  count: number
  resetAt: number
}

const defaultKey = '__default__'

/**
 * 内存版限流器（单进程有效）
 */
export function createRateLimiter(config: RateLimitConfig) {
  const { windowMs, max, keyBy = () => defaultKey, message = 'Too Many Requests' } = config
  const store = new Map<string, WindowState>()

  function getKey(cfg: { headers?: Record<string, string>; [k: string]: unknown }): string {
    if (typeof keyBy === 'function') return keyBy(cfg) || defaultKey
    const h = cfg.headers || {}
    if (keyBy === 'userId')
      return (cfg as { userId?: string }).userId ?? h['x-user-id'] ?? defaultKey
    if (keyBy === 'apiKey') return h['x-api-key'] ?? h['authorization'] ?? defaultKey
    if (keyBy === 'ip') return h['x-forwarded-for'] ?? h['x-real-ip'] ?? defaultKey
    return defaultKey
  }

  function check(key: string): { allowed: boolean; remaining: number; resetAt: number } {
    const now = Date.now()
    let state = store.get(key)

    if (!state || state.resetAt <= now) {
      state = { count: 0, resetAt: now + windowMs }
      store.set(key, state)
    }

    state.count += 1
    const allowed = state.count <= max
    const remaining = Math.max(0, max - state.count)

    return { allowed, remaining, resetAt: state.resetAt }
  }

  return {
    check,
    getKey,
    /** 创建 XRequest 用的中间件 */
    middleware() {
      return {
        name: 'rate-limit',
        async onRequest(requestConfig: { headers?: Record<string, string>; [k: string]: unknown }) {
          const key = getKey(requestConfig)
          const { allowed, remaining, resetAt } = check(key)
          if (!allowed) {
            const err = new Error(message) as Error & {
              statusCode?: number
              remaining?: number
              resetAt?: number
            }
            err.statusCode = 429
            err.remaining = remaining
            err.resetAt = resetAt
            throw err
          }
          return requestConfig
        }
      }
    }
  }
}

/** 限流中间件（与 XRequest / registerMiddleware 兼容） */
export interface RateLimitMiddleware {
  name: string
  onRequest?: (config: {
    headers?: Record<string, string>
    [k: string]: unknown
  }) => unknown | Promise<unknown>
}

/**
 * 创建限流中间件（便捷方法）
 */
export function createRateLimitMiddleware(config: RateLimitConfig): RateLimitMiddleware {
  return createRateLimiter(config).middleware()
}
