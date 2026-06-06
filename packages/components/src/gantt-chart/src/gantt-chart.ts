import type { ComponentThemeVars } from '@yh-ui/theme'

export type GanttViewMode = 'day' | 'week' | 'month' | 'year'

export interface GanttTask {
  id: string | number
  name: string
  startDate: string | number | Date
  endDate: string | number | Date
  progress?: number
  dependencies?: (string | number)[]
  parentId?: string | number
  expanded?: boolean
  assignees?: string[]
  children?: GanttTask[]
  color?: string
  textColor?: string
  status?: 'success' | 'warning' | 'danger' | 'info' | 'default'
  [key: string]: unknown
}

export interface GanttResource {
  id: string
  name: string
  avatar?: string
  load?: number
}

export interface GanttColumn {
  prop: string
  label: string
  width?: string | number
  align?: 'left' | 'center' | 'right'
}

export type GanttChartProps = {
  data: GanttTask[]
  columns?: GanttColumn[]
  startDate?: string | number | Date
  endDate?: string | number | Date
  viewMode?: GanttViewMode
  showDependencies?: boolean
  draggable?: boolean
  progressDraggable?: boolean
  autoSchedule?: boolean
  virtual?: boolean
  showResourceLoad?: boolean
  rowHeight?: number
  headerHeight?: number
  bordered?: boolean
  loading?: boolean
  teleported?: boolean
  themeOverrides?: ComponentThemeVars
}

export type GanttChartEmits = {
  (e: 'update:data', data: GanttTask[]): void
  (e: 'update:viewMode', value: GanttViewMode): void
  (e: 'task-click', task: GanttTask, event: MouseEvent): void
  (e: 'task-dblclick', task: GanttTask, event: MouseEvent): void
  (e: 'task-drag-end', task: GanttTask): void
  (e: 'progress-drag-end', task: GanttTask): void
  (e: 'dependency-click', from: GanttTask, to: GanttTask, event: MouseEvent): void
}

export interface GanttDependencyLink {
  id: string
  from: GanttTask
  to: GanttTask
  path: string
}

export interface GanttTaskStyle {
  task: GanttTask
  index: number
  isMilestone?: boolean
  isSummary?: boolean
  hasConflict?: boolean
  style: {
    left: string
    width: string
    top: string
    height: string
    backgroundColor?: string
    color?: string
    margin?: string
  }
  left: number
  width: number
  top: number
}

export interface GanttChartSlots {
  'task-content'?: (props: { task: GanttTask }) => unknown
  'table-cell'?: (props: { row: GanttTask; column: GanttColumn; index: number }) => unknown
  tooltip?: (props: { task: GanttTask }) => unknown
}

export interface FlattenedGanttTask extends GanttTask {
  _original: GanttTask
  _level: number
  _parentId: string | number | null
  _isLast: boolean
  _ancestorHasNext: boolean[]
  _hasChildren: boolean
  _startDate: string
  _endDate: string
  _isMilestone: boolean
  _matchesSearch: boolean
}

export type GanttChartInstance = InstanceType<typeof import('./gantt-chart.vue').default>
