import type { ExtractPropTypes, PropType } from 'vue'
/** 排序方向 */
export type FilterSortOrder = 'asc' | 'desc' | null
/** 单个排序项 */
export interface FilterSortItem {
  /** 键名 */
  key: string
  /** 显示标签 */
  label: string
}
/** 筛选器类型 */
export type FilterType = 'select' | 'range' | 'checkbox' | 'radio'
/** 单个筛选选项 */
export interface FilterOption {
  label: string
  value: string | number
}
/** 单个筛选器定义 */
export interface FilterItem {
  /** 键名 */
  key: string
  /** 显示标签 */
  label: string
  /** 类型，默认 select */
  type?: FilterType
  /** 候选项列表（select/checkbox/radio 类型使用） */
  options?: FilterOption[]
  /** 范围筛选最小值（range 类型使用） */
  min?: number
  /** 范围筛选最大值（range 类型使用） */
  max?: number
  /** 扩展字段 */
  [key: string]: unknown
}
/** 筛选器的当前值 */
export type FilterValue = Record<
  string,
  string | number | (string | number)[] | [number, number] | null
>
/** 排序当前状态 */
export interface FilterSort {
  key: string | null
  order: FilterSortOrder
}
export declare const filterBarProps: {
  /** 排序配置列表 */
  sorts: {
    type: PropType<FilterSortItem[]>
    default: () => never[]
  }
  /** 筛选器配置列表 */
  filters: {
    type: PropType<FilterItem[]>
    default: () => never[]
  }
  /** 当前排序状态（支持 v-model:sort） */
  sort: {
    type: PropType<FilterSort>
    default: () => FilterSort
  }
  /** 当前筛选值（支持 v-model:filterValue） */
  filterValue: {
    type: PropType<FilterValue>
    default: () => {}
  }
  /** 是否展示「全部」tab */
  showAll: {
    type: BooleanConstructor
    default: boolean
  }
  /** 是否吸顶 */
  sticky: {
    type: BooleanConstructor
    default: boolean
  }
  /** 吸顶偏移量（px） */
  stickyOffset: {
    type: NumberConstructor
    default: number
  }
  /** 是否在弹出面板中展示筛选器（否则内联） */
  filterInPanel: {
    type: BooleanConstructor
    default: boolean
  }
  /** 主题变量覆盖 */
  themeOverrides: {
    type: PropType<Record<string, string>>
    default: () => {}
  }
  /** 是否展示最右侧的全局「筛选」按钮 */
  showGlobalFilter: {
    type: BooleanConstructor
    default: boolean
  }
  /** 是否展示视图切换按钮 */
  showViewToggle: {
    type: BooleanConstructor
    default: boolean
  }
  /** 当前视图模式（支持 v-model:viewType） */
  viewType: {
    type: PropType<'list' | 'grid'>
    default: string
  }
}
export type FilterBarProps = ExtractPropTypes<typeof filterBarProps>
export declare const filterBarEmits: {
  'update:sort': (sort: FilterSort) => boolean
  'update:filterValue': (val: FilterValue) => boolean
  'update:viewType': (val: 'list' | 'grid') => boolean
  /** 排序变化 */
  sortChange: (sort: FilterSort) => boolean
  /** 筛选值变化 */
  filterChange: (val: FilterValue) => boolean
  /** 视图模式变化 */
  viewChange: (val: 'list' | 'grid') => boolean
  /** 点击重置 */
  reset: () => boolean
  /** 点击确认筛选 */
  confirm: (val: FilterValue) => boolean
  /** 单个面板内点击重置时触发，可用于清空自定义插槽字段 */
  resetPanel: (filter: FilterItem, _currentValues: FilterValue) => boolean
  /** 点击全局「筛选」按钮 */
  openFilter: () => boolean
}
export type FilterBarEmits = typeof filterBarEmits
export interface FilterBarSlots {
  'filter-icon'?: () => unknown
  'view-icon'?: (props: { viewType: 'list' | 'grid' }) => unknown
  extra?: () => unknown
  filter?: (props: {
    filter: FilterItem
    value: FilterValue[string]
    updateValue: (value: FilterValue[string]) => void
  }) => unknown
}
