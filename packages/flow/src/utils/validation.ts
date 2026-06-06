import type { Node, Edge } from '../types'

export type ConnectionType = 'default' | 'loop' | 'step' | 'custom'

export interface ConnectionRule {
  source: string | string[]
  target: string | string[]
  sourceHandle?: string | string[] | null
  targetHandle?: string | string[] | null
}

export interface ValidationResult {
  isValid: boolean
  message?: string
}

export type IsValidConnectionFn = (connection: {
  source: string
  target: string
  sourceHandle?: string | null
  targetHandle?: string | null
}) => boolean

export function createConnectionValidator(rules?: ConnectionRule[]): IsValidConnectionFn {
  return (connection) => {
    if (!rules || rules.length === 0) {
      return true
    }

    for (const rule of rules) {
      const sourceMatches = matchesRule(connection.source, rule.source)
      const targetMatches = matchesRule(connection.target, rule.target)
      const sourceHandleMatches = matchesHandleRule(connection.sourceHandle, rule.sourceHandle)
      const targetHandleMatches = matchesHandleRule(connection.targetHandle, rule.targetHandle)

      if (sourceMatches && targetMatches && sourceHandleMatches && targetHandleMatches) {
        return true
      }
    }

    return false
  }
}

function matchesRule(value: string, pattern: string | string[] | undefined): boolean {
  if (!pattern) return true

  if (Array.isArray(pattern)) {
    return pattern.includes(value)
  }

  if (pattern === '*') return true

  try {
    const regex = new RegExp(pattern)
    return regex.test(value)
  } catch {
    return value === pattern
  }
}

function matchesHandleRule(
  handle: string | null | undefined,
  pattern: string | string[] | null | undefined
): boolean {
  if (pattern === null || pattern === undefined) return true

  if (!handle && pattern) return false

  return matchesRule(handle!, pattern)
}

export function isValidConnection(
  sourceNode: Node | undefined,
  targetNode: Node | undefined,
  connection: {
    source: string
    target: string
    sourceHandle?: string | null
    targetHandle?: string | null
  }
): ValidationResult {
  if (!sourceNode) {
    return { isValid: false, message: 'Source node not found' }
  }

  if (!targetNode) {
    return { isValid: false, message: 'Target node not found' }
  }

  if (connection.source === connection.target) {
    return { isValid: false, message: 'Cannot connect to the same node' }
  }

  if (connection.target === connection.source) {
    return { isValid: false, message: 'Cannot create self-loop' }
  }

  return { isValid: true }
}

export function detectCycles(edges: Edge[], newEdge: { source: string; target: string }): boolean {
  const adjacencyList = new Map<string, string[]>()

  for (const edge of edges) {
    if (!adjacencyList.has(edge.source)) {
      adjacencyList.set(edge.source, [])
    }
    adjacencyList.get(edge.source)!.push(edge.target)
  }

  if (!adjacencyList.has(newEdge.source)) {
    adjacencyList.set(newEdge.source, [])
  }
  adjacencyList.get(newEdge.source)!.push(newEdge.target)

  const visited = new Set<string>()
  const recursionStack = new Set<string>()

  function hasCycle(node: string): boolean {
    visited.add(node)
    recursionStack.add(node)

    const neighbors = adjacencyList.get(node) || []
    for (const neighbor of neighbors) {
      if (!visited.has(neighbor)) {
        if (hasCycle(neighbor)) return true
      } else if (recursionStack.has(neighbor)) {
        return true
      }
    }

    recursionStack.delete(node)
    return false
  }

  for (const node of adjacencyList.keys()) {
    if (!visited.has(node)) {
      if (hasCycle(node)) return true
    }
  }

  return false
}
