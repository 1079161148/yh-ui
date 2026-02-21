/**
 * Table Types & Props
 * @description 高性能表格组件类型定义
 * 融合 vxe-table、Element Plus、Naive UI、Ant Design 各家之长
 */

import type { ExtractPropTypes, PropType, InjectionKey, CSSProperties, VNode, Component } from 'vue'

import type { TooltipPlacement } from '../../tooltip'

// ====================== 基础类型定义 ======================

export type TableSize = 'large' | 'default' | 'small'
export type TableAlign = 'left' | 'center' | 'right'
export type SortOrder = 'asc' | 'desc' | null
export type FixedPosition = 'left' | 'right' | true
export type RowKey = string | ((row: Record<string, unknown>) => string | number)
export type SelectionType = 'checkbox' | 'radio'
export type TreeExpandTrigger = 'cell' | 'row' | 'default'

// ====================== 列定义 ======================

export interface TableColumn<T = Record<string, unknown>> {
  /** 列唯一标识 */
  key?: string
  /** 列字段名 */
  prop?: string
  /** 列标题 */
  label?: string
  /** 列宽 */
  width?: number | string
  /** 最小列宽 */
  minWidth?: number | string
  /** 最大列宽 */
  maxWidth?: number | string
  /** 内容对齐方式 */
  align?: TableAlign
  /** 表头对齐方式 */
  headerAlign?: TableAlign
  /** 固定列 */
  fixed?: FixedPosition
  /** 是否可排序 */
  sortable?: boolean | 'custom'
  /** 默认排序 */
  defaultSort?: SortOrder
  /** 排序方法 */
  sortMethod?: (a: T, b: T, order: SortOrder) => number
  /** 是否可筛选 */
  filterable?: boolean
  /** 筛选选项 */
  filters?: Array<{ text: string; value: unknown }>
  /** 筛选方法 */
  filterMethod?: (value: unknown, row: T, column: TableColumn<T>) => boolean
  /** 是否支持多选筛选 */
  filterMultiple?: boolean
  /** 是否可调整列宽 */
  resizable?: boolean
  /** 是否可拖拽排序 */
  draggable?: boolean
  /** 是否显示溢出提示 */
  showOverflowTooltip?:
    | boolean
    | { effect?: 'dark' | 'light'; placement?: TooltipPlacement; offset?: number }
  /** 列类名 */
  className?: string
  /** 表头类名 */
  headerClassName?: string
  /** 列样式 */
  style?: CSSProperties
  /** 表头样式 */
  headerStyle?: CSSProperties
  /** 是否可见 */
  visible?: boolean
  /** 子列（分组表头） */
  children?: TableColumn<T>[]
  /** 列类型 */
  type?: 'selection' | 'index' | 'expand' | 'radio'
  /** 自定义渲染 */
  render?: (params: {
    row: T
    column: TableColumn<T>
    rowIndex: number
    cellValue: unknown
  }) => VNode | string
  /** 自定义表头渲染 */
  headerRender?: (params: { column: TableColumn<T>; columnIndex: number }) => VNode | string
  /** 表头前缀图标 */
  headerPrefixIcon?: string | Component
  /** 表头后缀图标 */
  headerSuffixIcon?: string | Component
  /** 格式化方法 */
  formatter?: (row: T, column: TableColumn<T>, cellValue: unknown, rowIndex: number) => string
  /** 合并单元格 */
  colSpan?: number
  /** 自定义排序字段 */
  sortBy?: string | ((row: T) => unknown)
  /** 是否为树形展开列 */
  treeNode?: boolean
  /** 省略号配置 */
  ellipsis?: boolean | { tooltip?: boolean; lineClamp?: number }
  /**
   * 非编辑态显示文案映射。
   * - 当列没有 formatter 时，Table 会优先使用该映射把值转换成可读文本。
   * - key 使用 String(value) 进行匹配（支持 boolean/number/string）。
   * 例：{ 'true': '是', 'false': '否' } / { '1': '男', '2': '女' }
   */
  displayMap?: Record<string, string>
}

// ====================== 排序配置 ======================

export interface TableSortConfig {
  /** 默认排序列 */
  defaultSort?: { prop: string; order: SortOrder }
  /** 多列排序 */
  multiple?: boolean
  /** 排序触发方式 */
  trigger?: 'cell' | 'header'
  /** 远程排序 */
  remote?: boolean
  /** 排序图标位置 */
  iconPosition?: 'left' | 'right'
  /** 自定义排序方法合集 */
  sortMethods?: Record<
    string,
    (a: Record<string, unknown>, b: Record<string, unknown>, order: SortOrder) => number
  >
}

