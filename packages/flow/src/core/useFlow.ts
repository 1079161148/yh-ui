import { type Ref, provide, inject } from 'vue'
import type { Node, Edge, ViewportTransform } from '../types'

export interface FlowContextValue {
  nodes: Ref<Node[]>
  edges: Ref<Edge[]>
  viewport: Ref<ViewportTransform>
  addNode: (node: Node) => void
  removeNode: (nodeId: string) => void
  addEdge: (edge: Edge) => void
  removeEdge: (edgeId: string) => void
  setViewport: (transform: ViewportTransform) => void
  fitView: (options?: { padding?: number }) => void
  getNodes: () => Node[]
  getEdges: () => Edge[]
  on: (event: string, handler: (...args: unknown[]) => void) => void
  off: (event: string, handler: (...args: unknown[]) => void) => void
}

const FLOW_CONTEXT_KEY = Symbol('flow-context')

export function createFlowContext(
  nodes: Ref<Node[]>,
  edges: Ref<Edge[]>,
  viewport: Ref<ViewportTransform>,
  _options: {
    snapToGrid?: boolean
    snapGrid?: [number, number]
    maxHistory?: number
    keyboardShortcuts?: boolean
  } = {}
) {
  // 事件总线
  const eventBus = new Map<string, Set<(...args: unknown[]) => void>>()

  const on = (event: string, handler: (...args: unknown[]) => void) => {
    if (!eventBus.has(event)) {
      eventBus.set(event, new Set())
    }
    eventBus.get(event)!.add(handler)
  }

  const off = (event: string, handler: (...args: unknown[]) => void) => {
    eventBus.get(event)?.delete(handler)
  }

  const emit = (event: string, ...args: unknown[]) => {
    eventBus.get(event)?.forEach((handler) => handler(...args))
  }

  return {
    on,
    off,
    emit
  }
}

export function useFlowContext() {
  const context = inject<FlowContextValue>(FLOW_CONTEXT_KEY)
  if (!context) {
    throw new Error('useFlowContext must be used within a Flow component')
  }
  return context
}

export function provideFlowContext(context: FlowContextValue) {
  provide(FLOW_CONTEXT_KEY, context)
}
