<script setup lang="ts">
/**
 * YhTable - 高性能表格组件
 * 融合 vxe-table、Element Plus、Naive UI、Ant Design 各家之长
 * 支持虚拟滚动、树形数据、拖拽、固定列/行、汇总行等高级功能
 */
import {
  computed,
  ref,
  provide,
  watch,
  onMounted,
  onUnmounted,
  nextTick,
  useSlots,
  type CSSProperties,
  type Ref
} from 'vue'
import { useNamespace } from '../../hooks/use-config'
import {
  tableProps,
  tableEmits,
  tableContextKey,
  type TableColumn,
  type SortOrder,
  type TableExpose
} from './table'
import {
  getRowKey,
  flattenColumns,
  getColumnDepth,
  buildHeaderRows,
  formatSize,
  defaultSortMethod,
  multiValueFilter,
  flattenTreeData,
  calculateSpan,
  throttle,
  exportToCSV
} from './utils'
import { useVirtualScroll } from './use-virtual-scroll'
import { useTableSelection } from './use-table-selection'
import { useRowDrag } from './use-row-drag'
import { useColumnResize } from './use-column-resize'
import { useColumnDrag } from './use-column-drag'
import { useTableExport } from './use-table-export'
import { useTableImport } from './use-table-import'
import { useTablePrint } from './use-table-print'
import { YhTooltip } from '../../tooltip'
import { YhPagination } from '../../pagination'


defineOptions({
  name: 'YhTable'
})

const props = defineProps(tableProps)
const emit = defineEmits(tableEmits)
const slots = useSlots()
const ns = useNamespace('table')

// ==================== Refs ====================
const tableRef = ref<HTMLDivElement | null>(null)
const headerRef = ref<HTMLDivElement | null>(null)
const bodyRef = ref<HTMLDivElement | null>(null)
const footerRef = ref<HTMLDivElement | null>(null)

// ==================== 状态 ====================
const currentRowKey = ref<string | number | undefined>(props.currentRowKey)
const sortStates = ref<Array<{ prop: string; order: SortOrder }>>([])
const filterStates = ref<Record<string, unknown[]>>({})
const expandedRowKeys = ref<Set<string | number>>(new Set())
const treeExpandedKeys = ref<Set<string | number>>(new Set())
const isFullscreen = ref(false)
const resizingColumn = ref<TableColumn | null>(null)
const scrollState = ref<'left' | 'middle' | 'right' | 'none'>('left')
const collectedColumns = ref<TableColumn[]>([])

// ==================== 计算属性 ====================

// 获取行 key 的方法
const getRowKeyFn = (row: Record<string, unknown>) => {
  if (!row) return Math.random().toString(36).slice(2)
  return getRowKey(row, props.rowKey)
}

// 获取所有列（合并 props.columns 和收集到的列）
const allColumns = computed(() => {
  if (props.columns && props.columns.length > 0) {
    return props.columns
  }
  return collectedColumns.value
})

// 展平后的列
const flatColumns = computed(() => flattenColumns(allColumns.value))

// 多级表头行 (仅嵌套列时有值)
const headerRows = computed(() => buildHeaderRows(allColumns.value))
const columnDepth = computed(() => getColumnDepth(allColumns.value))

// 可见列
const visibleColumns = computed(() => {
  return flatColumns.value.filter((col) => col.visible !== false)
})

// 固定左侧列
const fixedLeftColumns = computed(() => {
  return visibleColumns.value.filter((col) => col.fixed === 'left' || col.fixed === true)
})

// 固定右侧列
const fixedRightColumns = computed(() => {
  return visibleColumns.value.filter((col) => col.fixed === 'right')
})

// 中间滚动列
const scrollColumns = computed(() => {
  return visibleColumns.value.filter((col) => !col.fixed)
})

// 处理树形数据
const treeProcessedData = computed(() => {
  if (!props.treeConfig) return props.data

  const childrenKey = props.treeConfig.childrenKey || 'children'

  // 初始化展开的 keys
  if (treeExpandedKeys.value.size === 0 && props.treeConfig.expandAll) {
    const allKeys = new Set<string | number>()
    const collectKeys = (items: Record<string, unknown>[]) => {
      items.forEach((item) => {
        const children = item[childrenKey] as Record<string, unknown>[] | undefined
        if (children?.length) {
          allKeys.add(getRowKeyFn(item))
          collectKeys(children)
        }
      })
    }
    collectKeys(props.data)
    treeExpandedKeys.value = allKeys
  }

  return flattenTreeData(
    props.data,
    childrenKey,
    treeExpandedKeys.value,
    props.rowKey
  )
})

// 排序后的数据
const sortedData = computed(() => {
  const data = treeProcessedData.value
  if (!sortStates.value.length) return data

  const activeSortStates = sortStates.value.filter((s) => s.order)
  if (!activeSortStates.length) return data

  return [...data].sort((a, b) => {
    for (const state of activeSortStates) {
      const column = flatColumns.value.find((col) => col.prop === state.prop)
      let result: number

      if (column?.sortMethod) {
        result = column.sortMethod(a, b, state.order)
      } else {
        result = defaultSortMethod(a, b, state.prop, state.order)
      }

      if (result !== 0) return result
    }
    return 0
  })
})

// 筛选后的数据
const filteredData = computed(() => {
  return multiValueFilter(sortedData.value, filterStates.value, flatColumns.value)
})

// 特殊列宽度计算
const selectionWidth = computed(() => props.selectionConfig ? parseInt(String(props.selectionConfig.columnWidth || 50)) : 0)
const expandWidth = computed(() => props.expandConfig ? parseInt(String(props.expandConfig.columnWidth || 50)) : 0)
const indexWidth = computed(() => props.showIndex ? parseInt(String(props.indexConfig?.width || 50)) : 0)

// 检查是否需要固定特殊列 (如果有任何普通列固定在左侧，特殊列也应固定)
const isAnyColumnFixedLeft = computed(() => visibleColumns.value.some(col => col.fixed === 'left' || col.fixed === true))

