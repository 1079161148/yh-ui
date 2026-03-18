import type { Component, Ref } from 'vue'
import type { FlowEventKey, FlowEventHandler, FlowEvents } from './events'
import type { FitViewOptions } from './viewport'
import type { Connection } from './edge'

export type { FlowEventKey, FlowEventHandler, FlowEvents }
export type { FitViewOptions }
export type { Connection }

// ============================================
// Node Types - 节点类型定义
// ============================================

export type NodeType = string

export type HandleType = 'source' | 'target'

export type Position = 'top' | 'right' | 'bottom' | 'left'

export interface NodeHandle {
  type: HandleType
  position: Position
  id?: string
  style?: NodeStyle
  class?: string
  isConnectable?: boolean
}

export interface NodeStyle {
  [key: string]: string | number | undefined
}

export interface NodeData {
  [key: string]: unknown
  label?: string
  style?: NodeStyle
  class?: string
  icon?: string
  description?: string
}

export interface NodePosition {
  x: number
  y: number
}

export interface NodeDimension {
  width: number
  height: number
}

export interface Node<Data = NodeData> {
  id: string
  type: NodeType
  position: NodePosition
  data: Data
  style?: NodeStyle
  class?: string
  draggable?: boolean
  selectable?: boolean
  connectable?: boolean
  resizable?: boolean
  deletable?: boolean
  hidden?: boolean
  selected?: boolean
  dragging?: boolean
  width?: number
  height?: number
  parentId?: string
  zIndex?: number
  extent?: 'parent' | string
  expandParent?: boolean
  positionAbsolute?: NodePosition
  handleBounds?: {
    top?: NodeHandle[]
    right?: NodeHandle[]
    bottom?: NodeHandle[]
    left?: NodeHandle[]
  }
}

export type NodeChangeType =
  | 'select'
  | 'position'
  | 'remove'
  | 'dimensions'
  | 'style'
  | 'data'
  | 'selectMulti'
  | 'unselect'

export interface NodeChange<T = Node> {
  type: NodeChangeType
  id: string
  item: T
  selected?: boolean
  position?: NodePosition
  dimensions?: NodeDimension
  style?: NodeStyle
  data?: NodeData
  drag?: boolean
}

// ============================================
// Edge Types - 连线类型定义
// ============================================

export type EdgeType = string | 'smoothstep' | 'step' | 'bezier' | 'straight' | 'default'

export interface EdgeStyle {
  stroke?: string
  strokeWidth?: number
  strokeDasharray?: string
  [key: string]: string | number | undefined
}

export interface EdgeMarker {
  type: 'arrow' | 'arrowclosed'
  color?: string
  width?: number
  height?: number
}

export interface EdgeData {
  [key: string]: unknown
  label?: string
  type?: EdgeType
  animated?: boolean
  style?: EdgeStyle
  labelStyle?: NodeStyle
  labelShowBg?: boolean
  labelBgColor?: string
  labelBgPadding?: [number, number]
  labelBgBorderRadius?: number
}

export interface Edge<Data = EdgeData> {
  id: string
  source: string
  target: string
  sourceHandle?: string | null
  targetHandle?: string | null
  type?: EdgeType
  animated?: boolean
  label?: string
  labelStyle?: NodeStyle
  labelShowBg?: boolean
  labelBgColor?: string
  labelBgPadding?: [number, number]
  labelBgBorderRadius?: number
  style?: EdgeStyle
  markerEnd?: string | EdgeMarker
  markerStart?: string | EdgeMarker
  data?: Data
  zIndex?: number
  selectable?: boolean
  deletable?: boolean
  hidden?: boolean
  selected?: boolean
  updatable?: boolean | 'source' | 'target'
}

export type EdgeChangeType = 'select' | 'remove' | 'style' | 'data' | 'selectMulti' | 'unselect'

export interface EdgeChange<T = Edge> {
  type: EdgeChangeType
  id: string
  item: T
  selected?: boolean
  style?: EdgeStyle
  data?: EdgeData
}

// ============================================
// Viewport Types - 视口类型定义
// ============================================

