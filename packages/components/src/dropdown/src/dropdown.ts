import type { ExtractPropTypes, PropType, CSSProperties, InjectionKey, Ref } from 'vue'
import type { Placement } from '@floating-ui/dom'

export type DropdownTrigger = 'hover' | 'click' | 'contextmenu'

export interface DropdownItemData {
  /** 唯一标识 */
  key: string | number
  /** 显示文本 */
  label: string
  /** 图标 */
  icon?: string
  /** 是否禁用 */
  disabled?: boolean
  /** 是否显示分割线 */
  divided?: boolean
  /** 自定义类名 */
  class?: string
  /** 子菜单 */
  children?: DropdownItemData[]
  /** 是否为危险项（红色样式） */
  danger?: boolean
  /** 是否选中（checkable 模式） */
  checked?: boolean
}

export const dropdownProps = {
  /** 触发方式 */
  trigger: {
    type: String as PropType<DropdownTrigger>,
    default: 'hover'
  },
  /** 弹出位置 */
  placement: {
    type: String as PropType<Placement>,
    default: 'bottom'
  },
  /** 是否显示 */
  visible: {
    type: Boolean as PropType<boolean | null>,
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
    default: 2000
  },
  /** 是否在点击菜单项后隐藏 */
  hideOnClick: {
    type: Boolean,
    default: true
  },
  /** 菜单项数据（快捷配置模式） */
  items: {
    type: Array as PropType<DropdownItemData[]>,
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
    default: undefined
  },
  /** 是否可勾选 */
  checkable: {
    type: Boolean,
    default: false
  },
  /** 触发元素的最大宽度 */
  maxHeight: {
    type: [String, Number] as PropType<string | number>,
    default: ''
  },
  /** 是否挂载至 body */
  teleported: {
    type: Boolean,
    default: true
  },
  /** 弹出层自定义类名 */
  popperClass: {
    type: String,
    default: ''
  },
  /** 弹出层自定义样式 */
  popperStyle: {
    type: Object as PropType<CSSProperties>,
    default: () => ({})
  },
  /** 分割按钮模式 */
  splitButton: {
    type: Boolean,
    default: false
  },
  /** 按钮类型（splitButton 模式） */
  type: {
    type: String as PropType<'primary' | 'success' | 'warning' | 'danger' | 'info' | ''>,
    default: ''
  },
  /** 按钮尺寸 */
  size: {
    type: String as PropType<'large' | 'default' | 'small'>,
    default: 'default'
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
    type: Array as unknown as PropType<[number, number]>,
    default: () => [0, 8]
  },
  /** Tab 键循环导航 */
  loop: {
    type: Boolean,
    default: true
  },
  /** Tab 索引 */
  tabindex: {
    type: [Number, String] as PropType<number | string>,
    default: 0
  }
} as const

export const dropdownEmits = {
  'update:visible': (visible: boolean) => typeof visible === 'boolean',
  /** 点击菜单项 */
  command: (command: string | number | object) => true,
  /** 菜单显示 */
  show: () => true,
  /** 菜单隐藏 */
  hide: () => true,
  /** 点击触发器（splitButton 模式） */
  click: (event: MouseEvent) => event instanceof MouseEvent
}

export type DropdownProps = ExtractPropTypes<typeof dropdownProps>
export type DropdownEmits = typeof dropdownEmits

// DropdownItem Props
export const dropdownItemProps = {
  /** 指令/命令值 */
  command: {
    type: [String, Number, Object] as PropType<string | number | object>,
    default: ''
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
    default: ''
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
  }
} as const

export type DropdownItemProps = ExtractPropTypes<typeof dropdownItemProps>

// DropdownMenu Props
export const dropdownMenuProps = {} as const

// Dropdown Context
export interface DropdownContext {
  hideOnClick: Ref<boolean>
  checkable: Ref<boolean>
  handleItemClick: (command: string | number | object) => void
}

export const DROPDOWN_INJECTION_KEY: InjectionKey<DropdownContext> = Symbol('dropdown')
