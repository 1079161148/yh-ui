/**
 * useColumnResize
 * @description 列宽拖拽调整 Hook
 * 使用 Pointer Events API 实现精准列宽控制
 * 支持最小/最大宽度约束、列级别配置、指示线
 */

import { ref, onUnmounted, type Ref } from 'vue'
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

export const useColumnResize = (options: UseColumnResizeOptions): UseColumnResizeReturn => {
  const { resizable, tableRef, emit } = options

  // ==================== 状态 ====================
  const isResizing = ref(false)
  const resizingColumn = ref<TableColumn | null>(null)
  const resizeLineLeft = ref(0)
  const resizeLineVisible = ref(false)

  // 内部追踪
  let startX = 0
  let startWidth = 0
  let currentColumn: TableColumn | null = null

  // ==================== 方法 ====================

  const isColumnResizable = (column: TableColumn): boolean => {
    // 列级别优先，否则用全局配置
    if (column.resizable !== undefined) return column.resizable
    return resizable.value
  }

  const handleResizeStart = (event: PointerEvent, column: TableColumn, el: HTMLElement) => {
    if (!isColumnResizable(column)) return

    event.preventDefault()
    event.stopPropagation()

    isResizing.value = true
    resizingColumn.value = column
    currentColumn = column

    startX = event.clientX
    startWidth = el.offsetWidth

    // 显示指示线
    if (tableRef.value) {
      const tableRect = tableRef.value.getBoundingClientRect()
      resizeLineLeft.value = event.clientX - tableRect.left
      resizeLineVisible.value = true
    }

    // 设置光标
    document.body.style.cursor = 'col-resize'
    document.body.style.userSelect = 'none'

    // 捕获指针
    ;(event.target as HTMLElement).setPointerCapture?.(event.pointerId)

    // 绑定事件
    document.addEventListener('pointermove', handleResizeMove)
    document.addEventListener('pointerup', handleResizeEnd)
  }

  const handleResizeMove = (event: PointerEvent) => {
    if (!isResizing.value || !currentColumn) return

    const deltaX = event.clientX - startX
    let newWidth = Math.max(startWidth + deltaX, 40) // 最小 40px

    // 应用最小宽度约束
    const minWidth = parseInt(String(currentColumn.minWidth || 40))
    if (newWidth < minWidth) newWidth = minWidth

    // 应用最大宽度约束
    if (currentColumn.maxWidth) {
      const maxWidth = parseInt(String(currentColumn.maxWidth))
      if (newWidth > maxWidth) newWidth = maxWidth
    }

    // 实时更新列宽
    currentColumn.width = newWidth

    // 更新指示线位置
    if (tableRef.value) {
      const tableRect = tableRef.value.getBoundingClientRect()
      resizeLineLeft.value = event.clientX - tableRect.left
    }
  }

  const handleResizeEnd = (_event: PointerEvent) => {
    if (currentColumn) {
      const finalWidth = parseInt(String(currentColumn.width)) || startWidth
      emit('column-resize', currentColumn, finalWidth)
    }

    // 重置状态
    isResizing.value = false
    resizingColumn.value = null
    resizeLineVisible.value = false
    currentColumn = null

    // 恢复光标
    document.body.style.cursor = ''
    document.body.style.userSelect = ''

    // 解绑事件
    document.removeEventListener('pointermove', handleResizeMove)
    document.removeEventListener('pointerup', handleResizeEnd)
  }

  // 清理
  onUnmounted(() => {
    document.removeEventListener('pointermove', handleResizeMove)
    document.removeEventListener('pointerup', handleResizeEnd)
    document.body.style.cursor = ''
    document.body.style.userSelect = ''
  })

  return {
    isResizing,
    resizingColumn,
    resizeLineLeft,
    resizeLineVisible,
    isColumnResizable,
    handleResizeStart
  }
}
