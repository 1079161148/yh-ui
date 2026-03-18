import type { Component } from 'vue'
import type { EdgeType, Edge } from '../types/edge'
import type { NodeType, Node, NodeData, NodeHandleBounds } from '../types/node'

// ============================================
// Custom Edge Type Registry
// ============================================

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

// ============================================
// Custom Node Template Registry
// ============================================

export interface CustomNodeTemplate {
  type: NodeType
  component: Component
  defaultData?: Partial<NodeData>
  defaultWidth?: number
  defaultHeight?: number
  handles?: NodeHandleBounds
  description?: string
}

const customNodeTemplates = new Map<NodeType, CustomNodeTemplate>()

export function registerCustomNodeTemplate(template: CustomNodeTemplate): void {
  customNodeTemplates.set(template.type, template)
}

export function getCustomNodeTemplate(type: NodeType): CustomNodeTemplate | undefined {
  return customNodeTemplates.get(type)
}

export function getAllCustomNodeTemplates(): CustomNodeTemplate[] {
  return Array.from(customNodeTemplates.values())
}

export function hasCustomNodeTemplate(type: NodeType): boolean {
  return customNodeTemplates.has(type)
}

export function createNodeFromTemplate(
  type: NodeType,
  id: string,
  position: { x: number; y: number },
  overrides?: Partial<Node>
): Node | null {
  const template = getCustomNodeTemplate(type)
  if (!template) return null

  return {
    id,
    type,
    position,
    data: { ...template.defaultData, ...overrides?.data } as NodeData,
    width: overrides?.width ?? template.defaultWidth ?? 180,
    height: overrides?.height ?? template.defaultHeight ?? 60,
    selected: false,
    dragging: false,
    ...overrides
  } as Node
}

// Legacy aliases for backwards compatibility
export interface CustomNode {
  type: NodeType
  component: Component
  defaultData?: Record<string, unknown>
}

const customNodes = new Map<NodeType, CustomNode>()

export function registerCustomNode(node: CustomNode): void {
  // Also register as template for createNodeFromTemplate
  if (!customNodeTemplates.has(node.type)) {
    customNodeTemplates.set(node.type, {
      type: node.type,
      component: node.component,
      defaultData: node.defaultData as NodeData
    })
  }
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

// ============================================
// Nested Node Support Types
// ============================================

export interface NestedNodeConfig {
  parentId: string
  children: string[]
  extent?: 'parent' | 'container'
}

export function isNestedNode(node: Node): boolean {
  return !!node.parentId
}

export function getNodeChildren(node: Node, allNodes: Node[]): Node[] {
  if (!node.id) return []
  return allNodes.filter((n) => n.parentId === node.id)
}

export function getNodeParent(node: Node, allNodes: Node[]): Node | undefined {
  if (!node.parentId) return undefined
  return allNodes.find((n) => n.id === node.parentId)
}

// ============================================
// Edge Type Registry (Advanced)
// ============================================

export interface EdgeTemplate {
  type: EdgeType
  component?: Component
  defaultData?: Record<string, unknown>
  animated?: boolean
  style?: Record<string, string | number>
  label?: string
}

const edgeTemplates = new Map<EdgeType, EdgeTemplate>()

export function registerEdgeTemplate(template: EdgeTemplate): void {
  edgeTemplates.set(template.type, template)
}

export function getEdgeTemplate(type: EdgeType): EdgeTemplate | undefined {
  return edgeTemplates.get(type)
}

export function getAllEdgeTemplates(): EdgeTemplate[] {
  return Array.from(edgeTemplates.values())
}

// ============================================
// Export/Import Utilities
// ============================================

export interface FlowExportData {
  nodes: Node[]
  edges: Edge[]
  viewport?: { x: number; y: number; zoom: number }
  customTemplates?: {
    nodes: CustomNodeTemplate[]
    edges: EdgeTemplate[]
  }
  version?: string
}

export function exportFlowData(
  nodes: Node[],
  edges: Edge[],
  viewport?: { x: number; y: number; zoom: number }
): string {
  const data: FlowExportData = {
    nodes,
    edges,
    viewport,
    version: '1.0.0'
  }
  return JSON.stringify(data, null, 2)
}

export function importFlowData(json: string): FlowExportData | null {
  try {
    const data = JSON.parse(json) as FlowExportData
    if (!data.nodes || !Array.isArray(data.nodes)) {
      return null
    }
    return data
  } catch {
    return null
  }
}

// ============================================
// Clear all custom types (useful for testing)
// ============================================

export function clearCustomTypes(): void {
  customEdges.clear()
  customNodes.clear()
  customNodeTemplates.clear()
  edgeTemplates.clear()
}
