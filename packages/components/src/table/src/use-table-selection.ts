/**
 * useTableSelection
 * @description 表格选择功能 Hook
 * 支持多选、单选、跨页保留、全选控制
 */

import { ref, computed, watch, type Ref } from 'vue'
import type { TableSelectionConfig, RowKey, SelectionType } from './table'
import { getRowKey } from './utils'

export interface TableSelectionOptions<T = Record<string, unknown>> {
  data: Ref<T[]>
  rowKey: RowKey
  config: Ref<TableSelectionConfig<T> | undefined>
}

export interface TableSelectionReturn<T = Record<string, unknown>> {
  /** 已选中的行 key 列表 */
  selectedRowKeys: Ref<Array<string | number>>
  /** 已选中的行数据 */
  selectedRows: Ref<T[]>
  /** 是否全选 */
  isAllSelected: Ref<boolean>
  /** 是否半选 */
  isIndeterminate: Ref<boolean>
  /** 选择类型 */
  selectionType: Ref<SelectionType>
  /** 切换行选中状态 */
  toggleRowSelection: (row: T, selected?: boolean) => void
  /** 切换全选 */
  toggleAllSelection: () => void
  /** 清空选择 */
  clearSelection: () => void
  /** 设置选中行 */
  setSelection: (rows: T[]) => void
  /** 设置选中行 key */
  setSelectionByKeys: (keys: Array<string | number>) => void
  /** 判断行是否选中 */
  isRowSelected: (row: T) => boolean
  /** 判断行是否可选 */
  isRowSelectable: (row: T, rowIndex: number) => boolean
  /** 获取可选行数量 */
  selectableCount: Ref<number>
}

