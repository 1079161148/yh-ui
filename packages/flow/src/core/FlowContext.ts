import { provide, inject } from 'vue'
import type { FlowInstance } from '../types'

export const FlowContextSymbol = Symbol('yh-flow-context')

/**
 * 提供 Flow 实例上下文
 */
export function provideFlowContext(flow: FlowInstance | null): void {
  if (!flow) return
  provide(FlowContextSymbol, flow)
}

/**
 * 获取 Flow 实例上下文，供插件/内部组合函数调用
 */
export function useFlowContext(): FlowInstance {
  const context = inject<FlowInstance | null>(FlowContextSymbol, null)
  if (!context) {
    throw new Error('[YhFlow] FlowContext is not provided')
  }
  return context
}
