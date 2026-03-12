import type { ExtractPropTypes, PropType } from 'vue'
import type { Node, Edge, ViewportTransform, ValidConnectionFunc } from './types'

// Flow Props
export const flowProps = {
  /**
   * @description 节点数据
   */
  nodes: {
    type: Array as PropType<Node[]>,
    default: () => []
  },
  /**
   * @description 连线数据
   */
  edges: {
    type: Array as PropType<Edge[]>,
    default: () => []
  },
  /**
   * @description 视口变换 (支持 v-model)
   */
  modelValue: {
    type: Object as PropType<ViewportTransform>,
    default: () => ({ x: 0, y: 0, zoom: 1 })
  },
  /**
   * @description 最小缩放比例
   */
  minZoom: {
    type: Number,
    default: 0.1
  },
  /**
   * @description 最大缩放比例
   */
  maxZoom: {
    type: Number,
    default: 5
  },
  /**
   * @description 缩放步长
   */
  zoomStep: {
    type: Number,
    default: 0.1
  },
  /**
   * @description 平移速度
   */
  panZoomSpeed: {
    type: Number,
    default: 1
  },
  /**
   * @description 默认节点类型
   */
  defaultNodeType: {
    type: String,
    default: 'default'
  },
  /**
   * @description 默认连线类型
   */
  defaultEdgeType: {
    type: String,
    default: 'bezier'
  },
  /**
   * @description 是否启用拖拽
   */
  nodesDraggable: {
    type: Boolean,
    default: true
  },
  /**
   * @description 是否启用连线
   */
  edgesConnectable: {
    type: Boolean,
    default: true
  },
  /**
   * @description 是否启用选择
   */
  selectable: {
    type: Boolean,
    default: true
  },
  /**
   * @description 是否支持多选
   */
  multiSelectKey: {
    type: String,
    default: 'Shift'
  },
  /**
   * @description 背景类型
   */
  background: {
    type: String as PropType<'none' | 'dots' | 'grid'>,
    default: 'dots'
  },
  /**
   * @description 背景颜色
   */
  backgroundColor: {
    type: String,
    default: '#f8f9fa'
  },
  /**
   * @description 网格大小
   */
  gridSize: {
    type: Number,
    default: 20
  },
  /**
   * @description 是否吸附到网格
   */
  snapToGrid: {
    type: Boolean,
    default: false
  },
  /**
   * @description 吸附间距
   */
  snapGrid: {
    type: Array as unknown as PropType<[number, number]>,
    default: () => [15, 15]
  },
  /**
   * @description 是否只读
   */
  readonly: {
    type: Boolean,
    default: false
  },
  /**
   * @description 是否启用键盘快捷键
   */
  keyboardShortcuts: {
    type: Boolean,
    default: true
  },
  /**
   * @description 是否显示控制栏
   */
  showControls: {
    type: Boolean,
    default: true
  },
  /**
   * @description 是否显示小地图
   */
  showMinimap: {
    type: Boolean,
    default: false
  },
  /**
   * @description 小地图颜色
   */
  minimapNodeColor: {
    type: String,
    default: '#b1b1b7'
  },
  /**
   * @description 是否显示对齐线
   */
  showAlignmentGuides: {
    type: Boolean,
    default: true
  },
  /**
   * @description 是否启用撤销/重做
   */
  history: {
    type: Boolean,
    default: true
  },
  /**
   * @description 最大历史记录数
   */
  maxHistory: {
    type: Number,
    default: 50
  },
  /**
   * @description 是否启用虚拟滚动
   */
  virtualized: {
    type: Boolean,
    default: false
  },
  /**
   * @description 虚拟滚动缓冲区
   */
  virtualizationThreshold: {
    type: Number,
    default: 100
  },
  /**
   * @description 连接校验函数
   */
  isValidConnection: {
    type: Function as PropType<ValidConnectionFunc>,
    default: null
  },
  /**
   * @description 主题覆盖变量
   */
  themeOverrides: {
    type: Object as PropType<Record<string, unknown>>,
    default: undefined
  }
} as const

export type FlowProps = ExtractPropTypes<typeof flowProps>

// Flow Emits
export const flowEmits = {
  'update:modelValue': (transform: ViewportTransform) =>
    typeof transform.x === 'number' &&
    typeof transform.y === 'number' &&
    typeof transform.zoom === 'number',
  'update:nodes': (nodes: Node[]) => Array.isArray(nodes),
  'update:edges': (edges: Edge[]) => Array.isArray(edges),
  nodeClick: (event: { node: Node; nativeEvent: MouseEvent }) => !!event,
  nodeDblClick: (event: { node: Node; nativeEvent: MouseEvent }) => !!event,
  nodeDragStart: (event: { node: Node; nativeEvent: MouseEvent }) => !!event,
  nodeDrag: (event: { node: Node; nativeEvent: MouseEvent }) => !!event,
  nodeDragEnd: (event: { node: Node; nativeEvent: MouseEvent }) => !!event,
  nodeContextMenu: (event: { node: Node; nativeEvent: MouseEvent }) => !!event,
  edgeClick: (event: { edge: Edge; nativeEvent: MouseEvent }) => !!event,
  edgeDblClick: (event: { edge: Edge; nativeEvent: MouseEvent }) => !!event,
  edgeContextMenu: (event: { edge: Edge; nativeEvent: MouseEvent }) => !!event,
  edgeConnect: (_connection: {
    source: string
    target: string
    sourceHandle?: string
    targetHandle?: string
  }) => true,
  selectionChange: (event: { selectedNodes: Node[]; selectedEdges: Edge[] }) => !!event,
  historyChange: (event: { canUndo: boolean; canRedo: boolean }) => !!event,
  viewportChange: (transform: ViewportTransform) => !!transform
}

export type FlowEmits = typeof flowEmits
