import type { NodeStyle } from './node'

export type EdgeType = 'smoothstep' | 'step' | 'bezier' | 'straight' | 'default'

export interface Connection {
  source: string
  target: string
  sourceHandle?: string | null
  targetHandle?: string | null
}

export interface EdgeStyle {
  stroke?: string
  strokeWidth?: number
  strokeDasharray?: string
  [key: string]: string | number | undefined
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
  animationType?: 'dash' | 'dot' | 'taper'
  label?: string
  labelStyle?: NodeStyle
  labelShowBg?: boolean
  labelBgColor?: string
  labelBgPadding?: [number, number]
  labelBgBorderRadius?: number
  style?: EdgeStyle
  data?: Data
  zIndex?: number
  selectable?: boolean
  deletable?: boolean
  hidden?: boolean
  selected?: boolean
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

export type EdgeUserData = Partial<Omit<Edge, 'id' | 'source' | 'target'>> & {
  id: string
  source: string
  target: string
}

export function isEdge<T extends Edge>(value: unknown): value is T {
  return (
    !!value && typeof value === 'object' && 'id' in value && 'source' in value && 'target' in value
  )
}

export function isEdgeType(type: string): type is EdgeType {
  return ['smoothstep', 'step', 'bezier', 'straight', 'default'].includes(type)
}