// 最终表格数据
const tableData = computed(() => {
  const data = filteredData.value
  if (!props.pagination || (typeof props.pagination === 'object' && props.pagination.remote)) {
    return data
  }

  const currentPage = typeof props.pagination === 'object' ? (props.pagination.currentPage || 1) : 1
  const pageSize = typeof props.pagination === 'object' ? (props.pagination.pageSize || 10) : 10
  const start = (currentPage - 1) * pageSize
  const end = start + pageSize
  return data.slice(start, end)
})

// ==================== 虚拟滚动 ====================
const virtualConfig = computed(() => props.virtualConfig)

const {
  visibleData,
  offsetTop,
  totalHeight,
  handleScroll: handleVirtualScroll,
  scrollToIndex,
  scrollToRow,
  refresh: refreshVirtual,
  isVirtual
} = useVirtualScroll({
  data: tableData,
  containerRef: bodyRef,
  config: virtualConfig,
  rowKey: getRowKeyFn
})

// 实际渲染的数据
const renderData = computed(() => {
  return isVirtual.value ? visibleData.value : tableData.value
})

// ==================== 选择功能 ====================
const selectionConfig = computed(() => props.selectionConfig)

const {
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
  isRowSelectable
} = useTableSelection({
  data: tableData,
  rowKey: props.rowKey,
  config: selectionConfig
})

// ==================== 行拖拽 ====================
const dragConfigRef = computed(() => props.dragConfig)

const {
  isRowDragEnabled,
  isDraggingRow,
  getRowDragAttrs,
  getRowDragClass
} = useRowDrag({
  data: tableData,
  rawData: computed(() => props.data),
  dragConfig: dragConfigRef,
  treeConfig: computed(() => props.treeConfig),
  rowKey: getRowKeyFn,
  emit: emit as (event: string, ...args: unknown[]) => void
})

// ==================== 列宽调整 ====================
const resizableRef = computed(() => props.resizable)

const {
  isResizing,
  resizingColumn: activeResizingColumn,
  resizeLineLeft,
  resizeLineVisible,
  isColumnResizable,
  handleResizeStart
} = useColumnResize({
  resizable: resizableRef,
  columns: visibleColumns,
  tableRef,
  emit: emit as (event: string, ...args: unknown[]) => void
})

// ==================== 列拖拽 ====================
const {
  isColumnDragEnabled,
  isDraggingColumn,
  isColumnDraggable,
  getHeaderDragAttrs,
  getHeaderDragClass
} = useColumnDrag({
  columns: allColumns,
  dragConfig: dragConfigRef,
  flatColumns: visibleColumns,
  emit: emit as (event: string, ...args: unknown[]) => void
})

// ==================== 导入/导出/打印 ====================
const {
  exportData: doExportData,
  toCSV,
  toJSON: toJSONExport,
  toTXT,
  toXML,
  toHTML: toHTMLExport,
  getExportColumns
} = useTableExport(tableData, visibleColumns)

const {
  importFile,
  importData: doImportData,
  openImport,
  parseCSV,
  parseTXT: parseTXTImport,
  parseJSON: parseJSONImport,
  parseXML: parseXMLImport,
  parseHTML: parseHTMLImport,
  parseContent,
  applyImport
} = useTableImport(
  computed({
    get: () => props.data,
    set: (val) => emit('update:data', val)
  }) as unknown as Ref<Record<string, unknown>[]>,
  visibleColumns
)

const {
  print: doPrint,
  printMultiple,
  printTemplate,
  getPrintColumns
} = useTablePrint(tableData, visibleColumns)

// ==================== 工具栏 ====================
const toolbarSlotNames = [
  'toolbar', 'toolbar-left', 'toolbar-left-prefix', 'toolbar-left-suffix',
  'toolbar-right', 'toolbar-right-prefix', 'toolbar-right-suffix'
]
const showToolbar = computed(() => {
  if (props.toolbarConfig?.visible) return true
  return toolbarSlotNames.some(name => !!slots[name])
})


// ==================== 样式计算 ====================
const tableClasses = computed(() => [
  ns.b(),
  ns.m(props.size),
  ns.is('border', !!props.border),
  ns.is('stripe', props.stripe),
  ns.is('highlight-current-row', props.highlightCurrentRow),
  ns.is('fullscreen', isFullscreen.value),
  ns.is('fixed-header', !!(props.height || props.maxHeight)),
  ns.is('fixed-column', fixedLeftColumns.value.length > 0 || fixedRightColumns.value.length > 0),
  ns.is(`scrolling-${scrollState.value}`, true)
])

const innerWrapperClasses = computed(() => [
  ns.e('inner-wrapper'),
  ns.is('border', !!props.border)
])

const tableStyle = computed<CSSProperties>(() => {
  const style: CSSProperties = {}
  if (props.width) {
    style.width = formatSize(props.width)
  }
  if (props.height) {
    style.height = formatSize(props.height)
  }
  if (props.maxHeight) {
    style.maxHeight = formatSize(props.maxHeight)
  }
  return style
})

const bodyStyle = computed<CSSProperties>(() => {
  const style: CSSProperties = {}
  if (props.height || props.maxHeight) {
    style.overflow = 'auto'
    style.flex = '1'
    style.minHeight = '0'
  }
  return style
})

// ==================== 汇总行计算 ====================
const summaryValues = computed<Array<string | number>>(() => {
  if (!props.summaryConfig?.method) return []
  return props.summaryConfig.method({
    columns: visibleColumns.value,
    data: tableData.value
  }) as Array<string | number>
})

// ==================== 合并单元格辅助 ====================
const isSpanVisible = (
  row: Record<string, unknown>,
  column: TableColumn,
  rowIndex: number,
  columnIndex: number
): boolean => {
  if (!props.spanMethod) return true
  const result = calculateSpan(row, column, rowIndex, columnIndex, props.spanMethod)
  return result.rowspan !== 0 && result.colspan !== 0
}

// ==================== 事件处理 ====================

