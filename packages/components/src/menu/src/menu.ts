import type { ExtractPropTypes, PropType, InjectionKey, Ref, Component, VNodeChild } from 'vue'

export type MenuMode = 'horizontal' | 'vertical'
export type MenuTrigger = 'hover' | 'click'

export interface MenuItemData {
  /** 唯一标识 */
  key?: string
  /** 索引 (别名) */
  index?: string
  /** 显示文本 */
  label: string
  /** 图标 */
  icon?: string
  /** 是否禁用 */
  disabled?: boolean
  /** 子菜单 */
  children?: MenuItemData[]
  /** 分组标题（仅用于分组） */
  group?: boolean
  /** 允许自定义扩展属性 - 使用 any 以支持动态属性访问 */
  [key: string]: any
}

export const menuProps = {
  /** 菜单模式 */
  mode: {
    type: String as PropType<MenuMode>,
    default: 'vertical'
  },
  /** 当前激活菜单的 index */
  defaultActive: {
    type: String,
    default: ''
  },
  /** 当前打开的 sub-menu 的 index 数组 */
  defaultOpeneds: {
    type: Array as PropType<string[]>,
    default: () => []
  },
  /** 是否只保持一个子菜单展开 */
  uniqueOpened: {
    type: Boolean,
    default: false
  },
  /** 子菜单打开触发方式 */
  menuTrigger: {
    type: String as PropType<MenuTrigger>,
    default: 'hover'
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
    default: ''
  },
  /** 文字颜色 */
  textColor: {
    type: String,
    default: ''
  },
  /** 激活项文字颜色 */
  activeTextColor: {
    type: String,
    default: ''
  },
  /** 是否开启省略模式 (水平模式下) */
  ellipsis: {
    type: Boolean,
    default: true
  },
  /** 子菜单弹出层层级 */
  popperZIndex: {
    type: Number,
    default: 2000
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
    type: [String, Object] as PropType<string | Component>,
    default: ''
  },
  /** 弹出层的偏移量 (对所有子菜单有效) */
  popperOffset: {
    type: Number,
    default: 6
  },
  /** Tooltip 主题，当垂直折叠或水平模式时生效 */
  popperEffect: {
    type: String as PropType<'dark' | 'light'>,
    default: 'light'
  },
  /** 单击外部时是否折叠菜单 */
  closeOnClickOutside: {
    type: Boolean,
    default: true
  },
  /** 所有弹出菜单的自定义类名 */
  popperClass: {
    type: String,
    default: ''
  },
  /** 所有弹出菜单的自定义样式 */
  popperStyle: {
    type: [String, Object] as PropType<string | object>,
    default: ''
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
    default: undefined
  },
  /** 是否展开全部菜单 */
  expandAll: {
    type: Boolean,
    default: false
  },
  /** 批量处理菜单额外部分渲染 */
  renderExtra: {
    type: Function as PropType<(option: MenuItemData) => VNodeChild>,
    default: undefined
  },
  /** 批量处理菜单图标渲染 */
  renderIcon: {
    type: Function as PropType<(option: MenuItemData) => VNodeChild>,
    default: undefined
  },
  /** 批量处理菜单标签渲染 */
  renderLabel: {
    type: Function as PropType<(option: MenuItemData) => VNodeChild>,
    default: undefined
  },
  /** 是否收起溢出的菜单，仅对 mode='horizontal' 的菜单生效 */
  responsive: {
    type: Boolean,
    default: false
  },
  /** 菜单当前的选中值 */
  value: {
    type: [String, null] as PropType<string | null>,
    default: undefined
  },
  /** 菜单配置项，支持从数据驱动生成菜单 */
  options: {
    type: Array as PropType<MenuItemData[]>,
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
    default: 'key'
  },
  /** label 的字段名 */
  labelField: {
    type: String,
    default: 'label'
  },
  /** 主题覆盖变量 */
  themeOverrides: {
    type: Object as PropType<import('@yh-ui/theme').ComponentThemeVars>,
    default: undefined
  }
} as const

