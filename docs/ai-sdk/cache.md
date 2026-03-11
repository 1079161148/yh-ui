# 缓存系统

YH-UI 提供多级缓存适配器，满足不同场景需求。

## createMemoryCache - 内存缓存

适合单次会话，响应最快。

```typescript
import { createMemoryCache } from '@yh-ui/ai-sdk'

const cache = createMemoryCache<string>()

// 设置缓存
cache.set('key', 'value', 60000) // 60秒 TTL
cache.set('key2', { data: 123 }) // 对象自动 JSON 序列化

// 获取缓存
const value = cache.get('key')
console.log(value)

// 检查存在
cache.has('key')

// 删除
cache.delete('key')

// 清空
cache.clear()
```

## createLocalStorageCache - 持久化缓存

适合需要跨会话持久化的数据。

```typescript
import { createLocalStorageCache } from '@yh-ui/ai-sdk'

// 可指定前缀避免冲突
const cache = createLocalStorageCache('ai-sdk-')

// 使用方式同内存缓存
cache.set('user-info', { name: 'John' }, 3600000) // 1小时
const info = cache.get('user-info')
```

## createSessionStorageCache - 会话级缓存

适合仅在当前浏览器标签页有效的缓存。

```typescript
import { createSessionStorageCache } from '@yh-ui/ai-sdk'

const cache = createSessionStorageCache()
cache.set('temp-data', 'value')
```

## Redis 缓存接口

```typescript
import type { RedisCacheConfig } from '@yh-ui/ai-sdk'

const config: RedisCacheConfig = {
  url: 'redis://localhost:6379',
  prefix: 'ai-sdk:',
  ttl: 3600
}

// 实现适配器
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
缓存常用于：

- 对话历史缓存
- 模型响应缓存
- 用户配置缓存
- 临时状态缓存
  :::
