import type { ExtractPropTypes, PropType } from 'vue'

export const colorPickerProps = {
  modelValue: {
    type: String,
    default: ''
  },
  /** 是否支持透明度 */
  showAlpha: {
    type: Boolean,
    default: false
  },
  /** 颜色格式 */
  colorFormat: {
    type: String as PropType<'hex' | 'rgb' | 'hsl' | 'hsv'>,
    default: 'hex'
  },
  /** 尺寸 */
  size: {
    type: String as PropType<'large' | 'default' | 'small'>,
    default: 'default'
  },
  /** 是否禁用 */
  disabled: {
    type: Boolean,
    default: false
  },
  /** 预定义颜色 */
  predefine: {
    type: Array as PropType<string[]>,
    default: () => []
  },
  /** 面板类名 */
  popperClass: {
    type: String,
    default: ''
  }
} as const

export type ColorPickerProps = ExtractPropTypes<typeof colorPickerProps>

export const colorPickerEmits = {
  'update:modelValue': (val: string) => typeof val === 'string',
  change: (val: string) => typeof val === 'string',
  activeChange: (val: string) => typeof val === 'string'
}

export type ColorPickerEmits = typeof colorPickerEmits