// ====================== 筛选配置 ======================

export interface TableFilterConfig {
  /** 是否远程筛选 */
  remote?: boolean
  /** 筛选图标 */
  icon?: string | Component
  /** 筛选面板最大高度 */
  maxHeight?: number | string
  /** 筛选面板宽度 */
  width?: number | string
}

// ====================== 分页配置 ======================

export interface TablePaginationConfig {
  /** 当前页码 */
  currentPage?: number
  /** 每页条数 */
  pageSize?: number
  /** 总条数 */
  total?: number
  /** 每页条数选项 */
  pageSizes?: number[]
  /** 分页布局 */
  layout?: string
  /** 分页位置 */
  position?: 'top' | 'bottom' | 'both'
  /** 后台分页 */
  remote?: boolean
  /** 小型分页 */
  small?: boolean
  /** 分页背景 */
  background?: boolean
  /** 隐藏单页 */
  hideOnSinglePage?: boolean
  /** 对齐方式 */
  align?: 'left' | 'center' | 'right'
}

// ====================== 选择配置 ======================

export interface TableSelectionConfig<T = Record<string, unknown>> {
  /** 选择类型 */
  type?: SelectionType
  /** 已选中的行 */
  selectedRowKeys?: Array<string | number>
  /** 是否保留选中项 */
  reserve?: boolean
  /** 选择变化回调 */
  onChange?: (selectedRowKeys: Array<string | number>, selectedRows: T[]) => void
  /** 行是否可选 */
  checkable?: (row: T, rowIndex: number) => boolean
  /** 全选时的行为 */
  selectAllMode?: 'all' | 'currentPage'
  /** 复选框列宽 */
  columnWidth?: number | string
  /** 是否显示全选 */
  showSelectAll?: boolean
}

// ====================== 展开行配置 ======================

export interface TableExpandConfig<T = Record<string, unknown>> {
  /** 默认展开行的 key */
  defaultExpandedRowKeys?: Array<string | number>
  /** 展开所有行 */
  expandAll?: boolean
  /** 手风琴模式 */
  accordion?: boolean
  /** 展开图标位置 */
  iconPosition?: 'left' | 'right'
  /** 展开内容渲染 */
  render?: (params: { row: T; rowIndex: number }) => VNode
  /** 行是否可展开 */
  expandable?: (row: T, rowIndex: number) => boolean
  /** 展开列宽 */
  columnWidth?: number | string
  /** 展开行变化回调 */
  onChange?: (expandedRowKeys: Array<string | number>) => void
}

// ====================== 树形配置 ======================

export interface TableTreeConfig {
  /** 子节点字段名 */
  childrenKey?: string
  /** 缩进大小 */
  indent?: number
  /** 默认展开层级 */
  defaultExpandLevel?: number
  /** 默认展开所有 */
  expandAll?: boolean
  /** 展开触发区域 */
  trigger?: TreeExpandTrigger
  /** 懒加载 */
  lazy?: boolean
  /** 懒加载方法 */
  loadMethod?: (row: Record<string, unknown>) => Promise<Record<string, unknown>[]>
  /** 手风琴模式 */
  accordion?: boolean
  /** 展开图标 */
  expandIcon?: Component | string
  /** 折叠图标 */
  collapseIcon?: Component | string
  /** 叶子节点图标 */
  leafIcon?: Component | string
  /** 是否显示连接线 */
  showLine?: boolean
  /** 连接线样式 */
  lineStyle?: 'solid' | 'dashed' | 'dotted'
}

// ====================== 虚拟滚动配置 ======================

export interface TableVirtualConfig {
  /** 是否启用虚拟滚动 */
  enabled?: boolean
  /** 行高 */
  rowHeight?: number | ((row: Record<string, unknown>, rowIndex: number) => number)
  /** 缓冲区大小 */
  buffer?: number
  /** 预渲染行数 */
  overscan?: number
  /** 列虚拟化 */
  columnVirtual?: boolean
  /** 列缓冲区 */
  columnBuffer?: number
}

// ====================== 拖拽配置 ======================

