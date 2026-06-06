# Plugin System

`@yh-ui/request` provides a set of **plugin system** to extend functionality of request instances without modifying core code. Plugins are essentially a set of encapsulated interceptors and lifecycle hooks for the `Request` instance.

> Note: These "plugins" are **Request plugins**, different from Vue application plugins (`app.use(...)`).

## Plugin Interface

```typescript
export interface RequestPlugin {
  /** Plugin name (unique) */
  name: string
  /** Plugin version */
  version?: string
  /** Install plugin */
  install: (request: Request, options?: Record<string, unknown>) => void
  /** Uninstall plugin (optional) */
  uninstall?: (request: Request) => void
}
```

## Plugin Manager

```typescript
import { PluginManager, type Request } from '@yh-ui/request'

const request = createRequest()
const manager = new PluginManager()

// Bind request instance
manager.init(request)

// Use plugins
manager.use(loggingPlugin)
manager.use(retryPlugin, { retries: 3, retryDelay: 1000 })
```

Common methods:

```typescript
manager.use(plugin, options) // Install plugin
manager.uninstall('logging') // Uninstall plugin
manager.get('logging') // Get plugin instance
manager.getAll() // Get all plugins
manager.has('logging') // Whether installed
manager.clear() // Clear all plugins
```

## Built-in Plugins

The source provides some example plugins, located in `builtInPlugins`:

```typescript
import { builtInPlugins } from '@yh-ui/request'

const { logging, cache, errorHandler, retry } = builtInPlugins
```

### loggingPlugin

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

Suitable for enabling in development environment to observe request chain.

### cachePlugin

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
          // In actual business, can directly return cached in combination with response interceptor
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

### errorHandlerPlugin

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

Can work with `YhMessage` for unified error notifications.

### retryPlugin

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

Suitable for enabling on **network unstable but idempotent** interfaces (like GET / retry-safe POST).

## Lifecycle Hooks (Advanced)

`PluginManager` also provides registering lifecycle hook interfaces (currently mainly for extension预留):

```typescript
manager.registerHooks({
  onRequest(config) {
    /* ... */ return config
  },
  onResponse(response) {
    /* ... */ return response
  },
  onError(error) {
    /* ... */ return error
  },
  onFinally() {
    /* ... */
  }
})
```

You can combine these hooks in custom encapsulation for unified埋点, log reporting, etc.

## Recommended Usage

- It is recommended to centrally create `request` instance in **request encapsulation layer** (like `src/apis/request.ts`) and mount plugins there;
- Plugins are mainly used for **cross-cutting concerns**: logging, retry, cache, global error handling;
- Business components should only care about `useRequest / usePagination / useLoadMore` Hooks, not directly operate plugins.
