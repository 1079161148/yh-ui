/**
 * ============================================
 * BPMN XML Import/Export Utility
 * 支持 BPMN 2.0 标准的 XML 导入导出
 * ============================================
 */

import type { Node, Edge } from '../types'

// BPMN XML 命名空间
const BPMN_NS = 'http://www.omg.org/spec/BPMN/20100524/MODEL'
const BPMN_DI_NS = 'http://www.omg.org/spec/BPMN/20100524/DI'
const BPMN_DC_NS = 'http://www.omg.org/spec/BPMN/20100524/DC'

// BPMN 节点类型映射
const NODE_TYPE_TO_BPMN: Record<string, string> = {
  'bpmn-start': 'startEvent',
  'bpmn-end': 'endEvent',
  'bpmn-task': 'task',
  'bpmn-service-task': 'serviceTask',
  'bpmn-user-task': 'userTask',
  'bpmn-exclusive-gateway': 'exclusiveGateway',
  'bpmn-parallel-gateway': 'parallelGateway',
  'bpmn-inclusive-gateway': 'inclusiveGateway'
}

// BPMN 类型到节点类型的映射
const BPMN_TO_NODE_TYPE: Record<string, string> = {
  startEvent: 'bpmn-start',
  endEvent: 'bpmn-end',
  task: 'bpmn-task',
  serviceTask: 'bpmn-service-task',
  userTask: 'bpmn-user-task',
  exclusiveGateway: 'bpmn-exclusive-gateway',
  parallelGateway: 'bpmn-parallel-gateway',
  inclusiveGateway: 'bpmn-inclusive-gateway'
}

// 网关方向映射
const GATEWAY_DIRECTION: Record<string, string> = {
  'bpmn-exclusive-gateway': 'diverging',
  'bpmn-parallel-gateway': 'diverging',
  'bpmn-inclusive-gateway': 'diverging'
}

export interface BpmnXmlOptions {
  /** BPMN 流程 ID */
  processId?: string
  /** BPMN 流程名称 */
  processName?: string
  /** 是否包含 DI (图形信息) */
  includeDi?: boolean
  /** 默认节点宽度 */
  defaultNodeWidth?: number
  /** 默认节点高度 */
  defaultNodeHeight?: number
}

export interface BpmnExportResult {
  xml: string
  processId: string
}

/**
 * 将 Flow 数据转换为 BPMN XML
 */
