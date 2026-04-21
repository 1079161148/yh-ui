/**
 * useColumnDrag
 * @description 列拖拽排序 Hook
 * 使用 HTML5 Drag & Drop API 实现表头列拖拽排序
 * 支持固定列排除、分组表头整组拖拽
 */
import { type Ref } from 'vue'
import type { TableColumn, TableDragConfig } from './table'
export interface UseColumnDragOptions {
  /** 可见列 */
  columns: Ref<TableColumn[]>
  /** 拖拽配置 */
  dragConfig: Ref<TableDragConfig | undefined>
  /** 扁平后的列配置(用于操作) */
  flatColumns: Ref<TableColumn[]>
  /** 事件触发 */
  emit: (event: string, ...args: unknown[]) => void
}
export interface UseColumnDragReturn {
  /** 是否启用列拖拽 */
  isColumnDragEnabled: Ref<boolean>
  /** 是否正在拖拽列 */
  isDraggingColumn: Ref<boolean>
  /** 拖拽中的列索引 */
  dragColumnIndex: Ref<number>
  /** 放置目标列索引 */
  dropColumnIndex: Ref<number>
  /** 判断列是否可拖拽 */
  isColumnDraggable: (column: TableColumn) => boolean
  /** 获取列拖拽 HTML attrs */
  getHeaderDragAttrs: (column: TableColumn, columnIndex: number) => Record<string, unknown>
  /** 获取列拖拽 CSS 类 */
  getHeaderDragClass: (columnIndex: number) => string
}
export declare const useColumnDrag: (options: UseColumnDragOptions) => UseColumnDragReturn
