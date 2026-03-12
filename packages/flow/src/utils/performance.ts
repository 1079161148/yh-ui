import { shallowRef } from 'vue'
import type { Node, Edge } from '../types'

// Shallow ref wrapper for better performance with large arrays
export class ReactiveGraph<N extends Node = Node, E extends Edge = Edge> {
  private _nodes = shallowRef<N[]>([])
  private _edges = shallowRef<E[]>([])

  get nodes() {
    return this._nodes.value
  }

  set nodes(value: N[]) {
    this._nodes.value = value
  }

  get edges() {
    return this._edges.value
  }

  set edges(value: E[]) {
    this._edges.value = value
  }

  // Get edges connected to a specific node
  getConnectedEdges(nodeId: string): E[] {
    return this._edges.value.filter((e: E) => e.source === nodeId || e.target === nodeId)
  }

  // Get nodes connected to a specific node
  getConnectedNodes(nodeId: string): N[] {
    const connectedIds = new Set<string>()
    const edges = this.getConnectedEdges(nodeId)

    for (const edge of edges) {
      if (edge.source === nodeId) {
        connectedIds.add(edge.target)
      } else {
        connectedIds.add(edge.source)
      }
    }

    return this._nodes.value.filter((n) => connectedIds.has(n.id))
  }

  // Batch update nodes without triggering multiple renders
  batchUpdateNodes(updater: (nodes: N[]) => N[]): void {
    this._nodes.value = updater(this._nodes.value)
  }

  // Batch update edges without triggering multiple renders
  batchUpdateEdges(updater: (edges: E[]) => E[]): void {
    this._edges.value = updater(this._edges.value)
  }
}

// Simple ID generator
let idCounter = 0
export function generateId(prefix: string = 'id'): string {
  return `${prefix}-${Date.now()}-${++idCounter}`
}

// Debounce utility
export function debounce<T extends (...args: unknown[]) => void>(
  fn: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout> | null = null

  return (...args: Parameters<T>) => {
    if (timeoutId) {
      clearTimeout(timeoutId)
    }
    timeoutId = setTimeout(() => {
      fn(...args)
      timeoutId = null
    }, delay)
  }
}

// Throttle utility
export function throttle<T extends (...args: unknown[]) => void>(
  fn: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle = false

  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      fn(...args)
      inThrottle = true
      setTimeout(() => {
        inThrottle = false
      }, limit)
    }
  }
}

// Memoization cache
const memoCache = new Map<string, unknown>()

export function memo<T>(key: string, fn: () => T): T {
  if (memoCache.has(key)) {
    return memoCache.get(key) as T
  }
  const result = fn()
  memoCache.set(key, result)
  return result
}

export function clearMemoCache(): void {
  memoCache.clear()
}
