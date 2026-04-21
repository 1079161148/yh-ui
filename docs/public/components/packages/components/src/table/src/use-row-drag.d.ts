/**
 * useRowDrag
 * @description 行拖拽排序 Hook
 * 使用 HTML5 Drag & Drop API，支持自定义拖拽手柄、动画效果、树形结构拖拽
 */
import { type Ref } from 'vue'
import type { TableDragConfig, TableTreeConfig } from './table'
export interface UseRowDragOptions {
  /** 表格数据（展平后的渲染数据） */
  data: Ref<Record<string, unknown>[]>
  /** 原始数据（树形时为未展平的原始数据） */
  rawData: Ref<Record<string, unknown>[]>
  /** 拖拽配置 */
  dragConfig: Ref<TableDragConfig | undefined>
  /** 树形配置 */
  treeConfig: Ref<TableTreeConfig | undefined>
  /** 获取行 key */
  rowKey: (row: Record<string, unknown>) => string | number
  /** 事件触发 */
  emit: (event: string, ...args: unknown[]) => void
}
export interface UseRowDragReturn {
  /** 是否启用行拖拽 */
  isRowDragEnabled: Ref<boolean>
  /** 当前是否正在拖拽 */
  isDraggingRow: Ref<boolean>
  /** 拖拽中的行索引 */
  dragRowIndex: Ref<number>
  /** 放置目标行索引 */
  dropRowIndex: Ref<number>
  /** 获取行拖拽相关 HTML attrs */
  getRowDragAttrs: (rowIndex: number) => Record<string, unknown>
  /** 获取行拖拽相关 CSS 类名 */
  getRowDragClass: (rowIndex: number) => string
}
export declare const useRowDrag: (options: UseRowDragOptions) => UseRowDragReturn
