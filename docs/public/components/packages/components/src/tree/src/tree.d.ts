import type { ExtractPropTypes, PropType, InjectionKey, Ref } from 'vue'
/** 树节点数据结构 */
export interface TreeNodeData {
  /** 唯一标识 */
  key: string | number
  /** 显示文本 */
  label: string
  /** 子节点 */
  children?: TreeNodeData[]
  /** 是否禁用 */
  disabled?: boolean
  /** 是否叶子节点 */
  isLeaf?: boolean
  /** 自定义图标 */
  icon?: string
  /** 额外样式类 */
  class?: string
  /** 额外数据 */
  [key: string]: unknown
}
/** 树节点内部状态 */
export interface TreeNode extends Omit<TreeNodeData, 'children'> {
  key: string | number
  label: string
  disabled?: boolean
  isLeaf?: boolean
  icon?: string
  level: number
  parent: TreeNode | null
  expanded: boolean
  checked: boolean
  indeterminate: boolean
  visible: boolean
  loading: boolean
  loaded: boolean
  rawData: TreeNodeData
  children?: TreeNode[]
}
export type FilterMethod = (query: string, node: TreeNode) => boolean
export type LoadMethod = (node: TreeNode) => Promise<TreeNodeData[]>
export declare const treeProps: {
  /** 数据源 */
  readonly data: {
    readonly type: PropType<TreeNodeData[]>
    readonly default: () => never[]
  }
  readonly props: {
    readonly type: PropType<{
      label?: string
      children?: string
      disabled?: string
    }>
    readonly default: () => {
      label: string
      children: string
      disabled: string
    }
  }
  /** 节点唯一标识字段名 */
  readonly nodeKey: {
    readonly type: StringConstructor
    readonly default: 'id'
  }
  /** 显示复选框 */
  readonly showCheckbox: {
    readonly type: BooleanConstructor
    readonly default: false
  }
  /** 复选框位置 */
  readonly checkboxPosition: {
    readonly type: PropType<'left' | 'right'>
    readonly default: 'left'
  }
  /** 默认展开所有节点 */
  readonly defaultExpandAll: {
    readonly type: BooleanConstructor
    readonly default: false
  }
  /** 默认展开的节点 key 数组 */
  readonly defaultExpandedKeys: {
    readonly type: PropType<(string | number)[]>
    readonly default: () => never[]
  }
  /** 默认选中的节点 key 数组 */
  readonly defaultCheckedKeys: {
    readonly type: PropType<(string | number)[]>
    readonly default: () => never[]
  }
  /** 当前选中节点 (v-model) */
  readonly currentNodeKey: {
    readonly type: PropType<string | number>
    readonly default: undefined
  }
  /** 是否高亮当前节点 */
  readonly highlightCurrent: {
    readonly type: BooleanConstructor
    readonly default: true
  }
  /** 展开时是否自动收起其他同级节点 */
  readonly accordion: {
    readonly type: BooleanConstructor
    readonly default: false
  }
  /** 缩进量 (px) */
  readonly indent: {
    readonly type: NumberConstructor
    readonly default: 18
  }
  /** 是否严格的父子不关联模式 */
  readonly checkStrictly: {
    readonly type: BooleanConstructor
    readonly default: false
  }
  /** 点击节点时是否展开或收起 */
  readonly expandOnClickNode: {
    readonly type: BooleanConstructor
    readonly default: true
  }
  /** 点击节点时是否选中 */
  readonly checkOnClickNode: {
    readonly type: BooleanConstructor
    readonly default: false
  }
  /** 是否为空选择 */
  readonly emptyText: {
    readonly type: StringConstructor
    readonly default: ''
  }
  /** 过滤方法 */
  readonly filterMethod: {
    readonly type: PropType<FilterMethod>
    readonly default: undefined
  }
  /** 懒加载函数 */
  readonly load: {
    readonly type: PropType<LoadMethod>
    readonly default: undefined
  }
  /** 懒加载模式 */
  readonly lazy: {
    readonly type: BooleanConstructor
    readonly default: false
  }
  /** 是否可拖拽 */
  readonly draggable: {
    readonly type: BooleanConstructor
    readonly default: false
  }
  /** 是否显示连接线 */
  readonly showLine: {
    readonly type: BooleanConstructor
    readonly default: false
  }
  /** 是否开启虚拟滚动 */
  readonly virtual: {
    readonly type: BooleanConstructor
    readonly default: false
  }
  /** 虚拟滚动容器高度 */
  readonly height: {
    readonly type: NumberConstructor
    readonly default: 400
  }
  /** 节点高度 */
  readonly itemHeight: {
    readonly type: NumberConstructor
    readonly default: 30
  }
  /** 主题覆盖变量 */
  readonly themeOverrides: {
    readonly type: PropType<import('@yh-ui/theme').TreeThemeVars>
    readonly default: undefined
  }
}
export type TreeProps = ExtractPropTypes<typeof treeProps>
export declare const treeEmits: {
  'node-click': (_node: TreeNode, _e: MouseEvent) => boolean
  'node-expand': (_node: TreeNode, _expanded: boolean) => boolean
  check: (_node: TreeNode, _checked: boolean, _checkedKeys: (string | number)[]) => boolean
  'current-change': (_node: TreeNode | null) => boolean
  'node-drag-start': (_node: TreeNode, _e: DragEvent) => boolean
  'node-drag-end': (
    _node: TreeNode,
    _dropNode: TreeNode | null,
    _position: 'before' | 'after' | 'inner',
    _e: DragEvent
  ) => boolean
  'node-drag-over': (_node: TreeNode, _e: DragEvent) => boolean
  'node-drag-enter': (_node: TreeNode, _e: DragEvent) => boolean
  'node-drag-leave': (_node: TreeNode, _e: DragEvent) => boolean
  'node-drop': (
    _node: TreeNode,
    _dropNode: TreeNode,
    _position: 'before' | 'after' | 'inner',
    _e: DragEvent
  ) => boolean
  'update:currentNodeKey': (_key: string | number | undefined) => boolean
}
export type TreeEmits = typeof treeEmits
/** Tree 上下文 */
export interface TreeContext {
  props: TreeProps
  currentNodeKey: Ref<string | number | undefined>
  expandedKeys: Ref<Set<string | number>>
  checkedKeys: Ref<Set<string | number>>
  draggingNodeKey: Ref<string | number | undefined>
  dropTargetNodeKey: Ref<string | number | undefined>
  dropPosition: Ref<'before' | 'after' | 'inner' | undefined>
  handleNodeClick: (node: TreeNode, e: MouseEvent) => void
  handleNodeExpand: (node: TreeNode) => void
  handleNodeCheck: (node: TreeNode, checked: boolean) => void
  setCurrentKey: (key: string | number | undefined) => void
  handleDragStart: (node: TreeNode, e: DragEvent) => void
  handleDragOver: (node: TreeNode, e: DragEvent) => void
  handleDragEnter: (node: TreeNode, e: DragEvent) => void
  handleDragLeave: (node: TreeNode, e: DragEvent) => void
  handleDragEnd: (node: TreeNode, e: DragEvent) => void
  handleDrop: (node: TreeNode, e: DragEvent) => void
}
export declare const TREE_INJECTION_KEY: InjectionKey<TreeContext>
/** TreeNode 插槽数据类型 */
export interface TreeNodeSlotData {
  node: TreeNode
  data: TreeNodeData
}
