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
  | 'unnselect'

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

export type EdgeType = 'smoothstep' | 'step' | 'bezier' | 'straight' | 'default'

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
  updatable?: boolean
}

export type EdgeChangeType = 'select' | 'remove' | 'style' | 'data' | 'selectMulti' | 'unnselect'

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
  usePlugin: (plugin: FlowPlugin) => void
  removePlugin: (pluginId: string) => void
  exportJson?: () => string
  exportImage?: (container?: HTMLElement) => Promise<void> | void
  applyLayout?: (options?: unknown) => void
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
  id: string
  data: Data
  selected: boolean
  dragging: boolean
  connectable: boolean
  selectedClass?: string
  type?: string
}

export interface CustomEdgeComponentProps<Data = EdgeData> {
  id: string
  sourceX: number
  sourceY: number
  targetX: number
  targetY: number
  sourcePosition: Position
  targetPosition: Position
  data: Data
  selected: boolean
  animated: boolean
  label?: string
  labelStyle?: NodeStyle
  labelShowBg?: boolean
  labelBgColor?: string
  labelBgPadding?: [number, number]
  labelBgBorderRadius?: number
  style?: EdgeStyle
  markerEnd?: string
  markerStart?: string
}

export type CustomNodeComponent<
  Data = NodeData,
  Props = CustomNodeComponentProps<Data>
> = Component<Props>

export type CustomEdgeComponent<
  Data = EdgeData,
  Props = CustomEdgeComponentProps<Data>
> = Component<Props>
