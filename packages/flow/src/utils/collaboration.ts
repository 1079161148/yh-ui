/**
 * ============================================
 * Flow Collaboration System
 * Flow 实时协作系统 - CRDT + WebSocket 实现
 * ============================================
 */

import type { Node, Edge, ViewportTransform } from '../types'

// 协作操作类型
export type OperationType =
  | 'node_add'
  | 'node_update'
  | 'node_delete'
  | 'edge_add'
  | 'edge_update'
  | 'edge_delete'
  | 'viewport_change'
  | 'selection_change'
  | 'cursor_move'

// 协作操作
export interface CollaborationOperation {
  id: string
  type: OperationType
  timestamp: number
  userId: string
  nodeId?: string
  edgeId?: string
  data?: unknown
  version: number
}

// 用户信息
export interface CollaborationUser {
  id: string
  name: string
  color: string
  cursor?: { x: number; y: number }
  selection?: string[]
  lastActive: number
}

// 房间信息
export interface CollaborationRoom {
  id: string
  name: string
  ownerId: string
  users: Map<string, CollaborationUser>
  nodes: Map<string, Node>
  edges: Map<string, Edge>
  viewport: ViewportTransform
  version: number
  createdAt: number
}

// CRDT 状态
export interface CRDTState {
  nodes: Map<string, Node>
  edges: Map<string, Edge>
  viewport: ViewportTransform
  version: number
  pendingOps: CollaborationOperation[]
  acknowledgedOps: CollaborationOperation[]
}

// 事件类型
export interface CollaborationEvent {
  type:
    | 'user_joined'
    | 'user_left'
    | 'operation'
    | 'sync'
    | 'cursor_update'
    | 'selection_update'
    | 'error'
    | 'disconnected'
    | 'connecting'
    | 'connected'
    | 'reconnecting'
  userId?: string
  data?: unknown
  error?: unknown
  timestamp: number
}

// WebSocket 消息
export interface WSMessage {
  type: 'join' | 'leave' | 'operation' | 'sync' | 'cursor' | 'selection' | 'error' | 'ping'
  roomId: string
  userId: string
  payload: unknown
  timestamp: number
}

// 连接状态
export type ConnectionState = 'disconnected' | 'connecting' | 'connected' | 'reconnecting'

/**
 * 协作引擎核心类
 */
export class FlowCollaborationEngine {
  private roomId: string = ''
  private userId: string = ''
  private userName: string = ''
  private userColor: string = ''
  private state: CRDTState
  private ws: WebSocket | null = null
  private connectionState: ConnectionState = 'disconnected'
  private eventListeners: Map<string, ((event: CollaborationEvent) => void)[]> = new Map()
  private reconnectAttempts: number = 0
  private maxReconnectAttempts: number = 5
  private reconnectDelay: number = 1000
  private pingInterval: number | null = null
  private pendingOperations: Map<string, CollaborationOperation> = new Map()
  private versionVector: Map<string, number> = new Map()

  // 用户光标信息
  private cursors: Map<string, { x: number; y: number; name: string; color: string }> = new Map()

  constructor() {
    this.state = {
      nodes: new Map(),
      edges: new Map(),
      viewport: { x: 0, y: 0, zoom: 1 },
      version: 0,
      pendingOps: [],
      acknowledgedOps: []
    }
  }

  /**
   * 连接到协作房间
   */
  async connect(options: {
    serverUrl: string
    roomId: string
    userId: string
    userName: string
    initialNodes?: Node[]
    initialEdges?: Edge[]
  }): Promise<void> {
    const { serverUrl, roomId, userId, userName, initialNodes = [], initialEdges = [] } = options

    this.roomId = roomId
    this.userId = userId
    this.userName = userName
    this.userColor = this.generateUserColor(userId)

    // 初始化状态
    this.state.nodes = new Map(initialNodes.map((n) => [n.id, n]))
    this.state.edges = new Map(initialEdges.map((e) => [e.id, e]))

    return new Promise((resolve, reject) => {
      try {
        this.setConnectionState('connecting')
        this.ws = new WebSocket(serverUrl)

        this.ws.onopen = () => {
          this.setConnectionState('connected')
          this.reconnectAttempts = 0

          // 发送加入房间消息
          this.send({
            type: 'join',
            roomId: this.roomId,
            userId: this.userId,
            payload: {
              userName: this.userName,
              userColor: this.userColor,
              nodes: initialNodes,
              edges: initialEdges
            },
            timestamp: Date.now()
          })

          // 启动心跳
          this.startPing()
          resolve()
        }

        this.ws.onmessage = (event) => {
          const { data } = event
          if (typeof data !== 'string') return

          try {
            const message = JSON.parse(data)
            // 严谨的协议结构校验
            if (this.isValidWSMessage(message)) {
              this.handleMessage(message)
            }
          } catch {
            // 解析失败视为非协议消息（如开发环境心跳），静默丢弃
          }
        }

        this.ws.onerror = (error) => {
          console.error('WebSocket error:', error)
          this.emitEvent('error', { type: 'error', error, timestamp: Date.now() })
        }

        this.ws.onclose = () => {
          this.setConnectionState('disconnected')
          this.stopPing()
          this.handleDisconnect()
        }
      } catch (error) {
        this.setConnectionState('disconnected')
        reject(error)
      }
    })
  }

