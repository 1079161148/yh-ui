import type { ExtractPropTypes, PropType, Component } from 'vue'

export type SwitchValueType = boolean | string | number

export const switchProps = {
  /** 绑定值，必须等于 active-value 或 inactive-value，默认为 Boolean 类型 */
  modelValue: {
    type: [Boolean, String, Number] as PropType<SwitchValueType>,
    default: false
  },
  /** 是否禁用 */
  disabled: {
    type: Boolean,
    default: false
  },
  /** 是否显示加载中 */
  loading: {
    type: Boolean,
    default: false
  },
  /** switch 的大小 */
  size: {
    type: String as PropType<'' | 'large' | 'default' | 'small'>,
    default: ''
  },
  /** switch 的宽度 */
  width: {
    type: [String, Number] as PropType<string | number>,
    default: ''
  },
  /** 无论图标或文本是否显示在点内，只会呈现文本的第一个字符 */
  inlinePrompt: {
    type: Boolean,
    default: false
  },
  /** switch 状态为 on 时所显示图标，设置此项会忽略 active-text */
  activeIcon: {
    type: [String, Object] as PropType<string | Component>,
    default: undefined
  },
  /** switch 状态为 off 时所显示图标，设置此项会忽略 inactive-text */
  inactiveIcon: {
    type: [String, Object] as PropType<string | Component>,
    default: undefined
  },
  /** on 状态下显示的图标组件 */
  activeActionIcon: {
    type: [String, Object] as PropType<string | Component>,
    default: undefined
  },
  /** off 状态下显示的图标组件 */
  inactiveActionIcon: {
    type: [String, Object] as PropType<string | Component>,
    default: undefined
  },
  /** switch 打开时的文字描述 */
  activeText: {
    type: String,
    default: ''
  },
  /** switch 关闭时的文字描述 */
  inactiveText: {
    type: String,
    default: ''
  },
  /** switch 状态为 on 时的值 */
  activeValue: {
    type: [Boolean, String, Number] as PropType<SwitchValueType>,
    default: true
  },
  /** switch 状态为 off 时的值 */
  inactiveValue: {
    type: [Boolean, String, Number] as PropType<SwitchValueType>,
    default: false
  },
  /** switch 对应的 name 属性 */
  name: {
    type: String,
    default: ''
  },
  /** 改变 switch 状态时是否触发表单的校验 */
  validateEvent: {
    type: Boolean,
    default: true
  },
  /** switch 状态改变前的钩子，返回 false 或者返回 Promise 且被 reject 则停止切换 */
  beforeChange: {
    type: Function as PropType<() => Promise<boolean> | boolean>,
    default: undefined
  },
  /** input 的 id */
  id: {
    type: String,
    default: undefined
  },
  /** input 的 tabindex */
  tabindex: {
    type: [String, Number] as PropType<string | number>,
    default: undefined
  },
  /** 等价于原生 input aria-label 属性 */
  ariaLabel: {
    type: String,
    default: undefined
  },
  /** 主题覆盖变量 */
  themeOverrides: {
    type: Object as PropType<import('@yh-ui/theme').ComponentThemeVars>,
    default: undefined
  }
}

export type SwitchProps = ExtractPropTypes<typeof switchProps>

export const switchEmits = {
  'update:modelValue': (val: SwitchValueType) => true,
  change: (val: SwitchValueType) => true
}

export type SwitchEmits = typeof switchEmits
