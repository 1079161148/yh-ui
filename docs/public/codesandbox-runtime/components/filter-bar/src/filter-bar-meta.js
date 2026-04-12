const filterBarProps = {
  /** 排序配置列表 */
  sorts: {
    type: Array,
    default: () => []
  },
  /** 筛选器配置列表 */
  filters: {
    type: Array,
    default: () => []
  },
  /** 当前排序状态（支持 v-model:sort） */
  sort: {
    type: Object,
    default: () => ({ key: null, order: null })
  },
  /** 当前筛选值（支持 v-model:filterValue） */
  filterValue: {
    type: Object,
    default: () => ({})
  },
  /** 是否展示「全部」tab */
  showAll: {
    type: Boolean,
    default: true
  },
  /** 是否吸顶 */
  sticky: {
    type: Boolean,
    default: false
  },
  /** 吸顶偏移量（px） */
  stickyOffset: {
    type: Number,
    default: 0
  },
  /** 是否在弹出面板中展示筛选器（否则内联） */
  filterInPanel: {
    type: Boolean,
    default: true
  },
  /** 主题变量覆盖 */
  themeOverrides: {
    type: Object,
    default: () => ({})
  },
  /** 是否展示最右侧的全局「筛选」按钮 */
  showGlobalFilter: {
    type: Boolean,
    default: true
  },
  /** 是否展示视图切换按钮 */
  showViewToggle: {
    type: Boolean,
    default: false
  },
  /** 当前视图模式（支持 v-model:viewType） */
  viewType: {
    type: String,
    default: "list"
  }
};
const filterBarEmits = {
  "update:sort": (sort) => sort !== void 0,
  "update:filterValue": (val) => val !== void 0,
  "update:viewType": (val) => val === "list" || val === "grid",
  /** 排序变化 */
  sortChange: (sort) => sort !== void 0,
  /** 筛选值变化 */
  filterChange: (val) => val !== void 0,
  /** 视图模式变化 */
  viewChange: (val) => val === "list" || val === "grid",
  /** 点击重置 */
  reset: () => true,
  /** 点击确认筛选 */
  confirm: (val) => val !== void 0,
  /** 单个面板内点击重置时触发，可用于清空自定义插槽字段 */
  resetPanel: (filter, _currentValues) => filter !== void 0,
  /** 点击全局「筛选」按钮 */
  openFilter: () => true
};
export {
  filterBarEmits,
  filterBarProps
};