  /**
   * 断开连接
   */
  disconnect(): void {
    if (this.ws) {
      this.send({
        type: 'leave',
        roomId: this.roomId,
        userId: this.userId,
        payload: {},
        timestamp: Date.now()
      })
      this.ws.close()
      this.ws = null
    }
    this.setConnectionState('disconnected')
    this.stopPing()
  }

  /**
   * 添加节点
   */
  addNode(node: Node): void {
    const operation: CollaborationOperation = {
      id: `op_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      type: 'node_add',
      timestamp: Date.now(),
      userId: this.userId,
      nodeId: node.id,
      data: node,
      version: this.state.version + 1
    }

    this.applyOperation(operation)
    this.broadcastOperation(operation)
  }

  /**
   * 更新节点
   */
  updateNode(nodeId: string, updates: Partial<Node>): void {
    const operation: CollaborationOperation = {
      id: `op_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      type: 'node_update',
      timestamp: Date.now(),
      userId: this.userId,
      nodeId,
      data: updates,
      version: this.state.version + 1
    }

    this.applyOperation(operation)
    this.broadcastOperation(operation)
  }

  /**
   * 删除节点
   */
  deleteNode(nodeId: string): void {
    const operation: CollaborationOperation = {
      id: `op_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      type: 'node_delete',
      timestamp: Date.now(),
      userId: this.userId,
      nodeId,
      version: this.state.version + 1
    }

    this.applyOperation(operation)
    this.broadcastOperation(operation)
  }

  /**
   * 添加边
   */
  addEdge(edge: Edge): void {
    const operation: CollaborationOperation = {
      id: `op_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      type: 'edge_add',
      timestamp: Date.now(),
      userId: this.userId,
      edgeId: edge.id,
      data: edge,
      version: this.state.version + 1
    }

    this.applyOperation(operation)
    this.broadcastOperation(operation)
  }

  /**
   * 更新边
   */
  updateEdge(edgeId: string, updates: Partial<Edge>): void {
    const operation: CollaborationOperation = {
      id: `op_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      type: 'edge_update',
      timestamp: Date.now(),
      userId: this.userId,
      edgeId,
      data: updates,
      version: this.state.version + 1
    }

    this.applyOperation(operation)
    this.broadcastOperation(operation)
  }

  /**
   * 删除边
   */
  deleteEdge(edgeId: string): void {
    const operation: CollaborationOperation = {
      id: `op_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      type: 'edge_delete',
      timestamp: Date.now(),
      userId: this.userId,
      edgeId,
      version: this.state.version + 1
    }

    this.applyOperation(operation)
    this.broadcastOperation(operation)
  }