// 滚动同步
const handleScroll = throttle((event: Event) => {
  const target = event.target as HTMLElement
  const { scrollLeft, scrollWidth, clientWidth } = target

  // 更新滚动状态，用于阴影显示
  if (scrollWidth <= clientWidth) {
    scrollState.value = 'none'
  } else if (scrollLeft <= 0) {
    scrollState.value = 'left'
  } else if (scrollLeft + clientWidth >= scrollWidth - 1) {
    scrollState.value = 'right'
  } else {
    scrollState.value = 'middle'
  }

  // 同步表头和表尾滚动
  if (headerRef.value && props.syncScroll) {
    headerRef.value.scrollLeft = scrollLeft
  }
  if (footerRef.value && props.syncScroll) {
    footerRef.value.scrollLeft = scrollLeft
  }

  // 虚拟滚动处理
  if (isVirtual.value) {
    handleVirtualScroll(event)
  }

  // 触发滚动事件
  emit('scroll', {
    scrollTop: target.scrollTop,
    scrollLeft,
    isEnd: target.scrollHeight - target.scrollTop <= target.clientHeight + 1
  })
}, 10)

// 行点击
const handleRowClick = (row: Record<string, unknown>, column: TableColumn, event: MouseEvent) => {
  emit('row-click', row, column, event)

  if (props.highlightCurrentRow) {
    const key = getRowKeyFn(row)
    currentRowKey.value = key
    emit('current-change', row, null)
    emit('update:currentRowKey', key)
  }
}

// 行双击
const handleRowDblclick = (row: Record<string, unknown>, column: TableColumn, event: MouseEvent) => {
  emit('row-dblclick', row, column, event)
}

// 单元格点击
const handleCellClick = (
  row: Record<string, unknown>,
  column: TableColumn,
  cell: HTMLElement,
  event: MouseEvent
) => {
  emit('cell-click', row, column, cell, event)
}

// 单元格双击
const handleCellDblclick = (
  row: Record<string, unknown>,
  column: TableColumn,
  cell: HTMLElement,
  event: MouseEvent
) => {
  emit('cell-dblclick', row, column, cell, event)
}



// 表头点击
const handleHeaderClick = (column: TableColumn, event: MouseEvent) => {
  emit('header-click', column, event)

  // 排序处理
  if (column.sortable) {
    handleSort(column)
  }
}

// 排序处理
const handleSort = (column: TableColumn) => {
  const prop = column.prop
  if (!prop) return

  const currentSort = sortStates.value.find((s) => s.prop === prop)
  let newOrder: SortOrder = 'asc'

  if (currentSort) {
    if (currentSort.order === 'asc') {
      newOrder = 'desc'
    } else if (currentSort.order === 'desc') {
      newOrder = null
    }
  }

  if (props.sortConfig?.multiple) {
    // 多列排序
    const index = sortStates.value.findIndex((s) => s.prop === prop)
    if (index > -1) {
      if (newOrder) {
        sortStates.value[index].order = newOrder
      } else {
        sortStates.value.splice(index, 1)
      }
    } else if (newOrder) {
      sortStates.value.push({ prop, order: newOrder })
    }
  } else {
    // 单列排序
    if (newOrder) {
      sortStates.value = [{ prop, order: newOrder }]
    } else {
      sortStates.value = []
    }
  }

  emit('sort-change', { column, prop, order: newOrder })
}

// 展开行切换
const handleToggleExpand = (row: Record<string, unknown>) => {
  const key = getRowKeyFn(row)

  if (expandedRowKeys.value.has(key)) {
    expandedRowKeys.value.delete(key)
  } else {
    if (props.expandConfig?.accordion) {
      expandedRowKeys.value.clear()
    }
    expandedRowKeys.value.add(key)
  }

  emit('expand-change', row, Array.from(expandedRowKeys.value).map((k) => {
    return tableData.value.find((r) => getRowKeyFn(r) === k)
  }).filter(Boolean) as Record<string, unknown>[])
}

// 树形展开切换
const handleToggleTreeExpand = (row: Record<string, unknown>) => {
  const key = getRowKeyFn(row)

  if (treeExpandedKeys.value.has(key)) {
    treeExpandedKeys.value.delete(key)
  } else {
    if (props.treeConfig?.accordion) {
      treeExpandedKeys.value.clear()
    }
    treeExpandedKeys.value.add(key)
  }
}

// ==================== 获取样式方法 ====================

const getRowClass = (row: Record<string, unknown>, rowIndex: number): string => {
  const classes: string[] = [ns.e('row')]

  // 当前行高亮
  if (props.highlightCurrentRow && currentRowKey.value === getRowKeyFn(row)) {
    classes.push('is-current')
  }

  // 选中行
  if (isRowSelected(row)) {
    classes.push('is-selected')
  }

  // 斑马纹
  if (props.stripe && rowIndex % 2 === 1) {
    classes.push('is-striped')
  }

  // 行拖拽样式
  if (isRowDragEnabled.value) {
    classes.push('is-row-draggable')
    const dragClass = getRowDragClass(rowIndex)
    if (dragClass) classes.push(dragClass)
  }

  // 自定义类名
  if (props.rowClassName) {
    if (typeof props.rowClassName === 'function') {
      classes.push(props.rowClassName({ row, rowIndex }))
    } else {
      classes.push(props.rowClassName)
    }
  }

  return classes.join(' ')
}

const getRowStyle = (row: Record<string, unknown>, rowIndex: number): CSSProperties => {
  if (!props.rowStyle) return {}

  if (typeof props.rowStyle === 'function') {
    return props.rowStyle({ row, rowIndex })
  }

  return props.rowStyle
}

const getCellClass = (
  row: Record<string, unknown>,
  column: TableColumn,
  rowIndex: number,
  columnIndex: number
): string => {
  const classes: string[] = [ns.e('cell')]

  if (column.className) {
    classes.push(column.className)
  }

  if (column.align) {
    classes.push(`is-${column.align}`)
  }

  // 固定列类名
  if (column.fixed) {
    const fixedPosition = column.fixed === true ? 'left' : column.fixed
    classes.push(`is-fixed-${fixedPosition}`)

    // 识别左侧固定的最后一列
    if (fixedPosition === 'left') {
      const fixedLeftIndices = visibleColumns.value
        .map((col, idx) => (col.fixed === 'left' || col.fixed === true ? idx : -1))
        .filter((idx) => idx !== -1)
      if (columnIndex === Math.max(...fixedLeftIndices)) {
        classes.push('is-last-fixed-left')
      }
    }

    // 识别右侧固定的第一列
    if (fixedPosition === 'right') {
      const fixedRightIndices = visibleColumns.value
        .map((col, idx) => (col.fixed === 'right' ? idx : -1))
        .filter((idx) => idx !== -1)
      if (columnIndex === Math.min(...fixedRightIndices)) {
        classes.push('is-first-fixed-right')
      }
    }

    // 增加固定状态标识，用于处理 z-index
    classes.push('is-fixed')
  }

  if (props.cellClassName) {
    if (typeof props.cellClassName === 'function') {
      classes.push(props.cellClassName({ row, column, rowIndex, columnIndex }))
    } else {
      classes.push(props.cellClassName)
    }
  }


  return classes.join(' ')
}

