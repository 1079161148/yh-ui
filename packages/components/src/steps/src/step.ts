import type { ExtractPropTypes, PropType } from 'vue'
import type { StepsStatus } from './steps'

export const stepProps = {
  /** 标题 */
  title: {
    type: String,
    default: ''
  },
  /** 描述 */
  description: {
    type: String,
    default: ''
  },
  /** 图标类名或自定义 */
  icon: {
    type: String,
    default: ''
  },
  /** 设置当前步骤的状态，会覆盖 Steps 中的状态 */
  status: {
    type: String as PropType<StepsStatus>,
    default: ''
  },
  // ========== 新增功能 ==========
  /** 是否禁用该步骤 */
  disabled: {
    type: Boolean,
    default: false
  },
  /** 时间信息（用于时间线模式） */
  time: {
    type: String,
    default: ''
  },
  /** 进度百分比（0-100，用于进度条模式） */
  progress: {
    type: Number,
    default: 0
  },
  /** 是否延迟渲染内容 */
  lazy: {
    type: Boolean,
    default: false
  },
  /** 主题覆盖变量 */
  themeOverrides: {
    type: Object as PropType<import('@yh-ui/theme').ComponentThemeVars>,
    default: undefined
  }
} as const

export type StepProps = ExtractPropTypes<typeof stepProps>
