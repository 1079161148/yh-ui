import type { Component } from 'vue'
import type { EdgeType } from '../types/edge'
import type { NodeType } from '../types/node'

// Custom edge type registry
export interface CustomEdge {
  type: EdgeType
  component: Component
  label?: string
}

const customEdges = new Map<EdgeType, CustomEdge>()

export function registerCustomEdge(edge: CustomEdge): void {
  customEdges.set(edge.type, edge)
}

export function getCustomEdge(type: EdgeType): CustomEdge | undefined {
  return customEdges.get(type)
}

export function getAllCustomEdges(): CustomEdge[] {
  return Array.from(customEdges.values())
}

export function hasCustomEdge(type: EdgeType): boolean {
  return customEdges.has(type)
}

// Custom node type registry
export interface CustomNode {
  type: NodeType
  component: Component
  defaultData?: Record<string, unknown>
}

const customNodes = new Map<NodeType, CustomNode>()

export function registerCustomNode(node: CustomNode): void {
  customNodes.set(node.type, node)
}

export function getCustomNode(type: NodeType): CustomNode | undefined {
  return customNodes.get(type)
}

export function getAllCustomNodes(): CustomNode[] {
  return Array.from(customNodes.values())
}

export function hasCustomNode(type: NodeType): boolean {
  return customNodes.has(type)
}

// Clear all custom types (useful for testing)
export function clearCustomTypes(): void {
  customEdges.clear()
  customNodes.clear()
}
