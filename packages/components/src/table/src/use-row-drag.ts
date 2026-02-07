/**
 * useRowDrag
 * @description 行拖拽排序 Hook
 * 使用 HTML5 Drag & Drop API，支持自定义拖拽手柄、动画效果、树形结构拖拽
 */

import { ref, computed, type Ref } from 'vue'
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

export const useRowDrag = (options: UseRowDragOptions): UseRowDragReturn => {
  const { data, rawData, dragConfig, treeConfig, emit } = options

  // ==================== 状态 ====================
  const isDraggingRow = ref(false)
  const dragRowIndex = ref(-1)
  const dropRowIndex = ref(-1)

  // 追踪 mousedown 目标，用于判断拖拽是否从 handle 发起
  let lastMouseDownTarget: Element | null = null

  // ==================== 计算属性 ====================
  const isRowDragEnabled = computed(() => !!dragConfig.value?.row)
  const hasHandle = computed(() => !!dragConfig.value?.handle)

  // ==================== 事件处理 ====================

  const onMouseDown = (event: MouseEvent) => {
    lastMouseDownTarget = event.target as Element
  }

  const onDragStart = (rowIndex: number, event: DragEvent) => {
    // 如果使用 handle 模式，检查 mousedown 是否来自 handle 元素
    if (hasHandle.value) {
      const handleSelector = dragConfig.value?.handle
      if (handleSelector && lastMouseDownTarget) {
        if (!lastMouseDownTarget.closest(handleSelector)) {
          event.preventDefault()
          return
        }
      } else {
        event.preventDefault()
        return
      }
    }

    isDraggingRow.value = true
    dragRowIndex.value = rowIndex
    dropRowIndex.value = rowIndex

    // 设置拖拽数据
    if (event.dataTransfer) {
      event.dataTransfer.effectAllowed = 'move'
      event.dataTransfer.setData('text/plain', String(rowIndex))

      // 自定义拖拽样式
      const dragClass = dragConfig.value?.dragClass
      if (dragClass) {
        const target = event.target as HTMLElement
        target.classList.add(dragClass)
      }

      // 为含有 sticky 列的表格创建自定义拖拽图像
      // 浏览器原生 ghost 无法正确渲染 position:sticky 单元格
      const tr = event.target as HTMLElement
      if (tr && tr.tagName === 'TR') {
        createDragImage(tr, event)
      }
    }

    // 触发回调
    dragConfig.value?.onDragStart?.({
      type: 'row',
      data: data.value[rowIndex],
      index: rowIndex
    })
  }

  const onDragOver = (rowIndex: number, event: DragEvent) => {
    event.preventDefault()
    if (!isDraggingRow.value) return

    if (event.dataTransfer) {
      event.dataTransfer.dropEffect = 'move'
    }

    dropRowIndex.value = rowIndex
  }

  const onDragEnter = (rowIndex: number, event: DragEvent) => {
    event.preventDefault()
    if (!isDraggingRow.value) return
    dropRowIndex.value = rowIndex
  }

  const onDrop = (rowIndex: number, event: DragEvent) => {
    event.preventDefault()
    if (!isDraggingRow.value) return

    const oldIndex = dragRowIndex.value
    const newIndex = rowIndex

    if (oldIndex !== newIndex && oldIndex >= 0 && newIndex >= 0) {
      if (treeConfig.value) {
        // ===== 树形模式：在原始树结构中执行重排 =====
        performTreeDrop(oldIndex, newIndex)
      } else {
        // ===== 普通模式：直接 splice 扁平数组 =====
        const arr = data.value
        const [movedItem] = arr.splice(oldIndex, 1)
        arr.splice(newIndex, 0, movedItem)

        // 同时 emit update:data 以支持 v-model:data
        emit('update:data', [...arr])

        // 触发回调
        const params = {
          type: 'row' as const,
          oldIndex,
          newIndex,
          data: [...arr]
        }

        dragConfig.value?.onDragEnd?.(params)
        emit('drag-end', params)
      }
    }

    // 重置状态
    resetDragState()
  }

  // ==================== 树形拖拽 ====================

  /**
   * 在树结构中查找节点的父数组和索引
   * 返回 { parent: 包含该节点的数组, index: 节点在数组中的位置 }
   */
  const findNodeInTree = (
    tree: Record<string, unknown>[],
    targetKey: string | number,
    childrenKey: string
  ): { parent: Record<string, unknown>[]; index: number } | null => {
    for (let i = 0; i < tree.length; i++) {
      const key = options.rowKey(tree[i])
      if (key === targetKey) {
        return { parent: tree, index: i }
      }
      const children = tree[i][childrenKey] as Record<string, unknown>[] | undefined
      if (Array.isArray(children) && children.length > 0) {
        const result = findNodeInTree(children, targetKey, childrenKey)
        if (result) return result
      }
    }
    return null
  }

  /**
   * 树形模式下执行拖拽重排
   * - 同级节点之间：直接在同一个 children 数组中移动
   * - 不同父节点之间：从旧父节点移除，插入到新父节点相邻位置
   */
  const performTreeDrop = (oldIndex: number, newIndex: number) => {
    const flatData = data.value
    const draggedRow = flatData[oldIndex]
    const targetRow = flatData[newIndex]
    if (!draggedRow || !targetRow) return

    const draggedKey = options.rowKey(draggedRow)
    const targetKey = options.rowKey(targetRow)
    const childrenKey = treeConfig.value?.childrenKey || 'children'
    const tree = rawData.value

    // 在原始树中找到拖拽节点和目标节点
    const draggedInfo = findNodeInTree(tree, draggedKey, childrenKey)
    const targetInfo = findNodeInTree(tree, targetKey, childrenKey)

    if (!draggedInfo || !targetInfo) return

    // 从旧位置移除
    const [movedNode] = draggedInfo.parent.splice(draggedInfo.index, 1)

    // 重新查找目标位置（因为移除操作可能影响索引）
    const newTargetInfo = findNodeInTree(tree, targetKey, childrenKey)
    if (!newTargetInfo) {
      // 如果找不到目标，把节点放回原位
      draggedInfo.parent.splice(draggedInfo.index, 0, movedNode)
      return
    }

    // 在目标位置插入（如果目标在原位之后，则插入在目标之后）
    const insertIndex = oldIndex < newIndex
      ? newTargetInfo.index + 1
      : newTargetInfo.index
    newTargetInfo.parent.splice(insertIndex, 0, movedNode)

    // emit update:data
    emit('update:data', [...tree])

    // 触发回调
    const params = {
      type: 'row' as const,
      oldIndex,
      newIndex,
      data: [...tree]
    }

    dragConfig.value?.onDragEnd?.(params)
    emit('drag-end', params)
  }

  const onDragEnd = (_event: DragEvent) => {
    resetDragState()
  }

  /**
   * 创建自定义拖拽图像
   * 克隆行并移除 sticky 定位，确保冻结列也能正确渲染
   */
  const createDragImage = (tr: HTMLElement, event: DragEvent) => {
    const clone = tr.cloneNode(true) as HTMLElement
    // 获取原行的计算样式来确定总宽度
    const cells = tr.querySelectorAll('td, th')
    const cloneCells = clone.querySelectorAll('td, th')

    // 将 sticky 单元格改为 static，并固定宽度
    cells.forEach((cell, i) => {
      const computed = window.getComputedStyle(cell)
      const cloneCell = cloneCells[i] as HTMLElement
      if (cloneCell) {
        cloneCell.style.position = 'static'
        cloneCell.style.width = computed.width
        cloneCell.style.minWidth = computed.width
        cloneCell.style.maxWidth = computed.width
        cloneCell.style.backgroundColor = computed.backgroundColor || '#fff'
      }
    })

    // 设置克隆行样式
    clone.style.position = 'fixed'
    clone.style.top = '-9999px'
    clone.style.left = '-9999px'
    clone.style.display = 'table'
    clone.style.tableLayout = 'fixed'
    clone.style.width = tr.offsetWidth + 'px'
    clone.style.opacity = '0.85'
    clone.style.backgroundColor = '#fff'
    clone.style.boxShadow = '0 2px 12px rgba(0,0,0,0.15)'
    clone.style.borderRadius = '2px'
    clone.style.zIndex = '9999'

    document.body.appendChild(clone)

    // 计算鼠标相对于行的偏移
    const rect = tr.getBoundingClientRect()
    const offsetX = event.clientX - rect.left
    const offsetY = event.clientY - rect.top
    event.dataTransfer!.setDragImage(clone, offsetX, offsetY)

    // 下一帧移除克隆元素（浏览器已截取快照）
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        if (clone.parentNode) {
          document.body.removeChild(clone)
        }
      })
    })
  }

  const resetDragState = () => {
    isDraggingRow.value = false
    dragRowIndex.value = -1
    dropRowIndex.value = -1
    lastMouseDownTarget = null
  }

  // ==================== 属性生成 ====================

  const getRowDragAttrs = (rowIndex: number): Record<string, unknown> => {
    if (!isRowDragEnabled.value) return {}

    return {
      draggable: true,
      onMousedown: (e: MouseEvent) => onMouseDown(e),
      onDragstart: (e: DragEvent) => onDragStart(rowIndex, e),
      onDragover: (e: DragEvent) => onDragOver(rowIndex, e),
      onDragenter: (e: DragEvent) => onDragEnter(rowIndex, e),
      onDrop: (e: DragEvent) => onDrop(rowIndex, e),
      onDragend: (e: DragEvent) => onDragEnd(e)
    }
  }

  const getRowDragClass = (rowIndex: number): string => {
    if (!isRowDragEnabled.value || !isDraggingRow.value) return ''

    const classes: string[] = []

    if (rowIndex === dragRowIndex.value) {
      classes.push('is-dragging')
      if (dragConfig.value?.ghostClass) {
        classes.push(dragConfig.value.ghostClass)
      }
    }

    if (rowIndex === dropRowIndex.value && rowIndex !== dragRowIndex.value) {
      if (dropRowIndex.value < dragRowIndex.value) {
        classes.push('is-drop-target-above')
      } else {
        classes.push('is-drop-target-below')
      }
    }

    return classes.join(' ')
  }

  return {
    isRowDragEnabled,
    isDraggingRow,
    dragRowIndex,
    dropRowIndex,
    getRowDragAttrs,
    getRowDragClass
  }
}

