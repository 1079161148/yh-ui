/**
 * Table Utils
 * @description 表格工具函数
 */

import type { TableColumn, RowKey, SortOrder } from './table'

/**
 * 获取行唯一标识
 */
export const getRowKey = (row: Record<string, unknown>, rowKey: RowKey): string | number => {
  if (typeof rowKey === 'function') {
    return rowKey(row)
  }
  return row[rowKey] as string | number
}

/**
 * 获取列唯一标识
 */
export const getColumnKey = (column: TableColumn): string => {
  return column.key || column.prop || ''
}

/**
 * 展平嵌套列
 */
export const flattenColumns = (columns: TableColumn[]): TableColumn[] => {
  const result: TableColumn[] = []

  const flatten = (cols: TableColumn[]) => {
    cols.forEach((col) => {
      if (col.children?.length) {
        flatten(col.children)
      } else {
        result.push(col)
      }
    })
  }

  flatten(columns)
  return result
}

/**
 * 获取列层级深度
 */
export const getColumnDepth = (columns: TableColumn[]): number => {
  let depth = 1

  const getDepth = (cols: TableColumn[], level: number) => {
    cols.forEach((col) => {
      if (col.children?.length) {
        depth = Math.max(depth, level + 1)
        getDepth(col.children, level + 1)
      }
    })
  }

  getDepth(columns, 1)
  return depth
}

/**
 * 表头单元格信息
 */
export interface HeaderCell {
  column: TableColumn
  colspan: number
  rowspan: number
}

/**
 * 获取叶子列数量
 */
const getLeafCount = (col: TableColumn): number => {
  if (!col.children?.length) return 1
  return col.children.reduce((sum, child) => sum + getLeafCount(child), 0)
}

/**
 * 构建多级表头行数据
 * 将嵌套的 columns 结构转换为 HeaderCell[][] 二维数组（每行对应 <tr>）
 */
export const buildHeaderRows = (columns: TableColumn[]): HeaderCell[][] => {
  const maxDepth = getColumnDepth(columns)
  if (maxDepth <= 1) return [] // 单层表头无需特殊处理

  const rows: HeaderCell[][] = Array.from({ length: maxDepth }, () => [])

  const traverse = (cols: TableColumn[], level: number) => {
    cols.forEach((col) => {
      if (col.children?.length) {
        rows[level].push({
          column: col,
          colspan: getLeafCount(col),
          rowspan: 1
        })
        traverse(col.children, level + 1)
      } else {
        rows[level].push({
          column: col,
          colspan: 1,
          rowspan: maxDepth - level
        })
      }
    })
  }

  traverse(columns, 0)
  return rows
}

/**
 * 计算列宽度
 */
export const calculateColumnWidth = (
  column: TableColumn,
  containerWidth: number,
  columns: TableColumn[]
): number => {
  if (column.width) {
    if (typeof column.width === 'number') {
      return column.width
    }
    if (typeof column.width === 'string') {
      if (column.width.endsWith('%')) {
        return (parseFloat(column.width) / 100) * containerWidth
      }
      return parseFloat(column.width)
    }
  }

  // 计算剩余宽度平均分配
  const fixedWidth = columns
    .filter((col) => col.width)
    .reduce((sum, col) => {
      if (typeof col.width === 'number') return sum + col.width
      if (typeof col.width === 'string' && !col.width.endsWith('%')) {
        return sum + parseFloat(col.width)
      }
      return sum
    }, 0)

  const flexColumns = columns.filter((col) => !col.width)
  const remainingWidth = containerWidth - fixedWidth
  const minWidth = column.minWidth
    ? typeof column.minWidth === 'number'
      ? column.minWidth
      : parseFloat(column.minWidth)
    : 80

  return Math.max(remainingWidth / flexColumns.length, minWidth)
}

/**
 * 默认排序比较方法
 */
export const defaultSortMethod = <T>(a: T, b: T, prop: string, order: SortOrder): number => {
  if (!order) return 0

  const aVal = (a as Record<string, unknown>)[prop]
  const bVal = (b as Record<string, unknown>)[prop]

  // 处理 null/undefined
  if (aVal == null && bVal == null) return 0
  if (aVal == null) return order === 'asc' ? 1 : -1
  if (bVal == null) return order === 'asc' ? -1 : 1

  // 数字比较
  if (typeof aVal === 'number' && typeof bVal === 'number') {
    return order === 'asc' ? aVal - bVal : bVal - aVal
  }

  // 字符串比较
  const aStr = String(aVal)
  const bStr = String(bVal)
  const result = aStr.localeCompare(bStr, 'zh-CN')
  return order === 'asc' ? result : -result
}

