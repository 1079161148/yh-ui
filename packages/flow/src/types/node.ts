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

export interface NodeHandleBounds {
  top?: NodeHandle[]
  right?: NodeHandle[]
  bottom?: NodeHandle[]
  left?: NodeHandle[]
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
  handleBounds?: NodeHandleBounds
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

export type NodeUserData = Partial<Omit<Node, 'id' | 'type' | 'data'>> & {
  id: string
  type?: NodeType
  data?: NodeData
}

export function isNode<T extends Node>(value: unknown): value is T {
  return !!value && typeof value === 'object' && 'id' in value && 'type' in value
}
