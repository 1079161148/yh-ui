import type { ExtractPropTypes, PropType, Component, ComputedRef } from 'vue'
export type SwitchValueType = boolean | string | number
export declare const switchProps: {
  /** 绑定值，必须等于 active-value 或 inactive-value，默认为 Boolean 类型 */
  modelValue: {
    type: PropType<SwitchValueType>
    default: boolean
  }
  /** 是否禁用 */
  disabled: {
    type: BooleanConstructor
    default: boolean
  }
  /** 是否显示加载中 */
  loading: {
    type: BooleanConstructor
    default: boolean
  }
  /** switch 的大小 */
  size: {
    type: PropType<'' | 'large' | 'default' | 'small'>
    default: string
  }
  /** switch 的宽度 */
  width: {
    type: PropType<string | number>
    default: string
  }
  /** 无论图标或文本是否显示在点内，只会呈现文本的第一个字符 */
  inlinePrompt: {
    type: BooleanConstructor
    default: boolean
  }
  /** switch 状态为 on 时所显示图标，设置此项会忽略 active-text */
  activeIcon: {
    type: PropType<string | Component>
    default: undefined
  }
  /** switch 状态为 off 时所显示图标，设置此项会忽略 inactive-text */
  inactiveIcon: {
    type: PropType<string | Component>
    default: undefined
  }
  /** on 状态下显示的图标组件 */
  activeActionIcon: {
    type: PropType<string | Component>
    default: undefined
  }
  /** off 状态下显示的图标组件 */
  inactiveActionIcon: {
    type: PropType<string | Component>
    default: undefined
  }
  /** switch 打开时的文字描述 */
  activeText: {
    type: StringConstructor
    default: string
  }
  /** switch 关闭时的文字描述 */
  inactiveText: {
    type: StringConstructor
    default: string
  }
  /** switch 状态为 on 时的值 */
  activeValue: {
    type: PropType<SwitchValueType>
    default: boolean
  }
  /** switch 状态为 off 时的值 */
  inactiveValue: {
    type: PropType<SwitchValueType>
    default: boolean
  }
  /** switch 对应的 name 属性 */
  name: {
    type: StringConstructor
    default: string
  }
  /** 改变 switch 状态时是否触发表单的校验 */
  validateEvent: {
    type: BooleanConstructor
    default: boolean
  }
  /** switch 状态改变前的钩子，返回 false 或者返回 Promise 且被 reject 则停止切换 */
  beforeChange: {
    type: PropType<() => Promise<boolean> | boolean>
    default: undefined
  }
  /** input 的 id */
  id: {
    type: StringConstructor
    default: undefined
  }
  /** input 的 tabindex */
  tabindex: {
    type: PropType<string | number>
    default: undefined
  }
  /** 等价于原生 input aria-label 属性 */
  ariaLabel: {
    type: StringConstructor
    default: undefined
  }
  /** 主题覆盖变量 */
  themeOverrides: {
    type: PropType<import('@yh-ui/theme').ComponentThemeVars>
    default: undefined
  }
}
export type SwitchProps = ExtractPropTypes<typeof switchProps>
export declare const switchEmits: {
  'update:modelValue': (_val: SwitchValueType) => boolean
  change: (_val: SwitchValueType) => boolean
}
export type SwitchEmits = typeof switchEmits
export interface SwitchSlots {
  active?: () => unknown
  inactive?: () => unknown
  'active-action'?: () => unknown
  'inactive-action'?: () => unknown
}
export interface SwitchExpose {
  focus: () => void
  checked: ComputedRef<boolean>
}