/**
 * 多列排序
 */
export const multiColumnSort = <T extends Record<string, unknown>>(
  data: T[],
  sortStates: Array<{
    prop: string
    order: SortOrder
    sortMethod?: (a: T, b: T, order: SortOrder) => number
  }>
): T[] => {
  if (!sortStates.length) return data

  return [...data].sort((a, b) => {
    for (const state of sortStates) {
      if (!state.order) continue

      let result: number
      if (state.sortMethod) {
        result = state.sortMethod(a, b, state.order)
      } else {
        result = defaultSortMethod(a, b, state.prop, state.order)
      }

      if (result !== 0) return result
    }
    return 0
  })
}

/**
 * 默认筛选方法
 */
export const defaultFilterMethod = <T>(value: unknown, row: T, column: TableColumn<T>): boolean => {
  const prop = column.prop
  if (!prop) return true

  const cellValue = (row as Record<string, unknown>)[prop]
  return cellValue === value
}

/**
 * 多值筛选
 */
export const multiValueFilter = <T extends Record<string, unknown>>(
  data: T[],
  filters: Record<string, unknown[]>,
  columns: TableColumn<T>[],
  filterMultiple = true
): T[] => {
  const activeFilters = Object.entries(filters).filter(([, values]) => values.length > 0)

  if (!activeFilters.length) return data

  return data.filter((row) => {
    return activeFilters.every(([prop, values]) => {
      const column = columns.find((col) => col.prop === prop)
      if (!column) return true

      const filterMethod = column.filterMethod || defaultFilterMethod

      if (filterMultiple || column.filterMultiple !== false) {
        return values.some((value) => filterMethod(value, row, column))
      }
      return filterMethod(values[0], row, column)
    })
  })
}

/**
 * 树形数据展平
 */
export const flattenTreeData = <T extends Record<string, unknown>>(
  data: T[],
  childrenKey = 'children',
  expandedKeys: Set<string | number>,
  rowKey: RowKey,
  level = 0
): Array<T & { _level: number; _isExpanded: boolean; _hasChildren: boolean; _isLeaf: boolean }> => {
  const result: Array<
    T & { _level: number; _isExpanded: boolean; _hasChildren: boolean; _isLeaf: boolean }
  > = []

  data.forEach((item) => {
    const key = getRowKey(item, rowKey)
    const children = item[childrenKey] as T[] | undefined
    const hasChildren = Array.isArray(children) && children.length > 0
    const isExpanded = expandedKeys.has(key)

    result.push({
      ...item,
      _level: level,
      _isExpanded: isExpanded,
      _hasChildren: hasChildren,
      _isLeaf: !hasChildren
    })

    if (hasChildren && isExpanded) {
      result.push(...flattenTreeData(children, childrenKey, expandedKeys, rowKey, level + 1))
    }
  })

  return result
}

/**
 * 获取所有树节点 key
 */
export const getAllTreeKeys = <T extends Record<string, unknown>>(
  data: T[],
  childrenKey = 'children',
  rowKey: RowKey
): Array<string | number> => {
  const result: Array<string | number> = []

  const traverse = (items: T[]) => {
    items.forEach((item) => {
      result.push(getRowKey(item, rowKey))
      const children = item[childrenKey] as T[] | undefined
      if (Array.isArray(children)) {
        traverse(children)
      }
    })
  }

  traverse(data)
  return result
}

/**
 * 格式化尺寸值
 */
export const formatSize = (value: string | number | undefined): string => {
  if (value === undefined) return ''
  if (typeof value === 'number') return `${value}px`
  // 纯数字字符串自动添加 px 单位（如 "300" → "300px"）
  if (/^\d+(\.\d+)?$/.test(value)) return `${value}px`
  return value
}

/**
 * 合并单元格计算
 */
export const calculateSpan = (
  row: Record<string, unknown>,
  column: TableColumn,
  rowIndex: number,
  columnIndex: number,
  spanMethod?: (params: {
    row: Record<string, unknown>
    column: TableColumn
    rowIndex: number
    columnIndex: number
  }) => { rowspan: number; colspan: number } | [number, number] | void
): { rowspan: number; colspan: number } => {
  if (!spanMethod) {
    return { rowspan: 1, colspan: column.colSpan || 1 }
  }

  const result = spanMethod({ row, column, rowIndex, columnIndex })

  if (Array.isArray(result)) {
    return { rowspan: result[0], colspan: result[1] }
  }

  if (result && typeof result === 'object') {
    return result
  }

  return { rowspan: 1, colspan: column.colSpan || 1 }
}

/**
 * 节流函数
 */
