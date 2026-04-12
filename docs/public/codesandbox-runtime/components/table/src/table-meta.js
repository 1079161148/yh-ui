const tableProps = {
  /** 数据源 */
  data: {
    type: Array,
    default: () => []
  },
  /** 列配置 */
  columns: {
    type: Array,
    default: () => []
  },
  /** 行唯一标识 */
  rowKey: {
    type: [String, Function],
    default: "id"
  },
  /** 表格尺寸 */
  size: {
    type: String,
    default: "default"
  },
  /** 表格高度 */
  height: {
    type: [Number, String]
  },
  /** 表格最大高度 */
  maxHeight: {
    type: [Number, String]
  },
  /** 表格宽度 */
  width: {
    type: [Number, String]
  },
  /** 是否显示边框 */
  border: {
    type: [Boolean, String],
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
    type: [String, Number]
  },
  /** 是否显示表头 */
  showHeader: {
    type: Boolean,
    default: true
  },
  /** 空数据显示文本 */
  emptyText: {
    type: String,
    default: ""
  },
  /** 是否自适应父容器 */
  fit: {
    type: Boolean,
    default: true
  },
  /** 排序配置 */
  sortConfig: {
    type: Object
  },
  /** 筛选配置 */
  filterConfig: {
    type: Object
  },
  /** 分页配置 */
  pagination: {
    type: [Boolean, Object],
    default: false
  },
  /** 选择配置 */
  selectionConfig: {
    type: Object
  },
  /** 展开配置 */
  expandConfig: {
    type: Object
  },
  /** 树形配置 */
  treeConfig: {
    type: Object
  },
  /** 虚拟滚动配置 */
  virtualConfig: {
    type: Object
  },
  /** 拖拽配置 */
  dragConfig: {
    type: Object
  },
  /** 汇总配置 */
  summaryConfig: {
    type: Object
  },
  /** 工具栏配置 */
  toolbarConfig: {
    type: Object
  },
  /** 空状态配置 */
  emptyConfig: {
    type: Object
  },
  /** 加载配置 */
  loading: {
    type: [Boolean, Object],
    default: false
  },
  /** 行配置 */
  rowConfig: {
    type: Object
  },
  /** 表头配置 */
  headerConfig: {
    type: Object
  },
  /** 右键菜单配置 */
  contextMenuConfig: {
    type: Object
  },
  /** 表格布局 */
  tableLayout: {
    type: String,
    default: "fixed"
  },
  /** 溢出提示效果 */
  tooltipEffect: {
    type: String,
    default: "dark"
  },
  /** 合并单元格方法 */
  spanMethod: {
    type: Function
  },
  /** 行类名 */
  rowClassName: {
    type: [String, Function]
  },
  /** 行样式 */
  rowStyle: {
    type: [Object, Function]
  },
  /** 单元格类名 */
  cellClassName: {
    type: [String, Function]
  },
  /** 单元格样式 */
  cellStyle: {
    type: [Object, Function]
  },
  /** 表头行类名 */
  headerRowClassName: {
    type: [String, Function]
  },
  /** 表头行样式 */
  headerRowStyle: {
    type: [Object, Function]
  },
  /** 表头单元格类名 */
  headerCellClassName: {
    type: [String, Function]
  },
  /** 表头单元格样式 */
  headerCellStyle: {
    type: [Object, Function]
  },
  /** 是否懒加载 */
  lazy: {
    type: Boolean,
    default: false
  },
  /** 懒加载方法 */
  loadMethod: {
    type: Function
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
    type: Object
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
    type: Object,
    default: void 0
  }
};
const tableEmits = {
  /** 排序变化 */
  "sort-change": (_params) => true,
  /** 筛选变化 */
  "filter-change": (_filters) => true,
  /** 分页变化 */
  "page-change": (_params) => true,
  /** 选择变化 */
  "selection-change": (_selectedRows, _selectedRowKeys) => true,
  /** 当前行变化 */
  "current-change": (_currentRow, _oldRow) => true,
  /** 展开变化 */
  "expand-change": (_row, _expandedRows) => true,
  /** 行点击 */
  "row-click": (_row, _column, _event) => true,
  /** 行双击 */
  "row-dblclick": (_row, _column, _event) => true,
  /** 行右键 */
  "row-contextmenu": (_row, _column, _event) => true,
  /** 单元格点击 */
  "cell-click": (_row, _column, _cell, _event) => true,
  /** 单元格双击 */
  "cell-dblclick": (_row, _column, _cell, _event) => true,
  /** 表头点击 */
  "header-click": (_column, _event) => true,
  /** 表头右键 */
  "header-contextmenu": (_column, _event) => true,
  /** 全选 */
  "select-all": (_selection) => true,
  /** 选择行 */
  select: (_selection, _row) => true,
  /** 滚动事件 */
  scroll: (_params) => true,
  /** 拖拽结束 */
  "drag-end": (_params) => true,
  /** 列宽变化 */
  "column-resize": (_column, _width) => true,
  /** 列可见性变化 */
  "column-visible-change": (_columns) => true,
  /** 数据更新 */
  "update:data": (_data) => true,
  /** 当前行 key 更新 */
  "update:currentRowKey": (_key) => true
};
const tableContextKey = Symbol("tableContextKey");
export {
  tableContextKey,
  tableEmits,
  tableProps
};
