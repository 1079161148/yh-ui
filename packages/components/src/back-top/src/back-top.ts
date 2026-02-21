import type { ExtractPropTypes, PropType } from 'vue'

export const backTopProps = {
  /** 滚动距离达到此值时才显示，单位 px */
  visibilityHeight: {
    type: Number,
    default: 200
  },
  /** 绑定的滚动容器选择器，不传则为最近的滚动父级或 window */
  target: {
    type: String,
    default: ''
  },
  /** 距离右侧的距离 */
  right: {
    type: Number,
    default: 40
  },
  /** 距离底部的距离 */
  bottom: {
    type: Number,
    default: 40
  },
  /** 是否显示进度环 */
  showProgress: {
    type: Boolean,
    default: true
  },
  /** 进度环颜色 */
  progressColor: {
    type: String,
    default: ''
  },
  /** 持续时间，毫秒 */
  duration: {
    type: Number,
    default: 400
  },
  /** 主题覆盖变量 */
  themeOverrides: {
    type: Object as PropType<import('@yh-ui/theme').ComponentThemeVars>,
    default: undefined
  }
} as const

export type BackTopProps = ExtractPropTypes<typeof backTopProps>

export const backTopEmits = {
  click: (evt: MouseEvent) => evt instanceof MouseEvent
}

export type BackTopEmits = typeof backTopEmits