export const throttle = <T extends (...args: Parameters<T>) => void>(
  fn: T,
  delay: number
): ((...args: Parameters<T>) => void) => {
  let lastTime = 0
  let timer: ReturnType<typeof setTimeout> | null = null

  return (...args: Parameters<T>) => {
    const now = Date.now()
    const remaining = delay - (now - lastTime)

    if (remaining <= 0) {
      if (timer) {
        clearTimeout(timer)
        timer = null
      }
      lastTime = now
      fn(...args)
    } else if (!timer) {
      timer = setTimeout(() => {
        lastTime = Date.now()
        timer = null
        fn(...args)
      }, remaining)
    }
  }
}

/**
 * 防抖函数
 */
export const debounce = <T extends (...args: Parameters<T>) => void>(
  fn: T,
  delay: number
): ((...args: Parameters<T>) => void) => {
  let timer: ReturnType<typeof setTimeout> | null = null

  return (...args: Parameters<T>) => {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      fn(...args)
      timer = null
    }, delay)
  }
}

/**
 * 深拷贝
 */
export const deepClone = <T>(obj: T): T => {
  if (obj === null || typeof obj !== 'object') {
    return obj
  }

  if (Array.isArray(obj)) {
    return obj.map((item) => deepClone(item)) as unknown as T
  }

  const cloned = {} as T
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      cloned[key] = deepClone(obj[key])
    }
  }
  return cloned
}

/**
 * 检查是否为空值
 */
export const isEmpty = (value: unknown): boolean => {
  if (value === null || value === undefined) return true
  if (typeof value === 'string') return value.trim() === ''
  if (Array.isArray(value)) return value.length === 0
  if (typeof value === 'object') return Object.keys(value).length === 0
  return false
}

/**
 * 生成唯一 ID
 */
export const generateId = (): string => {
  return `yh-table-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`
}

/**
 * 格式化单元格内容
 */
export const formatCellValue = <T extends Record<string, unknown>>(
  row: T,
  column: TableColumn<T>,
  rowIndex: number
): string => {
  const prop = column.prop
  if (!prop) return ''

  const cellValue = row[prop]

  if (column.formatter) {
    return column.formatter(row, column, cellValue, rowIndex)
  }

  if (cellValue === null || cellValue === undefined) {
    return ''
  }

  return String(cellValue)
}

/**
 * 计算固定列样式
 */
export const getFixedStyle = (
  column: TableColumn,
  columns: TableColumn[],
  direction: 'left' | 'right'
): { left?: string; right?: string } => {
  const flatColumns = flattenColumns(columns)
  const index = flatColumns.findIndex((col) => getColumnKey(col) === getColumnKey(column))

  if (index === -1) return {}

  if (direction === 'left') {
    let leftOffset = 0
    for (let i = 0; i < index; i++) {
      const col = flatColumns[i]
      if (col.fixed === 'left' || col.fixed === true) {
        const width =
          typeof col.width === 'number' ? col.width : parseInt(String(col.width) || '80', 10)
        leftOffset += width
      }
    }
    return { left: `${leftOffset}px` }
  }

  if (direction === 'right') {
    let rightOffset = 0
    for (let i = flatColumns.length - 1; i > index; i--) {
      const col = flatColumns[i]
      if (col.fixed === 'right') {
        const width =
          typeof col.width === 'number' ? col.width : parseInt(String(col.width) || '80', 10)
        rightOffset += width
      }
    }
    return { right: `${rightOffset}px` }
  }

  return {}
}

/**
 * 导出为 CSV
 */
export const exportToCSV = (
  data: Record<string, unknown>[],
  columns: TableColumn[],
  filename = 'export'
): void => {
  const visibleColumns = columns.filter((col) => col.visible !== false && col.prop)

  // 表头
  const headers = visibleColumns.map((col) => col.label || col.prop || '').join(',')

  // 数据行
  const rows = data.map((row) => {
    return visibleColumns
      .map((col) => {
        const value = col.prop ? row[col.prop] : ''
        // 处理包含逗号或换行的内容
        const strValue = String(value ?? '')
        if (strValue.includes(',') || strValue.includes('\n') || strValue.includes('"')) {
          return `"${strValue.replace(/"/g, '""')}"`
        }
        return strValue
      })
      .join(',')
  })

  const csvContent = [headers, ...rows].join('\n')
  const BOM = '\uFEFF'
  const blob = new Blob([BOM + csvContent], { type: 'text/csv;charset=utf-8;' })

  const link = document.createElement('a')
  link.href = URL.createObjectURL(blob)
  link.download = `${filename}.csv`
  link.click()
  URL.revokeObjectURL(link.href)
}
