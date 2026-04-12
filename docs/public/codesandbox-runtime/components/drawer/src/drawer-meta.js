const drawerProps = {
  /** 是否显示 */
  modelValue: {
    type: Boolean,
    default: false
  },
  /** 标题 */
  title: {
    type: [String, Function, Object]
  },
  /** 抽屉位置 */
  placement: {
    type: String,
    default: 'right'
  },
  /** 抽屉大小 (宽度或高度) */
  size: {
    type: [String, Number],
    default: '30%'
  },
  /** 是否显示遮罩层 */
  modal: {
    type: Boolean,
    default: true
  },
  /** 点击遮罩层是否关闭 */
  closeOnClickModal: {
    type: Boolean,
    default: true
  },
  /** 按下 ESC 是否关闭 */
  closeOnPressEscape: {
    type: Boolean,
    default: true
  },
  /** 是否显示关闭按钮 */
  showClose: {
    type: Boolean,
    default: true
  },
  /** 自定义关闭图标 */
  closeIcon: {
    type: String,
    default: 'close'
  },
  /** 是否在关闭时销毁内容 */
  destroyOnClose: {
    type: Boolean,
    default: false
  },
  /** z-index 层级 */
  zIndex: {
    type: Number
  },
  /** 挂载节点 */
  teleportTo: {
    type: [String, Object],
    default: 'body'
  },
  /** 是否显示 header */
  showHeader: {
    type: Boolean,
    default: true
  },
  /** 是否显示 footer */
  showFooter: {
    type: Boolean,
    default: false
  },
  /** 自定义类名 */
  customClass: String,
  /** 遮罩层自定义类名 */
  modalClass: String,
  /** 是否锁定视口滚动 */
  lockScroll: {
    type: Boolean,
    default: true
  },
  /** 是否开启亚克力玻璃模式 */
  glass: {
    type: Boolean,
    default: false
  },
  /** 是否可调整大小 */
  resizable: {
    type: Boolean,
    default: false
  },
  /** 最小大小 (px) */
  minSize: {
    type: Number,
    default: 150
  },
  /** 最大大小 (px) */
  maxSize: {
    type: Number,
    default: 1e3
  },
  /** 关闭前的钩子 */
  beforeClose: {
    type: Function
  },
  /** 标题样式 */
  titleStyle: [Object, String],
  /** 内容样式 */
  contentStyle: [Object, String],
  /** 页脚样式 */
  footerStyle: [Object, String],
  /** 是否显示圆角 */
  round: {
    type: Boolean,
    default: true
  },
  /** 是否在指定容器内弹出 (绝对定位) */
  inner: {
    type: Boolean,
    default: false
  },
  /** 抽屉主体样式 */
  drawerStyle: [Object, String],
  /** 主题覆盖变量 */
  themeOverrides: {
    type: Object,
    default: void 0
  }
}
const drawerEmits = {
  'update:modelValue': (value) => typeof value === 'boolean',
  open: () => true,
  opened: () => true,
  close: () => true,
  closed: () => true,
  resize: (size) => typeof size === 'number'
}
export { drawerEmits, drawerProps }
