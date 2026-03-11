# Caching System

YH-UI provides multi-level cache adapters to meet different scenario needs.

## createMemoryCache - In-Memory Cache

Suitable for single sessions, fastest response.

```typescript
import { createMemoryCache } from '@yh-ui/ai-sdk'

const cache = createMemoryCache<string>()

// Set cache
cache.set('key', 'value', 60000) // 60 seconds TTL
cache.set('key2', { data: 123 }) // Objects auto JSON serialized

// Get cache
const value = cache.get('key')
console.log(value)

// Check existence
cache.has('key')

// Delete
cache.delete('key')

// Clear all
cache.clear()
```

## createLocalStorageCache - Persistent Cache

Suitable for data that needs to persist across sessions.

```typescript
import { createLocalStorageCache } from '@yh-ui/ai-sdk'

// Can specify prefix to avoid conflicts
const cache = createLocalStorageCache('ai-sdk-')

// Usage same as memory cache
cache.set('user-info', { name: 'John' }, 3600000) // 1 hour
const info = cache.get('user-info')
```

## createSessionStorageCache - Session-Level Cache

Suitable for cache valid only in the current browser tab.

```typescript
import { createSessionStorageCache } from '@yh-ui/ai-sdk'

const cache = createSessionStorageCache()
cache.set('temp-data', 'value')
```

## Redis Cache Interface

```typescript
import type { RedisCacheConfig } from '@yh-ui/ai-sdk'

const config: RedisCacheConfig = {
  url: 'redis://localhost:6379',
  prefix: 'ai-sdk:',
  ttl: 3600
}

// Implement adapter
class RedisCacheAdapter implements ICache {
  async get(key: string) {
    /* ... */
  }
  async set(key: string, value: unknown, ttl?: number) {
    /* ... */
  }
  async delete(key: string) {
    /* ... */
  }
}
```

::: tip
Caching is commonly used for:

- Conversation history caching
- Model response caching
- User configuration caching
- Temporary state caching
  :::