export interface TableDragConfig {
  /** 是否可拖拽行 */
  row?: boolean
  /** 是否可拖拽列 */
  column?: boolean
  /** 拖拽手柄 */
  handle?: string
  /** 动画时长 */
  animation?: number
  /** 拖拽开始回调 */
  onDragStart?: (params: { type: 'row' | 'column'; data: unknown; index: number }) => void
  /** 拖拽结束回调 */
  onDragEnd?: (params: {
    type: 'row' | 'column'
    oldIndex: number
    newIndex: number
    data: unknown[]
  }) => void
  /** 是否跨表格拖拽 */
  crossTable?: boolean
  /** 拖拽时的样式类 */
  dragClass?: string
  /** 幽灵元素样式类 */
  ghostClass?: string
}

// ====================== 汇总配置 ======================

export interface TableSummaryConfig {
  /** 汇总行位置 */
  position?: 'top' | 'bottom'
  /** 汇总方法 */
  method?: (params: {
    columns: TableColumn[]
    data: Record<string, unknown>[]
  }) => Array<string | number | VNode>
  /** 固定汇总行 */
  fixed?: boolean
  /** 自定义汇总文本 */
  text?: string
  /** 汇总行类名 */
  className?: string
}

// ====================== 工具栏配置 ======================

export interface TableToolbarConfig {
  /** 是否显示 */
  visible?: boolean
  /** 刷新按钮 */
  refresh?: boolean
  /** 列设置 */
  columnSetting?: boolean
  /** 密度设置 */
  density?: boolean
  /** 全屏按钮 */
  fullscreen?: boolean
  /** 导出按钮 */
  export?: boolean | TableExportConfig
  /** 打印按钮 */
  print?: boolean
  /** 自定义按钮 */
  custom?: Array<{
    icon?: string | Component
    text?: string
    onClick?: () => void
    disabled?: boolean
  }>
  /** 搜索框 */
  search?: boolean | { placeholder?: string; width?: number | string }
}

// ====================== 导出配置 ======================

export interface TableExportConfig {
  /** 导出类型 */
  type?: 'csv' | 'xlsx' | 'pdf' | 'html'
  /** 文件名 */
  filename?: string
  /** 是否包含表头 */
  includeHeader?: boolean
  /** 是否只导出可见列 */
  visibleOnly?: boolean
  /** 自定义导出数据 */
  customData?: (data: Record<string, unknown>[]) => Record<string, unknown>[]
  /** 导出前回调 */
  beforeExport?: () => boolean | Promise<boolean>
  /** 导出后回调 */
  afterExport?: () => void
}

// ====================== 空状态配置 ======================

export interface TableEmptyConfig {
  /** 空状态图片 */
  image?: string
  /** 空状态描述 */
  description?: string
  /** 自定义渲染 */
  render?: () => VNode
}

// ====================== 加载配置 ======================

export interface TableLoadingConfig {
  /** 是否加载中 */
  visible?: boolean
  /** 加载文本 */
  text?: string
  /** 加载图标 */
  icon?: Component | string
  /** 加载背景 */
  background?: string
  /** 自定义渲染 */
  render?: () => VNode
}

// ====================== 行配置 ======================

export interface TableRowConfig<T = Record<string, unknown>> {
  /** 行高 */
  height?: number | string
  /** 行类名 */
  className?: string | ((params: { row: T; rowIndex: number }) => string)
  /** 行样式 */
  style?: CSSProperties | ((params: { row: T; rowIndex: number }) => CSSProperties)
  /** 是否高亮当前行 */
  highlightCurrent?: boolean
  /** 斑马纹 */
  stripe?: boolean
  /** 悬浮高亮 */
  hover?: boolean
}

// ====================== 表头配置 ======================

export interface TableHeaderConfig {
  /** 表头高度 */
  height?: number | string
  /** 表头类名 */
  className?: string
  /** 表头样式 */
  style?: CSSProperties
  /** 是否显示表头 */
  visible?: boolean
  /** 表头背景 */
  background?: string
}

// ====================== 右键菜单配置 ======================

export interface TableContextMenuConfig<T = Record<string, unknown>> {
  /** 是否启用 */
  enabled?: boolean
  /** 菜单项 */
  items?: Array<{
    key: string
    label: string
    icon?: string | Component
    disabled?: boolean | ((row: T, column: TableColumn<T>) => boolean)
    onClick?: (params: { row: T; column: TableColumn<T>; rowIndex: number }) => void
    divider?: boolean
    children?: TableContextMenuConfig<T>['items']
  }>
  /** 自定义渲染 */
  render?: (params: { row: T; column: TableColumn<T>; rowIndex: number }) => VNode
}

// ====================== 主 Props 定义 ======================

