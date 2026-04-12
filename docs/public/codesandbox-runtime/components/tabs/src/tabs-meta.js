const tabsTypes = ['line', 'card', 'border-card', 'segment']
const tabsPositions = ['top', 'right', 'bottom', 'left']
const tabsProps = {
  /** 当前激活的标签名 */
  modelValue: {
    type: [String, Number],
    default: ''
  },
  /** 标签类型 */
  type: {
    type: String,
    default: 'line'
  },
  /** 标签位置 */
  tabPosition: {
    type: String,
    default: 'top'
  },
  /** 是否可拖拽排序 (Premium) */
  draggable: {
    type: Boolean,
    default: false
  },
  /** 是否可关闭标签 */
  closable: {
    type: Boolean,
    default: false
  },
  /** 是否可新增标签 */
  addable: {
    type: Boolean,
    default: false
  },
  /** 同时可编辑（可关闭+可新增） */
  editable: {
    type: Boolean,
    default: false
  },
  /** 切换前钩子，返回 false 或 Promise.reject 可阻止切换 */
  beforeLeave: {
    type: Function
  },
  /** 是否撑满容器 */
  stretch: {
    type: Boolean,
    default: false
  },
  /** 标签栏自定义类名 */
  navClass: {
    type: String,
    default: ''
  },
  /** 内容区自定义类名 */
  contentClass: {
    type: String,
    default: ''
  },
  /** 指示器宽度（水平方向时为长度，垂直方向时为粗细），如 '50%'、'80px'、'auto' */
  indicatorWidth: {
    type: String,
    default: ''
  },
  /** 指示器高度（垂直方向时为长度，水平方向时为粗细），如 '50%'、'80px'、'auto' */
  indicatorHeight: {
    type: String,
    default: ''
  },
  /** 选中态颜色 */
  activeColor: {
    type: String,
    default: ''
  },
  /** 未选中态颜色 */
  inactiveColor: {
    type: String,
    default: ''
  },
  /** 触发方式 */
  trigger: {
    type: String,
    default: 'click'
  },
  /** 主题覆盖变量 */
  themeOverrides: {
    type: Object,
    default: void 0
  }
}
const tabsEmits = {
  'update:modelValue': (name) => typeof name === 'string' || typeof name === 'number',
  'tab-click': (pane, _ev) => pane !== void 0,
  'tab-change': (name) => typeof name === 'string' || typeof name === 'number',
  'tab-remove': (name) => typeof name === 'string' || typeof name === 'number',
  'tab-add': () => true,
  'tab-drag-end': (names) => Array.isArray(names)
}
const TABS_INJECTION_KEY = Symbol('yhTabs')
export { TABS_INJECTION_KEY, tabsEmits, tabsPositions, tabsProps, tabsTypes }