const getFixedStyle = (column: TableColumn, columnIndex: number): CSSProperties => {
  if (!column.fixed) return {}

  const style: CSSProperties = {}
  let offset = 0

  if (column.fixed === 'left' || column.fixed === true) {
    offset = selectionWidth.value + expandWidth.value + indexWidth.value
    const prevColumns = visibleColumns.value.slice(0, columnIndex)
    offset += prevColumns.reduce((acc, col) => acc + (parseInt(String(col.width)) || 0), 0)
    style.left = `${offset}px`
  } else if (column.fixed === 'right') {
    const nextColumns = visibleColumns.value.slice(columnIndex + 1)
    offset = nextColumns.reduce((acc, col) => acc + (parseInt(String(col.width)) || 0), 0)
    style.right = `${offset}px`
  }

  return style
}

const getSpecialFixedStyle = (type: 'selection' | 'expand' | 'index'): CSSProperties => {
  if (!isAnyColumnFixedLeft.value) return {}

  const style: CSSProperties = { position: 'sticky' }
  if (type === 'selection') style.left = '0px'
  if (type === 'expand') style.left = `${selectionWidth.value}px`
  if (type === 'index') style.left = `${selectionWidth.value + expandWidth.value}px`

  return style
}

const getCellStyle = (
  row: Record<string, unknown>,
  column: TableColumn,
  rowIndex: number,
  columnIndex: number
): CSSProperties => {
  const style: CSSProperties = {
    ...column.style,
    ...getFixedStyle(column, columnIndex),
    textAlign: column.align || 'left'
  }

  if (column.width) {
    style.width = formatSize(column.width)
  }

  if (column.minWidth) {
    style.minWidth = formatSize(column.minWidth)
  }

  if (props.cellStyle) {
    if (typeof props.cellStyle === 'function') {
      Object.assign(style, props.cellStyle({ row, column, rowIndex, columnIndex }))
    } else {
      Object.assign(style, props.cellStyle)
    }
  }

  return style
}

// 获取单元格内容
const getCellContent = (row: Record<string, unknown>, column: TableColumn, rowIndex: number) => {
  if (!row) return ''
  const prop = column.prop
  if (!prop) return ''

  const cellValue = row[prop]

  // 1. 如果有自定义格式化函数，优先级最高
  if (column.formatter) {
    return column.formatter(row, column, cellValue, rowIndex)
  }

  // 2. 如果配置了 displayMap (文案映射)，优先级第二
  if (column.displayMap && cellValue !== undefined && cellValue !== null) {
    const mappedValue = column.displayMap[String(cellValue)]
    if (mappedValue !== undefined) return mappedValue
  }



  // 兜底布尔值处理
  if (typeof cellValue === 'boolean') {
    return cellValue ? '是' : '否'
  }

  return cellValue !== undefined && cellValue !== null ? String(cellValue) : ''
}

// 获取排序状态
const getSortOrder = (column: TableColumn): SortOrder => {
  const prop = column.prop
  if (!prop) return null

  const sort = sortStates.value.find((s) => s.prop === prop)
  return sort?.order || null
}

// ==================== Expose Methods ====================

const doLayout = () => {
  nextTick(() => {
    // 重新计算布局
    refreshVirtual()
  })
}

const refresh = () => {
  refreshVirtual()
}

const scrollTo = (options: {
  left?: number
  top?: number
  row?: Record<string, unknown>
  rowIndex?: number
  column?: TableColumn
  columnIndex?: number
}) => {
  const container = bodyRef.value
  if (!container) return

  if (options.row) {
    scrollToRow(options.row)
    return
  }

  if (options.rowIndex !== undefined) {
    scrollToIndex(options.rowIndex)
    return
  }

  container.scrollTo({
    left: options.left,
    top: options.top
  })
}

const sort = (prop: string, order: SortOrder) => {
  sortStates.value = order ? [{ prop, order }] : []
}

const clearSort = () => {
  sortStates.value = []
}

const filter = (prop: string, values: unknown[]) => {
  filterStates.value[prop] = values
  emit('filter-change', filterStates.value)
}

const clearFilter = (propOrProps?: string | string[]) => {
  if (!propOrProps) {
    filterStates.value = {}
  } else if (typeof propOrProps === 'string') {
    delete filterStates.value[propOrProps]
  } else {
    propOrProps.forEach((p) => delete filterStates.value[p])
  }
  emit('filter-change', filterStates.value)
}

const setCurrentRow = (row: Record<string, unknown> | null) => {
  const oldKey = currentRowKey.value
  const oldRow = oldKey ? tableData.value.find((r) => getRowKeyFn(r) === oldKey) : null

  currentRowKey.value = row ? getRowKeyFn(row) : undefined
  emit('current-change', row, oldRow || null)
  emit('update:currentRowKey', currentRowKey.value)
}

const toggleRowExpansion = (row: Record<string, unknown>, expanded?: boolean) => {
  const key = getRowKeyFn(row)
  const isExpanded = expandedRowKeys.value.has(key)
  const shouldExpand = expanded ?? !isExpanded

  if (shouldExpand && !isExpanded) {
    expandedRowKeys.value.add(key)
  } else if (!shouldExpand && isExpanded) {
    expandedRowKeys.value.delete(key)
  }
}

const setExpandedRowKeys = (keys: Array<string | number>) => {
  expandedRowKeys.value = new Set(keys)
}

const getExpandedRowKeys = () => {
  return Array.from(expandedRowKeys.value)
}

const getTableData = () => ({
  fullData: props.data,
  tableData: tableData.value
})

// ==================== 导出/打印包装 ====================

const exportData = async (config?: Record<string, unknown>) => {
  return doExportData(config as never)
}

const print = (config?: Record<string, unknown>) => {
  return doPrint(config as never)
}