export const tableProps = {
  /** 数据源 */
  data: {
    type: Array as PropType<Record<string, unknown>[]>,
    default: () => []
  },
  /** 列配置 */
  columns: {
    type: Array as PropType<TableColumn[]>,
    default: () => []
  },
  /** 行唯一标识 */
  rowKey: {
    type: [String, Function] as PropType<RowKey>,
    default: 'id'
  },
  /** 表格尺寸 */
  size: {
    type: String as PropType<TableSize>,
    default: 'default'
  },
  /** 表格高度 */
  height: {
    type: [Number, String] as PropType<number | string>
  },
  /** 表格最大高度 */
  maxHeight: {
    type: [Number, String] as PropType<number | string>
  },
  /** 表格宽度 */
  width: {
    type: [Number, String] as PropType<number | string>
  },
  /** 是否显示边框 */
  border: {
    type: [Boolean, String] as PropType<boolean | 'full' | 'outer' | 'inner' | 'none'>,
    default: false
  },
  /** 是否显示斑马纹 */
  stripe: {
    type: Boolean,
    default: false
  },
  /** 是否高亮当前行 */
  highlightCurrentRow: {
    type: Boolean,
    default: false
  },
  /** 当前选中行 */
  currentRowKey: {
    type: [String, Number] as PropType<string | number>
  },
  /** 是否显示表头 */
  showHeader: {
    type: Boolean,
    default: true
  },
  /** 空数据显示文本 */
  emptyText: {
    type: String,
    default: ''
  },
  /** 是否自适应父容器 */
  fit: {
    type: Boolean,
    default: true
  },
  /** 排序配置 */
  sortConfig: {
    type: Object as PropType<TableSortConfig>
  },
  /** 筛选配置 */
  filterConfig: {
    type: Object as PropType<TableFilterConfig>
  },
  /** 分页配置 */
  pagination: {
    type: [Boolean, Object] as PropType<boolean | TablePaginationConfig>,
    default: false
  },
  /** 选择配置 */
  selectionConfig: {
    type: Object as PropType<TableSelectionConfig>
  },
  /** 展开配置 */
  expandConfig: {
    type: Object as PropType<TableExpandConfig>
  },
  /** 树形配置 */
  treeConfig: {
    type: Object as PropType<TableTreeConfig>
  },
  /** 虚拟滚动配置 */
  virtualConfig: {
    type: Object as PropType<TableVirtualConfig>
  },
  /** 拖拽配置 */
  dragConfig: {
    type: Object as PropType<TableDragConfig>
  },
  /** 汇总配置 */
  summaryConfig: {
    type: Object as PropType<TableSummaryConfig>
  },
  /** 工具栏配置 */
  toolbarConfig: {
    type: Object as PropType<TableToolbarConfig>
  },
  /** 空状态配置 */
  emptyConfig: {
    type: Object as PropType<TableEmptyConfig>
  },
  /** 加载配置 */
  loading: {
    type: [Boolean, Object] as PropType<boolean | TableLoadingConfig>,
    default: false
  },
  /** 行配置 */
  rowConfig: {
    type: Object as PropType<TableRowConfig>
  },
  /** 表头配置 */
  headerConfig: {
    type: Object as PropType<TableHeaderConfig>
  },
  /** 右键菜单配置 */
  contextMenuConfig: {
    type: Object as PropType<TableContextMenuConfig>
  },
  /** 表格布局 */
  tableLayout: {
    type: String as PropType<'auto' | 'fixed'>,
    default: 'fixed'
  },
  /** 溢出提示效果 */
  tooltipEffect: {
    type: String as PropType<'dark' | 'light'>,
    default: 'dark'
  },
  /** 合并单元格方法 */
  spanMethod: {
    type: Function as PropType<
      (params: {
        row: Record<string, unknown>
        column: TableColumn
        rowIndex: number
        columnIndex: number
      }) => { rowspan: number; colspan: number } | [number, number] | void
    >
  },
  /** 行类名 */
  rowClassName: {
    type: [String, Function] as PropType<
      string | ((params: { row: Record<string, unknown>; rowIndex: number }) => string)
    >
  },
  /** 行样式 */
  rowStyle: {
    type: [Object, Function] as PropType<
      | CSSProperties
      | ((params: { row: Record<string, unknown>; rowIndex: number }) => CSSProperties)
    >
  },
  /** 单元格类名 */
  cellClassName: {
    type: [String, Function] as PropType<
      | string
      | ((params: {
          row: Record<string, unknown>
          column: TableColumn
          rowIndex: number
          columnIndex: number
        }) => string)
    >
  },
  /** 单元格样式 */
  cellStyle: {
    type: [Object, Function] as PropType<
      | CSSProperties
      | ((params: {
          row: Record<string, unknown>
          column: TableColumn
          rowIndex: number
          columnIndex: number
        }) => CSSProperties)
    >
  },
  /** 表头行类名 */
  headerRowClassName: {
    type: [String, Function] as PropType<string | ((params: { rowIndex: number }) => string)>
  },
  /** 表头行样式 */
  headerRowStyle: {
    type: [Object, Function] as PropType<
      CSSProperties | ((params: { rowIndex: number }) => CSSProperties)
    >
  },
  /** 表头单元格类名 */
  headerCellClassName: {
    type: [String, Function] as PropType<
      string | ((params: { column: TableColumn; columnIndex: number }) => string)
    >
  },
  /** 表头单元格样式 */
  headerCellStyle: {
    type: [Object, Function] as PropType<
      CSSProperties | ((params: { column: TableColumn; columnIndex: number }) => CSSProperties)
    >
  },
  /** 是否懒加载 */
  lazy: {
    type: Boolean,
    default: false
  },
  /** 懒加载方法 */
  loadMethod: {
    type: Function as PropType<(row: Record<string, unknown>) => Promise<Record<string, unknown>[]>>
  },
  /** 是否可调整列宽 */
  resizable: {
    type: Boolean,
    default: false
  },
  /** 是否显示序号 */
  showIndex: {
    type: Boolean,
    default: false
  },
  /** 序号列配置 */
  indexConfig: {
    type: Object as PropType<{
      label?: string
      width?: number | string
      fixed?: FixedPosition
      method?: (rowIndex: number) => number | string
    }>
  },
  /** 自适应内容高度 */
  autoHeight: {
    type: Boolean,
    default: false
  },
  /** 保持滚动位置 */
  keepScroll: {
    type: Boolean,
    default: false
  },
  /** 同步滚动 */
  syncScroll: {
    type: Boolean,
    default: true
  },
  /** 滚动优化 */
  scrollOptimize: {
    type: Boolean,
    default: true
  },
  /** 主题覆盖变量 */
  themeOverrides: {
    type: Object as PropType<import('@yh-ui/theme').ComponentThemeVars>,
    default: undefined
  }
} as const

