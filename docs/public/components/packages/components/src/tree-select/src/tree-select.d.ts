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
  [key: string]: unknown
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
export declare const treeSelectProps: {
  readonly modelValue: {
    readonly type: PropType<TreeKey | TreeKey[]>
    readonly default: undefined
  }
  readonly data: {
    readonly type: PropType<TreeOption[]>
    readonly default: () => never[]
  }
  readonly props: {
    readonly type: PropType<TreePropsAlias>
    readonly default: () => {
      label: string
      value: string
      children: string
      disabled: string
      isLeaf: string
    }
  }
  readonly placeholder: {
    readonly type: StringConstructor
    readonly default: undefined
  }
  readonly multiple: BooleanConstructor
  readonly clearable: BooleanConstructor
  readonly disabled: BooleanConstructor
  readonly size: {
    readonly type: PropType<'large' | 'default' | 'small'>
    readonly default: 'default'
  }
  readonly filterable: BooleanConstructor
  readonly filterNodeMethod: PropType<
    (value: string, data: TreeOption, node: TreeSelectNode) => boolean
  >
  readonly collapseTags: BooleanConstructor
  readonly collapseTagsTooltip: BooleanConstructor
  readonly maxCollapseTags: {
    readonly type: NumberConstructor
    readonly default: 1
  }
  readonly teleported: {
    readonly type: BooleanConstructor
    readonly default: true
  }
  readonly popperClass: {
    readonly type: StringConstructor
    readonly default: ''
  }
  readonly status: PropType<'success' | 'warning' | 'error' | ''>
  readonly nodeKey: {
    readonly type: StringConstructor
    readonly default: undefined
  }
  readonly showCheckbox: BooleanConstructor
  readonly checkStrictly: BooleanConstructor
  readonly checkOnClickNode: BooleanConstructor
  readonly expandOnClickNode: {
    readonly type: BooleanConstructor
    readonly default: true
  }
  readonly defaultExpandAll: BooleanConstructor
  readonly defaultExpandedKeys: {
    readonly type: PropType<TreeKey[]>
    readonly default: () => never[]
  }
  readonly defaultCheckedKeys: {
    readonly type: PropType<TreeKey[]>
    readonly default: () => never[]
  }
  readonly accordion: BooleanConstructor
  readonly indent: {
    readonly type: NumberConstructor
    readonly default: 16
  }
  readonly lazy: BooleanConstructor
  readonly load: PropType<(node: TreeOption, resolve: (data: TreeOption[]) => void) => void>
  readonly virtual: {
    readonly type: BooleanConstructor
    readonly default: false
  }
  readonly height: {
    readonly type: PropType<string | number>
    readonly default: 274
  }
  readonly itemSize: {
    readonly type: NumberConstructor
    readonly default: 34
  }
  readonly emptyText: {
    readonly type: StringConstructor
    readonly default: undefined
  }
  /** 主题覆盖变量 */
  readonly themeOverrides: {
    readonly type: PropType<import('@yh-ui/theme').ComponentThemeVars>
    readonly default: undefined
  }
}
export declare const treeSelectEmits: {
  'update:modelValue': (_value: TreeKey | TreeKey[] | undefined) => boolean
  change: (_value: TreeKey | TreeKey[] | undefined) => boolean
  clear: () => boolean
  'visible-change': (_visible: boolean) => boolean
  'node-click': (_data: TreeOption, _node: TreeSelectNode, _e: MouseEvent) => boolean
  'check-change': (_data: TreeOption, _checked: boolean, _indeterminate: boolean) => boolean
  check: (_data: TreeOption, _info: TreeCheckedInfo) => boolean
}
export type TreeSelectEmits = typeof treeSelectEmits
export type TreeSelectProps = ExtractPropTypes<typeof treeSelectProps>
