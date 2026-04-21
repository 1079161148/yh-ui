import { describe, it, expect } from 'vitest'
import {
  isNode,
  type Node,
  type NodeChange,
  type NodeChangeType,
  type NodeData,
  type NodeDimension,
  type NodeHandle,
  type NodePosition,
  type HandleType,
  type Position,
  type NodeStyle,
  type NodeHandleBounds
} from '../types/node'

describe('flow/types/node', () => {
  describe('NodeHandle', () => {
    it('should define handle with type and position', () => {
      const handle: NodeHandle = {
        type: 'source',
        position: 'right'
      }
      expect(handle.type).toBe('source')
      expect(handle.position).toBe('right')
    })

    it('should support optional properties', () => {
      const handle: NodeHandle = {
        type: 'target',
        position: 'left',
        id: 'handle-1',
        style: { background: '#fff' },
        class: 'custom-handle',
        isConnectable: true
      }
      expect(handle.id).toBe('handle-1')
      expect(handle.class).toBe('custom-handle')
      expect(handle.isConnectable).toBe(true)
    })
  })

  describe('NodeStyle', () => {
    it('should allow CSS-like properties', () => {
      const style: NodeStyle = {
        background: '#f0f0f0',
        border: '1px solid #ccc',
        width: 200
      }
      expect(style.background).toBe('#f0f0f0')
      expect(style.width).toBe(200)
    })

    it('should support undefined values', () => {
      const style: NodeStyle = {
        background: '#fff',
        border: undefined
      }
      expect(style.border).toBeUndefined()
    })
  })

  describe('NodeData', () => {
    it('should define basic node data', () => {
      const data: NodeData = {
        label: 'Test Node'
      }
      expect(data.label).toBe('Test Node')
    })

    it('should support extended data fields', () => {
      const data: NodeData = {
        label: 'AI Node',
        style: { background: '#e0f7fa' },
        class: 'ai-node',
        icon: 'robot',
        description: 'An AI processing node'
      }
      expect(data.icon).toBe('robot')
      expect(data.description).toBe('An AI processing node')
    })

    it('should support AI workflow specific fields', () => {
      const data: NodeData = {
        label: 'LLM Node',
        model: 'gpt-4',
        prompt: 'You are a helpful assistant',
        temperature: 0.7,
        maxTokens: 2000,
        tools: ['search', 'calculator'],
        toolName: 'web_search',
        condition: 'status == "success"',
        memoryType: 'vector',
        status: 'running',
        streamOutput: 'partial'
      }
      expect(data.model).toBe('gpt-4')
      expect(data.temperature).toBe(0.7)
      expect(data.status).toBe('running')
    })
  })

  describe('NodePosition', () => {
    it('should define position with x and y', () => {
      const pos: NodePosition = { x: 100, y: 200 }
      expect(pos.x).toBe(100)
      expect(pos.y).toBe(200)
    })

    it('should support negative coordinates', () => {
      const pos: NodePosition = { x: -50, y: -100 }
      expect(pos.x).toBe(-50)
      expect(pos.y).toBe(-100)
    })
  })

  describe('NodeDimension', () => {
    it('should define width and height', () => {
      const dim: NodeDimension = { width: 150, height: 80 }
      expect(dim.width).toBe(150)
      expect(dim.height).toBe(80)
    })
  })

  describe('NodeHandleBounds', () => {
    it('should define handle bounds', () => {
      const bounds: NodeHandleBounds = {
        top: [{ type: 'source', position: 'top' }],
        right: [{ type: 'target', position: 'right' }]
      }
      expect(bounds.top).toHaveLength(1)
      expect(bounds.right).toHaveLength(1)
    })
  })

  describe('Node', () => {
    it('should create basic node', () => {
      const node: Node = {
        id: 'node-1',
        type: 'default',
        position: { x: 0, y: 0 },
        data: { label: 'Basic Node' }
      }
      expect(node.id).toBe('node-1')
      expect(node.type).toBe('default')
    })

    it('should support all optional properties', () => {
      const node: Node = {
        id: 'node-1',
        type: 'custom',
        position: { x: 100, y: 200 },
        data: { label: 'Test' },
        style: { background: '#fff' },
        class: 'custom-node',
        draggable: true,
        selectable: true,
        connectable: true,
        resizable: true,
        deletable: true,
        hidden: false,
        selected: false,
        dragging: false,
        width: 200,
        height: 100,
        parentId: 'parent-1',
        zIndex: 1,
        extent: 'parent',
        expandParent: true,
        positionAbsolute: { x: 150, y: 250 },
        handleBounds: {
          top: [{ type: 'source', position: 'top' }],
          right: [{ type: 'target', position: 'right' }]
        }
      }
      expect(node.draggable).toBe(true)
      expect(node.width).toBe(200)
      expect(node.parentId).toBe('parent-1')
    })

    it('should support nested children', () => {
      const node: Node = {
        id: 'parent',
        type: 'group',
        position: { x: 0, y: 0 },
        data: { label: 'Parent' },
        children: ['child-1', 'child-2'],
        computed: true
      }
      expect(node.children).toEqual(['child-1', 'child-2'])
      expect(node.computed).toBe(true)
    })
  })

  describe('NodeChangeType', () => {
    it('should define all change types', () => {
      const types: NodeChangeType[] = [
        'select',
        'position',
        'remove',
        'dimensions',
        'style',
        'data',
        'selectMulti',
        'unselect'
      ]
      expect(types).toContain('select')
      expect(types).toContain('position')
      expect(types).toContain('remove')
    })
  })

  describe('NodeChange', () => {
    it('should create select change', () => {
      const node: Node = {
        id: 'node-1',
        type: 'default',
        position: { x: 0, y: 0 },
        data: {}
      }
      const change: NodeChange = {
        type: 'select',
        id: 'node-1',
        item: node,
        selected: true
      }
      expect(change.type).toBe('select')
      expect(change.selected).toBe(true)
    })

    it('should create position change', () => {
      const node: Node = {
        id: 'node-1',
        type: 'default',
        position: { x: 0, y: 0 },
        data: {}
      }
      const change: NodeChange = {
        type: 'position',
        id: 'node-1',
        item: node,
        position: { x: 100, y: 200 }
      }
      expect(change.position?.x).toBe(100)
      expect(change.position?.y).toBe(200)
    })

    it('should create dimensions change', () => {
      const node: Node = {
        id: 'node-1',
        type: 'default',
        position: { x: 0, y: 0 },
        data: {}
      }
      const change: NodeChange = {
        type: 'dimensions',
        id: 'node-1',
        item: node,
        dimensions: { width: 200, height: 100 }
      }
      expect(change.dimensions?.width).toBe(200)
    })

    it('should create drag change', () => {
      const node: Node = {
        id: 'node-1',
        type: 'default',
        position: { x: 0, y: 0 },
        data: {}
      }
      const change: NodeChange = {
        type: 'position',
        id: 'node-1',
        item: node,
        drag: true
      }
      expect(change.drag).toBe(true)
    })
  })

  describe('isNode', () => {
    it('should return true for valid node objects', () => {
      const node: Node = {
        id: 'node-1',
        type: 'default',
        position: { x: 0, y: 0 },
        data: {}
      }
      expect(isNode(node)).toBe(true)
    })

    it('should return true for node with extended properties', () => {
      const node: Node = {
        id: 'node-1',
        type: 'custom',
        position: { x: 100, y: 200 },
        data: { label: 'Test' },
        width: 200,
        height: 100
      }
      expect(isNode(node)).toBe(true)
    })

    it('should return false for null', () => {
      expect(isNode(null)).toBe(false)
    })

    it('should return false for undefined', () => {
      expect(isNode(undefined)).toBe(false)
    })

    it('should return false for object missing id', () => {
      expect(isNode({ type: 'default', position: { x: 0, y: 0 }, data: {} })).toBe(false)
    })

    it('should return false for object missing type', () => {
      expect(isNode({ id: 'node-1', position: { x: 0, y: 0 }, data: {} })).toBe(false)
    })

    it('should return false for primitive values', () => {
      expect(isNode('node' as unknown)).toBe(false)
      expect(isNode(123 as unknown)).toBe(false)
      expect(isNode(true as unknown)).toBe(false)
    })

    it('should return false for arrays', () => {
      expect(isNode([] as unknown)).toBe(false)
    })
  })
})
