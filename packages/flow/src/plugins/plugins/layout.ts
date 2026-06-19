import type { FlowInstance, FlowPlugin } from '../plugin'
import type { Node, Edge } from '../../types'

// dagre 库的类型声明
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
  /** 是否启用 Web Worker 进行密集计算（如用户自行提供打包的 workerUrl） */
  useWebWorker?: boolean
  /** 自定义 Web Worker 的 URL，配合 useWebWorker 使用 */
  workerUrl?: string
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
  gridOptions: { columns: 4 },
  useWebWorker: false,
  workerUrl: ''
}

/**
 * 使用 dagre 算法计算布局
 */
async function applyDagreLayout(
  nodes: Node[],
  edges: Edge[],
  options: Required<LayoutOptions>
): Promise<{ nodes: Node[]; edges: Edge[] }> {
  let dagreLib: unknown
  try {
    dagreLib = await import(/* @vite-ignore */ 'dagre')
  } catch {
    throw new Error(
      '[YH-UI Flow] Layout engine "dagre" is not installed. Please install "dagre" to use the dagre layout algorithm.'
    )
  }
  if (!dagreLib) {
    throw new Error(
      '[YH-UI Flow] Layout engine "dagre" is not installed. Please install "dagre" to use the dagre layout algorithm.'
    )
  }
  const dagre = ((dagreLib as Record<string, unknown>).default || dagreLib) as {
    graphlib: GraphLib
    layout: (g: Graph) => void
  }
  const graphlib = ((dagreLib as Record<string, unknown>).graphlib || dagre.graphlib) as GraphLib

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
      width: node.measured?.width ?? node.width ?? 150,
      height: node.measured?.height ?? node.height ?? 50
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
        x: layoutNode.x - (node.measured?.width ?? node.width ?? 150) / 2,
        y: layoutNode.y - (node.measured?.height ?? node.height ?? 50) / 2
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
  const bundledPath = 'elkjs/lib/elk.bundled.js'
  const elkPath = 'elkjs'

  let elkLib: unknown
  try {
    try {
      elkLib = await import(/* @vite-ignore */ bundledPath)
    } catch {
      elkLib = await import(/* @vite-ignore */ elkPath)
    }
  } catch {
    throw new Error(
      '[YH-UI Flow] Layout engine "elkjs" is not installed. Please install "elkjs" to use the elk layout algorithm.'
    )
  }

  if (!elkLib) {
    throw new Error(
      '[YH-UI Flow] Layout engine "elkjs" is not installed. Please install "elkjs" to use the elk layout algorithm.'
    )
  }

  const ELK: ElkConstructor = ((elkLib as Record<string, unknown>).default ||
    elkLib) as ElkConstructor

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
      width: node.measured?.width ?? node.width ?? 150,
      height: node.measured?.height ?? node.height ?? 50
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
 * 使用 d3-force 算法计算力导向布局（异步执行阻止主线程阻塞）
 */
async function applyForceLayout(
  nodes: Node[],
  edges: Edge[],
  options: Required<LayoutOptions>,
  flowInstance?: FlowInstance,
  cancelToken?: { cancelled: boolean }
): Promise<{ nodes: Node[]; edges: Edge[] }> {
  const d3ForcePath = 'd3-force'
  let d3ForceLib: unknown
  try {
    d3ForceLib = await import(/* @vite-ignore */ d3ForcePath)
  } catch {
    throw new Error(
      '[YH-UI Flow] Layout engine "d3-force" is not installed. Please install "d3-force" to use the force layout algorithm.'
    )
  }

  if (!d3ForceLib) {
    throw new Error(
      '[YH-UI Flow] Layout engine "d3-force" is not installed. Please install "d3-force" to use the force layout algorithm.'
    )
  }

  interface D3ForceModule {
    forceSimulation: (nodes: unknown[]) => {
      force: (
        name: string,
        force: unknown
      ) => {
        strength?: (n: number) => unknown
        id?: (fn: (d: unknown) => string) => unknown
        distance?: (n: number) => unknown
        radius?: (n: number) => unknown
      }
      tick: () => void
      stop: () => void
      alpha: () => number
    }
    forceLink: () => unknown
    forceManyBody: () => { strength: (n: number) => unknown }
    forceCenter: (x: number, y: number) => unknown
    forceCollide: () => { radius: (n: number) => unknown }
  }

  const d3Force = ((d3ForceLib as Record<string, unknown>).default || d3ForceLib) as D3ForceModule

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
  const linkForce = d3Force.forceLink() as {
    id: (fn: (d: unknown) => string) => unknown
    distance: (n: number) => unknown
  }
  linkForce.id((d: unknown) => (d as ForceNode).id)
  linkForce.distance(forceOpts.distance || 100)
  force.force('link', linkForce)

  // 碰撞检测
  force.force('collision', d3Force.forceCollide().radius(50))

  // 中心力
  const centerX = 400
  const centerY = 300
  force.force('center', d3Force.forceCenter(centerX, centerY))

  // 异步执行计算以避免主线程阻塞 (UI 冻结)
  // 当节点数过多时有效释放 CPU 时间片
  const iterations = forceOpts.iterations || 300
  const ticksPerFrame = Math.max(1, Math.floor(iterations / 10))

  return new Promise((resolve) => {
    let currentIteration = 0

    const step = () => {
      if (cancelToken?.cancelled) {
        force.stop()
        resolve({ nodes, edges })
        return
      }

      // 每次执行一小批量的 tick
      const toRun = Math.min(ticksPerFrame, iterations - currentIteration)
      for (let i = 0; i < toRun; i++) {
        force.tick()
      }
      currentIteration += toRun

      // 计算边界偏移
      let minX = Infinity,
        minY = Infinity
      forceNodes.forEach((n) => {
        if (n.x < minX) minX = n.x
        if (n.y < minY) minY = n.y
      })
      const offsetX = minX < 0 ? -minX + 50 : 50
      const offsetY = minY < 0 ? -minY + 50 : 50

      // 动态推送到界面流式渲染 (仅开启 animate 时)
      if (options.animate && flowInstance) {
        forceNodes.forEach((fn) => {
          if (cancelToken?.cancelled) return
          flowInstance.updateNode(fn.id, {
            position: { x: fn.x + offsetX, y: fn.y + offsetY }
          })
        })
      }

      if (cancelToken?.cancelled) {
        force.stop()
        resolve({ nodes, edges })
        return
      }

      // 如果提供了流式渲染选项，可以尝试动态写回每个节点
      // 此处将最终结果在全部执行完后 resolve
      if (currentIteration < iterations && force.alpha() > 0.005) {
        // 请求下一帧继续计算
        if (typeof window !== 'undefined' && window.requestAnimationFrame) {
          window.requestAnimationFrame(step)
        } else {
          setTimeout(step, 0)
        }
      } else {
        force.stop()
        const layoutedNodes = nodes.map((node) => {
          const forceNode = forceNodes.find((n) => n.id === node.id)
          if (!forceNode) return node
          return {
            ...node,
            position: { x: forceNode.x + offsetX, y: forceNode.y + offsetY }
          }
        })
        resolve({ nodes: layoutedNodes, edges })
      }
    }

    // 开始执行
    step()
  })
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

async function runMainThreadLayout(
  nodes: Node[],
  edges: Edge[],
  opts: Required<LayoutOptions>,
  flowInstance?: FlowInstance,
  cancelToken?: { cancelled: boolean }
): Promise<{ nodes: Node[]; edges: Edge[] }> {
  if (opts.type === 'dagre') {
    return applyDagreLayout(nodes, edges, opts)
  } else if (opts.type === 'elk') {
    return applyElkLayout(nodes, edges, opts)
  } else if (opts.type === 'force') {
    return applyForceLayout(nodes, edges, opts, flowInstance, cancelToken)
  } else if (opts.type === 'grid') {
    return applyGridLayout(nodes, edges, opts)
  } else {
    throw new Error(`Unknown layout type '${opts.type}'`)
  }
}

async function runLayoutInWorker(
  nodes: Node[],
  edges: Edge[],
  options: Required<LayoutOptions>
): Promise<{ nodes: Node[]; edges: Edge[] }> {
  return new Promise((resolve, reject) => {
    let worker: Worker
    if (options.workerUrl) {
      worker = new Worker(options.workerUrl)
    } else {
      const code = `
        self.onmessage = function(e) {
          const data = e.data;
          const nodes = data.nodes;
          const edges = data.edges;
          const options = data.options;
          const type = options.type;
          
          try {
            let resultNodes = [];
            if (type === 'grid') {
              const gridOpts = options.gridOptions || {};
              const columns = gridOpts.columns || 4;
              const startX = gridOpts.startX || 50;
              const startY = gridOpts.startY || 50;
              const nodeWidth = options.nodeSpacing + (nodes[0]?.measured?.width || nodes[0]?.width || 150);
              const nodeHeight = options.rankSpacing + (nodes[0]?.measured?.height || nodes[0]?.height || 50);
              
              resultNodes = nodes.map(function(node, index) {
                const col = index % columns;
                const row = Math.floor(index / columns);
                return Object.assign({}, node, {
                  position: {
                    x: startX + col * nodeWidth,
                    y: startY + row * nodeHeight
                  }
                });
              });
              self.postMessage({ success: true, nodes: resultNodes });
            } else if (type === 'dagre') {
              importScripts('https://cdnjs.cloudflare.com/ajax/libs/dagre/0.8.5/dagre.min.js');
              if (typeof dagre === 'undefined') {
                throw new Error('Dagre not loaded');
              }
              const g = new dagre.graphlib.Graph();
              g.setGraph({
                rankdir: options.direction,
                nodesep: options.nodeSpacing,
                ranksep: options.rankSpacing,
                marginx: 0,
                marginy: 0
              });
              g.setDefaultEdgeLabel(function() { return {}; });
              nodes.forEach(function(node) {
                g.setNode(node.id, {
                  width: node.measured?.width ?? node.width ?? 150,
                  height: node.measured?.height ?? node.height ?? 50
                });
              });
              edges.forEach(function(edge) {
                g.setEdge(edge.source, edge.target);
              });
              dagre.layout(g);
              resultNodes = nodes.map(function(node) {
                const layoutNode = g.node(node.id);
                if (!layoutNode) return node;
                return Object.assign({}, node, {
                  position: {
                    x: layoutNode.x - (node.measured?.width ?? node.width ?? 150) / 2,
                    y: layoutNode.y - (node.measured?.height ?? node.height ?? 50) / 2
                  }
                });
              });
              self.postMessage({ success: true, nodes: resultNodes });
            } else if (type === 'force') {
              importScripts(
                'https://cdnjs.cloudflare.com/ajax/libs/d3/5.16.0/d3.min.js'
              );
              if (typeof d3 === 'undefined') {
                throw new Error('D3 not loaded');
              }
              const forceNodes = nodes.map(function(n) {
                return { id: n.id, x: n.position.x, y: n.position.y };
              });
              const forceOpts = options.forceOptions || {};
              const linkData = edges.map(function(e) {
                return { source: e.source, target: e.target };
              });
              const sim = d3.forceSimulation(forceNodes)
                .force('charge', d3.forceManyBody().strength(forceOpts.strength || -300))
                .force('link', d3.forceLink(linkData).id(function(d) { return d.id; }).distance(forceOpts.distance || 100))
                .force('collision', d3.forceCollide().radius(50))
                .force('center', d3.forceCenter(400, 300));
              
              const iterations = forceOpts.iterations || 300;
              for (let i = 0; i < iterations; i++) {
                sim.tick();
              }
              sim.stop();
              
              let minX = Infinity, minY = Infinity;
              forceNodes.forEach(function(n) {
                if (n.x < minX) minX = n.x;
                if (n.y < minY) minY = n.y;
              });
              const offsetX = minX < 0 ? -minX + 50 : 50;
              const offsetY = minY < 0 ? -minY + 50 : 50;
              
              resultNodes = nodes.map(function(node) {
                const fn = forceNodes.find(function(n) { return n.id === node.id; });
                if (!fn) return node;
                return Object.assign({}, node, {
                  position: { x: fn.x + offsetX, y: fn.y + offsetY }
                });
              });
              self.postMessage({ success: true, nodes: resultNodes });
            } else {
              self.postMessage({ success: false, error: 'Unsupported layout type in worker: ' + type });
            }
          } catch(err) {
            self.postMessage({ success: false, error: err.toString() });
          }
        };
      `
      const blob = new Blob([code], { type: 'application/javascript' })
      worker = new Worker(URL.createObjectURL(blob))
    }

    worker.onmessage = (e) => {
      const data = e.data
      if (data.success) {
        resolve({ nodes: data.nodes, edges })
      } else {
        reject(new Error('[Layout Worker Error] ' + data.error))
      }
      worker.terminate()
    }

    worker.onerror = (err) => {
      reject(err)
      worker.terminate()
    }

    worker.postMessage({ nodes, edges, options })
  })
}

export function createLayoutPlugin(options: LayoutOptions = {}): FlowPlugin {
  const mergedOptions = { ...defaultOptions, ...options }
  let currentCancelToken: { cancelled: boolean } | null = null

  return {
    id: 'layout',
    name: 'Layout',
    version: '1.0.0',
    description: 'Provides automatic layout algorithms for flow charts (dagre, elk, force)',
    destroy() {
      if (currentCancelToken) {
        currentCancelToken.cancelled = true
        currentCancelToken = null
      }
    },
    install(flow: FlowInstance) {
      if (!mergedOptions.enabled) return

      // 实现 applyLayout 方法
      flow.applyLayout = async (layoutOptions?: unknown) => {
        if (currentCancelToken) {
          currentCancelToken.cancelled = true
        }
        const cancelToken = { cancelled: false }
        currentCancelToken = cancelToken

        const opts = { ...mergedOptions, ...(layoutOptions as Partial<LayoutOptions>) }
        const nodes = [...flow.nodes.value]
        const edges = [...flow.edges.value]

        const knownTypes = ['dagre', 'elk', 'force', 'grid']
        if (!knownTypes.includes(opts.type)) {
          console.warn(`[Layout Plugin] Unknown layout type '${opts.type}'`)
          return
        }

        try {
          let layouted: { nodes: Node[]; edges: Edge[] }

          if (opts.useWebWorker && typeof Worker !== 'undefined') {
            try {
              layouted = await runLayoutInWorker(nodes, edges, opts as Required<LayoutOptions>)
              console.log('[Layout Plugin] Layout applied successfully using Web Worker')
            } catch (err) {
              console.warn(
                '[Layout Plugin] Web Worker layout failed, falling back to main thread:',
                err
              )
              if (cancelToken.cancelled) return
              layouted = await runMainThreadLayout(
                nodes,
                edges,
                opts as Required<LayoutOptions>,
                flow,
                cancelToken
              )
            }
          } else {
            layouted = await runMainThreadLayout(
              nodes,
              edges,
              opts as Required<LayoutOptions>,
              flow,
              cancelToken
            )
          }

          if (cancelToken.cancelled) return

          if (opts.type === 'dagre') {
            console.log('[Layout Plugin] Dagre layout applied successfully')
          } else if (opts.type === 'elk') {
            console.log('[Layout Plugin] ELK layout applied successfully')
          } else if (opts.type === 'force') {
            console.log('[Layout Plugin] Force layout applied asynchronously')
          } else if (opts.type === 'grid') {
            console.log('[Layout Plugin] Grid layout applied successfully')
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
              if (cancelToken.cancelled) return
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
