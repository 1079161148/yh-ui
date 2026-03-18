import { describe, it, expect } from 'vitest'
import type { Node, NodeHandle, HandleType, Position } from '../types/node'

// Extract getHandles logic for testing (since it's a private function in the component)
// This test file tests the handle logic for different node types
const getHandles = (node: Node, type: HandleType): NodeHandle[] => {
  if (node.handleBounds) {
    const handles: NodeHandle[] = []
    if (node.handleBounds.top) handles.push(...node.handleBounds.top)
    if (node.handleBounds.right) handles.push(...node.handleBounds.right)
    if (node.handleBounds.bottom) handles.push(...node.handleBounds.bottom)
    if (node.handleBounds.left) handles.push(...node.handleBounds.left)
    return handles.filter((h) => h.type === type)
  }

  if (node.type === 'group') {
    return []
  }

  // 默认 handles 策略
  if (node.type === 'input') {
    return type === 'source' ? [{ type: 'source', position: 'right' as Position }] : []
  }
  if (node.type === 'output') {
    return type === 'target' ? [{ type: 'target', position: 'left' as Position }] : []
  }

  // BPMN 节点 handle 策略
  if (node.type === 'bpmn-start') {
    return type === 'source' ? [{ type: 'source', position: 'right' as Position }] : []
  }
  if (node.type === 'bpmn-end') {
    return type === 'target' ? [{ type: 'target', position: 'left' as Position }] : []
  }
  if (
    node.type === 'bpmn-task' ||
    node.type === 'bpmn-service-task' ||
    node.type === 'bpmn-user-task'
  ) {
    return [
      { type: 'target', position: 'left' as Position },
      { type: 'source', position: 'right' as Position }
    ].filter((h) => h.type === type)
  }
  if (
    node.type === 'bpmn-exclusive-gateway' ||
    node.type === 'bpmn-parallel-gateway' ||
    node.type === 'bpmn-inclusive-gateway'
  ) {
    return [
      { type: 'target', position: 'left' as Position },
      { type: 'source', position: 'right' as Position },
      { type: 'target', position: 'top' as Position },
      { type: 'source', position: 'bottom' as Position }
    ].filter((h) => h.type === type)
  }

  // AI Workflow 节点 handle 策略
  if (node.type === 'ai-start') {
    return type === 'source' ? [{ type: 'source', position: 'right' as Position }] : []
  }
  if (node.type === 'ai-end') {
    return type === 'target' ? [{ type: 'target', position: 'left' as Position }] : []
  }
  if (node.type === 'ai-condition') {
    return [
      { type: 'target', position: 'left' as Position },
      { type: 'source', position: 'right' as Position }, // true
      { type: 'source', position: 'bottom' as Position } // false
    ].filter((h) => h.type === type)
  }
  if (
    node.type === 'ai-llm' ||
    node.type === 'ai-prompt' ||
    node.type === 'ai-agent' ||
    node.type === 'ai-tool' ||
    node.type === 'ai-memory'
  ) {
    return [
      { type: 'target', position: 'left' as Position },
      { type: 'source', position: 'right' as Position }
    ].filter((h) => h.type === type)
  }

  // 默认：左侧 target，右侧 source
  return [
    { type: 'target', position: 'left' as Position },
    { type: 'source', position: 'right' as Position }
  ].filter((h) => h.type === type)
}

