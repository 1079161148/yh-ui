/**
 * TreeSelect Types & Props
 * @description 树形选择器组件类型定义，确保严格类型安全
 */
import type { ExtractPropTypes, PropType } from 'vue'

/**
 * 树节点的基本格式
 */
export interface TreeOption {
  value?: TreeKey
  label?: string
  children?: TreeOption[]
  disabled?: boolean
  isLeaf?: boolean
  [key: string]: unknown // 使用 unknown 替代 any
}

/**
 * 树节点的键类型
 */
export type TreeKey = string | number

/**
 * 字段别名配置
 */
export interface TreePropsAlias {
  label?: string
  value?: string
  children?: string
  disabled?: string
  isLeaf?: string
}

/**
 * 内部节点状态结构 (ViewModel)
 */
export interface TreeSelectNode {
  key: TreeKey
  label: string
  level: number
  raw: TreeOption
  parent?: TreeSelectNode
  children?: TreeSelectNode[]
  isLeaf: boolean
  disabled: boolean
  visible: boolean
  expanded: boolean
  checked: boolean
  indeterminate: boolean
  loading: boolean
  loaded: boolean
}

/**
 * 下拉树多项信息反馈
 */
export interface TreeCheckedInfo {
  checkedKeys: TreeKey[]
  checkedNodes: TreeOption[]
}

export const treeSelectProps = {
  // 基础属性
  modelValue: {
    type: [String, Number, Array] as PropType<TreeKey | TreeKey[]>,
    default: undefined
  },
  data: {
    type: Array as PropType<TreeOption[]>,
    default: () => []
  },
  props: {
    type: Object as PropType<TreePropsAlias>,
    default: () => ({
      label: 'label',
      value: 'value',
      children: 'children',
      disabled: 'disabled',
      isLeaf: 'isLeaf'
    })
  },
  placeholder: {
    type: String,
    default: undefined
  },
  // Select 相关属性
  multiple: Boolean,
  clearable: Boolean,
  disabled: Boolean,
  size: {
    type: String as PropType<'large' | 'default' | 'small'>,
    default: 'default'
  },
  filterable: Boolean,
  filterNodeMethod: Function as PropType<
    (value: string, data: TreeOption, node: TreeSelectNode) => boolean
  >,
  collapseTags: Boolean,
  collapseTagsTooltip: Boolean,
  maxCollapseTags: {
    type: Number,
    default: 1
  },
  teleported: {
    type: Boolean,
    default: true
  },
  popperClass: {
    type: String,
    default: ''
  },
  status: String as PropType<'success' | 'warning' | 'error' | ''>,

  // Tree 相关属性
  nodeKey: {
    type: String,
    default: undefined
  },
  showCheckbox: Boolean,
  checkStrictly: Boolean,
  checkOnClickNode: Boolean,
  expandOnClickNode: {
    type: Boolean,
    default: true
  },
  defaultExpandAll: Boolean,
  defaultExpandedKeys: {
    type: Array as PropType<TreeKey[]>,
    default: () => []
  },
  defaultCheckedKeys: {
    type: Array as PropType<TreeKey[]>,
    default: () => []
  },
  accordion: Boolean,
  indent: {
    type: Number,
    default: 16
  },
  lazy: Boolean,
  load: Function as PropType<(node: TreeOption, resolve: (data: TreeOption[]) => void) => void>,

  // 增强属性
  virtual: {
    type: Boolean,
    default: false
  },
  height: {
    type: [String, Number] as PropType<string | number>,
    default: 274
  },
  itemSize: {
    type: Number,
    default: 34
  },
  emptyText: {
    type: String,
    default: undefined
  },
  /** 主题覆盖变量 */
  themeOverrides: {
    type: Object as PropType<import('@yh-ui/theme').ComponentThemeVars>,
    default: undefined
  }
} as const

export const treeSelectEmits = {
  'update:modelValue': (value: TreeKey | TreeKey[] | undefined) => true,
  change: (value: TreeKey | TreeKey[] | undefined) => true,
  clear: () => true,
  'visible-change': (visible: boolean) => true,
  'node-click': (data: TreeOption, node: TreeSelectNode, e: MouseEvent) => true,
  'check-change': (data: TreeOption, checked: boolean, indeterminate: boolean) => true,
  check: (data: TreeOption, info: TreeCheckedInfo) => true
}

export type TreeSelectEmits = typeof treeSelectEmits
export type TreeSelectProps = ExtractPropTypes<typeof treeSelectProps>
