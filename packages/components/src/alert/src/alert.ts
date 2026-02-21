import type { ExtractPropTypes, PropType, Component } from 'vue'

export const alertTypes = ['success', 'info', 'warning', 'error'] as const
export type AlertType = (typeof alertTypes)[number]

export const alertEffects = ['light', 'dark', 'outline', 'glass'] as const
export type AlertEffect = (typeof alertEffects)[number]

export const alertProps = {
  /** 标题 */
  title: {
    type: String,
    default: ''
  },
  /** 描述文字 */
  description: {
    type: String,
    default: ''
  },
  /** 类型 */
  type: {
    type: String as PropType<AlertType>,
    default: 'info',
    validator: (val: string) => alertTypes.includes(val as AlertType)
  },
  /** 主题样式 */
  effect: {
    type: String as PropType<AlertEffect>,
    default: 'light',
    validator: (val: string) => alertEffects.includes(val as AlertEffect)
  },
  /** 是否可关闭 */
  closable: {
    type: Boolean,
    default: false
  },
  /** 关闭按钮自定义文字 */
  closeText: {
    type: String,
    default: ''
  },
  /** 关闭按钮自定义图标 */
  closeIcon: {
    type: [Object, String, Function] as PropType<string | Component>,
    default: ''
  },
  /** 是否显示图标 */
  showIcon: {
    type: Boolean,
    default: false
  },
  /** 自定义图标组件 */
  icon: {
    type: [Object, String, Function] as PropType<string | Component>,
    default: ''
  },
  /** 文字是否居中 */
  center: {
    type: Boolean,
    default: false
  },
  /** 是否开启文字滚动（跑马灯效果） */
  scrollable: {
    type: Boolean,
    default: false
  },
  /** 滚动速率（完成一次滚动所需的秒数） */
  scrollSpeed: {
    type: Number,
    default: 15
  },
  /** 鼠标悬停时是否暂停滚动 */
  pauseOnHover: {
    type: Boolean,
    default: true
  },
  /** 自动关闭延迟时间（毫秒），0 为不自动关闭 */
  duration: {
    type: Number,
    default: 0
  },
  /** 是否在自动关闭时显示倒计时进度条 */
  showProgress: {
    type: Boolean,
    default: false
  },
  /** 主题覆盖变量 */
  themeOverrides: {
    type: Object as PropType<import('@yh-ui/theme').ComponentThemeVars>,
    default: undefined
  }
} as const

export type AlertProps = ExtractPropTypes<typeof alertProps>

export const alertEmits = {
  close: (evt: MouseEvent) => evt instanceof MouseEvent
}

export type AlertEmits = typeof alertEmits
