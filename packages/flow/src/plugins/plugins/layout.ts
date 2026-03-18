import type { FlowInstance, FlowPlugin } from '../plugin'
import type { Node, Edge } from '../../types'

// dagre 库的类型声明
interface DagreLib {
  default?: unknown
  graphlib?: GraphLib
}

interface Dagre {
  graphlib: GraphLib
}

interface GraphLib {
  Graph: new (opts?: object) => Graph
}

interface Graph {
  setGraph(options: object): void
  setDefaultEdgeLabel(fn: () => object): void
  setNode(id: string, data: { width?: number; height?: number }): void
  setEdge(source: string, target: string): void
  layout(): void
  node(id: string): { x: number; y: number; width?: number; height?: number } | undefined
}

// ELK 图数据的类型
interface ElkNode {
  id: string
  x?: number
  y?: number
  width?: number
  height?: number
}

interface ElkEdge {
  id: string
  sources: string[]
  targets: string[]
}

interface ElkGraph {
  id: string
  layoutOptions?: Record<string, string | number>
  children?: ElkNode[]
  edges?: ElkEdge[]
}

// ELK 类构造函数类型
interface ElkConstructor {
  new (): ElkInstance
}

interface ElkInstance {
  layout(graph: ElkGraph): Promise<ElkGraph>
}

export interface LayoutOptions {
  enabled?: boolean
  type?: 'dagre' | 'elk' | 'force' | 'grid'
  direction?: 'TB' | 'BT' | 'LR' | 'RL'
  nodeSpacing?: number
  rankSpacing?: number
  animate?: boolean
  /** ELK 布局专属选项 */
  elkOptions?: {
    algorithm?: 'layered' | 'force' | 'mrtree' | 'box' | 'disco'
    direction?: 'DOWN' | 'RIGHT' | 'UP' | 'LEFT'
    spacing?: number
    edgeRouting?: 'ORTHOGONAL' | 'POLYLINE' | 'SPLINES'
  }
  /** Force 布局专属选项 */
  forceOptions?: {
    strength?: number
    distance?: number
    theta?: number
    iterations?: number
  }
  /** Grid 布局专属选项 */
  gridOptions?: {
    columns?: number
    startX?: number
    startY?: number
  }
}

const defaultOptions: Required<LayoutOptions> = {
  enabled: true,
  type: 'dagre',
  direction: 'TB',
  nodeSpacing: 50,
  rankSpacing: 80,
  animate: true,
  elkOptions: {},
  forceOptions: {},
  gridOptions: { columns: 4 }
}

/**
 * 使用 dagre 算法计算布局
 */
function applyDagreLayout(
  nodes: Node[],
  edges: Edge[],
  options: Required<LayoutOptions>
): { nodes: Node[]; edges: Edge[] } {
  // 动态导入 dagre
  const dagreLib: DagreLib = require('dagre')
  const dagre = (dagreLib.default || (dagreLib as unknown as Dagre)) as {
    graphlib: GraphLib
    layout: (g: Graph) => void
  }
  const graphlib = dagreLib.graphlib || dagre.graphlib

  const g: Graph = new graphlib.Graph()

  // 设置图属性
  g.setGraph({
    rankdir: options.direction,
    nodesep: options.nodeSpacing,
    ranksep: options.rankSpacing,
    marginx: 0,
    marginy: 0
  })

  g.setDefaultEdgeLabel(() => ({}))

  // 添加节点
  nodes.forEach((node) => {
    g.setNode(node.id, {
      width: node.width || 150,
      height: node.height || 50
    })
  })

  // 添加边
  edges.forEach((edge) => {
    g.setEdge(edge.source, edge.target)
  })

  // 执行布局
  dagre.layout(g)

  // 获取布局结果
  const layoutedNodes = nodes.map((node) => {
    const layoutNode = g.node(node.id)
    if (!layoutNode) return node

    return {
      ...node,
      position: {
        x: layoutNode.x - (node.width || 150) / 2,
        y: layoutNode.y - (node.height || 50) / 2
      }
    }
  })

  return { nodes: layoutedNodes, edges }
}