export interface ViewportTransform {
  x: number
  y: number
  zoom: number
}

export interface ViewportOptions {
  minZoom?: number
  maxZoom?: number
  translateExtent?: [[number, number], [number, number]]
  zoomStep?: number
  panZoomSpeed?: number
  zoomInMultiplier?: number
  zoomOutMultiplier?: number
}

// ============================================
// Selection Types - 选区类型定义
// ============================================

export interface SelectionMode {
  partial: 'partial'
  full: 'full'
}

export interface SelectionRect {
  x: number
  y: number
  width: number
  height: number
}

// ============================================
// Connection Types - 连接类型定义
// ============================================

// Connection interface removed as it is now in ./edge.ts

export interface ConnectionLine {
  sourceX: number
  sourceY: number
  targetX: number
  targetY: number
  sourcePosition?: Position
  targetPosition?: Position
}

export interface ValidConnectionFunc {
  (connection: Connection): boolean | Error | void
}

// ============================================
// Plugin Types - 插件类型定义
// ============================================

export interface FlowPlugin {
  id: string
  name: string
  version?: string
  description?: string
  enabled?: boolean
  install: (flow: FlowInstance, options?: Record<string, unknown>) => void
  destroy?: () => void
  component?: Component // 可选的 UI 组件，将被渲染在 Flow 容器中
  componentProps?: Record<string, unknown> // 传递给组件的 Props
}

export interface FlowInstance {
  nodes: Ref<Node[]>
  edges: Ref<Edge[]>
  viewport: Ref<ViewportTransform>
  addNode: (node: Node) => void
  removeNode: (nodeId: string) => void
  updateNode: (nodeId: string, data: Partial<Node>) => void
  getNode: (nodeId: string) => Node | undefined
  addEdge: (edge: Edge) => void
  removeEdge: (edgeId: string) => void
  updateEdge: (edgeId: string, data: Partial<Edge>) => void
  getEdge: (edgeId: string) => Edge | undefined
  setViewport: (transform: ViewportTransform) => void
  fitView: (options?: FitViewOptions) => void
  zoomIn: (factor?: number) => void
  zoomOut: (factor?: number) => void
  centerView: () => void
  selectNode: (nodeId: string, selected?: boolean, multi?: boolean) => void
  selectEdge: (edgeId: string, selected?: boolean, multi?: boolean) => void
  clearSelection: () => void
  getNodes: () => Node[]
  getEdges: () => Edge[]
  getViewport: () => ViewportTransform
  screenToCanvas: (x: number, y: number) => { x: number; y: number }
  canvasToScreen: (x: number, y: number) => { x: number; y: number }
  on: <K extends FlowEventKey>(event: K, handler: FlowEventHandler<K>) => void
  off: <K extends FlowEventKey>(event: K, handler: FlowEventHandler<K>) => void
  emit: <K extends FlowEventKey>(event: K, payload?: FlowEvents[K]) => void
  isValidConnection: (connection: Connection) => boolean
  $el: HTMLElement | undefined
  draggingNodeId: Ref<string | null>
  draggingPosition: Ref<{ x: number; y: number } | null>
  usePlugin: (plugin: FlowPlugin) => void
  removePlugin: (pluginId: string) => void
  // ============================================
  // 5-star feature methods
  // ============================================
  /** Create a new node from a registered template */
  createNodeFromTemplate?: (
    type: string,
    id: string,
    position: { x: number; y: number },
    overrides?: Record<string, unknown>
  ) => Node | null
  /** Export flow data to JSON string */
  exportFlowData?: (viewport?: { x: number; y: number; zoom: number }) => string
  /** Import flow data from JSON string */
  importFlowData?: (
    json: string
  ) => { nodes: Node[]; edges: Edge[]; viewport?: { x: number; y: number; zoom: number } } | null
  /** Check if a node is nested (has parent) */
  isNestedNode?: (node: Node) => boolean
  /** Get all children of a node */
  getNodeChildren?: (node: Node) => Node[]
  /** Get parent of a node */
  getNodeParent?: (node: Node) => Node | undefined
  exportJson?: () => string
  /** Screenshot: pass options or legacy HTMLElement as container. Returns result with dataUrl/blob. */
  exportImage?: (options?: ScreenshotOptions | HTMLElement) => Promise<ScreenshotResult>
  applyLayout?: (options?: unknown) => void | Promise<void>
}