  /**
   * 更新视口
   */
  updateViewport(viewport: ViewportTransform): void {
    const operation: CollaborationOperation = {
      id: `op_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      type: 'viewport_change',
      timestamp: Date.now(),
      userId: this.userId,
      data: viewport,
      version: this.state.version + 1
    }

    this.state.viewport = viewport
    this.broadcastOperation(operation, true) // 视口变更不等待确认
  }

  /**
   * 更新光标位置
   */
  updateCursor(x: number, y: number): void {
    this.send({
      type: 'cursor',
      roomId: this.roomId,
      userId: this.userId,
      payload: { x, y, name: this.userName, color: this.userColor },
      timestamp: Date.now()
    })
  }

  /**
   * 更新选区
   */
  updateSelection(nodeIds: string[]): void {
    this.send({
      type: 'selection',
      roomId: this.roomId,
      userId: this.userId,
      payload: { nodeIds },
      timestamp: Date.now()
    })
  }

  /**
   * 获取当前状态
   */
  getState(): { nodes: Node[]; edges: Edge[]; viewport: ViewportTransform } {
    return {
      nodes: Array.from(this.state.nodes.values()),
      edges: Array.from(this.state.edges.values()),
      viewport: this.state.viewport
    }
  }

  /**
   * 获取连接状态
   */
  getConnectionState(): ConnectionState {
    return this.connectionState
  }

  /**
   * 获取其他用户光标
   */
  getCursors(): Map<string, { x: number; y: number; name: string; color: string }> {
    return this.cursors
  }

  /**
   * 注册事件监听
   */
  on(event: string, callback: (event: CollaborationEvent) => void): void {
    const listeners = this.eventListeners.get(event) || []
    listeners.push(callback)
    this.eventListeners.set(event, listeners)
  }

  /**
   * 移除事件监听
   */
  off(event: string, callback: (event: CollaborationEvent) => void): void {
    const listeners = this.eventListeners.get(event) || []
    const index = listeners.indexOf(callback)
    if (index > -1) {
      listeners.splice(index, 1)
    }
  }

  // ==================== 私有方法 ====================

  /**
   * 严谨校验消息是否符合 WSMessage 协议结构
   */
  private isValidWSMessage(message: unknown): message is WSMessage {
    if (message && typeof message === 'object') {
      const m = message as Record<string, unknown>
      return (
        typeof m.type === 'string' &&
        typeof m.roomId === 'string' &&
        typeof m.userId === 'string' &&
        'payload' in m
      )
    }
    return false
  }

  private send(message: WSMessage): void {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify(message))
    }
  }

  private handleMessage(message: WSMessage): void {
    switch (message.type) {
      case 'sync':
        this.handleSync(message.payload as Parameters<typeof this.handleSync>[0])
        break
      case 'operation':
        this.handleRemoteOperation(message.payload as CollaborationOperation)
        break
      case 'cursor':
        this.handleCursorUpdate(
          message.userId,
          message.payload as Parameters<typeof this.handleCursorUpdate>[1]
        )
        break
      case 'selection':
        this.handleSelectionUpdate(
          message.userId,
          message.payload as Parameters<typeof this.handleSelectionUpdate>[1]
        )
        break
      case 'join':
        this.handleUserJoin(
          message.userId,
          message.payload as Parameters<typeof this.handleUserJoin>[1]
        )
        break
      case 'leave':
        this.handleUserLeave(message.userId)
        break
    }
  }

  private handleSync(payload: {
    nodes: Node[]
    edges: Edge[]
    viewport: ViewportTransform
    version: number
    users?: Array<{ id: string; name: string; color: string }>
  }): void {
    this.state.nodes = new Map(payload.nodes.map((n) => [n.id, n]))
    this.state.edges = new Map(payload.edges.map((e) => [e.id, e]))
    this.state.viewport = payload.viewport
    this.state.version = payload.version

    this.emitEvent('sync', {
      type: 'sync',
      data: payload,
      timestamp: Date.now()
    })
  }

  private handleRemoteOperation(operation: CollaborationOperation): void {
    // 忽略自己发起的操作
    if (operation.userId === this.userId) {
      return
    }

    this.applyOperation(operation)

    this.emitEvent('operation', {
      type: 'operation',
      userId: operation.userId,
      data: operation,
      timestamp: Date.now()
    })
  }

  private applyOperation(operation: CollaborationOperation): void {
    switch (operation.type) {
      case 'node_add':
        if (operation.nodeId && operation.data) {
          this.state.nodes.set(operation.nodeId, operation.data as Node)
        }
        break
      case 'node_update':
        if (operation.nodeId) {
          const existing = this.state.nodes.get(operation.nodeId)
          if (existing) {
            this.state.nodes.set(operation.nodeId, {
              ...existing,
              ...(operation.data as Partial<Node>)
            })
          }
        }
        break
      case 'node_delete':
        if (operation.nodeId) {
          this.state.nodes.delete(operation.nodeId)
          // 同时删除关联的边
          for (const [edgeId, edge] of this.state.edges) {
            if (edge.source === operation.nodeId || edge.target === operation.nodeId) {
              this.state.edges.delete(edgeId)
            }
          }
        }
        break
      case 'edge_add':
        if (operation.edgeId && operation.data) {
          this.state.edges.set(operation.edgeId, operation.data as Edge)
        }
        break
      case 'edge_update':
        if (operation.edgeId) {
          const existing = this.state.edges.get(operation.edgeId)
          if (existing) {
            this.state.edges.set(operation.edgeId, {
              ...existing,
              ...(operation.data as Partial<Edge>)
            })
          }
        }
        break
      case 'edge_delete':
        if (operation.edgeId) {
          this.state.edges.delete(operation.edgeId)
        }
        break
      case 'viewport_change':
        if (operation.data) {
          this.state.viewport = operation.data as ViewportTransform
        }
        break
    }

    this.state.version = operation.version
    this.versionVector.set(operation.userId, (this.versionVector.get(operation.userId) || 0) + 1)
  }

  private broadcastOperation(operation: CollaborationOperation, unreliable: boolean = false): void {
    this.pendingOperations.set(operation.id, operation)

    this.send({
      type: 'operation',
      roomId: this.roomId,
      userId: this.userId,
      payload: operation,
      timestamp: Date.now()
    })

    // 对于不可靠传输，直接移除待确认列表
    if (unreliable) {
      this.pendingOperations.delete(operation.id)
    }
  }

  private handleCursorUpdate(
    userId: string,
    payload: { x: number; y: number; name: string; color: string }
  ): void {
    this.cursors.set(userId, {
      x: payload.x,
      y: payload.y,
      name: payload.name,
      color: payload.color
    })

    this.emitEvent('cursor_update', {
      type: 'cursor_update',
      userId,
      data: payload,
      timestamp: Date.now()
    })
  }

  private handleSelectionUpdate(userId: string, payload: { nodeIds: string[] }): void {
    this.emitEvent('selection_update', {
      type: 'selection_update',
      userId,
      data: payload,
      timestamp: Date.now()
    })
  }

  private handleUserJoin(userId: string, payload: { userName: string; userColor: string }): void {
    this.emitEvent('user_joined', {
      type: 'user_joined',
      userId,
      data: payload,
      timestamp: Date.now()
    })
  }

  private handleUserLeave(userId: string): void {
    this.cursors.delete(userId)
    this.emitEvent('user_left', {
      type: 'user_left',
      userId,
      timestamp: Date.now()
    })
  }

  private setConnectionState(state: ConnectionState): void {
    this.connectionState = state
    this.emitEvent(state, { type: 'sync', timestamp: Date.now() })
  }

  private handleDisconnect(): void {
    if (this.reconnectAttempts < this.maxReconnectAttempts) {
      this.reconnectAttempts++
      const delay = this.reconnectDelay * Math.pow(2, this.reconnectAttempts - 1)

      this.setConnectionState('reconnecting')

      setTimeout(() => {
        this.reconnect()
      }, delay)
    }
  }

  private async reconnect(): Promise<void> {
    // 重新连接逻辑
    console.log(`Reconnect attempt ${this.reconnectAttempts}/${this.maxReconnectAttempts}`)
  }

  private startPing(): void {
    this.pingInterval = window.setInterval(() => {
      this.send({
        type: 'ping',
        roomId: this.roomId,
        userId: this.userId,
        payload: {},
        timestamp: Date.now()
      })
    }, 30000)
  }

  private stopPing(): void {
    if (this.pingInterval) {
      clearInterval(this.pingInterval)
      this.pingInterval = null
    }
  }

  private emitEvent(eventType: string, event: CollaborationEvent): void {
    const listeners = this.eventListeners.get(eventType) || []
    for (const listener of listeners) {
      listener(event)
    }
    // 也触发通配事件
    const wildcardListeners = this.eventListeners.get('*') || []
    for (const listener of wildcardListeners) {
      listener(event)
    }
  }

  private generateUserColor(userId: string): string {
    const colors = [
      '#f56565',
      '#ed8936',
      '#48bb78',
      '#4299e1',
      '#667eea',
      '#ed64a6',
      '#a0aec0',
      '#fc8181'
    ]
    let hash = 0
    for (let i = 0; i < userId.length; i++) {
      hash = userId.charCodeAt(i) + ((hash << 5) - hash)
    }
    return colors[Math.abs(hash) % colors.length]
  }
}

/**
 * 创建协作引擎实例
 */
export function createCollaborationEngine(): FlowCollaborationEngine {
  return new FlowCollaborationEngine()
}

// ==================== 使用示例 ====================

/*
// 1. 在应用中初始化协作
const collab = createCollaborationEngine()

// 监听事件
collab.on('sync', (event) => {
  console.log('同步完成:', event.data)
})

collab.on('operation', (event) => {
  console.log('远程操作:', event.data)
})

collab.on('cursor_update', (event) => {
  // 更新其他用户的光标显示
  updateRemoteCursors(collab.getCursors())
})

collab.on('user_joined', (event) => {
  console.log('用户加入:', event.userId)
})

collab.on('user_left', (event) => {
  console.log('用户离开:', event.userId)
})

// 2. 连接到房间
await collab.connect({
  serverUrl: 'wss://your-collaboration-server.com/ws',
  roomId: 'room-123',
  userId: 'user-456',
  userName: '张三',
  initialNodes: flowRef.value.getNodes(),
  initialEdges: flowRef.value.getEdges()
})

// 3. 本地操作会自动同步
collab.addNode(newNode)
collab.updateNode('node-1', { position: { x: 100, y: 200 } })
collab.deleteNode('node-2')

// 4. 实时光标同步
flowRef.value.on('nodeDrag', ({ node }) => {
  collab.updateCursor(node.position.x, node.position.y)
})

// 5. 选区同步
flowRef.value.on('selectionChange', ({ nodes }) => {
  collab.updateSelection(nodes.map(n => n.id))
})

// 6. 断开连接
collab.disconnect()
*/
