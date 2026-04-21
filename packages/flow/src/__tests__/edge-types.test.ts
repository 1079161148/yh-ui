import { describe, it, expect } from 'vitest'
import {
  isEdge,
  isEdgeType,
  type Connection,
  type Edge,
  type EdgeChange,
  type EdgeChangeType,
  type EdgeData,
  type EdgeStyle,
  type EdgeType
} from '../types/edge'

describe('flow/types/edge', () => {
  describe('EdgeType', () => {
    it('should accept valid edge types', () => {
      const types: EdgeType[] = ['smoothstep', 'step', 'bezier', 'straight', 'default']
      types.forEach((type) => {
        expect(isEdgeType(type)).toBe(true)
      })
    })

    it('should reject invalid edge types', () => {
      expect(isEdgeType('invalid')).toBe(false)
      expect(isEdgeType('')).toBe(false)
      expect(isEdgeType('smooth')).toBe(false)
    })

    // Note: isEdgeType only validates against specific literal types
    // EdgeType = string | 'smoothstep' | 'step' | 'bezier' | 'straight' | 'default'
    // Custom strings typed as EdgeType would pass TypeScript but fail runtime validation
  })

  describe('Connection', () => {
    it('should define connection with source and target', () => {
      const conn: Connection = {
        source: 'node-1',
        target: 'node-2'
      }
      expect(conn.source).toBe('node-1')
      expect(conn.target).toBe('node-2')
    })

    it('should support optional handles', () => {
      const conn: Connection = {
        source: 'node-1',
        target: 'node-2',
        sourceHandle: 'handle-top',
        targetHandle: null
      }
      expect(conn.sourceHandle).toBe('handle-top')
      expect(conn.targetHandle).toBeNull()
    })
  })

  describe('EdgeStyle', () => {
    it('should allow style properties', () => {
      const style: EdgeStyle = {
        stroke: '#409eff',
        strokeWidth: 2,
        strokeDasharray: '5,5'
      }
      expect(style.stroke).toBe('#409eff')
      expect(style.strokeWidth).toBe(2)
      expect(style.strokeDasharray).toBe('5,5')
    })

    it('should support custom properties', () => {
      const style: EdgeStyle = {
        stroke: '#fff',
        customProp: 'value'
      }
      expect((style as Record<string, unknown>).customProp).toBe('value')
    })
  })

  describe('EdgeData', () => {
    it('should define edge data with label and style', () => {
      const data: EdgeData = {
        label: 'Edge Label',
        type: 'bezier',
        animated: true,
        style: { stroke: '#000' }
      }
      expect(data.label).toBe('Edge Label')
      expect(data.type).toBe('bezier')
      expect(data.animated).toBe(true)
    })

    it('should support label styling options', () => {
      const data: EdgeData = {
        label: 'Test',
        labelStyle: { color: '#fff' },
        labelShowBg: true,
        labelBgColor: '#000',
        labelBgPadding: [4, 4],
        labelBgBorderRadius: 4
      }
      expect(data.labelShowBg).toBe(true)
      expect(data.labelBgColor).toBe('#000')
      expect(data.labelBgPadding).toEqual([4, 4])
    })
  })

  describe('Edge', () => {
    it('should create basic edge', () => {
      const edge: Edge = {
        id: 'edge-1',
        source: 'node-1',
        target: 'node-2'
      }
      expect(edge.id).toBe('edge-1')
      expect(edge.source).toBe('node-1')
      expect(edge.target).toBe('node-2')
    })

    it('should support optional edge properties', () => {
      const edge: Edge = {
        id: 'edge-1',
        source: 'node-1',
        target: 'node-2',
        type: 'smoothstep',
        animated: true,
        label: 'Flow',
        selectable: true,
        deletable: true,
        hidden: false,
        selected: false,
        zIndex: 1
      }
      expect(edge.type).toBe('smoothstep')
      expect(edge.animated).toBe(true)
      expect(edge.label).toBe('Flow')
    })

    it('should support marker definitions', () => {
      const edge: Edge = {
        id: 'edge-1',
        source: 'node-1',
        target: 'node-2',
        markerEnd: 'arrow',
        markerStart: { type: 'arrow', color: '#000', width: 12, height: 12 }
      }
      expect(edge.markerEnd).toBe('arrow')
      expect(edge.markerStart).toEqual({ type: 'arrow', color: '#000', width: 12, height: 12 })
    })

    it('should support updatable configuration', () => {
      const edgeSource: Edge = {
        id: 'edge-1',
        source: 'node-1',
        target: 'node-2',
        updatable: 'source'
      }
      const edgeTarget: Edge = {
        id: 'edge-2',
        source: 'node-2',
        target: 'node-3',
        updatable: 'target'
      }
      const edgeBoth: Edge = {
        id: 'edge-3',
        source: 'node-3',
        target: 'node-4',
        updatable: true
      }
      const edgeFixed: Edge = {
        id: 'edge-4',
        source: 'node-4',
        target: 'node-5',
        updatable: false
      }
      expect(edgeSource.updatable).toBe('source')
      expect(edgeTarget.updatable).toBe('target')
      expect(edgeBoth.updatable).toBe(true)
      expect(edgeFixed.updatable).toBe(false)
    })
  })

  describe('EdgeChangeType', () => {
    it('should define all change types', () => {
      const types: EdgeChangeType[] = ['select', 'remove', 'style', 'data', 'selectMulti', 'unselect']
      expect(types).toContain('select')
      expect(types).toContain('remove')
      expect(types).toContain('style')
      expect(types).toContain('data')
    })
  })

  describe('EdgeChange', () => {
    it('should create edge change object', () => {
      const edge: Edge = { id: 'edge-1', source: 'n1', target: 'n2' }
      const change: EdgeChange = {
        type: 'select',
        id: 'edge-1',
        item: edge,
        selected: true
      }
      expect(change.type).toBe('select')
      expect(change.selected).toBe(true)
    })

    it('should support style change', () => {
      const edge: Edge = { id: 'edge-1', source: 'n1', target: 'n2' }
      const change: EdgeChange = {
        type: 'style',
        id: 'edge-1',
        item: edge,
        style: { stroke: '#f00', strokeWidth: 3 }
      }
      expect(change.style?.stroke).toBe('#f00')
    })

    it('should support data change', () => {
      const edge: Edge = { id: 'edge-1', source: 'n1', target: 'n2' }
      const change: EdgeChange = {
        type: 'data',
        id: 'edge-1',
        item: edge,
        data: { label: 'Updated', animated: true }
      }
      expect(change.data?.label).toBe('Updated')
    })
  })

  describe('isEdge', () => {
    it('should return true for valid edge objects', () => {
      const edge: Edge = { id: 'e1', source: 'n1', target: 'n2' }
      expect(isEdge(edge)).toBe(true)
    })

    it('should return true for edge with optional properties', () => {
      const edge: Edge = {
        id: 'e1',
        source: 'n1',
        target: 'n2',
        type: 'bezier',
        label: 'Test'
      }
      expect(isEdge(edge)).toBe(true)
    })

    it('should return false for null', () => {
      expect(isEdge(null)).toBe(false)
    })

    it('should return false for undefined', () => {
      expect(isEdge(undefined)).toBe(false)
    })

    it('should return false for object missing source', () => {
      expect(isEdge({ id: 'e1', target: 'n2' } as unknown as Edge)).toBe(false)
    })

    it('should return false for object missing target', () => {
      expect(isEdge({ id: 'e1', source: 'n1' } as unknown as Edge)).toBe(false)
    })

    it('should return false for primitive values', () => {
      expect(isEdge('edge' as unknown)).toBe(false)
      expect(isEdge(123 as unknown)).toBe(false)
      expect(isEdge(true as unknown)).toBe(false)
    })

    it('should return false for arrays', () => {
      expect(isEdge([] as unknown)).toBe(false)
    })
  })
})
