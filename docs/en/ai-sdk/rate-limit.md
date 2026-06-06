# Rate Limiting

YH-UI provides token bucket and sliding window rate limiting algorithms, which can be integrated as middleware with XRequest.

## createRateLimiter - Rate Limiter

### Token Bucket Algorithm

```typescript
import { createRateLimiter } from '@yh-ui/ai-sdk'

// Create limiter: 100 requests/minute
const limiter = createRateLimiter({
  windowMs: 60 * 1000, // Time window: 60 seconds
  max: 100, // Maximum requests
  keyBy: 'apiKey', // Rate limit by API Key
  algorithm: 'token-bucket',
  message: 'Too many requests, please try again later'
})

// Check rate limit status
const result = limiter.check('user-api-key-123')
console.log(result.allowed) // Whether allowed
console.log(result.remaining) // Remaining requests
console.log(result.resetAt) // Reset time
```

### Sliding Window Algorithm

```typescript
const slidingLimiter = createRateLimiter({
  windowMs: 60 * 1000,
  max: 100,
  keyBy: 'ip', // Rate limit by IP
  algorithm: 'sliding-window',
  message: 'Too many requests'
})
```

## Using as Middleware

```typescript
import { createRateLimiter } from '@yh-ui/ai-sdk'
import { registerMiddleware } from '@yh-ui/request'

const limiter = createRateLimiter({
  windowMs: 60 * 1000,
  max: 100
})

// Create middleware
const rateLimitMiddleware = limiter.middleware()

// Register to XRequest
registerMiddleware(rateLimitMiddleware)
```

## Custom Storage

```typescript
import { createRateLimiter } from '@yh-ui/ai-sdk'

const limiter = createRateLimiter({
  windowMs: 60 * 1000,
  max: 100,
  storage: {
    get: async (key) => {
      /* Get from Redis */
    },
    set: async (key, value, ttl) => {
      /* Store to Redis */
    },
    delete: async (key) => {
      /* Delete */
    }
  }
})
```

::: warning Important Notes

1. `keyBy` supports: `ip`, `apiKey`, `userId`, `custom`
2. Default storage is in-memory; Redis is recommended for production
3. Rate limiting logic should be executed before making requests
   :::