export type TableProps = ExtractPropTypes<typeof tableProps>

// ====================== 事件定义 ======================

export const tableEmits = {
  /** 排序变化 */
  'sort-change': (params: { column: TableColumn; prop: string; order: SortOrder }) => true,
  /** 筛选变化 */
  'filter-change': (filters: Record<string, unknown[]>) => true,
  /** 分页变化 */
  'page-change': (params: { currentPage: number; pageSize: number }) => true,
  /** 选择变化 */
  'selection-change': (
    selectedRows: Record<string, unknown>[],
    selectedRowKeys: Array<string | number>
  ) => true,
  /** 当前行变化 */
  'current-change': (
    currentRow: Record<string, unknown> | null,
    oldRow: Record<string, unknown> | null
  ) => true,
  /** 展开变化 */
  'expand-change': (row: Record<string, unknown>, expandedRows: Record<string, unknown>[]) => true,
  /** 行点击 */
  'row-click': (row: Record<string, unknown>, column: TableColumn, event: MouseEvent) => true,
  /** 行双击 */
  'row-dblclick': (row: Record<string, unknown>, column: TableColumn, event: MouseEvent) => true,
  /** 行右键 */
  'row-contextmenu': (row: Record<string, unknown>, column: TableColumn, event: MouseEvent) => true,
  /** 单元格点击 */
  'cell-click': (
    row: Record<string, unknown>,
    column: TableColumn,
    cell: HTMLElement,
    event: MouseEvent
  ) => true,
  /** 单元格双击 */
  'cell-dblclick': (
    row: Record<string, unknown>,
    column: TableColumn,
    cell: HTMLElement,
    event: MouseEvent
  ) => true,
  /** 表头点击 */
  'header-click': (column: TableColumn, event: MouseEvent) => true,
  /** 表头右键 */
  'header-contextmenu': (column: TableColumn, event: MouseEvent) => true,
  /** 全选 */
  'select-all': (selection: Record<string, unknown>[]) => true,
  /** 选择行 */
  select: (selection: Record<string, unknown>[], row: Record<string, unknown>) => true,

  /** 滚动事件 */
  scroll: (params: { scrollTop: number; scrollLeft: number; isEnd: boolean }) => true,
  /** 拖拽结束 */
  'drag-end': (params: {
    type: 'row' | 'column'
    oldIndex: number
    newIndex: number
    data: unknown[]
  }) => true,
  /** 列宽变化 */
  'column-resize': (column: TableColumn, width: number) => true,
  /** 列可见性变化 */
  'column-visible-change': (columns: TableColumn[]) => true,
  /** 数据更新 */
  'update:data': (data: Record<string, unknown>[]) => true,
  /** 当前行 key 更新 */
  'update:currentRowKey': (key: string | number | undefined) => true
} as const

