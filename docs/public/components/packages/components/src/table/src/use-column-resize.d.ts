/**
 * useColumnResize
 * @description 列宽拖拽调整 Hook
 * 使用 Pointer Events API 实现精准列宽控制
 * 支持最小/最大宽度约束、列级别配置、指示线
 */
import { type Ref } from 'vue'
import type { TableColumn } from './table'
export interface UseColumnResizeOptions {
  /** 是否全局启用列宽调整 */
  resizable: Ref<boolean>
  /** 列配置 */
  columns: Ref<TableColumn[]>
  /** 表格根元素 */
  tableRef: Ref<HTMLElement | null>
  /** 事件触发 */
  emit: (event: string, ...args: unknown[]) => void
}
export interface UseColumnResizeReturn {
  /** 是否正在调整列宽 */
  isResizing: Ref<boolean>
  /** 当前调整的列 */
  resizingColumn: Ref<TableColumn | null>
  /** 指示线位置 */
  resizeLineLeft: Ref<number>
  /** 指示线是否可见 */
  resizeLineVisible: Ref<boolean>
  /** 列是否可调整宽度 */
  isColumnResizable: (column: TableColumn) => boolean
  /** 开始调整列宽 */
  handleResizeStart: (event: PointerEvent, column: TableColumn, columnEl: HTMLElement) => void
}
export declare const useColumnResize: (options: UseColumnResizeOptions) => UseColumnResizeReturn
