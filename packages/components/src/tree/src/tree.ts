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

export const treeProps = {
  /** 数据源 */
  data: {
    type: Array as PropType<TreeNodeData[]>,
    default: () => []
  },
  props: {
    type: Object as PropType<{
      label?: string
      children?: string
      disabled?: string
    }>,
    default: () => ({
      label: 'label',
      children: 'children',
      disabled: 'disabled'
    })
  },
  /** 节点唯一标识字段名 */
  nodeKey: {
    type: String,
    default: 'id'
  },
  /** 显示复选框 */
  showCheckbox: {
    type: Boolean,
    default: false
  },
  /** 复选框位置 */
  checkboxPosition: {
    type: String as PropType<'left' | 'right'>,
    default: 'left'
  },
  /** 默认展开所有节点 */
  defaultExpandAll: {
    type: Boolean,
    default: false
  },
  /** 默认展开的节点 key 数组 */
  defaultExpandedKeys: {
    type: Array as PropType<(string | number)[]>,
    default: () => []
  },
  /** 默认选中的节点 key 数组 */
  defaultCheckedKeys: {
    type: Array as PropType<(string | number)[]>,
    default: () => []
  },
  /** 当前选中节点 (v-model) */
  currentNodeKey: {
    type: [String, Number] as PropType<string | number>,
    default: undefined
  },
  /** 是否高亮当前节点 */
  highlightCurrent: {
    type: Boolean,
    default: true
  },
  /** 展开时是否自动收起其他同级节点 */
  accordion: {
    type: Boolean,
    default: false
  },
  /** 缩进量 (px) */
  indent: {
    type: Number,
    default: 18
  },
  /** 是否严格的父子不关联模式 */
  checkStrictly: {
    type: Boolean,
    default: false
  },
  /** 点击节点时是否展开或收起 */
  expandOnClickNode: {
    type: Boolean,
    default: true
  },
  /** 点击节点时是否选中 */
  checkOnClickNode: {
    type: Boolean,
    default: false
  },
  /** 是否为空选择 */
  emptyText: {
    type: String,
    default: '暂无数据'
  },
  /** 过滤方法 */
  filterMethod: {
    type: Function as PropType<FilterMethod>,
    default: undefined
  },
  /** 懒加载函数 */
  load: {
    type: Function as PropType<LoadMethod>,
    default: undefined
  },
  /** 懒加载模式 */
  lazy: {
    type: Boolean,
    default: false
  },
  /** 是否可拖拽 */
  draggable: {
    type: Boolean,
    default: false
  },
  /** 是否显示连接线 */
  showLine: {
    type: Boolean,
    default: false
  },
  /** 是否开启虚拟滚动 */
  virtual: {
    type: Boolean,
    default: false
  },
  /** 虚拟滚动容器高度 */
  height: {
    type: Number,
    default: 400
  },
  /** 节点高度 */
  itemHeight: {
    type: Number,
    default: 30
  }
} as const

export type TreeProps = ExtractPropTypes<typeof treeProps>

export const treeEmits = {
  'node-click': (node: TreeNode, e: MouseEvent) => true,
  'node-expand': (node: TreeNode, expanded: boolean) => true,
  check: (node: TreeNode, checked: boolean, checkedKeys: (string | number)[]) => true,
  'current-change': (node: TreeNode | null) => true,
  'node-drag-start': (node: TreeNode, e: DragEvent) => true,
  'node-drag-end': (
    node: TreeNode,
    dropNode: TreeNode | null,
    position: 'before' | 'after' | 'inner',
    e: DragEvent
  ) => true,
  'node-drag-over': (node: TreeNode, e: DragEvent) => true,
  'node-drag-enter': (node: TreeNode, e: DragEvent) => true,
  'node-drag-leave': (node: TreeNode, e: DragEvent) => true,
  'node-drop': (
    node: TreeNode,
    dropNode: TreeNode,
    position: 'before' | 'after' | 'inner',
    e: DragEvent
  ) => true,
  'update:currentNodeKey': (key: string | number | undefined) => true
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
  // 拖拽相关
  handleDragStart: (node: TreeNode, e: DragEvent) => void
  handleDragOver: (node: TreeNode, e: DragEvent) => void
  handleDragEnter: (node: TreeNode, e: DragEvent) => void
  handleDragLeave: (node: TreeNode, e: DragEvent) => void
  handleDragEnd: (node: TreeNode, e: DragEvent) => void
  handleDrop: (node: TreeNode, e: DragEvent) => void
}

export const TREE_INJECTION_KEY: InjectionKey<TreeContext> = Symbol('tree')