const toggleFullscreen = () => {
  isFullscreen.value = !isFullscreen.value
}

const getColumns = () => visibleColumns.value

const setColumnVisible = (prop: string, visible: boolean) => {
  const column = flatColumns.value.find((col) => col.prop === prop)
  if (column) {
    column.visible = visible
    emit('column-visible-change', visibleColumns.value)
  }
}

const resetColumns = () => {
  flatColumns.value.forEach((col) => {
    col.visible = true
  })
  emit('column-visible-change', visibleColumns.value)
}

const insertRow = (row: Record<string, unknown>, index?: number) => {
  const newData = [...props.data]
  if (index !== undefined) {
    newData.splice(index, 0, row)
  } else {
    newData.push(row)
  }
  emit('update:data', newData)
}

const removeRow = (row: Record<string, unknown> | Record<string, unknown>[]) => {
  const rows = Array.isArray(row) ? row : [row]
  const keysToRemove = new Set(rows.map((r) => getRowKeyFn(r)))
  const newData = props.data.filter((r) => !keysToRemove.has(getRowKeyFn(r)))
  emit('update:data', newData)
}

const updateRow = (row: Record<string, unknown>, newRow: Record<string, unknown>) => {
  const key = getRowKeyFn(row)
  const newData = props.data.map((r) => {
    if (getRowKeyFn(r) === key) {
      return { ...r, ...newRow }
    }
    return r
  })
  emit('update:data', newData)
}

// Expose
const expose: TableExpose = {
  getSelectionRows: () => selectedRows.value,
  getSelectionRowKeys: () => selectedRowKeys.value,
  toggleRowSelection,
  toggleAllSelection,
  clearSelection,
  setCurrentRow,
  toggleRowExpansion,
  setExpandedRowKeys,
  getExpandedRowKeys,
  sort,
  clearSort,
  filter,
  clearFilter,
  doLayout,
  refresh,
  scrollTo,
  getTableData,

  exportData,
  print,
  openImport,
  importFile,
  importData: doImportData,
  printMultiple,
  printTemplate,
  toggleFullscreen,
  getColumns,
  setColumnVisible,
  resetColumns,
  insertRow,
  removeRow,
  updateRow
}


defineExpose(expose)

// ==================== Provide Context ====================
provide(tableContextKey, {
  props,
  slots,
  registerColumn: (column: TableColumn) => {
    if (!collectedColumns.value.includes(column)) {
      collectedColumns.value.push(column)
    }
  },
  unregisterColumn: (column: TableColumn) => {
    const index = collectedColumns.value.indexOf(column)
    if (index > -1) {
      collectedColumns.value.splice(index, 1)
    }
  }
})

// ==================== 生命周期 ====================
onMounted(() => {
  doLayout()
})

watch(
  () => props.data,
  () => {
    nextTick(() => {
      doLayout()
    })
  }
)

watch(
  () => props.currentRowKey,
  (val) => {
    currentRowKey.value = val
  }
)

// ==================== 选择事件桥接 ====================
// useTableSelection 通过 config.onChange 触发回调，但组件需要 emit Vue 事件
watch(selectedRowKeys, () => {
  emit('selection-change', selectedRows.value, selectedRowKeys.value)
})
</script>

