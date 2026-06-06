/**
 * useColumnDrag
 * @description 列拖拽排序 Hook
 * 使用 HTML5 Drag & Drop API 实现表头列拖拽排序
 * 支持固定列排除、分组表头整组拖拽
 */

import { ref, computed, type Ref } from 'vue'
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

export const useColumnDrag = (options: UseColumnDragOptions): UseColumnDragReturn => {
  const { columns, dragConfig, flatColumns, emit } = options

  // ==================== 状态 ====================
  const isDraggingColumn = ref(false)
  const dragColumnIndex = ref(-1)
  const dropColumnIndex = ref(-1)

  // ==================== 计算属性 ====================
  const isColumnDragEnabled = computed(() => !!dragConfig.value?.column)

  // ==================== 方法 ====================

  /** 判断列是否可拖拽（固定列默认不可拖拽） */
  const isColumnDraggable = (column: TableColumn): boolean => {
    if (!isColumnDragEnabled.value) return false
    // 固定列不可拖拽
    if (column.fixed) return false
    // 列级别配置优先
    if (column.draggable !== undefined) return column.draggable
    return true
  }

  // ==================== 事件处理 ====================

  const onHeaderDragStart = (column: TableColumn, columnIndex: number, event: DragEvent) => {
    if (!isColumnDraggable(column)) {
      event.preventDefault()
      return
    }

    isDraggingColumn.value = true
    dragColumnIndex.value = columnIndex
    dropColumnIndex.value = columnIndex

    if (event.dataTransfer) {
      event.dataTransfer.effectAllowed = 'move'
      event.dataTransfer.setData('text/plain', String(columnIndex))

      // 设置拖拽图像透明度
      const target = event.target as HTMLElement
      if (target) {
        const clone = target.cloneNode(true) as HTMLElement
        clone.style.opacity = '0.7'
        clone.style.position = 'absolute'
        clone.style.top = '-9999px'
        document.body.appendChild(clone)
        event.dataTransfer.setDragImage(clone, event.offsetX, event.offsetY)
        requestAnimationFrame(() => document.body.removeChild(clone))
      }
    }

    // 触发回调
    dragConfig.value?.onDragStart?.({
      type: 'column',
      data: column,
      index: columnIndex
    })
  }

  const onHeaderDragOver = (column: TableColumn, columnIndex: number, event: DragEvent) => {
    event.preventDefault()
    if (!isDraggingColumn.value) return
    if (!isColumnDraggable(column)) return

    if (event.dataTransfer) {
      event.dataTransfer.dropEffect = 'move'
    }

    dropColumnIndex.value = columnIndex
  }

  const onHeaderDragEnter = (column: TableColumn, columnIndex: number, event: DragEvent) => {
    event.preventDefault()
    if (!isDraggingColumn.value) return
    if (!isColumnDraggable(column)) return

    dropColumnIndex.value = columnIndex
  }

  const onHeaderDrop = (_column: TableColumn, columnIndex: number, event: DragEvent) => {
    event.preventDefault()
    if (!isDraggingColumn.value) return

    const oldIndex = dragColumnIndex.value
    const newIndex = columnIndex

    if (oldIndex !== newIndex && oldIndex >= 0 && newIndex >= 0) {
      // 重排列配置
      const cols = flatColumns.value
      const newCols = [...cols]
      const [movedCol] = newCols.splice(oldIndex, 1)
      newCols.splice(newIndex, 0, movedCol)

      // 更新列顺序：直接修改原列数组
      // 由于 flatColumns 可能是 computed 的结果，我们需要更新 columns 的源
      reorderColumns(columns.value, oldIndex, newIndex)

      // 触发回调
      const params = {
        type: 'column' as const,
        oldIndex,
        newIndex,
        data: newCols
      }

      dragConfig.value?.onDragEnd?.(params)
      emit('drag-end', params)
    }

    resetDragState()
  }

  const onHeaderDragEnd = (_event: DragEvent) => {
    resetDragState()
  }

  const resetDragState = () => {
    isDraggingColumn.value = false
    dragColumnIndex.value = -1
    dropColumnIndex.value = -1
  }

  // ==================== 列重排工具 ====================

  /**
   * 重排列数组（支持分组表头）
   * 对于扁平列重排，需要在原始 columns 中找到对应位置并交换
   */
  const reorderColumns = (cols: TableColumn[], oldIndex: number, newIndex: number) => {
    // 获取扁平列
    const flat = flatColumns.value
    const movedColumn = flat[oldIndex]
    const targetColumn = flat[newIndex]

    if (!movedColumn || !targetColumn) return

    // 在原始数组中找到并移动
    const findAndRemove = (arr: TableColumn[], target: TableColumn): boolean => {
      const idx = arr.indexOf(target)
      if (idx !== -1) {
        arr.splice(idx, 1)
        return true
      }
      for (const col of arr) {
        if (col.children?.length) {
          if (findAndRemove(col.children, target)) return true
        }
      }
      return false
    }

    const findAndInsert = (
      arr: TableColumn[],
      target: TableColumn,
      toInsert: TableColumn,
      after: boolean
    ): boolean => {
      const idx = arr.indexOf(target)
      if (idx !== -1) {
        arr.splice(after ? idx + 1 : idx, 0, toInsert)
        return true
      }
      for (const col of arr) {
        if (col.children?.length) {
          if (findAndInsert(col.children, target, toInsert, after)) return true
        }
      }
      return false
    }

    // 先移除
    findAndRemove(cols, movedColumn)
    // 再插入（在目标位置之前或之后）
    findAndInsert(cols, targetColumn, movedColumn, oldIndex > newIndex ? false : true)
  }

  // ==================== 属性生成 ====================

  const getHeaderDragAttrs = (column: TableColumn, columnIndex: number): Record<string, unknown> => {
    if (!isColumnDragEnabled.value || !isColumnDraggable(column)) return {}

    return {
      draggable: true,
      onDragstart: (e: DragEvent) => onHeaderDragStart(column, columnIndex, e),
      onDragover: (e: DragEvent) => onHeaderDragOver(column, columnIndex, e),
      onDragenter: (e: DragEvent) => onHeaderDragEnter(column, columnIndex, e),
      onDrop: (e: DragEvent) => onHeaderDrop(column, columnIndex, e),
      onDragend: (e: DragEvent) => onHeaderDragEnd(e)
    }
  }

  const getHeaderDragClass = (columnIndex: number): string => {
    if (!isColumnDragEnabled.value || !isDraggingColumn.value) return ''

    const classes: string[] = []

    if (columnIndex === dragColumnIndex.value) {
      classes.push('is-column-dragging')
    }

    if (columnIndex === dropColumnIndex.value && columnIndex !== dragColumnIndex.value) {
      if (dropColumnIndex.value < dragColumnIndex.value) {
        classes.push('is-column-drop-left')
      } else {
        classes.push('is-column-drop-right')
      }
    }

    return classes.join(' ')
  }

  return {
    isColumnDragEnabled,
    isDraggingColumn,
    dragColumnIndex,
    dropColumnIndex,
    isColumnDraggable,
    getHeaderDragAttrs,
    getHeaderDragClass
  }
}

