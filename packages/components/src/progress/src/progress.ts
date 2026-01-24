import type { ExtractPropTypes, PropType } from 'vue'

export const progressTypes = ['line', 'circle', 'dashboard'] as const
export type ProgressType = (typeof progressTypes)[number]

export const progressStatus = ['success', 'exception', 'warning', 'info'] as const
export type ProgressStatus = (typeof progressStatus)[number]

export const progressProps = {
  /** 进度类型 */
  type: {
    type: String as PropType<ProgressType>,
    default: 'line'
  },
  /** 百分比（0-100），支持数组实现多环嵌套 */
  percentage: {
    type: [Number, Array] as PropType<number | number[]>,
    default: 0
  },
  /** 二级百分比（用于缓冲等场景） */
  secondaryPercentage: {
    type: Number,
    default: 0
  },
  /** 进度条状态 */
  status: {
    type: String as PropType<ProgressStatus>
  },
  /** 进度条宽度 */
  strokeWidth: {
    type: Number,
    default: 6
  },
  /** 是否文字内显 */
  textInside: {
    type: Boolean,
    default: false
  },
  /** 环形进度条画布宽度 */
  width: {
    type: Number,
    default: 126
  },
  /** 是否显示进度文字/图标 */
  showText: {
    type: Boolean,
    default: true
  },
  /** 进度条背景色（支持颜色、函数、渐变数组、或对象形式的 SVG 渐变） */
  color: {
    type: [String, Function, Array, Object] as PropType<
      string | ((p: number) => string) | string[] | Record<string, string>
    >,
    default: ''
  },
  /** 状态图标 */
  icon: {
    type: String,
    default: ''
  },
  /** 环形是否开启旋转/呼吸动画 */
  animated: {
    type: Boolean,
    default: false
  },
  /** 进度条背景轨道颜色 */
  defineBackgroundColor: {
    type: String,
    default: ''
  },
  /** 文字定制化 */
  format: {
    type: Function as PropType<(percentage: number) => string>
  },
  /** 进度条末端形状 */
  strokeLinecap: {
    type: String as PropType<'butt' | 'round' | 'square'>,
    default: 'round'
  },
  /** 是否开启条纹 */
  striped: {
    type: Boolean,
    default: false
  },
  /** 条纹是否流动 */
  stripedFlow: {
    type: Boolean,
    default: false
  },
  /** 是否开启未确定状态 */
  indeterminate: {
    type: Boolean,
    default: false
  },
  /** 动画持续时间（s） */
  duration: {
    type: Number,
    default: 3
  },
  /** 分段进度条数量 */
  steps: {
    type: Number,
    default: 0
  }
} as const

export type ProgressProps = ExtractPropTypes<typeof progressProps>
