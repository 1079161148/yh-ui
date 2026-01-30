import type { ExtractPropTypes, PropType, InjectionKey, ComputedRef, Ref } from 'vue'

export const tabsTypes = ['line', 'card', 'border-card', 'segment'] as const
export type TabsType = (typeof tabsTypes)[number]

export const tabsPositions = ['top', 'right', 'bottom', 'left'] as const
export type TabsPosition = (typeof tabsPositions)[number]

export interface TabPaneConfig {
  name: string
  label: string
  disabled?: boolean
  closable?: boolean
  lazy?: boolean
  icon?: string
}

export const tabsProps = {
  /** 当前激活的标签名 */
  modelValue: {
    type: [String, Number] as PropType<string | number>,
    default: ''
  },
  /** 标签类型 */
  type: {
    type: String as PropType<TabsType>,
    default: 'line'
  },
  /** 标签位置 */
  tabPosition: {
    type: String as PropType<TabsPosition>,
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
    type: Function as PropType<
      (newName: string | number, oldName: string | number) => boolean | Promise<boolean>
    >
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
    type: String as PropType<'click' | 'hover'>,
    default: 'click'
  }
} as const

export type TabsProps = ExtractPropTypes<typeof tabsProps>

export const tabsEmits = {
  'update:modelValue': (name: string | number) =>
    typeof name === 'string' || typeof name === 'number',
  'tab-click': (pane: TabPaneConfig, ev: Event) => pane !== undefined,
  'tab-change': (name: string | number) => typeof name === 'string' || typeof name === 'number',
  'tab-remove': (name: string | number) => typeof name === 'string' || typeof name === 'number',
  'tab-add': () => true,
  'tab-drag-end': (names: (string | number)[]) => Array.isArray(names)
}

export type TabsEmits = typeof tabsEmits

// 注入上下文
export interface TabsContext {
  activeTab: Ref<string | number>
  registerPane: (pane: TabPaneConfig) => void
  unregisterPane: (name: string) => void
  activateTab: (name: string | number) => void
}

export const TABS_INJECTION_KEY: InjectionKey<TabsContext> = Symbol('yhTabs')