export const useTableSelection = <T extends Record<string, unknown>>(
  options: TableSelectionOptions<T>
): TableSelectionReturn<T> => {
  const { data, rowKey, config } = options

  // 已选中的行 key
  const selectedRowKeys = ref<Array<string | number>>([]) as Ref<Array<string | number>>

  // 选择类型
  const selectionType = computed<SelectionType>(() => {
    return config.value?.type || 'checkbox'
  })

  // 是否保留跨页选择
  const reserveSelection = computed(() => {
    return config.value?.reserve ?? true
  })

  // 行是否可选
  const isRowSelectable = (row: T, rowIndex: number): boolean => {
    if (!config.value?.checkable) return true
    return config.value.checkable(row, rowIndex)
  }

  // 可选行数量
  const selectableCount = computed(() => {
    return data.value.filter((row, index) => isRowSelectable(row, index)).length
  })

  // 判断行是否选中
  const isRowSelected = (row: T): boolean => {
    const key = getRowKey(row, rowKey)
    return selectedRowKeys.value.includes(key)
  }

  // 已选中的行数据
  const selectedRows = computed(() => {
    const keySet = new Set(selectedRowKeys.value)
    return data.value.filter((row) => {
      const key = getRowKey(row, rowKey)
      return keySet.has(key)
    })
  })

  // 当前页可选行的选中数量
  const selectedCountInCurrentPage = computed(() => {
    return data.value.filter((row, index) => {
      if (!isRowSelectable(row, index)) return false
      return isRowSelected(row)
    }).length
  })

  // 是否全选
  const isAllSelected = computed(() => {
    if (selectableCount.value === 0) return false
    return selectedCountInCurrentPage.value === selectableCount.value
  })

  // 是否半选
  const isIndeterminate = computed(() => {
    if (selectableCount.value === 0) return false
    return (
      selectedCountInCurrentPage.value > 0 &&
      selectedCountInCurrentPage.value < selectableCount.value
    )
  })

  // 切换行选中状态
  const toggleRowSelection = (row: T, selected?: boolean) => {
    const key = getRowKey(row, rowKey)
    const index = data.value.findIndex((item) => getRowKey(item, rowKey) === key)

    // 检查是否可选
    if (!isRowSelectable(row, index)) return

    const isCurrentlySelected = selectedRowKeys.value.includes(key)
    const shouldSelect = selected ?? !isCurrentlySelected

    if (selectionType.value === 'radio') {
      // 单选模式
      if (shouldSelect) {
        selectedRowKeys.value = [key]
      } else {
        selectedRowKeys.value = []
      }
    } else {
      // 多选模式
      if (shouldSelect && !isCurrentlySelected) {
        selectedRowKeys.value = [...selectedRowKeys.value, key]
      } else if (!shouldSelect && isCurrentlySelected) {
        selectedRowKeys.value = selectedRowKeys.value.filter((k) => k !== key)
      }
    }

    // 触发变化回调
    config.value?.onChange?.(selectedRowKeys.value, selectedRows.value)
  }

  // 切换全选
  const toggleAllSelection = () => {
    const selectAllMode = config.value?.selectAllMode || 'currentPage'

    if (isAllSelected.value) {
      // 取消全选
      if (selectAllMode === 'currentPage') {
        // 只取消当前页
        const currentPageKeys = new Set(
          data.value
            .filter((row, index) => isRowSelectable(row, index))
            .map((row) => getRowKey(row, rowKey))
        )
        selectedRowKeys.value = selectedRowKeys.value.filter((key) => !currentPageKeys.has(key))
      } else {
        // 取消全部
        selectedRowKeys.value = []
      }
    } else {
      // 全选
      if (selectAllMode === 'currentPage') {
        // 只选当前页
        const currentPageKeys = data.value
          .filter((row, index) => isRowSelectable(row, index))
          .map((row) => getRowKey(row, rowKey))

        if (reserveSelection.value) {
          // 保留其他页的选择
          const otherPageKeys = selectedRowKeys.value.filter((key) => {
            return !data.value.some((row) => getRowKey(row, rowKey) === key)
          })
          selectedRowKeys.value = [...new Set([...otherPageKeys, ...currentPageKeys])]
        } else {
          selectedRowKeys.value = currentPageKeys
        }
      } else {
        // 全部数据（需要外部提供）
        const allKeys = data.value
          .filter((row, index) => isRowSelectable(row, index))
          .map((row) => getRowKey(row, rowKey))
        selectedRowKeys.value = allKeys
      }
    }

    // 触发变化回调
    config.value?.onChange?.(selectedRowKeys.value, selectedRows.value)
  }

  // 清空选择
  const clearSelection = () => {
    selectedRowKeys.value = []
    config.value?.onChange?.([], [])
  }

  // 设置选中行
  const setSelection = (rows: T[]) => {
    selectedRowKeys.value = rows.map((row) => getRowKey(row, rowKey))
    config.value?.onChange?.(selectedRowKeys.value, rows)
  }

  // 设置选中行 key
  const setSelectionByKeys = (keys: Array<string | number>) => {
    selectedRowKeys.value = keys
    config.value?.onChange?.(selectedRowKeys.value, selectedRows.value)
  }

  // 监听外部传入的 selectedRowKeys
  watch(
    () => config.value?.selectedRowKeys,
    (newKeys) => {
      if (newKeys && Array.isArray(newKeys)) {
        selectedRowKeys.value = [...newKeys]
      }
    },
    { immediate: true }
  )

  // 如果不保留选择，数据变化时清空不在数据中的选择
  watch(
    () => data.value,
    (newData) => {
      if (!reserveSelection.value) {
        const validKeys = new Set(newData.map((row) => getRowKey(row, rowKey)))
        selectedRowKeys.value = selectedRowKeys.value.filter((key) => validKeys.has(key))
      }
    }
  )

  return {
    selectedRowKeys,
    selectedRows,
    isAllSelected,
    isIndeterminate,
    selectionType,
    toggleRowSelection,
    toggleAllSelection,
    clearSelection,
    setSelection,
    setSelectionByKeys,
    isRowSelected,
    isRowSelectable,
    selectableCount
  }
}
