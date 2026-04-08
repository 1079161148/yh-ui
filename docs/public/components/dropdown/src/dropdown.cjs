"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.dropdownProps = exports.dropdownMenuProps = exports.dropdownItemProps = exports.dropdownEmits = exports.DROPDOWN_INJECTION_KEY = void 0;
const dropdownProps = exports.dropdownProps = {
  /** 触发方式 */
  trigger: {
    type: String,
    default: "hover"
  },
  /** 弹出位置 */
  placement: {
    type: String,
    default: "bottom"
  },
  /** 是否显示 */
  visible: {
    type: Boolean,
    default: null
  },
  /** 是否禁用 */
  disabled: {
    type: Boolean,
    default: false
  },
  /** 延迟显示时间 (ms) */
  showAfter: {
    type: Number,
    default: 0
  },
  /** 延迟隐藏时间 (ms) */
  hideAfter: {
    type: Number,
    default: 150
  },
  /** 弹出层层级 */
  zIndex: {
    type: Number,
    default: 2e3
  },
  /** 是否在点击菜单项后隐藏 */
  hideOnClick: {
    type: Boolean,
    default: true
  },
  /** 菜单项数据（快捷配置模式） */
  items: {
    type: Array,
    default: () => []
  },
  /** 是否加载中 */
  loading: {
    type: Boolean,
    default: false
  },
  /** 空状态文本 */
  emptyText: {
    type: String,
    default: void 0
  },
  /** 是否可勾选 */
  checkable: {
    type: Boolean,
    default: false
  },
  /** 触发元素的最大宽度 */
  maxHeight: {
    type: [String, Number],
    default: ""
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
    type: Object,
    default: () => ({})
  },
  /** 分割按钮模式 */
  splitButton: {
    type: Boolean,
    default: false
  },
  /** 按钮类型（splitButton 模式） */
  type: {
    type: String,
    default: ""
  },
  /** 按钮尺寸 */
  size: {
    type: String,
    default: "default"
  },
  /** 按钮是否为朴素样式（splitButton 模式） */
  plain: {
    type: Boolean,
    default: false
  },
  /** 是否显示箭头图标 */
  showArrow: {
    type: Boolean,
    default: true
  },
  /** 是否显示弹出框小三角 */
  popperArrow: {
    type: Boolean,
    default: true
  },
  /** 偏移量 */
  offset: {
    type: Array,
    default: () => [0, 8]
  },
  /** Tab 键循环导航 */
  loop: {
    type: Boolean,
    default: true
  },
  /** Tab 索引 */
  tabindex: {
    type: [Number, String],
    default: 0
  },
  /** 主题覆盖变量 */
  themeOverrides: {
    type: Object,
    default: void 0
  }
};
const dropdownEmits = exports.dropdownEmits = {
  "update:visible": visible => typeof visible === "boolean",
  /** 点击菜单项 */
  command: _command => true,
  /** 菜单显示 */
  show: () => true,
  /** 菜单隐藏 */
  hide: () => true,
  /** 点击触发器（splitButton 模式） */
  click: event => event instanceof MouseEvent
};
const dropdownItemProps = exports.dropdownItemProps = {
  /** 指令/命令值 */
  command: {
    type: [String, Number, Object],
    default: ""
  },
  /** 是否禁用 */
  disabled: {
    type: Boolean,
    default: false
  },
  /** 是否显示分割线 */
  divided: {
    type: Boolean,
    default: false
  },
  /** 图标 */
  icon: {
    type: String,
    default: ""
  },
  /** 是否为危险项 */
  danger: {
    type: Boolean,
    default: false
  },
  /** 是否选中 */
  checked: {
    type: Boolean,
    default: false
  },
  /** 主题覆盖变量 */
  themeOverrides: {
    type: Object,
    default: void 0
  }
};
const dropdownMenuProps = exports.dropdownMenuProps = {
  /** 主题覆盖变量 */
  themeOverrides: {
    type: Object,
    default: void 0
  }
};
const DROPDOWN_INJECTION_KEY = exports.DROPDOWN_INJECTION_KEY = Symbol("dropdown");