/**
 * YH-UI Request Hooks
 *
 * Enterprise-grade HTTP request hooks for Vue 3
 *
 * @package @yh-ui/request
 */

// 先导出 request（包含核心函数），再导出 types（只导出类型）
// 这样 request.ts 中的函数会覆盖 types.ts 中的同名类型导出
export * from './request'
export * from './types'
export * from './useRequest'
export * from './useSSE'
export * from './useAIStream'
export * from './usePagination'
export * from './useLoadMore'
export * from './useQueue'
export * from './useRequestQueue'
export * from './plugin'

// 适配器
export * from './adapters'

// 缓存
export * from './cache'

// 拦截器
export * from './interceptors'

// GraphQL 支持
export * from './graphql'

// WebSocket 支持
export * from './websocket'

// HTTP 缓存协议
export * from './http-cache'
