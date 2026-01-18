import type { ExtractPropTypes, PropType } from 'vue'

export const treeSelectProps = {
  // 基础属性
  modelValue: {
    type: [String, Number, Array] as PropType<string | number | (string | number)[]>,
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
    default: '请选择'
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
  filterNodeMethod: Function as PropType<(value: string, data: TreeOption, node: any) => boolean>,
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
    default: '暂无数据'
  }
} as const

export const treeSelectEmits = {
  'update:modelValue': (value: any) => true,
  change: (value: any) => true,
  clear: () => true,
  'visible-change': (visible: boolean) => true,
  'node-click': (data: TreeOption, node: any, e: MouseEvent) => true,
  'check-change': (data: TreeOption, checked: boolean, indeterminate: boolean) => true,
  check: (data: TreeOption, info: any) => true
}

export type TreeSelectEmits = typeof treeSelectEmits
export type TreeSelectProps = ExtractPropTypes<typeof treeSelectProps>
export type TreeKey = string | number
export interface TreeOption {
  value?: TreeKey
  label?: string
  children?: TreeOption[]
  disabled?: boolean
  isLeaf?: boolean
  [key: string]: any
}

export interface TreePropsAlias {
  label?: string
  value?: string
  children?: string
  disabled?: string
  isLeaf?: string
}

export interface TreeNode {
  key: TreeKey
  label: string
  level: number
  raw: TreeOption
  parent?: TreeNode
  children?: TreeNode[]
  isLeaf: boolean
  disabled: boolean
  visible: boolean
  expanded: boolean
  checked: boolean
  indeterminate: boolean
  loading: boolean
  loaded: boolean
}
