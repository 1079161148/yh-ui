/**
 * ============================================
 * BPMN Process Engine
 * BPMN 流程执行/模拟引擎
 * ============================================
 */

import type { Node, Edge } from '../types'

// 流程状态
export type ProcessState = 'idle' | 'running' | 'paused' | 'completed' | 'terminated'

// 令牌状态
export type TokenState = 'waiting' | 'active' | 'completed' | 'terminated'

// 节点实例
export interface NodeInstance {
  nodeId: string
  nodeType: string
  status: TokenState
  startTime?: number
  endTime?: number
  variables: Record<string, unknown>
  incomingTokens: string[]
  outgoingTokens: string[]
}

// 连线实例
export interface EdgeInstance {
  edgeId: string
  sourceNodeId: string
  targetNodeId: string
  taken: boolean
  conditionResult?: boolean
}

// 流程实例
export interface ProcessInstance {
  id: string
  processDefinitionId: string
  state: ProcessState
  startTime: number
  endTime?: number
  nodes: Map<string, NodeInstance>
  edges: Map<string, EdgeInstance>
  tokens: Map<string, { nodeId: string; state: TokenState }>
  variables: Record<string, unknown>
  currentNodes: string[]
  completedNodes: string[]
  history: ProcessEvent[]
}

// 流程事件
export interface ProcessEvent {
  type:
    | 'node_entered'
    | 'node_exited'
    | 'token_created'
    | 'token_consumed'
    | 'condition_evaluated'
    | 'error'
  timestamp: number
  nodeId?: string
  edgeId?: string
  tokenId?: string
  targetRef?: string
  message?: string
  data?: unknown
}

// 引擎选项
export interface BpmnEngineOptions {
  /** 变量求值器 */
  variableEvaluator?: (expr: string, context: Record<string, unknown>) => boolean | unknown
  /** 任务执行器 */
  taskExecutor?: (node: NodeInstance, context: Record<string, unknown>) => Promise<void> | void
  /** 事件监听器 */
  eventListener?: (event: ProcessEvent) => void
  /** 自动执行 */
  autoExecute?: boolean
  /** 执行延迟 (ms) */
  executionDelay?: number
}