/**
 * 使用 ELK (Eclipse Layout Kernel) 算法计算布局
 */
async function applyElkLayout(
  nodes: Node[],
  edges: Edge[],
  options: Required<LayoutOptions>
): Promise<{ nodes: Node[]; edges: Edge[] }> {
  const ELK: ElkConstructor = require('elkjs')

  const elk: ElkInstance = new ELK()

  // 方向映射
  const dirMap: Record<string, 'DOWN' | 'RIGHT' | 'UP' | 'LEFT'> = {
    TB: 'DOWN',
    BT: 'UP',
    LR: 'RIGHT',
    RL: 'LEFT'
  }

  const elkOpts = options.elkOptions || {}

  const graph = {
    id: 'root',
    layoutOptions: {
      'elk.algorithm': elkOpts.algorithm || 'layered',
      'elk.direction': elkOpts.direction || dirMap[options.direction] || 'DOWN',
      'elk.spacing.nodeNode': elkOpts.spacing || options.nodeSpacing,
      'elk.edgeRouting': elkOpts.edgeRouting || 'POLYLINE'
    },
    children: nodes.map((node) => ({
      id: node.id,
      width: node.width || 150,
      height: node.height || 50
    })),
    edges: edges.map((edge, index) => ({
      id: edge.id || `edge-${index}`,
      sources: [edge.source],
      targets: [edge.target]
    }))
  }

  const layoutedGraph = await elk.layout(graph)

  const layoutedNodes = nodes.map((node) => {
    const layoutNode = layoutedGraph.children?.find((n: ElkNode) => n.id === node.id)
    if (!layoutNode) return node

    return {
      ...node,
      position: {
        x: layoutNode.x || 0,
        y: layoutNode.y || 0
      }
    }
  })

  return { nodes: layoutedNodes, edges }
}

/**
 * 使用 d3-force 算法计算力导向布局
 */
function applyForceLayout(
  nodes: Node[],
  edges: Edge[],
  options: Required<LayoutOptions>
): { nodes: Node[]; edges: Edge[] } {
  const d3Force = require('d3-force') as {
    forceSimulation: (nodes: unknown[]) => {
      force: (name: string, force: unknown) => void
      tick: () => void
      stop: () => void
    }
    forceLink: () => ForceLink
    forceManyBody: () => { strength: (n: number) => unknown }
    forceCenter: (x: number, y: number) => unknown
    forceCollide: () => { radius: (n: number) => unknown }
  }

  interface ForceLink {
    id: (fn: (d: unknown) => string) => ForceLink
    distance: (n: number) => ForceLink
  }

  interface ForceNode {
    id: string
    x: number
    y: number
  }

  // 克隆节点避免修改原始数据
  const forceNodes: ForceNode[] = nodes.map((node) => ({
    id: node.id,
    x: node.position.x,
    y: node.position.y
  }))

  const force = d3Force.forceSimulation(forceNodes)

  // 力导向选项
  const forceOpts = options.forceOptions || {}

  // 节点间斥力
  force.force('charge', d3Force.forceManyBody().strength(forceOpts.strength || -300))

  // 连线拉力
  const linkForce = d3Force.forceLink()
  linkForce.id((d: unknown) => (d as ForceNode).id)
  linkForce.distance(forceOpts.distance || 100)
  force.force('link', linkForce)

  // 碰撞检测
  force.force('collision', d3Force.forceCollide().radius(50))

  // 中心力
  const centerX = 400
  const centerY = 300
  force.force('center', d3Force.forceCenter(centerX, centerY))

  // 执行迭代
  const iterations = forceOpts.iterations || 300
  for (let i = 0; i < iterations; i++) {
    force.tick()
  }

  // 停止模拟
  force.stop()

  // 计算边界偏移以保持节点在正坐标
  let minX = Infinity,
    minY = Infinity
  forceNodes.forEach((n) => {
    if (n.x < minX) minX = n.x
    if (n.y < minY) minY = n.y
  })
  const offsetX = minX < 0 ? -minX + 50 : 50
  const offsetY = minY < 0 ? -minY + 50 : 50

  const layoutedNodes = nodes.map((node) => {
    const forceNode = forceNodes.find((n) => n.id === node.id)
    if (!forceNode) return node

    return {
      ...node,
      position: {
        x: forceNode.x + offsetX,
        y: forceNode.y + offsetY
      }
    }
  })

  return { nodes: layoutedNodes, edges }
}