export type TableEmits = typeof tableEmits

// ====================== 上下文注入 ======================

export interface TableContext {
  props: TableProps
  slots: Record<string, unknown>
  registerColumn: (column: TableColumn) => void
  unregisterColumn: (column: TableColumn) => void
}

export const tableContextKey: InjectionKey<TableContext> = Symbol('tableContextKey')

// ====================== 暴露方法定义 ======================

export interface TableExpose {
  /** 获取选中行 */
  getSelectionRows: () => Record<string, unknown>[]
  /** 获取选中行 key */
  getSelectionRowKeys: () => Array<string | number>
  /** 切换行选中状态 */
  toggleRowSelection: (row: Record<string, unknown>, selected?: boolean) => void
  /** 切换全选 */
  toggleAllSelection: () => void
  /** 清空选择 */
  clearSelection: () => void
  /** 设置当前行 */
  setCurrentRow: (row: Record<string, unknown> | null) => void
  /** 切换行展开 */
  toggleRowExpansion: (row: Record<string, unknown>, expanded?: boolean) => void
  /** 设置展开行 */
  setExpandedRowKeys: (keys: Array<string | number>) => void
  /** 获取展开行 keys */
  getExpandedRowKeys: () => Array<string | number>
  /** 排序 */
  sort: (prop: string, order: SortOrder) => void
  /** 清空排序 */
  clearSort: () => void
  /** 筛选 */
  filter: (prop: string, values: unknown[]) => void
  /** 清空筛选 */
  clearFilter: (props?: string | string[]) => void
  /** 刷新布局 */
  doLayout: () => void
  /** 刷新数据 */
  refresh: () => void
  /** 滚动到指定位置 */
  scrollTo: (options: {
    left?: number
    top?: number
    row?: Record<string, unknown>
    rowIndex?: number
    column?: TableColumn
    columnIndex?: number
  }) => void
  /** 获取表格数据 */
  getTableData: () => { fullData: Record<string, unknown>[]; tableData: Record<string, unknown>[] }
  /** 导出数据（支持 csv / json / txt / xml / html） */
  exportData: (config?: Record<string, unknown>) => Promise<string | void>
  /** 打印（支持自定义标题、列、页眉页脚、分页等） */
  print: (config?: Record<string, unknown>) => Promise<void>
  /** 打开文件选择器导入 */
  openImport: (config?: Record<string, unknown>) => Promise<Record<string, unknown>[]>
  /** 从 File 对象导入 */
  importFile: (file: File, config?: Record<string, unknown>) => Promise<Record<string, unknown>[]>
  /** 从文本/数组导入 */
  importData: (
    content: string | Record<string, unknown>[],
    config?: Record<string, unknown>
  ) => Promise<Record<string, unknown>[]>
  /** 打印多张表格 */
  printMultiple: (
    tables: Array<{
      title?: string
      data: Record<string, unknown>[]
      columns?: TableColumn[]
      config?: Record<string, unknown>
    }>,
    config?: Record<string, unknown>
  ) => Promise<void>
  /** 打印自定义模板 */
  printTemplate: (templateHtml: string, config?: Record<string, unknown>) => Promise<void>
  /** 全屏切换 */
  toggleFullscreen: () => void
  /** 获取列信息 */
  getColumns: () => TableColumn[]
  /** 设置列可见性 */
  setColumnVisible: (prop: string, visible: boolean) => void
  /** 重置列 */
  resetColumns: () => void
  /** 插入行 */
  insertRow: (row: Record<string, unknown>, index?: number) => void
  /** 删除行 */
  removeRow: (row: Record<string, unknown> | Record<string, unknown>[]) => void
  /** 更新行 */
  updateRow: (row: Record<string, unknown>, newRow: Record<string, unknown>) => void
}