// ============================================
// Screenshot - 截图导出类型（无 any，类型安全）
// ============================================

/** 截图范围：当前视口 或 整图（自动 fitView 后截取再恢复视口） */
export type ScreenshotMode = 'viewport' | 'full'

/** 截图输出图片格式 */
export type ScreenshotImageType = 'png' | 'jpeg' | 'webp'

/** 截图选项 */
export interface ScreenshotOptions {
  /** 截取范围：viewport=当前可见区域，full=整图 */
  mode?: ScreenshotMode
  /** 图片格式，默认 png */
  imageType?: ScreenshotImageType
  /** 图片质量 0–1，仅 jpeg/webp 有效 */
  imageQuality?: number
  /** 设备像素比，默认 2（高清屏友好） */
  pixelRatio?: number
  /** 背景色，默认 #ffffff */
  backgroundColor?: string
  /** 导出文件名（不含扩展名），仅在下发下载时使用 */
  fileName?: string
  /** 是否触发浏览器下载，默认 true */
  download?: boolean
  /** 是否同时写入剪贴板，默认 false */
  copyToClipboard?: boolean
  /** 指定要截取的 DOM 元素，不传则使用 flow 根元素 */
  container?: HTMLElement
  /** full 模式下的 fitView 内边距，默认 20 */
  fullModePadding?: number
}

/** 截图结果（程序化使用：上传、预览等） */
export interface ScreenshotResult {
  /** Data URL */
  dataUrl: string
  /** Blob（便于 FormData/上传） */
  blob: Blob
  /** 图片宽度（像素） */
  width: number
  /** 图片高度（像素） */
  height: number
  /** MIME 类型 */
  mimeType: string
  /** 文件扩展名 */
  extension: string
}

// FitViewOptions removed as it is now imported from './viewport'

// ============================================
// Event Types - 事件类型定义
// ============================================

// FlowEvents removed as it is now imported from './events'

// ============================================
// Graph State - 图状态类型定义
// ============================================

export interface GraphState {
  nodes: Node[]
  edges: Edge[]
  transform: ViewportTransform
  selectedNodes: Node[]
  selectedEdges: Edge[]
  hoveredNode: Node | null
  hoveredEdge: Edge | null
  isDragging: boolean
  isSelecting: boolean
  selectionRect: SelectionRect | null
}

// ============================================
// History - 撤销重做
// ============================================

export interface HistoryState {
  nodes: Node[]
  edges: Edge[]
}

export interface HistoryManager {
  undo: () => void
  redo: () => void
  push: (state: HistoryState) => void
  canUndo: () => boolean
  canRedo: () => boolean
  clear: () => void
}

// ============================================
// Utilities - 工具类型
// ============================================

export type MaybeElement = HTMLElement | SVGElement | null

export type Coordinate = {
  x: number
  y: number
}

export type Box = Coordinate & {
  width: number
  height: number
}

export type Rect = Box & {
  left: number
  right: number
  top: number
  bottom: number
}

// ============================================
// Custom Node/Edge Component Types
// ============================================

export interface CustomNodeComponentProps<Data = NodeData> {
  node: Node<Data>
}

export interface CustomEdgeComponentProps<Data = EdgeData> {
  edge: Edge<Data>
  path: string
  sourceX: number
  sourceY: number
  targetX: number
  targetY: number
  labelX: number
  labelY: number
  labelWidth: number
  stroke: string
  strokeWidth: number
}

export type CustomNodeComponent<
  Data = NodeData,
  Props = CustomNodeComponentProps<Data>
> = Component<Props>

export type CustomEdgeComponent<
  Data = EdgeData,
  Props = CustomEdgeComponentProps<Data>
> = Component<Props>

export type NodeTypes = Record<string, CustomNodeComponent>
export type EdgeTypes = Record<string, CustomEdgeComponent>
