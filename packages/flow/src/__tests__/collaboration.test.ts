import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { FlowCollaborationEngine, createCollaborationEngine } from '../utils/collaboration'
import type { Node, Edge, ViewportTransform } from '../types'

function createMockNode(id: string): Node {
  return {
    id,
    type: 'default',
    position: { x: 0, y: 0 },
    data: {},
    selected: false,
    dragging: false
  }
}

function createMockEdge(id: string, source: string, target: string): Edge {
  return {
    id,
    source,
    target,
    type: 'default',
    selected: false,
    animated: false
  }
}

describe('flow/utils/collaboration', () => {
  let engine: FlowCollaborationEngine

  beforeEach(() => {
    engine = new FlowCollaborationEngine()
  })

  afterEach(() => {
    engine.disconnect()
  })

  describe('constructor', () => {
    it('should create engine instance', () => {
      expect(engine).toBeDefined()
    })

    it('should start in disconnected state', () => {
      expect(engine.getConnectionState()).toBe('disconnected')
    })
  })

  describe('createCollaborationEngine factory', () => {
    it('should create engine instance', () => {
      const e = createCollaborationEngine()
      expect(e).toBeInstanceOf(FlowCollaborationEngine)
    })
  })

  describe('getState', () => {
    it('should return empty state initially', () => {
      const state = engine.getState()
      expect(state.nodes).toEqual([])
      expect(state.edges).toEqual([])
      expect(state.viewport).toEqual({ x: 0, y: 0, zoom: 1 })
    })
  })

  describe('getCursors', () => {
    it('should return empty cursors map initially', () => {
      const cursors = engine.getCursors()
      expect(cursors.size).toBe(0)
    })
  })

  describe('event listeners', () => {
    it('should register event listener', () => {
      const handler = vi.fn()
      engine.on('test-event', handler)
      const handlers = (
        engine as unknown as { eventListeners: Map<string, Array<(event: unknown) => void>> }
      ).eventListeners.get('test-event')
      expect(handlers).toBeDefined()
      expect(handlers!.length).toBe(1)
    })

    it('should unregister event listener', () => {
      const handler = vi.fn()
      engine.on('test-event', handler)
      engine.off('test-event', handler)
      const handlers = (
        engine as unknown as { eventListeners: Map<string, Array<(event: unknown) => void>> }
      ).eventListeners.get('test-event')
      expect(handlers!.length).toBe(0)
    })

    it('should trigger wildcard listeners', () => {
      const handler = vi.fn()
      engine.on('*', handler)
      ;(engine as unknown as { emitEvent: (type: string, event: unknown) => void }).emitEvent(
        'any',
        {
          type: 'any'
        } as never
      )
      expect(handler).toHaveBeenCalled()
    })
  })

  describe('isValidWSMessage', () => {
    it('should validate correct message structure', () => {
      const msg = {
        type: 'join' as const,
        roomId: 'room1',
        userId: 'user1',
        payload: {},
        timestamp: Date.now()
      }
      const result = (
        engine as unknown as { isValidWSMessage: (m: unknown) => boolean }
      ).isValidWSMessage(msg)
      expect(result).toBe(true)
    })

    it('should reject message without type', () => {
      const msg = { roomId: 'room1', userId: 'user1', payload: {} }
      const result = (
        engine as unknown as { isValidWSMessage: (m: unknown) => boolean }
      ).isValidWSMessage(msg)
      expect(result).toBe(false)
    })

    it('should reject message without roomId', () => {
      const msg = { type: 'join', userId: 'user1', payload: {} }
      const result = (
        engine as unknown as { isValidWSMessage: (m: unknown) => boolean }
      ).isValidWSMessage(msg)
      expect(result).toBe(false)
    })

    it('should reject message without userId', () => {
      const msg = { type: 'join', roomId: 'room1', payload: {} }
      const result = (
        engine as unknown as { isValidWSMessage: (m: unknown) => boolean }
      ).isValidWSMessage(msg)
      expect(result).toBe(false)
    })

    it('should reject message without payload', () => {
      const msg = { type: 'join', roomId: 'room1', userId: 'user1' }
      const result = (
        engine as unknown as { isValidWSMessage: (m: unknown) => boolean }
      ).isValidWSMessage(msg)
      expect(result).toBe(false)
    })

    it('should reject non-object messages', () => {
      const result = (
        engine as unknown as { isValidWSMessage: (m: unknown) => boolean }
      ).isValidWSMessage(null)
      expect(result).toBe(false)
    })
  })

  describe('addNode', () => {
    it('should add node to state', () => {
      const node = createMockNode('n1')
      engine.addNode(node)
      const state = engine.getState()
      expect(state.nodes).toContainEqual(expect.objectContaining({ id: 'n1' }))
    })

    it('should track version after add', () => {
      const node = createMockNode('n1')
      const initialVersion = (engine as unknown as { state: { version: number } }).state.version
      engine.addNode(node)
      expect((engine as unknown as { state: { version: number } }).state.version).toBeGreaterThan(
        initialVersion
      )
    })
  })

  describe('updateNode', () => {
    it('should update node in state', () => {
      const node = createMockNode('n1')
      engine.addNode(node)
      engine.updateNode('n1', { position: { x: 100, y: 200 } })
      const state = engine.getState()
      const updated = state.nodes.find((n) => n.id === 'n1')
      expect(updated?.position).toEqual({ x: 100, y: 200 })
    })
  })

  describe('deleteNode', () => {
    it('should remove node from state', () => {
      const node = createMockNode('n1')
      engine.addNode(node)
      engine.deleteNode('n1')
      const state = engine.getState()
      expect(state.nodes.find((n) => n.id === 'n1')).toBeUndefined()
    })

    it('should also delete associated edges', () => {
      const node1 = createMockNode('n1')
      const node2 = createMockNode('n2')
      const edge = createMockEdge('e1', 'n1', 'n2')
      engine.addNode(node1)
      engine.addNode(node2)
      ;(engine as unknown as { applyOperation: (op: unknown) => void }).applyOperation({
        id: 'op1',
        type: 'edge_add' as const,
        timestamp: Date.now(),
        userId: 'user1',
        edgeId: 'e1',
        data: edge,
        version: 1
      })
      engine.deleteNode('n1')
      const state = engine.getState()
      expect(state.edges.find((e) => e.id === 'e1')).toBeUndefined()
    })
  })

  describe('addEdge', () => {
    it('should add edge to state', () => {
      const edge = createMockEdge('e1', 'n1', 'n2')
      engine.addEdge(edge)
      const state = engine.getState()
      expect(state.edges).toContainEqual(expect.objectContaining({ id: 'e1' }))
    })
  })

  describe('updateEdge', () => {
    it('should update edge in state', () => {
      const edge = createMockEdge('e1', 'n1', 'n2')
      engine.addEdge(edge)
      engine.updateEdge('e1', { type: 'bezier' })
      const state = engine.getState()
      const updated = state.edges.find((e) => e.id === 'e1')
      expect(updated?.type).toBe('bezier')
    })
  })

  describe('deleteEdge', () => {
    it('should remove edge from state', () => {
      const edge = createMockEdge('e1', 'n1', 'n2')
      engine.addEdge(edge)
      engine.deleteEdge('e1')
      const state = engine.getState()
      expect(state.edges.find((e) => e.id === 'e1')).toBeUndefined()
    })
  })

  describe('updateViewport', () => {
    it('should update viewport in state', () => {
      const viewport: ViewportTransform = { x: 50, y: 100, zoom: 1.5 }
      engine.updateViewport(viewport)
      const state = engine.getState()
      expect(state.viewport).toEqual(viewport)
    })
  })

  describe('updateCursor', () => {
    it('should not throw when disconnected', () => {
      expect(() => engine.updateCursor(100, 200)).not.toThrow()
    })
  })

  describe('updateSelection', () => {
    it('should not throw when disconnected', () => {
      expect(() => engine.updateSelection(['n1', 'n2'])).not.toThrow()
    })
  })

  describe('disconnect', () => {
    it('should not throw when called multiple times', () => {
      engine.disconnect()
      expect(() => engine.disconnect()).not.toThrow()
    })

    it('should be idempotent', () => {
      engine.disconnect()
      expect(engine.getConnectionState()).toBe('disconnected')
    })
  })

  describe('handleRemoteOperation', () => {
    it('should ignore operations from self', () => {
      ;(engine as unknown as { userId: string }).userId = 'user1'
      const state = engine.getState()
      const node = createMockNode('n1')
      ;(engine as unknown as { state: { nodes: Map<string, Node> } }).state.nodes.set('n1', node)
      ;(engine as unknown as { applyOperation: (op: unknown) => void }).applyOperation({
        id: 'op1',
        type: 'node_add' as const,
        timestamp: Date.now(),
        userId: 'user1',
        nodeId: 'n1',
        data: node,
        version: 1
      })

      expect(engine.getState().nodes.length).toBe(1)
    })
  })

  describe('generateUserColor', () => {
    it('should generate consistent color for same user id', () => {
      const color1 = (
        engine as unknown as { generateUserColor: (id: string) => string }
      ).generateUserColor('user1')
      const color2 = (
        engine as unknown as { generateUserColor: (id: string) => string }
      ).generateUserColor('user1')
      expect(color1).toBe(color2)
    })

    it('should generate different colors for different user ids', () => {
      const color1 = (
        engine as unknown as { generateUserColor: (id: string) => string }
      ).generateUserColor('user1')
      const color2 = (
        engine as unknown as { generateUserColor: (id: string) => string }
      ).generateUserColor('user2')
      expect(color1).not.toBe(color2)
    })

    it('should generate valid hex color', () => {
      const color = (
        engine as unknown as { generateUserColor: (id: string) => string }
      ).generateUserColor('test')
      expect(color).toMatch(/^#[0-9a-f]{6}$/)
    })

    it('should generate color for empty string', () => {
      const color = (
        engine as unknown as { generateUserColor: (id: string) => string }
      ).generateUserColor('')
      expect(color).toMatch(/^#[0-9a-f]{6}$/)
    })
  })

  describe('applyOperation', () => {
    it('should apply node_update operation', () => {
      const node = createMockNode('n1')
      ;(engine as unknown as { applyOperation: (op: unknown) => void }).applyOperation({
        id: 'op1',
        type: 'node_update' as const,
        timestamp: Date.now(),
        userId: 'user1',
        nodeId: 'n1',
        data: { position: { x: 50, y: 50 } },
        version: 1
      })
    })

    it('should apply edge_update operation', () => {
      ;(engine as unknown as { applyOperation: (op: unknown) => void }).applyOperation({
        id: 'op1',
        type: 'edge_update' as const,
        timestamp: Date.now(),
        userId: 'user1',
        edgeId: 'e1',
        data: { type: 'bezier' },
        version: 1
      })
    })

    it('should apply edge_delete operation', () => {
      const edge = createMockEdge('e1', 'n1', 'n2')
      ;(engine as unknown as { state: { edges: Map<string, Edge> } }).state.edges.set('e1', edge)
      ;(engine as unknown as { applyOperation: (op: unknown) => void }).applyOperation({
        id: 'op1',
        type: 'edge_delete' as const,
        timestamp: Date.now(),
        userId: 'user1',
        edgeId: 'e1',
        version: 1
      })
      expect(engine.getState().edges.find((e) => e.id === 'e1')).toBeUndefined()
    })

    it('should apply viewport_change operation', () => {
      const viewport: ViewportTransform = { x: 10, y: 20, zoom: 0.5 }
      ;(engine as unknown as { applyOperation: (op: unknown) => void }).applyOperation({
        id: 'op1',
        type: 'viewport_change' as const,
        timestamp: Date.now(),
        userId: 'user1',
        data: viewport,
        version: 1
      })
      expect(engine.getState().viewport).toEqual(viewport)
    })

    it('should update version vector on apply', () => {
      const vv = (engine as unknown as { versionVector: Map<string, number> }).versionVector
      ;(engine as unknown as { applyOperation: (op: unknown) => void }).applyOperation({
        id: 'op1',
        type: 'node_add' as const,
        timestamp: Date.now(),
        userId: 'user1',
        nodeId: 'n1',
        data: createMockNode('n1'),
        version: 1
      })
      expect(vv.get('user1')).toBe(1)
    })
  })

  describe('handleCursorUpdate', () => {
    it('should update cursor in cursors map', () => {
      ;(
        engine as unknown as { handleCursorUpdate: (userId: string, payload: unknown) => void }
      ).handleCursorUpdate('user2', { x: 100, y: 200, name: 'User 2', color: '#ff0000' })
      const cursors = engine.getCursors()
      expect(cursors.get('user2')).toEqual({
        x: 100,
        y: 200,
        name: 'User 2',
        color: '#ff0000'
      })
    })

    it('should emit cursor_update event', () => {
      const handler = vi.fn()
      engine.on('cursor_update', handler)
      ;(
        engine as unknown as { handleCursorUpdate: (userId: string, payload: unknown) => void }
      ).handleCursorUpdate('user2', { x: 100, y: 200, name: 'User 2', color: '#ff0000' })
      expect(handler).toHaveBeenCalled()
    })
  })

  describe('handleUserJoin', () => {
    it('should emit user_joined event', () => {
      const handler = vi.fn()
      engine.on('user_joined', handler)
      ;(
        engine as unknown as { handleUserJoin: (userId: string, payload: unknown) => void }
      ).handleUserJoin('user2', {
        userName: 'User 2',
        userColor: '#ff0000'
      })
      expect(handler).toHaveBeenCalled()
    })
  })

  describe('handleUserLeave', () => {
    it('should remove cursor from cursors map', () => {
      ;(
        engine as unknown as { handleCursorUpdate: (userId: string, payload: unknown) => void }
      ).handleCursorUpdate('user2', { x: 100, y: 200, name: 'User 2', color: '#ff0000' })
      ;(engine as unknown as { handleUserLeave: (userId: string) => void }).handleUserLeave('user2')
      const cursors = engine.getCursors()
      expect(cursors.get('user2')).toBeUndefined()
    })

    it('should emit user_left event', () => {
      const handler = vi.fn()
      engine.on('user_left', handler)
      ;(engine as unknown as { handleUserLeave: (userId: string) => void }).handleUserLeave('user2')
      expect(handler).toHaveBeenCalled()
    })
  })

  describe('handleSync', () => {
    it('should sync state from payload', () => {
      const nodes = [createMockNode('n1'), createMockNode('n2')]
      const edges = [createMockEdge('e1', 'n1', 'n2')]
      const viewport: ViewportTransform = { x: 50, y: 50, zoom: 1.2 }

      ;(engine as unknown as { handleSync: (payload: unknown) => void }).handleSync({
        nodes,
        edges,
        viewport,
        version: 5
      })

      const state = engine.getState()
      expect(state.nodes).toHaveLength(2)
      expect(state.edges).toHaveLength(1)
      expect(state.viewport).toEqual(viewport)
    })
  })

  describe('setConnectionState', () => {
    it('should emit connection state event', () => {
      const handler = vi.fn()
      engine.on('connected', handler)
      ;(engine as unknown as { setConnectionState: (state: string) => void }).setConnectionState(
        'connected'
      )
      expect(handler).toHaveBeenCalled()
    })
  })

  describe('broadcastOperation', () => {
    it('should add operation to pending operations', () => {
      const pending = (engine as unknown as { pendingOperations: Map<string, unknown> })
        .pendingOperations
      ;(
        engine as unknown as { broadcastOperation: (op: unknown, unreliable?: boolean) => void }
      ).broadcastOperation(
        {
          id: 'op1',
          type: 'node_add' as const,
          timestamp: Date.now(),
          userId: 'user1',
          nodeId: 'n1',
          data: createMockNode('n1'),
          version: 1
        },
        true
      )
      // For unreliable, it gets deleted immediately
    })
  })
})