export function flowToBpmnXml(
  nodes: Node[],
  edges: Edge[],
  options: BpmnXmlOptions = {}
): BpmnExportResult {
  const {
    processId = 'Process_' + Date.now(),
    processName = 'Flow Process',
    includeDi = true,
    defaultNodeWidth = 100,
    defaultNodeHeight = 80
  } = options

  // 创建 DI 信息
  const diBounds: Array<{ id: string; x: number; y: number; width: number; height: number }> = []
  const diEdges: Array<{ id: string; sourceRef: string; targetRef: string }> = []

  // 生成 BPMN 元素
  const bpmnElements: string[] = []

  // 处理流程节点
  for (const node of nodes) {
    const bpmnType = NODE_TYPE_TO_BPMN[node.type]
    if (!bpmnType) continue

    const nodeWidth = node.width || defaultNodeWidth
    const nodeHeight = node.height || defaultNodeHeight

    // BPMN 元素属性
    let attributes = `id="${node.id}"`

    if (node.data?.name) {
      attributes += ` name="${node.data.name}"`
    }

    // 网关方向
    if (bpmnType.includes('Gateway')) {
      const direction = GATEWAY_DIRECTION[node.type] || 'diverging'
      attributes += ` gatewayDirection="${direction}"`
    }

    // 任务类型
    if (bpmnType === 'serviceTask') {
      attributes += ` implementation="delegateExpression"`
      if (node.data?.implementation) {
        attributes += ` delegateExpression="${node.data.implementation}"`
      }
    }

    // 用户任务分配
    if (bpmnType === 'userTask') {
      if (node.data?.assignee) {
        attributes += ` assignee="${node.data.assignee}"`
      }
      if (node.data?.candidateUsers) {
        attributes += ` candidateUsers="${node.data.candidateUsers}"`
      }
    }

    bpmnElements.push(`    <bpmn:${bpmnType} ${attributes}/>`)

    // DI 信息
    if (includeDi) {
      diBounds.push({
        id: `${node.id}_gui`,
        x: node.position.x,
        y: node.position.y,
        width: nodeWidth,
        height: nodeHeight
      })
    }
  }

  // 处理连线
  for (const edge of edges) {
    let attributes = `id="${edge.id}"`

    if (edge.source && edge.target) {
      attributes += ` sourceRef="${edge.source}" targetRef="${edge.target}"`
    }

    // 连线类型
    if (edge.type && edge.type !== 'default') {
      const edgeType = edge.type.replace('Edge', '').toLowerCase()
      if (['smooth', 'step', 'bezier'].includes(edgeType)) {
        attributes += ` messageVisibleKind="signal"`
      }
    }

    // 条件表达式
    if (edge.data?.conditionExpression) {
      bpmnElements.push(
        `    <bpmn:sequenceFlow id="${edge.id}" sourceRef="${edge.source}" targetRef="${edge.target}">` +
          `\n      <bpmn:conditionExpression xsi:type="tFormalExpression" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">` +
          `${edge.data.conditionExpression}</bpmn:conditionExpression>` +
          `\n    </bpmn:sequenceFlow>`
      )
    } else {
      bpmnElements.push(`    <bpmn:sequenceFlow ${attributes}/>`)
    }

    if (includeDi) {
      diEdges.push({
        id: `${edge.id}_di`,
        sourceRef: edge.source || '',
        targetRef: edge.target || ''
      })
    }
  }

  // 构建完整 XML
  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<bpmn:definitions xmlns:bpmn="${BPMN_NS}" xmlns:bpmndi="${BPMN_DI_NS}" xmlns:dc="${BPMN_DC_NS}" xmlns:di="${BPMN_DI_NS}" id="definitions_${processId}" targetNamespace="http://bpmn.io/schema/bpmn">
  <bpmn:process id="${processId}" name="${processName}" isExecutable="false">
${bpmnElements.join('\n')}
  </bpmn:process>`

  // DI 部分
  if (includeDi) {
    xml += `
  <bpmndi:BPMNDiagram id="BPMNDiagram_1">
    <bpmndi:BPMNPlane id="BPMNPlane_1" bpmnElement="${processId}">`

    for (const bound of diBounds) {
      xml += `
      <bpmndi:BPMNShape id="${bound.id}" bpmnElement="${bound.id.replace('_gui', '')}">
        <dc:Bounds x="${bound.x}" y="${bound.y}" width="${bound.width}" height="${bound.height}"/>
      </bpmndi:BPMNShape>`
    }

    for (const edge of diEdges) {
      xml += `
      <bpmndi:BPMNEdge id="${edge.id}_di" bpmnElement="${edge.id}"/>`
    }

    xml += `
    </bpmndi:BPMNPlane>
  </bpmndi:BPMNDiagram>`
  }

  xml += `
</bpmn:definitions>`

  return { xml, processId }
}

/**
 * 将 BPMN XML 解析为 Flow 数据
 */
export function bpmnXmlToFlow(
  xml: string,
  options: { defaultPosition?: { x: number; y: number }; nodeSpacing?: number } = {}
): { nodes: Node[]; edges: Edge[]; processId?: string; processName?: string } {
  const { defaultPosition = { x: 100, y: 100 }, nodeSpacing = 150 } = options

  const nodes: Node[] = []
  const edges: Edge[] = []

  // 解析 XML
  const parser = new DOMParser()
  const doc = parser.parseFromString(xml, 'text/xml')

  // 检查解析错误
  const parseError = doc.querySelector('parsererror')
  if (parseError) {
    throw new Error(`BPMN XML 解析失败: ${parseError.textContent}`)
  }

  // 获取流程信息
  const process = doc.querySelector('bpmn\\:process, process')
  const processId = process?.getAttribute('id') || ''
  const processName = process?.getAttribute('name') || ''

  // 解析节点位置信息
  const diShapes = new Map<string, { x: number; y: number; width: number; height: number }>()
  const bpmnShapes = Array.from(doc.querySelectorAll('bpmndi\\:BPMNShape, BPMNShape'))
  for (const shape of bpmnShapes) {
    const bpmnElement = shape.getAttribute('bpmnElement')
    const bounds = shape.querySelector('dc\\:Bounds, Bounds')
    if (bpmnElement && bounds) {
      diShapes.set(bpmnElement, {
        x: parseFloat(bounds.getAttribute('x') || '0'),
        y: parseFloat(bounds.getAttribute('y') || '0'),
        width: parseFloat(bounds.getAttribute('width') || '100'),
        height: parseFloat(bounds.getAttribute('height') || '80')
      })
    }
  }

  // 解析所有 BPMN 元素
  const bpmnElements = Array.from(
    doc.querySelectorAll(
      'bpmn\\:startEvent, bpmn\\:endEvent, bpmn\\:task, bpmn\\:serviceTask, bpmn\\:userTask, bpmn\\:exclusiveGateway, bpmn\\:parallelGateway, bpmn\\:inclusiveGateway, ' +
        'startEvent, endEvent, task, serviceTask, userTask, exclusiveGateway, parallelGateway, inclusiveGateway'
    )
  )

  // 用于自动布局的节点映射
  const nodeMap = new Map<
    string,
    { x: number; y: number; width: number; height: number; outgoing: string[] }
  >()

  // 第一遍：解析所有节点
  let maxY = defaultPosition.y
  for (const element of bpmnElements) {
    const id = element.getAttribute('id')
    const name = element.getAttribute('name') || ''
    const localName = element.localName

    const nodeType = BPMN_TO_NODE_TYPE[localName]
    if (!nodeType || !id) continue

    // 获取位置信息
    const di = diShapes.get(id)
    const position = di
      ? { x: di.x, y: di.y }
      : { x: defaultPosition.x, y: defaultPosition.y + maxY }

    const width = di?.width || 100
    const height = di?.height || 80

    // 收集扩展属性
    const data: Record<string, unknown> = { label: name || id }

    // 任务特定属性
    if (localName === 'userTask') {
      data.assignee = element.getAttribute('assignee') || ''
      data.candidateUsers = element.getAttribute('candidateUsers') || ''
    }

    if (localName === 'serviceTask') {
      data.implementation = element.getAttribute('delegateExpression') || ''
    }

    const node: Node = {
      id,
      type: nodeType,
      position,
      data,
      width,
      height,
      selected: false,
      dragging: false
    }

    nodes.push(node)
    nodeMap.set(id, {
      x: position.x,
      y: position.y,
      width,
      height,
      outgoing: []
    })

    maxY += nodeSpacing
  }

  // 解析顺序流（连线）
  const sequenceFlows = Array.from(doc.querySelectorAll('bpmn\\:sequenceFlow, sequenceFlow'))

  for (const flow of sequenceFlows) {
    const id = flow.getAttribute('id')
    const sourceRef = flow.getAttribute('sourceRef')
    const targetRef = flow.getAttribute('targetRef')

    if (!id || !sourceRef || !targetRef) continue

    // 收集条件表达式
    const conditionExpr = flow.querySelector('bpmn\\:conditionExpression, conditionExpression')
    const conditionText = conditionExpr?.textContent?.trim()

    // 更新源节点的 outgoing
    const sourceNode = nodeMap.get(sourceRef)
    if (sourceNode) {
      sourceNode.outgoing.push(id)
    }

    const edge: Edge = {
      id,
      source: sourceRef,
      target: targetRef,
      type: 'smoothstep',
      animated: false,
      selected: false,
      data: conditionText ? { conditionExpression: conditionText } : {}
    }

    edges.push(edge)
  }

  // 如果没有 DI 信息，进行简单的自动布局
  if (diShapes.size === 0) {
    applySimpleLayout(nodes, edges, nodeSpacing)
  }

  return { nodes, edges, processId, processName }
}

/**
 * 简单的手动布局算法
 */
function applySimpleLayout(nodes: Node[], edges: Edge[], spacing: number): void {
  // 构建依赖图
  const inDegree = new Map<string, number>()
  const adjacency = new Map<string, string[]>()

  for (const node of nodes) {
    inDegree.set(node.id, 0)
    adjacency.set(node.id, [])
  }

  for (const edge of edges) {
    if (edge.source && edge.target) {
      const current = inDegree.get(edge.target) || 0
      inDegree.set(edge.target, current + 1)

      const outgoing = adjacency.get(edge.source) || []
      outgoing.push(edge.target)
      adjacency.set(edge.source, outgoing)
    }
  }

  // 找到入度为 0 的节点（起始节点）
  const queue: string[] = []
  for (const [nodeId, degree] of inDegree) {
    if (degree === 0) queue.push(nodeId)
  }

  // BFS 布局
  const levels = new Map<string, number>()
  const visited = new Set<string>()

  let level = 0
  while (queue.length > 0) {
    const levelSize = queue.length
    for (let i = 0; i < levelSize; i++) {
      const nodeId = queue.shift()!
      if (visited.has(nodeId)) continue
      visited.add(nodeId)
      levels.set(nodeId, level)

      const outgoing = adjacency.get(nodeId) || []
      for (const targetId of outgoing) {
        if (!visited.has(targetId)) {
          queue.push(targetId)
        }
      }
    }
    level++
  }

  // 处理未访问的节点
  for (const node of nodes) {
    if (!levels.has(node.id)) {
      levels.set(node.id, level)
    }
  }

  // 按层级分组节点
  const levelNodes = new Map<number, Node[]>()
  for (const node of nodes) {
    const l = levels.get(node.id) || 0
    const nodesAtLevel = levelNodes.get(l) || []
    nodesAtLevel.push(node)
    levelNodes.set(l, nodesAtLevel)
  }

  // 应用布局
  for (const [l, nodesAtLevel] of levelNodes) {
    nodesAtLevel.forEach((node, index) => {
      node.position = {
        x: 100 + l * 250,
        y: 100 + index * spacing
      }
    })
  }
}

/**
 * 验证 BPMN XML 格式
 */
export function validateBpmnXml(xml: string): { valid: boolean; error?: string } {
  try {
    const parser = new DOMParser()
    const doc = parser.parseFromString(xml, 'text/xml')

    const parseError = doc.querySelector('parsererror')
    if (parseError) {
      return { valid: false, error: 'XML 格式错误' }
    }

    const definitions = doc.querySelector('bpmn\\:definitions, definitions')
    if (!definitions) {
      return { valid: false, error: '缺少 BPMN definitions 根元素' }
    }

    const process = doc.querySelector('bpmn\\:process, process')
    if (!process) {
      return { valid: false, error: '缺少 BPMN process 元素' }
    }

    return { valid: true }
  } catch (e) {
    return { valid: false, error: e instanceof Error ? e.message : '未知错误' }
  }
}

/**
 * 从 Flow 数据生成示例 BPMN XML
 */
export function generateSampleBpmnXml(): string {
  const sampleNodes: Node[] = [
    {
      id: 'start',
      type: 'bpmn-start',
      position: { x: 100, y: 200 },
      data: { label: '开始' },
      width: 40,
      height: 40,
      selected: false,
      dragging: false
    },
    {
      id: 'task1',
      type: 'bpmn-user-task',
      position: { x: 250, y: 180 },
      data: { label: '审批任务', assignee: 'admin' },
      width: 120,
      height: 80,
      selected: false,
      dragging: false
    },
    {
      id: 'gateway',
      type: 'bpmn-exclusive-gateway',
      position: { x: 450, y: 200 },
      data: { label: '是否通过' },
      width: 50,
      height: 50,
      selected: false,
      dragging: false
    },
    {
      id: 'task2',
      type: 'bpmn-service-task',
      position: { x: 600, y: 100 },
      data: { label: '处理业务', implementation: '${myService}' },
      width: 120,
      height: 80,
      selected: false,
      dragging: false
    },
    {
      id: 'end',
      type: 'bpmn-end',
      position: { x: 800, y: 200 },
      data: { label: '结束' },
      width: 40,
      height: 40,
      selected: false,
      dragging: false
    }
  ]

  const sampleEdges: Edge[] = [
    {
      id: 'e1',
      source: 'start',
      target: 'task1',
      type: 'smoothstep',
      selected: false,
      animated: false
    },
    {
      id: 'e2',
      source: 'task1',
      target: 'gateway',
      type: 'smoothstep',
      selected: false,
      animated: false
    },
    {
      id: 'e3',
      source: 'gateway',
      target: 'task2',
      type: 'smoothstep',
      selected: false,
      animated: false,
      data: { conditionExpression: '${approved == true}' }
    },
    {
      id: 'e4',
      source: 'gateway',
      target: 'end',
      type: 'smoothstep',
      selected: false,
      animated: false
    },
    { id: 'e5', source: 'task2', target: 'end', type: 'smooth', selected: false, animated: false }
  ]

  return flowToBpmnXml(sampleNodes, sampleEdges, {
    processId: 'SampleProcess',
    processName: '示例流程'
  }).xml
}
