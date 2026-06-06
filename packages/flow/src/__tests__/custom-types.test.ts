import { describe, it, expect, beforeEach } from 'vitest'
import type { Node } from '../types'
import {
  registerCustomNodeTemplate,
  getCustomNodeTemplate,
  getAllCustomNodeTemplates,
  hasCustomNodeTemplate,
  createNodeFromTemplate,
  isNestedNode,
  getNodeChildren,
  getNodeParent,
  registerCustomEdge,
  getCustomEdge,
  getAllCustomEdges,
  hasCustomEdge,
  registerEdgeTemplate,
  getEdgeTemplate,
  getAllEdgeTemplates,
  exportFlowData,
  importFlowData,
  clearCustomTypes
} from '../utils/custom-types'
import { defineComponent, h } from 'vue'

describe('flow/utils/custom-types', () => {
  // Mock component for testing
  const MockComponent = defineComponent({
    name: 'MockComponent',
    render() {
      return h('div')
    }
  })

  beforeEach(() => {
    clearCustomTypes()
  })

  describe('Custom Node Templates', () => {
    it('should register and retrieve custom node template', () => {
      const template = {
        type: 'custom-node',
        component: MockComponent,
        defaultData: { label: 'Test Node' },
        defaultWidth: 200,
        defaultHeight: 100
      }

      registerCustomNodeTemplate(template)

      expect(hasCustomNodeTemplate('custom-node')).toBe(true)
      const retrieved = getCustomNodeTemplate('custom-node')
      expect(retrieved?.type).toBe('custom-node')
      expect(retrieved?.defaultWidth).toBe(200)
    })

    it('should get all registered templates', () => {
      registerCustomNodeTemplate({
        type: 'template-1',
        component: MockComponent
      })
      registerCustomNodeTemplate({
        type: 'template-2',
        component: MockComponent
      })

      const all = getAllCustomNodeTemplates()
      expect(all.length).toBe(2)
    })

    it('should create node from template', () => {
      registerCustomNodeTemplate({
        type: 'template-node',
        component: MockComponent,
        defaultData: { label: 'Default' },
        defaultWidth: 180,
        defaultHeight: 60
      })

      const node = createNodeFromTemplate('template-node', 'node-1', { x: 100, y: 200 })

      expect(node).not.toBeNull()
      expect(node?.id).toBe('node-1')
      expect(node?.type).toBe('template-node')
      expect(node?.position).toEqual({ x: 100, y: 200 })
      expect(node?.width).toBe(180)
      expect(node?.height).toBe(60)
      expect(node?.data.label).toBe('Default')
    })

    it('should create node with overrides', () => {
      registerCustomNodeTemplate({
        type: 'template-node',
        component: MockComponent,
        defaultData: { label: 'Default' },
        defaultWidth: 180,
        defaultHeight: 60
      })

      const node = createNodeFromTemplate(
        'template-node',
        'node-1',
        { x: 100, y: 200 },
        {
          data: { label: 'Custom Label' },
          width: 250
        }
      )

      expect(node?.data.label).toBe('Custom Label')
      expect(node?.width).toBe(250)
    })

    it('should return null for non-existent template', () => {
      const node = createNodeFromTemplate('non-existent', 'node-1', { x: 0, y: 0 })
      expect(node).toBeNull()
    })
  })

  describe('Custom Edges', () => {
    it('should register and retrieve custom edge', () => {
      const edge = {
        type: 'custom-edge',
        component: MockComponent,
        label: 'Custom Edge Label'
      }

      registerCustomEdge(edge)

      expect(hasCustomEdge('custom-edge')).toBe(true)
      const retrieved = getCustomEdge('custom-edge')
      expect(retrieved?.type).toBe('custom-edge')
      expect(retrieved?.label).toBe('Custom Edge Label')
    })

    it('should get all registered edges', () => {
      registerCustomEdge({ type: 'edge-1', component: MockComponent })
      registerCustomEdge({ type: 'edge-2', component: MockComponent })

      const all = getAllCustomEdges()
      expect(all.length).toBe(2)
    })
  })

  describe('Edge Templates', () => {
    it('should register and retrieve edge template', () => {
      const template = {
        type: 'animated-edge',
        animated: true,
        style: { stroke: '#3b82f6', strokeWidth: 2 },
        label: 'Animated'
      }

      registerEdgeTemplate(template)

      const retrieved = getEdgeTemplate('animated-edge')
      expect(retrieved?.type).toBe('animated-edge')
      expect(retrieved?.animated).toBe(true)
    })

    it('should get all edge templates', () => {
      registerEdgeTemplate({ type: 'edge-1', animated: false })
      registerEdgeTemplate({ type: 'edge-2', animated: true })

      const all = getAllEdgeTemplates()
      expect(all.length).toBe(2)
    })
  })

  describe('Nested Node Helpers', () => {
    const nodes: Node[] = [
      {
        id: 'parent-1',
        type: 'group',
        position: { x: 0, y: 0 },
        data: {},
        width: 500,
        height: 300
      },
      {
        id: 'child-1',
        type: 'default',
        position: { x: 50, y: 50 },
        data: {},
        parentId: 'parent-1'
      },
      {
        id: 'child-2',
        type: 'default',
        position: { x: 150, y: 50 },
        data: {},
        parentId: 'parent-1'
      },
      {
        id: 'standalone',
        type: 'default',
        position: { x: 300, y: 300 },
        data: {}
      }
    ]

    it('should detect nested node', () => {
      const child = nodes.find((n) => n.id === 'child-1')!
      const standalone = nodes.find((n) => n.id === 'standalone')!

      expect(isNestedNode(child)).toBe(true)
      expect(isNestedNode(standalone)).toBe(false)
    })

    it('should get node children', () => {
      const parent = nodes.find((n) => n.id === 'parent-1')!
      const children = getNodeChildren(parent, nodes)

      expect(children.length).toBe(2)
      expect(children.map((c) => c.id).sort()).toEqual(['child-1', 'child-2'])
    })

    it('should get node parent', () => {
      const child = nodes.find((n) => n.id === 'child-1')!
      const standalone = nodes.find((n) => n.id === 'standalone')!

      const parent = getNodeParent(child, nodes)
      expect(parent?.id).toBe('parent-1')

      const standaloneParent = getNodeParent(standalone, nodes)
      expect(standaloneParent).toBeUndefined()
    })
  })

  describe('Export/Import', () => {
    const testNodes: Node[] = [
      { id: '1', type: 'input', position: { x: 0, y: 0 }, data: { label: 'Start' } },
      { id: '2', type: 'default', position: { x: 100, y: 100 }, data: { label: 'Process' } }
    ]

    const testEdges = [{ id: 'e1', source: '1', target: '2', type: 'bezier' as const }]

    it('should export flow data as JSON', () => {
      const json = exportFlowData(testNodes, testEdges, { x: 0, y: 0, zoom: 1 })

      expect(json).toContain('"nodes"')
      expect(json).toContain('"edges"')
      expect(json).toContain('"viewport"')
      expect(json).toContain('"version"')
    })

    it('should import flow data from JSON', () => {
      const json = JSON.stringify({
        nodes: testNodes,
        edges: testEdges,
        viewport: { x: 0, y: 0, zoom: 1 }
      })

      const data = importFlowData(json)

      expect(data).not.toBeNull()
      expect(data?.nodes.length).toBe(2)
      expect(data?.edges.length).toBe(1)
    })

    it('should return null for invalid JSON', () => {
      const data = importFlowData('invalid json')
      expect(data).toBeNull()
    })

    it('should return null for empty nodes array', () => {
      const json = JSON.stringify({ edges: [] })
      const data = importFlowData(json)
      expect(data).toBeNull()
    })
  })

  describe('clearCustomTypes', () => {
    it('should clear all registered types', () => {
      registerCustomNodeTemplate({
        type: 'test-node',
        component: MockComponent
      })
      registerCustomEdge({
        type: 'test-edge',
        component: MockComponent
      })
      registerEdgeTemplate({
        type: 'test-edge-template',
        animated: true
      })

      clearCustomTypes()

      expect(hasCustomNodeTemplate('test-node')).toBe(false)
      expect(hasCustomEdge('test-edge')).toBe(false)
      expect(getEdgeTemplate('test-edge-template')).toBeUndefined()
    })
  })
})
