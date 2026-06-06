# 插件系统

`@yh-ui/request` 预留了一套 **插件系统**，用于在不修改核心代码的前提下，对请求实例进行功能扩展。插件本质上是对 `Request` 实例的一组封装好的拦截器与生命周期钩子。

> 注意：这里的「插件」是 **Request 插件**，与 Vue 的应用插件（`app.use(...)`）概念不同。

## 插件接口

```typescript
export interface RequestPlugin {
  /** 插件名称（唯一） */
  name: string
  /** 插件版本 */
  version?: string
  /** 安装插件 */
  install: (request: Request, options?: Record<string, unknown>) => void
  /** 卸载插件（可选） */
  uninstall?: (request: Request) => void
}
```

## 插件管理器

```typescript
import { PluginManager, type Request } from '@yh-ui/request'

const request = createRequest()
const manager = new PluginManager()

// 绑定请求实例
manager.init(request)

// 使用插件
manager.use(loggingPlugin)
manager.use(retryPlugin, { retries: 3, retryDelay: 1000 })
```

常用方法：

```typescript
manager.use(plugin, options) // 安装插件
manager.uninstall('logging') // 卸载插件
manager.get('logging') // 获取插件实例
manager.getAll() // 获取所有插件
manager.has('logging') // 是否已安装
manager.clear() // 清空所有插件
```

## 内置插件

源码内提供了一些示例插件，位于 `builtInPlugins` 中：

```typescript
import { builtInPlugins } from '@yh-ui/request'

const { logging, cache, errorHandler, retry } = builtInPlugins
```

### 日志插件 loggingPlugin

```typescript
const loggingPlugin: RequestPlugin = {
  name: 'logging',
  install(request) {
    request.interceptors.request.use((config) => {
      console.log(`[YH-Request] → ${config.method} ${config.url}`)
      return config
    })

    request.interceptors.response.use((response) => {
      console.log(`[YH-Request] ← ${response.response.status} ${response.config.url}`)
      return response
    })
  }
}
```

适合在开发环境开启，用于观察请求链路。

### 缓存插件 cachePlugin

```typescript
const cachePlugin: RequestPlugin = {
  name: 'cache',
  install(
    request,
    options?: {
      getCache?: (key: string) => unknown
      setCache?: (key: string, value: unknown) => void
    }
  ) {
    request.interceptors.request.use((config) => {
      if (config.method === 'GET' && options?.getCache) {
        const key = config.url || ''
        const cached = options.getCache(key)
        if (cached) {
          console.log('[YH-Request Cache] Cache hit:', key)
          // 实际业务中可以结合响应拦截器直接返回缓存
        }
      }
      return config
    })

    request.interceptors.response.use((response) => {
      if (response.config.method === 'GET' && options?.setCache) {
        const key = response.config.url || ''
        options.setCache(key, response.data)
      }
      return response
    })
  }
}
```

### 错误处理插件 errorHandlerPlugin

```typescript
const errorHandlerPlugin: RequestPlugin = {
  name: 'errorHandler',
  install(request, options?: { onError?: (error: Error) => void }) {
    request.interceptors.response.use(
      (response) => response,
      (error) => {
        options?.onError?.(error)
        return Promise.reject(error)
      }
    )
  }
}
```

可以与 `YhMessage` 联动做统一错误提示。

### 重试插件 retryPlugin

```typescript
const retryPlugin: RequestPlugin = {
  name: 'retry',
  install(request, options?: { retries?: number; retryDelay?: number }) {
    const retries = options?.retries || 3
    const retryDelay = options?.retryDelay || 1000

    request.interceptors.response.use(
      (response) => response,
      async (error) => {
        const config = error.config
        if (!config) return Promise.reject(error)

        const currentRetries = config._retryCount || 0

        if (currentRetries < retries) {
          config._retryCount = currentRetries + 1
          await new Promise((resolve) => setTimeout(resolve, retryDelay))
          return request.request(config)
        }

        return Promise.reject(error)
      }
    )
  }
}
```

适合对 **网络不稳定但幂等** 的接口开启（如 GET / 重试安全的 POST）。

## 生命周期钩子（高级）

`PluginManager` 还提供了注册生命周期 Hook 的接口（目前主要作为扩展预留）：\n\n`typescript\nmanager.registerHooks({\n  onRequest(config) { /* ... */ return config },\n  onResponse(response) { /* ... */ return response },\n  onError(error) { /* ... */ return error },\n  onFinally() { /* ... */ },\n})\n`\n\n你可以在自定义封装中结合这些 Hook 做统一埋点、日志上报等。

## 建议用法

- 推荐在 **请求封装层**（如 `src/apis/request.ts`）集中创建 `request` 实例，并在此处挂载插件；
- 插件主要用于 **横切关注点**：日志、重试、缓存、全局错误处理等；
- 业务组件中只关心 `useRequest / usePagination / useLoadMore` 等 Hook，不直接操作插件。