<template>
  <div ref="tableRef" :class="tableClasses" :style="tableStyle">
    <div :class="innerWrapperClasses">
      <!-- 工具栏 -->
      <div v-if="showToolbar" :class="ns.e('toolbar')">
        <slot name="toolbar">
          <div :class="ns.e('toolbar-left')">
            <slot name="toolbar-left-prefix" />
            <slot name="toolbar-left" />
            <slot name="toolbar-left-suffix" />
          </div>
          <div :class="ns.e('toolbar-right')">
            <slot name="toolbar-right-prefix" />
            <slot name="toolbar-right" />
            <slot name="toolbar-right-suffix" />
          </div>
        </slot>
      </div>

      <!-- 表头 -->
      <div v-if="showHeader" ref="headerRef" :class="ns.e('header-wrapper')">
        <table :class="ns.e('header')" :style="{ tableLayout }">
          <colgroup>
            <col v-if="selectionConfig" :style="{ width: formatSize(selectionConfig.columnWidth || 50) }" />
            <col v-if="expandConfig" :style="{ width: formatSize(expandConfig.columnWidth || 50) }" />
            <col v-if="showIndex" :style="{ width: formatSize(indexConfig?.width || 50) }" />
            <col v-for="column in visibleColumns" :key="column.prop || column.key"
              :style="{ width: formatSize(column.width) }" />
          </colgroup>
          <thead>
            <!-- 多级表头 -->
            <template v-if="headerRows.length > 0">
              <tr v-for="(hRow, rowIdx) in headerRows" :key="rowIdx" :class="ns.e('header-row')">
                <!-- 选择列（仅第一行，跨所有行） -->
                <th v-if="selectionConfig && rowIdx === 0" :rowspan="columnDepth"
                  :class="[ns.e('header-cell'), isAnyColumnFixedLeft ? 'is-fixed-left' : '']"
                  :style="{ width: formatSize(selectionConfig.columnWidth || 50), ...getSpecialFixedStyle('selection') }">
                  <div :class="ns.e('selection-cell')">
                    <template v-if="selectionType === 'checkbox' && selectionConfig.showSelectAll !== false">
                      <input type="checkbox" :checked="isAllSelected" :indeterminate="isIndeterminate"
                        @change="toggleAllSelection" />
                    </template>
                  </div>
                </th>

                <!-- 展开列（仅第一行，跨所有行） -->
                <th v-if="expandConfig && rowIdx === 0" :rowspan="columnDepth"
                  :class="[ns.e('header-cell'), isAnyColumnFixedLeft ? 'is-fixed-left' : '']"
                  :style="{ width: formatSize(expandConfig.columnWidth || 50), ...getSpecialFixedStyle('expand') }">
                  <div :class="ns.e('expand-cell')" />
                </th>

                <!-- 序号列（仅第一行，跨所有行） -->
                <th v-if="showIndex && rowIdx === 0" :rowspan="columnDepth"
                  :class="[ns.e('header-cell'), isAnyColumnFixedLeft ? 'is-fixed-left' : '']"
                  :style="{ width: formatSize(indexConfig?.width || 50), ...getSpecialFixedStyle('index') }">
                  <div :class="ns.e('index-cell')">
                    {{ indexConfig?.label || '#' }}
                  </div>
                </th>

                <!-- 数据列 -->
                <th v-for="(cell, cellIdx) in hRow" :key="cell.column.prop || cell.column.key || cellIdx"
                  :colspan="cell.colspan > 1 ? cell.colspan : undefined"
                  :rowspan="cell.rowspan > 1 ? cell.rowspan : undefined" :class="[
                    ns.e('header-cell'),
                    cell.column.headerClassName,
                    cell.column.headerAlign ? `is-${cell.column.headerAlign}` : '',
                    cell.column.sortable ? 'is-sortable' : '',
                    cell.column.fixed ? `is-fixed-${cell.column.fixed === true ? 'left' : cell.column.fixed}` : '',
                    cell.column.children?.length ? 'is-group' : '',
                    isColumnDraggable(cell.column) ? 'is-column-draggable' : ''
                  ]" :style="{
                    ...cell.column.headerStyle,
                    textAlign: cell.column.headerAlign || cell.column.align || (cell.column.children?.length ? 'center' : 'left')
                  }" @click="handleHeaderClick(cell.column, $event)">
                  <div :class="ns.e('cell-content')">
                    <!-- 表头前缀图标 -->
                    <component v-if="cell.column.headerPrefixIcon && typeof cell.column.headerPrefixIcon !== 'string'"
                      :is="cell.column.headerPrefixIcon" :class="ns.e('header-icon-prefix')" />
                    <span v-else-if="cell.column.headerPrefixIcon" :class="ns.e('header-icon-prefix')">{{
                      cell.column.headerPrefixIcon
                    }}</span>

                    <slot v-if="$slots[`header-${cell.column.prop}`]" :name="`header-${cell.column.prop}`"
                      :column="cell.column" :column-index="cellIdx" />
                    <template v-else>
                      {{ cell.column.label }}
                    </template>


                    <!-- 表头后缀图标 -->
                    <component v-if="cell.column.headerSuffixIcon && typeof cell.column.headerSuffixIcon !== 'string'"
                      :is="cell.column.headerSuffixIcon" :class="ns.e('header-icon-suffix')" />
                    <span v-else-if="cell.column.headerSuffixIcon" :class="ns.e('header-icon-suffix')">{{
                      cell.column.headerSuffixIcon
                    }}</span>

                    <span v-if="cell.column.sortable" :class="ns.e('sort-icon')">
                      <span
                        :class="['sort-caret', 'ascending', getSortOrder(cell.column) === 'asc' ? 'is-active' : '']" />
                      <span
                        :class="['sort-caret', 'descending', getSortOrder(cell.column) === 'desc' ? 'is-active' : '']" />
                    </span>
                  </div>

                  <!-- 列宽调整手柄（仅叶子列） -->
                  <span v-if="!cell.column.children?.length && isColumnResizable(cell.column)"
                    :class="ns.e('resize-handle')"
                    @pointerdown.stop="handleResizeStart($event, cell.column, ($event.currentTarget as HTMLElement).parentElement as HTMLElement)" />
                </th>
              </tr>
            </template>

            <!-- 单层表头（原有逻辑） -->
            <tr v-else :class="ns.e('header-row')">
              <!-- 选择列 -->
              <th v-if="selectionConfig" :class="[ns.e('header-cell'), isAnyColumnFixedLeft ? 'is-fixed-left' : '']"
                :style="{ width: formatSize(selectionConfig.columnWidth || 50), ...getSpecialFixedStyle('selection') }">
                <div :class="ns.e('selection-cell')">
                  <template v-if="selectionType === 'checkbox' && selectionConfig.showSelectAll !== false">
                    <input type="checkbox" :checked="isAllSelected" :indeterminate="isIndeterminate"
                      @change="toggleAllSelection" />
                  </template>
                </div>
              </th>

              <!-- 展开列 -->
              <th v-if="expandConfig" :class="[ns.e('header-cell'), isAnyColumnFixedLeft ? 'is-fixed-left' : '']"
                :style="{ width: formatSize(expandConfig.columnWidth || 50), ...getSpecialFixedStyle('expand') }">
                <div :class="ns.e('expand-cell')" />
              </th>

              <!-- 序号列 -->
              <th v-if="showIndex" :class="[ns.e('header-cell'), isAnyColumnFixedLeft ? 'is-fixed-left' : '']"
                :style="{ width: formatSize(indexConfig?.width || 50), ...getSpecialFixedStyle('index') }">
                <div :class="ns.e('index-cell')">
                  {{ indexConfig?.label || '#' }}
                </div>
              </th>

              <!-- 数据列 -->
              <th v-for="(column, columnIndex) in visibleColumns" :key="column.prop || column.key || columnIndex"
                :class="[
                  ns.e('header-cell'),
                  column.headerClassName,
                  column.headerAlign ? `is-${column.headerAlign}` : '',
                  column.sortable ? 'is-sortable' : '',
                  column.fixed ? `is-fixed-${column.fixed === true ? 'left' : column.fixed}` : '',
                  isColumnDragEnabled ? getHeaderDragClass(columnIndex) : '',
                  isColumnDraggable(column) ? 'is-column-draggable' : ''
                ]" :style="{
                  ...column.headerStyle,
                  ...getFixedStyle(column, columnIndex),
                  width: formatSize(column.width),
                  textAlign: column.headerAlign || column.align || 'left'
                }" v-bind="getHeaderDragAttrs(column, columnIndex)" @click="handleHeaderClick(column, $event)">
                <div :class="ns.e('cell-content')">
                  <!-- 表头前缀图标 -->
                  <component v-if="column.headerPrefixIcon && typeof column.headerPrefixIcon !== 'string'"
                    :is="column.headerPrefixIcon" :class="ns.e('header-icon-prefix')" />
                  <span v-else-if="column.headerPrefixIcon" :class="ns.e('header-icon-prefix')">{{
                    column.headerPrefixIcon
                  }}</span>

                  <!-- 自定义表头 -->
                  <slot v-if="$slots[`header-${column.prop}`]" :name="`header-${column.prop}`" :column="column"
                    :column-index="columnIndex" />
                  <template v-else>
                    {{ column.label }}
                  </template>


                  <!-- 表头后缀图标 -->
                  <component v-if="column.headerSuffixIcon && typeof column.headerSuffixIcon !== 'string'"
                    :is="column.headerSuffixIcon" :class="ns.e('header-icon-suffix')" />
                  <span v-else-if="column.headerSuffixIcon" :class="ns.e('header-icon-suffix')">{{
                    column.headerSuffixIcon
                  }}</span>

                  <!-- 排序图标 -->
                  <span v-if="column.sortable" :class="ns.e('sort-icon')">
                    <span :class="['sort-caret', 'ascending', getSortOrder(column) === 'asc' ? 'is-active' : '']" />
                    <span :class="['sort-caret', 'descending', getSortOrder(column) === 'desc' ? 'is-active' : '']" />
                  </span>
                </div>

                <!-- 列宽调整手柄 -->
                <span v-if="isColumnResizable(column)" :class="ns.e('resize-handle')"
                  @pointerdown.stop="handleResizeStart($event, column, ($event.currentTarget as HTMLElement).parentElement as HTMLElement)" />
              </th>
            </tr>
          </thead>
        </table>
      </div>

      <!-- 表体 -->
      <div ref="bodyRef" :class="[ns.e('body-wrapper'), isVirtual ? ns.em('body-wrapper', 'virtual') : '']"
        :style="bodyStyle" @scroll="handleScroll">
        <!-- 虚拟滚动：单一 phantom div 撑起滚动条高度 -->
        <div v-if="isVirtual" :class="ns.e('virtual-phantom')" :style="{ height: `${totalHeight}px` }" />

        <!-- 空数据 -->
        <div v-if="tableData.length === 0" :class="ns.e('empty')">
          <slot name="empty">
            <div :class="ns.e('empty-content')">
              <template v-if="emptyConfig?.render">
                <component :is="emptyConfig.render()" />
              </template>
              <template v-else>
                <div v-if="emptyConfig?.image" :class="ns.e('empty-image')">
                  <img :src="emptyConfig.image" alt="empty" />
                </div>
                <div :class="ns.e('empty-text')">
                  {{ emptyConfig?.description || emptyText }}
                </div>
              </template>
            </div>
          </slot>
        </div>

        <!-- 数据表格（虚拟模式下通过 transform 定位，GPU 加速无重排） -->
        <table v-else :class="[ns.e('body'), isVirtual ? ns.em('body', 'virtual') : '']" :style="{
          tableLayout,
          ...(isVirtual ? { transform: `translate3d(0, ${offsetTop}px, 0)` } : {})
        }">
          <colgroup>
            <col v-if="selectionConfig" :style="{ width: formatSize(selectionConfig.columnWidth || 50) }" />
            <col v-if="expandConfig" :style="{ width: formatSize(expandConfig.columnWidth || 50) }" />
            <col v-if="showIndex" :style="{ width: formatSize(indexConfig?.width || 50) }" />
            <col v-for="column in visibleColumns" :key="column.prop || column.key"
              :style="{ width: formatSize(column.width) }" />
          </colgroup>
          <tbody>
            <template v-for="(row, rowIndex) in renderData" :key="getRowKeyFn(row)">
              <tr :class="getRowClass(row, rowIndex)" :style="getRowStyle(row, rowIndex)"
                v-bind="getRowDragAttrs(rowIndex)" @click="handleRowClick(row, visibleColumns[0], $event)"
                @dblclick="handleRowDblclick(row, visibleColumns[0], $event)">
                <!-- 选择列 -->
                <td v-if="selectionConfig"
                  :class="[ns.e('cell'), ns.e('selection-cell'), isAnyColumnFixedLeft ? 'is-fixed-left' : '']"
                  :style="getSpecialFixedStyle('selection')" @click.stop>
                  <input :type="selectionType === 'radio' ? 'radio' : 'checkbox'" :checked="isRowSelected(row)"
                    :disabled="!isRowSelectable(row, rowIndex)" @change="toggleRowSelection(row)" />
                </td>

                <!-- 展开列 -->
                <td v-if="expandConfig"
                  :class="[ns.e('cell'), ns.e('expand-cell'), isAnyColumnFixedLeft ? 'is-fixed-left' : '']"
                  :style="getSpecialFixedStyle('expand')" @click.stop="handleToggleExpand(row)">
                  <span :class="[
                    ns.e('expand-icon'),
                    expandedRowKeys.has(getRowKeyFn(row)) ? 'is-expanded' : ''
                  ]">
                    <svg viewBox="0 0 24 24" width="16" height="16">
                      <path fill="currentColor" d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z" />
                    </svg>
                  </span>
                </td>

                <!-- 序号列 -->
                <td v-if="showIndex"
                  :class="[ns.e('cell'), ns.e('index-cell'), isAnyColumnFixedLeft ? 'is-fixed-left' : '']"
                  :style="getSpecialFixedStyle('index')">
                  {{ indexConfig?.method ? indexConfig.method(rowIndex) : rowIndex + 1 }}
                </td>

                <!-- 数据列 (合并单元格时跳过 span=0 的单元格) -->
                <template v-for="(column, columnIndex) in visibleColumns"
                  :key="column.prop || column.key || columnIndex">
                  <td v-if="isSpanVisible(row, column, rowIndex, columnIndex)" :class="[
                    getCellClass(row, column, rowIndex, columnIndex)
                  ]" :style="getCellStyle(row, column, rowIndex, columnIndex)"
                    :colspan="calculateSpan(row, column, rowIndex, columnIndex, spanMethod).colspan || undefined"
                    :rowspan="calculateSpan(row, column, rowIndex, columnIndex, spanMethod).rowspan || undefined"
                    :data-row-key="getRowKeyFn(row)" :data-prop="column.prop"
                    @click="handleCellClick(row, column, $event.currentTarget as HTMLElement, $event)"
                    @dblclick="handleCellDblclick(row, column, $event.currentTarget as HTMLElement, $event)">
                    <div :class="ns.e('cell-content')">
                      <!-- 树形缩进 -->
                      <span v-if="treeConfig && column.treeNode" :class="[ns.e('tree-indent')]"
                        :style="{ paddingLeft: `${((row as Record<string, unknown>)._level as number || 0) * (treeConfig.indent || 16)}px` }">
                        <span v-if="(row as Record<string, unknown>)._hasChildren" :class="[
                          ns.e('tree-icon'),
                          (row as Record<string, unknown>)._isExpanded ? 'is-expanded' : ''
                        ]" @click.stop="handleToggleTreeExpand(row)">
                          <svg viewBox="0 0 24 24" width="16" height="16">
                            <path fill="currentColor" d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z" />
                          </svg>
                        </span>
                        <span v-else :class="ns.e('tree-leaf-spacer')" />
                      </span>

                      <!-- 内容展示 -->
                      <slot v-if="row && column.prop && $slots[column.prop]" :name="column.prop" :row="row"
                        :column="column" :row-index="rowIndex"
                        :cell-value="column.prop ? row[column.prop] : undefined" />
                      <component v-else-if="row && column.render"
                        :is="column.render({ row, column, rowIndex, cellValue: column.prop ? row[column.prop] : undefined })" />
                      <template v-else>
                        <yh-tooltip v-if="column.showOverflowTooltip"
                          :content="String(getCellContent(row, column, rowIndex))"
                          :effect="typeof column.showOverflowTooltip === 'object' ? (column.showOverflowTooltip.effect || tooltipEffect) : tooltipEffect"
                          :placement="typeof column.showOverflowTooltip === 'object' ? (column.showOverflowTooltip.placement || 'top') : 'top'">
                          <div :class="[ns.e('cell-text'), ns.is('ellipsis', true)]">
                            {{ getCellContent(row, column, rowIndex) }}
                          </div>
                        </yh-tooltip>
                        <template v-else>
                          {{ getCellContent(row, column, rowIndex) }}
                        </template>
                      </template>
                    </div>
                  </td>
                </template>
              </tr>

              <!-- 展开行内容 -->
              <tr v-if="expandConfig && expandedRowKeys.has(getRowKeyFn(row))" :class="ns.e('expanded-row')">
                <td :colspan="visibleColumns.length + (selectionConfig ? 1 : 0) + (showIndex ? 1 : 0) + 1">
                  <slot name="expand" :row="row" :row-index="rowIndex">
                    <component v-if="expandConfig.render" :is="expandConfig.render({ row, rowIndex })" />
                  </slot>
                </td>
              </tr>
            </template>
          </tbody>
        </table>

      </div>

      <!-- 汇总行 -->
      <div v-if="summaryConfig" ref="footerRef" :class="ns.e('footer-wrapper')">
        <slot name="summary">
          <table :class="ns.e('footer')" :style="{ tableLayout }">
            <colgroup>
              <col v-if="selectionConfig" :style="{ width: formatSize(selectionConfig.columnWidth || 50) }" />
              <col v-if="expandConfig" :style="{ width: formatSize(expandConfig.columnWidth || 50) }" />
              <col v-if="showIndex" :style="{ width: formatSize(indexConfig?.width || 50) }" />
              <col v-for="column in visibleColumns" :key="column.prop || column.key"
                :style="{ width: formatSize(column.width) }" />
            </colgroup>
            <tbody>
              <tr :class="[ns.e('row'), ns.e('summary-row'), summaryConfig.className]">
                <!-- 选择列占位 -->
                <td v-if="selectionConfig" :class="[ns.e('cell'), ns.e('selection-cell')]"
                  :style="getSpecialFixedStyle('selection')" />
                <!-- 展开列占位 -->
                <td v-if="expandConfig" :class="[ns.e('cell'), ns.e('expand-cell')]"
                  :style="getSpecialFixedStyle('expand')" />
                <!-- 序号列占位 -->
                <td v-if="showIndex" :class="[ns.e('cell'), ns.e('index-cell')]"
                  :style="getSpecialFixedStyle('index')" />
                <!-- 数据列 -->
                <td v-for="(column, columnIndex) in visibleColumns" :key="column.prop || column.key || columnIndex"
                  :class="getCellClass({}, column, 0, columnIndex)" :style="getCellStyle({}, column, 0, columnIndex)">
                  <div :class="ns.e('cell-content')">
                    <slot :name="`summary-${column.prop}`" :column="column" :column-index="columnIndex"
                      :data="tableData">
                      {{ summaryValues.length > 0 ? summaryValues[columnIndex] : (columnIndex === 0 ?
                        (summaryConfig.text
                          ||
                          '合计') : '') }}
                    </slot>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </slot>
      </div>

      <!-- 列宽调整指示线 -->
      <div v-if="resizeLineVisible" :class="ns.e('resize-line')" :style="{ left: `${resizeLineLeft}px` }" />

      <!-- 加载状态 -->
      <div v-if="typeof loading === 'object' ? loading.visible !== false : !!loading" :class="ns.e('loading')"
        :style="typeof loading === 'object' && loading.background ? { backgroundColor: loading.background } : {}">
        <slot name="loading">
          <div :class="ns.e('loading-content')">
            <span :class="ns.e('loading-spinner')" />
            <span v-if="typeof loading === 'object' && loading.text" :class="ns.e('loading-text')">
              {{ loading.text }}
            </span>
            <span v-else-if="typeof loading === 'boolean'" :class="ns.e('loading-text')">
              加载中...
            </span>
          </div>
        </slot>
      </div>
    </div>

    <!-- 分页 -->
    <div v-if="pagination"
      :class="[ns.e('pagination-wrapper'), typeof pagination === 'object' && pagination.align ? ns.is('align-' + pagination.align) : '']">
      <YhPagination v-bind="typeof pagination === 'object' ? pagination : {}" :class="ns.e('pagination')"
        @update:current-page="(val) => emit('page-change', { currentPage: val, pageSize: (typeof pagination === 'object' ? pagination.pageSize : 10) || 10 })"
        @update:page-size="(val) => emit('page-change', { currentPage: (typeof pagination === 'object' ? pagination.currentPage : 1) || 1, pageSize: val })" />
    </div>

    <!-- 渲染隐藏的默认插槽，用于收集列配置(仅渲染 YhTableColumn 子组件) -->
    <div v-if="$slots.default && (!columns || columns.length === 0)" style="display: none" aria-hidden="true">
      <slot />
    </div>
  </div>
</template>

<style lang="scss">
@use './table.scss';
</style>
