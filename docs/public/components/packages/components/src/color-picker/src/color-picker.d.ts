import type { ExtractPropTypes, PropType } from 'vue'
export declare const colorPickerProps: {
  readonly modelValue: {
    readonly type: StringConstructor
    readonly default: ''
  }
  /** 是否支持透明度 */
  readonly showAlpha: {
    readonly type: BooleanConstructor
    readonly default: false
  }
  /** 颜色格式 */
  readonly colorFormat: {
    readonly type: PropType<'hex' | 'rgb' | 'hsl' | 'hsv'>
    readonly default: 'hex'
  }
  /** 尺寸 */
  readonly size: {
    readonly type: PropType<'large' | 'default' | 'small'>
    readonly default: 'default'
  }
  /** 是否禁用 */
  readonly disabled: {
    readonly type: BooleanConstructor
    readonly default: false
  }
  /** 预定义颜色 */
  readonly predefine: {
    readonly type: PropType<string[]>
    readonly default: () => never[]
  }
  /** 面板类名 */
  readonly popperClass: {
    readonly type: StringConstructor
    readonly default: ''
  }
  /** 主题覆盖变量 */
  readonly themeOverrides: {
    readonly type: PropType<import('@yh-ui/theme').ComponentThemeVars>
    readonly default: undefined
  }
}
export type ColorPickerProps = ExtractPropTypes<typeof colorPickerProps>
export declare const colorPickerEmits: {
  'update:modelValue': (val: string) => boolean
  change: (val: string) => boolean
  activeChange: (val: string) => boolean
}
export type ColorPickerEmits = typeof colorPickerEmits
export interface ColorPickerSlots {}
export interface ColorPickerExpose {
  visible: import('vue').Ref<boolean>
  togglePopper: () => void
  handleClear: () => void
  handleConfirm: () => void
}
