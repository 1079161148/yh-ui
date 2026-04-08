export const popoverTriggers = ["hover", "click", "focus", "contextmenu"];
export const popoverProps = {
  /** 标题 */
  title: String,
  /** 描述文字 (对齐 Popconfirm) */
  description: String,
  /** 图标名称 (对齐 Popconfirm) */
  icon: String,
  /** 图标颜色 */
  iconColor: String,
  /** 内容文字 (也可通过默认插槽设置复杂内容) */
  content: String,
  /** 弹出位置 */
  placement: {
    type: String,
    default: "bottom"
  },
  /** 触发方式，支持数组 */
  trigger: {
    type: [String, Array],
    default: "click"
  },
  /** 手动控制可见性 */
  visible: {
    type: Boolean,
    default: null
  },
  /** 提示框的主题：light / dark */
  effect: {
    type: String,
    default: "light"
  },
  /** 是否禁用 */
  disabled: {
    type: Boolean,
    default: false
  },
  /** 是否显示小三角 */
  showArrow: {
    type: Boolean,
    default: true
  },
  /** 出现延迟 (ms) */
  showAfter: {
    type: Number,
    default: 0
  },
  /** 隐藏延迟 (ms) */
  hideAfter: {
    type: Number,
    default: 100
  },
  /** 偏移量 [横向, 纵向] */
  offset: {
    type: Array,
    default: () => [0, 12]
  },
  /** 弹出层宽度 */
  width: {
    type: [String, Number],
    default: "auto"
  },
  /** 最大高度 (配合 scrollable 使用) */
  maxHeight: {
    type: [String, Number],
    default: "none"
  },
  /** 内容是否可滚动 */
  scrollable: {
    type: Boolean,
    default: false
  },
  /** 是否允许鼠标进入提示框 */
  interactive: {
    type: Boolean,
    default: true
  },
  /** 是否跟随触发器宽度 */
  matchTriggerWidth: {
    type: Boolean,
    default: false
  },
  /** z-index 层级 */
  zIndex: {
    type: Number,
    default: 2003
  },
  /** 是否挂载至 body */
  teleported: {
    type: Boolean,
    default: true
  },
  /** 弹出层自定义类名 */
  popperClass: {
    type: String,
    default: ""
  },
  /** 弹出层自定义样式 */
  popperStyle: {
    type: [Object, String, Array],
    default: () => ({})
  },
  /** 动画名称 */
  transition: {
    type: String,
    default: "yh-popover-fade"
  },
  /** 是否持久化 DOM (隐藏时是否销毁) */
  persistent: {
    type: Boolean,
    default: true
  },
  /** 主题覆盖变量 */
  themeOverrides: {
    type: Object,
    default: void 0
  }
};
export const popoverEmits = {
  "update:visible": (visible) => typeof visible === "boolean",
  show: () => true,
  hide: () => true
};
