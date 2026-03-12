import type { FlowEventKey, FlowEventHandler, FlowEvents } from '../types'

/**
 * 简单事件总线实现 - 用于 Flow 组件内部和插件系统
 */
export class EventBus {
  private handlers: Map<FlowEventKey, Set<(...args: unknown[]) => void>> = new Map()

  /**
   * 订阅事件
   */
  on<K extends FlowEventKey>(event: K, handler: FlowEventHandler<K>): void {
    if (!this.handlers.has(event)) {
      this.handlers.set(event, new Set())
    }
    this.handlers.get(event)!.add(handler)
  }

  /**
   * 取消订阅
   */
  off<K extends FlowEventKey>(event: K, handler: FlowEventHandler<K>): void {
    const handlers = this.handlers.get(event)
    if (handlers) {
      handlers.delete(handler)
      if (handlers.size === 0) {
        this.handlers.delete(event)
      }
    }
  }

  /**
   * 触发事件
   */
  emit<K extends FlowEventKey>(event: K, payload?: FlowEvents[K]): void {
    const handlers = this.handlers.get(event)
    if (handlers) {
      handlers.forEach((handler) => {
        try {
          if (payload !== undefined) {
            handler(payload as FlowEvents[K])
          } else {
            handler()
          }
        } catch (error) {
          console.error(`[YhFlow EventBus] Error in event handler for "${event}":`, error)
        }
      })
    }
  }

  /**
   * 单次订阅
   */
  once<K extends FlowEventKey>(event: K, handler: FlowEventHandler<K>): void {
    const wrappedHandler = ((...args: Parameters<FlowEventHandler<K>>) => {
      handler(...(args as Parameters<FlowEventHandler<K>>))
      this.off(event, wrappedHandler)
    }) as FlowEventHandler<K>
    this.on(event, wrappedHandler)
  }

  /**
   * 清空所有事件处理函数
   */
  clear(): void {
    this.handlers.clear()
  }

  /**
   * 获取事件处理器数量
   */
  listenerCount(event?: FlowEventKey): number {
    if (event) {
      return this.handlers.get(event)?.size || 0
    }
    let total = 0
    this.handlers.forEach((handlers) => {
      total += handlers.size
    })
    return total
  }
}

// 事件总线单例
let eventBusInstance: EventBus | null = null

/**
 * 获取事件总线单例
 */
export function getEventBus(): EventBus {
  if (!eventBusInstance) {
    eventBusInstance = new EventBus()
  }
  return eventBusInstance
}

/**
 * 创建新的事件总线实例
 */
export function createEventBus(): EventBus {
  return new EventBus()
}