export const menuEmits = {
  /** v-model:value */
  'update:value': (value: string) => true,
  /** 菜单激活回调 */
  select: (
    index: string,
    indexPath: string[],
    item: MenuItemData | undefined,
    routeResult?: Promise<void>
  ) => true,
  /** 子菜单展开回调 */
  open: (index: string, indexPath: string[]) => true,
  /** 子菜单收起回调 */
  close: (index: string, indexPath: string[]) => true
}

export type MenuProps = ExtractPropTypes<typeof menuProps>
export type MenuEmits = typeof menuEmits

// MenuItem Props
export const menuItemProps = {
  /** 唯一标识 */
  index: {
    type: String,
    required: true
  },
  /** vue-router 路由对象 */
  route: {
    type: [String, Object] as PropType<string | object>,
    default: ''
  },
  /** 是否禁用 */
  disabled: {
    type: Boolean,
    default: false
  },
  /** 显示文本 */
  label: {
    type: String,
    default: ''
  }
} as const

export type MenuItemProps = ExtractPropTypes<typeof menuItemProps>

// MenuItemGroup Props
export const menuItemGroupProps = {
  /** 分组标题 */
  title: {
    type: String,
    default: ''
  }
} as const

export type MenuItemGroupProps = ExtractPropTypes<typeof menuItemGroupProps>

// SubMenu Props
export const subMenuProps = {
  /** 唯一标识 */
  index: {
    type: String,
    required: true
  },
  /** 弹出菜单的自定义类名 */
  popperClass: {
    type: String,
    default: undefined
  },
  /** 是否禁用 */
  disabled: {
    type: Boolean,
    default: false
  },
  /** 展开收起的延时 */
  showTimeout: {
    type: Number,
    default: undefined
  },
  /** 收起的延时 */
  hideTimeout: {
    type: Number,
    default: undefined
  },
  /** 弹出层偏移量 */
  popperOffset: {
    type: Number,
    default: undefined
  },
  /** 显示文本 */
  label: {
    type: String,
    default: ''
  }
} as const

export type SubMenuProps = ExtractPropTypes<typeof subMenuProps>

// Menu Context
export interface MenuContext {
  mode: Ref<MenuMode>
  activeIndex: Ref<string>
  openedMenus: Ref<string[]>
  collapse: Ref<boolean>
  backgroundColor: Ref<string>
  textColor: Ref<string>
  activeTextColor: Ref<string>
  uniqueOpened: Ref<boolean>
  menuTrigger: Ref<MenuTrigger>
  popperZIndex: Ref<number>
  teleported: Ref<boolean>
  gap: Ref<number>
  iconSize: Ref<number>
  indent: Ref<number>
  inverted: Ref<boolean>
  keyField: Ref<string>
  labelField: Ref<string>
  popperOffset: Ref<number>
  popperEffect: Ref<'dark' | 'light'>
  popperClass: Ref<string>
  popperStyle: Ref<string | object>
  showTimeout: Ref<number>
  hideTimeout: Ref<number>
  persistent: Ref<boolean>
  ellipsisIcon: Ref<string | Component>
  closeOnClickOutside: Ref<boolean>
  expandAll: Ref<boolean>
  rootIndent: Ref<number | undefined>
  renderExtra: Ref<((option: MenuItemData) => VNodeChild) | undefined>
  renderIcon: Ref<((option: MenuItemData) => VNodeChild) | undefined>
  renderLabel: Ref<((option: MenuItemData) => VNodeChild) | undefined>
  responsive: Ref<boolean>
  value: Ref<string | null | undefined>
  options: Ref<MenuItemData[]>
  handleSelect: (index: string, indexPath: string[]) => void
  handleOpen: (index: string, indexPath: string[]) => void
  handleClose: (index: string, indexPath: string[]) => void
}

export const MENU_INJECTION_KEY: InjectionKey<MenuContext> = Symbol('menu')

// SubMenu Context
export interface SubMenuContext {
  level: number
  indexPath: string[]
}

export const SUB_MENU_INJECTION_KEY: InjectionKey<SubMenuContext> = Symbol('subMenu')
