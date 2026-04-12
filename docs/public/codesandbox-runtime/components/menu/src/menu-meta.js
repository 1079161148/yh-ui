const menuProps = {
  /** 菜单模式 */
  mode: {
    type: String,
    default: "vertical"
  },
  /** 当前激活菜单的 index */
  defaultActive: {
    type: String,
    default: ""
  },
  /** 当前打开的 sub-menu 的 index 数组 */
  defaultOpeneds: {
    type: Array,
    default: () => []
  },
  /** 是否只保持一个子菜单展开 */
  uniqueOpened: {
    type: Boolean,
    default: false
  },
  /** 子菜单打开触发方式 */
  menuTrigger: {
    type: String,
    default: "hover"
  },
  /** 是否开启折叠模式（仅 vertical 模式） */
  collapse: {
    type: Boolean,
    default: false
  },
  /** 折叠动画是否开启 */
  collapseTransition: {
    type: Boolean,
    default: true
  },
  /** 是否启用 vue-router 模式 */
  router: {
    type: Boolean,
    default: false
  },
  /** 背景色 */
  backgroundColor: {
    type: String,
    default: ""
  },
  /** 文字颜色 */
  textColor: {
    type: String,
    default: ""
  },
  /** 激活项文字颜色 */
  activeTextColor: {
    type: String,
    default: ""
  },
  /** 是否开启省略模式 (水平模式下) */
  ellipsis: {
    type: Boolean,
    default: true
  },
  /** 子菜单弹出层层级 */
  popperZIndex: {
    type: Number,
    default: 2e3
  },
  /** 是否将弹出菜单挂载至 body */
  teleported: {
    type: Boolean,
    default: true
  },
  /** 菜单项间距 */
  gap: {
    type: Number,
    default: 4
  },
  /** 自定义省略图标 */
  ellipsisIcon: {
    type: [String, Object],
    default: ""
  },
  /** 弹出层的偏移量 (对所有子菜单有效) */
  popperOffset: {
    type: Number,
    default: 6
  },
  /** Tooltip 主题，当垂直折叠或水平模式时生效 */
  popperEffect: {
    type: String,
    default: "light"
  },
  /** 单击外部时是否折叠菜单 */
  closeOnClickOutside: {
    type: Boolean,
    default: true
  },
  /** 所有弹出菜单的自定义类名 */
  popperClass: {
    type: String,
    default: ""
  },
  /** 所有弹出菜单的自定义样式 */
  popperStyle: {
    type: [Object, String, Array],
    default: ""
  },
  /** 菜单出现前的延迟 */
  showTimeout: {
    type: Number,
    default: 300
  },
  /** 菜单消失前的延迟 */
  hideTimeout: {
    type: Number,
    default: 300
  },
  /** 当菜单处于非活动状态时，子菜单是否将被销毁 */
  persistent: {
    type: Boolean,
    default: true
  },
  /** 菜单未折叠时图标的大小 */
  iconSize: {
    type: Number,
    default: 20
  },
  /** 菜单每级的缩进 */
  indent: {
    type: Number,
    default: 32
  },
  /** 菜单第一级的缩进，如果没有设定，使用 indent 代替 */
  rootIndent: {
    type: Number,
    default: void 0
  },
  /** 是否展开全部菜单 */
  expandAll: {
    type: Boolean,
    default: false
  },
  /** 批量处理菜单额外部分渲染 */
  renderExtra: {
    type: Function,
    default: void 0
  },
  /** 批量处理菜单图标渲染 */
  renderIcon: {
    type: Function,
    default: void 0
  },
  /** 批量处理菜单标签渲染 */
  renderLabel: {
    type: Function,
    default: void 0
  },
  /** 是否收起溢出的菜单，仅对 mode='horizontal' 的菜单生效 */
  responsive: {
    type: Boolean,
    default: false
  },
  /** 菜单当前的选中值 */
  value: {
    type: [String, null],
    default: void 0
  },
  /** 菜单配置项，支持从数据驱动生成菜单 */
  options: {
    type: Array,
    default: () => []
  },
  /** 是否使用反转样式 */
  inverted: {
    type: Boolean,
    default: false
  },
  /** key 的字段名 */
  keyField: {
    type: String,
    default: "key"
  },
  /** label 的字段名 */
  labelField: {
    type: String,
    default: "label"
  },
  /** 主题覆盖变量 */
  themeOverrides: {
    type: Object,
    default: void 0
  }
};
const menuEmits = {
  /** v-model:value */
  "update:value": (_value) => true,
  /** 菜单激活回调 */
  select: (_index, _indexPath, _item, _routeResult) => true,
  /** 子菜单展开回调 */
  open: (_index, _indexPath) => true,
  /** 子菜单收起回调 */
  close: (_index, _indexPath) => true
};
const menuItemProps = {
  /** 唯一标识 */
  index: {
    type: String,
    required: true
  },
  /** vue-router 路由对象 */
  route: {
    type: [String, Object],
    default: ""
  },
  /** 是否禁用 */
  disabled: {
    type: Boolean,
    default: false
  },
  /** 显示文本 */
  label: {
    type: String,
    default: ""
  }
};
const menuItemGroupProps = {
  /** 分组标题 */
  title: {
    type: String,
    default: ""
  }
};
const subMenuProps = {
  /** 唯一标识 */
  index: {
    type: String,
    required: true
  },
  /** 弹出菜单的自定义类名 */
  popperClass: {
    type: String,
    default: void 0
  },
  /** 是否禁用 */
  disabled: {
    type: Boolean,
    default: false
  },
  /** 展开收起的延时 */
  showTimeout: {
    type: Number,
    default: void 0
  },
  /** 收起的延时 */
  hideTimeout: {
    type: Number,
    default: void 0
  },
  /** 弹出层偏移量 */
  popperOffset: {
    type: Number,
    default: void 0
  },
  /** 显示文本 */
  label: {
    type: String,
    default: ""
  }
};
const MENU_INJECTION_KEY = Symbol("menu");
const SUB_MENU_INJECTION_KEY = Symbol("subMenu");
export {
  MENU_INJECTION_KEY,
  SUB_MENU_INJECTION_KEY,
  menuEmits,
  menuItemGroupProps,
  menuItemProps,
  menuProps,
  subMenuProps
};