/**
 * 使用 Grid 网格布局 - 简单按行列排列节点
 */
function applyGridLayout(
  nodes: Node[],
  edges: Edge[],
  options: Required<LayoutOptions>
): { nodes: Node[]; edges: Edge[] } {
  const gridOpts = options.gridOptions || {}
  const columns = gridOpts.columns || 4
  const startX = gridOpts.startX || 50
  const startY = gridOpts.startY || 50
  const nodeWidth = options.nodeSpacing + (nodes[0]?.width || 150)
  const nodeHeight = options.rankSpacing + (nodes[0]?.height || 50)

  const layoutedNodes = nodes.map((node, index) => {
    const col = index % columns
    const row = Math.floor(index / columns)

    return {
      ...node,
      position: {
        x: startX + col * nodeWidth,
        y: startY + row * nodeHeight
      }
    }
  })

  return { nodes: layoutedNodes, edges }
}

export function createLayoutPlugin(options: LayoutOptions = {}): FlowPlugin {
  const mergedOptions = { ...defaultOptions, ...options }

  return {
    id: 'layout',
    name: 'Layout',
    version: '1.0.0',
    description: 'Provides automatic layout algorithms for flow charts (dagre, elk, force)',
    install(flow: FlowInstance) {
      if (!mergedOptions.enabled) return

      // 实现 applyLayout 方法
      flow.applyLayout = async (layoutOptions?: unknown) => {
        const opts = { ...mergedOptions, ...(layoutOptions as Partial<LayoutOptions>) }
        const nodes = [...flow.nodes.value]
        const edges = [...flow.edges.value]

        try {
          let layouted: { nodes: Node[]; edges: Edge[] }

          if (opts.type === 'dagre') {
            layouted = applyDagreLayout(nodes, edges, opts as Required<LayoutOptions>)
            console.log('[Layout Plugin] Dagre layout applied successfully')
          } else if (opts.type === 'elk') {
            layouted = await applyElkLayout(nodes, edges, opts as Required<LayoutOptions>)
            console.log('[Layout Plugin] ELK layout applied successfully')
          } else if (opts.type === 'force') {
            layouted = applyForceLayout(nodes, edges, opts as Required<LayoutOptions>)
            console.log('[Layout Plugin] Force layout applied successfully')
          } else if (opts.type === 'grid') {
            layouted = applyGridLayout(nodes, edges, opts as Required<LayoutOptions>)
            console.log('[Layout Plugin] Grid layout applied successfully')
          } else {
            console.warn(`[Layout Plugin] Unknown layout type '${opts.type}'`)
            return
          }

          // 更新所有节点位置
          layouted.nodes.forEach((layoutedNode) => {
            flow.updateNode(layoutedNode.id, {
              position: {
                x: (layoutedNode as Node).position.x,
                y: (layoutedNode as Node).position.y
              }
            })
          })

          // 可选：自动 fitView
          if (opts.animate) {
            setTimeout(() => {
              flow.fitView?.({ padding: 50 })
            }, 100)
          }
        } catch (error) {
          console.error('[Layout Plugin] Layout calculation failed:', error)
        }
      }
    }
  }
}