// 默认变量求值器
function defaultVariableEvaluator(expr: string, context: Record<string, unknown>): boolean {
  try {
    // 简单表达式解析: ${variable == value} 或 ${variable}
    const match = expr.match(/\$\{(.+)\}/)
    if (!match) return !!expr

    const expression = match[1].trim()

    // 处理比较运算
    if (expression.includes('==')) {
      const [left, right] = expression.split('==').map((s) => s.trim())
      return context[left] == right.replace(/['"]/g, '')
    }
    if (expression.includes('!=')) {
      const [left, right] = expression.split('!=').map((s) => s.trim())
      return context[left] != right.replace(/['"]/g, '')
    }
    if (expression.includes('>')) {
      const [left, right] = expression.split('>').map((s) => s.trim())
      return Number(context[left]) > Number(right)
    }
    if (expression.includes('<')) {
      const [left, right] = expression.split('<').map((s) => s.trim())
      return Number(context[left]) < Number(right)
    }

    // 简单变量引用
    return !!context[expression]
  } catch {
    return false
  }
}

/**
 * BPMN 流程引擎类
 */
export class BpmnProcessEngine {
  private nodes: Map<string, Node> = new Map()
  private edges: Map<string, Edge> = new Map()
  private instances: Map<string, ProcessInstance> = new Map()
  private options: Required<BpmnEngineOptions>
  private instanceCounter = 0

  constructor(options: BpmnEngineOptions = {}) {
    this.options = {
      variableEvaluator: options.variableEvaluator || defaultVariableEvaluator,
      taskExecutor: options.taskExecutor || (async () => {}),
      eventListener: options.eventListener || (() => {}),
      autoExecute: options.autoExecute ?? true,
      executionDelay: options.executionDelay ?? 500
    }
  }

  /**
   * 加载流程定义
   */
  loadProcess(nodes: Node[], edges: Edge[]): void {
    this.nodes.clear()
    this.edges.clear()

    for (const node of nodes) {
      this.nodes.set(node.id, node)
    }

    for (const edge of edges) {
      if (edge.source && edge.target) {
        this.edges.set(edge.id, edge)
      }
    }
  }

  /**
   * 创建流程实例
   */
  createInstance(initialVariables: Record<string, unknown> = {}): ProcessInstance {
    const instanceId = `instance_${++this.instanceCounter}`

    const instance: ProcessInstance = {
      id: instanceId,
      processDefinitionId: 'process',
      state: 'idle',
      startTime: Date.now(),
      nodes: new Map(),
      edges: new Map(),
      tokens: new Map(),
      variables: { ...initialVariables },
      currentNodes: [],
      completedNodes: [],
      history: []
    }

    // 初始化节点实例
    for (const [nodeId, node] of this.nodes) {
      instance.nodes.set(nodeId, {
        nodeId: node.id,
        nodeType: node.type,
        status: 'waiting',
        variables: {},
        incomingTokens: [],
        outgoingTokens: []
      })
    }

    // 初始化边实例
    for (const [edgeId, edge] of this.edges) {
      instance.edges.set(edgeId, {
        edgeId: edge.id,
        sourceNodeId: edge.source || '',
        targetNodeId: edge.target || '',
        taken: false
      })
    }

    this.instances.set(instanceId, instance)
    return instance
  }

  /**
   * 启动流程实例
   */
  async start(instanceId: string): Promise<ProcessInstance | null> {
    const instance = this.instances.get(instanceId)
    if (!instance) return null

    instance.state = 'running'

    // 找到开始节点
    const startNodes = Array.from(this.nodes.values()).filter((n) => n.type === 'bpmn-start')

    if (startNodes.length === 0) {
      instance.state = 'completed'
      instance.endTime = Date.now()
      return instance
    }

    // 创建初始令牌
    for (const startNode of startNodes) {
      await this.enterNode(instance, startNode.id)
    }

    // 自动执行
    if (this.options.autoExecute) {
      await this.executeAll(instance)
    }

    return instance
  }

  /**
   * 进入节点
   */
  private async enterNode(instance: ProcessInstance, nodeId: string): Promise<void> {
    const nodeInstance = instance.nodes.get(nodeId)
    if (!nodeInstance) return

    const node = this.nodes.get(nodeId)
    if (!node) return

    // 创建令牌
    const tokenId = `token_${nodeId}_${Date.now()}`
    instance.tokens.set(tokenId, { nodeId, state: 'active' })
    nodeInstance.incomingTokens.push(tokenId)

    // 记录事件
    this.emitEvent(instance, {
      type: 'node_entered',
      timestamp: Date.now(),
      nodeId,
      tokenId
    })

    // 更新节点状态
    nodeInstance.status = 'active'
    nodeInstance.startTime = Date.now()

    if (!instance.currentNodes.includes(nodeId)) {
      instance.currentNodes.push(nodeId)
    }

    // 执行任务
    await this.executeNode(instance, node)

    // 离开节点
    await this.exitNode(instance, nodeId)
  }

  /**
   * 执行节点
   */
  private async executeNode(instance: ProcessInstance, node: Node): Promise<void> {
    const nodeInstance = instance.nodes.get(node.id)
    if (!nodeInstance) return

    // 调用任务执行器
    if (['bpmn-task', 'bpmn-service-task', 'bpmn-user-task'].includes(node.type)) {
      await this.options.taskExecutor(nodeInstance, instance.variables)
    }

    // 记录执行完成事件
    this.emitEvent(instance, {
      type: 'node_exited',
      timestamp: Date.now(),
      nodeId: node.id,
      data: instance.variables
    })
  }

  /**
   * 离开节点
   */
  private async exitNode(instance: ProcessInstance, nodeId: string): Promise<void> {
    const nodeInstance = instance.nodes.get(nodeId)
    if (!nodeInstance) return

    const node = this.nodes.get(nodeId)
    if (!node) return

    // 消耗输入令牌
    for (const tokenId of nodeInstance.incomingTokens) {
      instance.tokens.delete(tokenId)

      this.emitEvent(instance, {
        type: 'token_consumed',
        timestamp: Date.now(),
        nodeId,
        tokenId
      })
    }

    // 找到输出边
    const outgoingEdges = Array.from(this.edges.values()).filter((e) => e.source === nodeId)

    for (const edge of outgoingEdges) {
      await this.takeFlow(instance, edge)
    }

    // 更新节点状态
    nodeInstance.status = 'completed'
    nodeInstance.endTime = Date.now()

    // 从当前节点列表移除
    instance.currentNodes = instance.currentNodes.filter((id) => id !== nodeId)
    instance.completedNodes.push(nodeId)
  }

  /**
   * 采用流（连线）
   */
  private async takeFlow(instance: ProcessInstance, edge: Edge): Promise<void> {
    const edgeInstance = instance.edges.get(edge.id)
    if (!edgeInstance) return

    // 检查条件
    if (edge.data?.conditionExpression) {
      const result = this.options.variableEvaluator(
        edge.data.conditionExpression as string,
        instance.variables
      )

      this.emitEvent(instance, {
        type: 'condition_evaluated',
        timestamp: Date.now(),
        edgeId: edge.id,
        nodeId: edge.source,
        data: { expression: edge.data.conditionExpression, result }
      })

      if (!result) {
        return // 条件不满足，不采用该流
      }
    }

    // 标记边已采用
    edgeInstance.taken = true

    // 创建新令牌
    const tokenId = `token_${edge.target}_${Date.now()}`
    instance.tokens.set(tokenId, { nodeId: edge.target!, state: 'waiting' })

    const targetNodeInstance = instance.nodes.get(edge.target!)
    if (targetNodeInstance) {
      targetNodeInstance.outgoingTokens.push(tokenId)
    }

    this.emitEvent(instance, {
      type: 'token_created',
      timestamp: Date.now(),
      edgeId: edge.id,
      tokenId,
      targetRef: edge.target
    })

    // 进入目标节点
    await this.enterNode(instance, edge.target!)
  }

  /**
   * 执行所有待处理节点
   */
  private async executeAll(instance: ProcessInstance): Promise<void> {
    while (instance.currentNodes.length > 0 && instance.state === 'running') {
      // 等待执行延迟
      await new Promise((resolve) => setTimeout(resolve, this.options.executionDelay))

      // 检查是否所有节点都已完成
      if (instance.currentNodes.length === 0) {
        // 检查是否所有输出边都已被采用
        const hasActiveTokens = Array.from(instance.tokens.values()).some(
          (t) => t.state === 'active'
        )

        if (!hasActiveTokens) {
          instance.state = 'completed'
          instance.endTime = Date.now()
        }
      }
    }
  }

  /**
   * 触发事件
   */
  private emitEvent(instance: ProcessInstance, event: ProcessEvent): void {
    instance.history.push(event)
    this.options.eventListener(event)
  }

  /**
   * 获取实例状态
   */
  getInstance(instanceId: string): ProcessInstance | undefined {
    return this.instances.get(instanceId)
  }

  /**
   * 设置变量
   */
  setVariable(instanceId: string, key: string, value: unknown): void {
    const instance = this.instances.get(instanceId)
    if (instance) {
      instance.variables[key] = value
    }
  }

  /**
   * 获取变量
   */
  getVariable(instanceId: string, key: string): unknown {
    const instance = this.instances.get(instanceId)
    return instance?.variables[key]
  }

  /**
   * 暂停流程
   */
  pause(instanceId: string): void {
    const instance = this.instances.get(instanceId)
    if (instance && instance.state === 'running') {
      instance.state = 'paused'
    }
  }

  /**
   * 恢复流程
   */
  async resume(instanceId: string): Promise<void> {
    const instance = this.instances.get(instanceId)
    if (instance && instance.state === 'paused') {
      instance.state = 'running'
      await this.executeAll(instance)
    }
  }

  /**
   * 终止流程
   */
  terminate(instanceId: string): void {
    const instance = this.instances.get(instanceId)
    if (instance) {
      instance.state = 'terminated'
      instance.endTime = Date.now()
    }
  }

  /**
   * 获取所有实例
   */
  getAllInstances(): ProcessInstance[] {
    return Array.from(this.instances.values())
  }

  /**
   * 获取可用的开始节点
   */
  getStartNodes(): Node[] {
    return Array.from(this.nodes.values()).filter((n) => n.type === 'bpmn-start')
  }

  /**
   * 获取可用的结束节点
   */
  getEndNodes(): Node[] {
    return Array.from(this.nodes.values()).filter((n) => n.type === 'bpmn-end')
  }

  /**
   * 获取节点的输出边
   */
  getOutgoingEdges(nodeId: string): Edge[] {
    return Array.from(this.edges.values()).filter((e) => e.source === nodeId)
  }

  /**
   * 获取节点的输入边
   */
  getIncomingEdges(nodeId: string): Edge[] {
    return Array.from(this.edges.values()).filter((e) => e.target === nodeId)
  }
}

/**
 * 创建 BPMN 引擎实例的工厂函数
 */
export function createBpmnEngine(options?: BpmnEngineOptions): BpmnProcessEngine {
  return new BpmnProcessEngine(options)
}
