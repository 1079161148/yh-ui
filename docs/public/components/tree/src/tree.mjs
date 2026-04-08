export const treeProps = {
  /** 数据源 */
  data: {
    type: Array,
    default: () => []
  },
  props: {
    type: Object,
    default: () => ({
      label: "label",
      children: "children",
      disabled: "disabled"
    })
  },
  /** 节点唯一标识字段名 */
  nodeKey: {
    type: String,
    default: "id"
  },
  /** 显示复选框 */
  showCheckbox: {
    type: Boolean,
    default: false
  },
  /** 复选框位置 */
  checkboxPosition: {
    type: String,
    default: "left"
  },
  /** 默认展开所有节点 */
  defaultExpandAll: {
    type: Boolean,
    default: false
  },
  /** 默认展开的节点 key 数组 */
  defaultExpandedKeys: {
    type: Array,
    default: () => []
  },
  /** 默认选中的节点 key 数组 */
  defaultCheckedKeys: {
    type: Array,
    default: () => []
  },
  /** 当前选中节点 (v-model) */
  currentNodeKey: {
    type: [String, Number],
    default: void 0
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
    default: ""
  },
  /** 过滤方法 */
  filterMethod: {
    type: Function,
    default: void 0
  },
  /** 懒加载函数 */
  load: {
    type: Function,
    default: void 0
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
  },
  /** 主题覆盖变量 */
  themeOverrides: {
    type: Object,
    default: void 0
  }
};
export const treeEmits = {
  "node-click": (_node, _e) => true,
  "node-expand": (_node, _expanded) => true,
  check: (_node, _checked, _checkedKeys) => true,
  "current-change": (_node) => true,
  "node-drag-start": (_node, _e) => true,
  "node-drag-end": (_node, _dropNode, _position, _e) => true,
  "node-drag-over": (_node, _e) => true,
  "node-drag-enter": (_node, _e) => true,
  "node-drag-leave": (_node, _e) => true,
  "node-drop": (_node, _dropNode, _position, _e) => true,
  "update:currentNodeKey": (_key) => true
};
export const TREE_INJECTION_KEY = Symbol("tree");
