import type { ExtractPropTypes, PropType } from 'vue'

/** 二级分类项 */
export interface CategorySubItem {
  id: string | number
  name: string
  image?: string
  /** 商品数量 */
  count?: number
  /** 自定义扩展字段 */
  [key: string]: unknown
}

/** 一级分类项 */
export interface CategoryItem {
  id: string | number
  name: string
  image?: string
  icon?: string
  /** 徽标 */
  badge?: string | number
  /** 子分类列表 */
  children?: CategorySubItem[]
  /** 自定义扩展字段 */
  [key: string]: unknown
}

export const categoryNavProps = {
  /** 分类数据 */
  categories: {
    type: Array as PropType<CategoryItem[]>,
    default: () => []
  },
  /** 当前激活的一级分类 ID（支持 v-model） */
  modelValue: {
    type: [String, Number] as PropType<string | number | null>,
    default: null
  },
  /** 当前激活的子分类 ID（支持 v-model:subValue） */
  subValue: {
    type: [String, Number] as PropType<string | number | null>,
    default: null
  },
  /** 左侧菜单宽度 */
  sideWidth: {
    type: String,
    default: '84px'
  },
  /** 是否展示全部标签 */
  showAll: {
    type: Boolean,
    default: true
  },
  /** 加载中 */
  loading: {
    type: Boolean,
    default: false
  },
  /** 右侧内容区的列数（用于子分类网格布局） */
  columns: {
    type: Number,
    default: 3
  },
  /** 子分类图片大小 px */
  subImageSize: {
    type: Number,
    default: 64
  },
  /** 是否开启右侧滚动锚定联动 */
  anchor: {
    type: Boolean,
    default: true
  },
  /** 主题变量覆盖 */
  themeOverrides: {
    type: Object as PropType<Record<string, string>>,
    default: () => ({})
  }
}

export type CategoryNavProps = ExtractPropTypes<typeof categoryNavProps>

export const categoryNavEmits = {
  'update:modelValue': (id: string | number | null) => id !== undefined,
  'update:subValue': (id: string | number | null) => id !== undefined,
  /** 点击一级分类 */
  categoryClick: (item: CategoryItem) => item !== undefined,
  /** 点击子分类 */
  subCategoryClick: (item: CategorySubItem, _parent: CategoryItem) => item !== undefined
}

export type CategoryNavEmits = typeof categoryNavEmits
