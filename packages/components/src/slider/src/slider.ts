import type { CSSProperties, ExtractPropTypes, PropType } from 'vue'
import type { InputNumberSize } from '../../input-number'

export type { InputNumberSize }
export type SliderValueType = number | [number, number]

export const sliderProps = {
  /** 绑定值 */
  modelValue: {
    type: [Number, Array] as PropType<SliderValueType>,
    default: 0
  },
  /** 最小值 */
  min: {
    type: Number,
    default: 0
  },
  /** 最大值 */
  max: {
    type: Number,
    default: 100
  },
  /** 步长 */
  step: {
    type: Number,
    default: 1
  },
  /** 是否显示输入框，仅在非范围选择时有效 */
  showInput: {
    type: Boolean,
    default: false
  },
  /** 在显示输入框时，是否显示控制按钮 */
  showInputControls: {
    type: Boolean,
    default: true
  },
  /** 滑块的大小 */
  size: {
    type: String as PropType<'' | 'large' | 'default' | 'small'>,
    default: ''
  },
  /** 输入框的大小 */
  inputSize: {
    type: String as PropType<'' | 'large' | 'default' | 'small'>,
    default: ''
  },
  /** 是否显示间断点 */
  showStops: {
    type: Boolean,
    default: false
  },
  /** 是否显示提示 */
  showTooltip: {
    type: Boolean,
    default: true
  },
  /** 格式化提示文字 */
  formatTooltip: {
    type: Function as PropType<(val: number) => string | number>,
    default: undefined
  },
  /** 是否禁用 */
  disabled: {
    type: Boolean,
    default: false
  },
  /** 是否为范围选择 */
  range: {
    type: Boolean,
    default: false
  },
  /** 是否垂直模式 */
  vertical: {
    type: Boolean,
    default: false
  },
  /** 垂直模式下的高度 */
  height: {
    type: String,
    default: ''
  },
  /** 屏幕阅读器标签 */
  label: {
    type: String,
    default: undefined
  },
  /** 输入时的去抖延迟，单位为毫秒 */
  debounce: {
    type: Number,
    default: 300
  },
  /** 提示的自定义类名 */
  tooltipClass: {
    type: String,
    default: undefined
  },
  /** 提示出现的位置 */
  placement: {
    type: String as PropType<
      | 'top'
      | 'top-start'
      | 'top-end'
      | 'bottom'
      | 'bottom-start'
      | 'bottom-end'
      | 'left'
      | 'left-start'
      | 'left-end'
      | 'right'
      | 'right-start'
      | 'right-end'
    >,
    default: 'top'
  },
  /** 标记， key 的类型必须为 number ，且在 [min, max] 范围内，每个标记可以是一个对象或字符串 */
  marks: {
    type: Object as PropType<Record<number, string | { style?: CSSProperties; label: string }>>,
    default: undefined
  },
  /** 改变滑块值时是否触发表单的校验 */
  validateEvent: {
    type: Boolean,
    default: true
  },
  /** 自定义范围选择时的最小值属性名，用于 aria-label */
  rangeStartLabel: {
    type: String,
    default: undefined
  },
  /** 自定义范围选择时的最大值属性名，用于 aria-label */
  rangeEndLabel: {
    type: String,
    default: undefined
  },
  /** 自定义按钮类名 */
  buttonClass: {
    type: String,
    default: undefined
  },
  /** 自定义主题颜色 */
  color: {
    type: String,
    default: undefined
  }
}

export type SliderProps = ExtractPropTypes<typeof sliderProps>

export const sliderEmits = {
  'update:modelValue': (val: SliderValueType) => true,
  change: (val: SliderValueType) => true,
  input: (val: SliderValueType) => true
}

export type SliderEmits = typeof sliderEmits
