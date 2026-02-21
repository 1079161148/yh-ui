import type { ExtractPropTypes, PropType, InjectionKey, Ref } from 'vue'

export const stepsDirections = ['horizontal', 'vertical'] as const
export type StepsDirection = (typeof stepsDirections)[number]

export const stepsStatus = ['wait', 'process', 'finish', 'error', 'success'] as const
export type StepsStatus = (typeof stepsStatus)[number]

export const stepsProgressDot = ['default', 'dot', 'navigation'] as const
export type StepsProgressDot = (typeof stepsProgressDot)[number]

export const stepsSizes = ['default', 'small'] as const
export type StepsSize = (typeof stepsSizes)[number]

export const stepsLabelPlacements = ['horizontal', 'vertical'] as const
export type StepsLabelPlacement = (typeof stepsLabelPlacements)[number]

export interface StepConfig {
  uid: number
  title: string
  description: string
  icon: string
  status: StepsStatus
  disabled: boolean
  time: string
  progress: number
}

export const stepsProps = {
  /** 当前激活步骤 */
  active: {
    type: Number,
    default: 0
  },
  /** 布局方向 */
  direction: {
    type: String as PropType<StepsDirection>,
    default: 'horizontal'
  },
  /** 居中显示 */
  alignCenter: {
    type: Boolean,
    default: false
  },
  /** 简洁风格 */
  simple: {
    type: Boolean,
    default: false
  },
  /** 点状进度 */
  progressDot: {
    type: [Boolean, String] as PropType<boolean | StepsProgressDot>,
    default: false
  },
  /** 设置结束步骤的状态 */
  finishStatus: {
    type: String as PropType<StepsStatus>,
    default: 'finish'
  },
  /** 设置当前步骤的状态 */
  processStatus: {
    type: String as PropType<StepsStatus>,
    default: 'process'
  },
  /** 每个 step 的间距 */
  space: {
    type: [Number, String] as PropType<number | string>,
    default: ''
  },
  /** 可点击切换步骤 */
  clickable: {
    type: Boolean,
    default: false
  },
  // ========== 新增功能 ==========
  /** 尺寸 */
  size: {
    type: String as PropType<StepsSize>,
    default: 'default'
  },
  /** 响应式布局 - 小屏幕自动切换为垂直 */
  responsive: {
    type: Boolean,
    default: false
  },
  /** 响应式断点（px） */
  responsiveBreakpoint: {
    type: Number,
    default: 768
  },
  /** 描述标签位置 */
  labelPlacement: {
    type: String as PropType<StepsLabelPlacement>,
    default: 'horizontal'
  },
  /** 显示进度条连接线 */
  showProgress: {
    type: Boolean,
    default: false
  },
  /** 显示时间线 */
  showTimeline: {
    type: Boolean,
    default: false
  },
  /** 主题覆盖变量 */
  themeOverrides: {
    type: Object as PropType<import('@yh-ui/theme').ComponentThemeVars>,
    default: undefined
  }
} as const

export type StepsProps = ExtractPropTypes<typeof stepsProps>

export const stepsEmits = {
  change: (index: number) => typeof index === 'number'
}

export type StepsEmits = typeof stepsEmits

// 注入上下文
export interface StepsContext {
  props: StepsProps
  steps: Ref<StepConfig[]>
  isResponsiveVertical: Ref<boolean>
  registerStep: (step: StepConfig) => void
  unregisterStep: (uid: number) => void
  handleStepClick: (index: number, disabled: boolean) => void
}

export const STEPS_INJECTION_KEY: InjectionKey<StepsContext> = Symbol('yhSteps')
