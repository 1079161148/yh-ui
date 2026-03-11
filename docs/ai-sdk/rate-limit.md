# 限流

YH-UI 提供令牌桶与滑动窗口两种限流算法，可作为中间件与 XRequest 集成。

## createRateLimiter - 限流器

### 令牌桶算法

```typescript
import { createRateLimiter } from '@yh-ui/ai-sdk'

// 创建限流器：100次/分钟
const limiter = createRateLimiter({
  windowMs: 60 * 1000, // 时间窗口：60秒
  max: 100, // 最大请求数
  keyBy: 'apiKey', // 按 API Key 限流
  algorithm: 'token-bucket',
  message: '请求过于频繁，请稍后再试'
})

// 检查限流状态
const result = limiter.check('user-api-key-123')
console.log(result.allowed) // 是否允许
console.log(result.remaining) // 剩余次数
console.log(result.resetAt) // 重置时间
```

### 滑动窗口算法

```typescript
const slidingLimiter = createRateLimiter({
  windowMs: 60 * 1000,
  max: 100,
  keyBy: 'ip', // 按 IP 限流
  algorithm: 'sliding-window',
  message: 'Too many requests'
})
```

## 作为中间件使用

```typescript
import { createRateLimiter } from '@yh-ui/ai-sdk'
import { registerMiddleware } from '@yh-ui/request'

const limiter = createRateLimiter({
  windowMs: 60 * 1000,
  max: 100
})

// 创建中间件
const rateLimitMiddleware = limiter.middleware()

// 注册到 XRequest
registerMiddleware(rateLimitMiddleware)
```

## 自定义存储

```typescript
import { createRateLimiter } from '@yh-ui/ai-sdk'

const limiter = createRateLimiter({
  windowMs: 60 * 1000,
  max: 100,
  storage: {
    get: async (key) => {
      /* 从 Redis 获取 */
    },
    set: async (key, value, ttl) => {
      /* 存入 Redis */
    },
    delete: async (key) => {
      /* 删除 */
    }
  }
})
```

::: warning 注意

1. `keyBy` 支持：`ip`、`apiKey`、`userId`、`custom`
2. 默认存储为内存，生产环境建议使用 Redis
3. 限流逻辑应在请求发起前执行
   :::