describe('flow/utils/node-handles', () => {
  describe('Default node handles', () => {
    it('should return handles for default node type', () => {
      const node: Node = {
        id: '1',
        type: 'default',
        position: { x: 0, y: 0 },
        data: { label: 'Test' }
      }
      const handles = getHandles(node, 'source')
      expect(handles).toBeDefined()
      expect(handles.length).toBeGreaterThan(0)
    })

    it('should return source and target handles for default node', () => {
      const node: Node = {
        id: '1',
        type: 'default',
        position: { x: 0, y: 0 },
        data: { label: 'Test' }
      }
      const sourceHandles = getHandles(node, 'source')
      const targetHandles = getHandles(node, 'target')
      expect(sourceHandles.length).toBe(1)
      expect(sourceHandles[0]?.position).toBe('right')
      expect(targetHandles.length).toBe(1)
      expect(targetHandles[0]?.position).toBe('left')
    })
  })

  describe('BPMN node handles', () => {
    it('should return source handle for bpmn-start', () => {
      const node: Node = {
        id: 'start1',
        type: 'bpmn-start',
        position: { x: 0, y: 0 },
        data: { label: 'Start' }
      }
      const handles = getHandles(node, 'source')
      expect(handles.length).toBe(1)
      expect(handles[0]?.position).toBe('right')
    })

    it('should return target handle for bpmn-end', () => {
      const node: Node = {
        id: 'end1',
        type: 'bpmn-end',
        position: { x: 0, y: 0 },
        data: { label: 'End' }
      }
      const handles = getHandles(node, 'target')
      expect(handles.length).toBe(1)
      expect(handles[0]?.position).toBe('left')
    })

    it('should return both handles for bpmn-task', () => {
      const node: Node = {
        id: 'task1',
        type: 'bpmn-task',
        position: { x: 0, y: 0 },
        data: { label: 'Task' }
      }
      const sourceHandles = getHandles(node, 'source')
      const targetHandles = getHandles(node, 'target')
      expect(sourceHandles.length).toBe(1)
      expect(targetHandles.length).toBe(1)
    })

    it('should return 4 handles for bpmn-exclusive-gateway', () => {
      const node: Node = {
        id: 'gw1',
        type: 'bpmn-exclusive-gateway',
        position: { x: 0, y: 0 },
        data: { label: 'Gateway' }
      }
      const sourceHandles = getHandles(node, 'source')
      const targetHandles = getHandles(node, 'target')
      expect(sourceHandles.length).toBe(2)
      expect(targetHandles.length).toBe(2)
    })
  })

  describe('AI Workflow node handles', () => {
    it('should return handles for ai-llm', () => {
      const node: Node = {
        id: 'llm1',
        type: 'ai-llm',
        position: { x: 0, y: 0 },
        data: { label: 'LLM', model: 'gpt-4' }
      }
      const sourceHandles = getHandles(node, 'source')
      const targetHandles = getHandles(node, 'target')
      expect(sourceHandles.length).toBe(1)
      expect(targetHandles.length).toBe(1)
    })

    it('should return source handle for ai-start', () => {
      const node: Node = {
        id: 'start1',
        type: 'ai-start',
        position: { x: 0, y: 0 },
        data: { label: 'Start' }
      }
      const handles = getHandles(node, 'source')
      expect(handles.length).toBe(1)
      expect(handles[0]?.position).toBe('right')
    })

    it('should return target handle for ai-end', () => {
      const node: Node = {
        id: 'end1',
        type: 'ai-end',
        position: { x: 0, y: 0 },
        data: { label: 'End' }
      }
      const handles = getHandles(node, 'target')
      expect(handles.length).toBe(1)
      expect(handles[0]?.position).toBe('left')
    })

    it('should return 3 handles for ai-condition (left target, right source, bottom source)', () => {
      const node: Node = {
        id: 'cond1',
        type: 'ai-condition',
        position: { x: 0, y: 0 },
        data: { label: 'Condition', condition: 'if' }
      }
      const sourceHandles = getHandles(node, 'source')
      const targetHandles = getHandles(node, 'target')
      expect(sourceHandles.length).toBe(2)
      expect(targetHandles.length).toBe(1)
    })
  })

  describe('Input/Output node handles', () => {
    it('should return only source handle for input node', () => {
      const node: Node = {
        id: 'input1',
        type: 'input',
        position: { x: 0, y: 0 },
        data: { label: 'Input' }
      }
      const sourceHandles = getHandles(node, 'source')
      const targetHandles = getHandles(node, 'target')
      expect(sourceHandles.length).toBe(1)
      expect(targetHandles.length).toBe(0)
    })

    it('should return only target handle for output node', () => {
      const node: Node = {
        id: 'output1',
        type: 'output',
        position: { x: 0, y: 0 },
        data: { label: 'Output' }
      }
      const sourceHandles = getHandles(node, 'source')
      const targetHandles = getHandles(node, 'target')
      expect(sourceHandles.length).toBe(0)
      expect(targetHandles.length).toBe(1)
    })
  })

  describe('Group node handles', () => {
    it('should return empty array for group node', () => {
      const node: Node = {
        id: 'group1',
        type: 'group',
        position: { x: 0, y: 0 },
        data: { label: 'Group' }
      }
      const sourceHandles = getHandles(node, 'source')
      const targetHandles = getHandles(node, 'target')
      expect(sourceHandles.length).toBe(0)
      expect(targetHandles.length).toBe(0)
    })
  })
})
